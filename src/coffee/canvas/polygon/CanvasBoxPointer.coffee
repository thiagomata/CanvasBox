##
# Pointer of Polygonal creation
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
class CanvasBoxPointer

    ##
    # Class Name
    ##
    strClassName = "CanvasBoxPointer"

    ##
    # Horizontal positon of the pointer RELATIVE to the CanvasBoxPolygon
    #
    # This position is relative to the x,y to the CanvasBoxPolygon, don't go
    # crasy if this has some negative value
    #
    # @type double
    ##
    x: 0

    ##
    # Horizontal positon of the pointer RELATIVE to the CanvasBoxElement
    #
    # This position is relative to the x,y to the CanvasBoxPolygon, don't go
    # crasy if this has some negative value
    #
    # @type double
    ##
    y: 0

    ##
    # Line between this pointer and the next pointer will have this width into
    # the parent Polygon
    #
    # If not defined will be the polygon attribe value
    #
    # @type integer
    ##
    lineWidth: null

    ##
    # Stroke style between this pointer and the next pointer into the parent 
    # Polygon
    #
    # If not defined will be the polygon attribe value
    #
    # @type string
    ##
    strokeStyle: null

    ##
    # Bezier curve parameters of the control 1 pointer
    # @param Position {x,y}
    ##
    objControl1: {x: 0; y:0}

    ##
    # Bezier curve parameters of the control 2 pointer
    # This positions are relatives to the Pointer position
    #
    # @param Position {x,y}
    ##
    objControl2: {x: 0; y:0}

    ##
    # initialize the pointer parameters
    ##
    constructor:(objParams = null )->
        if( objParams? )
            @x = objParams.x if objParams.x?
            @y = objParams.y if objParams.y?
            @objControl1.x = objParams.x1 if objParams.x1?
            @objControl1.y = objParams.y1 if objParams.y1?
            @objControl2.x = objParams.x2 if objParams.x2?
            @objControl2.y = objParams.y2 if objParams.y2?
            @strokeStyle = objParams.strokeStyle if objParams.strokeStyle?
            @lineWidth = objParams.lineWidth if objParams.lineWidth?

    ##
    # Serialize the important data of this element
    # return Object
    ##
    toSerialize:->
        return {
               x: @x
               y: @y
               x1: @objControl1.x
               y1: @objControl1.y
               x2: @objControl2.x
               y2: @objControl2.y
               lineWidth: @lineWidth
               strokeStyle: @strokeStyle
            }
        
    ##
    # Return true if some one of the control pointer has some value not 0
    #
    # This means we should draw some curved bezier and not just a simple line
    ##
    hasSomeBezierControl:->
        return  ( @objControl1.x != 0 ) ||
                ( @objControl1.y != 0 ) ||
                ( @objControl2.x != 0 ) ||
                ( @objControl2.y != 0 )
    
    round:( dblPercent = 50 )->
        @objControl1.x = 10;
        @objControl1.y = 10;
#        @objControl1.x = @x * dblPercent / 100;
#        @objControl1.y = @y * dblPercent / 100;
#        @objControl2.x = @x * (100 - dblPercent) / 100;
#        @objControl2.y = @y * (100 - dblPercent) / 100;

    rotatePoint:( objPoint , dblAngle  )->
        intNewPositionX =  ( Math.cos( dblAngle  ) * objPoint.x - Math.sin( -dblAngle ) * objPoint.y );
        intNewPositionY = -( Math.cos( dblAngle  ) * objPoint.y - Math.sin(  dblAngle ) * objPoint.x );
        return { x: intNewPositionX , y: intNewPositionY }

    rotate:( dblAngle )->
        return false
        objPointRotate = @rotatePoint( this , dblAngle );
        objPointControl1 = @rotatePoint( @objControl1 , dblAngle );
        objPointControl2 = @rotatePoint( @objControl2 , dblAngle );
        return New.CanvasBoxPointer({
            x: objPointRotate.x
            y: objPointRotate.y
            x1: objPointControl1.x
            y1: objPointControl1.y
            x2: objPointControl2.x
            y2: objPointControl2.y
            lineWidth: @lineWidth
            strokeStyle: @strokeStyle
        });

    toString:->
        @x = Math.round(@x);
        @y = Math.round(@y);
        return "[#{@x},#{@y}]";