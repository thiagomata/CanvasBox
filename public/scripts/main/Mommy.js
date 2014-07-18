var Dad, Mommy,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Mommy = (function() {
  Mommy.name = "mommy";

  function Mommy(name) {
    this.name = name;
  }

  Mommy.prototype.hi = function() {
    return console.log("Hi, I am the mommy " + this.name);
  };

  return Mommy;

})();

Dad = (function(_super) {
  __extends(Dad, _super);

  function Dad() {
    return Dad.__super__.constructor.apply(this, arguments);
  }

  return Dad;

})(Mommy);

//# sourceMappingURL=maps/Mommy.js.map