var Polygon;
Polygon = (function() {
  Polygon.prototype.arrPoints = null;
  function Polygon() {
    this.arrPoints = new Array();
  }
  Polygon.prototype.addPoint = function(objPoint) {
    objPoint.position = this.arrPoints.length;
    this.arrPoints.push(objPoint);
    return this;
  };
  Polygon.prototype.isInside = function(objPoint) {
    var booInside, intCurrentDiffX, intDiffBACAY, intDiffCABAY, intLastDiffX, intQtdPoints, objAPoint, objBPoint, objCurrentPoint, objLastPoint, _i, _len, _ref;
    intQtdPoints = this.arrPoints.length;
    if (intQtdPoints < 3) {
      return false;
    }
    booInside = false;
    objLastPoint = this.arrPoints[intQtdPoints - 1];
    _ref = this.arrPoints;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objCurrentPoint = _ref[_i];
      if (objCurrentPoint.x > objLastPoint.x) {
        objAPoint = objLastPoint;
        objBPoint = objCurrentPoint;
      } else {
        objBPoint = objLastPoint;
        objAPoint = objCurrentPoint;
      }
      intCurrentDiffX = objCurrentPoint.x < objPoint.x;
      intLastDiffX = objPoint.x <= objLastPoint.x;
      intDiffCABAY = (objPoint.y - objAPoint.y) * (objBPoint.x - objAPoint.x);
      intDiffBACAY = (objBPoint.y - objAPoint.y) * (objPoint.x - objAPoint.x);
      if ((intCurrentDiffX === intLastDiffX) && intDiffCABAY < intDiffBACAY) {
        booInside = !booInside;
      }
      objLastPoint = objCurrentPoint;
    }
    return booInside;
  };
  Polygon.prototype.rotatePoint = function(Point) {
    var intNewPositionX, intNewPositionY;
    intNewPositionX = Math.cos(this.dblRotate) * Point.x - Math.sin(-this.dblRotate) * Point.y;
    intNewPositionY = -(Math.cos(this.dblRotate) * Point.y - Math.sin(this.dblRotate) * Point.x);
    return {
      x: intNewPositionX,
      y: intNewPositionY
    };
  };
  return Polygon;
})();