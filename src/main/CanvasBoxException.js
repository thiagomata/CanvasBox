var CanvasBoxException,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CanvasBoxException = (function(_super) {

  __extends(CanvasBoxException, _super);

  function CanvasBoxException(strMessage) {
    this.Message = strMessage;
    console.log(strMessage);
  }

  return CanvasBoxException;

})(Error);
