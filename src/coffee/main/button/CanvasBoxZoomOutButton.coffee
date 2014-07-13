##
# Zoom out button of the canvas box diagram
##
class CanvasBoxZoomOutButton extends CanvasBoxFixedButton

    ##
    # Button Title
    #
    # @var string
    ##
    strTitle: "Zoom Out"
    
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
    #
    # @var Image|null
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
            'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAHc'+
            'UlEQVR42u2a209UVxSH/XP60qc2MbVp0ibtUxsb0PrSiyZ9am3'+
            'SPrYvvhhfm2jqDS8oKndEFBFEhosgoHhD5aLch3ITBkSQMAz8O'+
            't/GRQ4HBtrkjGLDTnb2njknnP2dtdZvr7WHLVs22/+49fX16fH'+
            'jx7p7967u3LmjhoYG3bt3z33X1dWlDQ/Q2dmpuro6VVZWLvXq6'+
            'mrV1NS4Xltbq1u3bqm+vt6NjY2Nevbs2cYC6+joUEVFhcrLy3X'+
            'jxg03D4VCrhsMI6AA3bx50wEBg8XobW1tbx+KxV27dk1lZWW6f'+
            'v26A6IDZNYxKCC4HygDw0K3b992cE1NTRocHMx5KyAAFBcXO5j'+
            'S0tJlMFgICACIGTqWAMJcDgA633GNDtgbd72rV6+qqKhIV65cE'+
            'fOSkhLXASHoh4aGNDs7q/n5eVlbWFhQLBbT5OSkiC8WD5S5GmD'+
            'AvFEgFg3E5cuX3Yh1AGJBU1NTbuEG4YUxIGtzc3MKh8NLgsDI3'+
            'zAL9fT0JBcI98GlCgsLdenSJWcdYHiTtlhbsIF4AfyfuWd6etr'+
            'FC0AGBQxQSQN5+PChAwEgPz/fWQag/v5+/dcGhBcqGo3qwYMHz'+
            'u2AMCuxNyUFBgvgYrm5uc4yFy9eFLJsiyIe/G/fHzNrNWIMoUA'+
            'QADGVwxUDBeEPI7d5eXmuFxQUOLn1vun1mhfG647eaxMTEw4AF'+
            'TQL8ezArUK8ZGVlKTs728EQ7P6Ats+rLfTfNO4l5cEyWMgyhcB'+
            'AiAmsgmtlZmY6y7CH+GMgkSXWsshq97948cLFjsk2QO3t7cEA4'+
            'cdsdICcP39eOTk5Tjb9C0600LUs479mL8U2WMsSWEMgMOzs+HB'+
            'GRoYDAmZmZmbZYkYiM0pvGlNm87guPooor+WVSp5OqajzlUrDU'+
            'yoPxxQaeamykTlVjkRV+zyqiuH4tdGoeiejy6AQEqTem/oQO4H'+
            'FC8Genp7uYFAxb3zQCuIQX1a/VGrDhL6rm9TO+intqBnXrtoZ7'+
            'ax7odTqWaXeHFdK/axSqqa1o3pKqbWv9EXFpA60r3RHXJsX6M3'+
            'nAoFhX8HNTp06pXPnzrnd3t9K2+IwReP6sSaib28Mur6n8rl+C'+
            'EX0fWhYeyriPdSv3XxfPuTG3aER7bg8oiOtYytgxsbGljJugN4'+
            'IjC2gOL6gzzIGtSunW1/l9uibwrBS8nq0PadLqfnxMa9fKfm9+'+
            'jq7RztzB7W9IBzvf+vz9L91+ElkxcuJRCKqqqpaVgsFAoOK8XZ'+
            'OnjypCxcuODfzK1V546jeP9SmT9Na9MnhTn10uE1b4yPzbUc7t'+
            'PWvp9p26Kk+Phgf/2zVB4da9OHBFr23v1kH7oyvgBkeHl4q7sx'+
            'CgcCQsrBxAXP27Fm31/il+HFY2nO2VT9ltGtvRp9+PtOhvZl92'+
            'nuuS79kdevXwm79dqlHvxcPaF/pgP4IDWl/zZj2VU2qZHil2lF'+
            'aI/8AYSF6IDDsMSSCWCUtLc25Gm9umcRqWrHFiRbmF8fFj3yYk'+
            '4zdXZtbvBy/0Y3z0yvkmufxXCvyArNMc3OzczPSfWCwDg9b1qJ'+
            'xSY2vdOY1kBair0G0CBmfx15fmo/NvAafV2yVvYekE6t4S/DAp'+
            'NlEAFc7duyYTp8+7VyN/SBRTpYo7V8tzfHfS+HmrVgBCrRYI27'+
            'u37/vMmZihz2HkmCtRfkzae88Ua3DPVgCxWSzNphAE83W1lbnu'+
            '0jk0aNHnUyT2lhluV5yuV4CanNeECBAAEPJQX4WeD2DAGAdpPn'+
            '48ePOQsg2Pu7P0RKBrJWn9fb2OhDrdkiStGqT2AGIuDlx4oQbE'+
            'QYKq0SutF6yyX3EhJ0rAEIKBUjgtYy3YXI0n6wWZaPjcggCJzK'+
            'rlcT+mt878hI4zeElEZdAAIR7cYTlLUOSAoT57azLgLAQokDwj'+
            'o6OJnQ3+w7X5BSTheO2dkBCt+Mre153d7eLpcDLZ2s8kL2HAwe'+
            'E4MiRI85CANFZHHVIS0uLy4AHBgbEoqgiAeZAhFKCQo85o4FgF'+
            'f8+BwwHHklzOdSNB/MwrIUgmNJhKeofOhkDwHREhLIbEEabYyF'+
            'OSL2uRSM+gWDkRSQVCMlmMezQPBAoABAHiyeDA4prZ86ccXP2L'+
            'CCQYUCwpP1dcjMrzLA+LwwQOlZK+gE6roU4ENDAYTmLAw5AuG4'+
            'W4BqbIYrF3P+37KjXzqQB4mUBRWee9KPbJ0+euMWiTizIUnggW'+
            'TQLRLGwoH9B9rMG7oQ74nJYzX4CMZfDMo8ePUquy63W2AjJtej'+
            'rnR0jDFZRMhJPAPE9WTNAWN2ADGrD/vqGJKOAdq7tBbKDQVzOg'+
            'HA5vGHDAiHTWNIOU/iM6wJkMeR1OYA2xC9viRoWsTnigfIZEBY'+
            'iE8HlbP8BiB+FNywQRaDNgcFCCAdCYqJgsm0W2tC/YLMf2Zz8z'+
            '+tyiAKJKBYCJGk/fwRdenjnpD/sT+xTlvTSk76ZBtGQdNyMOXF'+
            'B7sdGjMsBhMtxJhHYeXSyG2oFgMGRFpFRINtmoXfiPz+ssUHiZ'+
            'mzELJwMA0BGLLPlXWzUP0BZ2RDYbzebbbNtti3/ALUBzTQCgvb'+
            '9AAAAAElFTkSuQmCC';
            objImg.src = strSrc;
            @objImg = objImg;
        return @objImg;

    ##
    # Draw the Icon of Zoom Button
    # @override
    ##
    drawIcon:( booMouveOver , x , y )->
        objImg = @getImg();
        @objElement.getContext().save();
        @objElement.getContext().globalAlpha = ( booMouveOver ? 1 : 0.4 );
        @objElement.getContext().drawImage( objImg , x , y );
        @objElement.getContext().globalCompositeOperation = "darker";
        @objElement.getContext().restore();
    
    ##
    # Change the Zoom of the CanvasBoxElement
    # @override
    ##
    onClick:( event )->
       @objElement.dblZoom -= 0.1;
       @objElement.width  = @objElement.defaultWidth  / @objElement.dblZoom;
       @objElement.height = @objElement.defaultHeight / @objElement.dblZoom;

    ##
    # Sometimes people drag thinking in click
    #
    # @param event Event
    # @override
    ##
    onDrag:( event )->
        @onClick( event );
