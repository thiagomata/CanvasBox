###
# Controls the events into the canvas object emulating some 
# event-based interactions with the virtual canvas box elements
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
# @see CanvasBoxElement
# @see CanvasBoxButton
###
Load.canvas.CanvasBoxException();
class CanvasBox

    ###
    # Zoom Distance
    ###
    dblZoom: 1

    ###
    # Counter of Stand By Frames
    ###
    intCounterStandyBy: 0

    ###
    # Position x of the Canvas Box Element relative to the page
    # @type integer
    ###
    x: 0
    
    ###
    # Position y of the Canvas Box Element relative to the page
    # @type integer
    ###
    y: 0

    ###
    # Id of the Box, to deal with many canvas box into the same page
    # @type integer
    ###
    id: null

    ###
    # width of the Sand Box
    # @type integer
    ###
    width: 400

    ###
    # Height of the Sand Box
    # @type integer
    ###
    height: 400

    ###
    # Width of the Sand Box
    # @type integer
    ###
    defaultWidth: 400

    ###
    # Height of the Sand Box
    # @type integer
    ###
    defaultHeight: 400

    ###
    # Html Canvas Box Element
    # @type Canvas
    ###
    objCanvasHtml: null

    ###
    # Collection of Elements inside the Box
    # @type CanvasBoxElement[]
    ###
    arrElements: Array()

    ###
    # Collection of CanvasButtons of the Box
    # 
    # @type CanvasBoxButton[]
    ###
    arrButtons: Array()
    
    ###
    # CanvasBoxElement Over
    # @type CanvasBoxElement
    ###
    objElementOver: null,

    ###
    # CanvasBoxElement Clicked
    # @type CanvasBoxElement
    ###
    objElementClicked: null

    ###
    # Interval of Image Refreshing
    # @type integer
    ###
    intIntervalDraw: 0

    ###
    # Interval of Objects Timers
    # @type integer
    ###
    intIntervalTimer: 1

    ###
    # Control if the refreshing is active or not
    # @type boolean
    ###
    booActive: false
    
    ###
    # Mouse X position relative to canvas box
    # @integer
    ###
    mouseX: 0
    
    ###
    # Mouse Y position relative to canvas box
    # @integer
    ###
    mouseY: 0
    
    ###
    # Flag of control if the canvas box is drawing right now
    # @type boolean
    ###
    booOnDraw: false

    ###
    # Flag of control if the canvas box is moving right now
    ###
    booOnTimer: false

    ###
    # Flag of the on change event
    ###
    booChanged: true
    
    ###
    # Flag of the mouse over event
    ###
    booMouseOver: true

    ###
    # Flag of Draw event 
    ###
    booDrawBoxMenu: true
    
    ###
    # Javascript constant of right button click
    ###
    intRightButtonClick: 2

    ###
    # Class Name of the Canvas Box
    # @type string
    ###
    strClassName: "CanvasBox"

    ###
    # Frames per Second Counter
    # @type integer
    ###
    intFps: 0

    ###
    # Frames per Second Last Result
    # @type integer
    ###
    intLastFps: 0

    ###
    # Flag that controls if the FPS counter is active
    ###
    booCountFps: false
    
    ###
    # Background Color of the Canvas Box
    ###
    backgroundColor: "white"

    ###
    # Flag that controls if the menu is showing
    ###
    booShowMenu: false

    ###
    # Native Menu element of the Canvas Box
    ###
    objMenu: null

    ###
    # Actual Menu Element of the Canvas
    ###
    objMenuSelected: null

    intTimeoutTimer: null

    intTimeoutDraw: null

    intTimeoutFPS: null

    ###
    # Get the client width fixing browsers missing standarts
    # @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
    ###
    clientWidth: ->
        return CanvasBox::filterResults(
            window.innerWidth ?= 0,
            document.documentElement ?= 0,
            document.body ?= 0
        );

    toSerialize: ->
        objResult = new Object();
        objResult.x = @x;
        objResult.y = @y;
        objResult.width = @width;
        objResult.height = @height;
        objResult.objCanvasHtml = @objCanvasHtml;
        objResult.intIntervalDraw = @intIntervalDraw;
        objResult.booActive = @booActive;
        objResult.booOnDraw = @booOnDraw;
        objResult.arrElements = @arrElements;
        return objResult;

    ###
    # Method that defined the Native Menu of the Canvas Box.
    # 
    # This menu will be see when the user right click into some
    # empty area of the canvas box 
    # 
    # @return CanvasBox
    ###
    defineMenu: ->
        @objMenu = null
        @objMenuSelected = null;
        return this;

    ###
    # Calculates the absolute position of the canvas box object based
    # on the position of the parents objects
    # 
    # @return CanvasBox
    ###
    getPosition: ->
        x = @objCanvasHtml.offsetLeft;
        y = @objCanvasHtml.offsetTop;
        objElement = @objCanvasHtml;

        while( objElement.offsetParent )
            if( objElement == document.getElementsByTagName( 'body' )[0] )
                break;
            else
                x =  x + objElement.offsetParent.offsetLeft;
                y =  y + objElement.offsetParent.offsetTop;
                objElement = objElement.offsetParent;
        @x = x;
        @y = y;
        return this;

    ###
    # Change the background color
    #
    # @param strNewBackgroundColor string 
    # @return CanvasBox
    ###
    setBackgroundColor:(strNewBackgroundColor)->
        @backgroundColor = strNewBackgroundColor;
        @objCanvasHtml.style.backgroundColor = @backgroundColor;
        return this

    ###
    # Initialize the Canvas Box
    #
    # - Validate the canvas html element
    # - set the width and the height into the canvas html element
    #
    # @param idCanvasHtmlElement string
    # @throws CanvasBoxException
    # 
    # @return CanvasBox
    ###
    constructor: ( idCanvasHtmlElement , intWidth = 400 , intHeight = 400)->
        console.log( "canvasbox constructor #{idCanvasHtmlElement}" )
        
        @defaultWidth = intWidth;
        @defaultHeight = intHeight;
        @width = @defaultWidth / @dblZoom;
        @height = @defaultHeight / @dblZoom;
        @id = CanvasBox::arrInstances.length;
        CanvasBox::arrInstances[ @id ] = this;

        @objCanvasHtml = document.getElementById( idCanvasHtmlElement );
        if( @objCanvasHtml == null )
            throw New.canvas.CanvasBoxException( "Invalid canvas html element id [" + idCanvasHtmlElement + "]" );
        @getPosition();

        strWidth = "#{@defaultWidth}px";
        @objCanvasHtml.setAttribute( "width" ,  strWidth );
        #@objCanvasHtml.style.width = strWidth;
        #@objCanvasHtml.width = strWidth;

        strHeight = "#{@defaultHeight}px";
        @objCanvasHtml.setAttribute( "height" , strHeight );
        #@objCanvasHtml.style.height = strHeight;
        #@objCanvasHtml.height = strHeight;

        @objCanvasHtml.setAttribute( "contentEditable" , "true");
        @objCanvasHtml.contentEditable = true;

        @objCanvasHtml.addEventListener(
            'mousemove', 
            (event) =>
                @onMouseMove( event );
        )
        
        @objCanvasHtml.addEventListener(
            'click' , 
            (event) =>
                @onClick( event );
        )

        @objCanvasHtml.addEventListener( 
            'dblclick' , 
            (event) =>
                @onDblClick( event );
        )

        @objCanvasHtml.addEventListener( 
            'mouseup' , 
            (event) =>
                @onMouseUp( event );
        )

        @objCanvasHtml.addEventListener(
            'mousedown',
            (event) =>
                @onMouseDown( event );
        )

        @objCanvasHtml.addEventListener(
            'contextmenu',
            (event) =>
                @onContextMenu( event );
        )

        @objCanvasHtml.addEventListener( 
            'keyup',
            (event) =>
                @onKeyUp( event );
        )

        @objCanvasHtml.addEventListener(
            'mouseout',
            (event) =>
                @onMouseOut( event );
        )

        @objCanvasHtml.addEventListener(
            'mouseover',
            (event) =>
                @onMouseOver( event );
        )

        @defineMenu();
        @play();

        ###
        @objBox = this;
        objButton = New.CanvasBoxZoomInButton( this );
        @addButton( objButton );
        objButton = New.CanvasBoxZoomOutButton( this );
        @addButton( objButton );
        objButton = New.CanvasBoxExportButton( this );
        @addButton( objButton );
        objButton = New.CanvasBoxSaveButton( this );
        @addButton( objButton );        
        ###
        @init();

        return this;

    ###
    # The extended version of the constructor without the need of parent method call.
    #
    # in the parent, do nothing
    ###
    init:()->
        # do nothing

    ###
    # Add a CanvasBoxElement intot he CanvasBox
    #
    # @param objElement CanvasBoxElement
    ###
    addElement: ( objElement )->
        @arrElements.push( objElement );
        objElement.objBox = this;
        objElement.objContext = @getContext();
        objElement.load();
        
    ###
    # Get the Context of the Canvas Html Element
    # @return CanvasRenderingContext2D
    ###
    getContext: ->
        objContext = @objCanvasHtml.getContext( '2d' );
        return objContext;
        
    ###
    # Clear the image into the Canvas Html Element Context
    ###
    clear: ->
        objContext = @getContext();
        objContext.clearRect( 
            0,
            0,
            Math.max( @width , @defaultWidth ),
            Math.max( @height , @defaultHeight )
        );
        @defaultStyle();
        

    ###
    # Draw all the elements into the CanvasBox
    ###
    draw: ->
        if( not @booChanged )
            @intCounterStandyBy++;
            return;
        @intCounterStandyBy = 0;

        @booOnDraw = true;

        @clear();

        arrLayers = Array();

        ###
        # Create one array to each layer into the z dimension
        ###
        for objElement in @arrElements
            if( not arrLayers[ objElement.z ]? )
                arrLayers[ objElement.z ] = Array();
            arrLayers[ objElement.z ].push( objElement );

        ###
        # Order layers by the z dimension
        ###
        arrLayers = php.sort( arrLayers );

        ###
        # Draw Elements each z dimension layer of time
        ###
        for arrLayerElements in arrLayers
            for objElement in arrLayerElements
                if( objElement? )
                    objElement.onDraw();

        objElement = null;

        if( @booShowMenu and @objMenuSelected )
            @objMenuSelected.mouseX = @mouseX;
            @objMenuSelected.mouseY = @mouseY;
            @objMenuSelected.onDraw();

        if( @booDrawBoxMenu )
            for objButton in @arrButtons
                objButton.refresh();
                objButton.onDraw();
        
        @booOnDraw = false;
        @booChanged = false;

    ###
    # Draw all the elements into the CanvasBox
    ###
    onTimerElements: ->
        @booOnTimer = true;

        for objElement in @arrElements
            if( php.is_object( objElement ) )
                objElement.onTimer();
        @booOnTimer = false;

    ###
    # Active the auto refresh timer
    ###
    play: ->
        @intCounterStandyBy = 0;
        if( @booActive )
            return;
        @booActive = true;
        @intTimeoutTimer = setTimeout( this.onTimer.bind( this ) , @intIntervalTimer );
        @intTimeoutDraw = setTimeout( this.onDraw.bind( this ) , @intIntervalDraw );
        @intTimeoutFPS = setTimeout( this.onCountFps.bind( this ) , 1000 );

    ###
    # Stop the auto refresh timer
    ###
    stop:->
        @booActive = false;
        window.clearTimeout( @intTimeoutTimer );
        window.clearTimeout( @intTimeoutDraw );
        window.clearTimeout( @intTimeoutFPS );

    ###
    # Refresh the Canvas Box
    #
    # - Draw the elements
    # - Call the next timer if should
    # @return boolean
    ###
    onTimer:->
        if( @booActive == false )
            return false;
        if( @intCounterStandyBy < 10 )
            @intTimeoutTimer = setTimeout( 
                this.onTimer.bind(this) , 
                @intIntervalTimer 
            );
        else
            if( @booMouseOver )
                @intTimeoutTimer =  setTimeout( 
                    this.onTimer.bind( this ) , 
                    @intIntervalTimer * 2 
                );
            else
                @intCounterStandyBy = 0;
                @stop();
                
        if( @intCounterStandyBy > 10 )
            @intCounterStandyBy = 10;
        
        if( !@booOnTimer )
            @onTimerElements();
        return true;

    ###
    # On show counter FPS
    ###
    onCountFps:->
        @intLastFps = @intFps;
        @intFps = 0;
        if( ! @booCountFps )
            return false;
        document.title = "FPS: " + @intLastFps;
        @intTimeoutFPS = setTimeout( 
            this.onCountFps.bind(this) , 
            1000 
        );
        return true;

    ###
    # Refresh the Canvas Box
    #
    # - Draw the elements
    # - Call the next timer if should
    ###
    onDraw:->
        if( @booActive == false )
            return false;

        @intTimeoutDraw = setTimeout( 
            this.onDraw.bind(this) , 
            @intIntervalDraw 
        );

        if( ! @booOnDraw )
            @draw();
            @intFps++;
        return true;

    ###
    # Refresh Mouse Position based on Event
    #
    # @param event Event
    ###
    refreshMousePosition:( event = null )->    
        if( event? )
            @mouseX = ( event.clientX - @x + CanvasBox::scrollLeft() ) / @dblZoom;
            @mouseY = ( event.clientY - @y + CanvasBox::scrollTop()  ) / @dblZoom;

    ###
    # On Move Move over the Canvas Box
    # Search if the Mouse is Over some Canvas Element
    # @param event event
    ###
    onMouseMove:( event = null )->
        objElementOver = null;
        @refreshMousePosition( event );
        for objElement in @arrElements
            if( php.is_object( objElement ) && objElement.isInside( @mouseX , @mouseY ) )
                @change()
                objElementOver = objElement;
                break;
                
        ##
        # If the element over has changed 
        # ( null versus object ) or ( object.id != object.id )
        ##
        # if(   ( if @objElementOver == null then 0 else @objElementOver.getId() ) !=
        #       ( if  objElementOver == null then 0 else  objElementOver.getId() )  )
        ##
        if(   @objElementOver != objElementOver )

            @change()
            
            if( @objElementOver != null )
                @objElementOver.onMouseOut( event );
                
            if(  objElementOver != null )
                @booMouseOver = true
                objElementOver.onMouseOver( event );
                
        if( objElementOver != null )
            @objCanvasHtml.style.cursor = "pointer";
        else
            @objCanvasHtml.style.cursor = "default";
            
        @objElementOver = objElementOver;
            
        if( @objElementSelected? )
            @change()
            @objElementSelected.onDrag( event );

        for objButton in @arrButtons
            objButton.refresh();
            if( objButton.booMouseOver != objButton.isInside( @mouseX * @dblZoom , @mouseY *  @dblZoom ) )
                @change();

    ###
    # On Mouse Up Canvas Box Event
    # 
    # @see onMouseDown
    # @see CanvasBoxElement::onDrop()
    # @param Event event
    ###
    onMouseUp:( event )->
        @booMouseOver = true;

        if( @objElementSelected? )
            @change()
            @objElementSelected.onDrop( event);
        @objElementSelected = null;

    ###
    # On Mouse Down Canvas Box Event
    # 
    # @param Event event
    ###
    onMouseDown:( event )->
        @booMouseOver = true;
        @change()
        @objElementSelected = @objElementOver;
        if( @objElementSelected? )
            @objElementSelected.onMouseDown( event );
        return false;

    ###
    # On Mouse Click Canvas Box Event
    # 
    # @param Event event
    ###
    onClick:( event )->
        @objCanvasHtml.focus();
        @booMouseOver = true;
        @change()
        if( @booShowMenu and @objMenuSelected )
            @booShowMenu = @objMenuSelected.onClick( event );
            return false;

        if( @objElementOver != null )
            @objElementClicked = @objElementOver;
            @objElementOver.onClick( event );
        else 
            @objElementClicked = null;
            @onBoxClick( event );

        for objButton in @arrButtons
            objButton.refresh();
            if( objButton.booMouseOver )
                objButton.onClick();
                
        return false;

    ###
    # On Double Click Canvas Box Event
    # 
    # @param Event event
    ###
    onDblClick:( event )->
        @booMouseOver = true;
        @change()
        if( @objElementOver != null )
            @objElementOver.onDblClick( event );
        else
            @onBoxDblClick( event );

    ###
    # On Right Click Canvas Box Event
    # 
    # @param Event event
    ###
    onBoxRightClick:( event )->
        @booMouseOver = true;
        @change()
        return false;

    ###
    # On Context Menu Canvas Box Event
    # 
    # @param Event event
    ###
    onContextMenu:( event )->
        @booMouseOver = true;
        @change()
        if( @objElementOver != null )
            @objElementOver.onContextMenu( event );
        else
            @onBoxContextMenu( event );
        return false;

    ###
    # On Context Menu Clicked into a empty space of the Canvas Box
    # @param Event event
    ###
    onBoxContextMenu:( event )->
        @booMouseOver = true;
        @change()

        @booShowMenu = !@booShowMenu;
        if( @booShowMenu and @objMenu )
            @objMenu.objBox = this;
            @objMenuSelected = @objMenu;
            @objMenuSelected.intMenuX = @mouseX;
            @objMenuSelected.intMenuY = @mouseY;
            @objMenuSelected.strActualMenuItem = null;

    ###
    #  On Click into a empty space of the Canvas Box
    # 
    # @param Event event
    ###
    onBoxClick:( event )->
        @booMouseOver = true;
        @change()
        if( @booShowMenu and @objMenuSelected )
            @booShowMenu = @objMenuSelected.onClick( event );

    ###
    # On Double click into a empty space of the Canvas Box
    # 
    # @param Event event
    ###
    onBoxDblClick:( event )->
        @booMouseOver = true;
        @change()

    ###
    # On Key Up into the Canvas Box Element
    # 
    # @param Event event
    ###
    onKeyUp:( event )->
        @change()
        switch event.keyCode
            
            when 46 then ( # delete
                if( @objElementClicked != null )
                    @deleteElement( @objElementClicked )
                )
            when 38 then ( # up
                if( @objElementClicked != null )
                    @objElementClicked.goUp();
                )
            when 40 then ( # down
                if( @objElementClicked != null )
                    @objElementClicked.goDown();
                )
            when 39 then ( # =>
                if( @objElementClicked != null )
                    @objElementClicked.goRight();
                )
            when 37 then ( # <=
                if( @objElementClicked != null )
                    @objElementClicked.goLeft();
                )
            when 32 then ( # SPACE
                if( @objElementClicked != null )
                    @objElementClicked.fixed = not @objElementClicked.fixed;
                    @objElementClicked.drawFixed( @objElementClicked.fixed );
                )
            when 113 then ( # F2
                if( @objElementClicked != null )
                    @objElementClicked.rename();
                )
            when 45 then ( # INSERT
                if( @objElementClicked != null )
                    @objElementClicked.copy();
                )
        return false;

    ###
    # Delete some element from the Canvas Box
    # 
    # @param CanvasBoxElement objElement
    # @param boolean booCallOnDelete
    ###
    deleteElement:( objElement , booCallOnDelete = true )->
        @change()

        if( booCallOnDelete )
            objElement.onDelete();

        intId = @arrElements.indexOf( objElement );

        if( intId != -1 )
            @arrElements.splice( intId  , 1 );
        if ( @arrElements.length > 0 )
            @objElementClicked = null
        else
            @objElementClicked = null;
    
    onMouseOver:( event )->
        @booMouseOver = true;
        @play();
    
    onMouseOut:( event )->
        @booMouseOver = false;
    
    change:->
        @play();
        @intCounterStandyBy = 0;
        @booChanged = true;

    moveTo:( intX , intY )->
        @getContext().moveTo( 
            Math.round( intX * @dblZoom ),
            Math.round( intY * @dblZoom )
        );

    lineTo:( intX , intY )->
        @getContext().lineTo(
            Math.round( intX * @dblZoom ) + 0.5 ,
            Math.round( intY * @dblZoom ) + 0.5
        );

    quadraticCurveTo:( intCurveX , intCurveY, intX , intY )->
        @getContext().quadraticCurveTo(
            Math.round( intCurveX * @dblZoom ),
            Math.round( intCurveY * @dblZoom ),
            Math.round( intX * @dblZoom ) + 0.5 ,
            Math.round( intY * @dblZoom ) + 0.5
        );

    bezierCurveTo:( intCurveX , intCurveY, intX , intY )->
        
        @getContext().bezierCurveTo(
          Math.round( intCurveX * @dblZoom ), 
          Math.round( intCurveY * @dblZoom ), 
          Math.round( intCurveX * @dblZoom ), 
          Math.round( intCurveY * @dblZoom ) , 
          Math.round( intX  * @dblZoom ), 
          Math.round( intY * @dblZoom )
        )

    arc:( intX , intY, dblRadius , dblStartAngle , dblEndAngle, booClockwise)->
        @getContext().arc(
            Math.round( intX * @dblZoom  ),
            Math.round( intY * @dblZoom  ),
            Math.abs( Math.round( dblRadius * @dblZoom  ) ),
            dblStartAngle ,
            dblEndAngle ,
            booClockwise
        );

    defaultStyle:->
        @setFillStyle("red");
        @setStrokeStyle("red");
        @setLineWidth("1px");
        
    saveContext:->
        @getContext().save();
        @defaultStyle();

    restoreContext:->
        @getContext().restore();
        @defaultStyle();

    beginPath:->
        @getContext().beginPath();

    closePath:->
        @getContext().closePath();

    setFillStyle:( strFillStyle )->
        try
          if( not strFillStyle? )
              objError = throw new CanvasBoxException( "Fill Style not defined");
          @getContext().fillStyle = strFillStyle;
        catch objError
          throw new CanvasBoxException( "Error on set Fill Style [#{strFillStyle}]" );
          
    
    setStrokeStyle:( strStrokeStyle )->
        try
          if( not strStrokeStyle? )
              objError = new CanvasBoxException( "Stroke Style not defined");
              throw objError
          @getContext().strokeStyle = ( strStrokeStyle );
        catch objError
          throw new CanvasBoxException( "Error on set Stroke Style [#{strStrokeStyle}]" );

    setLineWidth:( dblLineWidth )->
        try
          @getContext().lineWidth = ( dblLineWidth * @dblZoom );
        catch objError
          throw new CanvasBoxException( "Error on set Line Width [#{dblLineWidth}]" );

    fill:->
        @getContext().fill();

    stroke:->
        @getContext().stroke();

    strokeText:( strText , intPosX , intPosY )->
        try
          @getContext().strokeText(
              strText ,
              Math.round( intPosX * @dblZoom ),
              Math.round( intPosY * @dblZoom )
          );
        catch objError
          throw new CanvasBoxException( "Error on set Stroke Text" );

    fillText:( strText , intPosX , intPosY )->
        try
          @getContext().fillText(
              strText ,
              Math.round( intPosX * @dblZoom ) + 0.5,
              Math.round( intPosY * @dblZoom ) + 0.5
          );
        catch objError
          throw new CanvasBoxException( "Error on fill Text" );

    strokeRect:( intX, intY, intWidth, intHeight )->
        try
          @getContext().strokeRect(
              Math.round( intX        * @dblZoom ) + 0.5,
              Math.round( intY        * @dblZoom ) + 0.5,
              Math.round( intWidth    * @dblZoom ) + 0.5,
              Math.round( intHeight   * @dblZoom ) + 0.5
          );
        catch objError
          throw new CanvasBoxException( "Error on stroke Rect" );

    fillRect:( intX, intY, intWidth, intHeight )->
        try
          @getContext().fillRect(
              Math.round( intX        * @dblZoom ) + 0.5,
              Math.round( intY        * @dblZoom ) + 0.5,
              Math.round( intWidth    * @dblZoom ) + 0.5,
              Math.round( intHeight   * @dblZoom ) + 0.5
          );
        catch objError
          throw new CanvasBoxException( "Error on fill Rect" );

    setShadowOffsetX:( intX )->
        try
          @getContext().shadowOffsetX = Math.round( intX * @dblZoom );
        catch objError
          throw new CanvasBoxException( "Error on set Shadow Offset X" );

    setShadowOffsetY:( intY )->
        try
          @getContext().shadowOffsetY = Math.round( intY * @dblZoom );
        catch objError
          throw new CanvasBoxException( "Error on set Shadow Offset Y" );

    setShadowBlur:( intBlur )->
        try
          @getContext().shadowBlur = intBlur;
        catch objError
          throw new CanvasBoxException( "Error on set Shadow Blur" );

    setShadowColor:( strColor )->
        try
          #console.log( "set shadown color = " + strColor );
          @getContext().shadowColor = strColor;
        catch objError
          throw new CanvasBoxException( "Error on set Shadow Color" );

    setFont:( strFontDescription )->
        try
          #console.log( "set Font " + strFontDescription );
          arrFontData = php.explode( " " , strFontDescription );
          for strFontData , key in arrFontData
            if  strFontData.indexOf( "px" ) > -1 or
                strFontData.indexOf( "pt" ) > -1
              strSizeNumber = strFontData.substr( 0 , strFontData.length - 2 );
              strSizeType   = strFontData.substr( strFontData.length - 2 );
              dblSizeNumber = 1 * strSizeNumber;
              dblSizeNumber = dblSizeNumber * @dblZoom;
              strNewSizeNumber = dblSizeNumber + strSizeType;
              arrFontData[ key ] = strNewSizeNumber;
          strFontDescription = php.implode( " " , arrFontData );
          @getContext().font = strFontDescription;
        catch objError
          throw new CanvasBoxException( "Error on set Font #{strFontDescription}" );

    translate:( intX , intY )->
        try
            @getContext().translate(
                intX, 
                intY
            );
        catch objError
          throw new CanvasBoxException( "Error on translate" );

    drawLine:( intXfrom , intYfrom , intXto , intYto )->
        try
          @getContext().moveTo( intXfrom + 0.5 , intYfrom + 0.5 )
          @getContext().lineTo( intXto   + 0.5 , intYto + 0.5 )
        catch objError
          objCanvasError = new CanvasBoxException( "Error on drawLine" );
          objCanvasError.setParentError( objError )
          throw objCanvasError

    drawQuadraticLine:( intXfrom , intYfrom , intXto , intYto , intXCurve , intYCurve )->

        try
          @getContext().moveTo( intXfrom + 0.5, intYfrom + 0.5 )
          @getContext().quadraticCurveTo( intXCurve, intYCurve, intXto + 0.5  , intYto + 0.5)
        catch objError
          objCanvasError = new CanvasBoxException( "Error on quadraticCurveTo" );
          objCanvasError.setParentError( objError )
          throw objCanvasError

    drawBezierLine:( intXfrom , intYfrom , intXto , intYto , intXCurve , intYCurve )->

        try
          @getContext().moveTo( intXfrom + 0.5, intYfrom + 0.5 )
          @bezierCurveTo( intXCurve, intYCurve, intXto + 0.5, intYto + 0.5)
        catch objError
          objCanvasError = new CanvasBoxException( "Error on drawBezierLine" );
          objCanvasError.setParentError( objError )
          throw objCanvasError

    rotate:( dblDegree )->
        try
          @getContext().rotate( dblDegree );
        catch objError
          throw new CanvasBoxException( "Error on rotate" );

    setTextAlign:( strTextAling )->
        try
          #console.log( "set Text Align " + strTextAling  );
          @getContext().textAlign = strTextAling;
        catch objError
          throw new CanvasBoxException( "Error on setTextAling #{strTextAling}" );
    
    addButton:( objButton )->
        objButton.intPaddingLeft = 0;
        objButton.intPaddingTop = 0;
        if( @arrButtons.length > 0 )
            objButton.strPositionHorizontal = "right";
            objButton.strPositionVertical = "middle";
            objButton.objPreviousButton = @arrButtons[ @arrButtons.length - 1 ];
        else
            objButton.strPositionHorizontal = "left";
            objButton.strPositionVertical = "top";
        @arrButtons.push( objButton );

    saveFile:()->
        dblProportion = @defaultHeight / @defaultWidth;
        intWidth = 1000;
        intHeight = Math.round( intWidth / dblProportion );
        dblOldZoom = @dblZoom;
        dblNewZoom = intWidth / @defaultWidth;
        @objCanvasHtml.setAttribute( "width" ,  ( intWidth )  + "px" );
        @objCanvasHtml.setAttribute( "height" , ( intHeight ) + "px" );

        @dblZoom = dblNewZoom;
        
        objNewForm = document.createElement( "form" );
        objNewTextArea = document.createElement( "textarea" );
        objInputName = document.createElement( "input" );
        objInputImageType = document.createElement( "input" );

        @onMouseOut( null );
        @booDrawBoxMenu = false;
        @stop();
        @draw();

        strDataURI = @objCanvasHtml.toDataURL( "image/png" );
        strDefaultFolder = window.MAIN_PATH;
        objNewForm.setAttribute( "action" , strDefaultFolder + "/download.php" );
        objNewForm.setAttribute( "method" , "post" );
        objNewForm.setAttribute( "target" , "saveWindow" );

        objNewTextArea.setAttribute( "name" , "base64Content" );
        objNewTextArea.value = strDataURI;

        objInputName.setAttribute( "type" , "text" );
        objInputName.setAttribute( "name", "fileName" );
        objInputName.value = "diagram.png";

        objInputImageType.setAttribute( "type" , "text" );
        objInputImageType.setAttribute( "name", "imageType" );
        objInputImageType.value = "image/png";

        objNewForm.appendChild( objNewTextArea );
        objNewForm.appendChild( objInputName );
        objNewForm.appendChild( objInputImageType );

        document.body.appendChild( objNewForm );

        objNewForm.submit();
        @play();
        @booDrawBoxMenu = true;
        window.setTimeout(
            () -> window.open( '../default/close.html' , 'saveWindow') ,
            30000
        )
        document.body.removeChild( objNewForm );
        @dblZoom = dblOldZoom;
        @objCanvasHtml.setAttribute( "width" ,  ( @defaultWidth )  + "px" );
        @objCanvasHtml.setAttribute( "height" , ( @defaultHeight ) + "px" );

    saveAsXml:()->
        alert( "Feature in development. Try it tomorrow!");

