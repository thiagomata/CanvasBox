var CanvasBoxRender;

CanvasBoxRender = (function() {
  CanvasBoxRender.prototype.strSeparator = " ,";

  function CanvasBoxRender() {
    window.addEventListener('hashchange', (function(_this) {
      return function(event) {
        return _this.load(event);
      };
    })(this));
    this.load();
  }

  CanvasBoxRender.prototype.loadUrl = function() {
    return window.location.hash.substring(1);
  };

  CanvasBoxRender.prototype.updateUrl = function(strContent) {
    window.location.hash = strContent;
    return this;
  };

  CanvasBoxRender.prototype.load = function() {
    var arrHash, strHashElement, _i, _len;
    arrHash = php.explode(this.strSeparator, this.loadUrl());
    for (_i = 0, _len = arrHash.length; _i < _len; _i++) {
      strHashElement = arrHash[_i];
      this.loadHash(strHashElement);
    }
    return this;
  };

  CanvasBoxRender.prototype.loadHash = function(strHashElement) {
    return console.log(strHashElement);
  };

  return CanvasBoxRender;

})();

//# sourceMappingURL=maps/CanvasBoxRender.js.map