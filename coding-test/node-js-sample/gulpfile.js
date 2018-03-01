'use strict';
const gulp = require('gulp');
const replace = require('gulp-replace');
// const path = require('path');
var requireDir = require('require-dir');
const sequence = require('gulp-sequence');
const del = require('del');


gulp.task('dist:clean', (callback) => {
  del.sync(['./dist']);
  callback();
});


// Load tasks from tasks folder
requireDir('./gulp-tasks/', {recurse: true});

const paths = { 
	  app: {
		base: 'public/'
	    },
	  build:{
		dist: 'dist/'
	}
};

// Copy packages
// gulp.task('dist:packages', () => {
//   return gulp.src([
//     `${paths.app.base}**/node_modules/**/*`,
//     `${paths.app.base}**/public/**/*`
    
//   ])
//     .pipe(gulp.dest('./dist'));
// });

gulp.task('default', ['dist']);


