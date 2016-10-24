'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-clean-css'),
    replace = require('gulp-replace'),

    //线上环境配置 (用于压缩合并静态资源文件，同时生成指定的代码至release文件夹)
    sass = require('gulp-ruby-sass'),
    useref = require('gulp-useref'),
    minifycss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    filter = require('gulp-filter'),
    webserver = require('gulp-webserver'),
    livereload = require('gulp-livereload'),
    base64 = require('gulp-base64');

//gulp.task('default', ['clean'], function () {
//  gulp.start('index', 'plugin', 'images');
//});

gulp.task('index', ['clean'], function() {
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});

    return gulp.src('view/*.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())             // 压缩Js
        .pipe(rev())                // 名称增加版本号
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(base64({
            baseDir: 'style/images/',
            extensions: ['png'],
            maxImageSize: 50 * 1024, // bytes
            debug: true
        }))
        .pipe(minifycss())          // 压缩Css
        .pipe(rev())                // 名称增加版本号
        .pipe(cssFilter.restore)
        .pipe(revReplace())         // 重写文件名到html
        //.pipe(minifyHtml)
        .pipe(gulp.dest('release'));
});

// 扩展应用
gulp.task('plugin', function () {
    return gulp.src('src/plugin/*')
        .pipe(gulp.dest('release/plugin'));
});

// 过大的图片不支持base64，只能copy过去
gulp.task('images', function () {
    return gulp.src('style/images/*')
        .pipe(gulp.dest('release/assets/css/images/welcome/')); // 图片过大，需要单独copy
});

// 清理文件
gulp.task('clean', function () {
    return gulp.src(['release', 'build'], {read: false}).pipe(clean());
});

// 看守线程
gulp.task('watch', function () {
    gulp.watch('src/assets/styles/**/*.scss', ['styles']);// 看守所有.scss档
    gulp.watch('src/assets/scripts/**/*.js', ['scripts']);// 看守所有.js档
    gulp.watch('src/assets/images/**/*', ['images']);// 看守所有图片档
    // 建立即时重整服务
    var server = livereload();
    // 看守所有位在 release/  目录下的档案，一旦有更动，便进行重整
    gulp.watch(['release/**']).on('change', function (file) {
        server.changed(file.path);
    });
});

gulp.task('webserver', function () {
    gulp.src('src')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

//本地环境配置
gulp.task('testLess', function () {
    return gulp.src('less/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
//      .pipe(cssmin()) //压缩css
        .pipe(gulp.dest('less/css/')); //将会在src/css下生成index.css
});

gulp.task('pxToRem',function(){
	return gulp.src('less/css/index.css')
	.pipe(replace(/(\d+)px/g,function(match,p1){
		return (Number(p1)/3).toFixed(2)+ 'rem';
	}))
	.pipe(gulp.dest('html'));
});

//获取匹配到的文件名
gulp.task('fileName',function(){
	gulp.src('modules/controller/*.*')
    .on('data',function(file){
    	console.log(file.history[0])
	});
});


//gulp.task('default',['elseTask']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
//gulp.task('default',function(){
//	gulp.watch(['less/css/*.css'],['pxToRem']);
//})
