
/*
 * An example of collision detection and key events
 *
 * @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
 */
var CanvasCollisionExample,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBox();

CanvasCollisionExample = (function(_super) {
  __extends(CanvasCollisionExample, _super);

  function CanvasCollisionExample() {
    return CanvasCollisionExample.__super__.constructor.apply(this, arguments);
  }

  CanvasCollisionExample.prototype.init = function() {
    var objSquare;
    console.log("canvas box collision example");

    /*
    		 * create the canvas box
     */
    this.setBackgroundColor("white");

    /*
    		 * create the square element
     */
    objSquare = New.CollisionSquare();
    objSquare.x = this.width / 2;
    objSquare.y = this.height / 2;

    /*
    		 * add the square into the box
     */
    this.addElement(objSquare);

    /*
    		 * create the square element
     */
    objSquare = New.CollisionSquare();
    objSquare.x = this.width - objSquare.side;
    objSquare.y = this.height - objSquare.side;

    /*
    		 * add the square into the box
     */
    this.addElement(objSquare);

    /*
    		 * play the box
     */
    return this.play();
  };

  return CanvasCollisionExample;

})(CanvasBox);

//# sourceMappingURL=maps/CanvasCollisionExample.js.map