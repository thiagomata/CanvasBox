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
        throw new CAnvasBoxException( "Unabled to map the class #{strClass}" );
    strContent = exports.file_get_contents( arrMap[ strClass] );
    CoffeeScript.run( strContent );
    return true;

AutoLoad::new
    CanvasBox:->
        loadClass( "CanvasBox" );
        return new CanvasBox( p1 , p2, p3, p4, p5, p6 );
                                                                                                        