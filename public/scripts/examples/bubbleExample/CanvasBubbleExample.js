
/*
 * This example focus into how to create, change and destroy many
 * objects without big coding work. It shows too, how to manipulate
 * the canvas box to override native events and deal with collision.
 *
 * @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
 * @see Bubble
 */
var CanvasBubbleExample,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBox();

CanvasBubbleExample = (function(_super) {
  __extends(CanvasBubbleExample, _super);

  function CanvasBubbleExample() {
    return CanvasBubbleExample.__super__.constructor.apply(this, arguments);
  }


  /*
  	 * On Canvas Box Click, Create a new bubble
  	 *
  	 * @param event
  	 * @see Bubble
   */

  CanvasBubbleExample.prototype.onBoxClick = function(event) {
    var objBubble;
    objBubble = New.Bubble();
    objBubble.x = this.mouseX;
    objBubble.y = this.mouseY;
    this.addElement(objBubble);
    return CanvasBubbleExample.__super__.onBoxClick.apply(this, arguments);
  };


  /*
  	 * Prepare the timer of random bubble creation
  	 * @see CanvasBubbleExample::loopTimer()
  	 * @see Bubble
   */

  CanvasBubbleExample.prototype.init = function() {
    console.log("canvas box bubble example");
    this.setBackgroundColor("#DDDDFF");
    window.setInterval((function(_this) {
      return function() {
        return _this.loopTimer();
      };
    })(this), 100);
    return this.play();
  };


  /*
  	 * On timer, create some random bubbles
  	 * @see Bubble
   */

  CanvasBubbleExample.prototype.loopTimer = function() {
    var objBubble;
    console.log("loop timer ", this.arrElements.length);
    if (this.arrElements.length > 10) {
      return false;
    }
    if (Math.floor(Math.random() * 10) === 5) {
      objBubble = New.Bubble();
      objBubble.x = Math.floor(Math.random() * this.width);
      objBubble.y = this.height - Math.floor(Math.random() * this.height / 8);
      return this.addElement(objBubble);
    }
  };

  return CanvasBubbleExample;

})(CanvasBox);

//# sourceMappingURL=maps/CanvasBubbleExample.js.map