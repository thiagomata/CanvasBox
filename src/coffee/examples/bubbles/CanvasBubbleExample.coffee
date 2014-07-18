###
# This example focus into how to create, change and destroy many
# objects without big coding work. It shows too, how to manipulate
# the canvas box to override native events and deal with collision.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
# @see Bubble
###
Load.canvas.CanvasBox()
class CanvasBubbleExample extends CanvasBox

  ###
  # On Canvas Box Click, Create a new bubble
  #
  # @param event
  # @see Bubble
  ###
  onBoxClick:( event )->
    objBubble = New.examples.bubbles.Bubble()
    objBubble.x = @mouseX
    objBubble.y = @mouseY
    @addElement( objBubble );
    return super

  ###
  # Prepare the timer of random bubble creation
  # @see CanvasBubbleExample::loopTimer()
  # @see Bubble
  ###
  init:()->

    @setBackgroundColor( "#DDDDFF" );
    window.setInterval( 
      () =>
        @loopTimer()
      , 50 
    );
    @play();

  ###
  # On timer, create some random bubbles
  # @see Bubble
  ###
  loopTimer:()->
    return false if( @arrElements.length > 10 )
    if ( Math.floor( Math.random() * 5 ) == 1 )
      objBubble = New.examples.bubbles.Bubble()
      objBubble.x = Math.floor( Math.random() * @width )
      objBubble.y = @height - Math.floor( Math.random() * @height / 8 )
      @addElement( objBubble )
