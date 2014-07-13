var CanvasBoxMenu;

CanvasBoxMenu = (function() {
  function CanvasBoxMenu() {}

  CanvasBoxMenu.prototype.strClassName = "CanvasBoxMenu";

  CanvasBoxMenu.prototype.menuBorderColor = "rgb( 100 , 100 , 200 )";

  CanvasBoxMenu.prototype.menuBorderWidth = 1;

  CanvasBoxMenu.prototype.menuFillColor = "rgba( 230, 230, 240 , 0.7 )";

  CanvasBoxMenu.prototype.menuItemBorderColor = "rgb( 100 , 100 , 200 )";

  CanvasBoxMenu.prototype.menuItemBorderWidth = 1;

  CanvasBoxMenu.prototype.menuItemFillColor = "rgba( 230, 230, 240 , 0.7 )";

  CanvasBoxMenu.prototype.menuItemTextColor = "blue";

  CanvasBoxMenu.prototype.menuSelectedItemFillColor = "rgba( 230, 230, 140 , 0.7 )";

  CanvasBoxMenu.prototype.intMenuX = 0;

  CanvasBoxMenu.prototype.intMenuY = 0;

  CanvasBoxMenu.prototype.intMenuItemXBorder = 3;

  CanvasBoxMenu.prototype.intMenuItemHeight = 20;

  CanvasBoxMenu.prototype.intMenuWidth = 110;

  CanvasBoxMenu.prototype.arrMenuItens = Array();

  CanvasBoxMenu.prototype.strCurrentMenuItem = null;

  CanvasBoxMenu.prototype.mouseX = 0;

  CanvasBoxMenu.prototype.mouseY = 0;

  CanvasBoxMenu.prototype.objBox = null;

  CanvasBoxMenu.prototype.objParent = null;

  CanvasBoxMenu.prototype.objOpenChildMenu = null;

  CanvasBoxMenu.prototype.draw = function() {
    var arrMenuKeys, i, intMenuItemX, intMenuItemY, strMenuKey, _i, _len, _ref;
    this.strCurrentMenuItem = null;
    arrMenuKeys = php.array_keys(this.arrMenuItens);
    this.intMenuHeight = this.intMenuItemHeight * (arrMenuKeys.length - 1);
    this.objBox.setStrokeStyle(this.menuBorderColor);
    this.objBox.setLineWidth(this.menuBorderWidth);
    this.objBox.strokeRect(this.intMenuX, this.intMenuY, this.intMenuWidth, this.intMenuHeight);
    this.objBox.setFillStyle(this.menuFillColor);
    this.objBox.fillRect(this.intMenuX, this.intMenuY, this.intMenuWidth, this.intMenuHeight);
    for (i = _i = 0, _len = arrMenuKeys.length; _i < _len; i = ++_i) {
      strMenuKey = arrMenuKeys[i];
      intMenuItemX = this.intMenuX;
      intMenuItemY = this.intMenuY + i * this.intMenuItemHeight;
      this.objBox.setStrokeStyle(this.menuItemBorderColor);
      this.objBox.setLineWidth(this.menuItemBorderWidth);
      this.objBox.strokeRect(intMenuItemX, intMenuItemY, this.intMenuWidth, this.intMenuItemHeight);
      if ((this.mouseX > intMenuItemX) && (this.mouseX < (intMenuItemX + this.intMenuWidth)) && (this.mouseY > intMenuItemY) && (this.mouseY < (intMenuItemY + this.intMenuItemHeight))) {
        this.objBox.setFillStyle(this.menuSelectedItemFillColor);
        this.strCurrentMenuItem = strMenuKey;
      } else {
        this.objBox.setFillStyle(this.menuItemFillColor);
      }
      this.objBox.fillRect(intMenuItemX, intMenuItemY, this.intMenuWidth, this.intMenuItemHeight);
      this.objBox.setFillStyle((_ref = this.arrMenuItens[strMenuKey].backgroundColor) != null ? _ref : this.menuItemTextColor);
      this.objBox.setLineWidth(0.9);
      this.objBox.setFont("10px Times New Roman");
      this.objBox.setTextAlign("left");
      this.objBox.fillText(this.arrMenuItens[strMenuKey].name, this.intMenuItemXBorder + intMenuItemX, Math.round(intMenuItemY + this.intMenuItemHeight / 2));
    }
    if ((this.objOpenChildMenu != null)) {
      this.objOpenChildMenu.mouseX = this.mouseX;
      this.objOpenChildMenu.mouseY = this.mouseY;
      return this.objOpenChildMenu.draw();
    }
  };

  CanvasBoxMenu.prototype.onClick = function(event) {
    var booReturn, funcEvent;
    booReturn = false;
    if ((this.strCurrentMenuItem != null)) {
      funcEvent = this.arrMenuItens[this.strCurrentMenuItem].event;
      if (!Object.isUndefined(funcEvent) && Object.isFunction(funcEvent)) {
        this.arrMenuItens[this.strCurrentMenuItem].key = this.strCurrentMenuItem;
        booReturn = funcEvent(this.objParent, this.arrMenuItens[this.strCurrentMenuItem], this);
      }
    }
    if (!booReturn && (this.objOpenChildMenu != null)) {
      this.objOpenChildMenu.mouseX = this.mouseX;
      this.objOpenChildMenu.mouseY = this.mouseY;
      booReturn = this.objOpenChildMenu.onClick(event);
    }
    if (!booReturn) {
      this.strCurrentMenuItem = null;
      this.objOpenChildMenu = null;
    }
    return booReturn;
  };

  CanvasBoxMenu.prototype.onDraw = function(event) {
    if (event == null) {
      event = null;
    }
    this.draw();
    return true;
  };

  CanvasBoxMenu.prototype.createChildMenu = function(objMenuItem, arrMenuItens) {
    var objChildMenu;
    objChildMenu = new autoload.newCanvasBoxMenu();
    objChildMenu.objBox = this.objBox;
    objChildMenu.intMenuWidth = this.intMenuWidth;
    objChildMenu.intMenuX = this.intMenuX + this.intMenuWidth + 1;
    objChildMenu.intMenuY = this.intMenuY + this.intMenuItemHeight * objMenuItem.key;
    objChildMenu.intMenuItemXBorder = this.intMenuItemXBorder;
    objChildMenu.arrMenuItens = arrMenuItens;
    objChildMenu.intMenuItemHeight = this.intMenuItemHeight;
    objChildMenu.objParent = this.objParent;
    this.objOpenChildMenu = objChildMenu;
    return true;
  };

  return CanvasBoxMenu;

})();

//# sourceMappingURL=maps/CanvasBoxMenu.js.map