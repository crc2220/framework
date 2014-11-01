var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bourbon = require('node-bourbon').includePaths,
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    svgSprite    = require('gulp-svg-sprites'),
    filter       = require('gulp-filter'),
    svg2png      = require('gulp-svg2png'),
    concat = require('gulp-concat'),
    order = require("gulp-order"),
    size = require('gulp-size'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    psi = require('psi'),
    site = 'http://localhost/bowl.com',
    key = '';


// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

//sass
var paths = {
    scss: './sass/*.scss'
};
gulp.task('sass', function() {
  return gulp.src(paths.scss)
    .pipe(sass({
      includePaths: ['styles'].concat(bourbon)
    }))
    .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest('./'))
    .pipe(size())
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(reload({stream:true}));
});
//js
gulp.task('js', function() {
  return gulp.src(['js/ui/*.js', 'js/main.js'])
    .pipe(order([
        "js/ui/*.js",
        "js/main.js"
    ]))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.min.js'))
    .pipe(uglify()) 
    .pipe(gulp.dest('js'))
    .pipe(size())
    .pipe(notify({ message: 'Scripts task complete' }));
});
//img
gulp.task('img', function () {
    return gulp.src('img/dev/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('img/'))
        .pipe(size())
        .pipe(notify({ message: 'img optimized' }));
});
//svg
gulp.task('svg', function () {
    return gulp.src('img/*.svg')
        .pipe(svgSprite())
        .pipe(gulp.dest('img')) // Write the sprite-sheet + CSS + Preview
        .pipe(filter("**/*.svg"))  // Filter out everything except the SVG file
        .pipe(svg2png())           // Create a PNG
        .pipe(gulp.dest('img'));
});
//psi testing
// gulp.task('mobile', function (cb) {
//     psi({
//         // key: key
//         nokey: 'true',
//         url: site,
//         strategy: 'mobile',
//     }, cb);
// });
// gulp.task('desktop', function (cb) {
//     psi({
//         nokey: 'true',
//         // key: key,
//         url: site,
//         strategy: 'desktop',
//     }, cb);
// });
//run all tasks
gulp.task('default', function() {
    gulp.start('sass', 'js', 'img', 'browser-sync');
});
//run gulp tasks on file change
gulp.task('watch', function() {
  gulp.watch('sass/style.scss', ['sass']);
  gulp.watch('js/main.js', ['js']);
});
