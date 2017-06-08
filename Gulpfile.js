var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    reload       = browserSync.reload,
    sass         = require('gulp-sass'),
    cleanCSS     = require('gulp-clean-css'),
    compass      = require('gulp-compass');

gulp.task('sass', function() {
    return gulp.src('assets/styles/**/*.scss')
    .pipe(compass({
        config_file: 'assets/styles/config.rb',
        css: 'assets/styles/css',
        sass: 'assets/styles/sass'
    }))
    .pipe(gulp.dest('assets/styles/css'));
});

gulp.task('minify-css', function() {
    return gulp.src('assets/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("assets/styles/**/*.scss", ['sass', 'minify-css', reload]);
    gulp.watch("./*.html").on('change', reload);
});

gulp.task('default', ['serve']);
