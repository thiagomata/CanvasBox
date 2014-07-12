
var CanvasArrowExample,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))
child[key]=parent[key];}
function ctor(){this.constructor=child;}
ctor.prototype=parent.prototype;child.prototype=new ctor();child.__super__=parent.prototype;return child;};Load.CanvasBox();CanvasArrowExample=function(_super){__extends(CanvasArrowExample,_super);function CanvasArrowExample(){return CanvasArrowExample.__super__.constructor.apply(this,arguments);}
CanvasArrowExample.prototype.init=function(){var objArrow;console.log('canvas box arrow example');this.setBackgroundColor('#EEEEFF');objArrow=New.Arrow();objArrow.x=this.width/2;objArrow.y=this.height/2;this.addElement(objArrow);return this.play();};return CanvasArrowExample;}(CanvasBox);