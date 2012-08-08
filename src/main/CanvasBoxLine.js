var CanvasBoxLine,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxConnector();

CanvasBoxLine = (function(_super) {

  __extends(CanvasBoxLine, _super);

  function CanvasBoxLine() {
    return CanvasBoxLine.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxLine.prototype.side = 3;

  CanvasBoxLine.prototype.x = 0;

  CanvasBoxLine.prototype.y = 0;

  CanvasBoxLine.prototype.x0 = 0;

  CanvasBoxLine.prototype.x1 = 0;

  CanvasBoxLine.prototype.dx = 0;

  CanvasBoxLine.prototype.y0 = 0;

  CanvasBoxLine.prototype.y1 = 0;

  CanvasBoxLine.prototype.dy = 0;

  CanvasBoxLine.prototype.draggableColor = "rgb( 200, 200, 220 )";

  CanvasBoxLine.prototype.draggableBorderColor = "rgb( 200, 200, 220 )";

  CanvasBoxLine.prototype.style = "rgb( 200, 200, 220 )";

  CanvasBoxLine.prototype.width = 1;

  CanvasBoxLine.prototype.strClassName = "CanvasBoxLine";

  CanvasBoxLine.prototype.toSerialize = function() {
    var objResult;
    objResult = {
      side: this.side,
      x0: this.x0,
      x1: this.x1,
      dx: this.dx,
      y0: this.y0,
      y1: this.y1,
      dy: this.dy,
      draggableColor: this.draggableColor,
      draggableBorderColor: this.draggableBorderColor,
      style: this.style,
      width: this.width,
      strClassName: this.strClassName
    };
    return objResult;
  };

  CanvasBoxLine.prototype.getVectorFromElement = function(objElement) {
    var dblAngle, dblReverseAngle, intDistance, objPointer;
    objPointer = this.findArrow(objElement, this.side);
    dblAngle = objPointer.degree * 2 * Math.PI / 360;
    dblReverseAngle = Math.PI * 2 - dblAngle;
    intDistance = Math.abs(Math.cos(dblAngle)) * objElement.height / 2;
    intDistance += Math.abs(Math.sin(dblAngle)) * objElement.width / 2;
    return {
      pointer: objPointer,
      distance: intDistance,
      angle: dblAngle,
      reverseAngle: dblReverseAngle
    };
  };

  CanvasBoxLine.prototype.rotateVector = function(objVector) {
    this.objBox.restoreContext();
    this.objBox.moveTo(objVector.pointer.x, objVector.pointer.y);
    this.objBox.saveContext();
    this.objBox.translate(objVector.pointer.x, objVector.pointer.y);
    this.objBox.rotate(objVector.reverseAngle);
    return this.objBox.translate(0, objVector.distance);
  };

  CanvasBoxLine.prototype.createConnectorFrom = function() {
    var objVector;
    objVector = this.getVectorFromElement(this.objElementFrom);
    this.drawConnectorFrom(objVector.pointer, this.side);
    return this.objBox.restoreContext();
  };

  CanvasBoxLine.prototype.createConnectorTo = function() {
    var objVector;
    objVector = this.getVectorFromElement(this.objElementTo);
    this.drawConnectorTo(objVector.pointer, this.side);
    return this.objBox.restoreContext();
  };

  CanvasBoxLine.prototype.drawConnectorFrom = function(objPointer, intSide) {
    return this.drawBackgroundCircle(intSide);
  };

  CanvasBoxLine.prototype.drawConnectorTo = function(objPointer, intSide) {
    return this.drawBackgroundCircle(intSide);
  };

  CanvasBoxLine.prototype.drawBackgroundCircle = function(intSide) {};

  CanvasBoxLine.prototype.refresh = function() {
    this.x0 = this.x - (this.side / 2);
    this.x1 = this.x + (this.side / 2);
    this.y0 = this.y - (this.side / 2);
    this.y1 = this.y + (this.side / 2);
    if (this.x0 < 0) {
      this.x += this.side;
      return this.refresh();
    }
    if (this.y0 < 0) {
      this.y += this.side;
      return this.refresh();
    }
    this.width = this.side;
    return this.height = this.side;
  };

  CanvasBoxLine.prototype.drawLine = function(intXfrom, intYfrom, intXto, intYto) {
    this.objBox.moveTo(intXfrom, intYfrom);
    return this.objBox.lineTo(intXto, intYto);
  };

  CanvasBoxLine.prototype.drawAnchor = function() {
    this.objBox.saveContext();
    this.objBox.setFillStyle(this.color);
    this.objBox.setStrokeStyle(this.style);
    this.objBox.moveTo(this.x, this.y);
    this.objBox.beginPath();
    this.objBox.arc(this.x, this.y, this.side, 0, Math.PI * 2, true);
    this.objBox.fill();
    this.objBox.closePath();
    return this.objBox.restoreContext();
  };

  CanvasBoxLine.prototype.drawLines = function() {
    this.objBox.saveContext();
    this.objBox.moveTo(this.x, this.y);
    this.objBox.setStrokeStyle(this.style);
    this.objBox.setFillStyle(this.color);
    this.objBox.setLineWidth(this.width);
    this.drawLine(this.x, this.y, this.objElementFrom.x, this.objElementFrom.y);
    this.drawLine(this.x, this.y, this.objElementTo.x, this.objElementTo.y);
    this.objBox.stroke();
    return this.objBox.restoreContext();
  };

  CanvasBoxLine.prototype.draw = function() {
    if (this.objElementFrom === null) {
      throw new CanvasBoxException("Canvas Box Line has no Element From");
    }
    if (this.objElementTo === null) {
      throw new CanvasBoxException("Canvas Box Line has no Element To");
    }
    this.refresh();
    this.drawAnchor();
    return;
    this.objBox.setFillStyle(this.color);
    this.objBox.setStrokeStyle(this.color);
    this.objBox.moveTo(this.x, this.y);
    this.objBox.beginPath();
    this.objBox.arc(this.x, this.y, this.side, 0, Math.PI * 2, true);
    this.objBox.fill();
    this.objBox.closePath();
    this.z = 1;
    if (this.objElementFrom.strClassName !== this.strClassName) {
      this.createConnectorFrom();
      this.objBox.setFillStyle(this.color);
      this.z = 2;
    }
    if (this.objElementTo.strClassName !== this.strClassName) {
      this.createConnectorTo();
      this.objBox.setFillStyle(this.color);
      this.z = 2;
    }
    return this.objBox.restoreContext();
  };

  CanvasBoxLine.prototype.findArrow = function(objBoxElement, intSide) {
    var intDegree;
    intDegree = Math.round(180 + 180 * Math.atan2(objBoxElement.x - this.x, objBoxElement.y - this.y) / Math.PI);
    return {
      degree: intDegree,
      x: objBoxElement.x,
      y: objBoxElement.y
    };
  };

  CanvasBoxLine.prototype.isInside = function(mouseX, mouseY) {
    this.refresh();
    if ((mouseX >= this.x0) && (mouseX <= this.x1) && (mouseY >= this.y0) && (mouseY <= this.y1)) {
      return true;
    } else {
      return false;
    }
  };

  CanvasBoxLine.prototype.drawMouseOver = function(event) {
    if (!this.defaultSide) {
      this.defaultSide = this.side;
    }
    return this.side = 6;
  };

  CanvasBoxLine.prototype.drawFixed = function(boolFixed) {
    if (!this.defaultColor) {
      this.defaultColor = this.color;
    }
    if (boolFixed) {
      this.color = "rgb( 100 , 100 , 200 )";
      this.borderWidth *= 3;
      return this.side = this.defaultSide;
    } else {
      this.color = this.defaultColor;
      this.borderWidth = 1;
      return this.side = this.defaultSide;
    }
  };

  CanvasBoxLine.prototype.drawMouseOut = function(event) {
    return this.side = this.defaultSide;
  };

  CanvasBoxLine.prototype.onDraw = function() {
    return this.draw();
  };

  return CanvasBoxLine;

})(CanvasBoxConnector);
