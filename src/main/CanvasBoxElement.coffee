class CanvasBoxElement
    ###
    # Canvas Box owner of this object
    # @type CanvasBox
    ###
    objBox: null

    ###
    # Position X of the Element inside the Canvas Box
    # @type integer
    ###
    x: 0

    ##
    # Relative Distance Between X position of cursor
    ##
    relativeMousex: 0

    ###
    # Position Y of the Element inside the Canvas Box
    # @type integer
    ###
    y: 0

    ##
    # Relative Distance Between X position of cursor
    ##
    relativeMousey: 0

    ###
    # Position Z of the Element inside the Canvas Box
    # @type integer
    ###
    z: 1
        
    ###
    # Velocity into the X position
    # @type integer
    ###
    dx: 0

    ###
    # Velocity into the Y position
    # @type integer
    ###
    dy: 0
    
    ###
    # Behavior of the Canvas Box Element
    # 
    # @type CanvasBoxDefaultElementBehavior
    ###
    objBehavior: null;

    ###
    # Canvas 2D Context from the Canvas Box Container
    # @type CanvasRenderingContext2D
    ###
    objContext: null

    ###
    # Class name of the Canvas Box Element
    # @type string
    ###
    strClassName: "CanvasBoxElement"
    
    ###
    #  Flag that make easy diff the connectors from the regular elements
    #  without type cast ( slow in javascript )
    #  @type boolean
    ###
    isConnector: false

    ###
    # Flag that controls if the relative menu is showing up
    # @type boolean
    ###
    booShowMenu: false

    ###
    # Relative menu from the Elements
    # @type CanvasBoxMenu
    ###
    objMenu: null

    ###
    # Flag of control if the Element is Fixed ( not moving )
    # @type boolean
    ###
    fixed: false

    ###
    # Flag of control if Element is on DragDrop Event
    # @type boolean
    ###
    booDrag: false

    ###
    # Context Element Menu
    # @type CanvasBoxMenu
    ###
    objMenu: null,

    ###
    # Flag of mouse over status
    # @type boolean
    ###
    booMouseOver: false,

    ###
    # Visual Buttons to interact with the element without
    # the menu use.
    # @type CanvasBoxButton[]
    ###
    arrButtons: Array(),

    ##
    # Element Mass can be used by some canvas box behaviors
    # @type integer
    ##
    intMass: 1

    ##
    # Rotate the element
    # @type double
    ##
    dblRotate: 0

    ###
    # Create a serializable version of this object
    # @return Object
    ###
    toSerialize:->
        objResult {
            x: @x
            y: @y
            mass: @intMass
            strClassName: strClassName
        };
        return objResult;

    ###
    # Init of the Canvas Box Element
    # 
    # Apply the default objects and values
    ###
    init:->
        @objBehavior = New.CanvasBoxBehavior( this );
    
    ###
    # Initialize the Canvas Box Element
    #
    # For default, just call the init
    ###
    constructor:->
        @init();

    ###
    # Refresh the Canvas Box Element, changing it's position attributes if necessary
    # @return CanvasBoxElement me
    ###
    refresh:->
        # to be overhide #
        @objBox.change()
        return this;

    ###
    # On Draw event 
    # @return CanvasBoxElement me
    ###
    onDraw:->
        @draw();
        return this;

    ##
    # Change the context of the pencil of canvas to the element
    #
    # Pretty cool to make simple to draw rotated elements
    ##
    changeContext:->
        @objBox.moveTo( this.x , this.y );
        @objBox.saveContext();
        @objBox.translate( this.x , this.y );
        @objBox.rotate( @dblRotate ) if ( @dblRotate % ( 2 * Math.PI ) != 0 );
        return this;
        
    ##
    # Restore the context of the parent box
    ##
    restoreContext:->
        @objBox.restoreContext();
        return this;

    ###
    # Draw the Canvas Box Element
    # @return CanvasBoxElement me
    ###
    draw:->
        throw New.CanvasBoxException( "Draw Method was not properly defined in the #{strClassName}" );
        # to be overhide #
        return this;

    ###
    # On Element Mouse Over Event
    # 
    # @param Event event
    # @return boolean
    ###
    onMouseOver:( event )->
        @booMouseOver = true;
        return @objBehavior.onMouseOver( event );

    ###
    # On Element Mouse Out Event
    # 
    # @param Event event
    # @return boolean
    ###
    onMouseOut:( event )->
        @booMouseOver = false;
        return @objBehavior.onMouseOut( event );

    ###
    # On Element Mouse Down Event
    # 
    # @param Event event
    # @return boolean
    ###
    onMouseDown:( event )->
        return @objBehavior.onMouseDown( event );

    ###
    # On Element Mouse Over Event
    # 
    # @param Event event
    # @return boolean
    ###
    onMouseOver:( event )->
        return @objBehavior.onMouseOver( event );

    ##
    # Return if the element is active
    #
    # Return true if this element is the selected one or if there is no
    # element selected
    ##
    isActive:()->
        return @intMass != 0 && 
        (   @objBox.objElementSelected == null or 
            @objBox.objElementSelected == this )
        
    ###
    # On Element Mouse Click Event
    # @param Event event
    # @return boolean
    ###
    onClick:( event )->
        if  not @booDrag && @isActive()
            for objButton in @arrButtons
                if objButton.booMouseOver
                    return objButton.onClick( event );

        return @objBehavior.onClick( event );

    ###
    # On Element Double Mouse Click Event
    # @param Event event
    # @return boolean
    ###
    onDblClick:( event )->
        return @objBehavior.onDblClick( event );

    ###
    # On Drag Event
    # @param Event event
    # @return boolean
    ###
    onDrag:( event )->
        @booDrag = true;

        if  @isActive
            for objButton in @arrButtons
                if( objButton.booMouseOver )
                    return objButton.onDrag( event );

        return @objBehavior.onDrag( event );

    ###
    # On Drop Event
    # @param Event event
    # @return boolean
    ###
    onDrop:( event )->
        @booDrag = false;
        return @objBehavior.onDrop( event );
    
    ###
    # On Timer Event
    # @param Event event
    # @return boolean
    ###
    onTimer:( event )->
        return @objBehavior.onTimer( event );

    ###
    # On Context Menu Event
    # @param Event event
    # @return boolean
    ###
    onContextMenu:( event )->
        @objBox.booShowMenu = !@objBox.booShowMenu;
        if( @objBox.booShowMenu )
            @objMenu.intMenuX = @objBox.mouseX;
            @objMenu.intMenuY = @objBox.mouseY;
            @objMenu.objBox = @objBox;
            @objMenu.strActualMenuItem = null;
            @objBox.objMenuSelected = @objMenu;
        return false;
    
    ###
    # Get Force from Element
    #
    # @param CanvasBoxElement
    # @return Object
    ###
    getForce:( objBoxElement )->
        return @objBehavior.getForce( objBoxElement );

    ##
    # Get the connectors what point to this element
    #
    # @return CanvasBoxConnector[]
    ##
    getConnectors:->
        console.log( "get connectors" );
        arrConnection = [];
        for objElement in @objBox.arrElements
            if      php.is_object( objElement ) and
                    (   objElement.objElementFrom == this or 
                        objElement.objElementTo == this ) and
                    objElement != this
                arrConnection.push( objElement );
        #console.log( "element has #{arrConnection.length} connections" );
        return arrConnection;

    ###
    # Event on Delete Element
    #
    # @param event
    # @return CanvasBoxElement me
    ###    
    onDelete:( event )->
        #console.log( "into on delete" );
        for objElement in @getConnectors()
            objElement.deleteCascade();
        return this;
    
    ###
    # Get Id From Element
    # @return integer
    ###  
    getId:->
        return @objBox.arrElements.indexOf( this );
    
    ###
    # Copy a Element
    #
    # @return CanvasBoxElement the new element
    ###
    copy:->
        objElement = New[ @strClassName ]();
        objElement.objBehavior = New[ @objBehavior.strClassName ]( objElement );
        objElement.x = Math.random() *  @objBox.width ;
        objElement.y = Math.random() * @objBox.height ;
        @objBox.addElement( objElement );
        return objElement

    ##
    # On Select Element Event
    # @return CanvasBoxElement me
    ##
    select:->
        @objBox.objElementSelected = this;
        @mass = 0;
        return this;

    ##
    # On Load Element Event
    # @return CanvasBoxElement me
    ##
    load:->
        if( @objMenu != null )
            @objMenu.objBox = @objBox;
        if( @objBehavior != null )
            @objBehavior.objBox = @objBox;
        return this;

    ##
    # Set Fixed Element Event
    # @return CanvasBoxElement me
    ##
    setFixed:( @fixed )->
        @draw();
        return this;

    ##
    # Go Up Element Event
    # @return CanvasBoxElement me
    ## 
    goUp:->
        @setFixed( true );
        @y -= 10;
        return this;

    ##
    # Go Down Element Event
    # @return CanvasBoxElement me
    ## 
    goDown:->
        @setFixed( true );
        @y += 10;
        return this;

    ##
    # Go Left Element Event
    # @return CanvasBoxElement me
    ## 
    goLeft:->
        @setFixed( true );
        @x -= 10;
        return this;

    ##
    # Go Right Element Event
    # @return CanvasBoxElement me
    ## 
    goRight:->
        @setFixed( true );
        @x += 10;
        return this

    ##
    # Returns if the Mouse is Over the Element
    #
    # @param mouseX integer horizontal position of cursor pointer
    # @param mouseY integer vertical position of the cursor pointer
    # @return boolean
    ## 
    isInsideElement:( mouseX , mouseY )->
        throw new CanvasBoxException( "isInsideElement was not properly defined in the #{strClassName}" );

    ##
    # Returns if the Mouse is Over the Element, or some of it's buttons
    #
    # @param mouseX integer horizontal position of cursor pointer
    # @param mouseY integer vertical position of the cursor pointer
    # @return boolean
    ## 
    isInside:( mouseX , mouseY )->
        booResult = false;
        @refresh();
        if  @isInsideElement( mouseX , mouseY )
            booResult = true;

        if  @isActive()
            for objButton in @arrButtons
                if( objButton.isInside( mouseX , mouseY ) )
                    # all the buttons should be checked even
                    # if we know the result is true
                    # because this will change the mouseover
                    # of some buttons
                    booResult = true;

        return booResult


    ##
    # Add a new Button into the 
    #
    # @param objButton CanvasBoxButton
    # @return CanvasBoxElement me
    ##
    addButton:( objButton )->
        if( @arrButtons.length > 0 )
            objLast = @arrButtons[ @arrButtons.length - 1 ];
            objButton.objPreviousButton = objLast;
        @arrButtons.push( objButton );
        return this;
        
    killMe:()->
        console.log("kill me");
        @objBox.deleteElement( this );
