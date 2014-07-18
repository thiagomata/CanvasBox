
/*
 * Create an instance of the object passing the argument
 */
var Instance, instaceObject;

instaceObject = (function() {
  var ClassElement;
  ClassElement = function(args) {
    return window[args["0"]].apply(this, args["1"]);
  };
  return function() {
    var objElement;
    ClassElement.prototype = window[arguments["0"]].prototype;
    objElement = new ClassElement(arguments);
    return objElement;
  };
})();

Instance = (function() {
  Instance.loaded = false;

  function Instance(objTree, creator, packageName) {
    var objChild;
    this.objTree = objTree;
    this.creator = creator != null ? creator : false;
    this.packageName = packageName != null ? packageName : null;
    if (this.objTree.src == null) {
      for (packageName in this.objTree) {
        objChild = new Instance(this.objTree[packageName], this.creator, packageName);
        this[packageName] = objChild.node();
      }
    }
  }

  Instance.prototype.node = function() {
    if ((this.objTree.src != null)) {
      if (this.creator) {
        return this.create.bind(this);
      } else {
        return this.load.bind(this);
      }
    } else {
      return this;
    }
  };

  Instance.prototype.load = function() {
    if (this.loaded) {
      return;
    }
    php.require_once(this.objTree.src);
    return this.loaded = true;
  };

  Instance.prototype.create = function() {
    this.load();
    return instaceObject(this.packageName, arguments);
  };

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

window.Load = new Instance(JSON.parse(php.file_get_contents(Instance.PATH_TREE)), false);

window.New = new Instance(JSON.parse(php.file_get_contents(Instance.PATH_TREE)), true);

//# sourceMappingURL=maps/Instance.js.map