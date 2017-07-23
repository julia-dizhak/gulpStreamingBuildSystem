// Load Node modules/plugins
var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    myth = require('gulp-myth'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'), // minify code to reduce the file size of the concatenated js file
    del = require('del'),
    rename = require('gulp-rename'),
    //jshint = require('gulp-jshint'), // analyze js files and report any errors that could potentially break an application
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'), // optimize images by minifying them, which help reduce the load times of the project
    connect = require('connect'),
    serve = require('serve-static'),
    browsersync = require('browser-sync'), // handle browser refreshing
    beeper = require('beeper'),
    sourcemaps = require('gulp-sourcemaps');

// Writing a task
// gulp.task(name, function() {
//   return gulp
//       .src(path) - input
//       .pipe(plugin)
//       .pipe(plugin)
//       .pipe(gulp.dest(path)) - output;
// });

gulp.task('delete', function() {
  del(['assets/*']), function(err) {
    console.log('Files deleted');
  }
});

// clean task
gulp.task('clean', function(cb) {
  return del(['assets'], cb);
})

// error handler
function onError(err) {
  beeper();
  console.log(err)
}

// Process styles
gulp.task('styles', function() {
  return gulp.src('css/*.css')
      .pipe(plumber({
              errorHandler: onError
      }))
      .pipe(concat('styles.css'))
      //.pipe(myth)
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/css'));
});

// writing the Images task
gulp.task('images', function() {
  return gulp.src('images/*')
         .pipe(imagemin())
         .pipe(gulp.dest('assets/images'));
});

// Process scripts
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(concat('all.js'))
      //.pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(sourcemaps.write('assets/maps'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('assets/js'));
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

// the watch task / Watch files for changes
// gulp.task('watch', function() {
//   gulp.watch('css/*.css', ['styles']);
//   gulp.watch('js/*.js', ['scripts']);
//   gulp.watch('images/*', ['images']);
// });
gulp.task('watch', function() {
  gulp.watch('css/*.css',
      gulp.series('clean', 'styles', browsersync.reload));
  gulp.watch('js/*.js',
      gulp.series('scripts', browsersync.reload));
  gulp.watch('images/*',
      gulp.series('images', browsersync.reload));
});

// Default task
gulp.task('default', ['delete', 'styles', 'scripts', 'images', 'browsersync', 'watch']);

// gulp.task('default',
//     gulp.parallel['delete', 'styles', 'scripts', 'images', 'browsersync', 'server', 'watch']);
