##
# A simple example of how to use the canvas box.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
Load.CanvasBoxPolygon();
class UglyArrow extends CanvasBoxPolygon

    ##
    # X position
    ##
    x: 0

    ##
    # Y position
    ##
    y: 0

    ##
    # Relative Distance Between X position of cursor
    ##
    relativeMousey: 0

    ##
    # Debug mode
    ##
    debug: true;

    ##
    # Size of each side of square
    ##
    side: 200
    
    ##
    # Regular Square Color
    ##
    colorRegular: "rgb(150,150,250)"

    ##
    # Square Color on Drag Drop
    ##
    colorDrag: "rgb(100,100,250)"

    ##
    # Square Color on Drag Drop
    ##
    colorOver: "rgb(50,200,50)"

    ##
    # Current Color
    ##
    color: null
    
    ##
    # Square Border Color
    ##
    borderColorRegular: "rgb(100,100,100)"

    ##
    # Square Border Color
    ##
    borderColor: null

    ##
    # Square Border Color
    ##
    borderColorOver: "rgb( 250 , 250, 250 )"

    ##
    # Square Border Width
    ##
    borderWidth: 2
        
    ##
    # Class Name
    ##
    strClassName: "Square"

    ##
    #   Rotate the element 45⁰
    ##
    dblRotate: 0

    dblRotateSpeed: 0.001

    init:->
        super();
        @color = @colorRegular
        @borderColor = @borderColorRegular
        @createPolygon();

    createPolygon:->
        @arrPoints = new Array();

        @addPoint( New.CanvasBoxPointer( {x: -(@side / 2) , y: +(@side / 2) } ) )
        @addPoint( New.CanvasBoxPointer( {x: -(@side / 3) , y: +(@side / 2) } ) )
        @addPoint( New.CanvasBoxPointer( {x: -(@side / 10) , y: 0 } ) )
        @addPoint( New.CanvasBoxPointer( {x: +(@side / 10) , y: 0 } ) )
        @addPoint( New.CanvasBoxPointer( {x: (@side / 3) , y: +(@side / 2) } ) )
        @addPoint( New.CanvasBoxPointer( {x: (@side / 2) , y: +(@side / 2) } ) )
        @addPoint( New.CanvasBoxPointer( {x: 0 , y: -(@side / 2) } ) )

    ##
    # Serialize the important data of this element
    ##
    toSerialize:->
        objResult = super();
        objResult.color = @color;
        objResult.borderColor = @borderColor;
        objResult.side = @side;        
        return objResult;

    ##
    # Mouse over event
    ##
    onMouseOver:( event )->
        @borderColor = @borderColorOver;
        @color = @colorOver;
        return super( event );

    ##
    # Mouse out event
    ##
    onMouseOut:( event )->
        @borderColor = @borderColorRegular;
        return super( event );

    ##
    # On drag event
    # @param event
    # return boolean
    ##
    onDrag:( event )->
        @color = @colorDrag
        return super( event );

    ##
    # On drop event
    # @param event
    # return boolean
    ##
    onDrop:( event )->
        @color = @colorRegular;
        return super( event );

    ##
    # On click event
    # @param event
    # return boolean
    ##
    onClick:( event )->
        @dblRotateSpeed *= -1;
        @smooth();
        @onMouseOver( event );
        return super( event );

    ##
    # On Double click event
    # @param event
    # return boolean
    ##
    onDblClick:(event)->
        @createPolygon();
        return super( event );

    ##
    # On Timer Event
    ##
    onTimer:->
        @dblRotate += @dblRotateSpeed;
        @dblRotate %= ( 2 * Math.PI );
        @objBox.change();
        @objBox.onMouseMove();
        return super( event );

