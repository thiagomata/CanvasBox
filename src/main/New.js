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
  CanvasBoxConnectorBehavior: "" + window.MAIN_PATH + "CanvasBoxConnectorBehavior",
  CanvasBoxExportButton: "" + window.MAIN_PATH + "button/CanvasBoxExportButton",
  CanvasBoxFixedButton: "" + window.MAIN_PATH + "button/CanvasBoxFixedButton",
  CanvasBoxSaveButton: "" + window.MAIN_PATH + "button/CanvasBoxSaveButton",
  CanvasBoxZoomInButton: "" + window.MAIN_PATH + "button/CanvasBoxZoomIntButton",
  CanvasBoxZoomOutButton: "" + window.MAIN_PATH + "button/CanvasBoxZoomOutButton",
  CanvasBoxState: "" + window.MAIN_PATH + "../diagram/stateMachine/CanvasBoxState",
  CanvasBoxStateDiagram: "" + window.MAIN_PATH + "../diagram/stateMachine/CanvasBoxStateDiagram",
  CanvasBoxStateLink: "" + window.MAIN_PATH + "../diagram/stateMachine/CanvasBoxStateLink"
};

New.prototype.arrClasses = Array();

New.prototype.loadClass = function(strClass) {
  var strContent;
  try {
    if (php.in_array(strClass, New.prototype.arrClasses)) {
      return false;
    }
    if (!(New.prototype.arrMap[strClass] != null)) {
      throw new CanvasBoxException("Unabled to map the class " + strClass);
    }
    console.log("loading... " + strClass);
    if (php.file_exists(New.prototype.arrMap[strClass] + ".js")) {
      console.log(New.prototype.arrMap[strClass] + ".js");
      php.require_once(New.prototype.arrMap[strClass] + ".js");
    } else {
      strContent = php.file_get_contents(New.prototype.arrMap[strClass] + ".coffee");
      CoffeeScript.run(strContent);
    }
    New.prototype.arrClasses.push(strClass);
    return true;
  } catch (objError) {
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

New.prototype.addMap = function(strClass, link) {
  if (link == null) {
    link = null;
  }
  if (link != null) {
    New.prototype.arrMap[strClass] = link;
  }
  New[strClass] = new Function("return New.prototype.Instance({ name: '" + strClass + "', data: arguments });");
  return Load[strClass] = new Function("return Load.prototype.Instance({ name: '" + strClass + "', data: arguments });");
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

Load.prototype.Instance = function(arrDataLoad) {
  New.prototype.loadClass(arrDataLoad.name);
  Load[arrDataLoad.name] = window[arrDataLoad.name];
  return window[arrDataLoad.name];
};

New.prototype.start();
