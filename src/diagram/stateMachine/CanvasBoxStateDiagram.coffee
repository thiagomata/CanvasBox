Load.CanvasBox();
class CanvasBoxStateDiagram extends CanvasBox
  strClassName: "CanvasBoxStateDiagram"
  
  defineMenu:->
    @objMenu = New.CanvasBoxMenu()
    @objMenu.objParent = this
    @objMenu.ojbBox = this
    @objMenu.ojbParent = this
    @objMenu.arrMenuItens =
      0:
        name: "create state",
        event:( objParent )=>
          objState = New.CanvasBoxState();
          objState.objBehavior = New.CanvasBoxMagneticBehavior( objState );
          objState.x = objParent.mouseX;
          objState.y = objParent.mouseY;
          objParent.addElement( objState );
    @objMenuSelected = null;
    
  addLine:( objElementFrom , objElementTo )->
    if( objElementFrom == null )
        throw new CanvasBoxException( "Line has no element from" );
    if( objElementTo == null )
        throw new CanvasBoxException( "Line has no element to" );
    objStateLine = New.CanvasBoxLine( objElementFrom , objElementTo );
    this.addElement( objStateLine );
    return objStateLine;
    
  addState:( strStateName , posX , posY )->
    objStateElement = New.CanvasBoxState();
    objStateElement.x = posX;
    objStateElement.y = posY;
    objStateElement.strStateName = strStateName;
    this.addElement( objStateElement );
    return objStateElement;

  load:( objJsonInport )->
    arrStates = [];
    for keyState , objStateJson of objJsonInport.states
        objState = @addState( objStateJson.name , objStateJson.x , objStateJson.y );
        if( objStateJson.color )
          objState.fillColor = objStateJson.color;
        arrStates[ objStateJson.id ] = objState;
        
    for keyLine , objLineJson of objJsonInport.lines
        objLine = @addLine( arrStates[ objLineJson.from ] ,  arrStates[ objLineJson.to ] );
        objLine.strName = objLineJson.name
