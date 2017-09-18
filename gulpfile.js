// Packages
const gulp = require('gulp')
const del = require('del')
const babel = require('gulp-babel')

const path = 'src/**/*.js'

gulp.task('default', () => {
  return gulp.src(path)
  .pipe(babel())
  .pipe(gulp.dest('dist'))
})

gulp.task('clean', () => del(['dist']))
