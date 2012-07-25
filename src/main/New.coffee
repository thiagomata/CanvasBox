##
# Allow to load some necessary class without instance it
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
class Load

##
# Allow to load some necessary class and instance it
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
class New

arrScripts = document.head.getElementsByTagName( "script" );

for key , objScript of arrScripts
  if( objScript.src.indexOf( "New.js" ) > 0 )
      window.MAIN_PATH = objScript.src.replace( "New.js" , "" );
      break;

New::arrMap =
 CanvasBox:              "#{window.MAIN_PATH}CanvasBox.coffee"
 CanvasBoxBehavior:      "#{window.MAIN_PATH}CanvasBoxBehavior.coffee" 
 CanvasBoxButton:        "#{window.MAIN_PATH}CanvasBoxButton.coffee"
 CanvasBoxConnector:     "#{window.MAIN_PATH}CanvasBoxConnector.coffee"
 CanvasBoxElement:       "#{window.MAIN_PATH}CanvasBoxElement.coffee"
 CanvasBoxException:     "#{window.MAIN_PATH}CanvasBoxException.coffee" 
 CanvasBoxLine:          "#{window.MAIN_PATH}CanvasBoxLine.coffee" 
 CanvasBoxMenu:          "#{window.MAIN_PATH}CanvasBoxMenu.coffee" 
 CanvasBoxPointer:       "#{window.MAIN_PATH}CanvasBoxPointer.coffee" 
 CanvasBoxPolygon:       "#{window.MAIN_PATH}CanvasBoxPolygon.coffee" 
 CanvasBoxExportButton:  "#{window.MAIN_PATH}button\CanvasBoxExportButton.coffee" 
 CanvasBoxFixedButton:   "#{window.MAIN_PATH}button\CanvasBoxFixedButton.coffee" 
 CanvasBoxSaveButton:    "#{window.MAIN_PATH}button\CanvasBoxSaveButton.coffee" 
 CanvasBoxZoomInButton:  "#{window.MAIN_PATH}button\CanvasBoxZoomIntButton.coffee" 
 CanvasBoxZoomOutButton: "#{window.MAIN_PATH}button\CanvasBoxZoomOutButton.coffee" 

New::arrClasses = Array();

New::loadClass = ( strClass )->
    if( php.in_array( strClass, New::arrClasses ) )
#        console.log("#{strClass} already load");
        return false;
    if( ! New::arrMap[ strClass ]? )
#        alert( "#{strClass} does not exists");
        throw new CanvasBoxException( "Unabled to map the class #{strClass}" );
    strContent = php.file_get_contents( New::arrMap[ strClass] );
    New::arrClasses.push( strClass );
    CoffeeScript.run( strContent );
    return true;

New::construct=(klass,args)->
  ObjectPointer = ->
    klass.apply(this, arguments[0]); 
  ObjectPointer.prototype = klass.prototype; 
  return new ObjectPointer(args);

New::addMap = ( strClass , link = null )->
    New::arrMap[ strClass ] = link if link?;
    New[strClass] = new Function ( "return New.prototype.Instance({ name: '#{strClass}', data: arguments });" )
    Load[strClass] = new Function ( "return Load.prototype.Instance({ name: '#{strClass}', data: arguments });" )

New::start=->         
    for element , path of New::arrMap
        New::addMap(element)

New::Instance= ( arrDataLoad ) ->
    New::loadClass( arrDataLoad.name );
    return New::construct( window[ arrDataLoad.name ] , arrDataLoad.data );

Load::Instance= ( arrDataLoad ) ->
    New::loadClass( arrDataLoad.name );
    Load[arrDataLoad.name] = window[arrDataLoad.name];
    return window[arrDataLoad.name];

New::start();
