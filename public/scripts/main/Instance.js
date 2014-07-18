var Instance, Load, instaceObject;

instaceObject = (function() {
  var F;
  F = function(args) {
    F.prototype = window[args["0"]].prototype;
    return window[args["0"]].apply(this, args["1"]);
  };
  return function() {
    return new F(arguments);
  };
})();

Load = (function() {
  function Load() {}

  return Load;

})();

Instance = (function() {
  function Instance(objTree, packageName) {
    this.objTree = objTree;
    this.packageName = packageName != null ? packageName : null;
    if ((this.objTree.src != null)) {
      this.run = function() {
        console.log("loading " + objTree.src);
        php.require_once(objTree.src);
        return instaceObject(this.packageName, arguments);
      };
      this[this.packageName] = function() {
        php.require_once(objTree.src);
        return this[this.packageName] = function() {
          return false;
        };
      };
    } else {
      for (packageName in objTree) {
        this[packageName] = new Instance(objTree[packageName], packageName);
      }
    }
  }

  return Instance;

})();

Instance.PATH_TREE = './scripts/tree.json';

Instance.prototype.construct = function(klass, args) {
  var ObjectPointer;
  ObjectPointer = function() {
    return klass.apply(this, arguments[0]);
  };
  ObjectPointer.prototype = klass.prototype;
  return new ObjectPointer(args);
};

window.New = new Instance(JSON.parse(Instance.PATH_TREE));

//# sourceMappingURL=maps/Instance.js.map