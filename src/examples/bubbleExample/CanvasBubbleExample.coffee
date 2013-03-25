###
# This example focus into how to create, change and destroy many
# objects without big coding work. It shows too, how to manipulate
# the canvas box to override native events and deal with collision.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
# @see Bubble
###
Load.CanvasBox()
class CanvasBubbleExample extends CanvasBox

	onClick:( event )->
		objBubble = New.Bubble()
		objBubble.x = @mouseX
		objBubble.y = @mouseY
		@addElement( objBubble );
		return super

	init:()->

		console.log( "canvas box bubble example" );

		@setBackgroundColor( "#DDDDFF" );
		window.setInterval( 
			() =>
				@loopTimer()
			, 100 
		);
		@play();

	
	loopTimer:()->
		console.log( "loop timer " , @arrElements.length );
		return false if( @arrElements.length > 10 )
		if ( Math.floor( Math.random() * 10 ) == 5 )
			objBubble = New.Bubble()
			objBubble.x = Math.floor( Math.random() * @width )
			objBubble.y = @height - Math.floor( Math.random() * @height / 8 )
			@addElement( objBubble )
