var CanvasBoxBehavior;
CanvasBoxBehavior = (function() {
  CanvasBoxBehavior.prototype.objBox = null;
  CanvasBoxBehavior.prototype.objBoxElement = null;
  CanvasBoxBehavior.prototype.intMargin = 20;
  CanvasBoxBehavior.prototype.strClassName = "CanvasBoxBehavior";
  CanvasBoxBehavior.prototype.toSerialize = function() {
    return {};
  };
  function CanvasBoxBehavior(objBoxElement) {
    this.objBoxElement = objBoxElement;
    this.objBox = objBoxElement.objBox;
    this.objBoxElement.dx = 0;
    this.objBoxElement.dy = 0;
  }
  CanvasBoxBehavior.prototype.onMouseOver = function(event) {
    return false;
  };
  CanvasBoxBehavior.prototype.onMouseOut = function(event) {
    return false;
  };
  CanvasBoxBehavior.prototype.onMouseDown = function(event) {
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
    this.objBoxElement.x = this.objBoxElement.objBox.mouseX;
    this.objBoxElement.y = this.objBoxElement.objBox.mouseY;
    return false;
  };
  CanvasBoxBehavior.prototype.onDrop = function(event) {
    return false;
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
    if (!this.objBoxElement.fixed) {
      return document.title = ":)";
    } else {
      return document.title = ":(";
    }
  };
  return CanvasBoxBehavior;
})();