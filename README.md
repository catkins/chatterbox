# Colour Box

Experiments with ES6 using Babel, Browserify and Gulp.

### Prerequisites

- NodeJS
- Gulp

```bash
git clone git@github.com/catkins/colour-box.git
cd colour-box
npm install -g gulp
npm install
```

### Building

```bash
gulp build  # output all generated assets to ./public
gulp server # fire up a dev server serving the generated assets
gulp watch  # will watch local sources for changes, compile where necessary and copy to public

gulp        # this will start up dev server with live reload, and compile assets on changes
```
