Load.CanvasBoxConnector();
class CanvasBoxLine extends CanvasBoxConnector

  intMass: 1
  
  ###
  # The circle of drag and drop side size
  ###
  side: 1

  ###
  # The circle of drag and drop side size
  ###
  hoverSide: 5

  ###
  # The circle of drag and drop side size
  ###
  shaddow: 20

  shaddowColor: "rgba(100,100,100,0.5)"

  hoverDistance: 10

  ###
  # The X Position of the Draggable Element
  ###
  x: 0

  ###
  # The Y Position of the Draggable Element
  ###
  y: 0

  ###
  # The X Position of the Dot in the Start
  ###
  x0: 0

  ###
  # The X Position of the Dot in the End
  ###
  x1: 0

  ###
  # The X speed
  ###
  dx: 0

  ###
  # The Y Position of the Dot in the Start
  ###
  y0: 0

  ###
  # The Y Position of the Dot in the End
  ###
  y1: 0
  
  ###
  # The Y speed
  ###
  dy: 0

  ###
  # Color of the Draggable Element
  ###
  draggableColor: "rgb( 200, 200, 220 )"

  ###
  # Color of the Draggable Element
  ###
  draggableBorderColor: "rgb( 200, 200, 220 )"

  ###
  # line Style, color, transparency, etc.
  ###
  strokeStyle: "rgb( 200, 200, 220 )"

  ###
  # fill Style, color, transparency, etc.
  ###
  fillStyle: "rgb( 100, 100, 220 )"

  ###
  # Line Width
  ###
  width: 3

  ###
  # Class Name
  ###
  strClassName: "CanvasBoxLine"

  ###
  # Color
  ###
  color: "black"

  ###
  # Text
  ###
  strText: null
  
  ###
  # Create the serialize object witch describe the canvas box line
  ###
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
      strokeStyle: @strokeStyle,
      width: @width,
      strClassName: @strClassName
    return objResult;

  ###
  # Get the vector ( pointer, distance and the angle )
  # based on the received element
  # @objElement CanvasBoxElement
  ###
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
    
  ###
  # Rotate the context based on the received vector
  # @param objVector Vector
  ###
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

  ###
  # Create the Connector in the From side of the line
  ###
  createConnectorFrom:()->
    objVector = @getVectorFromElement( @objElementFrom );
    # @objBox.saveContext();
    @rotateVector( objVector )
    @drawConnectorFrom( objVector.pointer , @side );
    @objBox.restoreContext();
        
  ###
  # Create the Connector in the To side of the line
  ###
  createConnectorTo:()->
    objVector = @getVectorFromElement( @objElementTo );
    @rotateVector( objVector )
    @drawConnectorTo( objVector.pointer , @side );
    @objBox.restoreContext();

  ###
  # Draw the Connector in the From side of the line
  ###    
  drawConnectorFrom:( objPointer , intSide )->
    @drawBackgroundCircle( intSide );
    @objBox.setFillStyle( @fillStyle );
    @objBox.setStrokeStyle( @strokeStyle );
    @objBox.beginPath();
    @drawArrowFrom( intSide );
    @objBox.fill();
    @objBox.stroke();

  ###
  # Draw the Connector in the To side of the line
  ###
  drawConnectorTo:( objPointer , intSide )->
    @drawBackgroundCircle( intSide );
    @objBox.setFillStyle( @fillStyle );
    @objBox.setStrokeStyle( @strokeStyle );
    @objBox.beginPath();
    @drawArrowTo( intSide );
    @objBox.fill();
    @objBox.stroke();

  ###
  # Draw the Background Circle
  ###
  drawBackgroundCircle:( intSide )->
    this.objBox.beginPath();
    this.objBox.setFillStyle( this.objBox.backgroundColor );
    this.objBox.setStrokeStyle( "rgb( 0 , 0, 0 )");
    this.objBox.arc( 0 , 0 , @shaddow , 0 ,  Math.PI  , true );
    this.objBox.fill();

  ###
  # Refresh the X0,Y0,X1,Y1 based on the X and Y and Side
  # Draw everything in the new place
  ###
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
    @objBox.drawLine( intXfrom, intYfrom, intXto, intYto )
    
  drawQuadraticLine:( intXfrom, intYfrom, intXto, intYto , intXCurve, intYCurve )->
    @objBox.drawBezierLine( intXfrom, intYfrom, intXto, intYto, intXCurve, intYCurve)
  
  getMouseDistance:()->
    dblDiffX = ( @objBox.mouseX - @x )
    dblDiffY = ( @objBox.mouseY - @y )
    dblDiffX = dblDiffX * dblDiffX
    dblDiffY = dblDiffY * dblDiffY
    return Math.round( Math.sqrt( dblDiffX + dblDiffY ) )

  drawAnchor:()->
    @objBox.saveContext();

    @objBox.setFillStyle( @color );
    @objBox.setStrokeStyle( @strokeStyle );
    @objBox.moveTo( @x , @y );

    
    dblMouseDistance = @getMouseDistance() / 8

    shaddowArc = 0

    if  dblMouseDistance < @hoverDistance
      shaddowArc = @hoverDistance - dblMouseDistance

    if  @mouseOver or
        @objBox.objElementClicked == this or
        @objBox.objElementClicked == @objElementFrom or
        @objBox.objElementClicked == @objElementTo
      shaddowArc = @hoverDistance
      
    if shaddowArc > 0
      @objBox.beginPath();
      @objBox.setFillStyle( @shaddowColor );
      @objBox.arc( @x , @y , shaddowArc , 0 ,  Math.PI * 2 , true );
      @objBox.fill();


    @objBox.closePath();
    @objBox.restoreContext();

  drawLines:()->
    @objBox.saveContext();
    @objBox.moveTo( @x , @y );
    @objBox.setStrokeStyle( @strokeStyle );
    @objBox.setFillStyle( @color );
