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
    # boxWidth of the Sand Box
    # @type integer
    ###
    boxWidth: 400

    ###
    # Height of the Sand Box
    # @type integer
    ###
    boxHeight: 400

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
        objResult.boxWidth = @boxWidth;
        objResult.height = @boxHeight;
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
        @objMenu = New.CanvasBoxMenu();
        @objMenu.objParent = this;
        @objMenu.objBox = this;
        @objMenu.arrMenuItens =
            0:
                name: "create class",
                event: ( objParent )->
                    objClass = New.CanvasBoxClass();
                    objClass.objBehavior = New.CanvasBoxMagneticBehavior( objClass );
                    objClass.x = objParent.mouseX;
                    objClass.y = objParent.mouseY;
                    objParent.addElement( objClass );
            1:
                name: "create square",
                event:( objParent )->
                    objSquare = New.CanvasBoxSquare();
                    objSquare.objBehavior = New.CanvasBoxMagneticBehavior( objSquare );
                    objSquare.x = objParent.mouseX;
                    objSquare.y = objParent.mouseY;
                    objParent.addElement( objSquare );
                    
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
    initialize: ( idCanvasHtmlElement , intWidth = 400 , intHeight = 400)->
        @defaultWidth = intWidth;
        @defaultHeight = intHeight;
        @boxWidth = @defaultWidth / @dblZoom;
        @boxHeight = @defaultHeight / @dblZoom;
        @id = CanvasBox::arrInstances.length;
        CanvasBox::arrInstances[ @id ] = this;

        @objCanvasHtml = document.getElementById( idCanvasHtmlElement );
        if( @objCanvasHtml == null )
            throw New.CanvasBoxException( "Invalid canvas html element id [" + idCanvasHtmlElement + "]" );
        @getPosition();

        strWidth = "#{@defaultWidth}px";
        @objCanvasHtml.setAttribute( "width" ,  strWidth );
        @objCanvasHtml.style.width = strWidth;

        strHeight = "#{@defaultHeight}px";
        @objCanvasHtml.setAttribute( "height" , strHeight );
        @objCanvasHtml.style.height = strHeight;

        @objCanvasHtml.setAttribute( "contentEditable" , "true");
        @objCanvasHtml.contentEditable = true;

        @objCanvasHtml.style.backgroundColor = @backgroundColor;

        @objCanvasHtml.onmousemove = (event) => 
            @onMouseMove( event );
        @objCanvasHtml.onclick = (event) =>    
            @onClick( event );
        @objCanvasHtml.ondblclick = (event) =>    
            @onClick( event );
        @objCanvasHtml.onmouseup = (event) =>    
            @onClick( event );
        @objCanvasHtml.onmousedown = (event) =>    
            @onMouseDown( event );
        @objCanvasHtml.oncontextmenu = (event) =>
            @onConContextMenu( event );
        @objCanvasHtml.onKeyup = (event) =>    
            @onKeyup( event );
        @objCanvasHtml.onMouseOut = (event) =>    
            @onMouseOut( event );
        @objCanvasHtml.onMouseOver = (event) =>    
            @onMouseOver( event );
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
        return this;

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
            Math.max( @boxWidth , @defaultWidth ),
            Math.max( @boxHeight , @defaultHeight )
        );

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

        arrZIndexElements = Array();
        arrZIndex = Array();

        ###
        # Create one array to each layer into the z dimension
        ###
        for objElement in @arrElements
            if( not arrZIndexElements[ objElement.z ]? )
                arrZIndexElements[ objElement.z ] = Array();
                arrZIndex.push( objElement.z );
            arrZIndexElements[ objElement.z ].push( objElement );

        ###
        # Order layers by the z dimension
        ###
        arrZIndex = php.sort( arrZIndex );

        ###
        # Draw Elements each z dimension layer of time
        ###
        for arrLayer in arrZIndex
            for objElement in arrLayer
                if( is_object( objElement ) )
                    objElement.draw();

        objElement = null;
        arrZIndexElements = null;

        if( @booShowMenu )
            @objMenuSelected.mouseX = @mouseX;
            @objMenuSelected.mouseY = @mouseY;
            @objMenuSelected.draw();

        if( @booDrawBoxMenu )
            for objButton in @arrButtons
                objButton.refresh();
                objButton.draw();
        
        @booOnDraw = false;
        @booChanged = false;

    ###
    # Draw all the elements into the CanvasBox
    ###
    onTimerElements: ->
        @booOnTimer = true;

        for objElement in @arrElements
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
        setTimeout( this.onTimer.bind( this ) , @intIntervalTimer );
        setTimeout( this.onDraw.bind( this ) , @intIntervalDraw );
        setTimeout( this.onCountFps.bind( this ) , 1000 );

    ###
    # Stop the auto refresh timer
    ###
    stop:->
        @booActive = false;

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
            setTimeout( 
                this.onTimer.bind(this) , 
                @intIntervalTimer 
            );
        else
            if( @booMouseOver )
                setTimeout( 
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
        setTimeout( 
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
        setTimeout( 
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
    refreshMousePosition:( event )->    
        @mouseX = ( event.clientX - @x + CanvasBox::scrollLeft() ) / @dblZoom;
        @mouseY = ( event.clientY - @y + CanvasBox::scrollTop()  ) / @dblZoom;

    ###
    # On Move Move over the Canvas Box
    # Search if the Mouse is Over some Canvas Element
    # @param event event
    ###
    # 
    onMouseMove:( event )->
        objElementOver = null;
        @refreshMousePosition( event );
        for objElement in @arrElements
            if( objElement.isInside( @mouseX , @mouseY ) )
                @change()
                objElementOver = objElement;
                break;
                
        if( @objElementOver != objElementOver )
            @change()
            if( @objElementOver != null )
                @objElementOver.onMouseOut( event );
            if( objElementOver != null )
                @objCanvasHtml.style.cursor = "pointer";
                objElementOver.onMouseOver( event );
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
        
        if( @objElementSelected != null )
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
        return false;

    ###
    # On Mouse Click Canvas Box Event
    # 
    # @param Event event
    ###
    onClick:( event )->
        @booMouseOver = true;
        @change()
        if( @booShowMenu )
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
                
        @objCanvasHtml.focus();
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
        if( @booShowMenu )
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
        if( @booShowMenu )
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
    deleteElement:( objElement , booCallOnDelete )->
        @change()
        if( Object.isUndefined( booCallOnDelete ) )
            booCallOnDelete = true;

        if( booCallOnDelete )
            objElement.onDelete();

        intId = @arrElements.indexOf( objElement );
        if( intId != -1 )
            @arrElements.splice( intId  , 1 );
        if ( @arrElements.length > 0 )
            @objElementClicked = @arrElements[ 0 ];
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
            Math.round( intX * @dblZoom ),
            Math.round( intY * @dblZoom )
        );

    arc:( intX , intY, dblRadius , dblStartAngle , dblEndAngle, booClockwise)->
        @getContext().arc(
            Math.round( intX * @dblZoom  ),
            Math.round( intY * @dblZoom  ),
            Math.abs( Math.round( dblRadius * @dblZoom  ) ),
            dblStartAngle ,
            dblEndAngle ,
            booClockwise
        );

    saveContext:->
        @getContext().save();

    restoreContext:->
        @getContext().restore();

    beginPath:->
        @getContext().beginPath();

    closePath:->
        @getContext().closePath();

    setFillStyle:( strFillStyle )->
        @getContext().fillStyle = strFillStyle;

    setStrokeStyle:( intStrokeStyle )->
        @getContext().strokeStyle = ( intStrokeStyle * @dblZoom );

    setLineWidth:( dblLineWidth )->
        @getContext().lineWidth = ( dblLineWidth * @dblZoom );

    fill:->
        @getContext().fill();

    stroke:->
        @getContext().stroke();

    strokeText:( strText , intPosX , intPosY )->
        @getContext().strokeText(
            strText ,
            Math.round( intPosX * @dblZoom ),
            Math.round( intPosY * @dblZoom )
        );

    fillText:( strText , intPosX , intPosY )->
        @getContext().fillText(
            strText ,
            Math.round( intPosX * @dblZoom ),
            Math.round( intPosY * @dblZoom )
        );

    strokeRect:( intX, intY, intWidth, intHeight )->
        @getContext().strokeRect(
            Math.round( intX        * @dblZoom ),
            Math.round( intY        * @dblZoom ),
            Math.round( intWidth    * @dblZoom ),
            Math.round( intHeight  * @dblZoom )
        );

    fillRect:( intX, intY, intWidth, intHeight )->
        @getContext().fillRect(
            Math.round( intX        * @dblZoom ),
            Math.round( intY        * @dblZoom ),
            Math.round( intWidth    * @dblZoom ),
            Math.round( intHeight  * @dblZoom )
        );

    setShadowOffsetX:( intX )->
        @getContext().shadowOffsetX = Math.round( intX * @dblZoom );

    setShadowOffsetY:( intY )->
        @getContext().shadowOffsetY = Math.round( intY * @dblZoom );

    setShadowBlur:( intBlur )->
        @getContext().shadowBlur = intBlur;

    setShadowColor:( strColor )->
        @getContext().shadowColor = strColor;

    setFont:( strFontDescription )->
        arrFontData = explode( " " , strFontDescription );
        strSize = arrFontData[0];
        strSizeNumber = strSize.substr( 0 , strSize.length - 2 );
        strSizeType = strSize.substr( strSize.length - 2 );
        dblSizeNumber = 1 * strSizeNumber;
        dblSizeNumber = dblSizeNumber * @dblZoom;
        strNewSizeNumber = dblSizeNumber + strSizeType;
        arrFontData[0] = strNewSizeNumber;
        strFontDescription = implode( " " , arrFontData );
        @getContext().font = strFontDescription;

    translate:( dblDegree , intDistance )->
        @getContext().translate(
            Math.round( dblDegree    * @dblZoom ),
            Math.round( intDistance * @dblZoom )
        );

    drawLine:( intXfrom , intYfrom , intXto , intYto )->
        @getContext().drawLine(
            Math.round( intXfrom    * @dblZoom ),
            Math.round( intYfrom    * @dblZoom ),
            Math.round( intXto      * @dblZoom ),
            Math.round( intYto      * @dblZoom )
        )

    rotate:( dblDegree )->
        @getContext().rotate( dblDegree );

    setTextAlign:( strTextAling )->
        @getContext().textAlign = strTextAling;
    
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
        strDefaultFolder = window.autoload.getPathOfDefault();
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

    saveAsXml:->
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
        document.documentElement ?= 0,
        document.body ?= 0
    );


###
# Get the scroll Top fixing browsers missing standarts
#
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
###
CanvasBox::scrollTop = ->
    return CanvasBox::filterResults(
        window.pageYOffset ?= 0,
        document.documentElement ?= 0,
        document.body ?= 0
    );

###
# browsers workaround for missing standarts
# @link http:#www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
###
CanvasBox::filterResults = (intWin, intDocel, intBody) ->
    intresult = intWin ?= 0;
    if (intDocel && (!intresult || (intresult > intDocel))) 
        intresult = intDocel;
    return intBody && (!intresult || (intresult > intBody)) ? intBody : intresult;
