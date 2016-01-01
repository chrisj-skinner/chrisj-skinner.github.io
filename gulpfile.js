var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
// var del = require('del');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/main.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Concat CSS


// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('css/base.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Concat JS
// gulp.task('concat-js', function(){
//     return gulp.src([
//             'vendor/jquery/jquery.min.js',
//             'vendor/bootstrap/js/bootstrap.min.js',
//             'js/*.js'
//         ])
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest('js'))
// });

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('js/theme.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
});

// Run everything
gulp.task('default', ['minify-css', 'minify-js', 'copy']);

// Build task with dist creation
gulp.task('build', ['default'], function() {
    return gulp.src([
        'css/*.min.css',
        'js/*.min.js',
        'vendor/font-awesome/fonts/**',
        'index.html',
        'img/**'],
        { base: './' })
    .pipe(gulp.dest('dist'));
});

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

// Clean task
// gulp.task('build')

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less'], function() {
    gulp.watch('less/*.less', ['less']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('css/*.css', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
