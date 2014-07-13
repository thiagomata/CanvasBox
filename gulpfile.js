var gulp        = require('gulp');
var $plugin     = require('gulp-load-plugins')({ camelize: true});
var gutil       = require('gutil');
var glob        = require('glob');
var global        = {};//require('global');
var path        = require('path');
var StreamQueue = require('streamqueue');
var fs          = require('fs');

var scripts     = require('./src/node/scripts.js');

/**
 * Project Paths
 */
global.paths = {
  publicPath:      './public/',
  publicScript:    './public/scripts/',
  publicTemplate:  './public/templates',
  publicMaps:      './public/maps',
  srcCoffee:       './src/coffee/',
  srcTemplate:     './src/templates/'
};

/**
 * Create the javascript files from the coffeescripts
 */
gulp.task('coffee', function() {
  gulp.src(global.paths.srcCoffee + '**/*.coffee')
    .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(global.paths.publicScript));
});

/**
 * Create the javascript and map files from the coffeescripts
 */
gulp.task('coffee-map', function() {

  // // this what we want to do, but doesn't work as excepted //
  // gulp.src(global.paths.srcCoffee + '**/*.coffee')
  //   .pipe($plugin.sourcemaps.init())
  //   .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
  //   .pipe($plugin.sourcemaps.write( './maps/'))
  //   .pipe(gulp.dest(global.paths.publicScript));

  /**
   * @workaround This is a not so easy or fast way to compile the coffee
   * scripts and create the maps but it was necessary to the current version
   * @todo use the tradicional way when fixed
   * @link https://github.com/gulpjs/gulp/issues/356
   */
  var coffeeFiles = glob.sync( global.paths.srcCoffee + '**/*.coffee');
  coffeeFiles.forEach(function(fullPathFileName){
    
    var srcDir = path.dirname(fullPathFileName);
    var srcRelativeDir = srcDir.substr(global.paths.srcCoffee.length);
    var destDir = global.paths.publicScript + srcRelativeDir + "/";

    gulp.src(fullPathFileName)
      .pipe($plugin.sourcemaps.init())
      .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
      .pipe($plugin.sourcemaps.write( './maps/'))
      .pipe(gulp.dest(destDir));
  });
 });

/**
 * Create the minify version of the javascript files
 */
gulp.task('coffee-prod',function() {
  gulp.src(global.paths.srcCoffee + '**/*.coffee')
    .pipe($plugin.coffee({bare: true}).on('error', gutil.log))
    .pipe($plugin.ngmin())
    .pipe($plugin.jsmin())
    .pipe(gulp.dest(global.paths.publicScript));
});

/**
 * Convert each folder into a single js
 */
gulp.task('js-folder',function() {

  var componentsFolders = glob.sync( global.paths.publicScript + '**/');
  componentsFolders.forEach(function(folder){
    var $string = require('string');
    var componentName = folder.match(/.+\/(.+)\/$/)[1];
    var packageFileName = componentName.toLowerCase() + ".package.min.js";
    var packageName = $string(
      folder.substr(
        global.paths.publicPath.length,
        folder.length - 1 - global.paths.publicPath.length
      )
    ).replaceAll( "/" , "." ) + ".*";

    scripts.addScript( packageName, folder.substr( global.paths.publicPath.length ) + packageFileName );

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
gulp.task('js-files',function() {

  var scriptFiles = glob.sync( global.paths.publicScript + '**/*.js');
  scriptFiles.forEach(function(fullPathFileName){
    var $string = require('string');
    var packageName = $string(
      fullPathFileName.substr(
        global.paths.publicPath.length
      ).split( "." )[0]
    ).replaceAll( "/" , "." );

    scripts.addScript( packageName, fullPathFileName.substr( global.paths.publicPath.length ) );

  });

  /**
   * Create or Update the Tree with the javascript path
   */
  fs.writeFile( global.paths.publicScript + 'tree.json', JSON.stringify( scripts.getTree() ) );

});

/**
 * Create the html files from the jade scripts
 */
gulp.task('jade',['js-files'], function() {
  gulp.src(global.paths.srcTemplate + '*.jade', '!' + global.paths.srcTemplate + 'index.jade')
    .pipe($plugin.jade())
    .pipe($plugin.template({},{ 'imports': { 'scripts': scripts } }))
    .pipe(gulp.dest(global.paths.publicTemplate));

  gulp.src(global.paths.srcTemplate + 'index.jade')
    .pipe($plugin.jade())
    .pipe($plugin.template({},{ 'imports': { 'scripts': scripts } }))
    .pipe(gulp.dest(global.paths.publicPath));
});

gulp.task('run', ['coffee-map','jade'], function(){

});

gulp.task('prod', ['coffee-prod', 'js-folder', 'jade'], function(){

});

gulp.task('default', function() {
  // place code for your default task here
});

