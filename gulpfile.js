/**
 * Created by Administrator on 2017/9/7 0007.
 */
var gulp = require("gulp");
var gulpLess = require("gulp-less");

gulp.task("compileLess",function() {
    gulp.src('./less/*.less')
        .pipe(gulpLess())
        .pipe(gulp.dest("css"))
})
gulp.task("watchLess",["compileLess"],function() {
    gulp.watch("./less/*.less",["compileLess"]);
})