###
# Canvas Box it is a canvas element where the user can be append and remove elements.
#
# It elements can be selected and clicked and interact each other.
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
###
CanvasBox::arrInstances = Array()

###
# Get instance of canvas box by its id
###
CanvasBox::getCanvasBoxById = (id ) ->
    return CanvasBox::arrInstances[ id ]


###
# Get the client height fixing browsers missing standarts
#
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
###
CanvasBox::clientHeight = ->
    return CanvasBox::filterResults(
        window.innerHeight ?= 0,
        document.documentElement ?= 0,
        document.body ?= 0
    );

###
# Get the scroll left fixing browsers missing standarts
#
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
###
CanvasBox::scrollLeft = ->
    return CanvasBox::filterResults(
        window.pageXOffset ?= 0,
        document.documentElement.scrollWidth ?= 0,
        document.body.scrollWidth ?= 0
    );


###
# Get the scroll Top fixing browsers missing standarts
#
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
###
CanvasBox::scrollTop = ->
    return CanvasBox::filterResults(
        window.pageYOffset ?= 0,
        document.documentElement.scrollHeight ?= 0,
        document.body.scrollHeight ?= 0
    );

###
# browsers workaround for missing standarts
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
###
CanvasBox::filterResults = (intWin, intDocel, intBody) ->
    # the workaround stop to work.. around :P
    return intWin;
    intresult = intWin ?= 0;
    if (intDocel && (!intresult || (intresult > intDocel))) 
        intresult = intDocel;
    return intBody && (!intresult || (intresult > intBody)) ? intBody : intresult;
