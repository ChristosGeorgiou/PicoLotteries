var angularFilesort = require('gulp-angular-filesort');
var browserSync = require('browser-sync').create();
var connectModrewrite = require('connect-modrewrite');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minify = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var minimatch = require('minimatch');

gulp.task('default', ['serve']);

gulp.task('serve', ['sass', 'build'], function() {

  browserSync.init({
    server: {
      baseDir: "./app"
    },
    notify: false,
    reloadOnRestart: true,
    open: false,
    online: false,
    logLevel: "info",
    ui: false,
    middleware: [function(req, res, next) {
      //console.log("REQUEST", req.url);
      if (minimatch(req.url, '**/*.json')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      next();
    }, connectModrewrite([
      '^[^\\.]*$ /index.html [L]'
    ])]
  });

  gulp.watch("./scss/**/**.*", ['sass']);
  gulp.watch("./app/src/**/*.js", ['build']);

});

gulp.task('sass', function() {

  return gulp.src("./scss/**/**.scss", {
      read: true,
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(gulp.dest("./app/assets/css"))
    .pipe(browserSync.reload({stream: true}));

});

gulp.task('build', function() {

  return gulp.src("./app/src/**/*.js")
    .pipe(angularFilesort())
    .pipe(sourcemaps.init())
    .pipe(concat("app.min.js", {
      newLine: ';'
    }))
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./app/assets/scripts"));

});
