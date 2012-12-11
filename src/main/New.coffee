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
 CanvasBox:              "#{window.MAIN_PATH}CanvasBox"
 CanvasBoxBehavior:      "#{window.MAIN_PATH}CanvasBoxBehavior" 
 CanvasBoxButton:        "#{window.MAIN_PATH}CanvasBoxButton"
 CanvasBoxConnector:     "#{window.MAIN_PATH}CanvasBoxConnector"
 CanvasBoxElement:       "#{window.MAIN_PATH}CanvasBoxElement"
 CanvasBoxException:     "#{window.MAIN_PATH}CanvasBoxException" 
 CanvasBoxLine:          "#{window.MAIN_PATH}CanvasBoxLine" 
 CanvasBoxMenu:          "#{window.MAIN_PATH}CanvasBoxMenu" 
 CanvasBoxPointer:       "#{window.MAIN_PATH}CanvasBoxPointer" 
 CanvasBoxPolygon:       "#{window.MAIN_PATH}CanvasBoxPolygon" 
 CanvasBoxExportButton:  "#{window.MAIN_PATH}button/CanvasBoxExportButton" 
 CanvasBoxFixedButton:   "#{window.MAIN_PATH}button/CanvasBoxFixedButton" 
 CanvasBoxSaveButton:    "#{window.MAIN_PATH}button/CanvasBoxSaveButton" 
 CanvasBoxZoomInButton:  "#{window.MAIN_PATH}button/CanvasBoxZoomIntButton" 
 CanvasBoxZoomOutButton: "#{window.MAIN_PATH}button/CanvasBoxZoomOutButton" 
 CanvasBoxState:         "#{window.MAIN_PATH}../diagram/stateMachine/CanvasBoxState"
 CanvasBoxStateDiagram:  "#{window.MAIN_PATH}../diagram/stateMachine/CanvasBoxStateDiagram"
 CanvasBoxStateLink:     "#{window.MAIN_PATH}../diagram/stateMachine/CanvasBoxStateLink"
 CanvasBoxConnectorBehavior: "#{window.MAIN_PATH}CanvasBoxConnectorBehavior"
 CanvasBoxGravityBehavior:   "#{window.MAIN_PATH}CanvasBoxGravityBehavior" 
 CanvasBoxMagneticBehavior:  "#{window.MAIN_PATH}CanvasBoxMagneticBehavior" 
 
New::arrClasses = Array();

New::loadClass = ( strClass )->
    try
        if( php.in_array( strClass, New::arrClasses ) )
    #        console.log("#{strClass} already load");
            return false;
        if( ! New::arrMap[ strClass ]? )
    #        alert( "#{strClass} does not exists");
            throw new CanvasBoxException( "Unabled to map the class #{strClass}" );
        console.log( "loading... " + strClass );
        if( php.file_exists( New::arrMap[ strClass] + ".js" ) )
            console.log( "load " + New::arrMap[ strClass] + ".js" );
            php.require_once( New::arrMap[ strClass] + ".js" );
        else
            strContent = php.file_get_contents( New::arrMap[ strClass] + ".coffee");
            console.log( "run " + strClass+ ".coffee" )
            CoffeeScript.run( strContent );
        New::arrClasses.push( strClass );
        return true;
    catch objError
        console.log( "Error on load #{strClass}" );
        console.log( objError );
        throw objError;

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
