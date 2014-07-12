###
# An example of collision detection and key events
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
###
Load.CanvasBox()
class CanvasCollisionExample extends CanvasBox

	init:()->

		console.log( "canvas box collision example" );

		###
		# create the canvas box
		###
		@setBackgroundColor( "white" );

		###
		# create the square element
		###
		objSquare = New.CollisionSquare();
		objSquare.x = @width / 2;
		objSquare.y = @height / 2;

		###
		# add the square into the box
		###
		@addElement( objSquare );

		###
		# create the square element
		###
		objSquare = New.CollisionSquare();
		objSquare.x = @width - objSquare.side;
		objSquare.y = @height - objSquare.side;

		###
		# add the square into the box
		###
		@addElement( objSquare );

		###
		# play the box
		###
		@play()