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
    side: 20
    
    ##
    # Regular Square Color
    ##
    colorRegular: "rgba(250,250,250,0.60)"

    ##
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
    strClassName: "Bubble"

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
        return super( event );

    ##
    # Mouse out event
    ##
    onMouseOut:( event )->
        @borderColor = @borderColorRegular;
        return super( event );

    ##
    # On drag event
    # @param event
    # return boolean
    ##
    onDrag:( event )->
        @color = @colorDrag
        return super( event );

    ##
    # On drop event
    # @param event
    # return boolean
    ##
    onDrop:( event )->
        @color = @colorRegular;
        return super( event );

    ##
    # On Timer Event
    ##
    onTimer:(event)->
        @y-= 2;
        @side++;
        @objBox.change();
        if( @x < ( -1 * @side ) )
            @killMe();
            return false;
        if( @y < ( -1 * @side ) )
            @killMe();
            return false;
        return super( event );

    isInsideElement:( mouseX , mouseY )->
       return false;