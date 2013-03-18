##
# Polygon shape what can be draw, rotate, checked positions, etc.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
Load.CanvasBoxElement();
class CanvasBoxPolygon extends CanvasBoxElement

    ##
    # Draw some elements to help debug  
    ##
    debug: false

    ##
    # Current Color
    ##
    color: null
    
    ##
    # Square Border Color
    ##
    borderColor: null

    ##
    # Square Border Width
    ##
    borderWidth: 1

    ##
    #   Rotate the element 0⁰
    ##
    dblRotate: 0

    ##
    # All the points of the polygon
    # @type Point[]
    ##
    arrPoints: null

    ##
    # Class Name
    ##
    strClassName: "Polygon"

    ##
    # Initin the arrPoints into the constructor to solve the bug? of the 
    # singleton arrPoints
    # @todo Make more tests to check if this is some kind of OOP implementation bug
    ##
    init:()->
        super();
        @arrPoints = new Array();

    ##
    # Serialize the important data of this element
    # return Object
    ##
    toSerialize:->
        objResult = super();
        objResult.arrPoints = @serializePoints();
        objResult.dblRotate = @dblRotate;
        return objResult;

    ##
    # Get the serialized version of the Points
    # @return Point[]
    ##
    serializePoints:->
        arrSerializedPoints = new Array();
        for objPoint in @arrPoints
            if objPoint instanceof CanvasBoxPointer
                objSerialPoint = objPoint.toSerialize();
            else
                objSerialPoint = objPoint;
            arrSerializedPoints.push( objSerialPoint );

        return arrSerializedPoints;

    ##
    # Get the Points Colections rotated
    #
    # @return Point[]
    ##
    getRotatedPoints:()->
        arrRotatedPoints = new Array();
        for objPoint in @arrPoints
            arrRotatedPoints.push( @rotatePoint( objPoint ) );
        return arrRotatedPoints;
    
    ##
    # Add some element into the end of the polygon
    # @param Point
    # @return boolean
    ##
    addPoint:( objPoint )->
        objPoint.position = @arrPoints.length;
        @arrPoints.push( objPoint );
        return this;

    ##
    # Draw the polygon
    #
    # Navigation into all the points of polygon, in order drawing it, stroking 
    # and filling it
    ##
    draw:->
        if( @arrPoints.length < 2 )
            return super();
        @changeContext();
        @objBox.setFillStyle( @color );
        @objBox.setStrokeStyle( @borderColor );
        @objBox.lineWidth = "#{@borderWidth}px";

        arrPoints = @getRotatedPoints();
        objFirstPoint = arrPoints[0];

        @objBox.beginPath();

        for objPoint , intKey in @arrPoints
            objNextPoint = @arrPoints[ ( intKey + 1 ) % @arrPoints.length ]
            objPrevious = @arrPoints[ ( intKey - 1 + @arrPoints.length ) % @arrPoints.length ]

            if( intKey == 0 )
                @objBox.moveTo(
                    (  objPoint.x ) , 
                    (  objPoint.y ) );

            if objPoint instanceof CanvasBoxPointer
                @objBox.setStrokeStyle( objPoint.strokeStyle ) if objPoint.strokeStyle?;
                @objBox.setLineWidth( objPoint.lineWidth ) if objPoint.lineWidth?;
    
            @objBox.lineTo(  objPoint.x ,  objPoint.y );


        @objBox.fill();
        @objBox.stroke();

        if( @debug )
            for objPoint , intKey in @arrPoints
                objPrevious = @arrPoints[ ( intKey - 1 + @arrPoints.length ) % @arrPoints.length ]
                if objPoint instanceof CanvasBoxPointer
                    @objBox.setStrokeStyle( objPoint.strokeStyle ) if objPoint.strokeStyle?;
                    @objBox.setLineWidth( objPoint.lineWidth ) if objPoint.lineWidth?;

                    objBefore = @middle( objPrevious , objPoint );
                    objAfter = @middle( objPoint , objNextPoint );
                    @objBox.setStrokeStyle( "black" );
                    @objBox.strokeText( intKey , objPoint.x , objPoint.y );

        @restoreContext();
        return this;
    
    ##
    # Returns if the Mouse is Over the Element
    #
    # @param mouseX integer horizontal position of cursor pointer
    # @param mouseY integer vertical position of the cursor pointer
    # @return boolean
    ## 
    isInsideElement:( mouseX , mouseY )->
        objPoint = New.CanvasBoxPointer({x: mouseX , y: mouseY });
        return @isInsidePolygon( objPoint );

    ##
    # Returns if the Point is inside the polygon
    #
    # @link http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    # @link http://wiki.lazarus.freepascal.org/Geometry_in_Pascal#Checking_if_a_point_is_inside_a_polygon_.28integer_version.29
    # @param Point objPoint
    # @return boolean
    ##
    isInsidePolygon:( objPoint )->
        objPoint.x = this.x - objPoint.x;
        objPoint.y = this.y - objPoint.y;
        arrRotatedPoints = @getRotatedPoints();
        intQtdPoints = arrRotatedPoints.length;

        if ( intQtdPoints < 3 )
            return false;

        booInside = false;

        objLastPoint = arrRotatedPoints[ intQtdPoints - 1];
        for objCurrentPoint , intKey in arrRotatedPoints

            if( objCurrentPoint.x > objLastPoint.x )
                objAPoint = objLastPoint; 
                objBPoint = objCurrentPoint;
            else
                objBPoint = objLastPoint; 
                objAPoint = objCurrentPoint;
            
            intCurrentDiffX = ( objCurrentPoint.x < objPoint.x );
            intLastDiffX    = ( objPoint.x <= objLastPoint.x );
            intDiffCABAY = Math.round( ( objPoint.y  - objAPoint.y ) * ( objBPoint.x - objAPoint.x ) ); 
            intDiffBACAY = Math.round( ( objBPoint.y - objAPoint.y ) * ( objPoint.x  - objAPoint.x ) ); 

            if (  ( intCurrentDiffX == intLastDiffX ) &&
                  ( intDiffCABAY ) < ( intDiffBACAY ) )
                booInside = !booInside;

            objLastPoint = objCurrentPoint;
        return booInside;


    rotatePoint:( objPoint )->
        intNewPositionX =  Math.round( Math.cos( @dblRotate ) * objPoint.x - Math.sin( -@dblRotate ) * objPoint.y );
        intNewPositionY = -Math.round( Math.cos( @dblRotate ) * objPoint.y - Math.sin(  @dblRotate ) * objPoint.x );
        return New.CanvasBoxPointer({ x: intNewPositionX , y: intNewPositionY });


    ##
    # smooth the polygon creating new middle elements
    ##
    smooth:->
        arrNewPoints = new Array();
        for objPoint , intKey in @arrPoints
            objNextPoint = @arrPoints[ ( intKey + 1 ) % @arrPoints.length ];  
            objBeforePoint = @arrPoints[ ( intKey - 1 + @arrPoints.length  ) % @arrPoints.length ];  
            objMiddlePointAB = @middle( objBeforePoint , objPoint );
            objMiddlePointBC = @middle( objPoint , objNextPoint );
            objShadowB = @middle( objMiddlePointAB , objMiddlePointBC );
            objNewB = @middle( objShadowB , objPoint );
            arrNewPoints.push( objNewB );
            arrNewPoints.push( objMiddlePointBC );
        @arrPoints = arrNewPoints;

    middle:(objPoint1,objPoint2)->
        objPointResult = New.CanvasBoxPointer({
                x: (objPoint1.x + objPoint2.x )/2
                y: (objPoint1.y + objPoint2.y )/2
            });
        return objPointResult