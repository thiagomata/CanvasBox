Load.CanvasBoxElement();
##
# Canvas Box of State Machine
##
class CanvasBoxState extends CanvasBoxElement

    ##
    # Element Width
    #
    # @var integer
    ##
    width: 90

    ##
    # Element Height
    #
    # @var integer
    ##
    height: 90

    ##
    # Element High
    #
    # @var integer
    ##
    z: 3

    ##
    # border Color
    #
    # @var string
    ##
    borderColor: "rgb(10,10,10)"

    ##
    # Element Border Width
    #
    # @var integer
    ##
    borderWidth: 1
    
    ##
    # Element Name
    #
    # @var string
    ##
    strStateName: "state"

    ##
    # Element fill color
    #
    # @var string
    ##
    fillColor: "rgb( 232 , 232, 255  )"

    ##
    # Element fixed color
    #
    # @var string
    ##
    fixedColor: "rgb( 200, 200 ,200 )"

    ##
    # Element color on mouse over
    #
    # @var string
    ##
    overColor: "rgb( 100 , 200 , 200 )"

    ##
    # Element color on drag
    #
    # @var string
    ##
    dragColor: "rgb( 200 , 200 , 250 )"

    ##
    # Class Name
    #
    # @var string
    ##
    strClassName: "CanvasBoxState"

    ##
    # Element Side size
    #
    # @var integer
    ##
    side: 45
    
    initialize:()->
        @init();        
        @objMenu = new autoload.newCanvasBoxMenu();
        @objMenu.objBox = @objBox;
        @objMenu.arrMenuItens =
            0:
                name: "create from state",
                event:( objParent ) =>
                    objClass = New.CanvasBoxState();
                    objClass.objBehavior = new window[ objParent.objBehavior.strClassName ]( objClass );
                    objClass.x = objParent.objBox.mouseX + 100;
                    objClass.y = objParent.objBox.mouseY + 100;
                    objParent.objBox.addElement( objClass );

                    objFrom = objClass;
                    objTo = objParent;
                    objLine = New.CanvasBoxStateLink( objFrom , objTo );
                    switch( objParent.objBehavior.strClassName )
                        when "CanvasBoxMagneticBehavior"
                            objLine.objBehavior = new autoload.newCanvasBoxMagneticConnectorBehavior( objLine );
                        when "CanvasBoxDefaultBehavior"
                        else
                            objLine.objBehavior = new autoload.newCanvasBoxDefaultConnectorBehavior( objLine );
                            
                    objLine.x =  ( objFrom.x + objTo.x  ) / 2
                    objLine.y =  ( objFrom.y + objTo.y  ) / 2
                    objParent.objBox.addElement( objLine );
            1:
                name: "create to state",
                event:( objParent ) =>

                    objClass = New.CanvasBoxState();
                    objClass.objBehavior = new window[ objParent.objBehavior.strClassName ]( objClass );
                    objClass.x = objParent.objBox.mouseX + 100;
                    objClass.y = objParent.objBox.mouseY + 100;
                    objParent.objBox.addElement( objClass );

                    objFrom = objParent;
                    objTo = objClass;
                    objLine = New.CanvasBoxStateLink( objFrom , objTo );
                    switch( objParent.objBehavior.strClassName )
                        when "CanvasBoxMagneticBehavior"
                            objLine.objBehavior = new autoload.newCanvasBoxMagneticConnectorBehavior( objLine );
                        when "CanvasBoxDefaultBehavior"
                        else
                            objLine.objBehavior = new autoload.newCanvasBoxDefaultConnectorBehavior( objLine );
                    objLine.x =  ( objFrom.x + objTo.x  ) / 2
                    objLine.y =  ( objFrom.y + objTo.y  ) / 2
                    objParent.objBox.addElement( objLine );

    toSerialize:()->
        objResult =
          x:                  Math.round( @x );
          y:                  Math.round( @y );
          width:              @width;
          height:             @height;
          Color:              @fillColor;
          borderColor:        @borderColor;
          borderWidth:        @borderWidth;
          intMass:            @intMass;
          intMagnetism:       @intMagnetism;
          strClassName:       @strClassName;
          arrAttributes:      @arrAttributes;
          arrMethods:         @arrMethods;
          fillColor:          @fillColor;
          fixedColor:         @fixedColor;
          overColor:          @overColor;
          dragColor:          @dragColor;
          intWallRepelsForce: @intWallRepelsForce;
        return objResult;
    
    refresh:()->
        @width = @side * 2;
        @height = @side * 2;
        @x0 = @x - ( @width / 2 );
        @x1 = @x + ( @width / 2 );
        @y0 = @y - ( @height / 2 );
        @y1 = @y + ( @height / 2 );
        super

    draw:()->
        @refresh();
        @objBox.saveContext();
        
        if( @mouseOver || @objBox.objElementClicked == this )
            ##
            # Draw External Border
            ##
            @objBox.setStrokeStyle( "rgb( 200 , 200 , 250 )" );
            @objBox.setLineWidth( 1 );
            @objBox.beginPath();
            @objBox.arc( @x , @y , @side + 10 , 0 ,  Math.PI * 2 , true );
            @objBox.stroke();
            @objBox.closePath();

        ##
        # Class Big Rect
        ##
        @objBox.setStrokeStyle( @borderColor );
        @objBox.setFillStyle( @fillColor );
        @objBox.beginPath();
        @objBox.arc( @x , @y , @side , 0 ,  Math.PI * 2 , true );
        @objBox.fill();
        @objBox.closePath();
        
        @objBox.setLineWidth( "0.5" );
        @objBox.setFont( "10px Arial lighter" );
        @objBox.setTextAlign( "center" );
        @objBox.strokeText( @strStateName  , @x , @y );
        @objBox.restoreContext();

    drawMouseOver:( event )->
        if(!@defaultColor)
            @defaultColor = @fillColor;
        @fillColor = @overColor;

    drawMouseOut:( event )->
        if( @defaultColor )
            @fillColor = if @fixed then @fixedColor else @defaultColor;

    drawDrag:( event )->
        if(!@defaultColor)
            @defaultColor = @fillColor;
        @fillColor = @dragColor;

    drawDrop:( event )->
        if( @defaultColor )
            @fillColor = if @fixed then @fixedColor else @defaultColor;

    drawFixed:( boolFixed )->
        console.log( "fixed! ");
        @fixed = boolFixed;
        
        if( boolFixed )
            @fillColor = @fixedColor;
        else
            @fillColor = if @mouseOver then @overColor else @defaultColor;
    
    rename:()->
        strClassNewName = prompt( "Inform the new name of the state." );
        if ( strClassNewName != null )
            @strStateName = strClassNewName;
    
    onMouseOver:()->
        console.log( "On Mouse Over" );
        super
    ##
    # Returns if the Mouse is Over the Element
    #
    # @param mouseX integer horizontal position of cursor pointer
    # @param mouseY integer vertical position of the cursor pointer
    # @return boolean
    ## 
    isInsideElement:( mouseX , mouseY )->
        return  ( mouseX >= ( @x - @side ) ) && 
                ( mouseX <= ( @x + @side ) ) && 
                ( mouseY >= ( @y - @side ) ) && 
                ( mouseY <= ( @y + @side ) );
        