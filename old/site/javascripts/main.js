window.objCurrentBox = null;
window.currentExample = 1;
window.totalExamples = 4;
window.arrBoxExamples = [];

/**
 * Map the example classes.
 */
New.prototype.importMap( "./src/examples/map.json" );

function previousExample()
{
	window.currentExample--;
	if( window.currentExample < 1 )
	{
		window.currentExample = window.totalExamples;
	}
	runExample();
}

function nextExample()
{
	window.currentExample++;
	if( window.currentExample > window.totalExamples )
	{
		window.currentExample = 1;
	}
	runExample();
}

function runExample()
{
	if( window.objCurrentBox !== null )
	{
		window.objCurrentBox.stop();
	}
	$( ".example" ).hide();
	var strExampleId = "example" + window.currentExample;
	var objExample = $( "#" + strExampleId );
	objExample.show();

	if( php.array_key_exists( window.currentExample , window.arrBoxExamples ) )
	{
		window.arrBoxExamples[ window.currentExample ].play();
		return true;
	}
	else
	{
		var objCanvas = $( "#" + strExampleId + " canvas")[0];
		var strCanvasId = objCanvas.id
		var strClassCanvasBox = objCanvas.getAttribute( "data-canvasbox" );
		Load[ strClassCanvasBox ]();
		console.log( "creating the " + strClassCanvasBox + " into the " + strCanvasId );
		window.objCurrentBox = New[ strClassCanvasBox ]( strCanvasId );
		window.arrBoxExamples[ window.currentExample ] = window.objCurrentBox;
		return false;
	}
}
