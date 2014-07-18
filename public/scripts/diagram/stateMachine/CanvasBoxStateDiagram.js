var CanvasBoxStateDiagram,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBox();

CanvasBoxStateDiagram = (function(_super) {
  __extends(CanvasBoxStateDiagram, _super);

  function CanvasBoxStateDiagram() {
    return CanvasBoxStateDiagram.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxStateDiagram.prototype.strClassName = "CanvasBoxStateDiagram";

  CanvasBoxStateDiagram.prototype.defineMenu = function() {
    this.objMenu = New.CanvasBoxMenu();
    this.objMenu.objParent = this;
    this.objMenu.ojbBox = this;
    this.objMenu.ojbParent = this;
    this.objMenu.arrMenuItens = {
      0: {
        name: "create state",
        event: (function(_this) {
          return function(objParent) {
            var objState;
            objState = New.CanvasBoxState();
            objState.objBehavior = New.CanvasBoxMagneticBehavior(objState);
            objState.x = objParent.mouseX;
            objState.y = objParent.mouseY;
            return objParent.addElement(objState);
          };
        })(this)
      }
    };
    return this.objMenuSelected = null;
  };

  CanvasBoxStateDiagram.prototype.addLine = function(objElementFrom, objElementTo) {
    var objStateLine;
    if (objElementFrom === null) {
      throw new CanvasBoxException("Line has no element from");
    }
    if (objElementTo === null) {
      throw new CanvasBoxException("Line has no element to");
    }
    objStateLine = New.CanvasBoxStateLink(objElementFrom, objElementTo);
    this.addElement(objStateLine);
    return objStateLine;
  };

  CanvasBoxStateDiagram.prototype.addState = function(strStateName, posX, posY) {
    var objStateElement;
    if (posX == null) {
      posX = null;
    }
    if (posY == null) {
      posY = null;
    }
    objStateElement = New.CanvasBoxState();
    if (posX === null) {
      posX = Math.round(Math.random() * 1200);
    }
    if (posY === null) {
      posY = Math.round(Math.random() * 1200);
    }
    objStateElement.x = posX;
    objStateElement.y = posY;
    objStateElement.objBehavior = New.CanvasBoxMagneticBehavior(objStateElement);
    objStateElement.strStateName = strStateName;
    this.addElement(objStateElement);
    return objStateElement;
  };

  CanvasBoxStateDiagram.prototype.load = function(objJsonInport) {
    var arrStates, keyLine, keyState, objLine, objLineJson, objState, objStateJson, _ref, _ref1, _results;
    arrStates = [];
    _ref = objJsonInport.states;
    for (keyState in _ref) {
      objStateJson = _ref[keyState];
      objState = this.addState(objStateJson.name, objStateJson.x, objStateJson.y);
      if (objStateJson.color) {
        objState.fillColor = objStateJson.color;
      }
      arrStates[objStateJson.id] = objState;
    }
    _ref1 = objJsonInport.lines;
    _results = [];
    for (keyLine in _ref1) {
      objLineJson = _ref1[keyLine];
      objLine = this.addLine(arrStates[objLineJson.from], arrStates[objLineJson.to]);
      _results.push(objLine.strName = objLineJson.name);
    }
    return _results;
  };

  return CanvasBoxStateDiagram;

})(CanvasBox);

//# sourceMappingURL=maps/CanvasBoxStateDiagram.js.map