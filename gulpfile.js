// Packages
const gulp = require('gulp')
const del = require('del')
const babel = require('gulp-babel')
const help = require('gulp-task-listing')

gulp.task('compile', () => {
  return gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('dist'))
})

gulp.task('help', help)
gulp.task('clean', () => del(['dist']))
gulp.task('default', ['compile'])
