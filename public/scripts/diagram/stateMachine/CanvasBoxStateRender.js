var CanvasBoxStateRender,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxRender();

CanvasBoxStateRender = (function(_super) {
  __extends(CanvasBoxStateRender, _super);

  function CanvasBoxStateRender() {
    return CanvasBoxStateRender.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxStateRender.prototype.arrGrammar = [
    {
      "rule": "\(.*\)\>\(.*\)",
      "method": "addGo"
    }, {
      "rule": "\(.*)\<\(.*\)",
      "method": "addBack"
    }, {
      "rule": "\(.*\)",
      "method": "addMe"
    }
  ];

  CanvasBoxStateRender.prototype.loadHash = function(strHashElement) {
    var arrResult, objRegex, objRule, strCurrent, _i, _len, _ref, _results;
    _ref = this.arrGrammar;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objRule = _ref[_i];
      objRegex = new RegExp(objRule.rule);
      strCurrent = strHashElement;
      _results.push((function() {
        var _results1;
        _results1 = [];
        while (strCurrent !== "" && objRegex.test(strCurrent)) {
          console.log("p1 " + strCurrent);
          arrResult = objRegex.exec(strCurrent);
          strCurrent = this[objRule.method](strCurrent);
          _results1.push(console.log("p2 " + strCurrent));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  CanvasBoxStateRender.prototype.addGo = function(strCurrent) {
    var arrGo, objFrom, objTo;
    console.log("add go " + strCurrent);
    arrGo = php.explode(">", strCurrent);
    if (arrGo.length > 1) {
      objFrom = arrGo.pop();
      while (arrGo.length > 1) {
        objTo = arrGo.pop();
        this.addLink(objFrom, objTo);
        objFrom = objTo;
      }
    } else {
      return this.addMe(strCurrent);
    }
    console.log("returning1 " + objFrom);
    return objFrom;
  };

  CanvasBoxStateRender.prototype.addBack = function(strCurrent) {
    var arrBack, objFrom, objTo;
    console.log("add back " + strCurrent);
    arrBack = php.explode("<", strCurrent);
    if (arrBack.length > 1) {
      objTo = arrBack.pop();
      while (arrBack.length > 0) {
        objFrom = arrBack.pop();
        this.addLink(objFrom, objTo);
        objTo = objFrom;
      }
    } else {
      return this.addMe(strCurrent);
    }
    console.log("returning1 " + objTo);
    return objTo;
  };

  CanvasBoxStateRender.prototype.addMe = function(arrResult) {
    console.log(arrResult);
    return "";
  };

  CanvasBoxStateRender.prototype.updateElement = function(strElement) {
    console.log("update element " + strElement);
    return strElement;
  };

  CanvasBoxStateRender.prototype.addLink = function(objFrom, objTo) {
    return console.log("create link from " + objFrom + " to " + objTo);
  };

  return CanvasBoxStateRender;

})(CanvasBoxRender);

//# sourceMappingURL=maps/CanvasBoxStateRender.js.map