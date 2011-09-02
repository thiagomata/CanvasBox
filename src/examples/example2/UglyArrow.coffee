##
# A simple example of how to use the canvas box.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
Load.Polygon();
class Square extends Polygon
    ##
    # Size of each side of square
    ##
    side: 100
    
    ##
    # Regular Square Color
    ##
    colorRegular: "rgb(150,150,250)"

    ##
    # Square Color on Drag Drop
    ##
    colorDrag: "rgb(100,100,250)"

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
    dblRotate: 45

    dblRotateSpeed: 0.01

    init:->
        super();
        @color = @colorRegular
        @borderColor = @borderColorRegular
        @createPolygon();

    createPolygon:->
        @arrPoints = new Array();
        @addPoint({x: -(@side / 2) , y: +(@side / 2) } )
        @addPoint({x: -(@side / 3) , y: +(@side / 2) } )
        @addPoint({x: -(@side / 10) , y: 0 } )
        @addPoint({x: +(@side / 10) , y: 0 } )
        @addPoint({x: (@side / 3) , y: +(@side / 2) } )
        @addPoint({x: (@side / 2) , y: +(@side / 2) } )
        @addPoint({x: 0 , y: -(@side / 2) } )

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
        return super( event );

    ##
    # Mouse out event
    ##
    onMouseOut:( event )->
        @borderColor = @borderColorRegular;
        return super( event );

    ##
    # On drag event
    ##
    onDrag:( event )->
        @color = @colorDrag
        return super( event );

    ##
    # On drop event
    ##
    onDrop:( event )->
        @color = @colorRegular;
        return super( event );

    onClick:( event )->
        @dblRotateSpeed *= -1;
        @side += 10 if @side < 200
        @createPolygon();
        return super( event );

    onDblClick:(event)->
        @side = 100
        @createPolygon();
        return super( event );

    onTimer:->
        @dblRotate += @dblRotateSpeed;
        @dblRotate %= ( 2 * Math.PI );
        @objBox.change();
        @objBox.onMouseMove();
        return super( event );