var gulp        = require('gulp');
var $plugin     = require('gulp-load-plugins')({ camelize: true});
var gutil       = require('gutil');
var glob        = require('glob');
var path        = require('path');
var StreamQueue = require('streamqueue');
var fs          = require('fs');
var runSequence = require('run-sequence');

var scripts     = require('./src/node/scripts.js');

/**
 * Project Paths
 */
global.paths    = require('./paths.json');


/**
 * Move the keep javascript files to the public path
 */
gulp.task('keep-js', function() {
  return gulp.src([
    global.paths.src.keep + '**/*.js',
    global.paths.src.keep + '**/*.json'
  ])
    .pipe($plugin.plumber())
    .pipe($plugin.fixmyjs({
      camelcase: true,
      curly: true,
      eqeqeq: true,
      forin: true,
      indent: 4,
      plusplus: true,
      quotmark: 'single',
      strict: true,
      maxlen: 100,
      bitwize: true
    }))
    // .pipe($plugin.jslint({
    //     // these directives can
    //     // be found in the official
    //     // JSLint documentation.
    //   }))
    .pipe(gulp.dest(global.paths.dest.keep));
});

/**
 * Watch the keep javascript files to the public path
 */
gulp.task('watch-keep-js', function () {
  return gulp.src([
    global.paths.src.keep + '**/*.js',
    global.paths.src.keep + '**/*.json'
  ])
  .pipe($plugin.watch({ emit: 'one',emitOnGlob: false }, function(files) {
    files
      .pipe($plugin.plumber())
      .pipe($plugin.fixmyjs({
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        indent: 4,
        plusplus: true,
        quotmark: 'single',
        strict: true,
        maxlen: 100,
        bitwize: true
      }))
      // .pipe($plugin.jslint({
      //     // these directives can
      //     // be found in the onfficial
      //     // JSLint documentation.
      //   }))
      .pipe(gulp.dest(global.paths.dest.keep));
  }));
});

/**
 * Move the keep image files to the public path
 */
gulp.task('keep-images', function() {
  return gulp.src([
    global.paths.src.keep + '**/*.jpg',
    global.paths.src.keep + '**/*.gif',
    global.paths.src.keep + '**/*.png'
  ])
    .pipe(gulp.dest(global.paths.dest.keep));
});

gulp.task('watch-keep-images', function () {
  return gulp.src([
    global.paths.src.keep + '**/*.jpg',
    global.paths.src.keep + '**/*.gif',
    global.paths.src.keep + '**/*.png'
  ])
  .pipe($plugin.watch({ emit: 'one', emitOnGlob: false }, function(files) {
    files
      .pipe(gulp.dest(global.paths.dest.keep));
  }));
});

/**
 * Move the keep image files to the public path
 */
gulp.task('keep-html', function() {
  return gulp.src([
    global.paths.src.keep + '**/*.html',
    global.paths.src.keep + '**/*.htm'
  ])
    .pipe(gulp.dest(global.paths.dest.keep));
});

gulp.task('watch-keep-html', function () {
  return gulp.src([
    global.paths.src.keep + '**/*.html',
    global.paths.src.keep + '**/*.htm'
  ])
  .pipe($plugin.watch({ emit: 'one', emitOnGlob: false }, function(files) {
    files
      .pipe(gulp.dest(global.paths.dest.keep));
  }));
});

/**
 * Move the keep image files to the public path
 */
gulp.task('keep-text', function() {
  return gulp.src([
    global.paths.src.keep + '**/*.xml',
    global.paths.src.keep + '**/*.txt'
  ])
    .pipe(gulp.dest(global.paths.dest.keep));
});

gulp.task('watch-keep-text', function () {
  return gulp.src([
    global.paths.src.keep + '**/*.xml',
    global.paths.src.keep + '**/*.txt'
  ])
  .pipe($plugin.watch({ emit: 'one', emitOnGlob: false }, function(files) {
    files
      .pipe(gulp.dest(global.paths.dest.keep));
  }));
});

