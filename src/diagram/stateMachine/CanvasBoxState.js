var CanvasBoxState,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxElement();

CanvasBoxState = (function(_super) {

  __extends(CanvasBoxState, _super);

  function CanvasBoxState() {
    return CanvasBoxState.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxState.prototype.width = 90;

  CanvasBoxState.prototype.height = 90;

  CanvasBoxState.prototype.z = 3;

  CanvasBoxState.prototype.borderColor = "rgb(10,10,10)";

  CanvasBoxState.prototype.borderWidth = 1;

  CanvasBoxState.prototype.strStateName = "state";

  CanvasBoxState.prototype.fillColor = "rgb( 232 , 232, 255  )";

  CanvasBoxState.prototype.fixedColor = "rgb( 200, 200 ,200 )";

  CanvasBoxState.prototype.overColor = "rgb( 100 , 200 , 200 )";

  CanvasBoxState.prototype.dragColor = "rgb( 200 , 200 , 250 )";

  CanvasBoxState.prototype.strClassName = "CanvasBoxState";

  CanvasBoxState.prototype.side = 45;

  CanvasBoxState.prototype.initialize = function() {
    var _this = this;
    this.init();
    this.objMenu = new autoload.newCanvasBoxMenu();
    this.objMenu.objBox = this.objBox;
    return this.objMenu.arrMenuItens = {
      0: {
        name: "create from state",
        event: function(objParent) {
          var objClass, objFrom, objLine, objTo;
          objClass = New.CanvasBoxState();
          objClass.objBehavior = new window[objParent.objBehavior.strClassName](objClass);
          objClass.x = objParent.objBox.mouseX + 100;
          objClass.y = objParent.objBox.mouseY + 100;
          objParent.objBox.addElement(objClass);
          objFrom = objClass;
          objTo = objParent;
          objLine = New.CanvasBoxStateLink(objFrom, objTo);
          switch (objParent.objBehavior.strClassName) {
            case "CanvasBoxMagneticBehavior":
              objLine.objBehavior = new autoload.newCanvasBoxMagneticConnectorBehavior(objLine);
              break;
            case "CanvasBoxDefaultBehavior":
              break;
            default:
              objLine.objBehavior = new autoload.newCanvasBoxDefaultConnectorBehavior(objLine);
          }
          objLine.x = (objFrom.x + objTo.x) / 2;
          objLine.y = (objFrom.y + objTo.y) / 2;
          return objParent.objBox.addElement(objLine);
        }
      },
      1: {
        name: "create to state",
        event: function(objParent) {
          var objClass, objFrom, objLine, objTo;
          objClass = New.CanvasBoxState();
          objClass.objBehavior = new window[objParent.objBehavior.strClassName](objClass);
          objClass.x = objParent.objBox.mouseX + 100;
          objClass.y = objParent.objBox.mouseY + 100;
          objParent.objBox.addElement(objClass);
          objFrom = objParent;
          objTo = objClass;
          objLine = New.CanvasBoxStateLink(objFrom, objTo);
          switch (objParent.objBehavior.strClassName) {
            case "CanvasBoxMagneticBehavior":
              objLine.objBehavior = new autoload.newCanvasBoxMagneticConnectorBehavior(objLine);
              break;
            case "CanvasBoxDefaultBehavior":
              break;
            default:
              objLine.objBehavior = new autoload.newCanvasBoxDefaultConnectorBehavior(objLine);
          }
          objLine.x = (objFrom.x + objTo.x) / 2;
          objLine.y = (objFrom.y + objTo.y) / 2;
          return objParent.objBox.addElement(objLine);
        }
      }
    };
  };

  CanvasBoxState.prototype.toSerialize = function() {
    var objResult;
    objResult = {
      x: Math.round(this.x),
      y: Math.round(this.y),
      width: this.width,
      height: this.height,
      Color: this.fillColor,
      borderColor: this.borderColor,
      borderWidth: this.borderWidth,
      intMass: this.intMass,
      intMagnetism: this.intMagnetism,
      strClassName: this.strClassName,
      arrAttributes: this.arrAttributes,
      arrMethods: this.arrMethods,
      fillColor: this.fillColor,
      fixedColor: this.fixedColor,
      overColor: this.overColor,
      dragColor: this.dragColor,
      intWallRepelsForce: this.intWallRepelsForce
    };
    return objResult;
  };

  CanvasBoxState.prototype.refresh = function() {
    this.width = this.side * 2;
    this.height = this.side * 2;
    this.x0 = this.x - (this.width / 2);
    this.x1 = this.x + (this.width / 2);
    this.y0 = this.y - (this.height / 2);
    return this.y1 = this.y + (this.height / 2);
  };

  CanvasBoxState.prototype.draw = function() {
    this.refresh();
    if (this.mouseOver || this.objBox.objElementClicked === this) {
      this.objBox.setStrokeStyle("rgb( 200 , 200 , 250 )");
      this.objBox.setLineWidth(1);
      this.objBox.beginPath();
      this.objBox.arc(this.x, this.y, this.side + 10, 0, Math.PI * 2, true);
      this.objBox.stroke();
      this.objBox.closePath();
    }
    this.objBox.setStrokeStyle(this.borderColor);
    this.objBox.setFillStyle(this.fillColor);
    this.objBox.beginPath();
    this.objBox.arc(this.x, this.y, this.side, 0, Math.PI * 2, true);
    this.objBox.fill();
    this.objBox.closePath();
    this.objBox.setLineWidth("0.5");
    this.objBox.setFont("10px Arial lighter");
    this.objBox.setTextAlign("center");
    return this.objBox.strokeText(this.strStateName, this.x, this.y);
  };

  CanvasBoxState.prototype.drawMouseOver = function(event) {
    if (!this.defaultColor) {
      this.defaultColor = this.fillColor;
    }
    return this.fillColor = this.overColor;
  };

  CanvasBoxState.prototype.drawMouseOut = function(event) {
    if (this.defaultColor) {
      return this.fillColor = this.fixed ? this.fixedColor : this.defaultColor;
    }
  };

  CanvasBoxState.prototype.drawDrag = function(event) {
    if (!this.defaultColor) {
      this.defaultColor = this.fillColor;
    }
    return this.fillColor = this.dragColor;
  };

  CanvasBoxState.prototype.drawDrop = function(event) {
    if (this.defaultColor) {
      return this.fillColor = this.fixed ? this.fixedColor : this.defaultColor;
    }
  };

  CanvasBoxState.prototype.drawFixed = function(boolFixed) {
    this.fixed = boolFixed;
    if (boolFixed) {
      return this.fillColor = this.fixedColor;
    } else {
      return this.fillColor = this.mouseOver ? this.overColor : this.defaultColor;
    }
  };

  CanvasBoxState.prototype.rename = function() {
    var strClassNewName;
    strClassNewName = prompt("Inform the new name of the state.");
    if (strClassNewName !== null) {
      return this.strStateName = strClassNewName;
    }
  };

  CanvasBoxState.prototype.isInsideElement = function(mouseX, mouseY) {
    return (mouseX >= (this.x - this.side / 2)) && (mouseX <= (this.x + this.side / 2)) && (mouseY >= (this.y - this.side / 2)) && (mouseY <= (this.y + this.side / 2));
  };

  return CanvasBoxState;

})(CanvasBoxElement);
