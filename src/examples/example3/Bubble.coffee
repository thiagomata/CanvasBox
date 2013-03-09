##
# A simple example of how to use the canvas box.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
Load.CanvasBoxElement();
class Bubble extends CanvasBoxElement

    ##
    # X position
    ##
    x: 0

    ##
    # Y position
    ##
    y: 0

    ##
    # Size of each side of square
    ##
    side: 1
    
    ##
    # Regular Square Color
    ##
    colorRegular: "rgba(250,250,250,0.60)"

    ##
    # Current Color
    ##
    color: "rgba(250,250,250,0.60)"
    
    ##
    # Color Over
    ##
    colorOver: "orange"

    ##
    # Square Border Color
    ##
    borderColorRegular: "rgb(100,100,100)"

    ##
    # Square Border Color
    ##
    borderColor: "rgb(100,100,100)"

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
    strClassName: "Bubble"

    ##
    # Object Collision
    ##
    objCollision: null
    
    ###
    # Is Mouse Over Flag
    ###
    isOver: false

    init:->
        super();
        @color = @colorRegular
        @borderColor = @borderColorRegular

    draw:->
        @objBox.setStrokeStyle( @borderColor );
        @objBox.setFillStyle( @color );
        @objBox.setLineWidth(10);
        @objBox.setStrokeStyle( @borderColor );
        @objBox.beginPath();
        @objBox.arc( @x , @y , @side , 0 ,  Math.PI * 2 , true );
        @objBox.fill();
        @objBox.stroke();
        @objBox.closePath();
        
    ##
    # Serialize the important data of this element
    ##
    toSerialize:->
        objResult = super();
        objResult.color = @color;
        objResult.borderColor = @borderColor;
        objResult.side = @side;        
        return objResult;

    ##
    # Mouse over event
    ##
    onMouseOver:( event )->
        @borderColor = @borderColorOver;
        @color = @colorOver;
        @isOver = true;
        return false;

    ##
    # Mouse out event
    ##
    onMouseOut:( event )->
        @borderColor = @borderColorRegular;
        @color = @colorRegular;
        @isOver = false;
        return false;

    ##
    # On drag event
    # @param event
    # return boolean
    ##
    onDrag:( event )->
        @onMouseOver( event );
        return false

    ##
    # On drop event
    # @param event
    # return boolean
    ##
    onDrop:( event )->
        @onMouseOut( event );
        return false

    ##
    # On click event
    # @param event
    # return boolean
    ##
    onClick:( event )->
        @killMe()
        return false

    ##
    # On Timer Event
    ##
    onTimer:(event)->
        if( @isOver )
            return false 
        @y-=2;
        @side++;
        @objBox.change();
        if( @x < ( -1 * @side ) )
            @killMe();
            return false;
        if( @y < ( -1 * @side ) )
            @killMe();
            return false;
        if( @inCollision() )
            if( @y >= @objCollision.y )
                @side--;
                @y+=2;
            else
                @side--;
            return false;
        return super( event );

    isInsideElement:( mouseX , mouseY )->
       return false;
       
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

    inCollision:()->
        for objElement in @objBox.arrElements
            if( objElement? and objElement != this )
                dblDiffX = ( objElement.x - this.x );
                dblDiffY = ( objElement.y - this.y );
                dblSumSide = objElement.side + this.side;
                dblSquaredX = dblDiffX * dblDiffX;  
                dblSquaredY = dblDiffY * dblDiffY;  
                dblDistance = Math.sqrt( dblSquaredX + dblSquaredY );
                if( 
                    dblDistance <= dblSumSide
                  )
                      @objCollision = objElement;
                      return true;
        return false;
       