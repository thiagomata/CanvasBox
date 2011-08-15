var New;
New = (function() {
  function New() {}
  return New;
})();
New.prototype.arrMap = {
  CanvasBox: './CanvasBox.coffee',
  CanvasBoxButton: './CanvasBoxButton.coffee',
  CanvasBoxConnector: './CanvasBoxConnector.coffee',
  People: './People.coffee'
};
New.prototype.arrClasses = Array();
New.prototype.loadClass = function(strClass) {
  var strContent;
  if (php.in_array(strClass, New.prototype.arrClasses)) {
    alert("" + strCLass + " ja carregada");
    return false;
  }
  if (!(New.prototype.arrMap[strClass] != null)) {
    alert("" + strClass + " {nao existe");
    throw new CanvasBoxException("Unabled to map the class " + strClass);
  }
  strContent = php.file_get_contents(New.prototype.arrMap[strClass]);
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
New.prototype.start = function() {
  var element, path, _ref, _results;
  _ref = New.prototype.arrMap;
  _results = [];
  for (element in _ref) {
    path = _ref[element];
    _results.push(New[element] = new Function("return New.prototype.Instance({ name: '" + element + "', data: arguments });"));
  }
  return _results;
};
New.prototype.Instance = function(arrDataLoad) {
  New.prototype.loadClass(arrDataLoad.name);
  return New.prototype.construct(window[arrDataLoad.name], arrDataLoad.data);
};
New.prototype.start();