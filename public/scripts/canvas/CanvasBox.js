
/*
 * Controls the events into the canvas object emulating some 
 * event-based interactions with the virtual canvas box elements
 *
 * @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
 * @see CanvasBoxElement
 * @see CanvasBoxButton
 */
var CanvasBox;

Load.CanvasBoxException();

CanvasBox = (function() {

  /*
   * Zoom Distance
   */
  CanvasBox.prototype.dblZoom = 1;


  /*
   * Counter of Stand By Frames
   */

  CanvasBox.prototype.intCounterStandyBy = 0;


  /*
   * Position x of the Canvas Box Element relative to the page
   * @type integer
   */

  CanvasBox.prototype.x = 0;


  /*
   * Position y of the Canvas Box Element relative to the page
   * @type integer
   */

  CanvasBox.prototype.y = 0;


  /*
   * Id of the Box, to deal with many canvas box into the same page
   * @type integer
   */

  CanvasBox.prototype.id = null;


  /*
   * width of the Sand Box
   * @type integer
   */

  CanvasBox.prototype.width = 400;


  /*
   * Height of the Sand Box
   * @type integer
   */

  CanvasBox.prototype.height = 400;


  /*
   * Width of the Sand Box
   * @type integer
   */

  CanvasBox.prototype.defaultWidth = 400;


  /*
   * Height of the Sand Box
   * @type integer
   */

  CanvasBox.prototype.defaultHeight = 400;


  /*
   * Html Canvas Box Element
   * @type Canvas
   */

  CanvasBox.prototype.objCanvasHtml = null;


  /*
   * Collection of Elements inside the Box
   * @type CanvasBoxElement[]
   */

  CanvasBox.prototype.arrElements = Array();


  /*
   * Collection of CanvasButtons of the Box
   * 
   * @type CanvasBoxButton[]
   */

  CanvasBox.prototype.arrButtons = Array();


  /*
   * CanvasBoxElement Over
   * @type CanvasBoxElement
   */

  CanvasBox.prototype.objElementOver = null;


  /*
   * CanvasBoxElement Clicked
   * @type CanvasBoxElement
   */

  CanvasBox.prototype.objElementClicked = null;


  /*
   * Interval of Image Refreshing
   * @type integer
   */

  CanvasBox.prototype.intIntervalDraw = 0;


  /*
   * Interval of Objects Timers
   * @type integer
   */

  CanvasBox.prototype.intIntervalTimer = 1;


  /*
   * Control if the refreshing is active or not
   * @type boolean
   */

  CanvasBox.prototype.booActive = false;


  /*
   * Mouse X position relative to canvas box
   * @integer
   */

  CanvasBox.prototype.mouseX = 0;


  /*
   * Mouse Y position relative to canvas box
   * @integer
   */

  CanvasBox.prototype.mouseY = 0;


  /*
   * Flag of control if the canvas box is drawing right now
   * @type boolean
   */

  CanvasBox.prototype.booOnDraw = false;


  /*
   * Flag of control if the canvas box is moving right now
   */

  CanvasBox.prototype.booOnTimer = false;


  /*
   * Flag of the on change event
   */

  CanvasBox.prototype.booChanged = true;


  /*
   * Flag of the mouse over event
   */

  CanvasBox.prototype.booMouseOver = true;


  /*
   * Flag of Draw event
   */

  CanvasBox.prototype.booDrawBoxMenu = true;


  /*
   * Javascript constant of right button click
   */

  CanvasBox.prototype.intRightButtonClick = 2;


  /*
   * Class Name of the Canvas Box
   * @type string
   */

  CanvasBox.prototype.strClassName = "CanvasBox";


  /*
   * Frames per Second Counter
   * @type integer
   */

  CanvasBox.prototype.intFps = 0;


  /*
   * Frames per Second Last Result
   * @type integer
   */

  CanvasBox.prototype.intLastFps = 0;


  /*
   * Flag that controls if the FPS counter is active
   */

  CanvasBox.prototype.booCountFps = false;


  /*
   * Background Color of the Canvas Box
   */

  CanvasBox.prototype.backgroundColor = "white";


  /*
   * Flag that controls if the menu is showing
   */

  CanvasBox.prototype.booShowMenu = false;


  /*
   * Native Menu element of the Canvas Box
   */

  CanvasBox.prototype.objMenu = null;


  /*
   * Actual Menu Element of the Canvas
   */

  CanvasBox.prototype.objMenuSelected = null;

  CanvasBox.prototype.intTimeoutTimer = null;

  CanvasBox.prototype.intTimeoutDraw = null;

  CanvasBox.prototype.intTimeoutFPS = null;


  /*
   * Get the client width fixing browsers missing standarts
   * @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
   */

  CanvasBox.prototype.clientWidth = function() {
    return CanvasBox.prototype.filterResults(window.innerWidth != null ? window.innerWidth : window.innerWidth = 0, document.documentElement != null ? document.documentElement : document.documentElement = 0, document.body != null ? document.body : document.body = 0);
  };

  CanvasBox.prototype.toSerialize = function() {
    var objResult;
    objResult = new Object();
    objResult.x = this.x;
    objResult.y = this.y;
    objResult.width = this.width;
    objResult.height = this.height;
    objResult.objCanvasHtml = this.objCanvasHtml;
    objResult.intIntervalDraw = this.intIntervalDraw;
    objResult.booActive = this.booActive;
    objResult.booOnDraw = this.booOnDraw;
    objResult.arrElements = this.arrElements;
    return objResult;
  };


  /*
   * Method that defined the Native Menu of the Canvas Box.
   * 
   * This menu will be see when the user right click into some
   * empty area of the canvas box 
   * 
   * @return CanvasBox
   */

  CanvasBox.prototype.defineMenu = function() {
    this.objMenu = New.CanvasBoxMenu();
    this.objMenu.objParent = this;
    this.objMenu.objBox = this;
    this.objMenu.arrMenuItens = {
      0: {
        name: "create class",
        event: function(objParent) {
          var objClass;
          objClass = New.CanvasBoxClass();
          objClass.objBehavior = New.CanvasBoxMagneticBehavior(objClass);
          objClass.x = objParent.mouseX;
          objClass.y = objParent.mouseY;
          return objParent.addElement(objClass);
        }
      },
      1: {
        name: "create square",
        event: function(objParent) {
          var objSquare;
          objSquare = New.CanvasBoxSquare();
          objSquare.objBehavior = New.CanvasBoxMagneticBehavior(objSquare);
          objSquare.x = objParent.mouseX;
          objSquare.y = objParent.mouseY;
          return objParent.addElement(objSquare);
        }
      }
    };
    this.objMenuSelected = null;
    return this;
  };


  /*
   * Calculates the absolute position of the canvas box object based
   * on the position of the parents objects
   * 
   * @return CanvasBox
   */

  CanvasBox.prototype.getPosition = function() {
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
  };


  /*
   * Change the background color
   *
   * @param strNewBackgroundColor string 
   * @return CanvasBox
   */

  CanvasBox.prototype.setBackgroundColor = function(strNewBackgroundColor) {
    this.backgroundColor = strNewBackgroundColor;
    this.objCanvasHtml.style.backgroundColor = this.backgroundColor;
    return this;
  };


  /*
   * Initialize the Canvas Box
   *
   * - Validate the canvas html element
   * - set the width and the height into the canvas html element
   *
   * @param idCanvasHtmlElement string
   * @throws CanvasBoxException
   * 
   * @return CanvasBox
   */

  function CanvasBox(idCanvasHtmlElement, intWidth, intHeight) {
    var strHeight, strWidth;
    if (intWidth == null) {
      intWidth = 400;
    }
    if (intHeight == null) {
      intHeight = 400;
    }
    console.log("canvasbox constructor " + idCanvasHtmlElement);
    this.defaultWidth = intWidth;
    this.defaultHeight = intHeight;
    this.width = this.defaultWidth / this.dblZoom;
    this.height = this.defaultHeight / this.dblZoom;
    this.id = CanvasBox.prototype.arrInstances.length;
    CanvasBox.prototype.arrInstances[this.id] = this;
    this.objCanvasHtml = document.getElementById(idCanvasHtmlElement);
    if (this.objCanvasHtml === null) {
      throw New.CanvasBoxException("Invalid canvas html element id [" + idCanvasHtmlElement + "]");
    }
    this.getPosition();
    strWidth = "" + this.defaultWidth + "px";
    this.objCanvasHtml.setAttribute("width", strWidth);
    strHeight = "" + this.defaultHeight + "px";
    this.objCanvasHtml.setAttribute("height", strHeight);
    this.objCanvasHtml.setAttribute("contentEditable", "true");
    this.objCanvasHtml.contentEditable = true;
    this.objCanvasHtml.addEventListener('mousemove', (function(_this) {
      return function(event) {
        return _this.onMouseMove(event);
      };
    })(this));
    this.objCanvasHtml.addEventListener('click', (function(_this) {
      return function(event) {
        return _this.onClick(event);
      };
    })(this));
    this.objCanvasHtml.addEventListener('dblclick', (function(_this) {
      return function(event) {
        return _this.onDblClick(event);
      };
    })(this));
    this.objCanvasHtml.addEventListener('mouseup', (function(_this) {
      return function(event) {
        return _this.onMouseUp(event);
      };
    })(this));
    this.objCanvasHtml.addEventListener('mousedown', (function(_this) {
      return function(event) {
        return _this.onMouseDown(event);
      };
    })(this));
    this.objCanvasHtml.addEventListener('contextmenu', (function(_this) {
      return function(event) {
        return _this.onContextMenu(event);
      };
    })(this));
    this.objCanvasHtml.addEventListener('keyup', (function(_this) {
      return function(event) {
        return _this.onKeyUp(event);
      };
    })(this));
    this.objCanvasHtml.addEventListener('mouseout', (function(_this) {
      return function(event) {
        return _this.onMouseOut(event);
      };
    })(this));
    this.objCanvasHtml.addEventListener('mouseover', (function(_this) {
      return function(event) {
        return _this.onMouseOver(event);
      };
    })(this));
    this.defineMenu();
    this.play();

    /*
    @objBox = this;
    objButton = New.CanvasBoxZoomInButton( this );
    @addButton( objButton );
    objButton = New.CanvasBoxZoomOutButton( this );
    @addButton( objButton );
    objButton = New.CanvasBoxExportButton( this );
    @addButton( objButton );
    objButton = New.CanvasBoxSaveButton( this );
    @addButton( objButton );
     */
    this.init();
    return this;
  }


  /*
   * The extended version of the constructor without the need of parent method call.
   *
   * in the parent, do nothing
   */

  CanvasBox.prototype.init = function() {};


  /*
   * Add a CanvasBoxElement intot he CanvasBox
   *
   * @param objElement CanvasBoxElement
   */

  CanvasBox.prototype.addElement = function(objElement) {
    this.arrElements.push(objElement);
    objElement.objBox = this;
    objElement.objContext = this.getContext();
    return objElement.load();
  };


  /*
   * Get the Context of the Canvas Html Element
   * @return CanvasRenderingContext2D
   */

  CanvasBox.prototype.getContext = function() {
    var objContext;
    objContext = this.objCanvasHtml.getContext('2d');
    return objContext;
  };


  /*
   * Clear the image into the Canvas Html Element Context
   */

  CanvasBox.prototype.clear = function() {
    var objContext;
    objContext = this.getContext();
    objContext.clearRect(0, 0, Math.max(this.width, this.defaultWidth), Math.max(this.height, this.defaultHeight));
    return this.defaultStyle();
  };


  /*
   * Draw all the elements into the CanvasBox
   */

  CanvasBox.prototype.draw = function() {
    var arrLayerElements, arrLayers, objButton, objElement, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1;
    if (!this.booChanged) {
      this.intCounterStandyBy++;
      return;
    }
    this.intCounterStandyBy = 0;
    this.booOnDraw = true;
    this.clear();
    arrLayers = Array();

    /*
     * Create one array to each layer into the z dimension
     */
    _ref = this.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      if (arrLayers[objElement.z] == null) {
        arrLayers[objElement.z] = Array();
      }
      arrLayers[objElement.z].push(objElement);
    }

    /*
     * Order layers by the z dimension
     */
    arrLayers = php.sort(arrLayers);

    /*
     * Draw Elements each z dimension layer of time
     */
    for (_j = 0, _len1 = arrLayers.length; _j < _len1; _j++) {
      arrLayerElements = arrLayers[_j];
      for (_k = 0, _len2 = arrLayerElements.length; _k < _len2; _k++) {
        objElement = arrLayerElements[_k];
        if ((objElement != null)) {
          objElement.onDraw();
        }
      }
    }
    objElement = null;
    if (this.booShowMenu) {
      this.objMenuSelected.mouseX = this.mouseX;
      this.objMenuSelected.mouseY = this.mouseY;
      this.objMenuSelected.onDraw();
    }
    if (this.booDrawBoxMenu) {
      _ref1 = this.arrButtons;
      for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
        objButton = _ref1[_l];
        objButton.refresh();
        objButton.onDraw();
      }
    }
    this.booOnDraw = false;
    return this.booChanged = false;
  };


  /*
   * Draw all the elements into the CanvasBox
   */

  CanvasBox.prototype.onTimerElements = function() {
    var objElement, _i, _len, _ref;
    this.booOnTimer = true;
    _ref = this.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      if (php.is_object(objElement)) {
        objElement.onTimer();
      }
    }
    return this.booOnTimer = false;
  };


  /*
   * Active the auto refresh timer
   */

  CanvasBox.prototype.play = function() {
    this.intCounterStandyBy = 0;
    if (this.booActive) {
      return;
    }
    this.booActive = true;
    this.intTimeoutTimer = setTimeout(this.onTimer.bind(this), this.intIntervalTimer);
    this.intTimeoutDraw = setTimeout(this.onDraw.bind(this), this.intIntervalDraw);
    return this.intTimeoutFPS = setTimeout(this.onCountFps.bind(this), 1000);
  };


  /*
   * Stop the auto refresh timer
   */

  CanvasBox.prototype.stop = function() {
    this.booActive = false;
    window.clearTimeout(this.intTimeoutTimer);
    window.clearTimeout(this.intTimeoutDraw);
    return window.clearTimeout(this.intTimeoutFPS);
  };


  /*
   * Refresh the Canvas Box
   *
   * - Draw the elements
   * - Call the next timer if should
   * @return boolean
   */

  CanvasBox.prototype.onTimer = function() {
    if (this.booActive === false) {
      return false;
    }
    if (this.intCounterStandyBy < 10) {
      this.intTimeoutTimer = setTimeout(this.onTimer.bind(this), this.intIntervalTimer);
    } else {
      if (this.booMouseOver) {
        this.intTimeoutTimer = setTimeout(this.onTimer.bind(this), this.intIntervalTimer * 2);
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
  };


  /*
   * On show counter FPS
   */

  CanvasBox.prototype.onCountFps = function() {
    this.intLastFps = this.intFps;
    this.intFps = 0;
    if (!this.booCountFps) {
      return false;
    }
    document.title = "FPS: " + this.intLastFps;
    this.intTimeoutFPS = setTimeout(this.onCountFps.bind(this), 1000);
    return true;
  };


  /*
   * Refresh the Canvas Box
   *
   * - Draw the elements
   * - Call the next timer if should
   */

  CanvasBox.prototype.onDraw = function() {
    if (this.booActive === false) {
      return false;
    }
    this.intTimeoutDraw = setTimeout(this.onDraw.bind(this), this.intIntervalDraw);
    if (!this.booOnDraw) {
      this.draw();
      this.intFps++;
    }
    return true;
  };


  /*
   * Refresh Mouse Position based on Event
   *
   * @param event Event
   */

  CanvasBox.prototype.refreshMousePosition = function(event) {
    if (event == null) {
      event = null;
    }
    if ((event != null)) {
      this.mouseX = (event.clientX - this.x + CanvasBox.prototype.scrollLeft()) / this.dblZoom;
      return this.mouseY = (event.clientY - this.y + CanvasBox.prototype.scrollTop()) / this.dblZoom;
    }
  };


  /*
   * On Move Move over the Canvas Box
   * Search if the Mouse is Over some Canvas Element
   * @param event event
   */

  CanvasBox.prototype.onMouseMove = function(event) {
    var objButton, objElement, objElementOver, _i, _j, _len, _len1, _ref, _ref1, _results;
    if (event == null) {
      event = null;
    }
    objElementOver = null;
    this.refreshMousePosition(event);
    _ref = this.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      if (php.is_object(objElement) && objElement.isInside(this.mouseX, this.mouseY)) {
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
        this.booMouseOver = true;
        objElementOver.onMouseOver(event);
      }
    }
    if (objElementOver !== null) {
      this.objCanvasHtml.style.cursor = "pointer";
    } else {
      this.objCanvasHtml.style.cursor = "default";
    }
    this.objElementOver = objElementOver;
    if ((this.objElementSelected != null)) {
      this.change();
      this.objElementSelected.onDrag(event);
    }
    _ref1 = this.arrButtons;
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      objButton = _ref1[_j];
      objButton.refresh();
      if (objButton.booMouseOver !== objButton.isInside(this.mouseX * this.dblZoom, this.mouseY * this.dblZoom)) {
        _results.push(this.change());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };


  /*
   * On Mouse Up Canvas Box Event
   * 
   * @see onMouseDown
   * @see CanvasBoxElement::onDrop()
   * @param Event event
   */

  CanvasBox.prototype.onMouseUp = function(event) {
    this.booMouseOver = true;
    if ((this.objElementSelected != null)) {
      this.change();
      this.objElementSelected.onDrop(event);
    }
    return this.objElementSelected = null;
  };


  /*
   * On Mouse Down Canvas Box Event
   * 
   * @param Event event
   */

  CanvasBox.prototype.onMouseDown = function(event) {
    this.booMouseOver = true;
    this.change();
    this.objElementSelected = this.objElementOver;
    if ((this.objElementSelected != null)) {
      this.objElementSelected.onMouseDown(event);
    }
    return false;
  };


  /*
   * On Mouse Click Canvas Box Event
   * 
   * @param Event event
   */

  CanvasBox.prototype.onClick = function(event) {
    var objButton, _i, _len, _ref;
    this.objCanvasHtml.focus();
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
    return false;
  };


  /*
   * On Double Click Canvas Box Event
   * 
   * @param Event event
   */

  CanvasBox.prototype.onDblClick = function(event) {
    this.booMouseOver = true;
    this.change();
    if (this.objElementOver !== null) {
      return this.objElementOver.onDblClick(event);
    } else {
      return this.onBoxDblClick(event);
    }
  };


  /*
   * On Right Click Canvas Box Event
   * 
   * @param Event event
   */

  CanvasBox.prototype.onBoxRightClick = function(event) {
    this.booMouseOver = true;
    this.change();
    return false;
  };


  /*
   * On Context Menu Canvas Box Event
   * 
   * @param Event event
   */

  CanvasBox.prototype.onContextMenu = function(event) {
    this.booMouseOver = true;
    this.change();
    if (this.objElementOver !== null) {
      this.objElementOver.onContextMenu(event);
    } else {
      this.onBoxContextMenu(event);
    }
    return false;
  };


  /*
   * On Context Menu Clicked into a empty space of the Canvas Box
   * @param Event event
   */

  CanvasBox.prototype.onBoxContextMenu = function(event) {
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
  };


  /*
   *  On Click into a empty space of the Canvas Box
   * 
   * @param Event event
   */

  CanvasBox.prototype.onBoxClick = function(event) {
    this.booMouseOver = true;
    this.change();
    if (this.booShowMenu) {
      return this.booShowMenu = this.objMenuSelected.onClick(event);
    }
  };


  /*
   * On Double click into a empty space of the Canvas Box
   * 
   * @param Event event
   */

  CanvasBox.prototype.onBoxDblClick = function(event) {
    this.booMouseOver = true;
    return this.change();
  };


  /*
   * On Key Up into the Canvas Box Element
   * 
   * @param Event event
   */

  CanvasBox.prototype.onKeyUp = function(event) {
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
  };


  /*
   * Delete some element from the Canvas Box
   * 
   * @param CanvasBoxElement objElement
   * @param boolean booCallOnDelete
   */

  CanvasBox.prototype.deleteElement = function(objElement, booCallOnDelete) {
    var intId;
    if (booCallOnDelete == null) {
      booCallOnDelete = true;
    }
    this.change();
    if (booCallOnDelete) {
      objElement.onDelete();
    }
    intId = this.arrElements.indexOf(objElement);
    console.log(" index of intId ");
    if (intId !== -1) {
      this.arrElements.splice(intId, 1);
    }
    if (this.arrElements.length > 0) {
      return this.objElementClicked = null;
    } else {
      return this.objElementClicked = null;
    }
  };

  CanvasBox.prototype.onMouseOver = function(event) {
    this.booMouseOver = true;
    return this.play();
  };

  CanvasBox.prototype.onMouseOut = function(event) {
    return this.booMouseOver = false;
  };

  CanvasBox.prototype.change = function() {
    this.play();
    this.intCounterStandyBy = 0;
    return this.booChanged = true;
  };

  CanvasBox.prototype.moveTo = function(intX, intY) {
    return this.getContext().moveTo(Math.round(intX * this.dblZoom), Math.round(intY * this.dblZoom));
  };

  CanvasBox.prototype.lineTo = function(intX, intY) {
    return this.getContext().lineTo(Math.round(intX * this.dblZoom) + 0.5, Math.round(intY * this.dblZoom) + 0.5);
  };

  CanvasBox.prototype.quadraticCurveTo = function(intCurveX, intCurveY, intX, intY) {
    return this.getContext().quadraticCurveTo(Math.round(intCurveX * this.dblZoom), Math.round(intCurveY * this.dblZoom), Math.round(intX * this.dblZoom) + 0.5, Math.round(intY * this.dblZoom) + 0.5);
  };

  CanvasBox.prototype.bezierCurveTo = function(intCurveX, intCurveY, intX, intY) {
    return this.getContext().bezierCurveTo(Math.round(intCurveX * this.dblZoom), Math.round(intCurveY * this.dblZoom), Math.round(intCurveX * this.dblZoom), Math.round(intCurveY * this.dblZoom), Math.round(intX * this.dblZoom), Math.round(intY * this.dblZoom));
  };

  CanvasBox.prototype.arc = function(intX, intY, dblRadius, dblStartAngle, dblEndAngle, booClockwise) {
    return this.getContext().arc(Math.round(intX * this.dblZoom), Math.round(intY * this.dblZoom), Math.abs(Math.round(dblRadius * this.dblZoom)), dblStartAngle, dblEndAngle, booClockwise);
  };

  CanvasBox.prototype.defaultStyle = function() {
    this.setFillStyle("red");
    this.setStrokeStyle("red");
    return this.setLineWidth("1px");
  };

  CanvasBox.prototype.saveContext = function() {
    this.getContext().save();
    return this.defaultStyle();
  };

  CanvasBox.prototype.restoreContext = function() {
    this.getContext().restore();
    return this.defaultStyle();
  };

  CanvasBox.prototype.beginPath = function() {
    return this.getContext().beginPath();
  };

  CanvasBox.prototype.closePath = function() {
    return this.getContext().closePath();
  };

  CanvasBox.prototype.setFillStyle = function(strFillStyle) {
    var objError;
    try {
      if (strFillStyle == null) {
        objError = (function() {
          throw new CanvasBoxException("Fill Style not defined");
        })();
      }
      return this.getContext().fillStyle = strFillStyle;
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on set Fill Style [" + strFillStyle + "]");
    }
  };

  CanvasBox.prototype.setStrokeStyle = function(strStrokeStyle) {
    var objError;
    try {
      if (strStrokeStyle == null) {
        objError = new CanvasBoxException("Stroke Style not defined");
        throw objError;
      }
      return this.getContext().strokeStyle = strStrokeStyle;
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on set Stroke Style [" + strStrokeStyle + "]");
    }
  };

  CanvasBox.prototype.setLineWidth = function(dblLineWidth) {
    var objError;
    try {
      return this.getContext().lineWidth = dblLineWidth * this.dblZoom;
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on set Line Width [" + dblLineWidth + "]");
    }
  };

  CanvasBox.prototype.fill = function() {
    return this.getContext().fill();
  };

  CanvasBox.prototype.stroke = function() {
    return this.getContext().stroke();
  };

  CanvasBox.prototype.strokeText = function(strText, intPosX, intPosY) {
    var objError;
    try {
      return this.getContext().strokeText(strText, Math.round(intPosX * this.dblZoom), Math.round(intPosY * this.dblZoom));
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on set Stroke Text");
    }
  };

  CanvasBox.prototype.fillText = function(strText, intPosX, intPosY) {
    var objError;
    try {
      return this.getContext().fillText(strText, Math.round(intPosX * this.dblZoom) + 0.5, Math.round(intPosY * this.dblZoom) + 0.5);
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on fill Text");
    }
  };

  CanvasBox.prototype.strokeRect = function(intX, intY, intWidth, intHeight) {
    var objError;
    try {
      return this.getContext().strokeRect(Math.round(intX * this.dblZoom) + 0.5, Math.round(intY * this.dblZoom) + 0.5, Math.round(intWidth * this.dblZoom) + 0.5, Math.round(intHeight * this.dblZoom) + 0.5);
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on stroke Rect");
    }
  };

  CanvasBox.prototype.fillRect = function(intX, intY, intWidth, intHeight) {
    var objError;
    try {
      return this.getContext().fillRect(Math.round(intX * this.dblZoom) + 0.5, Math.round(intY * this.dblZoom) + 0.5, Math.round(intWidth * this.dblZoom) + 0.5, Math.round(intHeight * this.dblZoom) + 0.5);
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on fill Rect");
    }
  };

  CanvasBox.prototype.setShadowOffsetX = function(intX) {
    var objError;
    try {
      return this.getContext().shadowOffsetX = Math.round(intX * this.dblZoom);
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on set Shadow Offset X");
    }
  };

  CanvasBox.prototype.setShadowOffsetY = function(intY) {
    var objError;
    try {
      return this.getContext().shadowOffsetY = Math.round(intY * this.dblZoom);
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on set Shadow Offset Y");
    }
  };

  CanvasBox.prototype.setShadowBlur = function(intBlur) {
    var objError;
    try {
      return this.getContext().shadowBlur = intBlur;
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on set Shadow Blur");
    }
  };

  CanvasBox.prototype.setShadowColor = function(strColor) {
    var objError;
    try {
      return this.getContext().shadowColor = strColor;
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on set Shadow Color");
    }
  };

  CanvasBox.prototype.setFont = function(strFontDescription) {
    var arrFontData, dblSizeNumber, key, objError, strFontData, strNewSizeNumber, strSizeNumber, strSizeType, _i, _len;
    try {
      arrFontData = php.explode(" ", strFontDescription);
      for (key = _i = 0, _len = arrFontData.length; _i < _len; key = ++_i) {
        strFontData = arrFontData[key];
        if (strFontData.indexOf("px") > -1 || strFontData.indexOf("pt") > -1) {
          strSizeNumber = strFontData.substr(0, strFontData.length - 2);
          strSizeType = strFontData.substr(strFontData.length - 2);
          dblSizeNumber = 1 * strSizeNumber;
          dblSizeNumber = dblSizeNumber * this.dblZoom;
          strNewSizeNumber = dblSizeNumber + strSizeType;
          arrFontData[key] = strNewSizeNumber;
        }
      }
      strFontDescription = php.implode(" ", arrFontData);
      return this.getContext().font = strFontDescription;
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on set Font " + strFontDescription);
    }
  };

  CanvasBox.prototype.translate = function(intX, intY) {
    var objError;
    try {
      return this.getContext().translate(intX, intY);
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on translate");
    }
  };

  CanvasBox.prototype.drawLine = function(intXfrom, intYfrom, intXto, intYto) {
    var objCanvasError, objError;
    try {
      this.getContext().moveTo(intXfrom + 0.5, intYfrom + 0.5);
      return this.getContext().lineTo(intXto + 0.5, intYto + 0.5);
    } catch (_error) {
      objError = _error;
      objCanvasError = new CanvasBoxException("Error on drawLine");
      objCanvasError.setParentError(objError);
      throw objCanvasError;
    }
  };

  CanvasBox.prototype.drawQuadraticLine = function(intXfrom, intYfrom, intXto, intYto, intXCurve, intYCurve) {
    var objCanvasError, objError;
    try {
      this.getContext().moveTo(intXfrom + 0.5, intYfrom + 0.5);
      return this.getContext().quadraticCurveTo(intXCurve, intYCurve, intXto + 0.5, intYto + 0.5);
    } catch (_error) {
      objError = _error;
      objCanvasError = new CanvasBoxException("Error on quadraticCurveTo");
      objCanvasError.setParentError(objError);
      throw objCanvasError;
    }
  };

  CanvasBox.prototype.drawBezierLine = function(intXfrom, intYfrom, intXto, intYto, intXCurve, intYCurve) {
    var objCanvasError, objError;
    try {
      this.getContext().moveTo(intXfrom + 0.5, intYfrom + 0.5);
      return this.bezierCurveTo(intXCurve, intYCurve, intXto + 0.5, intYto + 0.5);
    } catch (_error) {
      objError = _error;
      objCanvasError = new CanvasBoxException("Error on drawBezierLine");
      objCanvasError.setParentError(objError);
      throw objCanvasError;
    }
  };

  CanvasBox.prototype.rotate = function(dblDegree) {
    var objError;
    try {
      return this.getContext().rotate(dblDegree);
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on rotate");
    }
  };

  CanvasBox.prototype.setTextAlign = function(strTextAling) {
    var objError;
    try {
      return this.getContext().textAlign = strTextAling;
    } catch (_error) {
      objError = _error;
      throw new CanvasBoxException("Error on setTextAling " + strTextAling);
    }
  };

  CanvasBox.prototype.addButton = function(objButton) {
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
  };

  CanvasBox.prototype.saveFile = function() {
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
    strDefaultFolder = window.MAIN_PATH;
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
  };

  CanvasBox.prototype.saveAsXml = function() {
    return alert("Feature in development. Try it tomorrow!");
  };

  return CanvasBox;

})();


