var CanvasBoxPolygon;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Load.CanvasBoxElement();
CanvasBoxPolygon = (function() {
  __extends(CanvasBoxPolygon, CanvasBoxElement);
  function CanvasBoxPolygon() {
    CanvasBoxPolygon.__super__.constructor.apply(this, arguments);
  }
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
    var arrPoints, dblPercent, intKey, objAfter, objBefore, objFirstPoint, objNextPoint, objPoint, objPrevious, _len, _ref;
    if (this.arrPoints.length < 2) {
      return CanvasBoxPolygon.__super__.draw.call(this);
    }
    this.changeContext();
    this.objBox.setFillStyle(this.color);
    this.objBox.setStrokeStyle(this.borderColor);
    this.objBox.lineWidth = "" + this.borderWidth + "px";
    arrPoints = this.getRotatedPoints();
    objFirstPoint = arrPoints[0];
    this.objBox.moveTo(objFirstPoint.x, objFirstPoint.y);
    this.objBox.beginPath();
    _ref = this.arrPoints;
    for (intKey = 0, _len = _ref.length; intKey < _len; intKey++) {
      objPoint = _ref[intKey];
      objNextPoint = this.arrPoints[(intKey + 1) % this.arrPoints.length];
      objPrevious = this.arrPoints[(intKey - 1 + this.arrPoints.length) % this.arrPoints.length];
      if (objPoint instanceof CanvasBoxPointer) {
        if (true || objPoint.hasSomeBezierControl()) {
          if (objPoint.strokeStyle != null) {
            this.objBox.setStrokeStyle(objPoint.strokeStyle);
          }
          if (objPoint.lineWidth != null) {
            this.objBox.setLineWidth(objPoint.lineWidth);
          }
          dblPercent = 50;
          objBefore = this.middle(objPrevious, objPoint, dblPercent);
          objAfter = this.middle(objPoint, objNextPoint, dblPercent);
          if (intKey === 0) {
            this.objBox.moveTo(objPoint.x, objPoint.y);
          }
          this.objBox.getContext().quadraticCurveTo(1 * objAfter.x, 1 * objAfter.y, objNextPoint.x, objNextPoint.y, 50);
        } else {
          this.objBox.lineTo(objPoint.x, objPoint.y);
        }
      } else {
        this.objBox.lineTo(objPoint.x, objPoint.y);
      }
    }
    this.objBox.fill();
    this.objBox.stroke();
    this.restoreContext();
    return this;
  };
  CanvasBoxPolygon.prototype.isInsideElement = function(mouseX, mouseY) {
    var objPoint;
    objPoint = {
      x: mouseX,
      y: mouseY
    };
    return this.isInsidePolygon(objPoint);
  };
  CanvasBoxPolygon.prototype.isInsidePolygon = function(objMousePoint) {
    var arrRotatedPoints, booInside, booInsideMaxX, booInsideMaxY, booInsideMinX, booInsideMinY, dblCurrentNextAngle, dblLineDistance, dblMargin, dblMouseCurrentAngle, dblMouseNextAngle, distCurrentNext, distCurrentNextX, distCurrentNextY, distMouseCurrent, distMouseCurrentX, distMouseCurrentY, distMouseNext, distMouseNextX, distMouseNextY, intKey, intQtdPoints, objCurrentPoint, objNextPoint, _len;
    objMousePoint.x -= this.x;
    objMousePoint.y -= this.y;
    arrRotatedPoints = this.getRotatedPoints();
    intQtdPoints = arrRotatedPoints.length;
    if (intQtdPoints < 3) {
      return false;
    }
    booInside = false;
    for (intKey = 0, _len = arrRotatedPoints.length; intKey < _len; intKey++) {
      objCurrentPoint = arrRotatedPoints[intKey];
      objNextPoint = arrRotatedPoints[(intKey + 1) % intQtdPoints];
      booInsideMinX = objMousePoint.x >= php.min(objCurrentPoint.x, objNextPoint.x);
      booInsideMaxX = objMousePoint.x <= php.max(objCurrentPoint.x, objNextPoint.x);
      booInsideMinY = objMousePoint.y >= php.min(objCurrentPoint.y, objNextPoint.y);
      booInsideMaxY = objMousePoint.y <= php.max(objCurrentPoint.y, objNextPoint.y);
      distMouseCurrentX = objMousePoint.x - objCurrentPoint.x;
      distMouseCurrentY = objMousePoint.y - objCurrentPoint.y;
      distMouseCurrent = php.sqrt(distMouseCurrentX * distMouseCurrentX + distMouseCurrentY * distMouseCurrentY);
      distMouseCurrent = php.round(distMouseCurrent);
      dblMouseCurrentAngle = distMouseCurrentX / distMouseCurrentY;
      distMouseNextX = objMousePoint.x - objNextPoint.x;
      distMouseNextY = objMousePoint.y - objNextPoint.y;
      distMouseNext = Math.sqrt(distMouseNextX * distMouseNextX + distMouseNextY * distMouseNextY);
      distMouseNext = Math.round(distMouseNext);
      dblMouseNextAngle = distMouseNextX / distMouseNextY;
      distCurrentNextX = objCurrentPoint.x - objNextPoint.x;
      distCurrentNextY = objCurrentPoint.y - objNextPoint.y;
      distCurrentNext = Math.sqrt(distCurrentNextX * distCurrentNextX + distCurrentNextY * distCurrentNextY);
      distCurrentNext = Math.round(distCurrentNext);
      dblCurrentNextAngle = distCurrentNextX / distCurrentNextY;
      dblLineDistance = distMouseCurrent + distMouseNext - distCurrentNext;
      dblMargin = 2;
      if ((dblCurrentNextAngle <= dblMouseCurrentAngle) && (booInsideMinX && booInsideMaxX) && (booInsideMinY && booInsideMaxY)) {
        booInside = !booInside;
        if (booInside) {
          document.title += "1";
        } else {
          document.title += "0";
        }
      }
    }
    return booInside;
  };
  CanvasBoxPolygon.prototype.isInsidePolygon1 = function(objPoint) {
    var arrRotatedPoints, booInside, intCurrentDiffX, intDiffBACAY, intDiffCABAY, intKey, intLastDiffX, intQtdPoints, objAPoint, objBPoint, objCurrentPoint, objLastPoint, _len;
    objPoint.x -= this.x;
    objPoint.y -= this.y;
    arrRotatedPoints = this.getRotatedPoints();
    intQtdPoints = arrRotatedPoints.length;
    if (intQtdPoints < 3) {
      return false;
    }
    booInside = false;
    objLastPoint = arrRotatedPoints[intQtdPoints - 1];
    for (intKey = 0, _len = arrRotatedPoints.length; intKey < _len; intKey++) {
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
    intNewPositionX = Math.cos(this.dblRotate) * objPoint.x - Math.sin(-this.dblRotate) * objPoint.y;
    intNewPositionY = -(Math.cos(this.dblRotate) * objPoint.y - Math.sin(this.dblRotate) * objPoint.x);
    return {
      x: intNewPositionX,
      y: intNewPositionY
    };
  };
  CanvasBoxPolygon.prototype.rotatePoint2 = function(objPoint) {
    var intNewPositionX, intNewPositionY;
    if (!objPoint instanceof CanvasBoxPointer) {
      intNewPositionX = Math.cos(this.dblRotate) * objPoint.x - Math.sin(-this.dblRotate) * objPoint.y;
      intNewPositionY = -(Math.cos(this.dblRotate) * objPoint.y - Math.sin(this.dblRotate) * objPoint.x);
      return {
        x: intNewPositionX,
        y: intNewPositionY
      };
    } else {
      return objPoint.rotate(this.dblRotate);
    }
  };
  CanvasBoxPolygon.prototype.round = function() {
    var objPoint, _i, _len, _ref, _results;
    _ref = this.arrPoints;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objPoint = _ref[_i];
      _results.push(objPoint.round());
    }
    return _results;
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
})();