#    @drawQuadraticLine( @x , @y , @objElementFrom.x , @objElementFrom.y , @objElementTo.x , @objElementTo.y );
    @drawQuadraticLine( @objElementFrom.x , @objElementFrom.y , @objElementTo.x , @objElementTo.y , @x , @y );
    @objBox.stroke();
    @objBox.restoreContext();
  
  draw:()-> 
    if( @objElementFrom == null )
      throw new CanvasBoxException( "Canvas Box Line has no Element From" );
      
    if( @objElementTo == null )
      throw new CanvasBoxException( "Canvas Box Line has no Element To" );
      
    @refresh()
    @drawLines()
    @drawAnchor()
    @drawText()
    @createConnectorFrom()
    @createConnectorTo()


  drawArrowTo:( intSide )->

  drawArrowFrom:( intSide )->

  drawText:()->
    return null unless @strText?

    @objBox.setFillStyle( "black" );
    @objBox.setFont( "Arial 40px" );
    @objBox.fillText( @strText, @x, @y )

  findArrow:( objBoxElement , intSide )->
    intDegree = Math.round( 180 + 180 * Math.atan2( objBoxElement.x - @x , objBoxElement.y - @y ) / Math.PI );
    return (
      degree: intDegree
      x: objBoxElement.x
      y:  objBoxElement.y
    )

  isInside:( mouseX , mouseY )->
    @refresh();
    if (  ( mouseX >= @x0 ) and 
          ( mouseX <= @x1 ) and 
          ( mouseY >= @y0 ) and
          ( mouseY <= @y1 ) )
      return true;
    
    dblMouseDistance = @getMouseDistance()

    if( dblMouseDistance < @hoverDistance )
      return true

    return false;

  drawMouseOver:( event )->
    if( !@defaultSide )
      @defaultSide = @side
    @side = 6;

  drawFixed:( boolFixed )->
    if( !@defaultColor )
      @defaultColor = @color

    if( boolFixed )
#      @color = "rgb( 100 , 100 , 200 )"
      @borderWidth *= 3
      @side = @defaultSide
    else
#      @color = @defaultColor
      @borderWidth = 1
      @side = @defaultSide

  drawMouseOut:( event )->
    @side = @defaultSide
    
  onDraw:()->
    @draw();