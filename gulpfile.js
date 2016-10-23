//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    cssmin = require('gulp-clean-css'),
    replace = require('gulp-replace');

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('less/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
//      .pipe(cssmin()) //压缩css
        .pipe(gulp.dest('less/css/')); //将会在src/css下生成index.css
});

gulp.task('crs',function(){
	gulp.src('index.html')
	.pipe(cssmin())
	.pipe(gulp.dest('html'));
});

gulp.task('pxToRem',function(){
	gulp.src('less/css/index.css')
	.pipe(replace(/(\d+)px/g,function(match,p1){
		return (Number(p1)/3).toFixed(2)+ 'rem';
	}))
	.pipe(gulp.dest('html'));
});

//gulp.task('default',['testLess']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
gulp.task('default',function(){
//	gulp.watch(['less/*.less','*'],['testLess','crs']);
	gulp.watch(['less/css/*.css'],['pxToRem']);
})
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, optionsds]) 处理完后文件生成路径