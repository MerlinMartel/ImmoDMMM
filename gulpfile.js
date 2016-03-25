var gulp = require('gulp')
    ,   uglify = require('gulp-uglify')
    ,   concat = require('gulp-concat')
    ,   watch = require('gulp-watch')
    ,   minify = require('gulp-minify')
    //,   csslint = require('gulp-csslint')
    //,   minifycss = require('gulp-minify-css')
    ;

var codeMapDrive = 'x:';


//Not part of the watch...run manually
gulp.task('librariesJS', function () {
    gulp.src(['node_modules/moment/moment.js',
        'node_modules/angular/angular.min.js',
        'node_modules/underscore/underscore-min.js',
        'node_modules/angular-ui-grid/ui-grid.min.js'])
        .pipe(concat('libraries.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest("X:\\libraries"));
});
//Not part of the watch...run manually
gulp.task('librariesCSS', function () {
    gulp.src(['node_modules/angular-ui-grid/ui-grid.min.css'])
        .pipe(concat('libraries.css'))
        .pipe(minify())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest("X:\\libraries"));
});
//todo il valide pas si le fichier n'est pas présent à la source.... à valider


//Not part of the watch...run manually
gulp.task('libraries_umaknow', function () {
    gulp.src([
            'libraries_umaknow/umanage-module.js',
            'libraries_umaknow/spField-factory.js',
            'libraries_umaknow/spForm-factory.js',
            'libraries_umaknow/spJs-factory.js',
            'libraries_umaknow/spList-factory.js',
            'libraries_umaknow/PeoplePicker-directive.js',
            'libraries_umaknow/spSocial-factory.js',
            'libraries_umaknow/spTaxo-factory.js',
            'libraries_umaknow/spUser-factory.js',
            'libraries_umaknow/umanage-configs-provider.js',
            'libraries_umaknow/umanage-spRest-factory.js',
            'libraries_umaknow/umanage-spUrl-factory.js',
            'libraries_umaknow/utils-factory.js'])
        .pipe(concat('libraries_umaknow.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest("X:\\libraries_umaknow"));
});



gulp.task('codeDepenseNewDev', function () {
    gulp.src([
        'depenseNew/*.html',
        'depenseNew/*.js',
        'depenseNew/*.js.map',
        'depenseNew/*.ts',
        'depenseNew/*.css'])
        .pipe(gulp.dest("X:\\depenseNew"));
});
/*
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
*/

gulp.task('watch', function () {
    watch(['depenseNew/*.js','depenseNew/*.html','depenseNew/*.css'], function () {
        gulp.start('codeDepenseNewDev');
    });
});

gulp.task('default', ['watch']);