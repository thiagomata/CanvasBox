Load.CanvasBoxBehavior();
class CanvasBoxMagneticBehavior extends CanvasBoxBehavior

  ##
  # Magnetic Force
  ##
  intMagnetism: 40
  
  ##
  # Wall Repels Force
  ##
  intWallRepelsForce: 0.1
  
  ##
  # Direction Lost
  ##
  intDirectionChangeLoss: 100
  
  ##
  # Max Force
  ##
  intMaxForce: 10
  
  ##
  # Margin
  ##
  intMargin: 10
  
  ##
  # Repelling Force
  ##
  intRepelling: 20
  
  ##
  # Escape Force
  ##
  intEscapeForce: 0.05
  
  ##
  # Collision Force
  ##
  dblCollisionForce: 0
  
  ##
  # Class Name
  ##
  strClassName: "CanvasBoxMagneticBehavior"
  
  toSerialize:()->
    objResult = Array()
    objResult.dragdrop = @dragdrop
    objResult.intMargin = @intMargin
    objResult.intEscapeForce = @intEscapeForce
    objResult.dblCollisionForce = @dblCollisionForce
    objResult.strClassName = @strClassName
    objResult

  initialize:(objBoxElement)->
    @objBoxElement = objBoxElement
    @intMagnetism = 1  unless @intMagnetism

  repelsWalls:(arrVectors)->
    objVector = undefined
    dblZoom = undefined
    if @objBoxElement and @objBoxElement.objBox
      dblZoom = @objBoxElement.objBox.dblZoom
    else
      dblZoom = 1
    dblWallForce = @intWallRepelsForce * @objBoxElement.objBox.arrElements.length * dblZoom
    objVector = Array()
    objVector["dx"] = -1 * (@objBoxElement.x) * dblWallForce
    objVector["dy"] = 0
    arrVectors.push objVector
    objVector = Array()
    objVector["dx"] = 1 * (@objBoxElement.objBox.width - @objBoxElement.x) * dblWallForce
    objVector["dy"] = 0
    arrVectors.push objVector
    objVector = Array()
    objVector["dx"] = 0
    objVector["dy"] = -1 * (@objBoxElement.y) * dblWallForce
    arrVectors.push objVector
    objVector = Array()
    objVector["dx"] = 0
    objVector["dy"] = 1 * (@objBoxElement.objBox.height - @objBoxElement.y) * dblWallForce
    arrVectors.push objVector
    arrVectors

  repelsElements:(arrVectors)->
    for objElement in @objBoxElement.objBox.arrElements when objElement isnt @objBoxElement
      objVector = @getElementForce(objElement, @objBoxElement)
      arrVectors.push objVector  if objVector?
      objVector = @getConnectorForce(objElement, @objBoxElement)
      arrVectors.push objVector  if objVector?
    arrVectors

  keepOnLimits:(arrVectors)->
    objVector = Array()
    objVector["dx"] = 0
    objVector["dy"] = 0
    objVector["dx"] += 1 * Math.abs(@intEscapeForce + (@objBoxElement.objBox.width - @objBoxElement.x))
    objVector["dx"] += -1 * Math.abs(@intEscapeForce + (@objBoxElement.x))
    objVector["dy"] += 1 * Math.abs(@intEscapeForce + (@objBoxElement.objBox.height - @objBoxElement.y))
    objVector["dy"] += -1 * Math.abs(@intEscapeForce + (@objBoxElement.y))
    arrVectors.push objVector  if (objVector["dx"] isnt 0) or (objVector["dy"] isnt 0)
    arrVectors

  hasChanged:()->
    booChanged = false
    if @objBoxElement.x < @intMargin
      @objBoxElement.x = @intMargin
      booChanged = true

    if @objBoxElement.x + @intMargin > @objBoxElement.objBox.width
      @objBoxElement.x = Math.round(@objBoxElement.objBox.width - (@intMargin))
      booChanged = true

    if @objBoxElement.y < @intMargin
      @objBoxElement.y = @intMargin
      booChanged = true

    if @objBoxElement.y + @intMargin > @objBoxElement.objBox.height
      @objBoxElement.y = Math.round(@objBoxElement.objBox.height - (@intMargin))
      booChanged = true

    return booChanged

  move:()->
    #@objBoxElement.refresh()
    return  if @objBoxElement.fixed or @objBoxElement.dragdrop
    arrVectors = Array()
    arrVectors = @repelsWalls(arrVectors)
    arrVectors = @repelsElements(arrVectors)
    arrVectors = @keepOnLimits(arrVectors)
    @objBoxElement.dx = Math.round(@objBoxElement.dx)
    @objBoxElement.dy = Math.round(@objBoxElement.dy)
    @objBoxElement.dx = 0  if isNaN(@objBoxElement.dx)
    @objBoxElement.dy = 0  if isNaN(@objBoxElement.dy)
    @getVectors arrVectors
    if Math.round(@objBoxElement.dx) isnt 0 or Math.round(@objBoxElement.dy) isnt 0
      @objBoxElement.objBox.booChanged = true
      @objBoxElement.x = Math.round(@objBoxElement.x + @objBoxElement.dx)
      @objBoxElement.y = Math.round(@objBoxElement.y + @objBoxElement.dy)
    @hasChanged()

  onTimer:()->
    @move()

  onMouseOver:(event) ->
    @objBoxElement.drawMouseOver event  if @objBoxElement.drawMouseOver

  onMouseOut:(event)->
    @objBoxElement.drawMouseOut event  if @objBoxElement.drawMouseOut

  onDblClick:(event) ->
    @objBoxElement.fixed = not @objBoxElement.fixed
    @objBoxElement.drawFixed @objBoxElement.fixed  if @objBoxElement.drawFixed

  onDrag:(event)->
    @objBoxElement.dragdrop = true
    @objBoxElement.dx = @objBoxElement.objBox.mouseX - @objBoxElement.x
    @objBoxElement.dy = @objBoxElement.objBox.mouseY - @objBoxElement.y
    @objBoxElement.x = @objBoxElement.objBox.mouseX
    @objBoxElement.y = @objBoxElement.objBox.mouseY
    @objBoxElement.drawDrag()  if @objBoxElement.drawDrag

  onDrop:(event)->
    @objBoxElement.dragdrop = false
    @objBoxElement.drawDrop()  if @objBoxElement.drawDrop

  getVectors:(arrVectors)->
    intQtdVectors = arrVectors.length
    if arrVectors.length is 0
      @objBoxElement.dx = 0
      @objBoxElement.dy = 0
      return
    dblX = 0
    dblY = 0
    i = 0

    while i < intQtdVectors
      objVector = arrVectors[i]
      dblX += objVector.dx
      dblY += objVector.dy
      ++i
    dx = Math.round(dblX / intQtdVectors)
    dy = Math.round(dblY / intQtdVectors)
    dx = @intMaxForce  if dx > @intMaxForce
    dx = -@intMaxForce  if dx < -@intMaxForce
    dy = @intMaxForce  if dy > @intMaxForce
    dy = -@intMaxForce  if dy < -@intMaxForce
    @objBoxElement.dx = dx
    @objBoxElement.dy = dy


  getConnectorForce:( objElementFrom , objElementTo )->

    if !objElementFrom.isConnector and objElementTo.isConnector
      arrVector = @getConnectorForce( objElementTo , objElementFrom )
      if arrVector?
        arrVector[ "dx" ] *= -1
        arrVector[ "dy" ] *= -1
      return arrVector

    if !objElementFrom.isConnector
      return null

    if( objElementFrom.objElementFrom != objElementTo && 
        objElementFrom.objElementTo != objElementTo )
      return null

    dblDistanceX = objElementFrom.x - objElementTo.x
    dblDistanceY =  objElementFrom.y - objElementTo.y
    dblDistanceX2 = dblDistanceX * dblDistanceX
    dblDistanceY2 = dblDistanceY * dblDistanceY
    dblDistance = Math.round( 100 * Math.sqrt( dblDistanceX2 + dblDistanceY2 ) ) / 100

    intConnectorPush = 100
    intPushFactor = 2
    intMinForce = 0

    intConnectorForce = Math.round( 100 * dblDistance / intConnectorPush ) / 100
    intConnectorForce = Math.round( 100 * Math.pow( intConnectorForce , intPushFactor ) ) / 100

    if intConnectorForce > intMinForce
      intDx = Math.round( 100 * intConnectorForce * Math.round( 100 * dblDistanceX / dblDistance ) ) / 100
      intDy = Math.round( 100 * intConnectorForce * Math.round( 100 * dblDistanceY / dblDistance ) ) / 100 
      
      arrVector = Array()
      arrVector["dx"] = intDx
      arrVector["dy"] = intDy
      return arrVector

    return null

  getElementForce:(objElementFrom, objElementTo)->

    objVector = Array()
    objVector["dx"] = 0
    objVector["dy"] = 0
    
    booCollision = false
    
    intDirectionX = (if (objElementTo.x < objElementFrom.x) then -1 else 1)
    intDirectionY = (if (objElementTo.y < objElementFrom.y) then -1 else 1)
    
    intDifX = objElementTo.x - objElementFrom.x
    intDifY = objElementTo.y - objElementFrom.y
    
    dblDist = Math.sqrt((intDifX * intDifX) + (intDifY * intDifY))
    
    if dblDist > 1
      dblForceX = objElementFrom.objBox.width / (dblDist)
      dblForceY = objElementFrom.objBox.height / (dblDist)
    else
      dblForceX = 0
      dblForceY = 0
    
    if !booCollision and 
        (objElementTo.x1)     and (objElementTo.x0)     and (objElementTo.y1)     and (objElementTo.y0) and 
        (@objBoxElement.x1) and (objElementFrom.x0) and (objElementFrom.y1) and (objElementFrom.y0) and 
        (objElementTo.x0 >= objElementFrom.x0) and (objElementTo.x0 <= objElementFrom.x1) and 
        (objElementTo.y0 >= objElementFrom.y0) and (objElementTo.y0 <= objElementFrom.y1)
      objVector["dx"] -= @intRepelling + Math.round((objElementFrom.x1 - objElementTo.x0) * @dblCollisionForce)
      objVector["dy"] -= @intRepelling + Math.round((objElementFrom.y1 - objElementTo.y0) * @dblCollisionForce)
      booCollision = true
    
    if !booCollision and 
        (objElementTo.x1)     and (objElementTo.x0)     and (objElementTo.y1)     and (objElementTo.y0) and 
        (objElementFrom.x1) and (objElementFrom.x0) and (objElementFrom.y1) and (objElementFrom.y0) and 
        (objElementTo.x0 <= objElementFrom.x1) and (objElementTo.x0 >= objElementFrom.x0) and 
        (objElementTo.y1 <= objElementFrom.y1) and (objElementTo.y1 >= objElementFrom.y0)
      objVector["dx"] -= @intRepelling + Math.round((objElementFrom.x1 - objElementTo.x0) * @dblCollisionForce)
      objVector["dy"] += @intRepelling + Math.round((objElementTo.y1 - objElementFrom.y0) * @dblCollisionForce)
      booCollision = true
    
    if !booCollision and 
        (objElementTo.x1)     and (objElementTo.x0)     and (objElementTo.y1)     and (objElementTo.y0) and 
        (objElementFrom.x1) and (objElementFrom.x0) and (objElementFrom.y1) and (objElementFrom.y0) and 
        (objElementTo.x1 <= objElementFrom.x1) and (objElementTo.x1 >= objElementFrom.x0) and 
        (objElementTo.y0 <= objElementFrom.y1) and (objElementTo.y0 >= objElementFrom.y0)
      objVector["dx"] += @intRepelling + Math.round((objElementTo.x1 - objElementFrom.x0) * @dblCollisionForce)
      objVector["dy"] -= @intRepelling + Math.round((objElementFrom.y0 - objElementTo.y0) * @dblCollisionForce)
      booCollision = true
    
    if !booCollision and 
        (objElementTo.x1)     and (objElementTo.x0)     and (objElementTo.y1)     and (objElementTo.y0) and 
        (objElementFrom.x1) and (objElementFrom.x0) and (objElementFrom.y1) and (objElementFrom.y0) and 
        (objElementTo.x1 >= objElementFrom.x1) and (objElementTo.x1 <= objElementFrom.x0) and 
        (objElementTo.y1 >= objElementFrom.y0) and (objElementTo.y1 <= objElementFrom.y1)
      objVector["dx"] += @intRepelling + Math.round((objElementTo.x1 - objElementFrom.x0) * @dblCollisionForce)
      objVector["dy"] += @intRepelling + Math.round((objElementTo.y1 - objElementFrom.y0) * @dblCollisionForce)
      booCollision = true
    
    objVector["dx"] += @intMagnetism * intDirectionX * dblForceX
    objVector["dy"] += @intMagnetism * intDirectionY * dblForceY
    
    dblDirectionChange = Math.round( 100 * Math.sqrt( objVector["dx"] * objVector["dx"] + objVector["dy"] * objVector["dy"] ) ) / 100
    
    objVector["dx"] += Math.round( 100 * @intRepelling + ( Math.random( dblDirectionChange ) - ( dblDirectionChange / 2 ) ) / @intDirectionChangeLoss ) / 100
    objVector["dy"] += Math.round( 100 * @intRepelling + ( Math.random( dblDirectionChange ) - ( dblDirectionChange / 2 ) ) / @intDirectionChangeLoss ) / 100
    
    if booCollision
      objVector["dx"] += Math.round( 100 * ( Math.random() * dblDirectionChange - ( dblDirectionChange / 2 ) ) / @intDirectionChangeLoss ) / 100
      objVector["dy"] += Math.round( 100 * ( Math.random() * dblDirectionChange - ( dblDirectionChange / 2 ) ) / @intDirectionChangeLoss ) / 100
      objVector["dx"] += Math.round( 100 * ( Math.random() * dblDirectionChange - ( dblDirectionChange / 2 ) ) / @intDirectionChangeLoss ) / 100
      objVector["dy"] += Math.round( 100 * ( Math.random() * dblDirectionChange - ( dblDirectionChange / 2 ) ) / @intDirectionChangeLoss ) / 100
    
    return objVector
