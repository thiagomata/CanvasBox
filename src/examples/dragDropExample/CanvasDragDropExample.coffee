###
# An example of how to use the canvas box to deal with events into canvas.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
# @see DragDropSquare
###
Load.CanvasBox();
class CanvasDragDropExample extends CanvasBox

	init:()->

		console.log( "canvas box drag drop example" );

		@setBackgroundColor( "white" );

		### 
		# create the square element
		###
		objSquare = New.DragDropSquare();
		objSquare.x = @width / 2;
		objSquare.y = @height / 2;

		### 
		# add the square into the box
		###
		@addElement( objSquare );

		### 
		# play the box
		###
		@play();