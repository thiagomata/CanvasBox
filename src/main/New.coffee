class New

New::arrMap =
 CanvasBox: './CanvasBox.coffee',
 CanvasBoxButton:  './CanvasBoxButton.coffee',
 CanvasBoxConnector: './CanvasBoxConnector.coffee' 
 People: './People.coffee' 
    
New::arrClasses = Array();

New::loadClass = ( strClass )->
    if( php.in_array( strClass, New::arrClasses ) )
        alert("#{strCLass} ja carregada");
        return false;
    if( !New::arrMap[ strClass ]? )
        alert( "#{strClass} {nao existe");
        throw new CanvasBoxException( "Unabled to map the class #{strClass}" );
    strContent = php.file_get_contents( New::arrMap[ strClass] );
    CoffeeScript.run( strContent );
    return true;

New::construct=(klass,args)->
  ObjectPointer = ->
    klass.apply(this, arguments[0]); 
  ObjectPointer.prototype = klass.prototype; 
  return new ObjectPointer(args);


New::start=->
    for element , path of New::arrMap
        New[element] = new Function ( "return New.prototype.Instance({ name: '#{element}', data: arguments });" )

New::Instance= ( arrDataLoad ) ->
    New::loadClass( arrDataLoad.name );
    return New::construct( window[ arrDataLoad.name ] , arrDataLoad.data );

New::start();
