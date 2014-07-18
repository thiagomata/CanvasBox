###
# When document is ready load the CanvasBubbleExample into
# the myCanvas
# @author <thiago.henrique.mata@gmailcom>
###
document.onreadystatechange = ->
  if (document.readyState == "complete")
    canvasBox = New.examples.bubbles.CanvasBubbleExample("myCanvas");
