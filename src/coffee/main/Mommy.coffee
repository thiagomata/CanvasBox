class Mommy
  @name: "mommy"
  constructor:(@name)->

  hi:()->
    console.log("Hi, I am the mommy " + @name );

class Dad extends Mommy