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
    #   Rotate the element 45⁰
    ##
    dblRotate: 45

    dblRotateSpeed: 0.001

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
        @changeContext();
        @objBox.setFillStyle( @color );
        @objBox.fillRect( 
            Math.round( - ( this.side / 2 ) ) , 
            Math.round( - ( this.side / 2 ) ),
            Math.round( this.side ) , 
            Math.round( this.side ) );
        @objBox.setStrokeStyle( @borderColor );
        @objBox.lineWidth = "#{@borderWidth}px";
        @objBox.strokeRect( 
            Math.round( - ( this.side / 2 ) ) , 
            Math.round( - ( this.side / 2 ) ),
            Math.round( this.side ) , 
            Math.round( this.side ) );
        @restoreContext();
        
        return this;    

    ##
    # Mouse over event
    ##
    onMouseOver:( event )->
        console.log( "square over" );
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
        return super( event );

    onClick:( event )->
        @dblRotateSpeed *= -1;
        @side += 5 if @side < 200
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
        objPointA = @rotatePosition( ( - @side / 2 ), 
                                     ( - @side / 2 ) );
        objPointB = @rotatePosition( ( + @side / 2 ), 
                                     ( + @side / 2 ) );
        objPointC = @rotatePosition( ( + @side / 2 ), 
                                     ( - @side / 2 ) );
        objPointD = @rotatePosition( ( - @side / 2 ), 
                                     ( + @side / 2 ) );

        objPointA.x += @x;
        objPointA.y += @y;
        objPointB.x += @x;
        objPointB.y += @y;
        objPointC.x += @x;
        objPointC.y += @y;
        objPointD.x += @x;
        objPointD.y += @y;

        intMinX = Math.min( objPointA.x , objPointB.x , objPointC.x , objPointD.x );
        intMinY = Math.min( objPointA.y , objPointB.y , objPointC.y , objPointD.y );
        intMaxX = Math.max( objPointA.x , objPointB.x , objPointC.x , objPointD.x );
        intMaxY = Math.max( objPointA.y , objPointB.y , objPointC.y , objPointD.y );

        booInside = ( mouseX >= intMinX ) &&
                    ( mouseX <= intMaxX ) &&
                    ( mouseY >= intMinY ) &&
                    ( mouseY <= intMaxY );
        return booInside;

    rotatePosition:( intPositionX , intPositionY )->
        intNewPositionX = Math.round( Math.cos( @dblRotate ) * intPositionX - Math.sin( @dblRotate ) * intPositionY );
        intNewPositionY = Math.round( Math.sin( @dblRotate ) * intPositionX - Math.cos( @dblRotate ) * intPositionY );
        return { x: intNewPositionX , y: intNewPositionY }

    onTimer:->
        @dblRotate += @dblRotateSpeed;
        @dblRotate %= 2 * Math.PI;
        @objBox.change();
        return super( event );