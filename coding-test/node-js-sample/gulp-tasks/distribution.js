const gulp = require('gulp');
const shell = require('gulp-shell');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const sequence = require('gulp-sequence');
const del = require('del');
const replace = require('gulp-replace');
const path = require('path');
const htmlReplace = require('gulp-html-replace');
const gutil = require('gulp-util');
const $ = require('gulp-load-plugins')();

const paths = {
  app: {
    base: 'public/',
    styles: [
      'public/*.svg'
    ],
    packages: [
      'public/images'
    ]
  },
  build: {
    dist: 'dist/'
  }
};

gulp.task('dist:clean', (callback) => {
  del.sync(['./dist']);
  callback();
});
// Copy packages
gulp.task('dist:packages', () => {
  return gulp.src([
    `./node_modules/**/*`
  ])
    .pipe(gulp.dest('./dist/node_modules'));
});

// Copy production files from public/ to dist/public
gulp.task('dist:files', () => {
  gulp.src([
    // copy public/
    `${paths.app.base}**/*`

  ])
  
    // Copy to dist
    .pipe(gulp.dest('./dist/public'));
});

// Copy node/express stuff
  gulp.src(['./index.js','./Procfile','./app.json', './package.json'])
    .pipe(gulp.dest('./dist'));


// Dist Build
gulp.task('dist:build', ['dist:packages', 'dist:files']);

// Update runtime deps
gulp.task('deps', () => {
  return gulp.src(paths.app.base, { read: false })
    .pipe(shell(['npm install']));
});

// Depencency cache for SPDY
gulp.task('depcache', () => {
  return gulp.src(paths.app.base, { read: false })
    .pipe(shell([
      'jspm depcache main',
    ]));
});


gulp.task('dist', sequence('dist:clean', 'deps', 'dist:build'));

