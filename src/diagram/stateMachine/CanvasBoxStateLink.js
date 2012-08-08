var CanvasBoxStateLink,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxLine();

CanvasBoxStateLink = (function(_super) {

  __extends(CanvasBoxStateLink, _super);

  function CanvasBoxStateLink() {
    return CanvasBoxStateLink.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxStateLink.prototype.strClassName = "CanvasBoxStateLink";

  CanvasBoxStateLink.prototype.strName = null;

  CanvasBoxStateLink.prototype.strTitle = null;

  CanvasBoxStateLink.prototype.draw = function() {
    return CanvasBoxStateLink.__super__.draw.apply(this, arguments);
    if (this.objElementFrom === null) {
      throw New.CanvasBoxException("Canvas Box State link has not the ElementFrom");
    }
    if (this.objElementTo === null) {
      throw New.CanvasBoxException("Canvas Box State link has not the ElementTo");
    }
    this.refresh();
    this.objBox.saveContext();
    this.objBox.setStrokeStyle(this.lineStyle);
    this.objBox.setFillStyle(this.color);
    this.objBox.moveTo(this.x, this.y);
    this.objBox.beginPath();
    this.objBox.arc(this.x, this.y, this.side, 0, Math.PI * 2, true);
    this.objBox.fill();
    this.objBox.setTextAlign("left");
    if (this.mouseOver || this.objBox.objElementClicked === this) {
      this.objBox.setStrokeStyle(this.lineStyle);
      this.objBox.arc(this.x, this.y, this.side, 0, Math.PI * 2, true);
      this.objBox.stroke();
    }
    if (this.strName) {
      this.objBox.strokeText(this.strName, this.x + 10, this.y - 10);
    }
    this.objBox.setStrokeStyle(this.lineStyle);
    this.objBox.setLineWidth(this.borderWidth);
    this.drawLine(this.x, this.y, this.objElementFrom.x, this.objElementFrom.y);
    this.drawLine(this.x, this.y, this.objElementTo.x, this.objElementTo.y);
    this.objBox.stroke();
    this.objBox.closePath();
    this.objBox.moveTo(this.x, this.y);
    this.objBox.restoreContext();
    this.z = 1;
    return false;
    if (this.objElementFrom.strClassName !== this.strClassName) {
      this.createConnectorFrom();
      this.z = 2;
    }
    if (this.objElementTo.strClassName !== this.strClassName) {
      this.createConnectorTo();
      this.z = 2;
    }
    return this.objBox.restoreContext();
  };

  CanvasBoxStateLink.prototype.toSerialize = function() {
    var objResult;
    objResult = {
      x: Math.round(this.x),
      y: Math.round(this.y),
      side: this.side,
      color: this.color,
      borderColor: this.borderColor,
      borderWidth: this.borderWidth,
      intMass: this.intMass,
      intMagnetism: this.intMagnetism,
      intWallRepelsForce: this.intWallRepelsForce,
      strClassName: this.strClassName
    };
    return objResult;
  };

  CanvasBoxStateLink.prototype.drawArrowTo = function(intSide) {
    this.objContext.moveTo(-10, 15);
    this.objContext.lineTo(0, 0);
    return this.objContext.lineTo(10, 15);
  };

  CanvasBoxStateLink.prototype.drawConnectorTo = function(objPointer, intSide) {
    this.drawBackgroundCircle(intSide);
    this.objContext.beginPath();
    this.objContext.strokeStyle = "rgb( 70, 70, 70)";
    this.drawArrowTo(intSide);
    return this.objContext.stroke();
  };

  return CanvasBoxStateLink;

})(CanvasBoxLine);
