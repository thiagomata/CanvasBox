##
# Element to Test Collision.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
Load.CanvasBoxElement();
class CollisionSquare extends CanvasBoxElement

    ##
    # Size of each side of square
    ##
    side: 100

    ##
    # Regular Square Color
    ##
    colorRegular: "rgb(150,150,250)"

    ##
    # Mouse Over Square Color
    ##
    colorOver: "yellow"

    ##
    # Square Color on Drag Drop
    ##
    colorDrag: "rgb(100,100,250)"

    ##
    # Current Color
    ##
    color: null
    
    ##
    # Square Border Color
    ##
    borderColorRegular: "rgb(100,100,100)"

    ##
    # Square Border Color
    ##
    borderColor: null

    ##
    # Square Border Color
    ##
    borderColorOver: "rgb( 250 , 250, 250 )"

    ##
    # Square Border Width
    ##
    borderWidth: 2
        
    ##
    # Class Name
    ##
    strClassName: "Square"

    ##
    # Last Valid X
    ##
    intLastX: 0

    ##
    # Last Valid Y
    ##
    intLastY: 0

    constructor:->
        @color = @colorRegular
        @borderColor = @borderColorRegular
        return super();

    ##
    # Serialize the important data of this element
    ##
    toSerialize:->
        objResult = super;
        objResult.color = @color;
        objResult.borderColor = @borderColor;
        objResult.side = @side;        
        return objResult;
        
    ###
    # Draw the Square
    # @return Square me
    ###
    draw:->
        @refresh();
        @objBox.setFillStyle( @color );
        @objBox.fillRect( 
            Math.round( this.x - ( this.side / 2 ) ) , 
            Math.round( this.y - ( this.side / 2 ) ),
            Math.round( this.side ) , 
            Math.round( this.side ) );
        @objBox.setStrokeStyle( @borderColor );
        @objBox.lineWidth = "#{@borderWidth}px";
        @objBox.strokeRect( 
            Math.round( this.x - ( this.side / 2 ) ) , 
            Math.round( this.y - ( this.side / 2 ) ),
            Math.round( this.side ) , 
            Math.round( this.side ) );
        @objBox.setStrokeStyle( "black" ); 
        @objBox.strokeText( "Drag and Drop",@x - 30,@y);
        return this;    

    ##
    # Mouse over event
    ##
    onMouseOver:( event )->
        console.log( "square over" );
        @borderColor = @borderColorOver;
        @color = @colorOver;
        return super( event );

    ##
    # Mouse out event
    ##
    onMouseOut:( event )->
        @borderColor = @borderColorRegular;
        @color = @colorRegular;
        return super( event );

    checkValidPosition:()->
        if( @inCollision() )
            @x = @lastValidX;
            @y = @lastValidY;
        else
            @lastValidX = @x;
            @lastValidY = @y;
    ##
    # On drag event
    ##
    onDrag:( event )->
        @color = @colorDrag
        super( event );
        @checkValidPosition();
        return this;

    goLeft:( event )->
        super( event );
        @checkValidPosition();
        return this;

    goRight:( event )->
        super( event );
        @checkValidPosition();
        return this;

    goUp:( event )->
        super( event );
        @checkValidPosition();
        return this;

    goDown:( event )->
        super( event );
        @checkValidPosition();
        return this;

    ##
    # On drop event
    ##
    onDrop:( event )->
        @color = @colorRegular;
        return super( event );

    onClick:( event )->
        @side += 5 if @side < 200
        @onMouseOver( event );
        return super( event );

    onDblClick:(event)->
        @side = 100
        return super( event );

    ##
    # Returns if the Mouse is Over the Element
    #
    # @param outX
    # @param outY
    # @return boolean
    ## 
    isInsideElement:( outX , outY )->
        return  ( Math.round( outX ) >= Math.round( this.x - @side / 2 ) ) &&
                ( Math.round( outX ) <= Math.round( this.x + @side / 2 ) ) &&
                ( Math.round( outY ) >= Math.round( this.y - @side / 2 ) ) &&
                ( Math.round( outY ) <= Math.round( this.y + @side / 2 ) );

    inCollision:()->
        for objElement in @objBox.arrElements
            if( objElement.getId() != this.getId() )
                if( 
                        objElement.isInsideElement( this.x - @side / 2 , this.y - @side / 2 ) ||
                        objElement.isInsideElement( this.x + @side / 2 , this.y - @side / 2 ) ||
                        objElement.isInsideElement( this.x - @side / 2 , this.y + @side / 2 ) ||
                        objElement.isInsideElement( this.x + @side / 2 , this.y + @side / 2 ) ||
                        objElement.isInsideElement( this.x - @side / 2 , this.y ) ||
                        objElement.isInsideElement( this.x + @side / 2 , this.y ) ||
                        objElement.isInsideElement( this.x , this.y + @side / 2 ) ||
                        objElement.isInsideElement( this.x , this.y - @side / 2 ) 
                  )
                      return true;
        return false;
