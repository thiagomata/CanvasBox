
var CanvasBubbleExample,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))
child[key]=parent[key];}
function ctor(){this.constructor=child;}
ctor.prototype=parent.prototype;child.prototype=new ctor();child.__super__=parent.prototype;return child;};Load.CanvasBox();CanvasBubbleExample=function(_super){__extends(CanvasBubbleExample,_super);function CanvasBubbleExample(){return CanvasBubbleExample.__super__.constructor.apply(this,arguments);}
CanvasBubbleExample.prototype.onBoxClick=function(event){var objBubble;objBubble=New.Bubble();objBubble.x=this.mouseX;objBubble.y=this.mouseY;this.addElement(objBubble);return CanvasBubbleExample.__super__.onBoxClick.apply(this,arguments);};CanvasBubbleExample.prototype.init=function(){console.log('canvas box bubble example');this.setBackgroundColor('#DDDDFF');window.setInterval(function(_this){return function(){return _this.loopTimer();};}(this),100);return this.play();};CanvasBubbleExample.prototype.loopTimer=function(){var objBubble;console.log('loop timer ',this.arrElements.length);if(this.arrElements.length>10){return false;}
if(Math.floor(Math.random()*10)===5){objBubble=New.Bubble();objBubble.x=Math.floor(Math.random()*this.width);objBubble.y=this.height-Math.floor(Math.random()*this.height/8);return this.addElement(objBubble);}};return CanvasBubbleExample;}(CanvasBox);