gulp.task(
  'watch-keep', [
    'watch-keep-js', 
    'watch-keep-images',
    'watch-keep-html',
    'watch-keep-text'
  ],function(){ 
});

/**
 * Move the keep files to the public path
 */
gulp.task('keep-js-prod', function() {
  return gulp.src([
    global.paths.src.keep + '**/*.js',
    global.paths.src.keep + '**/*.json'
  ])
    .pipe($plugin.ngmin())
    .pipe($plugin.jsmin())
    .pipe(gulp.dest(global.paths.dest.keep));
});

/**
 * Move the keep files to the public path
 */
gulp.task('keep', ['keep-js', 'keep-images', 'keep-html', 'keep-text'], function() {
});

/**
 * Move the keep files to the public path in production
 */
gulp.task('keep-prod', ['keep-js-prod', 'keep-images', 'keep-html', 'keep-text'], function() {
});

/**
 * Create the javascript and map files from the coffeescripts
 */
gulp.task('coffee', function( callback ) {

  /**
   * this what we want to do, but doesn't work as excepted 
   */
  // gulp.src(global.paths.src.coffee + '**/*.coffee')
  //   .pipe($plugin.sourcemaps.init())
  //   .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
  //   .pipe($plugin.sourcemaps.write( './maps/'))
  //   .pipe(gulp.dest(global.paths.dest.script));

  /**
   * @workaround This is a not so easy or fast way to compile the coffee
   * scripts and create the maps but it was necessary to the current version
   * @todo use the tradicional way when fixed
   * @link https://github.com/gulpjs/gulp/issues/356
   */
  var coffeePath = global.paths.src.coffee + '**/*.coffee';
  var coffeeFiles = glob.sync( coffeePath );
  var intCounter = 0;
  coffeeFiles.forEach(function(fullPathFileName){

    var srcDir = path.dirname(fullPathFileName);
    var srcRelativeDir = srcDir.substr(global.paths.src.coffee.length);
    var destDir = global.paths.dest.scripts + srcRelativeDir + "/";

    var answer = gulp.src(fullPathFileName)
      .pipe($plugin.sourcemaps.init())
      .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
      .pipe($plugin.sourcemaps.write( './maps/'))
      // .pipe($plugin.template({},{ 'imports': { 'scripts': scripts, 'paths': global.paths } }))
      .pipe(gulp.dest(destDir))

    answer.on('end',function(){
      intCounter++;
      if( intCounter >= coffeeFiles.length ) {
        callback();
      }
    })
  });
 });


gulp.task('watch-coffee', function () {
  var coffeePath = global.paths.src.coffee + '**/*.coffee';
  $plugin.watch({ glob: coffeePath, emitOnGlob: false })
      .pipe($plugin.sourcemaps.init())
      .pipe($plugin.plumber())
      .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
      .pipe($plugin.sourcemaps.write())
      // .pipe($plugin.template({},{ 'imports': { 'scripts': scripts, 'paths': global.paths } }))
      .pipe(gulp.dest(global.paths.dest.scripts ));
});

/**
 * Create the minify version of the javascript files
 */
gulp.task('coffee-prod',function() {
  gulp.src(global.paths.src.coffee + '**/*.coffee')
    .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
    .pipe($plugin.ngmin())
    .pipe($plugin.jsmin())
    .pipe(gulp.dest("global.paths.dest.scripts"));
});


/**
 * Convert each folder into a single js
 */
