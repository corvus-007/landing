'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const rimraf = require('rimraf');

// Server
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });

  gulp.watch('build/**/*').on('change', browserSync.reload);
});

// Compile .pug files
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('app/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'));
});

// Compile .scss files
gulp.task('styles:compile', function () {
  return gulp.src('app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

// Clean
gulp.task('clean', function (cb) {
  rimraf('build', cb);
});

// Copy fonts
gulp.task('copy:fonts', function () {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));
});

// Copy images
gulp.task('copy:images', function () {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('build/images'));
});

// Copy
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

// Watchers
gulp.task('watch', function () {
  gulp.watch('app/template/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('app/styles/**/*.scss', gulp.series('styles:compile'));
});

gulp.task('start', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile', 'copy'),
  gulp.parallel('watch', 'server')
));
