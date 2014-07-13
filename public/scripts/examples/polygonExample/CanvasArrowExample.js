
/*
 * Into this demo we will extends the canvas box polygon element creating
 * this arrow element. This element changes colors, border with some classic 
 * events, like mouseover, onclick, drag and drop, etc.
 * 
 * You may note also some cool polygon features as rotate polygon,
 * mouse over polygon, smooth polygon ( you can this last one. clicking on it ).
 * Just double click the element to restore it.
 *
 * @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
 * @see Arrow
 */
var CanvasArrowExample,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Load.CanvasBox();

CanvasArrowExample = (function(_super) {
  __extends(CanvasArrowExample, _super);

  function CanvasArrowExample() {
    return CanvasArrowExample.__super__.constructor.apply(this, arguments);
  }

  CanvasArrowExample.prototype.init = function() {
    var objArrow;
    console.log("canvas box arrow example");

    /*
    		 * create the canvas box
     */
    this.setBackgroundColor("#EEEEFF");

    /* 
    		 * create the square element
     */
    objArrow = New.Arrow();
    objArrow.x = this.width / 2;
    objArrow.y = this.height / 2;

    /* 
    		 * add the square into the box
     */
    this.addElement(objArrow);

    /* 
    		 * play the box
     */
    return this.play();
  };

  return CanvasArrowExample;

})(CanvasBox);

//# sourceMappingURL=maps/CanvasArrowExample.js.map