var glob        = require('glob');

var scripts = {};
scripts.addScript = function( packageName, fileName ) {
  
  if( !glob.scripts ) {
    glob.scripts = {};
  }

  var objTreeNode = glob.scripts;
  packageName.split(".").forEach(function(step){
    if( step == "scripts" ) {
      return;
    }

    if( step == "*" ) {
      step = "all";
    }
    if( !objTreeNode[ step ] ) {
      objTreeNode[ step ] = {};
    }
    objTreeNode = objTreeNode[ step ];
  });
  objTreeNode.src = fileName;
};

scripts.imports = function( packageName ) {
  if( !glob.scripts ) {
    glob.scripts = {};
  }

  if( !packageName ) {
    throw new Error( "Trying to import inexistent package.");
  }
  var objTreeNode = glob.scripts;

  var arrFound = [];
  var strError = '';
  if( typeof packageName == 'string' || packageName instanceof String ) {
    packageName.split(".").forEach(function(step){
      if( step == "scripts" ) {
        arrFound.push( step );
        return;
      }

      if( step == "*" ) {
        if( !objTreeNode[ "all"] ) {
          return;
        }
        arrFound.push(step);
        step = "all";
      }
      if( !objTreeNode[ step ] ) {
          objTreeNode = false;
          strError = step;
          return false;
      }
      arrFound.push( step );
      objTreeNode = objTreeNode[ step ];
    });
  } else {
    objTreeNode = packageName;
  }

  if( !objTreeNode ) {
    console.log( glob.scripts );
    throw new Error( "Unable to find the package " + packageName + " error into step " + strError + " into " + arrFound.join(".") );
  }
  var paths;
  if( objTreeNode.src ) {
    paths = [objTreeNode.src];
  } else if( objTreeNode.all ) {
    paths = [objTreeNode.all.src];
  } else {
    paths = [];
    for( var childName in objTreeNode ) {
      var childNode = objTreeNode[ childName ];
      if( childNode.src ) {
        paths.push( childNode.src );
      }
    }
  }
  var tags = '';
  paths.forEach(function(path) {
    tags += '<script type="text/javascript" src="' + path + '"></script>' + "\n";
  });
  return tags;
};

scripts.getTree = function () {
  return glob.scripts;
}

module.exports = scripts;