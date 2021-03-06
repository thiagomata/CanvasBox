
/*
 * Define the rules of beha
 *
 * @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
 */
var CanvasBoxBehavior;

CanvasBoxBehavior = (function() {
  CanvasBoxBehavior.prototype.objBoxElement = null;

  CanvasBoxBehavior.prototype.intMargin = 20;

  CanvasBoxBehavior.prototype.strClassName = "CanvasBoxBehavior";

  CanvasBoxBehavior.prototype.toSerialize = function() {
    return {};
  };

  function CanvasBoxBehavior(objBoxElement) {
    if ((objBoxElement != null)) {
      this.objBoxElement = objBoxElement;
      this.objBoxElement.dx = 0;
      this.objBoxElement.dy = 0;
    }
  }

  CanvasBoxBehavior.prototype.getBox = function() {
    return this.objBoxElement.objBox;
  };

  CanvasBoxBehavior.prototype.onMouseOver = function(event) {
    return false;
  };

  CanvasBoxBehavior.prototype.onMouseOut = function(event) {
    return false;
  };

  CanvasBoxBehavior.prototype.onMouseDown = function(event) {
    this.objBoxElement.relativeMousex = this.objBoxElement.x - this.objBoxElement.objBox.mouseX;
    this.objBoxElement.relativeMousey = this.objBoxElement.y - this.objBoxElement.objBox.mouseY;
    return false;
  };

  CanvasBoxBehavior.prototype.onClick = function(event) {
    return false;
  };

  CanvasBoxBehavior.prototype.onDblClick = function(event) {
    this.objBoxElement.setFixed(!this.objBoxElement.fixed);
    return this.objBoxElement.draw();
  };

  CanvasBoxBehavior.prototype.onDrag = function(event) {
    this.dragdrop = true;
    this.objBoxElement.x = this.objBoxElement.objBox.mouseX + this.objBoxElement.relativeMousex;
    this.objBoxElement.y = this.objBoxElement.objBox.mouseY + this.objBoxElement.relativeMousey;
    if (this.objBoxElement.drawDrag) {
      this.objBoxElement.drawDrag();
    }
    return false;
  };

  CanvasBoxBehavior.prototype.onDrop = function(event) {
    this.dragdrop = false;
    if (this.objBoxElement.drawDrop) {
      return this.objBoxElement.drawDrop();
    }
  };

  CanvasBoxBehavior.prototype.onTimer = function() {
    return this.move();
  };

  CanvasBoxBehavior.prototype.getForce = function(objElement) {
    var objVector;
    objVector = Array();
    return objVector;
  };

  CanvasBoxBehavior.prototype.move = function() {
    return true;
  };

  CanvasBoxBehavior.prototype.changeBehavior = function(strNewBehavior) {
    var objNewBehavior;
    objNewBehavior = New[strNewBehavior](this.objBoxElement);
    objNewBehavior.objBoxElement = this.objBoxElement;
    objNewBehavior.dx = this.dx;
    objNewBehavior.dy = this.dy;
    this.objBoxElement.objBehavior = objNewBehavior;
    return objNewBehavior;
  };

  return CanvasBoxBehavior;

})();

//# sourceMappingURL=maps/CanvasBoxBehavior.js.map