gulp.task('js-folder',function() {

  var componentsFolders = glob.sync( global.paths.dest.scripts + '**/');
  componentsFolders.forEach(function(folder){
    var $string = require('string');
    var componentName = folder.match(/.+\/(.+)\/$/)[1];
    var packageFileName = componentName.toLowerCase() + ".package.min.js";
    var packageName = $string(
      folder.substr(
        global.paths.dest.path.length,
        folder.length - 1 - global.paths.dest.path.length
      )
    ).replaceAll( "/" , "." ) + ".*";

    scripts.addScript( packageName, folder.substr( global.paths.dest.path.length ) + packageFileName );

    gulp.src([folder + '*.js', '!' + folder + '*.package.min.js'])
      .pipe($plugin.ngmin())
      .pipe($plugin.jsmin())
      .pipe($plugin.uglify())
      // .pipe($plugin.autoprefixer('test',{map:false}))
      .pipe($plugin.concat( packageFileName ,{map:false}))
      .pipe(gulp.dest(folder));
    });
});

/**
 * Map all the js files to the scripts component
 */
gulp.task('js-files', ['coffee'], function() {

  var scriptFiles = glob.sync( global.paths.dest.scripts + '**/*.js');
  var $string = require('string');

  scriptFiles.forEach(function(fullPathFileName){
    var packageName = $string(
      fullPathFileName.substr(
        global.paths.dest.path.length
      ).split( "." )[0]
    ).replaceAll( "/" , "." );

    scripts.addScript( packageName, fullPathFileName.substr( global.paths.dest.path.length ) );


  });

  /**
   * Create or Update the Tree with the javascript path
   */
  fs.writeFile( global.paths.dest.scripts + 'tree.json', JSON.stringify( scripts.getTree() ), 
      function(){ /* file created */ } 
    );
});

/**
 * Create all the template files
 */
gulp.task('jade',['jade-index','jade-templates'], function(){
});


/**
 * Create the html files from the jade scripts
 */
gulp.task('jade-templates',['js-files'], function() {
  return gulp.src(global.paths.src.template + '*.jade', '!' + global.paths.src.template + 'index.jade')
    .pipe($plugin.jade())
    .pipe($plugin.template({},{ 'imports': { 'scripts': scripts, 'paths': global.paths } }))
    .pipe(gulp.dest(global.paths.dest.template));
});


gulp.task('watch-jade-templates', ['js-files'], function () {
  return gulp.src(global.paths.src.template + '*.jade', '!' + global.paths.src.template + 'index.jade')
    .pipe($plugin.watch({ emit: 'one',emitOnGlob: false }, function(files) {
      files
        .pipe($plugin.plumber())
        .pipe($plugin.jade())
        .pipe($plugin.template({},{ 'imports': { 'scripts': scripts, 'paths': global.paths } }))
        .pipe(gulp.dest(global.paths.dest.template));
    }))
});

/**
 * Create the html files from the jade scripts
 */
gulp.task('jade-index',['js-files'], function() {
  return gulp.src(global.paths.src.template + 'index.jade')
    .pipe($plugin.jade())
    .pipe($plugin.template({},{ 'imports': { 'scripts': scripts } }))
    .pipe(gulp.dest(global.paths.dest.path));
});

gulp.task('watch-jade-index', ['js-files'], function () {
  return gulp.src(global.paths.src.template + 'index.jade')
    .pipe($plugin.watch({ emit: 'one', emitOnGlob: false }, function(files) {
      files
        .pipe($plugin.plumber())
        .pipe($plugin.jade())
        .pipe($plugin.template({},{ 'imports': { 'scripts': scripts, 'paths': global.paths } }))
        .pipe(gulp.dest(global.paths.dest.path));
    }))
});

gulp.task(
  'watch-jade', [
    'watch-jade-index', 
    'watch-jade-templates'
  ],function(){ 
});


gulp.task('watch', ['watch-jade', 'watch-coffee', 'watch-keep'], function(){

});

gulp.task('clean', function(cb){
  var rimraf = require('rimraf');
  rimraf('./public', cb);
});

gulp.task('run', function(callback){
  runSequence('clean','coffee','jade','keep', 'watch', callback);
});

gulp.task('prod', ['coffee-prod', 'js-folder', 'jade', 'keep-prod'], function(){

});


gulp.task('default', function() {
  // place code for your default task here
});

