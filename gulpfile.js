'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon')

gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
  .pipe(sass({
    includePaths: require('node-neat').with(require('node-bourbon').includePaths)
  }).on('error', sass.logError))
  .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});


gulp.task('default', function() {
  console.log('default');
  // place code for your default task here
});
