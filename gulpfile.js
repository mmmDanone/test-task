const gulp = require('gulp');

const htmlMin = require('gulp-htmlmin');

const less = require('gulp-less');
const autoPrefix = new (require('less-plugin-autoprefix'))({browsers: ['> 0.01%']});
const groupMediaQueries = require('less-plugin-group-css-media-queries');
const cleanCSS = new (require('less-plugin-clean-css'))();

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('htmlmin', function() {
	return gulp.src(['./src/index.html'])
	.pipe(htmlMin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'));
});

gulp.task('less2css', function() {
	return gulp.src(['./src/styles/style.less'])
	.pipe(less({
		plugins: [autoPrefix, groupMediaQueries, cleanCSS]
	}))
	.pipe(gulp.dest('dist/styles'));
});

gulp.task('minjs', function() {
	return gulp.src(['src/javascript/jquery.flexslider.js', 'src/javascript/lightgallery.js', 'src/javascript/main.js'])
	.pipe(concat('main.js'))
	.pipe(uglify({
		toplevel: true
	}))
	.pipe(gulp.dest('./dist/javascript/'));
});

gulp.task('default', function() {
	gulp.watch(['./src/index.html'], gulp.series('htmlmin'));
	gulp.watch(['./src/styles/**/*+(less|css)'], gulp.series('less2css'));
	gulp.watch(['./src/javascript/*.js'], gulp.series('minjs'));
});