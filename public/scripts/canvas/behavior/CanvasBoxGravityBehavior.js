var CanvasBoxGravityBehavior,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxBehavior();

CanvasBoxGravityBehavior = (function(_super) {
  __extends(CanvasBoxGravityBehavior, _super);

  function CanvasBoxGravityBehavior() {
    return CanvasBoxGravityBehavior.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxGravityBehavior.prototype.dblFriction = 0.8;

  CanvasBoxGravityBehavior.prototype.dblGravityForce = 0.5;

  CanvasBoxGravityBehavior.dblMaxForce = 10;

  CanvasBoxGravityBehavior.prototype.dblMinimalGravityForce = 3;

  CanvasBoxGravityBehavior.prototype.dblElasticityLoss = 0.99;

  CanvasBoxGravityBehavior.prototype.move = function() {
    var booLast;
    this.objBoxElement.refresh();
    if (this.objBoxElement.fixed || this.objBoxElement.booDrag) {
      return false;
    }
    if ((this.objBoxElement.dy == null) || isNaN(this.objBoxElement.dy)) {
      this.objBoxElement.dy = 0;
    }
    if ((this.objBoxElement.dx == null) || isNaN(this.objBoxElement.dx)) {
      this.objBoxElement.dx = 0;
    }
    this.objBoxElement.x = Math.round(this.objBoxElement.x + this.objBoxElement.dx);
    this.objBoxElement.y = Math.round(this.objBoxElement.y + this.objBoxElement.dy);
    this.objBoxElement.refresh();
    booLast = this.isLastOne(this.objBoxElement);
    if (booLast) {
      this.objBoxElement.dy += this.dblGravityForce;
    } else {
      this.objBoxElement.dy = -1 * Math.abs(this.objBoxElement.dy);
      this.objBoxElement.dy *= -this.dblFriction;
    }
    if (this.objBoxElement.dy > this.dblMaxForce) {
      this.objBoxElement.dy = this.dblMaxForce;
    }
    if (this.objBoxElement.dy < -this.dblMaxForce) {
      this.objBoxElement.dy = -this.dblMaxForce;
    }
    if (this.objBoxElement.dx > this.dblMaxForce) {
      this.objBoxElement.dx = this.dblMaxForce;
    }
    if (this.objBoxElement.dx < -this.dblMaxForce) {
      this.objBoxElement.dx = -this.dblMaxForce;
    }
    if ((Math.round(this.objBoxElement.dx) !== 0) || (Math.round(this.objBoxElement.dy) !== 0)) {
      this.objBoxElement.objBox.booChanged = true;
    }
    this.objBoxElement.x = Math.round(this.objBoxElement.x + this.objBoxElement.dx);
    this.objBoxElement.y = Math.round(this.objBoxElement.y + this.objBoxElement.dy);
    this.objBoxElement.dx *= this.dblElasticityLoss;
    this.objBoxElement.dy *= this.dblElasticityLoss;
    if (this.objBoxElement.x0 < 0) {
      this.objBoxElement.x = this.objBoxElement.width / 2;
      this.objBoxElement.dx = -this.objBoxElement.dx - 1;
      if (Math.abs(this.objBoxElement.dx) < this.dblMinimalGravityForce) {
        this.objBoxElement.dx = 0;
      }
    }
    if (this.objBoxElement.x1 > this.objBoxElement.objBox.width) {
      this.objBoxElement.x = this.objBoxElement.objBox.width - (this.objBoxElement.width / 2);
      this.objBoxElement.dx = -this.objBoxElement.dx + 1;
      if (Math.abs(this.objBoxElement.dx) < this.dblMinimalGravityForce) {
        this.objBoxElement.dx = 0;
      }
    }
    if (this.objBoxElement.y0 < 0) {
      this.objBoxElement.y = this.objBoxElement.height / 2;
      this.objBoxElement.dy = -this.objBoxElement.dy - 1;
      if (Math.abs(this.objBoxElement.dy) < this.dblMinimalGravityForce) {
        this.objBoxElement.dy = 0;
      }
    }
    if (this.objBoxElement.y1 > this.objBoxElement.objBox.height) {
      this.objBoxElement.y = Math.round(this.objBoxElement.objBox.height - (this.objBoxElement.height / 2));
      this.objBoxElement.dy = -Math.round(this.objBoxElement.dy * 0.8 * 10) / 10;
      if (Math.abs(this.objBoxElement.dy) < this.dblMinimalGravityForce) {
        this.objBoxElement.dy = 0;
      }
    }
    this.objBoxElement.refresh();
    return CanvasBoxGravityBehavior.__super__.move.apply(this, arguments);
  };

  CanvasBoxGravityBehavior.prototype.isLastOne = function(objActualElement) {
    var arrElements, booColision, booLast, intElement, intMyBottom, intMyLeft, intMyRight, intMyTop, intQtdElements, objBoxElement, _i, _len;
    arrElements = this.objBoxElement.objBox.arrElements;
    intQtdElements = arrElements.length;
    intMyTop = Math.round(objActualElement.y - (objActualElement.height / 2));
    intMyBottom = Math.round(objActualElement.y + (objActualElement.height / 2));
    intMyRight = Math.round(objActualElement.x + (objActualElement.width / 2));
    intMyLeft = Math.round(objActualElement.x - (objActualElement.width / 2));
    booLast = true;
    intElement = 0;
    for (_i = 0, _len = arrElements.length; _i < _len; _i++) {
      objBoxElement = arrElements[_i];
      if (!(!objBoxElement.isConnector && objBoxElement.getId() !== objActualElement.getId())) {
        continue;
      }
      booColision = false;
      if (!booColision && (Math.round(objBoxElement.x + (objBoxElement.width / 2)) >= intMyLeft) && (Math.round(objBoxElement.x + (objBoxElement.width / 2)) <= intMyRight) && (Math.round(objBoxElement.y + (objBoxElement.height / 2)) >= intMyTop) && (Math.round(objBoxElement.y + (objBoxElement.height / 2)) <= intMyBottom)) {
        booColision = true;
      }
      if (!booColision && (Math.round(objBoxElement.x - (objBoxElement.width / 2)) >= intMyLeft) && (Math.round(objBoxElement.x - (objBoxElement.width / 2)) <= intMyRight) && (Math.round(objBoxElement.y + (objBoxElement.height / 2)) >= intMyTop) && (Math.round(objBoxElement.y + (objBoxElement.height / 2)) <= intMyBottom)) {
        booColision = true;
      }
      if (!booColision && (Math.round(objBoxElement.x + (objBoxElement.width / 2)) >= intMyLeft) && (Math.round(objBoxElement.x + (objBoxElement.width / 2)) <= intMyRight) && (Math.round(objBoxElement.y - (objBoxElement.height / 2)) >= intMyTop) && (Math.round(objBoxElement.y - (objBoxElement.height / 2)) <= intMyBottom)) {
        booColision = true;
      }
      if (!booColision && (Math.round(objBoxElement.x - (objBoxElement.width / 2)) >= intMyLeft) && (Math.round(objBoxElement.x - (objBoxElement.width / 2)) <= intMyRight) && (Math.round(objBoxElement.y - (objBoxElement.height / 2)) >= intMyTop) && (Math.round(objBoxElement.y - (objBoxElement.height / 2)) <= intMyBottom)) {
        booColision = true;
      }
      if (booColision) {
        booLast = booLast && (objActualElement.y >= objBoxElement.y);
      }
    }
    return booLast;
  };

  CanvasBoxGravityBehavior.prototype.onDrag = function(event) {
    this.objBoxElement.dx = this.objBoxElement.objBox.mouseX - this.objBoxElement.x;
    this.objBoxElement.dy = this.objBoxElement.objBox.mouseY - this.objBoxElement.y;
    return CanvasBoxGravityBehavior.__super__.onDrag.call(this, event);
  };

  return CanvasBoxGravityBehavior;

})(CanvasBoxBehavior);

//# sourceMappingURL=maps/CanvasBoxGravityBehavior.js.map