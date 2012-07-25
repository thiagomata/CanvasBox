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
  CanvasBox: "" + window.MAIN_PATH + "CanvasBox.coffee",
  CanvasBoxBehavior: "" + window.MAIN_PATH + "CanvasBoxBehavior.coffee",
  CanvasBoxButton: "" + window.MAIN_PATH + "CanvasBoxButton.coffee",
  CanvasBoxConnector: "" + window.MAIN_PATH + "CanvasBoxConnector.coffee",
  CanvasBoxElement: "" + window.MAIN_PATH + "CanvasBoxElement.coffee",
  CanvasBoxException: "" + window.MAIN_PATH + "CanvasBoxException.coffee",
  CanvasBoxLine: "" + window.MAIN_PATH + "CanvasBoxLine.coffee",
  CanvasBoxMenu: "" + window.MAIN_PATH + "CanvasBoxMenu.coffee",
  CanvasBoxPointer: "" + window.MAIN_PATH + "CanvasBoxPointer.coffee",
  CanvasBoxPolygon: "" + window.MAIN_PATH + "CanvasBoxPolygon.coffee",
  CanvasBoxExportButton: "" + window.MAIN_PATH + "button\CanvasBoxExportButton.coffee",
  CanvasBoxFixedButton: "" + window.MAIN_PATH + "button\CanvasBoxFixedButton.coffee",
  CanvasBoxSaveButton: "" + window.MAIN_PATH + "button\CanvasBoxSaveButton.coffee",
  CanvasBoxZoomInButton: "" + window.MAIN_PATH + "button\CanvasBoxZoomIntButton.coffee",
  CanvasBoxZoomOutButton: "" + window.MAIN_PATH + "button\CanvasBoxZoomOutButton.coffee"
};

New.prototype.arrClasses = Array();

New.prototype.loadClass = function(strClass) {
  var strContent;
  if (php.in_array(strClass, New.prototype.arrClasses)) {
    return false;
  }
  if (!(New.prototype.arrMap[strClass] != null)) {
    throw new CanvasBoxException("Unabled to map the class " + strClass);
  }
  strContent = php.file_get_contents(New.prototype.arrMap[strClass]);
  New.prototype.arrClasses.push(strClass);
  CoffeeScript.run(strContent);
  return true;
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
