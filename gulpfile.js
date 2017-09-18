// Packages
const gulp = require('gulp')
const del = require('del')
const babel = require('gulp-babel')
const help = require('gulp-task-listing')

gulp.task('compile', () => {
  return gulp.src('lib/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('build/lib'))
})

gulp.task('help', help)
gulp.task('clean', () => del(['build']))
gulp.task('default', ['compile'])
