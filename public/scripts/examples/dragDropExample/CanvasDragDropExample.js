
var CanvasDragDropExample,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))
child[key]=parent[key];}
function ctor(){this.constructor=child;}
ctor.prototype=parent.prototype;child.prototype=new ctor();child.__super__=parent.prototype;return child;};Load.CanvasBox();CanvasDragDropExample=function(_super){__extends(CanvasDragDropExample,_super);function CanvasDragDropExample(){return CanvasDragDropExample.__super__.constructor.apply(this,arguments);}
CanvasDragDropExample.prototype.init=function(){var objSquare;console.log('canvas box drag drop example');this.setBackgroundColor('white');objSquare=New.DragDropSquare();objSquare.x=this.width/2;objSquare.y=this.height/2;this.addElement(objSquare);return this.play();};return CanvasDragDropExample;}(CanvasBox);