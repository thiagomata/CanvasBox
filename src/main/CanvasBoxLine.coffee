Load.CanvasBoxConnector();
class CanvasBoxLine extends CanvasBoxConnector

  ##
  # The circle of drag and drop side size
  ##
  side: 3

  ##
  # The X Position of the Dot in the Start
  ##
  x0: 0

  ##
  # The X Position of the Dot in the End
  ##
  x1: 0

  ##
  # The X speed
  ##
  dx: 0

  ##
  # The Y Position of the Dot in the Start
  ##
  y0: 0

  ##
  # The Y Position of the Dot in the End
  ##
  y1: 0
  
  ##
  # The Y speed
  ##
  dy: 0

  ##
  # Color of the Draggable Element
  ##
  draggableColor: "rgb( 200, 200, 220 )"

  ##
  # Color of the Draggable Element
  ##
  draggableBorderColor: "rgb( 200, 200, 220 )"

  ##
  # line Style, color, transparency, etc.
  ##
  style: "rgb( 200, 200, 220 )"

  ##
  # Line Width
  ##
  width: 1

  ##
  # Class Name
  ##
  strClassName: "CanvasBoxLine"

  ##
  # Create the serialize object witch describe the canvas box line
  ##
  toSerialize:()->
    objResult =
      side: @side
      x0: @x0
      x1: @x1
      dx: @dx
      y0: @y0
      y1: @y1
      dy: @dy
      draggableColor: @draggableColor,
      draggableBorderColor: @draggableBorderColor,
      style: @style,
      width: @width,
      strClassName: @strClassName
    return objResult;

  ##
  # Get the vector ( pointer, distance and the angle )
  # based on the received element
  # @objElement CanvasBoxElement
  ##
  getVectorFromElement:( objElement  )->
    objPointer = @findArrow( objElement , @side );
    dblAngle = objPointer.degree * 2 * Math.PI / 360;
    dblReverseAngle = Math.PI * 2 - dblAngle;
    intDistance = Math.abs( Math.cos( dblAngle ) ) * objElement.height / 2 ;
    intDistance += Math.abs( Math.sin( dblAngle ) ) * objElement.width / 2 ;

    return (
      pointer: objPointer ,
      distance: intDistance ,
      angle: dblAngle ,
      reverseAngle: dblReverseAngle
    );
    
  ##
  # Rotate the context based on the received vector
  # @param objVector Vector
  ##
  rotateVector:( objVector )->
    @objBox.restoreContext();
    @objBox.moveTo( objVector.pointer.x , objVector.pointer.y );
    @objBox.saveContext();
    @objBox.translate( objVector.pointer.x , objVector.pointer.y );
    @objBox.rotate( objVector.reverseAngle );
    @objBox.translate(
      0
      , 
      objVector.distance
    );

  ##
  # Create the Connector in the From side of the line
  ##
  createConnectorFrom:()->
    objVector = getVectorFromElement( @objElementFrom );
    @drawConnectorFrom( objVector.pointer , @side );
    @objBox.restoreContext();
        
  ##
  # Create the Connector in the To side of the line
  ##
  createConnectorTo:()->
    objVector = getVectorFromElement( @objElementTo );
    @drawConnectorTo( objVector.pointer , @side );
    @objBox.restoreContext();

  ##
  # Draw the Connector in the From side of the line
  ##    
  drawConnectorFrom:( objPointer , intSide )->
    @drawBackgroundCircle( intSide );

  ##
  # Draw the Connector in the To side of the line
  ##
  drawConnectorTo:( objPointer , intSide )->
    @drawBackgroundCircle( intSide );

  ##
  # Draw the Background Circle
  ##
  drawBackgroundCircle:( intSide )->

  ##
  # Refresh the X0,Y0,X1,Y1 based on the X and Y and Side
  # Draw everything in the new place
  ##
  refresh:()->
    @x0 = @x - ( @side / 2 );
    @x1 = @x + ( @side / 2 );
    @y0 = @y - ( @side / 2 );
    @y1 = @y + ( @side / 2 );
    if( @x0 < 0 )
      @x += @side;
      return @refresh();

    if( @y0 < 0 )
      @y += @side;
      return @refresh();

    @width = @side;
    @height = @side;

  drawLine:( intXfrom, intYfrom, intXto, intYto )->
    @objBox.moveTo( intXfrom , intYfrom );
    @objBox.lineTo( intXto , intYto );
    
  draw:()->
    @refresh();
    @objBox.saveContext();

    @objBox.setFillStyle( @color );
    @objBox.moveTo( @x , @y );

    @objBox.beginPath();
    @objBox.arc( @x , @y , @side , 0 ,  Math.PI * 2 , true );
    @objBox.fill();

    if( @mouseOver || @objBox.objElementClicked == this )
      @objBox.strokeStyle = @draggableColor;
      @objBox.arc( @x , @y , @side * 2 , 0 ,  Math.PI * 2 , true );
      @objBox.stroke();

    @objBox.setStrokeStyle( @style );
    @objBox.setLineWidth( @width );
    @drawLine( @x , @y , @objElementFrom.x , @objElementFrom.y );
    @drawLine( @x , @y , @objElementTo.x , @objElementTo.y );
    @objBox.stroke();
    @objBox.closePath();
    @objBox.restoreContext();
    @objBox.saveContext();

    @objBox.setFillStyle( @color );
    @objBox.moveTo( @x , @y );

    @objBox.beginPath();
    @objBox.arc( @x , @y , @side , 0 ,  Math.PI * 2 , true );
    @objBox.fill();
    @objBox.closePath();

    @z = 1;

    # not line elements shall be in top
    if( @objElementFrom.strClassName != @strClassName )
      @createConnectorFrom();
      @objBox.setFillStyle( @color );
      @z = 2;

    if( @objElementTo.strClassName != @strClassName )
      @createConnectorTo();
      @objBox.setFillStyle( @color );
      @z = 2;

    @objBox.restoreContext();

  findArrow:( objBoxElement , intSide )->
    intDegree = Math.round( 180 + 180 * Math.atan2( objBoxElement.x - @x , objBoxElement.y - @y ) / Math.PI );
    return (
      degree: intDegree
      x: objBoxElement.x
      y:  objBoxElement.y
    )

  isInside:( mouseX , mouseY )->
    @refresh();
    if  ( ( mouseX >= @x0 ) && ( mouseX <= @x1 ) && ( mouseY >= @y0 ) && ( mouseY <= @y1 ) )
      return true;
    else
      return false;

  drawMouseOver:( event )->
    if( !@defaultSide )
      @defaultSide = @side
    @side = 6;

  drawFixed:( boolFixed )->
    if( !@defaultColor )
      @defaultColor = @color

    if( boolFixed )
      @color = "rgb( 100 , 100 , 200 )"
      @borderWidth *= 3
      @side = @defaultSide
    else
      @color = @defaultColor
      @borderWidth /= 3
      @side = @defaultSide

  drawMouseOut:( event )->
    @side = @defaultSide