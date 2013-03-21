Load.CanvasBox()
class CanvasBubbleExample extends CanvasBox

	onClick:( event )->
		objBubble = New.Bubble()
		objBubble.x = @mouseX
		objBubble.y = @mouseY
		@addElement( objBubble );
		return super

	init:()->
		@setBackgroundColor( "#DDDDFF" );
		window.setInterval( 
			()=>
				@loopTimer()
			, 100 
		);
		@play();

	
	loopTimer:()->
		return false if( @arrElements.length > 10 )
		if ( Math.floor( Math.random() * 10 ) == 1 )
			objBubble = New.Bubble()
			objBubble.x = Math.floor( Math.random() * @width )
			objBubble.y = @height - Math.floor( Math.random() * @height / 8 )
			@addElement( objBubble )
