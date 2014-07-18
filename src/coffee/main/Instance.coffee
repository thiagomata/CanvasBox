###
# Create an instance of the object passing the argument
###
instaceObject = (->
  ClassElement = (args) ->
    window[args["0"]].apply this, args["1"]
  ->
    ClassElement:: = (window[arguments["0"]])::
    objElement = new ClassElement(arguments)
    return objElement
)()

##
# Allow to load some necessary class and instance it
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
class Instance
    @loaded: false
    constructor:(@objTree, @creator = false, @packageName = null)->

      if(!@objTree.src? )
        for packageName of @objTree
          objChild = new Instance(@objTree[packageName],@creator,packageName)
          this[packageName] = objChild.node()
    node:()->
      if( @objTree.src? )
        if @creator 
          return @create.bind(this) 
        else 
          return @load.bind(this)
      else
        return this
    load:()->
      return if @loaded
      php.require_once(@objTree.src)
      @loaded = true
    create:()->
      @load()
      return instaceObject(@packageName, arguments)

  
Instance.PATH_TREE = './scripts/tree.json'

Instance::construct=(klass,args)->
  ObjectPointer = ->
    klass.apply(this, arguments[0])
  ObjectPointer.prototype = klass.prototype
  return new ObjectPointer(args)

window.Load = new Instance( JSON.parse(php.file_get_contents(Instance.PATH_TREE)),false)

window.New  = new Instance( JSON.parse(php.file_get_contents(Instance.PATH_TREE)),true)