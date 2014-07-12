##
# A example of how to use the canvas box with drag and drop events, changing the size and colors.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
Load.CanvasBoxElement();
class DragDropSquare extends CanvasBoxElement

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
    color: "rgb(150,150,250)"
    
    ##
    # Square Border Color
    ##
    borderColorRegular: "rgb(100,100,100)"

    ##
    # Square Border Color
    ##
    borderColor:  "rgb(100,100,100)"

    ##
    # Square Border Color
    ##
    borderColorOver: "rgb( 0 , 0, 0 )"

    ##
    # Square Border Width
    ##
    borderWidth: 2
        
    ###
    # Draw the Square
    # @return Square me
    ###
    draw:->
        @refresh();
        @changeContext();
        @objBox.setFillStyle( @color );
        @objBox.fillRect( 
            Math.round( -( this.side ) / 2 ) , 
            Math.round( -( this.side ) / 2 ),
            Math.round( this.side ) , 
            Math.round( this.side ) );
        @objBox.setStrokeStyle( @borderColor );
        @objBox.setLineWidth( "#{@borderWidth}px" );
        @objBox.strokeRect( 
            Math.round( -( this.side ) / 2 ) , 
            Math.round( -( this.side ) / 2 ),
            Math.round( this.side ) , 
            Math.round( this.side ) );
        @objBox.setStrokeStyle( "black" ); 
        @objBox.strokeText( "Drag and Drop", -( @side / 2 ) + 20, 0  );
        @restoreContext();
        return this;    

    ##
    # Mouse over event
    ##
    onMouseOver:( event )->
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