var CanvasBoxPolygon,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxElement();

CanvasBoxPolygon = (function(_super) {
  __extends(CanvasBoxPolygon, _super);

  function CanvasBoxPolygon() {
    return CanvasBoxPolygon.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxPolygon.prototype.debug = false;

  CanvasBoxPolygon.prototype.color = null;

  CanvasBoxPolygon.prototype.borderColor = null;

  CanvasBoxPolygon.prototype.borderWidth = 1;

  CanvasBoxPolygon.prototype.dblRotate = 0;

  CanvasBoxPolygon.prototype.arrPoints = null;

  CanvasBoxPolygon.prototype.strClassName = "Polygon";

  CanvasBoxPolygon.prototype.init = function() {
    CanvasBoxPolygon.__super__.init.call(this);
    return this.arrPoints = new Array();
  };

  CanvasBoxPolygon.prototype.toSerialize = function() {
    var objResult;
    objResult = CanvasBoxPolygon.__super__.toSerialize.call(this);
    objResult.arrPoints = this.serializePoints();
    objResult.dblRotate = this.dblRotate;
    return objResult;
  };

  CanvasBoxPolygon.prototype.serializePoints = function() {
    var arrSerializedPoints, objPoint, objSerialPoint, _i, _len, _ref;
    arrSerializedPoints = new Array();
    _ref = this.arrPoints;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objPoint = _ref[_i];
      if (objPoint instanceof CanvasBoxPointer) {
        objSerialPoint = objPoint.toSerialize();
      } else {
        objSerialPoint = objPoint;
      }
      arrSerializedPoints.push(objSerialPoint);
    }
    return arrSerializedPoints;
  };

  CanvasBoxPolygon.prototype.getRotatedPoints = function() {
    var arrRotatedPoints, objPoint, _i, _len, _ref;
    arrRotatedPoints = new Array();
    _ref = this.arrPoints;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objPoint = _ref[_i];
      arrRotatedPoints.push(this.rotatePoint(objPoint));
    }
    return arrRotatedPoints;
  };

  CanvasBoxPolygon.prototype.addPoint = function(objPoint) {
    objPoint.position = this.arrPoints.length;
    this.arrPoints.push(objPoint);
    return this;
  };

  CanvasBoxPolygon.prototype.draw = function() {
    var arrPoints, intKey, objAfter, objBefore, objFirstPoint, objNextPoint, objPoint, objPrevious, _i, _j, _len, _len1, _ref, _ref1;
    if (this.arrPoints.length < 2) {
      return CanvasBoxPolygon.__super__.draw.call(this);
    }
    this.changeContext();
    this.objBox.setFillStyle(this.color);
    this.objBox.setStrokeStyle(this.borderColor);
    this.objBox.lineWidth = "" + this.borderWidth + "px";
    arrPoints = this.getRotatedPoints();
    objFirstPoint = arrPoints[0];
    this.objBox.beginPath();
    _ref = this.arrPoints;
    for (intKey = _i = 0, _len = _ref.length; _i < _len; intKey = ++_i) {
      objPoint = _ref[intKey];
      objNextPoint = this.arrPoints[(intKey + 1) % this.arrPoints.length];
      objPrevious = this.arrPoints[(intKey - 1 + this.arrPoints.length) % this.arrPoints.length];
      if (intKey === 0) {
        this.objBox.moveTo(objPoint.x, objPoint.y);
      }
      if (objPoint instanceof CanvasBoxPointer) {
        if (objPoint.strokeStyle != null) {
          this.objBox.setStrokeStyle(objPoint.strokeStyle);
        }
        if (objPoint.lineWidth != null) {
          this.objBox.setLineWidth(objPoint.lineWidth);
        }
      }
      this.objBox.lineTo(objPoint.x, objPoint.y);
    }
    this.objBox.fill();
    this.objBox.stroke();
    if (this.debug) {
      _ref1 = this.arrPoints;
      for (intKey = _j = 0, _len1 = _ref1.length; _j < _len1; intKey = ++_j) {
        objPoint = _ref1[intKey];
        objPrevious = this.arrPoints[(intKey - 1 + this.arrPoints.length) % this.arrPoints.length];
        if (objPoint instanceof CanvasBoxPointer) {
          if (objPoint.strokeStyle != null) {
            this.objBox.setStrokeStyle(objPoint.strokeStyle);
          }
          if (objPoint.lineWidth != null) {
            this.objBox.setLineWidth(objPoint.lineWidth);
          }
          objBefore = this.middle(objPrevious, objPoint);
          objAfter = this.middle(objPoint, objNextPoint);
          this.objBox.setStrokeStyle("black");
          this.objBox.strokeText(intKey, objPoint.x, objPoint.y);
        }
      }
    }
    this.restoreContext();
    return this;
  };

  CanvasBoxPolygon.prototype.isInsideElement = function(mouseX, mouseY) {
    var objPoint;
    objPoint = New.CanvasBoxPointer({
      x: mouseX,
      y: mouseY
    });
    return this.isInsidePolygon(objPoint);
  };

  CanvasBoxPolygon.prototype.isInsidePolygon = function(objPoint) {
    var arrRotatedPoints, booInside, intCurrentDiffX, intDiffBACAY, intDiffCABAY, intKey, intLastDiffX, intQtdPoints, objAPoint, objBPoint, objCurrentPoint, objLastPoint, _i, _len;
    objPoint.x = this.x - objPoint.x;
    objPoint.y = this.y - objPoint.y;
    arrRotatedPoints = this.getRotatedPoints();
    intQtdPoints = arrRotatedPoints.length;
    if (intQtdPoints < 3) {
      return false;
    }
    booInside = false;
    objLastPoint = arrRotatedPoints[intQtdPoints - 1];
    for (intKey = _i = 0, _len = arrRotatedPoints.length; _i < _len; intKey = ++_i) {
      objCurrentPoint = arrRotatedPoints[intKey];
      if (objCurrentPoint.x > objLastPoint.x) {
        objAPoint = objLastPoint;
        objBPoint = objCurrentPoint;
      } else {
        objBPoint = objLastPoint;
        objAPoint = objCurrentPoint;
      }
      intCurrentDiffX = objCurrentPoint.x < objPoint.x;
      intLastDiffX = objPoint.x <= objLastPoint.x;
      intDiffCABAY = Math.round((objPoint.y - objAPoint.y) * (objBPoint.x - objAPoint.x));
      intDiffBACAY = Math.round((objBPoint.y - objAPoint.y) * (objPoint.x - objAPoint.x));
      if ((intCurrentDiffX === intLastDiffX) && intDiffCABAY < intDiffBACAY) {
        booInside = !booInside;
      }
      objLastPoint = objCurrentPoint;
    }
    return booInside;
  };

  CanvasBoxPolygon.prototype.rotatePoint = function(objPoint) {
    var intNewPositionX, intNewPositionY;
    intNewPositionX = Math.round(Math.cos(this.dblRotate) * objPoint.x - Math.sin(-this.dblRotate) * objPoint.y);
    intNewPositionY = -Math.round(Math.cos(this.dblRotate) * objPoint.y - Math.sin(this.dblRotate) * objPoint.x);
    return New.CanvasBoxPointer({
      x: intNewPositionX,
      y: intNewPositionY
    });
  };

  CanvasBoxPolygon.prototype.smooth = function() {
    var arrNewPoints, intKey, objBeforePoint, objMiddlePointAB, objMiddlePointBC, objNewB, objNextPoint, objPoint, objShadowB, _i, _len, _ref;
    arrNewPoints = new Array();
    _ref = this.arrPoints;
    for (intKey = _i = 0, _len = _ref.length; _i < _len; intKey = ++_i) {
      objPoint = _ref[intKey];
      objNextPoint = this.arrPoints[(intKey + 1) % this.arrPoints.length];
      objBeforePoint = this.arrPoints[(intKey - 1 + this.arrPoints.length) % this.arrPoints.length];
      objMiddlePointAB = this.middle(objBeforePoint, objPoint);
      objMiddlePointBC = this.middle(objPoint, objNextPoint);
      objShadowB = this.middle(objMiddlePointAB, objMiddlePointBC);
      objNewB = this.middle(objShadowB, objPoint);
      arrNewPoints.push(objNewB);
      arrNewPoints.push(objMiddlePointBC);
    }
    return this.arrPoints = arrNewPoints;
  };

  CanvasBoxPolygon.prototype.middle = function(objPoint1, objPoint2) {
    var objPointResult;
    objPointResult = New.CanvasBoxPointer({
      x: (objPoint1.x + objPoint2.x) / 2,
      y: (objPoint1.y + objPoint2.y) / 2
    });
    return objPointResult;
  };

  return CanvasBoxPolygon;

})(CanvasBoxElement);

//# sourceMappingURL=maps/CanvasBoxPolygon.js.map