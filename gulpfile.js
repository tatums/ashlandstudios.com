'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./src/sass/app.scss')
  .pipe(sass({
    includePaths: require('node-neat').with(require('node-bourbon').includePaths)
  }).on('error', sass.logError))
  .pipe(gulp.dest('./css'))
  .pipe(connect.reload());
});

gulp.task('javascript:vendor', function() {
  return gulp.src([
    './node_modules/mustache/mustache.min.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./scripts/'));
});

gulp.task('javascript', function () {
  gulp.src('./scripts/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch(['./scripts/*.js'], ['javascript']);
  gulp.watch(['./src/sass/*.scss'], ['sass']);
});


gulp.task('default', ['connect', 'watch']);
