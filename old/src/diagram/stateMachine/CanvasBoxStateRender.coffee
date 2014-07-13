Load.CanvasBoxRender()
class CanvasBoxStateRender extends CanvasBoxRender
	
	arrGrammar: [
		{
			"rule":	"\(.*\)\>\(.*\)",
			"method": "addGo"
		},
		{
			"rule":	"\(.*)\<\(.*\)",
			"method": "addBack"
		},
		{
			"rule":	"\(.*\)",
			"method": "addMe"
		},
	]

	loadHash:( strHashElement )->
		for objRule in @arrGrammar
			objRegex = new RegExp( objRule.rule )
			strCurrent = strHashElement
			while( strCurrent != "" and objRegex.test( strCurrent ) )
				console.log( "p1 " + strCurrent );
				arrResult = objRegex.exec( strCurrent )
				strCurrent = this[ objRule.method ]( strCurrent )
				console.log( "p2 " + strCurrent );

	addGo:( strCurrent )->
		console.log("add go " + strCurrent );
		arrGo = php.explode( ">" , strCurrent )
		if( arrGo.length > 1 )		
			objFrom = arrGo.pop();
			while( arrGo.length > 1 )
				objTo = arrGo.pop()
				@addLink( objFrom , objTo );
				objFrom = objTo;
		else
			return @addMe( strCurrent )

		console.log( "returning1 " + objFrom );
		return objFrom

	addBack:( strCurrent )->
		console.log("add back " + strCurrent );
		arrBack = php.explode( "<" , strCurrent )
		if( arrBack.length > 1 )		
			objTo = arrBack.pop();
			while( arrBack.length > 0 )
				objFrom = arrBack.pop()
				@addLink( objFrom , objTo );
				objTo = objFrom;
		else
			return @addMe( strCurrent )

		console.log( "returning1 " + objTo );
		return objTo

	addMe:( arrResult )->
		console.log( arrResult )
		return ""

	updateElement:( strElement )->
		console.log( "update element " + strElement )
		return strElement;

	addLink:( objFrom , objTo )->
		console.log( "create link from " + objFrom + " to " + objTo)