Load.CanvasBoxBehavior();
class CanvasBoxGravityBehavior extends CanvasBoxBehavior

  ##
  # Loss of force by the time
  # @type double
  ##
  dblFriction: 0.8
  
  ##
  # Gravity Force
  # @type double
  ##
  dblGravityForce: 0.5
 
  ##
  # Max Force value
  # @type double
  ##
  @dblMaxForce: 10
  
  ##
  # Minimal Gravity Force
  # @type double
  ##
  dblMinimalGravityForce: 3
  
  ##
  # Percent of force witch is returned by the floor impact
  # @type double
  ##
  dblElasticityLoss: 0.99
  
  ##
  # Move the element using gravity rules
  ##
  move:()->

    # refresh element position
    @objBoxElement.refresh()
    
    # if element is fixed return
    return false if @objBoxElement.fixed or @objBoxElement.booDrag
    
    
    # add gravity force
    if( !@objBoxElement.dy? or isNaN( @objBoxElement.dy ))
      @objBoxElement.dy = 0
      
    if( !@objBoxElement.dx? or isNaN( @objBoxElement.dx ) )
      @objBoxElement.dx = 0
    

    # move the element
    @objBoxElement.x = Math.round(@objBoxElement.x + @objBoxElement.dx)
    @objBoxElement.y = Math.round(@objBoxElement.y + @objBoxElement.dy)

    # refresh element position
    @objBoxElement.refresh()

    # is this the last element?
    booLast = @isLastOne(@objBoxElement)

    if booLast
      @objBoxElement.dy += @dblGravityForce
      # last element drop down
    else
      # others elements will stop or pull back
      @objBoxElement.dy = -1 * Math.abs( @objBoxElement.dy ) 
      @objBoxElement.dy *= -@dblFriction
      # @objBoxElement.dy = 0 if Math.abs(@objBoxElement.dy) < @dblMinimalGravityForce * 2

    # keeps the forces into limits
    @objBoxElement.dy =  @dblMaxForce  if @objBoxElement.dy > @dblMaxForce
    @objBoxElement.dy = -@dblMaxForce  if @objBoxElement.dy < -@dblMaxForce
    @objBoxElement.dx =  @dblMaxForce  if @objBoxElement.dx > @dblMaxForce
    @objBoxElement.dx = -@dblMaxForce  if @objBoxElement.dx < -@dblMaxForce
    
    # if has direction then has changed
    @objBoxElement.objBox.booChanged = true  if (Math.round(@objBoxElement.dx) isnt 0) or (Math.round(@objBoxElement.dy) isnt 0)
    
    # move the element
    @objBoxElement.x = Math.round(@objBoxElement.x + @objBoxElement.dx)
    @objBoxElement.y = Math.round(@objBoxElement.y + @objBoxElement.dy)
    
    # loss of elasticity
    @objBoxElement.dx *= @dblElasticityLoss
    @objBoxElement.dy *= @dblElasticityLoss
    
    # keeps the element into box
    
    if @objBoxElement.x0 < 0
      @objBoxElement.x = (@objBoxElement.width / 2)
      @objBoxElement.dx = -@objBoxElement.dx - 1
      @objBoxElement.dx = 0 if Math.abs(@objBoxElement.dx) < @dblMinimalGravityForce
      
    if @objBoxElement.x1 > @objBoxElement.objBox.width
      @objBoxElement.x = @objBoxElement.objBox.width - (@objBoxElement.width / 2)
      @objBoxElement.dx = -@objBoxElement.dx + 1
      @objBoxElement.dx = 0 if Math.abs(@objBoxElement.dx) < @dblMinimalGravityForce
      
    if @objBoxElement.y0 < 0
      @objBoxElement.y = (@objBoxElement.height / 2)
      @objBoxElement.dy = -@objBoxElement.dy - 1
      @objBoxElement.dy = 0 if Math.abs(@objBoxElement.dy) < @dblMinimalGravityForce
      
    if @objBoxElement.y1 > @objBoxElement.objBox.height
      @objBoxElement.y = Math.round(@objBoxElement.objBox.height - (@objBoxElement.height / 2))
      @objBoxElement.dy = -Math.round(@objBoxElement.dy * 0.8 * 10) / 10
      @objBoxElement.dy = 0 if Math.abs(@objBoxElement.dy) < @dblMinimalGravityForce
    
    # refresh
    @objBoxElement.refresh()

    super

  ##
  # Check if there is no element touching this by bottom
  ##
  isLastOne:(objActualElement)->
    console.log( "is last one? " );
    arrElements = @objBoxElement.objBox.arrElements
    intQtdElements = arrElements.length
    
    intMyTop = Math.round(objActualElement.y - (objActualElement.height / 2))
    intMyBottom = Math.round(objActualElement.y + (objActualElement.height / 2))
    intMyRight = Math.round(objActualElement.x + (objActualElement.width / 2))
    intMyLeft = Math.round(objActualElement.x - (objActualElement.width / 2))
    booLast = true
    intElement = 0

    for objBoxElement in arrElements when !objBoxElement.isConnector and objBoxElement.getId() isnt objActualElement.getId()
      
      booColision = false

      if  !booColision and
          (Math.round(objBoxElement.x + (objBoxElement.width  / 2)) >= intMyLeft) and 
          (Math.round(objBoxElement.x + (objBoxElement.width  / 2)) <= intMyRight) and 
          (Math.round(objBoxElement.y + (objBoxElement.height / 2)) >= intMyTop) and 
          (Math.round(objBoxElement.y + (objBoxElement.height / 2)) <= intMyBottom)
        booColision = true


      if  !booColision and
          (Math.round(objBoxElement.x - (objBoxElement.width / 2)) >= intMyLeft) and 
          (Math.round(objBoxElement.x - (objBoxElement.width / 2)) <= intMyRight) and 
          (Math.round(objBoxElement.y + (objBoxElement.height / 2)) >= intMyTop) and 
          (Math.round(objBoxElement.y + (objBoxElement.height / 2)) <= intMyBottom)
        booColision = true


      if  !booColision and
          (Math.round(objBoxElement.x + (objBoxElement.width / 2)) >= intMyLeft) and 
          (Math.round(objBoxElement.x + (objBoxElement.width / 2)) <= intMyRight) and 
          (Math.round(objBoxElement.y - (objBoxElement.height / 2)) >= intMyTop) and 
          (Math.round(objBoxElement.y - (objBoxElement.height / 2)) <= intMyBottom)
        booColision = true

      if  !booColision and
          (Math.round(objBoxElement.x - (objBoxElement.width / 2)) >= intMyLeft) and 
          (Math.round(objBoxElement.x - (objBoxElement.width / 2)) <= intMyRight) and 
          (Math.round(objBoxElement.y - (objBoxElement.height / 2)) >= intMyTop) and 
          (Math.round(objBoxElement.y - (objBoxElement.height / 2)) <= intMyBottom)
        booColision = true

      if booColision
        booLast = booLast and (objActualElement.y >= objBoxElement.y)
    return booLast

  ##
  # And force / speed into drag event
  ##
  onDrag:(event) ->
    @objBoxElement.dx = @objBoxElement.objBox.mouseX - @objBoxElement.x
    @objBoxElement.dy = @objBoxElement.objBox.mouseY - @objBoxElement.y
    return super( event );
