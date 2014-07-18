var CanvasBoxStateLink,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxLine();

CanvasBoxStateLink = (function(_super) {
  __extends(CanvasBoxStateLink, _super);

  function CanvasBoxStateLink() {
    return CanvasBoxStateLink.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxStateLink.prototype.strName = null;

  CanvasBoxStateLink.prototype.strTitle = null;

  CanvasBoxStateLink.prototype.color = "black";

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
      name: this.constructor.name
    };
    return objResult;
  };

  CanvasBoxStateLink.prototype.drawArrowTo = function(intSide) {
    this.objBox.moveTo(-10, 15);
    this.objBox.lineTo(0, 0);
    return this.objBox.lineTo(10, 15);
  };

  return CanvasBoxStateLink;

})(CanvasBoxLine);

//# sourceMappingURL=maps/CanvasBoxStateLink.js.map