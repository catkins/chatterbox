var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var rename = require('gulp-rename')
var _ = require('lodash');
var util = require('gulp-util');
var colors = util.colors;

var bundleFilename = 'bundle.js';

gulp.task('server', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('build', ['build-html', 'build-css', 'build-js']);

gulp.task('build-html', function() {
  gulp.src('./src/*.html')
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

gulp.task('build-css', function() {
  gulp.src('./src/*.css')
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

gulp.task('build-js', function() {
  bundle();
});


gulp.task('watch', ['build'], function() {
  bundle(true);
  gulp.watch(['./src/*.html'], ['build-html']);
  gulp.watch(['./src/*.css'], ['build-css']);
});

gulp.task('default', ['server', 'watch']);

function reload() {
  connect.reload()();
}

function bundle(watch) {
  var bro;

  if (watch) {
    bro = watchify(browserify('src/app.js',
      // Assigning debug to have sourcemaps
      _.assign(watchify.args, {
        debug: true
      })));

    bro.on('update', function(modifiedFiles) {
      modifiedFiles.forEach(function(file) {
        util.log(colors.cyan('File modified:'), colors.magenta(file), '- updating', bundleFilename);
      });

      rebundle(bro);
    });
  } else {
    bro = browserify('src/app.js', {
      debug: true
    });
  }

  bro.transform(babelify.configure({
    compact: false
  }));

  function rebundle(bundler) {
    return bundler.bundle()
      .on('error', function(e) {
        util.log(colors.red('Browserify error'));
        util.log(colors.red(e.message));
      })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      })) // loads map from browserify file
      .pipe(sourcemaps.write()) // writes .map file
      .pipe(rename(bundleFilename))
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
  }

  return rebundle(bro);
}
