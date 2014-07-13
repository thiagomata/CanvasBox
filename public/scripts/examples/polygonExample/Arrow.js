var Arrow,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBoxPolygon();

Arrow = (function(_super) {
  __extends(Arrow, _super);

  function Arrow() {
    return Arrow.__super__.constructor.apply(this, arguments);
  }

  Arrow.prototype.x = 0;

  Arrow.prototype.y = 0;

  Arrow.prototype.debug = true;

  Arrow.prototype.side = 200;

  Arrow.prototype.colorRegular = "rgb(150,150,250)";

  Arrow.prototype.colorDrag = "rgb(100,100,250)";

  Arrow.prototype.colorOver = "rgb(50,200,50)";

  Arrow.prototype.color = null;

  Arrow.prototype.borderColorRegular = "rgb(100,100,100)";

  Arrow.prototype.borderColor = null;

  Arrow.prototype.borderColorOver = "rgb( 250 , 250, 250 )";

  Arrow.prototype.borderWidth = 2;

  Arrow.prototype.strClassName = "Square";

  Arrow.prototype.dblRotate = 0;

  Arrow.prototype.dblRotateSpeed = 0.001;

  Arrow.prototype.init = function() {
    Arrow.__super__.init.call(this);
    this.color = this.colorRegular;
    this.borderColor = this.borderColorRegular;
    return this.createPolygon();
  };

  Arrow.prototype.createPolygon = function() {
    this.arrPoints = new Array();
    this.addPoint(New.CanvasBoxPointer({
      x: -(this.side / 2),
      y: +(this.side / 2)
    }));
    this.addPoint(New.CanvasBoxPointer({
      x: -(this.side / 3),
      y: +(this.side / 2)
    }));
    this.addPoint(New.CanvasBoxPointer({
      x: -(this.side / 10),
      y: 0
    }));
    this.addPoint(New.CanvasBoxPointer({
      x: +(this.side / 10),
      y: 0
    }));
    this.addPoint(New.CanvasBoxPointer({
      x: this.side / 3,
      y: +(this.side / 2)
    }));
    this.addPoint(New.CanvasBoxPointer({
      x: this.side / 2,
      y: +(this.side / 2)
    }));
    return this.addPoint(New.CanvasBoxPointer({
      x: 0,
      y: -(this.side / 2)
    }));
  };

  Arrow.prototype.toSerialize = function() {
    var objResult;
    objResult = Arrow.__super__.toSerialize.call(this);
    objResult.color = this.color;
    objResult.borderColor = this.borderColor;
    objResult.side = this.side;
    return objResult;
  };

  Arrow.prototype.onMouseOver = function(event) {
    this.borderColor = this.borderColorOver;
    this.color = this.colorOver;
    return Arrow.__super__.onMouseOver.call(this, event);
  };

  Arrow.prototype.onMouseOut = function(event) {
    this.borderColor = this.borderColorRegular;
    return Arrow.__super__.onMouseOut.call(this, event);
  };

  Arrow.prototype.onDrag = function(event) {
    this.color = this.colorDrag;
    return Arrow.__super__.onDrag.call(this, event);
  };

  Arrow.prototype.onDrop = function(event) {
    this.color = this.colorRegular;
    return Arrow.__super__.onDrop.call(this, event);
  };

  Arrow.prototype.onClick = function(event) {
    this.dblRotateSpeed *= -1;
    if (this.arrPoints.length < 100) {
      this.smooth();
    } else {
      this.createPolygon();
    }
    this.onMouseOver(event);
    return Arrow.__super__.onClick.call(this, event);
  };

  Arrow.prototype.onDblClick = function(event) {
    this.createPolygon();
    return Arrow.__super__.onDblClick.call(this, event);
  };

  Arrow.prototype.onTimer = function() {
    this.dblRotate += this.dblRotateSpeed;
    this.dblRotate %= 2 * Math.PI;
    this.objBox.change();
    this.objBox.onMouseMove();
    return Arrow.__super__.onTimer.call(this, event);
  };

  return Arrow;

})(CanvasBoxPolygon);

//# sourceMappingURL=maps/Arrow.js.map