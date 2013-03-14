class CanvasBoxRender

	strSeparator: " ,"

	constructor:()->
        window.addEventListener( 
            'hashchange',
            (event) =>
                @load( event );
        )
        @load()		

	loadUrl:()->
		return window.location.hash.substring(1);

	updateUrl:( strContent )->
		window.location.hash = strContent
		return this

	load:()->
		arrHash = php.explode( @strSeparator , @loadUrl() )
		for strHashElement in arrHash
			@loadHash( strHashElement )
		return this

	loadHash:( strHashElement )->
		console.log( strHashElement )

