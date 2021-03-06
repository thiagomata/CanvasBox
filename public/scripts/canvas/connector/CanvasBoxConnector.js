
/*
 * Canvas Box Connector
 * 
 * Canvas Box Connector is the element what create connections between
 * Canvas Box Elements.
 * 
 * @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
 */
var CanvasBoxConnector;

CanvasBoxConnector = (function() {

  /*
   * Canvas Box owner of this object
   * @type CanvasBox
   */
  CanvasBoxConnector.prototype.objBox = null;


  /*
   * Canvas Box Element that this connector is going from
   * @type CanvasBoxElement
   */

  CanvasBoxConnector.prototype.objElementFrom = null;


  /*
   * Camvas Box Element that thi connector is going to
   * @type CanvasBoxElement
   */

  CanvasBoxConnector.prototype.objElementTo = null;


  /*
   * Position X of the connector inside the Canvas Box
   * @type integer
   */

  CanvasBoxConnector.prototype.x = 0;


  /*
   * Position Y of the connector inside the Canvas Box
   * @type integer
   */

  CanvasBoxConnector.prototype.y = 0;


  /*
   * Position Z of the connector inside the Canvas Box
   * @type integer
   */

  CanvasBoxConnector.prototype.z = 0;


  /*
   * Velocity into the X position
   * @type integer
   */

  CanvasBoxConnector.prototype.dx = 3;


  /*
   * Veolocity into the Y position
   * @type integer
   */

  CanvasBoxConnector.prototype.dy = 3;


  /*
   * Behavior of the Canvas Box Connector Element
   * 
   * @type CanvasBoxDefaultConnectorBehavior
   */

  CanvasBoxConnector.prototype.objBehavior = null;


  /*
   * Canvas 2D Context from the Canvas Box Container
   * @type CanvasRenderingContext2D
   */

  CanvasBoxConnector.prototype.objContext = null;


  /*
   * Class name of the Canvas Box Connector
   * @type string
   */

  CanvasBoxConnector.prototype.strClassName = "CanvasBoxConnector";


  /*
   * Flag that make easy diff the connectors from the regular elements
   * without type cast ( slow in javascript )
   * @type boolean
   */

  CanvasBoxConnector.prototype.isConnector = true;


  /*
   * Flag that controls if the relative menu is showing up
   * @type boolean
   */

  CanvasBoxConnector.prototype.booShowMenu = false;


  /*
   * Relative menu from the connectors
   * @type CanvasBoxMenu
   */

  CanvasBoxConnector.prototype.objMenu = null;


  /*
   * Flag of control if the Element is Fixed ( not moving )
   */

  CanvasBoxConnector.prototype.fixed = false;


  /*
   * Flag of control if Element is on DragDrop Event
   * @type boolean
   */

  CanvasBoxConnector.prototype.dragdrop = false;


  /*
   * Create a serializable version of this object
   * @return Object
   */

  CanvasBoxConnector.prototype.toSerialize = function() {
    var objResult;
    objResult = {
      x: this.x,
      y: this.y,
      dx: this.dx,
      dy: this.dy
    };
    objResult.objElementFrom = this.objBox.arrElements.indexOf(this.objElementFrom);
    objResult.objElementTo = this.objBox.arrElements.indexOf(this.objElementTo);
    objResult.strClassName = this.strClassName;
    return objResult;
  };


  /*
   * Load the Menu of Context of the Connector
   * @return void
   */

  CanvasBoxConnector.prototype.loadMenu = function() {
    this.objMenu = New.CanvasBoxMenu();
    this.objMenu.objParent = this;
    return this.objMenu.arrMenuItens = {
      0: {
        name: "clone connector",
        event: function(objParent) {
          return objParent.copy();
        }
      }
    };
  };


  /*
   * Initialize the Canvas Box Connector
   * 
   * @param CanvasBoxElement objElementFrom
   * @param CanvasBoxElement objElementTo
   * @return void
   */

  CanvasBoxConnector.prototype.initialize = function(objElementFrom, objElementTo) {
    this.objElementFrom = objElementFrom;
    this.objElementTo = objElementTo;
    return this.objBehavior = New.CanvasBoxConnectorBehavior(this);
  };


  /*
   * Refresh the Canvas Box Connector, changing it's position if necessary
   * @return void
   */

  CanvasBoxConnector.prototype.refresh = function() {};


  /*
   * Draw the Canvas Box Connector
   * @return void
   */

  CanvasBoxConnector.prototype.draw = function() {};


  /*
   * Mouse Over check
   * @return boolean
   */

  CanvasBoxConnector.prototype.isInside = function() {
    return false;
  };

  function CanvasBoxConnector(objElementFrom, objElementTo) {
    this.objElementFrom = objElementFrom;
    this.objElementTo = objElementTo;
    if (this.objElementFrom === null) {
      throw new CanvasBoxException("Canvas Box Line has no Element From on constructor");
    }
    if (this.objElementTo === null) {
      throw new CanvasBoxException("Canvas Box Line has no Element To on constructor");
    }
    this.x = (this.objElementFrom.x + this.objElementTo.x) / 2;
    this.y = (this.objElementFrom.y + this.objElementTo.y) / 2;
    this.objBehavior = New.CanvasBoxConnectorBehavior(this);
  }


  /*
   * On Connector Mouse Over Event
   * 
   * @param Event event
   * @return boolean
   */

  CanvasBoxConnector.prototype.onMouseOver = function(event) {
    return this.objBehavior.onMouseOver(event);
  };


  /*
   * On Connector Mouse Out Event
   * 
   * @param Event event
   * @return boolean
   */

  CanvasBoxConnector.prototype.onMouseOut = function(event) {
    return this.objBehavior.onMouseOut(event);
  };


  /*
   * On Connector Mouse Down Event
   * 
   * @param Event event
   * @return boolean
   */

  CanvasBoxConnector.prototype.onMouseDown = function(event) {
    return this.objBehavior.onMouseDown(event);
  };


  /*
   * On Connector Mouse Click Event
   * @param Event event
   * @return boolean
   */

  CanvasBoxConnector.prototype.onClick = function(event) {
    return this.objBehavior.onClick(event);
  };


  /*
   * On Connector Double Mouse Click Event
   * @param Event event
   * @return boolean
   */

  CanvasBoxConnector.prototype.onDblClick = function(event) {
    return this.objBehavior.onDblClick(event);
  };


  /*
   * On Drag Event
   * @param Event event
   * @return boolean
   */

  CanvasBoxConnector.prototype.onDrag = function(event) {
    return this.objBehavior.onDrag(event);
  };


  /*
   * On Drop Event
   * @param Event event
   * @return boolean
   */

  CanvasBoxConnector.prototype.onDrop = function(event) {
    return this.objBehavior.onDrop(event);
  };


  /*
   * On Timer Event
   * @param Event event
   * @return boolean
   */

  CanvasBoxConnector.prototype.onTimer = function(event) {
    return this.objBehavior.onTimer(event);
  };


  /*
   * On Context Menu Event
   * @param Event event
   * @return boolean
   */

  CanvasBoxConnector.prototype.onContextMenu = function(event) {
    this.objBox.booShowMenu = !this.objBox.booShowMenu;
    if (this.objBox.booShowMenu) {
      this.loadMenu();
      this.objMenu.intMenuX = this.objBox.mouseX;
      this.objMenu.intMenuY = this.objBox.mouseY;
      this.objMenu.objContext = this.objContext;
      this.objMenu.strActualMenuItem = null;
      this.objBox.objMenuSelected = this.objMenu;
    }
    return false;
  };


  /*
   * Get Force from Connector to some Element
   *
   * @param CanvasBoxElement
   * @return Object
   */

  CanvasBoxConnector.prototype.getForce = function(objElement) {
    return this.objBehavior.getForce(objElement);
  };


  /*
   * Clone some connector object
   */

  CanvasBoxConnector.prototype.clone = function(objConnector) {
    return this.cloneLine(objConnector);
  };


  /*
   * Choose betwen clone from the elements from and to or
   * link to a another connector
   */

  CanvasBoxConnector.prototype.cloneLine = function() {
    var objLine;
    this.intCloneCount++;
    if (this.intCloneCount > 0 && this.intCloneCount % 2 === 0) {
      objLine = New.CanvasBoxLine(this.objElementFrom, this);
      this.cloneConnector(objLine, true);
    } else {
      objLine = New.CanvasBoxLine(this, this.objElementTo);
      this.cloneConnector(objLine);
    }
    return objLine;
  };


  /*
   * Clone Connetor
   * @param CanvasBoxConnector
   * @return CanvasBoxConnector
   */

  CanvasBoxConnector.prototype.cloneConnector = function(objConnector, booReverse) {
    console.log("clone connector");
    if (!objConnector) {
      objConnector = New.CanvasBoxConnector(this, this.objElementTo);
    } else {
      objConnector.initialize(this, this.objElementTo);
    }
    objConnector.objBehavior = New[this.objBehavior.strClassName](objConnector);
    objConnector.x = this.x;
    objConnector.y = this.y;
    objConnector.side = this.defaultSide ? this.defaultSide : this.side;
    objConnector.color = this.defaultColor ? this.defaultColor : this.color;
    objConnector.borderColor = this.defaultBorderColor ? this.defaultBorderColor : this.borderColor;
    objConnector.borderWidth = this.defaultBorderWidth ? this.defaultBorderWidth : this.borderWidth;
    this.objBox.addElement(objConnector);
    if (!booReverse) {
      objConnector.objElementFrom = this;
      this.objElementTo = objConnector;
      if (this.objElementFrom) {
        this.objElementFrom.objElementTo = this;
      }
      if (this.objElementTo) {
        this.objElementTo.objElementFrom = this;
      }
      if (objConnector.objElementFrom) {
        objConnector.objElementFrom.objElementTo = objConnector;
      }
      if (objConnector.objElementTo) {
        objConnector.objElementTo.objElementFrom = objConnector;
      }
    } else {
      objConnector.objElementFrom = this.objElementFrom;
      objConnector.objElementTo = this;
      this.objElementFrom = objConnector;
      if (this.objElementTo) {
        this.objElementTo.objElementFrom = this;
      }
      if (this.objElementFrom) {
        this.objElementFrom.objElementTo = this;
      }
      if (objConnector.objElementTo) {
        objConnector.objElementTo.objElementFrom = objConnector;
      }
      if (objConnector.objElementFrom) {
        objConnector.objElementFrom.objElementTo = objConnector;
      }
    }
    return objConnector;
  };


  /*
   * Clone Element
   * @param CanvasBoxConnector
   * @return CanvasBoxConnector
   */

  CanvasBoxConnector.prototype.clone = function(objConnector) {
    return this.cloneConnector(objConnector);
  };


  /*
   * Event on Delete Element
   */

  CanvasBoxConnector.prototype.onDelete = function() {
    console.log("connector on delete");
    if (this.objElementFrom.isConnector) {
      this.objElementFrom.objElementTo = this.objElementTo;
    }
    if (this.objElementTo.isConnector) {
      return this.objElementTo.objElementFrom = this.objElementFrom;
    }
  };


  /*
   * Recursive Action into delete event
   */

  CanvasBoxConnector.prototype.deleteCascade = function() {
    this.deleteCascadeFrom();
    this.deleteCascadeTo();
    return this.objBox.deleteElement(this, false);
  };


  /*
   * Recursive Delete into the Element To Direction
   */

  CanvasBoxConnector.prototype.deleteCascadeTo = function() {
    console.log("delete cascade");
    if (is_object(this.objElementTo) && this.objElementTo.isConnector) {
      if (this.objElementTo.getId() !== -1) {
        this.objElementTo.deleteCascadeTo();
      }
      return this.objBox.deleteElement(this.objElementTo, false);
    }
  };


  /*
   * Recursive Delete into the Element From Direction
   */

  CanvasBoxConnector.prototype.deleteCascadeFrom = function() {
    if (is_object(this.objElementFrom) && this.objElementFrom.isConnector) {
      if (this.objElementFrom.getId() !== -1) {
        this.objElementFrom.deleteCascadeFrom();
      }
      return this.objBox.deleteElement(this.objElementFrom, false);
    }
  };


  /*
   * Copy a Connector
   */

  CanvasBoxConnector.prototype.copy = function() {
    var objConnector;
    objConnector = new window[this.strClassName]();
    return this.clone(objConnector);
  };


  /*
   * Get Id From Connector
   * @return integer
   */

  CanvasBoxConnector.prototype.getId = function() {
    return this.objBox.arrElements.indexOf(this);
  };

  CanvasBoxConnector.prototype.load = function() {};

  return CanvasBoxConnector;

})();

//# sourceMappingURL=maps/CanvasBoxConnector.js.map