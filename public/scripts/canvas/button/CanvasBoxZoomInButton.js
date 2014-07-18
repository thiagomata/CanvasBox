var CanvasBoxZoomInButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CanvasBoxZoomInButton = (function(_super) {
  __extends(CanvasBoxZoomInButton, _super);

  function CanvasBoxZoomInButton() {
    return CanvasBoxZoomInButton.__super__.constructor.apply(this, arguments);
  }

  CanvasBoxZoomInButton.prototype.strTitle = "Zoom In";

  CanvasBoxZoomInButton.prototype.width = 55;

  CanvasBoxZoomInButton.prototype.height = 55;

  CanvasBoxZoomInButton.prototype.objImg = null;

  CanvasBoxZoomInButton.prototype.getImg = function() {
    var objImg, strSrc;
    if (this.objImg === null) {
      objImg = new Image();
      strSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAA0CAY' + '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';
      objImg.src = strSrc;
      this.objImg = objImg;
    }
    return this.objImg;
  };

  CanvasBoxZoomInButton.prototype.drawIcon = function(booMouveOver, x, y) {
    var objImg;
    objImg = this.getImg();
    this.objElement.getContext().save();
    this.objElement.getContext().globalAlpha = booMouveOver != null ? booMouveOver : {
      1: 0.4
    };
    this.objElement.getContext().drawImage(objImg, x, y);
    this.objElement.getContext().globalCompositeOperation = "darker";
    return this.objElement.getContext().restore();
  };

  CanvasBoxZoomInButton.prototype.onClick = function(event) {
    this.objElement.dblZoom += 0.1;
    this.objElement.width = this.objElement.defaultWidth / this.objElement.dblZoom;
    return this.objElement.height = this.objElement.defaultHeight / this.objElement.dblZoom;
  };

  CanvasBoxZoomInButton.prototype.onDrag = function(event) {
    return this.onClick(event);
  };

  return CanvasBoxZoomInButton;

})(CanvasBoxFixedButton);

//# sourceMappingURL=maps/CanvasBoxZoomInButton.js.map