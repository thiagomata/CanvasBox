var Square;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Load.CanvasBoxElement();
Square = (function() {
  __extends(Square, CanvasBoxElement);
  function Square() {
    Square.__super__.constructor.apply(this, arguments);
  }
  Square.prototype.side = 30;
  Square.prototype.colorRegular = "rgb(250,250,250)";
  Square.prototype.colorDrag = "rgb(250,250,250)";
  Square.prototype.color = Square.colorRegular;
  Square.prototype.borderColorRegular = "rgb(100,100,100)";
  Square.prototype.borderColor = Square.borderColorRegular;
  Square.prototype.borderColorOver = "rgb( 100 , 200, 100 )";
  Square.prototype.borderWidth = 1;
  Square.prototype.strClassName = "Square";
  Square.prototype.toSerialize = function() {
    var objResult;
    objResult = Square.__super__.toSerialize.apply(this, arguments);
    objResult.color = this.color;
    objResult.borderColor = this.borderColor;
    objResult.side = this.side;
    return objResult;
  };
  /*
      # Draw the Square
      # @return Square me
      */
  Square.prototype.draw = function() {
    this.refresh();
    this.objBox.setFillStyle(this.color);
    this.objBox.fillRect(Math.round(this.x - this.side / 2), Math.round(this.y - this.side / 2), Math.round(this.side), Math.round(this.side));
    this.objBox.setStrokeStyle(this.borderColor);
    this.objBox.lineWidth = this.borderWidth;
    this.objBox.strokeRect(Math.round(this.x - this.side / 2), Math.round(this.y - this.side / 2), Math.round(this.side), Math.round(this.side));
    return this;
  };
  Square.prototype.onMouseOver = function(event) {
    this.borderColor = this.borderColorOver;
    return Square.__super__.onMouseOver.call(this, event);
  };
  Square.prototype.onMouseOut = function(event) {
    this.borderColor = this.borderColorRegular;
    return Square.__super__.onMouseOut.call(this, event);
  };
  Square.prototype.onDrag = function(event) {
    this.color = this.colorDrag;
    return Square.__super__.onDrag.call(this, event);
  };
  Square.prototype.onDrop = function(event) {
    this.color = this.colorRegular;
    return retur(Square.__super__.onDrop.call(this, event));
  };
  Square.prototype.isInsideElement = function(mouseX, mouseY) {
    return (mouseX >= this.x0) && (mouseX <= this.x1) && (mouseY >= this.y0) && (mouseY <= this.y1);
  };
  return Square;
})();