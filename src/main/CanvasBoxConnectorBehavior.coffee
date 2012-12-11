class CanvasBoxConnectorBehavior
    objBox: null

    objBoxElement: null

    intXDistance: 0

    intYDistance: 0
    
    constructor:( objBoxElement )->
        this.objBoxElement = objBoxElement;
        this.objBox = objBoxElement.objBox;

    draw:()->
        return this.objBoxElement.draw();

    refresh:()->
        this.objBoxElement.refresh();

    isInside:()->
        return this.objBoxElement.isInside();

    onTimer:()->
        this.move();

    onMouseOver:( event )->
        if( this.objBoxElement.drawMouseOver )
            this.objBoxElement.drawMouseOver( event );

    onMouseOut:( event )->
        if( this.objBoxElement.drawMouseOut )
            this.objBoxElement.drawMouseOut( event );

    onDblClick:( event )->
        if( this.objBoxElement.drawFixed )
            this.objBoxElement.drawFixed( !this.objBoxElement.fixed  );

    onDrag:( event )->
        intOldX = Math.round( ( this.objBoxElement.objElementFrom.x + this.objBoxElement.objElementTo.x ) / 2 );
        intOldY = Math.round( ( this.objBoxElement.objElementFrom.y + this.objBoxElement.objElementTo.y ) / 2 );
        this.objBoxElement.booDrag = true;

        this.intXDistance = this.objBoxElement.objBox.mouseX - intOldX;
        this.intYDistance = this.objBoxElement.objBox.mouseY - intOldY;

    onDrop:( event )->
        this.objBoxElement.booDrag = false;

    onMouseDown:( event )->

    onClick:( event )->

    move:()->
        if( this.objBoxElement.fixed )
            return;
        if( this.objBoxElement.objElementFrom != this.objBoxElement.objElementTo )
            this.objBoxElement.x = ( this.objBoxElement.objElementFrom.x + this.objBoxElement.objElementTo.x ) / 2  + this.intXDistance;
            this.objBoxElement.y = ( this.objBoxElement.objElementFrom.y + this.objBoxElement.objElementTo.y ) / 2  + this.intYDistance;
        else
            if( Math.sqrt( this.intXDistance * this.intXDistance + this.intYDistance * this.intYDistance ) < 100 )
                this.intXDistance = 100;
                this.intYDistance = 100;
            this.objBoxElement.x = ( this.objBoxElement.objElementFrom.x + this.intXDistance );
            this.objBoxElement.y = ( this.objBoxElement.objElementFrom.y + this.intYDistance );

    getForceOld:( objElement )->
        
        return []
        intToClose = 100

        arrVector = Array()
        arrVector["dx"] = 0
        arrVector["dy"] = 0

        dblDiffX = objElement.x - @x
        dblDiffY = objElement.y - @y
        dblDiffX2 = dblDiffX * dblDiffX
        dblDiffY2 = dblDiffY * dblDiffY
        dblDiff = Math.sqrt( dblDiffX + dblDiffY )

        if( dblDiff > intToClose )
            return arrVector

        arrVector["dx"] = 0 if isNaN arrVector["dx"]
        arrVector["dy"] = 0 if isNaN arrVector["dx"]

        arrVector["dx"] = Math.abs( intToClose / 1.4142 - dblDiffX )
        arrVector["dy"] = Math.abs( intToClose / 1.4142 - dblDiffY )

        arrVector["dx"] *= -1 if dblDiffX < 0
        arrVector["dy"] *= -1 if dblDiffY < 0

        return arrVector;
        
    changeBehavior:( strNewBehavior )->
        objNewBehavior = New[ strNewBehavior ]( this.objBoxElement );
        objNewBehavior.dx = this.dx;
        objNewBehavior.dy = this.dy;
        objNewBehavior.intXDistance = this.intXDistance;
        objNewBehavior.intYDistance = this.intYDistance;
        objNewBehavior.objBox = this.objBox;
        this.objBoxElement.objBehavior = objNewBehavior;
        return objNewBehavior;        

    getForce:( objElement )->
        return null