const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

//gulp.task -> görev olusturmak icin
//gulp.src -> kaynak dosyalari
//gulp.dest ->hedef dizinimiz
//gulp.watch ->izleme ve görev calıstırma
//pipe -> modifiy


gulp.task('imagesMin', () => {
   gulp.src('./src/images/*')
      .pipe(imagemin())//resim boyutunu düşürmek için kullandığımız kod
      .pipe(gulp.dest('./dist/images/'))
      .pipe(browserSync.stream());
});

gulp.task('html', () => {
   gulp.src('./src/*.html')
      .pipe(gulp.dest('./dist/'))
      .pipe(browserSync.stream());
});


gulp.task('scriptsMin', () => {
   gulp.src('./src/scripts/*.js')
      .pipe(concat('all.js'))	//javascript filelarını birleştirip all.js adında diste atılır
      .pipe(uglify())			//Js kodlarının bosluk vs düzenler
      .pipe(gulp.dest('./dist/scripts/'))
      .pipe(browserSync.stream());
});

gulp.task('stylecssMin', () => {
   gulp.src('./src/style/*.css')
      .pipe(concat('min.css'))
      .pipe(cleanCss())
      .pipe(gulp.dest('./dist/style/'))
      .pipe(browserSync.stream());

});

gulp.task('sass', () => {
   gulp.src('./src/style/*.scss')
      .pipe(sass()) // SASS dosylarını css cevirmek için kullanımı
      .pipe(cleanCss())
      .pipe(gulp.dest('./dist/style/'))
      .pipe(browserSync.stream());
});

gulp.task('serve', ['imagesMin', 'stylecssMin', 'html', 'scriptsMin', 'sass'], () => {

   browserSync.init({
      server: './dist/'
   });

   gulp.watch('./src/images/*', ['imagesMin']);
   gulp.watch('./src/*.html', ['html']);
   gulp.watch('./src/scripts/*.js', ['scriptsMin']);
   gulp.watch('./src/style/*.css', ['stylecssMin']);
   gulp.watch('./src/style/*.scss', ['sass']);


});

gulp.task('default', ['serve']);