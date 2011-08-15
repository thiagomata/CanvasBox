var People;
People = (function() {
  People.prototype.name = "anonymous";
  People.prototype.speak = function() {
    return alert("hi i am " + this.name);
  };
  function People(name) {
    this.name = name;
    alert("" + this.name + " say hello world");
  }
  return People;
})();