var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
// POST CSS
var postcss = require('gulp-postcss');
// OTHER UTILITIES
var browserSync = require('browser-sync').create();
// This is an object which defines paths for the styles.
// The folder, files to look for and destination are all required for sass
var paths = {
    styles: {
        src: './SCSS/',
        files: './SCSS/**/*.scss',
        dest: './CSS/'
    }
}

gulp.task('styles', function() {
    gulp.src(paths.styles.files)
    // Sass
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
        require("postcss-cssnext")(),
        require("cssnano")()
    ]))
    .pipe(sourcemaps.write('.'))
    // Finally output a css file
    .pipe(gulp.dest(paths.styles.dest));
    // Inject into browser
    //.pipe(browserSync.stream());
});

// Static server
gulp.task('serve', ['styles'], function() {
    browserSync.init({
        server: {
        baseDir: "./"
        }
    });
    gulp.watch(paths.styles.files, ['styles']);
    gulp.watch("/*.html").on('change', browserSync.reload);
});

//Watch task
gulp.task('default', ['serve'], function() {
gulp.watch(paths.styles.files, ['styles']);
});
