
/*
 * A simple example of how to use the canvas box.
 *
 * @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
 */
var Bubble,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.canvas.CanvasBoxElement();

Bubble = (function(_super) {
  __extends(Bubble, _super);

  function Bubble() {
    return Bubble.__super__.constructor.apply(this, arguments);
  }


  /*
   * X position
   * @type double
   */

  Bubble.prototype.x = 0;


  /*
   * Y position
   * @type double
   */

  Bubble.prototype.y = 0;


  /*
   * Size of each side of square
   * @type double
   */

  Bubble.prototype.side = 1;


  /*
   * Regular Square Color
   * @type string color
   */

  Bubble.prototype.colorRegular = "rgba(250,250,250,0.60)";


  /*
   * Current Color
   * @type string color
   */

  Bubble.prototype.color = "rgba(250,250,250,0.60)";


  /*
   * Color Over
   * @type string color
   */

  Bubble.prototype.colorOver = "orange";


  /*
   * Square Border Color
   * @type string color
   */

  Bubble.prototype.borderColorRegular = "rgb(100,100,100)";


  /*
   * Square Border Color
   * @type string color
   */

  Bubble.prototype.borderColor = "rgb(100,100,100)";


  /*
   * Square Border Color
   * @type string color
   */

  Bubble.prototype.borderColorOver = "rgb( 250 , 250, 250 )";


  /*
   * Square Border Width
   * @type double
   */

  Bubble.prototype.borderWidth = 2;


  /*
   * Object Collision
   * @type Bubble
   */

  Bubble.prototype.objCollision = null;


  /*
   * Is Mouse Over Flag
   * @type boolean
   */

  Bubble.prototype.isOver = false;


  /*
   * Prepare the Bubble attributes
   */

  Bubble.prototype.init = function() {
    Bubble.__super__.init.call(this);
    this.color = this.colorRegular;
    return this.borderColor = this.borderColorRegular;
  };


  /*
   * Drag the bubble
   */

  Bubble.prototype.draw = function() {
    this.objBox.setStrokeStyle(this.borderColor);
    this.objBox.setFillStyle(this.color);
    this.objBox.setLineWidth(10);
    this.objBox.setStrokeStyle(this.borderColor);
    this.objBox.beginPath();
    this.objBox.arc(this.x, this.y, this.side, 0, Math.PI * 2, true);
    this.objBox.fill();
    this.objBox.stroke();
    return this.objBox.closePath();
  };


  /*
   * Mouse over event
   */

  Bubble.prototype.onMouseOver = function(event) {
    this.borderColor = this.borderColorOver;
    this.color = this.colorOver;
    this.isOver = true;
    return false;
  };


  /*
   * Mouse out event
   */

  Bubble.prototype.onMouseOut = function(event) {
    this.borderColor = this.borderColorRegular;
    this.color = this.colorRegular;
    this.isOver = false;
    return false;
  };


  /*
   * On drag event
   * @param event
   * return boolean
   */

  Bubble.prototype.onDrag = function(event) {
    this.onMouseOver(event);
    return false;
  };


  /*
   * On drop event
   * @param event
   * return boolean
   */

  Bubble.prototype.onDrop = function(event) {
    this.onMouseOut(event);
    return false;
  };


  /*
   * On click event
   * @param event
   * return boolean
   */

  Bubble.prototype.onClick = function(event) {
    this.killMe();
    return false;
  };


  /*
   * On Timer Event
   * @param event
   * Bubbles should go up and grow up
   */

  Bubble.prototype.onTimer = function(event) {
    if (this.isOver) {
      return false;
    }
    this.y -= 2;
    this.side += 0.5;
    this.objBox.change();
    if (this.x < (-1 * this.side)) {
      this.killMe();
      return false;
    }
    if (this.y < (-1 * this.side)) {
      this.killMe();
      return false;
    }
    if (this.inCollision()) {
      if (this.y <= this.objCollision.y) {
        this.y -= 2;
        return false;
      } else {
        this.y += 2;
        this.side -= 0.5;
      }
    }
    return Bubble.__super__.onTimer.call(this, event);
  };


  /*
   * Returns if the Mouse is Over the Element
   *
   * @param mouseX integer horizontal position of cursor pointer
   * @param mouseY integer vertical position of the cursor pointer
   * @return boolean
   */

  Bubble.prototype.isInsideElement = function(mouseX, mouseY) {
    return (mouseX >= (this.x - this.side / 2)) && (mouseX <= (this.x + this.side / 2)) && (mouseY >= (this.y - this.side / 2)) && (mouseY <= (this.y + this.side / 2));
  };


  /*
   * Detect collision between elements.
   */

  Bubble.prototype.inCollision = function() {
    var dblDiffX, dblDiffY, dblDistance, dblSquaredX, dblSquaredY, dblSumSide, objElement, _i, _len, _ref;
    _ref = this.objBox.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      if ((objElement != null) && objElement !== this && objElement.constructor.name === this.constructor.name) {
        dblDiffX = Math.round(objElement.x - this.x);
        dblDiffY = Math.round(objElement.y - this.y);
        dblSumSide = Math.round(objElement.side + this.side);
        dblSquaredX = dblDiffX * dblDiffX;
        dblSquaredY = dblDiffY * dblDiffY;
        dblDistance = Math.round(Math.sqrt(dblSquaredX + dblSquaredY));
        if (dblDistance <= dblSumSide) {
          this.objCollision = objElement;
          return true;
        }
      }
    }
    return false;
  };

  return Bubble;

})(CanvasBoxElement);

//# sourceMappingURL=maps/Bubble.js.map