/*
 * Canvas Box it is a canvas element where the user can be append and remove elements.
 *
 * It elements can be selected and clicked and interact each other.
 * @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
 */

CanvasBox.prototype.arrInstances = Array();


/*
 * Get instance of canvas box by its id
 */

CanvasBox.prototype.getCanvasBoxById = function(id) {
  return CanvasBox.prototype.arrInstances[id];
};


/*
 * Get the client height fixing browsers missing standarts
 *
 * @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
 */

CanvasBox.prototype.clientHeight = function() {
  return CanvasBox.prototype.filterResults(window.innerHeight != null ? window.innerHeight : window.innerHeight = 0, document.documentElement != null ? document.documentElement : document.documentElement = 0, document.body != null ? document.body : document.body = 0);
};


/*
 * Get the scroll left fixing browsers missing standarts
 *
 * @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
 */

CanvasBox.prototype.scrollLeft = function() {
  var _base, _base1;
  return CanvasBox.prototype.filterResults(window.pageXOffset != null ? window.pageXOffset : window.pageXOffset = 0, (_base = document.documentElement).scrollWidth != null ? _base.scrollWidth : _base.scrollWidth = 0, (_base1 = document.body).scrollWidth != null ? _base1.scrollWidth : _base1.scrollWidth = 0);
};


/*
 * Get the scroll Top fixing browsers missing standarts
 *
 * @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
 */

CanvasBox.prototype.scrollTop = function() {
  var _base, _base1;
  return CanvasBox.prototype.filterResults(window.pageYOffset != null ? window.pageYOffset : window.pageYOffset = 0, (_base = document.documentElement).scrollHeight != null ? _base.scrollHeight : _base.scrollHeight = 0, (_base1 = document.body).scrollHeight != null ? _base1.scrollHeight : _base1.scrollHeight = 0);
};


/*
 * browsers workaround for missing standarts
 * @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
 */

CanvasBox.prototype.filterResults = function(intWin, intDocel, intBody) {
  var intresult, _ref;
  return intWin;
  intresult = intWin != null ? intWin : intWin = 0;
  if (intDocel && (!intresult || (intresult > intDocel))) {
    intresult = intDocel;
  }
  return (_ref = intBody && (!intresult || (intresult > intBody))) != null ? _ref : {
    intBody: intresult
  };
};

//# sourceMappingURL=maps/CanvasBox.js.map