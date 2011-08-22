class AutoLoad

AutoLoad::arrMap =
 CanvasBox: './CanvasBox.coffee',
 CanvasBoxButton:  './CanvasBoxButton.coffee',
 CanvasBoxConnector: './CanvasBoxConnector.coffee' 
 People: './People.coffee' 
    
AutoLoad::arrClasses = Array();

AutoLoad::loadClass = ( strClass )->
    if( php.in_array( strClass, AutoLoad::arrClasses ) )
        alert("#{strCLass} ja carregada");
        return false;
    if( !AutoLoad::arrMap[ strClass ]? )
        alert( "#{strClass} {nao existe");
        throw new CanvasBoxException( "Unabled to map the class #{strClass}" );
    strContent = php.file_get_contents( AutoLoad::arrMap[ strClass] );
    CoffeeScript.run( strContent );
    return true;

AutoLoad::construct=(klass,args)->
  KlassCall = ->
    klass.apply(this, arguments[0]); 
  KlassCall.prototype = klass.prototype; 
  return new KlassCall(args);


AutoLoad::start=->
    for element , path of AutoLoad::arrMap
        window[element] = new Function ( "return { name: '#{element}', data: arguments };" )

AutoLoad::start();

New = ( arrDataLoad ) ->
    strClassName = arrDataLoad.name;
    window.arrReferencia = arrDataLoad.data;
    arrParams = Array();
    for value , key in arrDataLoad.data
        arrParams[key] = value;

    AutoLoad::loadClass( strClassName );
    return AutoLoad::construct( window[strClassName] , arrParams );