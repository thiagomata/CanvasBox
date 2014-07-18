var Load, New, arrScripts, key, objScript;

Load = (function() {
  function Load() {}

  return Load;

})();

New = (function() {
  function New() {}

  return New;

})();

arrScripts = document.head.getElementsByTagName("script");

for (key in arrScripts) {
  objScript = arrScripts[key];
  if (objScript.src.indexOf("New.js") > 0) {
    window.MAIN_PATH = objScript.src.replace("New.js", "");
    break;
  }
}

New.prototype.arrMap = {
  CanvasBox: "" + window.MAIN_PATH + "CanvasBox",
  CanvasBoxBehavior: "" + window.MAIN_PATH + "CanvasBoxBehavior",
  CanvasBoxButton: "" + window.MAIN_PATH + "CanvasBoxButton",
  CanvasBoxConnector: "" + window.MAIN_PATH + "CanvasBoxConnector",
  CanvasBoxElement: "" + window.MAIN_PATH + "CanvasBoxElement",
  CanvasBoxException: "" + window.MAIN_PATH + "CanvasBoxException",
  CanvasBoxLine: "" + window.MAIN_PATH + "CanvasBoxLine",
  CanvasBoxMenu: "" + window.MAIN_PATH + "CanvasBoxMenu",
  CanvasBoxPointer: "" + window.MAIN_PATH + "CanvasBoxPointer",
  CanvasBoxPolygon: "" + window.MAIN_PATH + "CanvasBoxPolygon",
  CanvasBoxExportButton: "" + window.MAIN_PATH + "button/CanvasBoxExportButton",
  CanvasBoxFixedButton: "" + window.MAIN_PATH + "button/CanvasBoxFixedButton",
  CanvasBoxSaveButton: "" + window.MAIN_PATH + "button/CanvasBoxSaveButton",
  CanvasBoxZoomInButton: "" + window.MAIN_PATH + "button/CanvasBoxZoomIntButton",
  CanvasBoxZoomOutButton: "" + window.MAIN_PATH + "button/CanvasBoxZoomOutButton",
  CanvasBoxConnectorBehavior: "" + window.MAIN_PATH + "CanvasBoxConnectorBehavior",
  CanvasBoxGravityBehavior: "" + window.MAIN_PATH + "CanvasBoxGravityBehavior",
  CanvasBoxMagneticBehavior: "" + window.MAIN_PATH + "CanvasBoxMagneticBehavior",
  CanvasBoxRender: "" + window.MAIN_PATH + "CanvasBoxRender",
  CanvasBoxState: "" + window.MAIN_PATH + "../diagram/stateMachine/CanvasBoxState",
  CanvasBoxStateDiagram: "" + window.MAIN_PATH + "../diagram/stateMachine/CanvasBoxStateDiagram",
  CanvasBoxStateLink: "" + window.MAIN_PATH + "../diagram/stateMachine/CanvasBoxStateLink",
  CanvasBoxStateRender: "" + window.MAIN_PATH + "../diagram/stateMachine/CanvasBoxStateRender"
};

New.prototype.arrClasses = Array();

New.prototype.loadClass = function(strClass) {
  var objError, strContent;
  Load[strClass] = function() {
    return false;
  };
  New[strClass] = new Function("return New.prototype.Ready({ name: '" + strClass + "', data: arguments });");
  console.log("Load Class " + strClass);
  try {
    if (php.in_array(strClass, New.prototype.arrClasses)) {
      return false;
    }
    if (New.prototype.arrMap[strClass] == null) {
      throw new Error("Unabled to map the class " + strClass);
    }
    console.log("loading... " + strClass);
    if (php.file_exists(New.prototype.arrMap[strClass] + ".js")) {
      console.log("load " + New.prototype.arrMap[strClass] + ".js");
      php.require_once(New.prototype.arrMap[strClass] + ".js");
    } else {
      strContent = php.file_get_contents(New.prototype.arrMap[strClass] + ".coffee");
      console.log("run " + strClass + ".coffee");
      try {
        CoffeeScript.run(strContent);
      } catch (_error) {
        objError = _error;
        console.log("unable to run " + strClass);
        console.log(objError.message);
        throw objError;
      }
    }
    New.prototype.arrClasses.push(strClass);
    return true;
  } catch (_error) {
    objError = _error;
    console.log("Error on load " + strClass);
    console.log(objError);
    throw objError;
  }
};

New.prototype.construct = function(klass, args) {
  var ObjectPointer;
  ObjectPointer = function() {
    return klass.apply(this, arguments[0]);
  };
  ObjectPointer.prototype = klass.prototype;
  return new ObjectPointer(args);
};


/*
New::construct=(klass,args)->
	try
		ObjectPointer = ->
			klass.apply(this, arguments[0]);
		ObjectPointer.prototype = klass.prototype; 
		return new ObjectPointer(args);
	catch objError
		objException = new Error( "Unable to load the class #{klass}." )
		objException.parentError = objError
		throw objException
 */

New.prototype.addMap = function(strClass, link) {
  if (link == null) {
    link = null;
  }
  console.log("New.addMap ", strClass, link);
  if (link != null) {
    New.prototype.arrMap[strClass] = link;
  }
  New[strClass] = new Function("return New.prototype.Instance({ name: '" + strClass + "', data: arguments });");
  return Load[strClass] = new Function("return Load.prototype.Instance({ name: '" + strClass + "', data: arguments });");
};

New.prototype.importMap = function(strPathJsonFile) {
  var objError, objException, objJson, strClass, strJson, strLink, _results;
  if (!php.file_exists(strPathJsonFile)) {
    throw new Error("Unable to find the file " + strPathJsonFile + ".");
  }
  strJson = php.file_get_contents(strPathJsonFile);
  try {
    objJson = JSON.parse(strJson);
  } catch (_error) {
    objError = _error;
    objException = new Error("Invalid Json receveid in file " + strPathJsonFile);
    objException.parentError = objError;
    throw objException;
  }
  _results = [];
  for (strClass in objJson) {
    strLink = objJson[strClass];
    _results.push(New.prototype.addMap(strClass, strLink));
  }
  return _results;
};

New.prototype.start = function() {
  var element, path, _ref, _results;
  _ref = New.prototype.arrMap;
  _results = [];
  for (element in _ref) {
    path = _ref[element];
    _results.push(New.prototype.addMap(element));
  }
  return _results;
};

New.prototype.Instance = function(arrDataLoad) {
  New.prototype.loadClass(arrDataLoad.name);
  return New.prototype.construct(window[arrDataLoad.name], arrDataLoad.data);
};

New.prototype.Ready = function(arrDataLoad) {
  return New.prototype.construct(window[arrDataLoad.name], arrDataLoad.data);
};

Load.prototype.Instance = function(arrDataLoad) {
  New.prototype.loadClass(arrDataLoad.name);
  return window[arrDataLoad.name];
};

New.prototype.start();

//# sourceMappingURL=maps/New.js.map