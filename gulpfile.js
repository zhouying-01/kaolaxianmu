const gulp=require('gulp')//引入gulp;
const watch=require('gulp-watch')//引入监听
const minihtml = require('gulp-minify-html');//引入html的压缩插件
const minicss = require('gulp-minify-css');//引入css的压缩插件
const imagemin=require('gulp-imagemin');//图片
const uglify=require('gulp-uglify');//js
const babel=require('gulp-babel');
const es2015=require('babel-preset-es2015');

// 编译html压缩
gulp.task('uglifyhtml',()=>{
    return gulp.src('src/*.html')//引入文件
      .pipe(minihtml())//执行压缩插件
      .pipe(gulp.dest('dist/'));//输出
})

//压缩css文件
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css')//引入文件
        .pipe(minicss())//执行压缩插件
        .pipe(gulp.dest('dist/css/'));//输出
});

//压缩图片
gulp.task('uglifypng', () => {
    return gulp.src('src/img/*.{png,jpg,gif,ico,webp}')
    .pipe(imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/img'));
});


//es6转es5
//gulp-babel gulp-core  babel-preset-es2015
gulp.task('babeljs', () => {
    return gulp.src('src/script/*/*.js')//引入文件
        .pipe(babel({
            presets: ['es2015']
        }))//执行压缩插件 js压缩
        .pipe(gulp.dest('dist/script'));//输出
});


//监听
gulp.task('default', function () {//default:默认名称，编译时可以省略
    watch(['src/*.html','src/img/*.{png,jpg,gif,ico,webp}','src/css/*.css','src/script/*/*.js'], gulp.parallel('uglifyhtml','uglifypng','uglifycss','babeljs'));
});