Load.CanvasBoxFixedButton();
class CanvasBoxExportButton extends CanvasBoxFixedButton

  ##
  # Title of The Image
  ##
  strTitle: "Export as Image"

  ##
  # Width of Image
  ##
  width: 55

  ##
  # Height of Image
  ##
  height: 55

  ##
  # Html Image Object of Image Class
  ##
  objImg: null

  ##
  # Get the Html Image Object
  # Create it if not exists
  ##
  getImg:()->
    if( @objImg == null )
        objImg = new Image();
        strSrc = 'data:image/png;base64,'+
        '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'+
        'U04xPEAAAAASUVORK5CYII=';

        objImg.src = strSrc;

        @objImg = objImg;
    return @objImg;

 ##
 # Draw the right Icon as mouse over or not
 ##
  drawIcon:( booMouveOver )->
    @objElement.getContext().save();
    @objElement.getContext().globalAlpha = ( booMouveOver ? 1 : 0.4 );
    @objElement.getContext().drawImage( @getImg() , @x , @y );
    @objElement.getContext().globalCompositeOperation = "darker";
    @objElement.getContext().restore();
 
  onClick:( event )->
    @objElement.saveFile();
 
  onDrag:( event )->
    @onClick( event );
 