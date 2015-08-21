var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var connect    = require('gulp-connect');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var watchify   = require('watchify');
var browserify = require('browserify');
var babelify   = require('babelify');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename')
var _          = require('lodash');
var util       = require('gulp-util');
var debug      = require('gulp-debug');
var eslint     = require('gulp-eslint');
var friendlyFormatter = require("eslint-friendly-formatter");
var colors     = util.colors;

var BUNDLE_FILENAME = 'bundle.js';

// default to running dev server and building on changes
gulp.task('default', ['server', 'watch']);

// build all of the things
gulp.task('build', ['build-html', 'build-css', 'build-js', 'lint']);

// start livereload dev server
gulp.task('server', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

// copy html to public folder
gulp.task('build-html', function() {
  gulp.src('./src/*.html')
      .pipe(debug({ title: 'html' }))
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

// compile sass and copy to public folder
gulp.task('build-css', function() {
  gulp.src('./styles/*.scss')
      .pipe(debug({ title: 'css' }))
      .pipe(sass({
          includePaths: [
            './bower_components/foundation/scss'
          ]
        })
        .on('error', sass.logError)
      )
      .pipe(gulp.dest('public'))
      .pipe(connect.reload());
});

// transpile es6, import browserify modules and copy to public
gulp.task('build-js', function() {
  setupBrowserify(false);
});

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format(friendlyFormatter));
});

// watch filesystem for changes and build app
gulp.task('watch', ['build'], function() {
  setupBrowserify(true);
  gulp.watch(['./src/**/*.js'],   ['lint']);
  gulp.watch(['./src/*.html'],    ['build-html']);
  gulp.watch(['./styles/*.scss'], ['build-css']);
});


function setupBrowserify(watch) {
  var bundler;

  if (watch) {
    bundler = watchify(
      browserify('src/app.js',
      _.assign(watchify.args, { debug: true }))
    );

    bundler.on('update', function(modifiedFiles) {
      modifiedFiles.forEach(logFileUpdate);
      rebundle(bundler);
    });
  } else {
    bundler = browserify('src/app.js', {
      debug: true
    });
  }

  bundler.transform(babelify.configure({
    compact: false,
    optional: ["es7.functionBind", "es7.classProperties"]
  }));

  return rebundle(bundler);
}

function rebundle(bundler) {
  return bundler.bundle()
    .on('error', function(e) {
      util.log(colors.red('Browserify error'));
      util.log(colors.red(e.message));
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
    .pipe(sourcemaps.write()) // writes .map file
    .pipe(rename(BUNDLE_FILENAME))
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
}

function logFileUpdate(file) {
  util.log(colors.cyan('File modified:'), colors.magenta(file), '- updating', BUNDLE_FILENAME);
}
