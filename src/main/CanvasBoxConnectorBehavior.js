var CanvasBoxConnectorBehavior;

CanvasBoxConnectorBehavior = (function() {

  CanvasBoxConnectorBehavior.prototype.objBox = null;

  CanvasBoxConnectorBehavior.prototype.objBoxElement = null;

  CanvasBoxConnectorBehavior.prototype.intXDistance = 0;

  CanvasBoxConnectorBehavior.prototype.intYDistance = 0;

  function CanvasBoxConnectorBehavior(objBoxElement) {
    this.objBoxElement = objBoxElement;
    this.objBox = objBoxElement.objBox;
  }

  CanvasBoxConnectorBehavior.prototype.draw = function() {
    return this.objBoxElement.draw();
  };

  CanvasBoxConnectorBehavior.prototype.refresh = function() {
    return this.objBoxElement.refresh();
  };

  CanvasBoxConnectorBehavior.prototype.isInside = function() {
    return this.objBoxElement.isInside();
  };

  CanvasBoxConnectorBehavior.prototype.onTimer = function() {
    return this.move();
  };

  CanvasBoxConnectorBehavior.prototype.onMouseOver = function(event) {
    if (this.objBoxElement.drawMouseOver) {
      return this.objBoxElement.drawMouseOver(event);
    }
  };

  CanvasBoxConnectorBehavior.prototype.onMouseOut = function(event) {
    if (this.objBoxElement.drawMouseOut) {
      return this.objBoxElement.drawMouseOut(event);
    }
  };

  CanvasBoxConnectorBehavior.prototype.onDblClick = function(event) {
    if (this.objBoxElement.drawFixed) {
      return this.objBoxElement.drawFixed(!this.objBoxElement.fixed);
    }
  };

  CanvasBoxConnectorBehavior.prototype.onDrag = function(event) {
    var intOldX, intOldY;
    intOldX = Math.round((this.objBoxElement.objElementFrom.x + this.objBoxElement.objElementTo.x) / 2);
    intOldY = Math.round((this.objBoxElement.objElementFrom.y + this.objBoxElement.objElementTo.y) / 2);
    this.objBoxElement.booDrag = true;
    this.intXDistance = this.objBoxElement.objBox.mouseX - intOldX;
    return this.intYDistance = this.objBoxElement.objBox.mouseY - intOldY;
  };

  CanvasBoxConnectorBehavior.prototype.onDrop = function(event) {
    return this.objBoxElement.booDrag = false;
  };

  CanvasBoxConnectorBehavior.prototype.onMouseDown = function(event) {};

  CanvasBoxConnectorBehavior.prototype.onClick = function(event) {};

  CanvasBoxConnectorBehavior.prototype.move = function() {
    if (this.objBoxElement.fixed) return;
    if (this.objBoxElement.objElementFrom !== this.objBoxElement.objElementTo) {
      this.objBoxElement.x = (this.objBoxElement.objElementFrom.x + this.objBoxElement.objElementTo.x) / 2 + this.intXDistance;
      return this.objBoxElement.y = (this.objBoxElement.objElementFrom.y + this.objBoxElement.objElementTo.y) / 2 + this.intYDistance;
    } else {
      if (Math.sqrt(this.intXDistance * this.intXDistance + this.intYDistance * this.intYDistance) < 100) {
        this.intXDistance = 100;
        this.intYDistance = 100;
      }
      this.objBoxElement.x = this.objBoxElement.objElementFrom.x + this.intXDistance;
      return this.objBoxElement.y = this.objBoxElement.objElementFrom.y + this.intYDistance;
    }
  };

  CanvasBoxConnectorBehavior.prototype.getForce = function(objElement) {
    return null;
  };

  CanvasBoxConnectorBehavior.prototype.changeBehavior = function(strNewBehavior) {
    var objNewBehavior;
    objNewBehavior = New[strNewBehavior](this.objBoxElement);
    objNewBehavior.dx = this.dx;
    objNewBehavior.dy = this.dy;
    objNewBehavior.intXDistance = this.intXDistance;
    objNewBehavior.intYDistance = this.intYDistance;
    objNewBehavior.objBox = this.objBox;
    this.objBoxElement.objBehavior = objNewBehavior;
    return objNewBehavior;
  };

  return CanvasBoxConnectorBehavior;

})();
