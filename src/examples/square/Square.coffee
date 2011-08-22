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
    side: 30

    ##
    # Regular Square Color
    ##
    colorRegular: "rgb(250,250,250)"

    ##
    # Square Color on Drag Drop
    ##
    colorDrag: "rgb(250,250,250)"

    ##
    # Current Color
    ##
    color: @colorRegular
    
    ##
    # Square Border Color
    ##
    borderColorRegular: "rgb(100,100,100)"

    ##
    # Square Border Color
    ##
    borderColor: @borderColorRegular

    ##
    # Square Border Color
    ##
    borderColorOver: "rgb( 100 , 200, 100 )"

    ##
    # Square Border Width
    ##
    borderWidth: 1
        
    ##
    # Class Name
    ##
    strClassName: "Square"

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
            Math.round( this.x - this.side / 2  ) , 
            Math.round( this.y - this.side / 2 ),
            Math.round( this.side ) , 
            Math.round( this.side ) );
        @objBox.setStrokeStyle( @borderColor );
        @objBox.lineWidth = @borderWidth;
        @objBox.strokeRect( 
            Math.round( this.x - this.side / 2  ) , 
            Math.round( this.y - this.side / 2 ),
            Math.round( this.side ) , 
            Math.round( this.side ) );
        return this;    

    ##
    # Mouse over event
    ##
    onMouseOver:( event )->
        @borderColor = @borderColorOver;
        return super( event );

    ##
    # Mouse out event
    ##
    onMouseOut:( event )->
        @borderColor = @borderColorRegular;
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
        retur super( event );

    ##
    # Returns if the Mouse is Over the Element
    #
    # @param mouseX integer horizontal position of cursor pointer
    # @param mouseY integer vertical position of the cursor pointer
    # @return boolean
    ## 
    isInsideElement:( mouseX , mouseY )->
        return  ( mouseX >= @x0 ) &&
                ( mouseX <= @x1 ) &&
                ( mouseY >= @y0 ) &&
                ( mouseY <= @y1 );