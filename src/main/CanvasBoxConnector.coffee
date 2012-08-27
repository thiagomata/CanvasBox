###
# Canvas Box Connector
# 
# Canvas Box Connector is the element what create connections between
# Canvas Box Elements.
# 
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
###
class CanvasBoxConnector

    ###
    # Canvas Box owner of this object
    # @type CanvasBox
    ###
    objBox: null,

    ###
    # Canvas Box Element that this connector is going from
    # @type CanvasBoxElement
    ###
    objElementFrom: null,

    ###
    # Camvas Box Element that thi connector is going to
    # @type CanvasBoxElement
    ###
    objElementTo: null,

    ###
    # Position X of the connector inside the Canvas Box
    # @type integer
    ###
    x: 0,

    ###
    # Position Y of the connector inside the Canvas Box
    # @type integer
    ###
    y: 0,

    ###
    # Position Z of the connector inside the Canvas Box
    # @type integer
    ###
    z: 0,
    
    ###
    # Velocity into the X position
    # @type integer
    ###
    dx: 3,

    ###
    # Veolocity into the Y position
    # @type integer
    ###
    dy: 3,
    
    ###
    # Behavior of the Canvas Box Connector Element
    # 
    # @type CanvasBoxDefaultConnectorBehavior
    ###
    objBehavior: null,

    ###
    # Canvas 2D Context from the Canvas Box Container
    # @type CanvasRenderingContext2D
    ###
    objContext: null,

    ###
    # Class name of the Canvas Box Connector
    # @type string
    ###
    strClassName: "CanvasBoxConnector",
    
    ###
    # Flag that make easy diff the connectors from the regular elements
    # without type cast ( slow in javascript )
    # @type boolean
    ###
    isConnector: true,

    ###
    # Flag that controls if the relative menu is showing up
    # @type boolean
    ###
    booShowMenu: false,

    ###
    # Relative menu from the connectors
    # @type CanvasBoxMenu
    ###
    objMenu: null,
    
    ###
    # Flag of control if the Element is Fixed ( not moving )
    ###
    fixed: false,
    
    ###
    # Flag of control if Element is on DragDrop Event
    # @type boolean
    ###
    dragdrop: false,
    
    ###
    # Create a serializable version of this object
    # @return Object
    ###
    toSerialize:->
        objResult =
            x: @x
            y: @y
            dx: @dx
            dy: @dy
        objResult.objElementFrom = this.objBox.arrElements.indexOf( this.objElementFrom );
        objResult.objElementTo = this.objBox.arrElements.indexOf( this.objElementTo );
        objResult.strClassName = this.strClassName;
        return objResult;
      
    ###
    # Load the Menu of Context of the Connector
    # @return void
    ###
    loadMenu:->
        this.objMenu = New.CanvasBoxMenu();
        this.objMenu.objParent = this;
        this.objMenu.arrMenuItens = {
            0:{
                name: "clone connector",
                event:( objParent )->
                    objParent.copy();
            }
        };
    
    ###
    # Initialize the Canvas Box Connector
    # 
    # @param CanvasBoxElement objElementFrom
    # @param CanvasBoxElement objElementTo
    # @return void
    ###
    initialize:( objElementFrom , objElementTo )->
        this.objElementFrom = objElementFrom;
        this.objElementTo = objElementTo;
        this.objBehavior = New.CanvasBoxConnectorBehavior( this );

    ###
    # Refresh the Canvas Box Connector, changing it's position if necessary
    # @return void
    ###
    refresh:->
        # to be overhide #

    ###
    # Draw the Canvas Box Connector
    # @return void
    ###
    draw:->
        # to be overhide #

    ###
    # Mouse Over check
    # @return boolean
    ###
    isInside:->
        return false;

    ##
    # Create the Connector with the default behavior
    ##
    constructor:( @objElementFrom , @objElementTo )->
    
        if( @objElementFrom == null )
          throw new CanvasBoxException( "Canvas Box Line has no Element From on constructor" );

        if( @objElementTo == null )
          throw new CanvasBoxException( "Canvas Box Line has no Element To on constructor" );
    
        @x = ( @objElementFrom.x + @objElementTo.x ) / 2;
        @y = ( @objElementFrom.y + @objElementTo.y ) / 2;
        
        this.objBehavior = New.CanvasBoxConnectorBehavior( this );
        
    ###
    # On Connector Mouse Over Event
    # 
    # @param Event event
    # @return boolean
    ###
    onMouseOver:( event )->
        return this.objBehavior.onMouseOver( event );

    ###
    # On Connector Mouse Out Event
    # 
    # @param Event event
    # @return boolean
    ###
    onMouseOut:( event )->
        return this.objBehavior.onMouseOut( event );

    ###
    # On Connector Mouse Down Event
    # 
    # @param Event event
    # @return boolean
    ###
    onMouseDown:( event )->
        return this.objBehavior.onMouseDown( event );

    ###
    # On Connector Mouse Click Event
    # @param Event event
    # @return boolean
    ###
    onClick:( event )->
        return this.objBehavior.onClick( event );

    ###
    # On Connector Double Mouse Click Event
    # @param Event event
    # @return boolean
    ###
    onDblClick:( event )->
        return this.objBehavior.onDblClick( event );

    ###
    # On Drag Event
    # @param Event event
    # @return boolean
    ###
    onDrag:( event )->
        return this.objBehavior.onDrag( event );

    ###
    # On Drop Event
    # @param Event event
    # @return boolean
    ###
    onDrop:( event )->
        return this.objBehavior.onDrop( event );

    ###
    # On Timer Event
    # @param Event event
    # @return boolean
    ###
    onTimer:( event )->
        return this.objBehavior.onTimer( event );

    ###
    # On Context Menu Event
    # @param Event event
    # @return boolean
    ###
    onContextMenu:( event )->
        this.objBox.booShowMenu = not this.objBox.booShowMenu;
        if( this.objBox.booShowMenu )
            this.loadMenu();
            this.objMenu.intMenuX = this.objBox.mouseX;
            this.objMenu.intMenuY = this.objBox.mouseY;
            this.objMenu.objContext = this.objContext;
            this.objMenu.strActualMenuItem = null;
            this.objBox.objMenuSelected = this.objMenu;
        return false;
    
    ###
    # Get Force from Connector to some Element
    #
    # @param CanvasBoxElement
    # @return Object
    ###
    getForce:( objElement )->
        return this.objBehavior.getForce( objElement );
    
    ###
    # Clone some connector object
    ###
    clone:( objConnector )->
        return this.cloneLine( objConnector );

    ###
    # Choose betwen clone from the elements from and to or
    # link to a another connector
    ###
    cloneLine:->
        this.intCloneCount++;
        if( this.intCloneCount > 0 && this.intCloneCount % 2 == 0 )
            objLine = New.CanvasBoxLine( this.objElementFrom , this );
            this.cloneConnector( objLine , true );
        else
            objLine = New.CanvasBoxLine( this , this.objElementTo );
            this.cloneConnector( objLine );
        return objLine;

    ###
    # Clone Connetor
    # @param CanvasBoxConnector
    # @return CanvasBoxConnector
    ###
    cloneConnector:( objConnector , booReverse )->
        console.log( "clone connector");
        
        if( not objConnector )
            objConnector = New.CanvasBoxConnector( this , this.objElementTo );
        else
            objConnector.initialize( this , this.objElementTo );

        objConnector.objBehavior = New[ this.objBehavior.strClassName ]( objConnector );
        objConnector.x =  this.x;
        objConnector.y =  this.y;
        objConnector.side = if this.defaultSide then this.defaultSide else this.side;
        objConnector.color = if this.defaultColor then this.defaultColor else this.color;
        objConnector.borderColor = if this.defaultBorderColor then this.defaultBorderColor else this.borderColor;
        objConnector.borderWidth = if this.defaultBorderWidth then this.defaultBorderWidth else this.borderWidth;
        this.objBox.addElement( objConnector );
        if( not booReverse )
            objConnector.objElementFrom = this;
            this.objElementTo = objConnector;
            if( this.objElementFrom )
                this.objElementFrom.objElementTo = this;
            if( this.objElementTo )
                this.objElementTo.objElementFrom = this;
            if( objConnector.objElementFrom )
                objConnector.objElementFrom.objElementTo = objConnector;
            if( objConnector.objElementTo )
                objConnector.objElementTo.objElementFrom = objConnector;
        else
            objConnector.objElementFrom = this.objElementFrom;
            objConnector.objElementTo = this;
            this.objElementFrom = objConnector;
            if( this.objElementTo )
                this.objElementTo.objElementFrom = this;
            if( this.objElementFrom )
                this.objElementFrom.objElementTo = this;
            if( objConnector.objElementTo )
                objConnector.objElementTo.objElementFrom = objConnector;
            if( objConnector.objElementFrom )
                objConnector.objElementFrom.objElementTo = objConnector;
        return objConnector;

    ###
    # Clone Element
    # @param CanvasBoxConnector
    # @return CanvasBoxConnector
    ###
    clone:( objConnector )->
        return this.cloneConnector( objConnector );

    ###
    # Event on Delete Element
    ###    
    onDelete:->
        if( this.objElementFrom.isConnector )
            this.objElementFrom.objElementTo = this.objElementTo;
        if( this.objElementTo.isConnector )
            this.objElementTo.objElementFrom = this.objElementFrom;
    
    ###
    # Recursive Action into delete event
    ###
    deleteCascade:->
        this.deleteCascadeFrom();
        this.deleteCascadeTo();
        this.objBox.deleteElement( this , false );
    
    ###
    # Recursive Delete into the Element To Direction
    ###
    deleteCascadeTo:->
        if( is_object( this.objElementTo ) && this.objElementTo.isConnector )
            if( this.objElementTo.getId() != -1 )
                this.objElementTo.deleteCascadeTo();
            this.objBox.deleteElement( this.objElementTo , false );
    
    ###
    # Recursive Delete into the Element From Direction
    ###
    deleteCascadeFrom:->
        if( is_object( this.objElementFrom ) && this.objElementFrom.isConnector )
            if( this.objElementFrom.getId() != -1 )
                this.objElementFrom.deleteCascadeFrom();
            this.objBox.deleteElement( this.objElementFrom , false );
  
    ###
    # Copy a Connector
    ###
    copy:->
        objConnector = new window[ this.strClassName ]();
        this.clone( objConnector );
  
    ###
    # Get Id From Connector
    # @return integer
    ###  
    getId:->
        return this.objBox.arrElements.indexOf( this );

    ##
    # Load the connector
    ##
    load:->
        # nothing great #
        