Load.CanvasBoxFixedButton();
class CanvasBoxSaveButton extends CanvasBoxFixedButton

    ##
    # Button Title
    #
    # @var string
    ##
    strTitle: "Save as Xml"

    ##
    # Button Width
    #
    # @var integer
    ##
    width: 55

    ##
    # Button Height
    #
    # @var integer
    ##
    height: 55

    ##
    # Html Image Tag
    ##
    objImg: null

    ##
    # Get the Image Tag with source
    #
    # use lazy load and src in-line
    #
    # @return Image
    ##
    getImg:()->
        if( @objImg == null )
            objImg = new Image();
            strSrc = 'data:image/png;base64,'+
            'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAC'+
            'XBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8'+
            'AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAhdSURBVHjaxJnbr'+
            '11VFcZ/Y67LOXuflhIptECKFAIEK8jFSwxqoIk8iEqiRB+9PUm'+
            'iaKLRBx991X8AY4x/A8TIg5CoEGwqVcSCQbCUCrQ9h9Oz72utO'+
            'YYPc6611zpnA21y6p7Nbk9z5toZ3xjf+MZlye2f+fovHn7o898'+
            '9cM3+gZkCgAhaVRTTqYgTRARBwAkiDvXKh/b1WF3JMTN26zgRN'+
            'gdjhuPCnJPWb4TReNx75+y539zz0Vu+v3fPGr3eCkduu4kUZO+'+
            'DRz/bO3D9od7b57ZwTsA5JsMB5946RZ6v4JKUJElIkowkTZlOZ'+
            '3zunhs5sP9Kdvuc+OcpXnrtLKsrGaqGYmjlOXj1Pk6/8cb3jh0'+
            '/ofd98s4fOAkAUzCdTWf858wGx19+iyx1iEu4sH6O1185Qa/XJ'+
            '8lysmyFNMvI8lUGWwOOHL7qsgA4+eppfvenk+xd66Pe4y0AWMk'+
            'TvvjA3dx91x2PHTtxsrz/vnt/7JwjBVAMEcgyR5o4nHNkWUKep'+
            'eRZSpKlpFlCmiZkaUKeJYjIRRs1K0qeef4lyrIKz0XWlVXFx26'+
            '/kcOHDjR3k8SRpylZmqAOElNIhLKseOLp4zx09F7KsvrRs8f+5'+
            'j9y6+GfpgA1jYXAd2R3vTorPc/89b8Mx1OcgMZc29h4l8S5DoD'+
            '3OkniKMqKJ/9wnC8dvZdZMfvJYz/7ZREiYIbbxWTcmZyOK65YI'+
            '0kzRAzVAKAqS9I0uejvSRPHdFby+z/+ndsP7+fV109fm0odAgP'+
            'DMDPEaMK8G8cAU4uKZY1yfaCCWeBFbYwBaZKwNZxw/MV/01tdm'+
            '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'+
            'rGQAAAABJRU5ErkJggg==';

            objImg.src = strSrc;

        @objImg = objImg;
        return @objImg;

    ##
    # Draw Button Icon
    #
    # @param booMouveOver bool
    # @override
    # @return void
    ##
    drawIcon:( booMouveOver )->
        @objElement.getContext().save();
        @objElement.getContext().globalAlpha = ( booMouveOver ? 1 : 0.4 );
        @objElement.getContext().drawImage( @getImg() , @x , @y );
        @objElement.getContext().globalCompositeOperation = "darker";
        @objElement.getContext().restore();

    ##
    # Define the click event
    #
    # @param event Event
    # @override
    ##
    onClick:( event )->
        @objElement.saveAsXml();

    ##
    # Sometimes people drag thinking in click
    #
    # @param event Event
    # @override
    ##
    onDrag:( event )->
        @onClick( event );