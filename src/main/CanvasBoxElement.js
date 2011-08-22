var CanvasBoxElement;
CanvasBoxElement = (function() {
  function CanvasBoxElement() {}
  /*
      # Canvas Box owner of this object
      # @type CanvasBox
      */
  CanvasBoxElement.prototype.objBox = null;
  /*
      # Position X of the Element inside the Canvas Box
      # @type integer
      */
  CanvasBoxElement.prototype.x = 0;
  /*
      # Position Y of the Element inside the Canvas Box
      # @type integer
      */
  CanvasBoxElement.prototype.y = 0;
  /*
      # Position Z of the Element inside the Canvas Box
      # @type integer
      */
  CanvasBoxElement.prototype.z = 1;
  /*
      # Velocity into the X position
      # @type integer
      */
  CanvasBoxElement.prototype.dx = 0;
  /*
      # Veolocity into the Y position
      # @type integer
      */
  CanvasBoxElement.prototype.dy = 0;
  /*
      # Behavior of the Canvas Box Element
      # 
      # @type CanvasBoxDefaultElementBehavior
      */
  CanvasBoxElement.prototype.objBehavior = null;
  /*
      # Canvas 2D Context from the Canvas Box Container
      # @type CanvasRenderingContext2D
      */
  CanvasBoxElement.prototype.objContext = null;
  /*
      # Class name of the Canvas Box Element
      # @type string
      */
  CanvasBoxElement.prototype.strClassName = "CanvasBoxElement";
  /*
      #  Flag that make easy diff the connectors from the regular elements
      #  without type cast ( slow in javascript )
      #  @type boolean
      */
  CanvasBoxElement.prototype.isConnector = false;
  /*
      # Flag that controls if the relative menu is showing up
      # @type boolean
      */
  CanvasBoxElement.prototype.booShowMenu = false;
  /*
      # Relative menu from the Elements
      # @type CanvasBoxMenu
      */
  CanvasBoxElement.prototype.objMenu = null;
  /*
      # Flag of control if the Element is Fixed ( not moving )
      # @type boolean
      */
  CanvasBoxElement.prototype.fixed = false;
  /*
      # Flag of control if Element is on DragDrop Event
      # @type boolean
      */
  CanvasBoxElement.prototype.booDrag = false;
  /*
      # Context Element Menu
      # @type CanvasBoxMenu
      */
  CanvasBoxElement.prototype.objMenu = null;
  /*
      # Flag of mouse over status
      # @type boolean
      */
  CanvasBoxElement.prototype.booMouseOver = false;
  /*
      # Visual Buttons to interact with the element without
      # the menu use.
      */
  CanvasBoxElement.prototype.arrButtons = null;
  CanvasBoxElement.prototype.intMass = 1;
  /*
      # Create a serializable version of this object
      # @return Object
      */
  CanvasBoxElement.prototype.toSerialize = function() {
    objResult({
      x: this.x,
      y: this.y,
      mass: this.intMass,
      strClassName: strClassName
    });
    return objResult;
  };
  /*
      # Init of the Canvas Box Element
      # 
      # Apply the default objects and values
      */
  CanvasBoxElement.prototype.init = function() {
    return this.objBehavior = New.CanvasBoxDefaultBehavior(this);
  };
  /*
      # Initialize the Canvas Box Element
      #
      # For default, just call the init
      */
  CanvasBoxElement.prototype.construct = function() {
    return this.init();
  };
  /*
      # Refresh the Canvas Box Element, changing it's position attributes if necessary
      # @return CanvasBoxElement me
      */
  CanvasBoxElement.prototype.refresh = function() {
    return this;
  };
  /*
      # Draw the Canvas Box Element
      # @return CanvasBoxElement me
      */
  CanvasBoxElement.prototype.draw = function() {
    throw new CanvasBoxException("Draw Method was not properly defined in the {@strClassName}");
    return this;
  };
  /*
      # On Element Mouse Over Event
      # 
      # @param Event event
      # @return boolean
      */
  CanvasBoxElement.prototype.onMouseOver = function(event) {
    this.booMouseOver = true;
    return this.objBehavior.onMouseOver(event);
  };
  /*
      # On Element Mouse Out Event
      # 
      # @param Event event
      # @return boolean
      */
  CanvasBoxElement.prototype.onMouseOut = function(event) {
    this.booMouseOver = false;
    return this.objBehavior.onMouseOut(event);
  };
  /*
      # On Element Mouse Down Event
      # 
      # @param Event event
      # @return boolean
      */
  CanvasBoxElement.prototype.onMouseDown = function(event) {
    return this.objBehavior.onMouseDown(event);
  };
  CanvasBoxElement.prototype.isActive = function() {
    return this.intMass !== 0 && (this.objBox.objElementSelected === null || this.objBox.objElementSelected === this);
  };
  /*
      # On Element Mouse Click Event
      # @param Event event
      # @return boolean
      */
  CanvasBoxElement.prototype.onClick = function(event) {
    var objButton, _i, _len, _ref;
    if (!this.booDrag && this.isActive()) {
      _ref = this.arrButtons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        objButton = _ref[_i];
        if (objButton.booMouseOver) {
          return objButton.onClick(event);
        }
      }
    }
    return this.objBehavior.onClick(event);
  };
  /*
      # On Element Double Mouse Click Event
      # @param Event event
      # @return boolean
      */
  CanvasBoxElement.prototype.onDblClick = function(event) {
    return this.objBehavior.onDblClick(event);
  };
  /*
      # On Drag Event
      # @param Event event
      # @return boolean
      */
  CanvasBoxElement.prototype.onDrag = function(event) {
    var objButton, _i, _len, _ref;
    this.booDrag = true;
    if (this.isActive) {
      _ref = this.arrButtons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        objButton = _ref[_i];
        if (objButton.booMouseOver) {
          return objButton.onDrag(event);
        }
      }
    }
    return this.objBehavior.onDrag(event);
  };
  /*
      # On Drop Event
      # @param Event event
      # @return boolean
      */
  CanvasBoxElement.prototype.onDrop = function(event) {
    var arrConnectors, objConnector;
    this.booDrag = false;
    if (this.intMass === 0) {
      arrConnectors = this.getConnectors();
      if (arrConnectors.length === 1 && (this.objBox.objElementOver !== this)) {
        objConnector = arrConnectors[0];
        if (objConnector.objElementFrom === this) {
          objConnector.objElementFrom = this.objBox.objElementOver;
        }
        if (objConnector.objElementTo === this) {
          objConnector.objElementTo = this.objBox.objElementOver;
        }
        this.objBox.deleteElement(this);
      }
    }
    this.intMass = 1;
    return this.objBehavior.onDrop(event);
  };
  /*
      # On Timer Event
      # @param Event event
      # @return boolean
      */
  CanvasBoxElement.prototype.onTimer = function(event) {
    return this.objBehavior.onTimer(event);
  };
  /*
      # On Context Menu Event
      # @param Event event
      # @return boolean
      */
  CanvasBoxElement.prototype.onContextMenu = function(event) {
    this.objBox.booShowMenu = !this.objBox.booShowMenu;
    if (this.objBox.booShowMenu) {
      this.objMenu.intMenuX = this.objBox.mouseX;
      this.objMenu.intMenuY = this.objBox.mouseY;
      this.objMenu.objBox = this.objBox;
      this.objMenu.strActualMenuItem = null;
      this.objBox.objMenuSelected = this.objMenu;
    }
    return false;
  };
  /*
      # Get Force from Element
      #
      # @param CanvasBoxElement
      # @return Object
      */
  CanvasBoxElement.prototype.getForce = function(objBoxElement) {
    return this.objBehavior.getForce(objBoxElement);
  };
  CanvasBoxElement.prototype.getConnectors = function() {
    var objElement, _i, _len, _ref;
    _ref = this.objBox.arrElements;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      if (is_object(objElement) && (objElement.objElementFrom === this || objElement.objElementTo === this)) {
        arrConnection.push(objElement);
      }
    }
    return arrConnection;
  };
  /*
      # Event on Delete Element
      #
      # @param event
      # @return CanvasBoxElement me
      */
  CanvasBoxElement.prototype.onDelete = function(event) {
    var objElement, _i, _len, _ref;
    _ref = this.getConnectors();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      objElement = _ref[_i];
      objElement.deleteCascade();
    }
    return this;
  };
  /*
      # Get Id From Element
      # @return integer
      */
  CanvasBoxElement.prototype.getId = function() {
    return this.objBox.arrElements.indexOf(this);
  };
  /*
      # Copy a Element
      #
      # @return CanvasBoxElement the new element
      */
  CanvasBoxElement.prototype.copy = function() {
    var objElement;
    objElement = New[this.strClassName]();
    objElement.objBehavior = New[this.objBehavior.strClassName](objElement);
    objElement.x = Math.random() * this.objBox.width;
    objElement.y = Math.random() * this.objBox.height;
    this.objBox.addElement(objElement);
    return objElement;
  };
  CanvasBoxElement.prototype.select = function() {
    this.objBox.objElementSelected = this;
    this.mass = 0;
    return this;
  };
  CanvasBoxElement.prototype.load = function() {
    if (this.objMenu !== null) {
      this.objMenu.objBox = this.objBox;
    }
    return this;
  };
  CanvasBoxElement.prototype.setFixed = function(fixed) {
    this.fixed = fixed;
    this.draw();
    return this;
  };
  CanvasBoxElement.prototype.goUp = function() {
    this.setFixed(true);
    this.y -= 10;
    return this;
  };
  CanvasBoxElement.prototype.goDown = function() {
    this.setFixed(true);
    this.y += 10;
    return this;
  };
  CanvasBoxElement.prototype.goLeft = function() {
    this.setFixed(true);
    this.x -= 10;
    return this;
  };
  CanvasBoxElement.prototype.goRight = function() {
    this.setFixed(true);
    this.x += 10;
    return this;
  };
  CanvasBoxElement.prototype.isInsideElement = function(mouseX, mouseY) {
    throw new CanvasBoxException("isInsideElement was not properly defined in the {@strClassName}");
  };
  CanvasBoxElement.prototype.isInside = function(mouseX, mouseY) {
    var booResult, objButton, _i, _len, _ref;
    booResult = false;
    this.refresh();
    if (this.isInsideElement(mouseX, mouseY)) {
      booResult = true;
    }
    if (this.isActive()) {
      _ref = this.arrButtons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        objButton = _ref[_i];
        if (objButton.isInside(mouseX, mouseY)) {
          booResult = true;
        }
      }
    }
    return booResult;
  };
  CanvasBoxElement.prototype.addButton = function(objButton) {
    var objLast;
    if (this.arrButtons.length > 0) {
      objLast = this.arrButtons[this.arrButtons.length - 1];
      objButton.objPreviousButton = objLast;
    }
    this.arrButtons.push(objButton);
    return this;
  };
  return CanvasBoxElement;
})();