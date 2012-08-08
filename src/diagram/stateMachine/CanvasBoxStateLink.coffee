Load.CanvasBoxLine();
class CanvasBoxStateLink extends CanvasBoxLine

    strClassName: "CanvasBoxStateLink"

    strName: null
    
    strTitle: null

    draw:()->
        return super;
        
        
        if( @objElementFrom == null )
          throw New.CanvasBoxException( "Canvas Box State link has not the ElementFrom" );
        
        if( @objElementTo == null )
          throw New.CanvasBoxException( "Canvas Box State link has not the ElementTo" );
          
        @refresh();
        @objBox.saveContext();

        @objBox.setStrokeStyle( @lineStyle );
        @objBox.setFillStyle( @color );
        @objBox.moveTo( @x , @y );

        @objBox.beginPath();
        @objBox.arc( @x , @y , @side , 0 ,  Math.PI * 2 , true );
        @objBox.fill();

        @objBox.setTextAlign( "left" );
            
        if( @mouseOver || @objBox.objElementClicked == this )
            @objBox.setStrokeStyle( @lineStyle );
            @objBox.arc( @x, @y, @side , 0 ,  Math.PI * 2 , true );
            @objBox.stroke();

        if( @strName )
            @objBox.strokeText( @strName , @x + 10 , @y - 10 );

        @objBox.setStrokeStyle( @lineStyle );
        @objBox.setLineWidth( @borderWidth );
        @drawLine( @x , @y , @objElementFrom.x , @objElementFrom.y );
        @drawLine( @x , @y , @objElementTo.x , @objElementTo.y );
        @objBox.stroke();
        @objBox.closePath();
        @objBox.moveTo( @x , @y );
        @objBox.restoreContext();
        
        @z = 1;

        return false;
        
        if( @objElementFrom.strClassName != @strClassName )
            @createConnectorFrom();
            @z = 2;

        if( @objElementTo.strClassName != @strClassName )
            @createConnectorTo();
            @z = 2;

        @objBox.restoreContext();

    toSerialize:()->
        objResult =
          x:                    Math.round( @x )
          y:                    Math.round( @y )
          side:                 @side
          color:                @color
          borderColor:          @borderColor
          borderWidth:          @borderWidth
          intMass:              @intMass
          intMagnetism:         @intMagnetism
          intWallRepelsForce:   @intWallRepelsForce
          strClassName:         @strClassName
          
        return objResult;

    drawArrowTo:( intSide )->
        @objContext.moveTo(-10, 15);
        @objContext.lineTo(0, 0);
        @objContext.lineTo(10, 15);

    drawConnectorTo:( objPointer , intSide )->
        @drawBackgroundCircle( intSide );
        @objContext.beginPath();
        @objContext.strokeStyle = "rgb( 70, 70, 70)";
        @drawArrowTo( intSide );
        @objContext.stroke();