##
# Canvas Box Button
# 
# Interactive Elements to make possible to create 
# new interactions without the use of the menu
# 
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
class CanvasBoxFixedButton

    ##
    # Button Title
    #
    # @var string
    ##
    strTitle: "Default Button"

    ##
    # Button padding Top
    #
    # @var integer
    ##
    intPaddingTop: 0
    
    ##
    # Button padding Left
    #
    # @var integer
    ##
    intPaddingLeft: 0

    ##
    # X Position of the Button relative to the element what it's belong to
    #
    # @var integer
    ##
    intRelativeX: 0

    ##
    # Y Position of the Button relative to the element what it's belong to
    #
    # @var integer
    ##
    intRelativeY: 0

    ##
    # X Absolute Position
    #
    # @var integer
    ##
    x: 0

    ##
    # Y Absolute Position
    #
    # @var integer
    ##
    y: 0

    ##
    # Possibles Horizontal Positions
    #
    # @var string[]
    ##
    arrPositionsHorizontal: Array( "left" , "center" , "right")

    ##
    # Button Horizontal Position
    #
    # @var string
    ##
    strPositionHorizontal: "right"

    ##
    # Possibles Vertical Positions
    #
    # @var string[]
    ##
    arrPositionsVertical: Array( "top" , "middle" , "bottom")

    ##
    # Button Vertical Position
    #
    # @var string
    ##
    strPositionVertical: "top"

    ##
    # Button Width
    #
    # @var integer
    ##
    width: 55

    ##
    # Button Height
    #
    # @var integer
    ##
    height: 55

    ##
    # Distance between the button and the element
    #
    # @var integer
    ##
    borderWidth: 20

    ##
    # Distance between the button and the element
    #
    # @var integer
    ##
    borderHeight: 20

    ##
    # @var CanvasBoxButton|null
    ##
    objPreviousButton: null

    ##
    # CanvasboxElement parent of this Button
    #
    # @var CanvasBoxElement|null
    ##
    objElement: null

    ##
    # Flag to control if the mouse is over the element
    #
    # @var bool
    ##
    booMouseOver: false

    ##
    # Constructor of the Canvas Box Button
    # 
    # @param objElement CanvasBoxElement
    # @return void
    ##
    initialize:( objElement )->
        @objElement = objElement;
        @x = 0;
        @y = 0;
        @booMouseOver = false;
        @strPositionVertical = "top";
        @strPositionHorizontal = "right";
        @objPreviousButton = null;

    ##
    # Refresh Position of button based on style attributes
    #
    # @return void
    ##
    refresh:()->
        if( @objPreviousButton == null )
            switch( @strPositionHorizontal )
                when "left" 
                  @intRelativeX = 0;
                
                when "center" 
                  @intRelativeX = @objElement.width / 2;
                
                when "right" 
                  @intRelativeX = @objElement.width - @width - @borderWidth * 2;
                
                else throw Error( "invalid horizontal position " + @strPositionHorizontal );

            switch( @strPositionVertical )
                when "top" 
                  @intRelativeY = 0;
                
                when "middle" 
                  @intRelativeY = @objElement.height / 2;
                
                when "bottom" 
                  @intRelativeY = @objElement.height - @borderHeight;
                
                else throw Error( "invalid vertical position " + @strPositionVertical );
        else
            switch( @strPositionHorizontal )
                when "left" 
                    if( @strPositionVertical == "middle" )
                        @intRelativeX = @objPreviousButton.intRelativeX;
                    else
                        @intRelativeX = @objPreviousButton.intRelativeX + @objPreviousButton.width + @objPreviousButton.borderWidth;

                when "center" 
                    @intRelativeX = @objElement.width / 2;
                
                when "right" 
                    if( @strPositionVertical == "middle" )
                        @intRelativeX = @objPreviousButton.intRelativeX;
                    else
                        @intRelativeX = @objPreviousButton.intRelativeX - @width - @borderWidth;
                else
                    throw Error( "invalid horizontal position " + @strPositionHorizontal );

            switch( @strPositionVertical )
                when "top"
                    if( @strPositionHorizontal == "center" )
                        @intRelativeY = @objPreviousButton.intRelativeY - @height - @borderHeight;
                    else
                        @intRelativeY = -@height - @borderHeight;
                
                when "middle"
                    @intRelativeY = @objPreviousButton.intRelativeY + @height + @borderHeight;
                
                when "bottom"
                    if( @strPositionHorizontal == "center" )
                        @intRelativeY = @objPreviousButton.intRelativeY + @objPreviousButton.height + @objPreviousButton.borderHeight;
                    else
                        @intRelativeY = @objElement.height + @borderHeight;
                else
                    throw Error( "invalid vertical position " + @strPositionVertical );

        @x = @intRelativeX + @intPaddingLeft;
        @y = @intRelativeY + @intPaddingTop;

    ##
    # Draw the button effect of mouse out
    #
    # @return void
    ##
    drawOut:()->
        @objElement.getContext().save();
        @objElement.getContext().fillStyle = ( "rgb( 250 , 250 , 250 )" );
        @objElement.getContext().globalAlpha = ( 0.1 );
        @objElement.getContext().fillRect(
            Math.round( @x ) ,
            Math.round( @y ) ,
            Math.round( @width ) ,
            Math.round( @height )
        );

        @objElement.getContext().strokeStyle = ( "rgb( 100 , 100 , 100 )" );
        @objElement.getContext().lineWidth = ( 1 );
        @objElement.getContext().strokeRect(
            Math.round( @x ) ,
            Math.round( @y ) ,
            Math.round( @width ) ,
            Math.round( @height )
        );
        @objElement.getContext().restore();

    ##
    # Draw the button effect of mouse over
    #
    # @return void
    ##
    drawOver:()->
        @objElement.getContext().save();
        @objElement.getContext().globalAlpha = ( 1 );
        @objElement.getContext().fillStyle = ( 'rgb( 230 , 230 , 250 )' );
        @objElement.getContext().fillRect(
            Math.round( @x ) ,
            Math.round( @y ) ,
            Math.round( @width ) ,
            Math.round( @height )
        );
        @objElement.getContext().strokeStyle = ( "blue" );
        @objElement.getContext().lineWidth = ( 1 ); #1px
        @objElement.getContext().strokeRect(
            Math.round( @x ) ,
            Math.round( @y ) ,
            Math.round( @width ) ,
            Math.round( @height )
        );
        @objElement.getContext().restore();

    ##
    # Draw the button icon
    #
    # @return void
    ##
    drawIcon:()->
        @objElement.getContext().beginPath();
        @objElement.getContext().save();
        @objElement.getContext().strokeStyle = ( "rgb( 20, 20, 20)" );
        @objElement.getContext().fillStyle = ( @booMouseOver ? "rgb( 250, 250, 250)" : "rgb( 220, 220, 220)"  );
        @objElement.getContext().moveTo( @x  , @y + @height  );
        @objElement.getContext().lineTo( @x + 6 , @y + @height - 2 );
        @objElement.getContext().lineTo( @x + 8 , @y + @height - 8 );
        @objElement.getContext().lineTo( @x + 16 , @y + @height - 16 );
        @objElement.getContext().lineTo( @x + 30 , @y + @height - 16 );
        @objElement.getContext().lineTo( @x + 30 , @y + @height - 30 );
        @objElement.getContext().lineTo( @x + 16 , @y + @height - 30 );
        @objElement.getContext().lineTo( @x + 16 , @y + @height - 16 );
        @objElement.getContext().lineTo( @x + 8 , @y + @height - 8 );
        @objElement.getContext().lineTo( @x + 2 , @y + @height - 6 );
        @objElement.getContext().lineTo( @x , @y + @height );
        @objElement.getContext().stroke();
        @objElement.getContext().fill();
        @objElement.getContext().restore();
        @objElement.getContext().closePath();

    ##
    # Draw the button title
    #
    # @return void
    ##
    drawTitle:()->
          @objElement.getContext().save();
          @objElement.getContext().shadowOffsetX = ( 2 );
          @objElement.getContext().shadowOffsetY = ( 2 );
          @objElement.getContext().shadowBlur = ( 2 );
          @objElement.getContext().shadowColor = ( "rgba(250, 250, 250, 0.8)" );
          @objElement.getContext().font = ( "20px Times New Roman" );
          @objElement.getContext().fillStyle = ("rgb( 100 , 100, 100 )");
          @objElement.getContext().textAlign = "left";
          @objElement.getContext().fillText( @strTitle , @x + @width + @borderWidth , @y + @height / 2 + @borderHeight / 2 );
          @objElement.getContext().restore();

    ##
    # Draw the Button with effects and title
    #
    # @return void
    ##
    drawButton:()->
        
        if( @booMouseOver )
            @drawOver();
        else
            @drawOut();
        
        try
          @drawIcon( @booMouseOver , @x , @y  );
        catch e
          @objElement.getContext().strokeText( @strClassName , @x , @y );

    ##
    # Recalculate the button dynamic attributes and draw the button
    #
    # @return void
    ##
    draw:()->
        @refresh();
        if ( @objElement.booMouseOver )
            @drawButton();
            if( @booMouseOver )
                @drawTitle();

    ##
    # On Click Event
    #
    # @return CanvasBoxElement
    ##
    onClick:( event )->
        return CanvasBoxClass::createRelation( @objElement , true, "CanvasBoxAggregation" );

    ##
    # On Drag Event
    #
    # @return CanvasBoxElement
    ##
    onDrag:( event )->
        objElement = @onClick( event );
        objElement.intMass = 0;
        objElement.select();
        return objElement;

    ##
    # Returns If the Mouse inside of button area
    #
    # @return bool
    ##
    isInside:( mouseX , mouseY )->
        @refresh()
        if   (mouseX >= @x - @borderWidth / 2) and 
             (mouseX <= @x + @width + @borderWidth / 2) and 
             (mouseY >= @y - @borderHeight / 2) and 
             (mouseY <= @y + @height + @borderHeight / 2)
          @booMouseOver = true
          return true
        @booMouseOver = false
        return false;