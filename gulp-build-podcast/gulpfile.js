var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    rename = require('gulp-rename'),
    //jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber');

gulp.task('delete', function() {
  del(['assets/*']), function(err) {
    console.log('Files deleted');
  }
})

gulp.task('style', function() {
  return gulp
      .src('css/style.css')
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets'));
});

gulp.task('scripts', function() {
  return gulp
      .src('js/scripts.js')
      //.pipe(plumber())
      .pipe(uglify())
      //.pipe(jshint())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets'));
});

gulp.task('watch', function() {
  gulp.watch('css/style.css', ['style']);
  gulp.watch('js/scripts.js', ['scripts']);
})

gulp.task('default', ['delete', 'style',  'scripts', 'watch']);
