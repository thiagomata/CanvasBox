var CanvasBoxMagneticBehavior,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxBehavior();

CanvasBoxMagneticBehavior = (function(_super) {
  __extends(CanvasBoxMagneticBehavior, _super);

  function CanvasBoxMagneticBehavior() {
    return CanvasBoxMagneticBehavior.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxMagneticBehavior.prototype.intMagnetism = 40;

  CanvasBoxMagneticBehavior.prototype.intWallRepelsForce = 0.1;

  CanvasBoxMagneticBehavior.prototype.intDirectionChangeLoss = 100;

  CanvasBoxMagneticBehavior.prototype.intMaxForce = 10;

  CanvasBoxMagneticBehavior.prototype.intMargin = 10;

  CanvasBoxMagneticBehavior.prototype.intRepelling = 20;

  CanvasBoxMagneticBehavior.prototype.intEscapeForce = 0.05;

  CanvasBoxMagneticBehavior.prototype.dblCollisionForce = 0;

  CanvasBoxMagneticBehavior.prototype.strClassName = "CanvasBoxMagneticBehavior";

  CanvasBoxMagneticBehavior.prototype.toSerialize = function() {
    var objResult;
    objResult = Array();
    objResult.dragdrop = this.dragdrop;
    objResult.intMargin = this.intMargin;
    objResult.intEscapeForce = this.intEscapeForce;
    objResult.dblCollisionForce = this.dblCollisionForce;
    objResult.strClassName = this.strClassName;
    return objResult;
  };

  CanvasBoxMagneticBehavior.prototype.initialize = function(objBoxElement) {
    this.objBoxElement = objBoxElement;
    if (!this.intMagnetism) {
      return this.intMagnetism = 1;
    }
  };

  CanvasBoxMagneticBehavior.prototype.repelsWalls = function(arrVectors) {
    var dblWallForce, dblZoom, objVector;
    objVector = void 0;
    dblZoom = void 0;
    if (this.objBoxElement && this.objBoxElement.objBox) {
      dblZoom = this.objBoxElement.objBox.dblZoom;
    } else {
      dblZoom = 1;
    }
    dblWallForce = this.intWallRepelsForce * this.objBoxElement.objBox.arrElements.length * dblZoom;
    objVector = Array();
    objVector["dx"] = -1 * this.objBoxElement.x * dblWallForce;
    objVector["dy"] = 0;
    arrVectors.push(objVector);
    objVector = Array();
    objVector["dx"] = 1 * (this.objBoxElement.objBox.width - this.objBoxElement.x) * dblWallForce;
    objVector["dy"] = 0;
    arrVectors.push(objVector);
    objVector = Array();
    objVector["dx"] = 0;
    objVector["dy"] = -1 * this.objBoxElement.y * dblWallForce;
    arrVectors.push(objVector);
    objVector = Array();
    objVector["dx"] = 0;
    objVector["dy"] = 1 * (this.objBoxElement.objBox.height - this.objBoxElement.y) * dblWallForce;
    arrVectors.push(objVector);
    return arrVectors;
  };

  CanvasBoxMagneticBehavior.prototype.repelsElements = function(arrVectors) {
    var objElement, objVector, _i, _len, _ref;
    _ref = this.objBoxElement.objBox.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      if (!(objElement !== this.objBoxElement)) {
        continue;
      }
      objVector = this.getElementForce(objElement, this.objBoxElement);
      if (objVector != null) {
        arrVectors.push(objVector);
      }
      objVector = this.getConnectorForce(objElement, this.objBoxElement);
      if (objVector != null) {
        arrVectors.push(objVector);
      }
    }
    return arrVectors;
  };

  CanvasBoxMagneticBehavior.prototype.keepOnLimits = function(arrVectors) {
    var objVector;
    objVector = Array();
    objVector["dx"] = 0;
    objVector["dy"] = 0;
    objVector["dx"] += 1 * Math.abs(this.intEscapeForce + (this.objBoxElement.objBox.width - this.objBoxElement.x));
    objVector["dx"] += -1 * Math.abs(this.intEscapeForce + this.objBoxElement.x);
    objVector["dy"] += 1 * Math.abs(this.intEscapeForce + (this.objBoxElement.objBox.height - this.objBoxElement.y));
    objVector["dy"] += -1 * Math.abs(this.intEscapeForce + this.objBoxElement.y);
    if ((objVector["dx"] !== 0) || (objVector["dy"] !== 0)) {
      arrVectors.push(objVector);
    }
    return arrVectors;
  };

  CanvasBoxMagneticBehavior.prototype.hasChanged = function() {
    var booChanged;
    booChanged = false;
    if (this.objBoxElement.x < this.intMargin) {
      this.objBoxElement.x = this.intMargin;
      booChanged = true;
    }
    if (this.objBoxElement.x + this.intMargin > this.objBoxElement.objBox.width) {
      this.objBoxElement.x = Math.round(this.objBoxElement.objBox.width - this.intMargin);
      booChanged = true;
    }
    if (this.objBoxElement.y < this.intMargin) {
      this.objBoxElement.y = this.intMargin;
      booChanged = true;
    }
    if (this.objBoxElement.y + this.intMargin > this.objBoxElement.objBox.height) {
      this.objBoxElement.y = Math.round(this.objBoxElement.objBox.height - this.intMargin);
      booChanged = true;
    }
    return booChanged;
  };

  CanvasBoxMagneticBehavior.prototype.move = function() {
    var arrVectors;
    if (this.objBoxElement.fixed || this.objBoxElement.dragdrop) {
      return;
    }
    arrVectors = Array();
    arrVectors = this.repelsWalls(arrVectors);
    arrVectors = this.repelsElements(arrVectors);
    arrVectors = this.keepOnLimits(arrVectors);
    this.objBoxElement.dx = Math.round(this.objBoxElement.dx);
    this.objBoxElement.dy = Math.round(this.objBoxElement.dy);
    if (isNaN(this.objBoxElement.dx)) {
      this.objBoxElement.dx = 0;
    }
    if (isNaN(this.objBoxElement.dy)) {
      this.objBoxElement.dy = 0;
    }
    this.getVectors(arrVectors);
    if (Math.round(this.objBoxElement.dx) !== 0 || Math.round(this.objBoxElement.dy) !== 0) {
      this.objBoxElement.objBox.booChanged = true;
      this.objBoxElement.x = Math.round(this.objBoxElement.x + this.objBoxElement.dx);
      this.objBoxElement.y = Math.round(this.objBoxElement.y + this.objBoxElement.dy);
    }
    return this.hasChanged();
  };

  CanvasBoxMagneticBehavior.prototype.onTimer = function() {
    return this.move();
  };

  CanvasBoxMagneticBehavior.prototype.onMouseOver = function(event) {
    if (this.objBoxElement.drawMouseOver) {
      return this.objBoxElement.drawMouseOver(event);
    }
  };

  CanvasBoxMagneticBehavior.prototype.onMouseOut = function(event) {
    if (this.objBoxElement.drawMouseOut) {
      return this.objBoxElement.drawMouseOut(event);
    }
  };

  CanvasBoxMagneticBehavior.prototype.onDblClick = function(event) {
    this.objBoxElement.fixed = !this.objBoxElement.fixed;
    if (this.objBoxElement.drawFixed) {
      return this.objBoxElement.drawFixed(this.objBoxElement.fixed);
    }
  };

  CanvasBoxMagneticBehavior.prototype.onDrag = function(event) {
    this.objBoxElement.dragdrop = true;
    this.objBoxElement.dx = this.objBoxElement.objBox.mouseX - this.objBoxElement.x;
    this.objBoxElement.dy = this.objBoxElement.objBox.mouseY - this.objBoxElement.y;
    this.objBoxElement.x = this.objBoxElement.objBox.mouseX;
    this.objBoxElement.y = this.objBoxElement.objBox.mouseY;
    if (this.objBoxElement.drawDrag) {
      return this.objBoxElement.drawDrag();
    }
  };

  CanvasBoxMagneticBehavior.prototype.onDrop = function(event) {
    this.objBoxElement.dragdrop = false;
    if (this.objBoxElement.drawDrop) {
      return this.objBoxElement.drawDrop();
    }
  };

  CanvasBoxMagneticBehavior.prototype.getVectors = function(arrVectors) {
    var dblX, dblY, dx, dy, i, intQtdVectors, objVector;
    intQtdVectors = arrVectors.length;
    if (arrVectors.length === 0) {
      this.objBoxElement.dx = 0;
      this.objBoxElement.dy = 0;
      return;
    }
    dblX = 0;
    dblY = 0;
    i = 0;
    while (i < intQtdVectors) {
      objVector = arrVectors[i];
      dblX += objVector.dx;
      dblY += objVector.dy;
      ++i;
    }
    dx = Math.round(dblX / intQtdVectors);
    dy = Math.round(dblY / intQtdVectors);
    if (dx > this.intMaxForce) {
      dx = this.intMaxForce;
    }
    if (dx < -this.intMaxForce) {
      dx = -this.intMaxForce;
    }
    if (dy > this.intMaxForce) {
      dy = this.intMaxForce;
    }
    if (dy < -this.intMaxForce) {
      dy = -this.intMaxForce;
    }
    this.objBoxElement.dx = dx;
    return this.objBoxElement.dy = dy;
  };

  CanvasBoxMagneticBehavior.prototype.getConnectorForce = function(objElementFrom, objElementTo) {
    var arrVector, dblDistance, dblDistanceX, dblDistanceX2, dblDistanceY, dblDistanceY2, intConnectorForce, intConnectorPush, intDx, intDy, intMinForce, intPushFactor;
    if (!objElementFrom.isConnector && objElementTo.isConnector) {
      arrVector = this.getConnectorForce(objElementTo, objElementFrom);
      if (arrVector != null) {
        arrVector["dx"] *= -1;
        arrVector["dy"] *= -1;
      }
      return arrVector;
    }
    if (!objElementFrom.isConnector) {
      return null;
    }
    if (objElementFrom.objElementFrom !== objElementTo && objElementFrom.objElementTo !== objElementTo) {
      return null;
    }
    dblDistanceX = objElementFrom.x - objElementTo.x;
    dblDistanceY = objElementFrom.y - objElementTo.y;
    dblDistanceX2 = dblDistanceX * dblDistanceX;
    dblDistanceY2 = dblDistanceY * dblDistanceY;
    dblDistance = Math.round(100 * Math.sqrt(dblDistanceX2 + dblDistanceY2)) / 100;
    intConnectorPush = 100;
    intPushFactor = 2;
    intMinForce = 0;
    intConnectorForce = Math.round(100 * dblDistance / intConnectorPush) / 100;
    intConnectorForce = Math.round(100 * Math.pow(intConnectorForce, intPushFactor)) / 100;
    if (intConnectorForce > intMinForce) {
      intDx = Math.round(100 * intConnectorForce * Math.round(100 * dblDistanceX / dblDistance)) / 100;
      intDy = Math.round(100 * intConnectorForce * Math.round(100 * dblDistanceY / dblDistance)) / 100;
      arrVector = Array();
      arrVector["dx"] = intDx;
      arrVector["dy"] = intDy;
      return arrVector;
    }
    return null;
  };

  CanvasBoxMagneticBehavior.prototype.getElementForce = function(objElementFrom, objElementTo) {
    var booCollision, dblDirectionChange, dblDist, dblForceX, dblForceY, intDifX, intDifY, intDirectionX, intDirectionY, objVector;
    objVector = Array();
    objVector["dx"] = 0;
    objVector["dy"] = 0;
    booCollision = false;
    intDirectionX = (objElementTo.x < objElementFrom.x ? -1 : 1);
    intDirectionY = (objElementTo.y < objElementFrom.y ? -1 : 1);
    intDifX = objElementTo.x - objElementFrom.x;
    intDifY = objElementTo.y - objElementFrom.y;
    dblDist = Math.sqrt((intDifX * intDifX) + (intDifY * intDifY));
    if (dblDist > 1) {
      dblForceX = objElementFrom.objBox.width / dblDist;
      dblForceY = objElementFrom.objBox.height / dblDist;
    } else {
      dblForceX = 0;
      dblForceY = 0;
    }
    if (!booCollision && objElementTo.x1 && objElementTo.x0 && objElementTo.y1 && objElementTo.y0 && this.objBoxElement.x1 && objElementFrom.x0 && objElementFrom.y1 && objElementFrom.y0 && (objElementTo.x0 >= objElementFrom.x0) && (objElementTo.x0 <= objElementFrom.x1) && (objElementTo.y0 >= objElementFrom.y0) && (objElementTo.y0 <= objElementFrom.y1)) {
      objVector["dx"] -= this.intRepelling + Math.round((objElementFrom.x1 - objElementTo.x0) * this.dblCollisionForce);
      objVector["dy"] -= this.intRepelling + Math.round((objElementFrom.y1 - objElementTo.y0) * this.dblCollisionForce);
      booCollision = true;
    }
    if (!booCollision && objElementTo.x1 && objElementTo.x0 && objElementTo.y1 && objElementTo.y0 && objElementFrom.x1 && objElementFrom.x0 && objElementFrom.y1 && objElementFrom.y0 && (objElementTo.x0 <= objElementFrom.x1) && (objElementTo.x0 >= objElementFrom.x0) && (objElementTo.y1 <= objElementFrom.y1) && (objElementTo.y1 >= objElementFrom.y0)) {
      objVector["dx"] -= this.intRepelling + Math.round((objElementFrom.x1 - objElementTo.x0) * this.dblCollisionForce);
      objVector["dy"] += this.intRepelling + Math.round((objElementTo.y1 - objElementFrom.y0) * this.dblCollisionForce);
      booCollision = true;
    }
    if (!booCollision && objElementTo.x1 && objElementTo.x0 && objElementTo.y1 && objElementTo.y0 && objElementFrom.x1 && objElementFrom.x0 && objElementFrom.y1 && objElementFrom.y0 && (objElementTo.x1 <= objElementFrom.x1) && (objElementTo.x1 >= objElementFrom.x0) && (objElementTo.y0 <= objElementFrom.y1) && (objElementTo.y0 >= objElementFrom.y0)) {
      objVector["dx"] += this.intRepelling + Math.round((objElementTo.x1 - objElementFrom.x0) * this.dblCollisionForce);
      objVector["dy"] -= this.intRepelling + Math.round((objElementFrom.y0 - objElementTo.y0) * this.dblCollisionForce);
      booCollision = true;
    }
    if (!booCollision && objElementTo.x1 && objElementTo.x0 && objElementTo.y1 && objElementTo.y0 && objElementFrom.x1 && objElementFrom.x0 && objElementFrom.y1 && objElementFrom.y0 && (objElementTo.x1 >= objElementFrom.x1) && (objElementTo.x1 <= objElementFrom.x0) && (objElementTo.y1 >= objElementFrom.y0) && (objElementTo.y1 <= objElementFrom.y1)) {
      objVector["dx"] += this.intRepelling + Math.round((objElementTo.x1 - objElementFrom.x0) * this.dblCollisionForce);
      objVector["dy"] += this.intRepelling + Math.round((objElementTo.y1 - objElementFrom.y0) * this.dblCollisionForce);
      booCollision = true;
    }
    objVector["dx"] += this.intMagnetism * intDirectionX * dblForceX;
    objVector["dy"] += this.intMagnetism * intDirectionY * dblForceY;
    dblDirectionChange = Math.round(100 * Math.sqrt(objVector["dx"] * objVector["dx"] + objVector["dy"] * objVector["dy"])) / 100;
    objVector["dx"] += Math.round(100 * this.intRepelling + (Math.random(dblDirectionChange) - (dblDirectionChange / 2)) / this.intDirectionChangeLoss) / 100;
    objVector["dy"] += Math.round(100 * this.intRepelling + (Math.random(dblDirectionChange) - (dblDirectionChange / 2)) / this.intDirectionChangeLoss) / 100;
    if (booCollision) {
      objVector["dx"] += Math.round(100 * (Math.random() * dblDirectionChange - (dblDirectionChange / 2)) / this.intDirectionChangeLoss) / 100;
      objVector["dy"] += Math.round(100 * (Math.random() * dblDirectionChange - (dblDirectionChange / 2)) / this.intDirectionChangeLoss) / 100;
      objVector["dx"] += Math.round(100 * (Math.random() * dblDirectionChange - (dblDirectionChange / 2)) / this.intDirectionChangeLoss) / 100;
      objVector["dy"] += Math.round(100 * (Math.random() * dblDirectionChange - (dblDirectionChange / 2)) / this.intDirectionChangeLoss) / 100;
    }
    return objVector;
  };

  return CanvasBoxMagneticBehavior;

})(CanvasBoxBehavior);

//# sourceMappingURL=maps/CanvasBoxMagneticBehavior.js.map