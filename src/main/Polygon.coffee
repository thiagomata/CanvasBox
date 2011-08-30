##
# Polygon shape what can be draw, rotate, checked positions, etc.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
Load.CanvasBoxElement();
class Polygon extends CanvasBoxElement

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
            if objPoint instanceof Point
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
        
        objFirstPoint = php.array_shift( arrPoints );
        @objBox.moveTo( objFirstPoint.x , objFirstPoint.y );

        @objBox.beginPath();

        for objPoint in arrPoints
            @objBox.lineTo( objPoint.x , objPoint.y );

        @objBox.lineTo( objFirstPoint.x , objFirstPoint.y );

        @objBox.fill();
        @objBox.stroke();

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
        objPoint = {x: mouseX , y: mouseY };
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
        objPoint.x -= this.x;
        objPoint.y -= this.y;
        arrRotatedPoints = @getRotatedPoints();
        intQtdPoints = arrRotatedPoints.length;

        if ( intQtdPoints < 3 )
            return false;

        booInside = false;

        objLastPoint = arrRotatedPoints[ intQtdPoints - 1];
        for objCurrentPoint in arrRotatedPoints
            
            if( objCurrentPoint.x > objLastPoint.x )
                objAPoint = objLastPoint; 
                objBPoint = objCurrentPoint;
            else
                objBPoint = objLastPoint; 
                objAPoint = objCurrentPoint;
            
            intCurrentDiffX = ( objCurrentPoint.x < objPoint.x );
            intLastDiffX    = ( objPoint.x <= objLastPoint.x );
            intDiffCABAY = ( objPoint.y  - objAPoint.y ) * ( objBPoint.x - objAPoint.x ); 
            intDiffBACAY = ( objBPoint.y - objAPoint.y ) * ( objPoint.x  - objAPoint.x ); 

            if (  ( intCurrentDiffX == intLastDiffX ) &&
                  ( intDiffCABAY ) < ( intDiffBACAY ) )
                booInside = !booInside;
            objLastPoint = objCurrentPoint;
        return booInside;


    ##
    # Rotate some point relative to the polygon position
    #
    # @param Point Point
    # @return Point
    ##
    rotatePoint:( objPoint )->
        intNewPositionX =  ( Math.cos( @dblRotate ) * objPoint.x - Math.sin( -@dblRotate ) * objPoint.y );
        intNewPositionY = -( Math.cos( @dblRotate ) * objPoint.y - Math.sin(  @dblRotate ) * objPoint.x );
        return { x: intNewPositionX , y: intNewPositionY }

    
