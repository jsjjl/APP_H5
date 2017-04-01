//gulp
var gulp = require('gulp');
//输出带时间和颜色
var gutil = require('gulp-util');
//重新编译被修改的文件
var watchPath = require('gulp-watch-path');
//错误提示,不会让 gulp 停止运行
var combiner = require('stream-combiner2');
//生成对应的.map文件以便使用 Chrome 控制台调试代码
var sourcemaps = require('gulp-sourcemaps');
//压缩css
var minifycss = require('gulp-minify-css');
//解析CSS文件并且添加浏览器前缀到CSS规则
var autoprefixer = require('gulp-autoprefixer');
//压缩less
var less = require('gulp-less');
//压缩图片
var imagemin = require('gulp-imagemin');
// 压缩png图片的插件
var pngquant = require('imagemin-pngquant');
//压缩html
var htmlmin = require('gulp-htmlmin');
//压缩js
var uglify = require('gulp-uglify');
//- 多个文件合并为一个
var concat = require('gulp-concat');
//- 对文件名加MD5后缀
var rev = require('gulp-rev');
//- 路径替换
var revCollector = require('gulp-rev-collector');

// 自动同步浏览器插件
var browserSync = require('browser-sync');
// 合并文件的插件
var useref = require('gulp-useref');
//区分当前是开发环境
var gulpIf = require('gulp-if');
// 缓存插件，可以加快编译速度
var cache = require('gulp-cache');
// 删除文件插件
var del = require('del');
// 同步运行任务插件
var runSequence = require('run-sequence');
//
var lazypipe = require('lazypipe');
// 合成sprite图片插件
var spritesmith = require('gulp.spritesmith');
var imageminOptipng = require('imagemin-optipng');
var gulpRetinaSprites = require('gulp-retina-sprites');


//当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
//当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
var vinylPaths = require('vinyl-paths');
//清除文件
var clean = require('gulp-clean');
//px转rem 
var px2rem = require('gulp-px2rem');



/*控制台输出报错信息*/
var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}


// 编译less文件，添加css3属性浏览器前缀，reload 浏览器
gulp.task('less', function () {
 return gulp.src(['../app/develop/src/less/**/*.less'])
     .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
     .pipe(less())
     .pipe(autoprefixer())
     //.pipe(cssnano())
     .pipe(gulp.dest('../app/develop/src/css'))
     .pipe(browserSync.reload({stream: true}));
});
// 自动更新浏览器任务   browser-sync start --server --files "**/*.css, **/*.js, **/*.html"
gulp.task('browserSync', function () {
 browserSync.init({
     server: {
         baseDir: '../app/develop/',
     }
 })
});

// 监控任务，当有less文件，html文件，js文件改动的时候，刷新浏览器
gulp.task('watch', ['browserSync', 'less'], function () {
 gulp.watch('../app/develop/src/less/**/*.less', ['less']);
 gulp.watch('../app/develop/src/css/*.css', browserSync.reload);
 gulp.watch('../app/develop/html/**/*.html', browserSync.reload);
 gulp.watch('../app/develop/src/js/**/*.js', browserSync.reload);
});

// gulp 默认执行任务 less转css 与 实时刷新
gulp.task('default', function (callback) {
 runSequence(['less', 'browserSync', 'watch'], callback);
});





/*压缩js*/
gulp.task('uglifyjs', function () {
    var combined = combiner.obj([
        gulp.src('../app/develop/src/js/**/*.js'),
        uglify(),
        gulp.dest('../app/release/src/js/')
    ])
    combined.on('error', handleError)
})

/*压缩css*/
gulp.task('minifycss', function () {
    gulp.src('../app/develop/src/css/**/*.css')
        .pipe(autoprefixer())
		//.pipe(.pipe(px2rem({'width_design':750,'valid_num':6,'pieces':10}))
        .pipe(minifycss())
        .pipe(gulp.dest('../app/release/src/css/'))
})

// 合并sprite图任务
gulp.task('sprite', function () {
 var spriteData = gulp.src('../app/develop/src/sprite/**/*.png')
     .pipe(spritesmith({
         imgName: 'images/sprite.png',
         cssName: 'css/sprite.css',
		 retinaSrcFilter: '../app/develop/src/sprite/**/*@2x.png',
		 retinaImgName: 'images/spritesheet@2x.png',
		 cssFormat: 'css',
		 padding: 5,
     }))
 	
	//.pipe(vinylPaths(del));
 return spriteData.pipe(gulp.dest('../app/release/src/'))
});






// 图片压缩任务
gulp.task('images', function () {
 return gulp.src('../app/develop/src/images/**/*.{png,jpg,gif,ico,svg}')
     .pipe(imagemin({
	 	 optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
	 	 progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
	 	 interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
	 	 multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        
     }))
     .pipe(gulp.dest('../app/release/src/images/'));
});





/*压缩html*/
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('../app/develop/html/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('../app/release/html/'));
});




// 清除缓存
gulp.task('cache:clear', function (cb) {
 return cache.clearAll(cb)
});

//拷贝文件
gulp.task('copy', function () {
    gulp.src('../app/develop/src/fonts/**/*')
        .pipe(gulp.dest('../app/release/src/fonts/'))
})






//合并css
gulp.task('cssConcat', function() {                                //- 创建一个名为 concat 的 task
    gulp.src(['../app/develop/src/css/global_m.css','../app/develop/src/css/layout_2017.css'])    //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('style.min.css'))                            //- 合并后的文件名
        .pipe(minifycss())                                      //- 压缩处理成一行
        //.pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('../app/release/src/css/'))                               //- 输出文件本地
        //.pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        //.pipe(gulp.dest('../app/develop/src/css/'));                              //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('rev',function() {console.log(1)
    gulp.src(['../app/develop/src/css/rev-manifest.json', '../app/release/html/**/*.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('../app/release/html/'));                     //- 替换后的文件输出的目录
		
});



//合并js
gulp.task('jsConcat', function() {
     	gulp.src(['../app/develop/src/js/zepto.min.js','../app/develop/src/js/base.js'])
        .pipe(concat('base.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../app/release/src/js/'));   
		
		gulp.src(['../app/develop/src/js/plus/zepto.picLazyLoad.min.js','../app/develop/src/js/plus/fx.js','../app/develop/src/js/plus/swiper.jquery.min.js','../app/develop/src/js/plus/ajax.js','../app/develop/src/js/url.js','../app/develop/src/js/native.js'])
        .pipe(concat('native.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../app/release/src/js/'))   
});



// 打包最终输出文件
gulp.task('build', function (callback) {
 runSequence(['less','uglifyjs','sprite','images','minifycss','htmlmin', 'copy','cssConcat','jsConcat'], callback);
});






