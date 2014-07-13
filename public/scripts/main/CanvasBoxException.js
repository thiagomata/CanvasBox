var CanvasBoxException,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CanvasBoxException = (function(_super) {
  __extends(CanvasBoxException, _super);

  CanvasBoxException.prototype.objParentError = null;

  CanvasBoxException.prototype.strParentErrorMessage = null;

  CanvasBoxException.prototype.strMessage = null;

  function CanvasBoxException(strMessage) {
    this.Message = strMessage;
    console.log(strMessage);
  }

  CanvasBoxException.prototype.setParentError = function(objError) {
    window.bug = objError;
    if (php.is_object(objError)) {
      this.objParentError = objError;
      if (php.method_exists("getMessage", objError)) {
        this.strParentErrorMessage = objError.getMessage();
      } else {
        this.strParentErrorMessage = objError.message;
      }
    } else {
      this.strParentErrorMessage = objError;
    }
    return console.log(this.strParentErrorMessage);
  };

  CanvasBoxException.prototype.getMessage = function() {
    return this.strMessage + "\n" + this.strParentErrorMessage;
  };

  return CanvasBoxException;

})(Error);

//# sourceMappingURL=maps/CanvasBoxException.js.map