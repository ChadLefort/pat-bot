var gulp = require('gulp');
var tslint = require('gulp-tslint');
var exec = require('child_process').exec;
var mocha = require('gulp-mocha');
var gulp = require('gulp-help')(gulp);
var path = require('path');
var del = require('del');
var tslintCustom = require('tslint');
var nodemon = require('gulp-nodemon');
require('dotbin');

var tsFilesGlob = (function (c) {
  return c.filesGlob || c.files || 'src/**/*.ts';
})(require('./tsconfig.json'));

gulp.task('clean', 'Cleans the generated js files from lib directory', function () {
  return del([
    'lib/**/*'
  ]);
});

gulp.task('lint', 'Lints all TypeScript source files', function () {
  return gulp.src(tsFilesGlob)
    .pipe(tslint({
      tslint: tslintCustom,
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

gulp.task('build', 'Compiles all TypeScript source files', ['lint'], function (cb) {
  exec('tsc --version', function (err, stdout, stderr) {
    console.log('Using TypeScript ', stdout);
    if (stderr) {
      console.log(stderr);
    }
  });

  return exec('tsc', function (err, stdout, stderr) {
    console.log(stdout);
    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
});

gulp.task('test', 'Runs the Jasmine test specs', ['build'], function () {
  return gulp.src('test/*.ts')
    .pipe(mocha({
      require: ['ts-node/register']
    }));
});

gulp.task('develop', 'Runs nodemon and watches the src directory', function () {
  var stream = nodemon({
    ext: 'ts',
    ignore: ['node_modules'],
    watch: [tsFilesGlob],
    tasks: ['build']
  });

  stream
    .on('restart', function () {
      console.log('restarted!');
    })
    .on('crash', function () {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10)
    });
});
