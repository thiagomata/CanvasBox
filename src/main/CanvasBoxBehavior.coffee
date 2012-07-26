class CanvasBoxBehavior

    objBoxElement: null

    intMargin: 20,

    strClassName: "CanvasBoxBehavior",
    
    toSerialize:->
        return {
        };
    
    constructor:( objBoxElement )->
        this.objBoxElement = objBoxElement;
        this.objBoxElement.dx = 0;
        this.objBoxElement.dy = 0;

    getBox:()->
        return @objBoxElement.objBox;
        
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
        this.dragdrop = true;
        this.objBoxElement.x = this.objBoxElement.objBox.mouseX;
        this.objBoxElement.y = this.objBoxElement.objBox.mouseY;
        if( this.objBoxElement.drawDrag )
            this.objBoxElement.drawDrag();
        return false;

    onDrop:( event )->
        this.dragdrop = false;
        if( this.objBoxElement.drawDrop )
            this.objBoxElement.drawDrop();
    
    onTimer:->
        this.move();

    getForce:( objElement )->
        objVector = Array();
        return objVector;

    move:()->
        return true;