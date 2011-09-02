class CanvasBoxBehavior
    objBox: null

    objBoxElement: null

    intMargin: 20,

    strClassName: "CanvasBoxBehavior",
    
    toSerialize:->
        return {
        };
    
    constructor:( objBoxElement )->
        this.objBoxElement = objBoxElement;
        this.objBox = objBoxElement.objBox;
        this.objBoxElement.dx = 0;
        this.objBoxElement.dy = 0;

    onMouseOver:( event )->
        return false;

    onMouseOut:( event )->
        return false;

    onMouseDown:( event )->
        this.objBoxElement.relativeMousex = this.objBoxElement.x - this.objBoxElement.objBox.mouseX;
        this.objBoxElement.relativeMousey = this.objBoxElement.y - this.objBoxElement.objBox.mouseY;
        return false;

    onClick:( event )->
        return false;

    onDblClick:( event )->
        this.objBoxElement.setFixed( not this.objBoxElement.fixed );
        this.objBoxElement.draw();

    onDrag:( event )->
        this.objBoxElement.x = this.objBoxElement.objBox.mouseX + this.objBoxElement.relativeMousex;
        this.objBoxElement.y = this.objBoxElement.objBox.mouseY + this.objBoxElement.relativeMousey;
        return false;

    onDrop:( event )->
        return false;
    
    onTimer:->
        this.move();

    getForce:( objElement )->
        objVector = Array();
        return objVector;

    move:()->
        return true;
