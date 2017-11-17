'use strict';

const gulp = require('gulp'),
      minifyCSS = require('gulp-minify-css'),
      concat = require('gulp-concat'),

      rubyScss = require('gulp-ruby-sass'),
      scss = require('gulp-sass'),

      uglify = require('gulp-uglify'), // minify code to reduce the file size of the concatenated js file
      del = require('del'),
      rename = require('gulp-rename'),

      jshint = require('gulp-jshint'), // analyze js files and report any errors that could potentially break an application

      plumber = require('gulp-plumber'), // handle errors
      imagemin = require('gulp-imagemin'), // optimize images by minifying them, which help reduce the load times of the project

      connect = require('connect'),
      serve = require('serve-static'),
      browsersync = require('browser-sync'), // handle browser refreshing
      livereload = require('gulp-livereload'),
      beeper = require('beeper'),
      sourcemaps = require('gulp-sourcemaps');


// clean task
gulp.task('clean', function(cb) {
  return del(['assets'], cb);
});

// error handler
function errorLog(error) {
  beeper();
  console.error.bind(error);
  this.emit('end');
}

// writing the Images task
gulp.task('images', function() {
  return gulp.src('images/*')
         .pipe(imagemin())
         .pipe(gulp.dest('assets/dest/images'));
});

gulp.task('styles', function() {
  return gulp.src('scss/*.scss')
      .pipe(scss().on('error', errorLog))
      //.pipe(concat('styles.css'))
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/dest/css'))
      .pipe(livereload());
});

// Process scripts
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
      .pipe(sourcemaps.init())
      .pipe(plumber({
          errorHandler: errorLog
      }))
      .pipe(concat('all.js'))
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(sourcemaps.write('assets/maps'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/dest/js'));
});

// writing a server task
gulp.task('server', function() {
  return connect().use(serve(__dirname))
         .listen(8080)
         .on('listenning', function() {
           console.log('Server running: view at http://localhost:8080');
         });
});

// writing a task browsersync
gulp.task('browsersync', function(cb) {
  return browsersync({
    server: {
      baseDir: './'
    }
  }, cb);
});

// Watch files for changes
gulp.task('watch', function() {
  livereload.listen();

  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('images/*', ['images']);
});


// gulp.task('watch', function() {
//   gulp.watch('scss/*.scss',
//       gulp.series('clean', 'styles', browsersync.reload));
//   gulp.watch('js/*.js',
//       gulp.series('scripts', browsersync.reload));
//   gulp.watch('images/*',
//       gulp.series('images', browsersync.reload));
// });

// Default task
gulp.task('default', ['clean', 'styles', 'scripts', 'images', 'browsersync', 'watch']);

// gulp.task('default',
//     gulp.parallel['delete', 'styles', 'scripts', 'images', 'browsersync', 'server', 'watch']);
