instaceObject = (->
  F = (args) ->
    F:: = (window[args["0"]])::
    window[args["0"]].apply this, args["1"]
  ->
    new F(arguments)
)()


##
# Allow to load some necessary class without instance it
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
class Load


##
# Allow to load some necessary class and instance it
#
# @author Thiago Henrique Ramos da Mata <thiago.henrique.mata@gmail.com>
##
class Instance
    constructor:(@objTree, @packageName = null)->
        if( @objTree.src? )
            this.run = ->
                console.log( "loading " + objTree.src );
                php.require_once(objTree.src);
                return instaceObject(@packageName, arguments);
            this[@packageName] = ->
                php.require_once(objTree.src);
                this[@packageName] = ->
                    return false;
        else
            for packageName of objTree
                this[packageName] = new Instance(objTree[packageName],packageName);

Instance.PATH_TREE = './scripts/tree.json'

Instance::construct=(klass,args)->
  ObjectPointer = ->
    klass.apply(this, arguments[0]);
  ObjectPointer.prototype = klass.prototype; 
  return new ObjectPointer(args);

window.New = new Instance( JSON.parse(Instance.PATH_TREE)); 