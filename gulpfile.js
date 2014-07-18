var gulp        = require('gulp');
var $plugin     = require('gulp-load-plugins')({ camelize: true});
var gutil       = require('gutil');
var glob        = require('glob');
var global        = {};//require('global');
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
 * Move the keep files to the public path
 */
gulp.task('keep', function() {

  gulp.src([
    global.paths.src.keep + '**/*.js'
  ])
    // .pipe($plugin.fixmyjs({
    //   camelcase: true,
    //   curly: true,
    //   eqeqeq: true,
    //   forin: true,
    //   indent: 4,
    //   plusplus: true,
    //   quotmark: 'single',
    //   strict: true,
    //   maxlen: 100,
    //   bitwize: true
    // }))
    .pipe($plugin.jslint({
        // these directives can
        // be found in the official
        // JSLint documentation.
        node: true,
        browser: true,
        debug: true,
        white: true,
        indent: 4,
        plusplus: true,
        vars: true,
        evil: true,
        nomen: true,
        errorsOnly: true,
        todo: true
      }))
    .pipe(gulp.dest(global.paths.dest.keep));

  /**
   * @todo  Make some js, html, css, xml minify and validation
   */
  gulp.src([
    global.paths.src.keep + '**/*.json',
    global.paths.src.keep + '**/*.jpg',
    global.paths.src.keep + '**/*.gif',
    global.paths.src.keep + '**/*.png',
    global.paths.src.keep + '**/*.txt',
    global.paths.src.keep + '**/*.html',
    global.paths.src.keep + '**/*.xml',
    global.paths.src.keep + '**/*.htm'
  ])
    .pipe(gulp.dest(global.paths.dest.keep));
});

/**
 * Move the keep files to the public path
 */
gulp.task('keep-prod', function() {

  gulp.src([
    global.paths.src.keep + '**/*.js',
    global.paths.src.keep + '**/*.json'
  ])
    .pipe($plugin.ngmin())
    .pipe($plugin.jsmin())
    .pipe(gulp.dest(global.paths.dest.keep));

  /**
   * @todo  Make some html, css, xml minify and validation
   */
  gulp.src([
    global.paths.src.keep + '**/*.jpg',
    global.paths.src.keep + '**/*.gif',
    global.paths.src.keep + '**/*.png',
    global.paths.src.keep + '**/*.txt',
    global.paths.src.keep + '**/*.html',
    global.paths.src.keep + '**/*.xml',
    global.paths.src.keep + '**/*.htm'
  ])
    .pipe(gulp.dest(global.paths.dest.keep));
});

/**
 * Create the javascript and map files from the coffeescripts
 */
gulp.task('coffee', function() {

  // // this what we want to do, but doesn't work as excepted //
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
  return coffeeFiles.forEach(function(fullPathFileName){
    
    var srcDir = path.dirname(fullPathFileName);
    var srcRelativeDir = srcDir.substr(global.paths.src.coffee.length);
    var destDir = global.paths.dest.scripts + srcRelativeDir + "/";

    gulp.src(fullPathFileName)
      .pipe($plugin.sourcemaps.init())
      .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
      .pipe($plugin.sourcemaps.write( './maps/'))
      // .pipe($plugin.template({},{ 'imports': { 'scripts': scripts, 'paths': global.paths } }))
      .pipe(gulp.dest(destDir));
  });
 });

/**
 * Create the minify version of the javascript files
 */
gulp.task('coffee-prod',function() {
  return gulp.src(global.paths.src.coffee + '**/*.coffee')
    .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
    .pipe($plugin.ngmin())
    .pipe($plugin.jsmin())
    .pipe(gulp.dest(global.paths.dest.scripts));
});

/**
 * Convert each folder into a single js
 */
gulp.task('js-folder',function() {

  var componentsFolders = glob.sync( global.paths.dest.scripts + '**/');
  return componentsFolders.forEach(function(folder){
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
gulp.task('js-files',function( callback ) {

  var scriptFiles = glob.sync( global.paths.dest.scripts + '**/*.js');
  return scriptFiles.forEach(function(fullPathFileName){
    var $string = require('string');
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
  console.log( "dest = ", global.paths.dest.scripts + 'tree.json');
  fs.writeFile( global.paths.dest.scripts + 'tree.json', JSON.stringify( scripts.getTree() ), 
      function(){ /* file created */ } 
    );
  return callback
});

/**
 * Create the html files from the jade scripts
 */
gulp.task('jade',['js-files'], function() {

  gulp.src(global.paths.src.template + '*.jade', '!' + global.paths.src.template + 'index.jade')
    .pipe($plugin.jade())
    .pipe($plugin.template({},{ 'imports': { 'scripts': scripts, 'paths': global.paths } }))
    .pipe(gulp.dest(global.paths.dest.template));

  console.log( "index path = ",global.paths.src.template + 'index.jade');
  console.log( "index dest = ", global.paths.dest.path);
  return gulp.src(global.paths.src.template + 'index.jade')
    .pipe($plugin.jade())
    .pipe($plugin.template({},{ 'imports': { 'scripts': scripts } }))
    .pipe(gulp.dest(global.paths.dest.path));
});

gulp.task('run', function(callback){
  runSequence('coffee','jade','keep',callback);
});

gulp.task('prod', ['coffee-prod', 'js-folder', 'jade', 'keep-prod'], function(){

});

gulp.task('default', function() {
  // place code for your default task here
});

