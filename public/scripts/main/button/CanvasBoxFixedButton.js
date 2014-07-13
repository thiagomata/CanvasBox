var CanvasBoxFixedButton;

CanvasBoxFixedButton = (function() {
  function CanvasBoxFixedButton() {}

  CanvasBoxFixedButton.prototype.strTitle = "Default Button";

  CanvasBoxFixedButton.prototype.intPaddingTop = 0;

  CanvasBoxFixedButton.prototype.intPaddingLeft = 0;

  CanvasBoxFixedButton.prototype.intRelativeX = 0;

  CanvasBoxFixedButton.prototype.intRelativeY = 0;

  CanvasBoxFixedButton.prototype.x = 0;

  CanvasBoxFixedButton.prototype.y = 0;

  CanvasBoxFixedButton.prototype.arrPositionsHorizontal = Array("left", "center", "right");

  CanvasBoxFixedButton.prototype.strPositionHorizontal = "right";

  CanvasBoxFixedButton.prototype.arrPositionsVertical = Array("top", "middle", "bottom");

  CanvasBoxFixedButton.prototype.strPositionVertical = "top";

  CanvasBoxFixedButton.prototype.width = 55;

  CanvasBoxFixedButton.prototype.height = 55;

  CanvasBoxFixedButton.prototype.borderWidth = 20;

  CanvasBoxFixedButton.prototype.borderHeight = 20;

  CanvasBoxFixedButton.prototype.objPreviousButton = null;

  CanvasBoxFixedButton.prototype.objElement = null;

  CanvasBoxFixedButton.prototype.booMouseOver = false;

  CanvasBoxFixedButton.prototype.initialize = function(objElement) {
    this.objElement = objElement;
    this.x = 0;
    this.y = 0;
    this.booMouseOver = false;
    this.strPositionVertical = "top";
    this.strPositionHorizontal = "right";
    return this.objPreviousButton = null;
  };

  CanvasBoxFixedButton.prototype.refresh = function() {
    if (this.objPreviousButton === null) {
      switch (this.strPositionHorizontal) {
        case "left":
          this.intRelativeX = 0;
          break;
        case "center":
          this.intRelativeX = this.objElement.width / 2;
          break;
        case "right":
          this.intRelativeX = this.objElement.width - this.width - this.borderWidth * 2;
          break;
        default:
          throw Error("invalid horizontal position " + this.strPositionHorizontal);
      }
      switch (this.strPositionVertical) {
        case "top":
          this.intRelativeY = 0;
          break;
        case "middle":
          this.intRelativeY = this.objElement.height / 2;
          break;
        case "bottom":
          this.intRelativeY = this.objElement.height - this.borderHeight;
          break;
        default:
          throw Error("invalid vertical position " + this.strPositionVertical);
      }
    } else {
      switch (this.strPositionHorizontal) {
        case "left":
          if (this.strPositionVertical === "middle") {
            this.intRelativeX = this.objPreviousButton.intRelativeX;
          } else {
            this.intRelativeX = this.objPreviousButton.intRelativeX + this.objPreviousButton.width + this.objPreviousButton.borderWidth;
          }
          break;
        case "center":
          this.intRelativeX = this.objElement.width / 2;
          break;
        case "right":
          if (this.strPositionVertical === "middle") {
            this.intRelativeX = this.objPreviousButton.intRelativeX;
          } else {
            this.intRelativeX = this.objPreviousButton.intRelativeX - this.width - this.borderWidth;
          }
          break;
        default:
          throw Error("invalid horizontal position " + this.strPositionHorizontal);
      }
      switch (this.strPositionVertical) {
        case "top":
          if (this.strPositionHorizontal === "center") {
            this.intRelativeY = this.objPreviousButton.intRelativeY - this.height - this.borderHeight;
          } else {
            this.intRelativeY = -this.height - this.borderHeight;
          }
          break;
        case "middle":
          this.intRelativeY = this.objPreviousButton.intRelativeY + this.height + this.borderHeight;
          break;
        case "bottom":
          if (this.strPositionHorizontal === "center") {
            this.intRelativeY = this.objPreviousButton.intRelativeY + this.objPreviousButton.height + this.objPreviousButton.borderHeight;
          } else {
            this.intRelativeY = this.objElement.height + this.borderHeight;
          }
          break;
        default:
          throw Error("invalid vertical position " + this.strPositionVertical);
      }
    }
    this.x = this.intRelativeX + this.intPaddingLeft;
    return this.y = this.intRelativeY + this.intPaddingTop;
  };

  CanvasBoxFixedButton.prototype.drawOut = function() {
    this.objElement.getContext().save();
    this.objElement.getContext().fillStyle = "rgb( 250 , 250 , 250 )";
    this.objElement.getContext().globalAlpha = 0.1;
    this.objElement.getContext().fillRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));
    this.objElement.getContext().strokeStyle = "rgb( 100 , 100 , 100 )";
    this.objElement.getContext().lineWidth = 1.;
    this.objElement.getContext().strokeRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));
    return this.objElement.getContext().restore();
  };

  CanvasBoxFixedButton.prototype.drawOver = function() {
    this.objElement.getContext().save();
    this.objElement.getContext().globalAlpha = 1.;
    this.objElement.getContext().fillStyle = 'rgb( 230 , 230 , 250 )';
    this.objElement.getContext().fillRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));
    this.objElement.getContext().strokeStyle = "blue";
    this.objElement.getContext().lineWidth = 1.;
    this.objElement.getContext().strokeRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));
    return this.objElement.getContext().restore();
  };

  CanvasBoxFixedButton.prototype.drawIcon = function() {
    var _ref;
    this.objElement.getContext().beginPath();
    this.objElement.getContext().save();
    this.objElement.getContext().strokeStyle = "rgb( 20, 20, 20)";
    this.objElement.getContext().fillStyle = (_ref = this.booMouseOver) != null ? _ref : {
      "rgb( 250, 250, 250)": "rgb( 220, 220, 220)"
    };
    this.objElement.getContext().moveTo(this.x, this.y + this.height);
    this.objElement.getContext().lineTo(this.x + 6, this.y + this.height - 2);
    this.objElement.getContext().lineTo(this.x + 8, this.y + this.height - 8);
    this.objElement.getContext().lineTo(this.x + 16, this.y + this.height - 16);
    this.objElement.getContext().lineTo(this.x + 30, this.y + this.height - 16);
    this.objElement.getContext().lineTo(this.x + 30, this.y + this.height - 30);
    this.objElement.getContext().lineTo(this.x + 16, this.y + this.height - 30);
    this.objElement.getContext().lineTo(this.x + 16, this.y + this.height - 16);
    this.objElement.getContext().lineTo(this.x + 8, this.y + this.height - 8);
    this.objElement.getContext().lineTo(this.x + 2, this.y + this.height - 6);
    this.objElement.getContext().lineTo(this.x, this.y + this.height);
    this.objElement.getContext().stroke();
    this.objElement.getContext().fill();
    this.objElement.getContext().restore();
    return this.objElement.getContext().closePath();
  };

  CanvasBoxFixedButton.prototype.drawTitle = function() {
    this.objElement.getContext().save();
    this.objElement.getContext().shadowOffsetX = 2.;
    this.objElement.getContext().shadowOffsetY = 2.;
    this.objElement.getContext().shadowBlur = 2.;
    this.objElement.getContext().shadowColor = "rgba(250, 250, 250, 0.8)";
    this.objElement.getContext().font = "20px Times New Roman";
    this.objElement.getContext().fillStyle = "rgb( 100 , 100, 100 )";
    this.objElement.getContext().textAlign = "left";
    this.objElement.getContext().fillText(this.strTitle, this.x + this.width + this.borderWidth, this.y + this.height / 2 + this.borderHeight / 2);
    return this.objElement.getContext().restore();
  };

  CanvasBoxFixedButton.prototype.drawButton = function() {
    var e;
    if (this.booMouseOver) {
      this.drawOver();
    } else {
      this.drawOut();
    }
    try {
      return this.drawIcon(this.booMouseOver, this.x, this.y);
    } catch (_error) {
      e = _error;
      return this.objElement.getContext().strokeText(this.strClassName, this.x, this.y);
    }
  };

  CanvasBoxFixedButton.prototype.draw = function() {
    this.refresh();
    if (this.objElement.booMouseOver) {
      this.drawButton();
      if (this.booMouseOver) {
        return this.drawTitle();
      }
    }
  };

  CanvasBoxFixedButton.prototype.onClick = function(event) {
    return CanvasBoxClass.prototype.createRelation(this.objElement, true, "CanvasBoxAggregation");
  };

  CanvasBoxFixedButton.prototype.onDrag = function(event) {
    var objElement;
    objElement = this.onClick(event);
    objElement.intMass = 0;
    objElement.select();
    return objElement;
  };

  CanvasBoxFixedButton.prototype.isInside = function(mouseX, mouseY) {
    this.refresh();
    if ((mouseX >= this.x - this.borderWidth / 2) && (mouseX <= this.x + this.width + this.borderWidth / 2) && (mouseY >= this.y - this.borderHeight / 2) && (mouseY <= this.y + this.height + this.borderHeight / 2)) {
      this.booMouseOver = true;
      return true;
    }
    this.booMouseOver = false;
    return false;
  };

  return CanvasBoxFixedButton;

})();

//# sourceMappingURL=maps/CanvasBoxFixedButton.js.map