const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass');



gulp.task('sass', () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ])
    .pipe(sass({outpudetStyle: 'compressed'}))
    .pipe(gulp.dest('src/css'))
    .pipe(browsersync.stream());
});
/*
gulp.task('html', () => {
    return gulp.src([
        'src/*.html'
    ])
    .pipe(gulp.dest('./'))
    .pipe(browsersync.stream());
}); */

gulp.task('js', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browsersync.stream());

});

gulp.task('serve', gulp.series('sass', function(){

    browsersync.init({

      server: './'

    });


    gulp.watch([

        'node_modules/bootstrap/scss/bootstrap.min.scss',
  
        'src/scss/*.scss'
  
        ], gulp.series('sass')
  
      );
  

      gulp.watch('*.html').on('change', browsersync.reload);

    }));
  

gulp.task('font-awesome', () => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('src/css'));
});

gulp.task('fonts', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'));
});

gulp.task('default', gulp.parallel('js', 'font-awesome', 'fonts', 'serve'))