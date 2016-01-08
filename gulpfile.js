var gulp = require('gulp')
    ,   uglify = require('gulp-uglify')
    ,   concat = require('gulp-concat')
    ,   jshint = require('gulp-jshint')
    ,   watch = require('gulp-watch')
    //,   csslint = require('gulp-csslint')
    //,   minifycss = require('gulp-minify-css')
    ;


gulp.task('jsDepense', function () {
    gulp.src(['code/c/FrameWork.js','code/c/depense/depense.js','code/c/depense/depenseList.js'])
        //.pipe(watch('umaAsset/c/PTTM17.less'))
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(concat('depense.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('y:\c'));
});
gulp.task('jsDepenseList', function () {
    gulp.src(['code/c/FrameWork.js','code/c/depense/depenseList.js'])
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(concat('depenseList.min.js'))
        //.pipe(uglify()) 
        .pipe(gulp.dest('y:\c'));
});
gulp.task('htmlDepense', function () {
    gulp.src(['code/c/depense/depense.html','code/c/depense/depenseList.html'])
        .pipe(gulp.dest('y:\c'));
});

gulp.task('jsImpot', function () {
    gulp.src(['code/c/FrameWork.js', 'code/c/impot/impot.js'])
        //.pipe(watch('umaAsset/c/PTTM17.less'))
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(concat('impot.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('y:\c'));
});
gulp.task('htmlImpot', function () {
    gulp.src('code/c/impot/impot.html')
        .pipe(gulp.dest('y:\c'));
});
gulp.task('jsShowPDFInEditForm', function () {
    gulp.src(['code/c/FrameWork.js', 'code/c/EditForm/ShowPDFInEditForm.js'])
        //.pipe(watch('umaAsset/c/PTTM17.less'))
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(concat('ShowPDFInEditForm.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('y:\c'));
});
gulp.task('htmlShowPDFInEditForm', function () {
    gulp.src('code/c/EditForm/ShowPDFInEditForm.html')
        .pipe(gulp.dest('y:\c'));
});
gulp.task('cssShowPDFInEditForm', function () {
    gulp.src('code/c/EditForm/ShowPDFInEditForm.css')
        .pipe(gulp.dest('y:\c'));
});


gulp.task('watch', function () {
    watch(['**/*.js','**/*.html','**/*.css'], function () {
        gulp.start('jsDepense','htmlDepense', 'jsImpot', 'htmlImpot','jsShowPDFInEditForm','htmlShowPDFInEditForm', 'cssShowPDFInEditForm','jsDepenseList');
    });
});

gulp.task('default', ['watch']);