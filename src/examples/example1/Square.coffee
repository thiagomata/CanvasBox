##
# A simple example of how to use the canvas box.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
Load.CanvasBoxElement();
class Square extends CanvasBoxElement

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
    color: "blue"
    
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

    constructor:()->
        @color = @colorRegular
        @borderColor = @borderColorRegular
        super();

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

    ##
    # On drag event
    ##
    onDrag:( event )->
        @color = @colorDrag
        return super( event );

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
    # @param mouseX integer horizontal position of cursor pointer
    # @param mouseY integer vertical position of the cursor pointer
    # @return boolean
    ## 
    isInsideElement:( mouseX , mouseY )->
        return  ( mouseX >= ( this.x - @side / 2 ) ) &&
                ( mouseX <= ( this.x + @side / 2 ) ) &&
                ( mouseY >= ( this.y - @side / 2 ) ) &&
                ( mouseY <= ( this.y + @side / 2 ) );