Load.CanvasBoxLine();
class CanvasBoxStateLink extends CanvasBoxLine

    strName: null
    
    strTitle: null

    color: "black"

    toSerialize:()->
        objResult =
          x:                    Math.round( @x )
          y:                    Math.round( @y )
          side:                 @side
          color:                @color
          borderColor:          @borderColor
          borderWidth:          @borderWidth
          intMass:              @intMass
          intMagnetism:         @intMagnetism
          intWallRepelsForce:   @intWallRepelsForce
          name:                 @constructor.name
          
        return objResult;

    ##
    # Sequence Diagram Arrow to
    ##
    drawArrowTo:( intSide )->
        @objBox.moveTo(-10, 15);
        @objBox.lineTo(0, 0);
        @objBox.lineTo(10, 15);