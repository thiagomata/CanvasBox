var CollisionSquare,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxElement();

CollisionSquare = (function(_super) {
  __extends(CollisionSquare, _super);

  CollisionSquare.prototype.side = 100;

  CollisionSquare.prototype.colorRegular = "rgb(150,150,250)";

  CollisionSquare.prototype.colorOver = "yellow";

  CollisionSquare.prototype.colorDrag = "rgb(100,100,250)";

  CollisionSquare.prototype.color = null;

  CollisionSquare.prototype.borderColorRegular = "rgb(100,100,100)";

  CollisionSquare.prototype.borderColor = null;

  CollisionSquare.prototype.borderColorOver = "rgb( 250 , 250, 250 )";

  CollisionSquare.prototype.borderWidth = 2;

  CollisionSquare.prototype.strClassName = "Square";

  CollisionSquare.prototype.intLastX = 0;

  CollisionSquare.prototype.intLastY = 0;

  function CollisionSquare() {
    this.color = this.colorRegular;
    this.borderColor = this.borderColorRegular;
    return CollisionSquare.__super__.constructor.call(this);
  }

  CollisionSquare.prototype.toSerialize = function() {
    var objResult;
    objResult = CollisionSquare.__super__.toSerialize.apply(this, arguments);
    objResult.color = this.color;
    objResult.borderColor = this.borderColor;
    objResult.side = this.side;
    return objResult;
  };


  /*
   * Draw the Square
   * @return Square me
   */

  CollisionSquare.prototype.draw = function() {
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

  CollisionSquare.prototype.onMouseOver = function(event) {
    console.log("square over");
    this.borderColor = this.borderColorOver;
    this.color = this.colorOver;
    return CollisionSquare.__super__.onMouseOver.call(this, event);
  };

  CollisionSquare.prototype.onMouseOut = function(event) {
    this.borderColor = this.borderColorRegular;
    this.color = this.colorRegular;
    return CollisionSquare.__super__.onMouseOut.call(this, event);
  };

  CollisionSquare.prototype.checkValidPosition = function() {
    if (this.inCollision()) {
      this.x = this.lastValidX;
      return this.y = this.lastValidY;
    } else {
      this.lastValidX = this.x;
      return this.lastValidY = this.y;
    }
  };

  CollisionSquare.prototype.onDrag = function(event) {
    this.color = this.colorDrag;
    CollisionSquare.__super__.onDrag.call(this, event);
    this.checkValidPosition();
    return this;
  };

  CollisionSquare.prototype.goLeft = function(event) {
    CollisionSquare.__super__.goLeft.call(this, event);
    this.checkValidPosition();
    return this;
  };

  CollisionSquare.prototype.goRight = function(event) {
    CollisionSquare.__super__.goRight.call(this, event);
    this.checkValidPosition();
    return this;
  };

  CollisionSquare.prototype.goUp = function(event) {
    CollisionSquare.__super__.goUp.call(this, event);
    this.checkValidPosition();
    return this;
  };

  CollisionSquare.prototype.goDown = function(event) {
    CollisionSquare.__super__.goDown.call(this, event);
    this.checkValidPosition();
    return this;
  };

  CollisionSquare.prototype.onDrop = function(event) {
    this.color = this.colorRegular;
    return CollisionSquare.__super__.onDrop.call(this, event);
  };

  CollisionSquare.prototype.onClick = function(event) {
    if (this.side < 200) {
      this.side += 5;
    }
    this.onMouseOver(event);
    return CollisionSquare.__super__.onClick.call(this, event);
  };

  CollisionSquare.prototype.onDblClick = function(event) {
    this.side = 100;
    return CollisionSquare.__super__.onDblClick.call(this, event);
  };

  CollisionSquare.prototype.isInsideElement = function(outX, outY) {
    return (Math.round(outX) >= Math.round(this.x - this.side / 2)) && (Math.round(outX) <= Math.round(this.x + this.side / 2)) && (Math.round(outY) >= Math.round(this.y - this.side / 2)) && (Math.round(outY) <= Math.round(this.y + this.side / 2));
  };

  CollisionSquare.prototype.inCollision = function() {
    var objElement, _i, _len, _ref;
    _ref = this.objBox.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      if (objElement.getId() !== this.getId()) {
        if (objElement.isInsideElement(this.x - this.side / 2, this.y - this.side / 2) || objElement.isInsideElement(this.x + this.side / 2, this.y - this.side / 2) || objElement.isInsideElement(this.x - this.side / 2, this.y + this.side / 2) || objElement.isInsideElement(this.x + this.side / 2, this.y + this.side / 2) || objElement.isInsideElement(this.x - this.side / 2, this.y) || objElement.isInsideElement(this.x + this.side / 2, this.y) || objElement.isInsideElement(this.x, this.y + this.side / 2) || objElement.isInsideElement(this.x, this.y - this.side / 2)) {
          return true;
        }
      }
    }
    return false;
  };

  return CollisionSquare;

})(CanvasBoxElement);

//# sourceMappingURL=maps/CollisionSquare.js.map