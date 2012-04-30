var CanvasBoxPointer;
CanvasBoxPointer = (function() {
  var strClassName;
  strClassName = "CanvasBoxPointer";
  CanvasBoxPointer.prototype.x = 0;
  CanvasBoxPointer.prototype.y = 0;
  CanvasBoxPointer.prototype.lineWidth = 1;
  CanvasBoxPointer.prototype.strokeStyle = "black";
  CanvasBoxPointer.prototype.objControl1 = {
    x: 0,
    y: 0
  };
  CanvasBoxPointer.prototype.objControl2 = {
    x: 0,
    y: 0
  };
  function CanvasBoxPointer(objParams) {
    if (objParams == null) {
      objParams = null;
    }
    if ((objParams != null)) {
      if (objParams.x != null) {
        this.x = objParams.x;
      }
      if (objParams.y != null) {
        this.y = objParams.y;
      }
      if (objParams.x1 != null) {
        this.objControl1.x = objParams.x1;
      }
      if (objParams.y1 != null) {
        this.objControl1.y = objParams.y1;
      }
      if (objParams.x2 != null) {
        this.objControl2.x = objParams.x2;
      }
      if (objParams.y2 != null) {
        this.objControl2.y = objParams.y2;
      }
      if (objParams.strokeStyle != null) {
        this.strokeStyle = objParams.strokeStyle;
      }
      if (objParams.lineWidth != null) {
        this.lineWidth = objParams.lineWidth;
      }
    }
  }
  CanvasBoxPointer.prototype.toSerialize = function() {
    return {
      x: this.x,
      y: this.y,
      x1: this.objControl1.x,
      y1: this.objControl1.y,
      x2: this.objControl2.x,
      y2: this.objControl2.y,
      lineWidth: this.lineWidth,
      strokeStyle: this.strokeStyle
    };
  };
  CanvasBoxPointer.prototype.hasSomeBezierControl = function() {
    return (this.objControl1.x !== 0) || (this.objControl1.y !== 0) || (this.objControl2.x !== 0) || (this.objControl2.y !== 0);
  };
  CanvasBoxPointer.prototype.round = function(dblPercent) {
    if (dblPercent == null) {
      dblPercent = 50;
    }
    this.objControl1.x = 10;
    return this.objControl1.y = 10;
  };
  CanvasBoxPointer.prototype.rotatePoint = function(objPoint, dblAngle) {
    var intNewPositionX, intNewPositionY;
    intNewPositionX = Math.cos(dblAngle) * objPoint.x - Math.sin(-dblAngle) * objPoint.y;
    intNewPositionY = -(Math.cos(dblAngle) * objPoint.y - Math.sin(dblAngle) * objPoint.x);
    return {
      x: intNewPositionX,
      y: intNewPositionY
    };
  };
  CanvasBoxPointer.prototype.rotate = function(dblAngle) {
    var objPointControl1, objPointControl2, objPointRotate;
    return false;
    objPointRotate = this.rotatePoint(this, dblAngle);
    objPointControl1 = this.rotatePoint(this.objControl1, dblAngle);
    objPointControl2 = this.rotatePoint(this.objControl2, dblAngle);
    return New.CanvasBoxPointer({
      x: objPointRotate.x,
      y: objPointRotate.y,
      x1: objPointControl1.x,
      y1: objPointControl1.y,
      x2: objPointControl2.x,
      y2: objPointControl2.y,
      lineWidth: this.lineWidth,
      strokeStyle: this.strokeStyle
    });
  };
  return CanvasBoxPointer;
})();