###
# Into this demo we will extends the canvas box polygon element creating
# this arrow element. This element changes colors, border with some classic 
# events, like mouseover, onclick, drag and drop, etc.
# 
# You may note also some cool polygon features as rotate polygon,
# mouse over polygon, smooth polygon ( you can this last one. clicking on it ).
# Just double click the element to restore it.
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
# @see Arrow
###
Load.CanvasBox();
class CanvasArrowExample extends CanvasBox
	init:()->
		console.log( "canvas box arrow example" );
		###
		# create the canvas box 
		###
		@setBackgroundColor( "#EEEEFF" );

		### 
		# create the square element
		###
		objArrow = New.Arrow();
		objArrow.x = @width / 2;
		objArrow.y = @height / 2;

		### 
		# add the square into the box
		###
		@addElement( objArrow );

		### 
		# play the box
		###
		@play();
