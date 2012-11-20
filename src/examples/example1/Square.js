var Square,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Load.CanvasBoxElement();

Square = (function(_super) {

  __extends(Square, _super);

  Square.prototype.side = 100;

  Square.prototype.colorRegular = "rgb(150,150,250)";

  Square.prototype.colorOver = "yellow";

  Square.prototype.colorDrag = "rgb(100,100,250)";

  Square.prototype.color = "blue";

  Square.prototype.borderColorRegular = "rgb(100,100,100)";

  Square.prototype.borderColor = null;

  Square.prototype.borderColorOver = "rgb( 250 , 250, 250 )";

  Square.prototype.borderWidth = 2;

  Square.prototype.strClassName = "Square";

  function Square() {
    alert("constructor color 0" + this.color);
    this.color = this.colorRegular;
    this.borderColor = this.borderColorRegular;
    Square.__super__.constructor.call(this);
    alert("constructor color " + this.color);
  }

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
    alert("draw color = " + this.color);
    this.refresh();
    this.objBox.setFillStyle(this.color);
    this.objBox.fillRect(Math.round(this.x - (this.side / 2)), Math.round(this.y - (this.side / 2)), Math.round(this.side), Math.round(this.side));
    this.objBox.setStrokeStyle(this.borderColor);
    this.objBox.lineWidth = "" + this.borderWidth + "px";
    this.objBox.strokeRect(Math.round(this.x - (this.side / 2)), Math.round(this.y - (this.side / 2)), Math.round(this.side), Math.round(this.side));
    this.objBox.setStrokeStyle("black");
    this.objBox.strokeText("Drag and Drop", this.x - 30, this.y);
    return this;
  };

  Square.prototype.onMouseOver = function(event) {
    console.log("square over");
    this.borderColor = this.borderColorOver;
    alert("color antes = " + this.color);
    this.color = this.colorOver;
    alert("color depois = " + this.color);
    return Square.__super__.onMouseOver.call(this, event);
  };

  Square.prototype.onMouseOut = function(event) {
    this.borderColor = this.borderColorRegular;
    alert("color 2antes = " + this.color);
    this.color = this.colorRegular;
    alert("color 2depois = " + this.color);
    return Square.__super__.onMouseOut.call(this, event);
  };

  Square.prototype.onDrag = function(event) {
    alert("color 3antes = " + this.color);
    this.color = this.colorDrag;
    alert("color 3depois = " + this.color);
    return Square.__super__.onDrag.call(this, event);
  };

  Square.prototype.onDrop = function(event) {
    alert("color 4antes = " + this.color);
    this.color = this.colorRegular;
    alert("color 4depois = " + this.color);
    return Square.__super__.onDrop.call(this, event);
  };

  Square.prototype.onClick = function(event) {
    if (this.side < 200) this.side += 5;
    this.onMouseOver(event);
    return Square.__super__.onClick.call(this, event);
  };

  Square.prototype.onDblClick = function(event) {
    this.side = 100;
    return Square.__super__.onDblClick.call(this, event);
  };

  Square.prototype.isInsideElement = function(mouseX, mouseY) {
    return (mouseX >= (this.x - this.side / 2)) && (mouseX <= (this.x + this.side / 2)) && (mouseY >= (this.y - this.side / 2)) && (mouseY <= (this.y + this.side / 2));
  };

  return Square;

})(CanvasBoxElement);
