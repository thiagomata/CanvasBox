var CanvasBox;
CanvasBox = (function() {
  function CanvasBox() {}
  /*
      # Zoom Distance
  	*/
  return CanvasBox;
})();
({
  dblZoom: 1,
  /*
  	# Counter of Stand By Frames
  	*/
  intCounterStandyBy: 0,
  /*
  	# Position x of the Canvas Box Element relative to the page
  	# @type integer
  	*/
  x: 0,
  /*
  	# Position y of the Canvas Box Element relative to the page
  	# @type integer
  	*/
  y: 0,
  /*
  	# Id of the Box, to deal with many canvas box into the same page
  	# @type integer
  	*/
  id: null,
  /*
  	# boxWidth of the Sand Box
  	# @type integer
  	*/
  boxWidth: 400,
  /*
  	# Height of the Sand Box
  	# @type integer
  	*/
  boxHeight: 400,
  /*
  	# Width of the Sand Box
  	# @type integer
  	*/
  defaultWidth: 400,
  /*
  	# Height of the Sand Box
  	# @type integer
  	*/
  defaultHeight: 400,
  /*
  	# Html Canvas Box Element
  	# @type Canvas
  	*/
  objCanvasHtml: null,
  /*
  	# Collection of Elements inside the Box
  	# @type CanvasBoxElement[]
  	*/
  arrElements: Array(),
  /*
  	# Collection of CanvasButtons of the Box
  	# 
  	# @type CanvasBoxButton[]
  	*/
  arrButtons: Array(),
  /*
  	# CanvasBoxElement Over
  	# @type CanvasBoxElement
  	*/
  objElementOver: null,
  /*
  	# CanvasBoxElement Clicked
  	# @type CanvasBoxElement
  	*/
  objElementClicked: null,
  /*
  	# Interval of Image Refreshing
  	# @type integer
  	*/
  intIntervalDraw: 0,
  /*
  	# Interval of Objects Timers
  	# @type integer
  	*/
  intIntervalTimer: 1,
  /*
  	# Control if the refreshing is active or not
  	# @type boolean
  	*/
  booActive: false,
  /*
  	# Mouse X position relative to canvas box
  	# @integer
  	*/
  mouseX: 0,
  /*
  	# Mouse Y position relative to canvas box
  	# @integer
  	*/
  mouseY: 0,
  /*
  	# Flag of control if the canvas box is drawing right now
  	# @type boolean
  	*/
  booOnDraw: false,
  /*
  	# Flag of control if the canvas box is moving right now
  	*/
  booOnTimer: false,
  /*
  	# Flag of the on change event
  	*/
  booChanged: true,
  /*
  	# Flag of the mouse over event
  	*/
  booMouseOver: true,
  /*
  	# Flag of Draw event 
  	*/
  booDrawBoxMenu: true,
  /*
  	# Javascript constant of right button click
  	*/
  intRightButtonClick: 2,
  /*
  	# Class Name of the Canvas Box
  	# @type string
  	*/
  strClassName: "CanvasBox",
  /*
  	# Frames per Second Counter
  	# @type integer
  	*/
  intFps: 0,
  /*
  	# Frames per Second Last Result
  	# @type integer
  	*/
  intLastFps: 0,
  /*
  	# Flag that controls if the FPS counter is active
  	*/
  booCountFps: false,
  /*
  	# Background Color of the Canvas Box
  	*/
  backgroundColor: "white",
  /*
  	# Flag that controls if the menu is showing
  	*/
  booShowMenu: false,
  /*
  	# Native Menu element of the Canvas Box
  	*/
  objMenu: null,
  /*
  	# Actual Menu Element of the Canvas
  	*/
  objMenuSelected: null,
  /*
  	# Get the client width fixing browsers missing standarts
  	# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
  	*/
  clientWidth: function() {
    var _ref, _ref2, _ref3;
    return CanvasBox.prototype.filterResults((_ref = window.innerWidth) != null ? _ref : window.innerWidth = 0, (_ref2 = document.documentElement) != null ? _ref2 : document.documentElement = 0, (_ref3 = document.body) != null ? _ref3 : document.body = 0);
  },
  toSerialize: function() {
    var objResult;
    objResult = new Object();
    objResult.x = this.x;
    objResult.y = this.y;
    objResult.boxWidth = this.boxWidth;
    objResult.height = this.boxHeight;
    objResult.objCanvasHtml = this.objCanvasHtml;
    objResult.intIntervalDraw = this.intIntervalDraw;
    objResult.booActive = this.booActive;
    objResult.booOnDraw = this.booOnDraw;
    objResult.arrElements = this.arrElements;
    return objResult;
  },
  /*
  	# Method that defined the Native Menu of the Canvas Box.
  	# 
  	# This menu will be see when the user right click into some
  	# empty area of the canvas box 
  	# 
  	# @return CanvasBox
  	*/
  defineMenu: function() {
    this.objMenu = new autoload.newCanvasBoxMenu();
    this.objMenu.objParent = this;
    this.objMenu.objBox = this;
    this.objMenu.arrMenuItens = {
      0: {
        name: "create class",
        event: function(objParent) {
          var objClass;
          objClass = new autoload.newCanvasBoxClass();
          objClass.objBehavior = new autoload.newCanvasBoxMagneticBehavior(objClass);
          objClass.x = objParent.mouseX;
          objClass.y = objParent.mouseY;
          return objParent.addElement(objClass);
        }
      },
      1: {
        name: "create square",
        event: function(objParent) {
          var objSquare;
          objSquare = new autoload.newCanvasBoxSquare();
          objSquare.objBehavior = new autoload.newCanvasBoxMagneticBehavior(objSquare);
          objSquare.x = objParent.mouseX;
          objSquare.y = objParent.mouseY;
          return objParent.addElement(objSquare);
        }
      }
    };
    this.objMenuSelected = null;
    return this;
  },
  /*
  	# Calculates the absolute position of the canvas box object based
  	# on the position of the parents objects
  	# 
  	# @return CanvasBox
  	*/
  getPosition: function() {
    var objElement, x, y;
    x = this.objCanvasHtml.offsetLeft;
    y = this.objCanvasHtml.offsetTop;
    objElement = this.objCanvasHtml;
    while (objElement.offsetParent) {
      if (objElement === document.getElementsByTagName('body')[0]) {
        break;
      } else {
        x = x + objElement.offsetParent.offsetLeft;
        y = y + objElement.offsetParent.offsetTop;
        objElement = objElement.offsetParent;
      }
    }
    this.x = x;
    this.y = y;
    return this;
  },
  /*
  	# Initialize the Canvas Box
  	#
  	# - Validate the canvas html element
  	# - set the width and the height into the canvas html element
  	#
  	# @param idCanvasHtmlElement string
  	# @throws CanvasBoxException
  	# 
  	# @return CanvasBox
  	*/
  initialize: function(idCanvasHtmlElement, intWidth, intHeight) {
    var objButton;
    this.defaultWidth = intWidth / this.dblZoom;
    this.defaultHeight = intHeight / this.dblZoom;
    this.boxWidth = this.defaultWidth / this.dblZoom;
    this.boxHeight = this.defaultHeight / this.dblZoom;
    this.id = CanvasBox.prototype.arrInstances.length;
    CanvasBox.prototype.arrInstances[this.id] = this;
    this.objCanvasHtml = document.getElementById(idCanvasHtmlElement);
    if (this.objCanvasHtml === null) {
      throw new autoload.newCanvasBoxException("Invalid canvas html element id [" + idCanvasHtmlElement + "]");
    }
    this.getPosition();
    this.objCanvasHtml.setAttribute("width", this.defaultWidth + "px");
    this.objCanvasHtml.setAttribute("height", this.defaultHeight + "px");
    this.objCanvasHtml.setAttribute("onmousemove", 'return CanvasBox::getCanvasBoxById(' + this.id + ').onMouseMove( event )');
    this.objCanvasHtml.setAttribute("onclick", 'return CanvasBox::getCanvasBoxById(' + this.id + ').onClick( event )');
    this.objCanvasHtml.setAttribute("ondblclick", 'return CanvasBox::getCanvasBoxById(' + this.id + ').onDblClick( event )');
    this.objCanvasHtml.setAttribute("onmouseup", 'return CanvasBox::getCanvasBoxById(' + this.id + ').onMouseUp( event )');
    this.objCanvasHtml.setAttribute("onmousedown", 'return CanvasBox::getCanvasBoxById(' + this.id + ').onMouseDown( event )');
    this.objCanvasHtml.setAttribute("oncontextmenu", 'return CanvasBox::getCanvasBoxById(' + this.id + ').onContextMenu( event )');
    this.objCanvasHtml.setAttribute("onKeyup", 'return CanvasBox::getCanvasBoxById(' + this.id + ').onKeyUp( event )');
    this.objCanvasHtml.setAttribute("onMouseOut", 'return CanvasBox::getCanvasBoxById(' + this.id + ').onMouseOut( event )');
    this.objCanvasHtml.setAttribute("onMouseOver", 'return CanvasBox::getCanvasBoxById(' + this.id + ').onMouseOver( event )');
    this.objCanvasHtml.setAttribute("contentEditable", "true");
    this.objCanvasHtml.contentEditable = true;
    this.defineMenu();
    this.play();
    this.objBox = this;
    objButton = new autoload.newCanvasBoxZoomInButton(this);
    this.addButton(objButton);
    objButton = new autoload.newCanvasBoxZoomOutButton(this);
    this.addButton(objButton);
    objButton = new autoload.newCanvasBoxExportButton(this);
    this.addButton(objButton);
    objButton = new autoload.newCanvasBoxSaveButton(this);
    this.addButton(objButton);
    return this;
  },
  /*
  	# Add a CanvasBoxElement intot he CanvasBox
  	#
  	# @param objElement CanvasBoxElement
  	*/
  addElement: function(objElement) {
    this.arrElements.push(objElement);
    objElement.objBox = this;
    objElement.objContext = this.getContext();
    return objElement.load();
  },
  /*
  	# Get the Context of the Canvas Html Element
  	# @return CanvasRenderingContext2D
  	*/
  getContext: function() {
    var objContext;
    objContext = this.objCanvasHtml.getContext('2d');
    return objContext;
  },
  /*
  	# Clear the image into the Canvas Html Element Context
  	*/
  clear: function() {
    var objContext;
    objContext = this.getContext();
    return objContext.clearRect(0, 0, Math.max(this.boxWidth, this.defaultWidth), Math.max(this.boxHeight, this.defaultHeight));
  },
  /*
  	# Draw all the elements into the CanvasBox
  	*/
  draw: function() {
    var arrLayer, arrZIndex, arrZIndexElements, i, objButton, objElement, _i, _j, _k, _len, _len2, _len3, _ref, _ref2;
    if (!this.booChanged) {
      this.intCounterStandyBy++;
      return;
    }
    this.intCounterStandyBy = 0;
    this.booOnDraw = true;
    this.clear();
    arrZIndexElements = Array();
    arrZIndex = Array();
    /*
    		# Create one array to each layer into the z dimension
    		*/
    _ref = this.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      if (!(arrZIndexElements[objElement.z] != null)) {
        arrZIndexElements[objElement.z] = Array();
        arrZIndex.push(objElement.z);
      }
      arrZIndexElements[objElement.z].push(objElement);
    }
    /*
    		# Order layers by the z dimension
    		*/
    arrZIndex = sort(arrZIndex);
    /*
    		# Draw Elements each z dimension layer of time
    		*/
    for (_j = 0, _len2 = arrZIndex.length; _j < _len2; _j++) {
      arrLayer = arrZIndex[_j];
      for (_k = 0, _len3 = arrLayer.length; _k < _len3; _k++) {
        objElement = arrLayer[_k];
        if (is_object(objElement)) {
          objElement.draw();
        }
      }
    }
    objElement = null;
    arrZIndexElements = null;
    if (this.booShowMenu) {
      this.objMenuSelected.mouseX = this.mouseX;
      this.objMenuSelected.mouseY = this.mouseY;
      this.objMenuSelected.draw();
    }
    if (this.booDrawBoxMenu) {
      for (i = 0, _ref2 = this.arrButtons.length; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
        objButton = this.arrButtons[i];
        objButton.refresh();
        objButton.draw();
      }
    }
    this.booOnDraw = false;
    return this.booChanged = false;
  },
  /*
  	# Draw all the elements into the CanvasBox
  	*/
  onTimerElements: function() {
    var objElement, _i, _len, _ref;
    this.booOnTimer = true;
    _ref = this.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      objElement.onTimer();
    }
    return this.booOnTimer = false;
  },
  /*
  	# Active the auto refresh timer
  	*/
  play: function() {
    this.intCounterStandyBy = 0;
    if (this.booActive) {
      return;
    }
    this.booActive = true;
    setTimeout('CanvasBox::arrInstances[ ' + this.id + '].onTimer()', this.intIntervalTimer);
    setTimeout('CanvasBox::arrInstances[ ' + this.id + '].onDraw()', this.intIntervalDraw);
    return setTimeout('CanvasBox::arrInstances[ ' + this.id + '].onCountFps()', 1000);
  },
  /*
  	# Stop the auto refresh timer
  	*/
  stop: function() {
    return this.booActive = false;
  },
  /*
  	# Refresh the Canvas Box
  	#
  	# - Draw the elements
  	# - Call the next timer if should
  	# @return boolean
  	*/
  onTimer: function() {
    if (this.booActive === false) {
      return false;
    }
    if (this.intCounterStandyBy < 10) {
      setTimeout("CanvasBox::arrInstances[ #( this.id ) ].onTimer()", this.intIntervalTimer);
    } else {
      if (this.booMouseOver) {
        setTimeout("CanvasBox::arrInstances[ #( this.id ) ].onTimer()", this.intIntervalTimer * 2);
      } else {
        this.intCounterStandyBy = 0;
        this.stop();
      }
    }
    if (this.intCounterStandyBy > 10) {
      this.intCounterStandyBy = 10;
    }
    if (!this.booOnTimer) {
      this.onTimerElements();
    }
    return true;
  },
  /*
  	# On show counter FPS
  	*/
  onCountFps: function() {
    this.intLastFps = this.intFps;
    this.intFps = 0;
    if (!this.booCountFps) {
      return false;
    }
    document.title = "FPS: " + this.intLastFps;
    setTimeout("CanvasBox::arrInstances[ #( this.id ) ].onCountFps()", 1000);
    return true;
  },
  /*
  	# Refresh the Canvas Box
  	#
  	# - Draw the elements
  	# - Call the next timer if should
  	*/
  onDraw: function() {
    if (this.booActive === false) {
      return false;
    }
    setTimeout("CanvasBox::arrInstances[ #( this.id ) ].onDraw()", this.intIntervalDraw);
    if (!this.booOnDraw) {
      this.draw();
      this.intFps++;
    }
    return true;
  },
  /*
  	# Refresh Mouse Position based on Event
  	#
  	# @param event Event
  	*/
  refreshMousePosition: function(event) {
    return this.mouseX = (event.clientX - this.x + CanvasBox.prototype.scrollLeft()) / this.dblZoom;
  }
});
this.mouseY = (event.clientY - this.y + CanvasBox.prototype.scrollTop()) / this.dblZoom;
({
  /*
  	# On Move Move over the Canvas Box
  	# Search if the Mouse is Over some Canvas Element
  	# @param event event
  	*/
  onMouseMove: function(event) {
    var objButton, objElement, objElementOver, _i, _j, _len, _len2, _ref, _ref2, _results;
    objElementOver = null;
    this.refreshMousePosition(event);
    _ref = this.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      if (objElement.isInside(this.mouseX, this.mouseY)) {
        this.change();
        objElementOver = objElement;
        break;
      }
    }
    if (this.objElementOver !== objElementOver) {
      this.change();
      if (this.objElementOver !== null) {
        this.objElementOver.onMouseOut(event);
      }
      if (objElementOver !== null) {
        this.objCanvasHtml.style.cursor = "pointer";
        objElementOver.onMouseOver(event);
      } else {
        this.objCanvasHtml.style.cursor = "default";
      }
      this.objElementOver = objElementOver;
    }
    if (this.objElementSelected !== null) {
      this.change();
      this.objElementSelected.onDrag(event);
    }
    _ref2 = this.arrButtons;
    _results = [];
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      objButton = _ref2[_j];
      objButton.refresh();
      _results.push(objButton.booMouseOver !== objButton.isInside(this.mouseX * this.dblZoom, this.mouseY * this.dblZoom) ? this.change() : void 0);
    }
    return _results;
  },
  /*
  	# On Mouse Up Canvas Box Event
  	# 
  	# @see onMouseDown
  	# @see CanvasBoxElement::onDrop()
  	# @param Event event
  	*/
  onMouseUp: function(event) {
    this.booMouseOver = true;
    if (this.objElementSelected !== null) {
      this.change();
      this.objElementSelected.onDrop(event);
    }
    return this.objElementSelected = null;
  },
  /*
  	# On Mouse Down Canvas Box Event
  	# 
  	# @param Event event
  	*/
  onMouseDown: function(event) {
    this.booMouseOver = true;
    this.change();
    this.objElementSelected = this.objElementOver;
    return false;
  },
  /*
  	# On Mouse Click Canvas Box Event
  	# 
  	# @param Event event
  	*/
  onClick: function(event) {
    var objButton, _i, _len, _ref;
    this.booMouseOver = true;
    this.change();
    if (this.booShowMenu) {
      this.booShowMenu = this.objMenuSelected.onClick(event);
      return false;
    }
    if (this.objElementOver !== null) {
      this.objElementClicked = this.objElementOver;
      this.objElementOver.onClick(event);
    } else {
      this.objElementClicked = null;
      this.onBoxClick(event);
    }
    _ref = this.arrButtons;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objButton = _ref[_i];
      objButton.refresh();
      if (objButton.booMouseOver) {
        objButton.onClick();
      }
    }
    this.objCanvasHtml.focus();
    return false;
  },
  /*
  	# On Double Click Canvas Box Event
  	# 
  	# @param Event event
  	*/
  onDblClick: function(event) {
    this.booMouseOver = true;
    this.change();
    if (this.objElementOver !== null) {
      return this.objElementOver.onDblClick(event);
    } else {
      return this.onBoxDblClick(event);
    }
  },
  /*
  	# On Right Click Canvas Box Event
  	# 
  	# @param Event event
  	*/
  onBoxRightClick: function(event) {
    this.booMouseOver = true;
    this.change();
    return false;
  },
  /*
  	# On Context Menu Canvas Box Event
  	# 
  	# @param Event event
  	*/
  onContextMenu: function(event) {
    this.booMouseOver = true;
    this.change();
    if (this.objElementOver !== null) {
      this.objElementOver.onContextMenu(event);
    } else {
      this.onBoxContextMenu(event);
    }
    return false;
  },
  /*
  	# On Context Menu Clicked into a empty space of the Canvas Box
  	# @param Event event
  	*/
  onBoxContextMenu: function(event) {
    this.booMouseOver = true;
    this.change();
    this.booShowMenu = !this.booShowMenu;
    if (this.booShowMenu) {
      this.objMenu.objBox = this;
      this.objMenuSelected = this.objMenu;
      this.objMenuSelected.intMenuX = this.mouseX;
      this.objMenuSelected.intMenuY = this.mouseY;
      return this.objMenuSelected.strActualMenuItem = null;
    }
  },
  /*
  	#  On Click into a empty space of the Canvas Box
  	# 
  	# @param Event event
  	*/
  onBoxClick: function(event) {
    this.booMouseOver = true;
    this.change();
    if (this.booShowMenu) {
      return this.booShowMenu = this.objMenuSelected.onClick(event);
    }
  },
  /*
  	# On Double click into a empty space of the Canvas Box
  	# 
  	# @param Event event
  	*/
  onBoxDblClick: function(event) {
    this.booMouseOver = true;
    return this.change();
  },
  /*
  	# On Key Up into the Canvas Box Element
  	# 
  	# @param Event event
  	*/
  onKeyUp: function(event) {
    this.change();
    switch (event.keyCode) {
      case 46:
        if (this.objElementClicked !== null) {
          this.deleteElement(this.objElementClicked);
        }
        break;
      case 38:
        if (this.objElementClicked !== null) {
          this.objElementClicked.goUp();
        }
        break;
      case 40:
        if (this.objElementClicked !== null) {
          this.objElementClicked.goDown();
        }
        break;
      case 39:
        if (this.objElementClicked !== null) {
          this.objElementClicked.goRight();
        }
        break;
      case 37:
        if (this.objElementClicked !== null) {
          this.objElementClicked.goLeft();
        }
        break;
      case 32:
        if (this.objElementClicked !== null) {
          this.objElementClicked.fixed = !this.objElementClicked.fixed;
          this.objElementClicked.drawFixed(this.objElementClicked.fixed);
        }
        break;
      case 113:
        if (this.objElementClicked !== null) {
          this.objElementClicked.rename();
        }
        break;
      case 45:
        if (this.objElementClicked !== null) {
          this.objElementClicked.copy();
        }
    }
    return false;
  },
  /*
  	# Delete some element from the Canvas Box
  	# 
  	# @param CanvasBoxElement objElement
  	# @param boolean booCallOnDelete
  	*/
  deleteElement: function(objElement, booCallOnDelete) {
    var intId;
    this.change();
    if (Object.isUndefined(booCallOnDelete)) {
      booCallOnDelete = true;
    }
    if (booCallOnDelete) {
      objElement.onDelete();
    }
    intId = this.arrElements.indexOf(objElement);
    if (intId !== -1) {
      this.arrElements.splice(intId, 1);
    }
    if (this.arrElements.length > 0) {
      return this.objElementClicked = this.arrElements[0];
    } else {
      return this.objElementClicked = null;
    }
  },
  onMouseOver: function(event) {
    this.booMouseOver = true;
    return this.play();
  },
  onMouseOut: function(event) {
    return this.booMouseOver = false;
  },
  change: function() {
    this.play();
    this.intCounterStandyBy = 0;
    return this.booChanged = true;
  },
  moveTo: function(intX, intY) {
    return this.getContext().moveTo(Math.round(intX * this.dblZoom), Math.round(intY * this.dblZoom));
  },
  lineTo: function(intX, intY) {
    return this.getContext().lineTo(Math.round(intX * this.dblZoom), Math.round(intY * this.dblZoom));
  },
  arc: function(intX, intY, dblRadius, dblStartAngle, dblEndAngle, booClockwise) {
    return this.getContext().arc(Math.round(intX * this.dblZoom), Math.round(intY * this.dblZoom), Math.abs(Math.round(dblRadius * this.dblZoom)), dblStartAngle, dblEndAngle, booClockwise);
  },
  saveContext: function() {
    return this.getContext().save();
  },
  restoreContext: function() {
    return this.getContext().restore();
  },
  beginPath: function() {
    return this.getContext().beginPath();
  },
  closePath: function() {
    return this.getContext().closePath();
  },
  setFillStyle: function(strFillStyle) {
    return this.getContext().fillStyle = strFillStyle;
  },
  setStrokeStyle: function(intStrokeStyle) {
    return this.getContext().strokeStyle = intStrokeStyle * this.dblZoom;
  },
  setLineWidth: function(dblLineWidth) {
    return this.getContext().lineWidth = dblLineWidth * this.dblZoom;
  },
  fill: function() {
    return this.getContext().fill();
  },
  stroke: function() {
    return this.getContext().stroke();
  },
  strokeText: function(strText, intPosX, intPosY) {
    return this.getContext().strokeText(strText, Math.round(intPosX * this.dblZoom), Math.round(intPosY * this.dblZoom));
  },
  fillText: function(strText, intPosX, intPosY) {
    return this.getContext().fillText(strText, Math.round(intPosX * this.dblZoom), Math.round(intPosY * this.dblZoom));
  },
  strokeRect: function(intX, intY, intWidth, intHeight) {
    return this.getContext().strokeRect(Math.round(intX * this.dblZoom), Math.round(intY * this.dblZoom), Math.round(intWidth * this.dblZoom), Math.round(intHeight * this.dblZoom));
  },
  fillRect: function(intX, intY, intWidth, intHeight) {
    return this.getContext().fillRect(Math.round(intX * this.dblZoom), Math.round(intY * this.dblZoom), Math.round(intWidth * this.dblZoom), Math.round(intHeight * this.dblZoom));
  },
  setShadowOffsetX: function(intX) {
    return this.getContext().shadowOffsetX = Math.round(intX * this.dblZoom);
  },
  setShadowOffsetY: function(intY) {
    return this.getContext().shadowOffsetY = Math.round(intY * this.dblZoom);
  },
  setShadowBlur: function(intBlur) {
    return this.getContext().shadowBlur = intBlur;
  },
  setShadowColor: function(strColor) {
    return this.getContext().shadowColor = strColor;
  },
  setFont: function(strFontDescription) {
    var arrFontData, dblSizeNumber, strNewSizeNumber, strSize, strSizeNumber, strSizeType;
    arrFontData = explode(" ", strFontDescription);
    strSize = arrFontData[0];
    strSizeNumber = strSize.substr(0, strSize.length - 2);
    strSizeType = strSize.substr(strSize.length - 2);
    dblSizeNumber = 1 * strSizeNumber;
    dblSizeNumber = dblSizeNumber * this.dblZoom;
    strNewSizeNumber = dblSizeNumber + strSizeType;
    arrFontData[0] = strNewSizeNumber;
    strFontDescription = implode(" ", arrFontData);
    return this.getContext().font = strFontDescription;
  },
  translate: function(dblDegree, intDistance) {
    return this.getContext().translate(Math.round(dblDegree * this.dblZoom), Math.round(intDistance * this.dblZoom));
  },
  drawLine: function(intXfrom, intYfrom, intXto, intYto) {
    return this.getContext().drawLine(Math.round(intXfrom * this.dblZoom), Math.round(intYfrom * this.dblZoom), Math.round(intXto * this.dblZoom), Math.round(intYto * this.dblZoom));
  },
  rotate: function(dblDegree) {
    return this.getContext().rotate(dblDegree);
  },
  setTextAlign: function(strTextAling) {
    return this.getContext().textAlign = strTextAling;
  },
  addButton: function(objButton) {
    objButton.intPaddingLeft = 0;
    objButton.intPaddingTop = 0;
    if (this.arrButtons.length > 0) {
      objButton.strPositionHorizontal = "right";
      objButton.strPositionVertical = "middle";
      objButton.objPreviousButton = this.arrButtons[this.arrButtons.length - 1];
    } else {
      objButton.strPositionHorizontal = "left";
      objButton.strPositionVertical = "top";
    }
    return this.arrButtons.push(objButton);
  },
  saveFile: function() {
    var dblNewZoom, dblOldZoom, dblProportion, intHeight, intWidth, objInputImageType, objInputName, objNewForm, objNewTextArea, strDataURI, strDefaultFolder;
    dblProportion = this.defaultHeight / this.defaultWidth;
    intWidth = 1000;
    intHeight = Math.round(intWidth / dblProportion);
    dblOldZoom = this.dblZoom;
    dblNewZoom = intWidth / this.defaultWidth;
    this.objCanvasHtml.setAttribute("width", intWidth + "px");
    this.objCanvasHtml.setAttribute("height", intHeight + "px");
    this.dblZoom = dblNewZoom;
    objNewForm = document.createElement("form");
    objNewTextArea = document.createElement("textarea");
    objInputName = document.createElement("input");
    objInputImageType = document.createElement("input");
    this.onMouseOut(null);
    this.booDrawBoxMenu = false;
    this.stop();
    this.draw();
    strDataURI = this.objCanvasHtml.toDataURL("image/png");
    strDefaultFolder = window.autoload.getPathOfDefault();
    objNewForm.setAttribute("action", strDefaultFolder + "/download.php");
    objNewForm.setAttribute("method", "post");
    objNewForm.setAttribute("target", "saveWindow");
    objNewTextArea.setAttribute("name", "base64Content");
    objNewTextArea.value = strDataURI;
    objInputName.setAttribute("type", "text");
    objInputName.setAttribute("name", "fileName");
    objInputName.value = "diagram.png";
    objInputImageType.setAttribute("type", "text");
    objInputImageType.setAttribute("name", "imageType");
    objInputImageType.value = "image/png";
    objNewForm.appendChild(objNewTextArea);
    objNewForm.appendChild(objInputName);
    objNewForm.appendChild(objInputImageType);
    document.body.appendChild(objNewForm);
    objNewForm.submit();
    this.play();
    this.booDrawBoxMenu = true;
    window.setTimeout(function() {
      return window.open('../default/close.html', 'saveWindow');
    }, 30000);
    document.body.removeChild(objNewForm);
    this.dblZoom = dblOldZoom;
    this.objCanvasHtml.setAttribute("width", this.defaultWidth + "px");
    return this.objCanvasHtml.setAttribute("height", this.defaultHeight + "px");
  },
  saveAsXml: function() {
    return alert("Feature in development. Try it tomorrow!");
  }
  /*
  # Canvas Box it is a canvas element where the user can be append and remove elements.
  #
  # It elements can be selected and clicked and interact each other.
  # @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
  */
});
CanvasBox.prototype.arrInstance = Array();
/*
# Get instance of canvas box by its id
*/
CanvasBox.prototype.getCanvasBoxById(function(id) {
  return CanvasBox.prototype.arrInstances[id];
});
/*
# Get the client height fixing browsers missing standarts
#
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
*/
CanvasBox.prototype.clientHeight(function() {
  var _ref, _ref2, _ref3;
  return CanvasBox.prototype.filterResults((_ref = window.innerHeight) != null ? _ref : window.innerHeight = 0, (_ref2 = document.documentElement) != null ? _ref2 : document.documentElement = 0, (_ref3 = document.body) != null ? _ref3 : document.body = 0);
});
/*
# Get the scroll left fixing browsers missing standarts
#
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
*/
CanvasBox.prototype.scrollLeft(function() {
  var _ref, _ref2, _ref3;
  return CanvasBox.prototype.filterResults((_ref = window.pageXOffset) != null ? _ref : window.pageXOffset = 0, (_ref2 = document.documentElement) != null ? _ref2 : document.documentElement = 0, (_ref3 = document.body) != null ? _ref3 : document.body = 0);
});
/*
# Get the scroll Top fixing browsers missing standarts
#
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
*/
CanvasBox.prototype.scrollTop(function() {
  var _ref, _ref2, _ref3;
  return CanvasBox.prototype.filterResults((_ref = window.pageYOffset) != null ? _ref : window.pageYOffset = 0, (_ref2 = document.documentElement) != null ? _ref2 : document.documentElement = 0, (_ref3 = document.body) != null ? _ref3 : document.body = 0);
});
/*
# browsers workaround for missing standarts
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
*/
CanvasBox.prototype.filterResults(function(intWin, intDocel, intBody) {
  var intresult, _ref;
  intresult = intWin != null ? intWin : intWin = 0;
  if (intDocel && (!intresult || (intresult > intDocel))) {
    intresult = intDocel;
  }
  return (_ref = intBody && (!intresult || (intresult > intBody))) != null ? _ref : {
    intBody: intresult
  };
});