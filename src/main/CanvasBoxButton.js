/*
# Canvas Box Button
# 
# Interactive Elements to make possible to create new interactions without the use of the menu
# 
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
*/
var CanvasBoxButton;

CanvasBoxButton = (function() {

  function CanvasBoxButton() {}

  /*
      # Title of the Button
  */

  CanvasBoxButton.prototype.strTitle = "Default Button";

  /*
      # Padding Top of The Button
  */

  CanvasBoxButton.prototype.intPaddingTop = 0;

  /*
      # Padding Left of The Button
  */

  CanvasBoxButton.prototype.intPaddingLeft = 0;

  /*
      # X Position of the Button relative to the element what it's belong to
  */

  CanvasBoxButton.prototype.intRelativeX = 0;

  /*
      # Y Position of the Button relative to the element what it's belong to
  */

  CanvasBoxButton.prototype.intRelativeY = 0;

  /*
      # X Absolute Position
  */

  CanvasBoxButton.prototype.x = 0;

  /*
      # Y Absolute Position
  */

  CanvasBoxButton.prototype.y = 0;

  /*
      # Possibles Horizontal Positions
  */

  CanvasBoxButton.prototype.arrPositionsHorizontal = ["left", "center", "right"];

  /*
      # Button Horizontal Position
  */

  CanvasBoxButton.prototype.strPositionHorizontal = "right";

  /*
      # Possibles Vertical Positions
  */

  CanvasBoxButton.prototype.arrPositionsVertical = ["top", "middle", "bottom"];

  /*
      # Button Vertical Position
  */

  CanvasBoxButton.prototype.strPositionVertical = "top";

  /*
      # Button Width
  */

  CanvasBoxButton.prototype.width = 25;

  /*
      # Button Height
  */

  CanvasBoxButton.prototype.height = 25;

  /*
      # Distance between the button and the element
  */

  CanvasBoxButton.prototype.borderWidth = 10;

  /*
      # Distance between the button and the element
  */

  CanvasBoxButton.prototype.borderHeight = 3;

  /*
      # @var CanvasBoxButton
  */

  CanvasBoxButton.prototype.objPreviousButton = null;

  /*
      # @var CanvasBoxElement
  */

  CanvasBoxButton.prototype.objElement = null;

  /*
      # Flag to control if the mouse is over the element
  */

  CanvasBoxButton.prototype.booMouseOver = false;

  /*
      # Constructor of the Canvas Box Button
      # 
      # @param objElement CanvasBoxElement
      # @return void
  */

  CanvasBoxButton.prototype.initialize = function(objElement) {
    return this.objElement = objElement;
  };

  CanvasBoxButton.prototype.refresh = function() {
    if (this.objPreviousButton === null) {
      switch (this.strPositionHorizontal) {
        case "left":
          this.intRelativeX = -this.width(-this.borderWidth);
          break;
        case "center":
          this.intRelativeX = this.objElement.width / 2;
          break;
        case "right":
          this.intRelativeX = this.objElement.width + this.borderWidth;
          break;
        default:
          throw Error("invalid horizontal position " + this.strPositionHorizontal);
      }
      switch (this.strPositionVertical) {
        case "top":
          this.intRelativeY = -this.height(-this.borderHeight);
          break;
        case "middle":
          this.intRelativeY = this.objElement.height / 2;
          break;
        case "bottom":
          this.intRelativeY = this.objElement.height + this.borderHeight;
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
    this.x = this.objElement.x - this.objElement.width / 2 + this.intRelativeX + this.intPaddingLeft;
    return this.y = this.objElement.y - this.objElement.height / 2 + this.intRelativeY + this.intPaddingTop;
  };

  CanvasBoxButton.prototype.drawOut = function() {
    this.objElement.objBox.setFillStyle("rgb( 250 , 250 , 250 )");
    this.objElement.objBox.fillRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));
    this.objElement.objBox.setStrokeStyle("rgb( 100 , 100 , 100 )");
    this.objElement.objBox.setLineWidth(1);
    return this.objElement.objBox.strokeRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));
  };

  CanvasBoxButton.prototype.drawOver = function() {
    this.objElement.objBox.setFillStyle('rgb( 230 , 230 , 250 )');
    this.objElement.objBox.fillRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));
    this.objElement.objBox.setStrokeStyle("blue");
    this.objElement.objBox.setLineWidth(1);
    return this.objElement.objBox.strokeRect(Math.round(this.x), Math.round(this.y), Math.round(this.width), Math.round(this.height));
  };

  CanvasBoxButton.prototype.drawIcon = function() {
    var _ref;
    this.objElement.objBox.beginPath();
    this.objElement.objBox.saveContext();
    this.objElement.objBox.setStrokeStyle("rgb( 20, 20, 20)");
    this.objElement.objBox.setFfillStyle((_ref = this.booMouseOver) != null ? _ref : {
      "rgb( 250, 250, 250)": "rgb( 220, 220, 220)"
    });
    this.objElement.objBox.moveTo(this.x, this.y + this.height);
    this.objElement.objBox.lineTo(this.x + 6, this.y + this.height - 2);
    this.objElement.objBox.lineTo(this.x + 8, this.y + this.height - 8);
    this.objElement.objBox.lineTo(this.x + 16, this.y + this.height - 16);
    this.objElement.objBox.lineTo(this.x + 30, this.y + this.height - 16);
    this.objElement.objBox.lineTo(this.x + 30, this.y + this.height - 30);
    this.objElement.objBox.lineTo(this.x + 16, this.y + this.height - 30);
    this.objElement.objBox.lineTo(this.x + 16, this.y + this.height - 16);
    this.objElement.objBox.lineTo(this.x + 8, this.y + this.height - 8);
    this.objElement.objBox.lineTo(this.x + 2, this.y + this.height - 6);
    this.objElement.objBox.lineTo(this.x, this.y + this.height);
    this.objElement.objBox.stroke();
    this.objElement.objBox.fill();
    this.objElement.objBox.restoreContext();
    return this.objElement.objBox.closePath();
  };

  CanvasBoxButton.prototype.drawTitle = function() {
    this.objElement.objBox.saveContext();
    this.objElement.objBox.setShadowOffsetX(2);
    this.objElement.objBox.setShadowOffsetY(2);
    this.objElement.objBox.setShadowBlur(2);
    this.objElement.objBox.setShadowColor("rgba(0, 0, 0, 0.5)");
    this.objElement.objBox.setFont("20px Times New Roman");
    this.objElement.objBox.setFillStyle("rgb( 100 , 100, 100 )");
    this.objElement.objBox.fillText(this.strTitle, this.x, this.y - 20);
    return this.objElement.objBox.restoreContext();
  };

  CanvasBoxButton.prototype.drawButton = function() {
    if (this.booMouseOver) {
      this.drawOver();
    } else {
      this.drawOut();
    }
    return this.drawIcon();
  };

  CanvasBoxButton.prototype.draw = function() {
    this.refresh();
    if (this.objElement.booMouseOver) {
      this.drawButton();
      if (this.booMouseOver) return this.drawTitle();
    }
  };

  CanvasBoxButton.prototype.onClick = function() {
    return CanvasBoxClass.Static.createRelation(this.objElement, true, "CanvasBoxAggregation");
  };

  CanvasBoxButton.prototype.onDrag = function() {
    var objElement;
    objElement = this.onClick(event);
    objElement.intMass = 0;
    objElement.select();
    return objElement;
  };

  CanvasBoxButton.prototype.isInside = function(mouseX, mouseY) {
    this.refresh();
    if ((mouseX >= this.x - this.borderWidth / 2) && (mouseX <= this.x + this.width + this.borderWidth / 2) && (mouseY >= this.y - this.borderHeight / 2) && (mouseY <= this.y + this.height + this.borderHeight / 2)) {
      this.booMouseOver = true;
      return true;
    }
    this.booMouseOver = false;
    return false;
  };

  return CanvasBoxButton;

})();
