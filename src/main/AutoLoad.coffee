class AutoLoad

AutoLoad::arrMap = Array();
AutoLoad::arrMap[ 'CanvasBox' ] = '.\CanvasBox.coffee';
AutoLoad::arrMap[ 'CanvasBoxButton' ] = '.\CanvasBoxButton.coffee';
AutoLoad::arrMap[ 'CanvasBoxConnector' ] = '.\CanvasBoxConnector.coffee';
    
AutoLoad::arrClasses = Array();

AutoLoad::loadClass = ( strClass )->
    if( array_key_exists( strClass, AutoLoad::arrClasses ) )
        return false;
    if( not array_key_exists( strClass , AutoLoad::arrMap ) )
        throw new CanvasBoxException( "Unabled to map the class #{strClass}" );
    strContent = php.file_get_contents( arrMap[ strClass] );
    CoffeeScript.run( strContent );
    return true;

AutoLoad::new
    CanvasBox:->
        loadClass( "CanvasBox" );
        return new CanvasBox( p1 , p2, p3, p4, p5, p6 );
                                                     

Lixo = ->
    alert( "Loading Lixo");
    return [ "Lixo" , arguments ];

New = ( arrDataLoad ) ->
    strClassName = arguments[0][0]
    strCommand = "new #{strClassName}(";
    arrParams = Array();
    for param , key in arguments[0][1]
        arrParams.push( "arguments[#{key}]" );
    strCommand += php.implode("," , arrParams ) + ")";
    return window.eval.call( window, strCommand );

x = New Lixo( 2 , 3 );
alert(x);
