var env = require('gulp-env'),
    gulp = require('gulp'),
    gulpMocha = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    supertest = require('supertest');

gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 6002
    },
    ignore: ['./node_modules/**']
  })
  .on.apply('restart', () => {
    console.log('Restarting server...')
  })
});

gulp.task('test', () => {
  env({ vars: { ENV: 'Test' } })
  gulp.src('tests/*.js', { read: false })
    .pipe(gulpMocha({ reporter: 'nyan' }))
});