
var CanvasCollisionExample,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))
child[key]=parent[key];}
function ctor(){this.constructor=child;}
ctor.prototype=parent.prototype;child.prototype=new ctor();child.__super__=parent.prototype;return child;};Load.CanvasBox();CanvasCollisionExample=function(_super){__extends(CanvasCollisionExample,_super);function CanvasCollisionExample(){return CanvasCollisionExample.__super__.constructor.apply(this,arguments);}
CanvasCollisionExample.prototype.init=function(){var objSquare;console.log('canvas box collision example');this.setBackgroundColor('white');objSquare=New.CollisionSquare();objSquare.x=this.width/2;objSquare.y=this.height/2;this.addElement(objSquare);objSquare=New.CollisionSquare();objSquare.x=this.width-objSquare.side;objSquare.y=this.height-objSquare.side;this.addElement(objSquare);return this.play();};return CanvasCollisionExample;}(CanvasBox);