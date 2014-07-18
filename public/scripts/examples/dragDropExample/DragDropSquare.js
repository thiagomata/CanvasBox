var DragDropSquare,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxElement();

DragDropSquare = (function(_super) {
  __extends(DragDropSquare, _super);

  function DragDropSquare() {
    return DragDropSquare.__super__.constructor.apply(this, arguments);
  }

  DragDropSquare.prototype.side = 100;

  DragDropSquare.prototype.colorRegular = "rgb(150,150,250)";

  DragDropSquare.prototype.colorOver = "yellow";

  DragDropSquare.prototype.colorDrag = "rgb(100,100,250)";

  DragDropSquare.prototype.color = "rgb(150,150,250)";

  DragDropSquare.prototype.borderColorRegular = "rgb(100,100,100)";

  DragDropSquare.prototype.borderColor = "rgb(100,100,100)";

  DragDropSquare.prototype.borderColorOver = "rgb( 0 , 0, 0 )";

  DragDropSquare.prototype.borderWidth = 2;


  /*
   * Draw the Square
   * @return Square me
   */

  DragDropSquare.prototype.draw = function() {
    this.refresh();
    this.changeContext();
    this.objBox.setFillStyle(this.color);
    this.objBox.fillRect(Math.round(-this.side / 2), Math.round(-this.side / 2), Math.round(this.side), Math.round(this.side));
    this.objBox.setStrokeStyle(this.borderColor);
    this.objBox.setLineWidth("" + this.borderWidth + "px");
    this.objBox.strokeRect(Math.round(-this.side / 2), Math.round(-this.side / 2), Math.round(this.side), Math.round(this.side));
    this.objBox.setStrokeStyle("black");
    this.objBox.strokeText("Drag and Drop", -(this.side / 2) + 20, 0);
    this.restoreContext();
    return this;
  };

  DragDropSquare.prototype.onMouseOver = function(event) {
    this.borderColor = this.borderColorOver;
    this.color = this.colorOver;
    return DragDropSquare.__super__.onMouseOver.call(this, event);
  };

  DragDropSquare.prototype.onMouseOut = function(event) {
    this.borderColor = this.borderColorRegular;
    this.color = this.colorRegular;
    return DragDropSquare.__super__.onMouseOut.call(this, event);
  };

  DragDropSquare.prototype.onDrag = function(event) {
    this.color = this.colorDrag;
    return DragDropSquare.__super__.onDrag.call(this, event);
  };

  DragDropSquare.prototype.onDrop = function(event) {
    this.color = this.colorRegular;
    return DragDropSquare.__super__.onDrop.call(this, event);
  };

  DragDropSquare.prototype.onClick = function(event) {
    if (this.side < 200) {
      this.side += 5;
    }
    this.onMouseOver(event);
    return DragDropSquare.__super__.onClick.call(this, event);
  };

  DragDropSquare.prototype.onDblClick = function(event) {
    this.side = 100;
    return DragDropSquare.__super__.onDblClick.call(this, event);
  };

  DragDropSquare.prototype.isInsideElement = function(mouseX, mouseY) {
    return (mouseX >= (this.x - this.side / 2)) && (mouseX <= (this.x + this.side / 2)) && (mouseY >= (this.y - this.side / 2)) && (mouseY <= (this.y + this.side / 2));
  };

  return DragDropSquare;

})(CanvasBoxElement);

//# sourceMappingURL=maps/DragDropSquare.js.map