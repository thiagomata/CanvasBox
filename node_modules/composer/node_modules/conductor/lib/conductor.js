/*jslint white: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true, indent: 2*/
/*global setTimeout: true, window: true, exports: true */
/*
Copyright (c) 2010 Tim Caswell  < tim@creationix>, Elijah Insua  < tmpvar@gmail.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

(function (exports) {
  "use strict";

  var Context, Edge, Executor, Node, Port,
      contextIndex = 0;

  exports.conductor = function () {
    var conductor = {
      nodes  : [],
      node   : function (fn, name) {
        return new Node(fn, conductor, name);
      }
    };
    conductor.execute = new Executor(conductor);
    return conductor;
  };

  /*
    Context is a means for tracking parallel execution flows and it provides
    a way to fork and join a flow.  Forks and Joins are tracked by using a
    tree that corresponds to nodes that have been executed.
  */
  Context = exports.Context = function (parent, forkNode) {
    this.parent = parent || null;
    this.forkNode = (forkNode === true);
    this.id = contextIndex++;
    this.nodes = {};
    this.forks = [];
    var self = this;

    // Initialize this Context in regards to its parent (if any)
    self.init = function (parentContext) {
      
      // If a parent is passed we need to maintain fork nodes
      if (parentContext) {

        // Add all of the parent's fork ids to this node
        // fork ids are context id's that have their forkNode property set to true
        for (var i = 0; i < parentContext.forks.length; i++) {
          self.forks.push(parentContext.forks[i]);
        }

        // If the incoming parent is a fork, add it to this Context's fork queue
        if (parentContext.forkNode) {
          self.forks.push(parentContext.id);
        } else if (self.forkNode) {
          self.nodes = self.parent.nodes;
          self.parent.nodes = {};
        }
      }
    };

    // Setup this context to have the outline of edges/ports matching the incoming node.
    // this makes it easier to work with the Context object when manipulating it from
    // the inside of Nodes
    self.prepare = function (node) {

      // Make sure this Context hasn't already prepared this Node
      if (!self.nodes[node.index]) {
        self.nodes[node.index] = {
          edges    : {},
          executed : false
        };

        // Setup all of the Edges/Ports
        for (var edge in node.edges) {
          if (node.edges.hasOwnProperty(edge)) {
            if (!self.nodes[node.index].edges[edge]) {
              self.nodes[node.index].edges[edge] = {
                ports : {}
              };
            }
          }
        }
      }
    };

    // Insert this context below the incoming context
    self.reparent = function (context) {
      context.parent = self.parent;
      self.parent = context; // TODO: this probably needs to be initialized.
      self.forks = [];
      self.init(context);
    };

    // Automatically initialize this context with the incoming parent Context
    self.init(parent);
  };

  /*
    Every node has 3 edges: input, output, and callback.  Each edge is a boundry or
    synchronization point for execution on a particular context.
    
    In the case of fork nodes, the output edge cannot fire until all the outputs/callbacks are satisfied.
    Synchronization happens on outputs and callbacks because that is the only way to have multiple outputs
    in javascript.
    
    In the case of join nodes, the input edge must be completely satisfied with values from Contexts that 
    share a common fork Context.
  */
  Edge = exports.Edge = function (node, type) {
    var self = this;
    self.type  = type;
    self.ports = {};
    self.node  = node;
    
    // Getter for the current number of ports in this edge
    this.length = function () {
      var l = 0, p;
      for (p in self.ports) {
        if (self.ports.hasOwnProperty(p)) {
          l++;
        }
      }
      return l;
    };

    // Mark satisfaction in the current Context, and attempt to trigger this edge
    this.satisfy = function (context, port, value) {

      // Ensure the passed context is properly setup before continuing
      context.prepare(node);

      // IF this node is a join node, we need to hold onto the value in the specified port
      if (self.node.isJoin()) {
        self.ports[port].enqueue({
          context: context,
          value  : value
        });

      // Otherwise just mark the value in the context, satisfying this port
      } else {
        self.ports[port].value(context, value);
      }

      // If all of the ports in this context are satisfied, attempt to forward the values
      if (self.satisfied(context)) {
        self.trigger(context);
      }
    };

    // Triggering an edge does different things depending on the edge. Output/Callback edges forward their
    // queued values to their attached ports.  Input edges execute the Node that the edge is associated
    // with.
    this.trigger = function (context) {
      var i, c, values;

      // Attempt to forward the values down the pipes to all of the Ports waiting for values from this
      // Node
      if (self.type === "output" || self.type === "callback") {

        // Contexts need to be forked at trigger time to ensure a unique id that can be looked up down
        // the line at join time.
        if (self.node.isFork()) {
          context = new Context(context, true);
        }

        // Forward all the output values
        for (i in self.node.edges.output.ports) {
          if (self.node.edges.output.ports.hasOwnProperty(i)) {
            self.node.edges.output.ports[i].forward(context);
          }
        }

        // Forward all of the callback values
        for (c in self.node.edges.callback.ports) {
          if (self.node.edges.callback.ports.hasOwnProperty(c)) {
            self.node.edges.callback.ports[c].forward(context);
          }
        }

      // Execute this node.
      } else if (self.type === "input") {
        this.node.execute(context);
      }
    };

    // Returns an array of values that have been set in the current context
    this.values = function (context) {
      var ports = [], i, c,
          // Attach a synthetic callback to the incoming port, which allows conductor to pick up the value
          // after its been executed and satisfy the incoming port.
          setupCallback = function (port, index) {
            ports[index] = function (arg) {
              port.edge.satisfy(context, index, arg);
            };
          };

      // Collect the values of this edge's ports
      for (i in self.ports) {
        if (self.ports.hasOwnProperty(i)) {
          ports[i] = self.ports[i].value(context);
        }
      }

      // Setup synthetic callbacks for all of the callback Edge's ports
      for (c in self.node.edges.callback.ports) {
        if (self.node.edges.callback.ports.hasOwnProperty(c)) {
          setupCallback(self.node.edges.callback.ports[c], c);
        }
      }

      return ports;
    };

    // Satisfaction is determined by both checking the current context for satisfaction of this Edge's
    // Ports, and also by comparing the port queue to the incoming context to see if they share a common
    // Context split ancestor.
    this.satisfied = function (context) {
      var matches = [], i, j, m;

      // Ensure this Context is setup to handle this Node.
      context.prepare(this.node);

      // Don't bother with the processing if there are no ports to satisfy.
      if (self.length() === 0) {
        return true;
      }

      // If this is a join Node it's ports need to be checked for an entry that matches one of
      // incoming Context's fork queue entries
      if (self.node.isJoin()) {
        for (j in self.ports) {
          // Avoid re-checking ports that are satisfied in this context
          if (!self.ports[j].satisfied(context)) {

            // Test the current Port for a fork queue match
            matches[j] = self.ports[j].match(context);
            if (matches[j] === null) {
              // If a single port is not satisfied, the entire edge cannot be satisfied
              return false;
            }
          }
        }

        // This edge, is satisfied.  Now the current context needs the values of all of the other queue'd
        // entries.
        //
        // NOTE: this can only be done after an edge is satisfied, as joining before satisfaction requires
        //       a large amount of machinery to pull the values out of a previously merged context.
        for (m = 0; m < matches.length; m++) {
          // merge the value into the current context
          self.ports[m].join(matches[m], context);
        }

      // If this is a straight through node, there is no need to perform match/join on the queue
      } else {
        for (i in self.ports) {
          if (!self.ports[i].satisfied(context)) {
            return false;
          }
        }
      }
      return true;
    };

    // This is an internal method to setup a route from a port on the current Edge to another port. This
    // connection is described as a "pipe" internally.
    this.route = function (index, port) {
      // When no port is passed, this method acts as a getter
      if (!port) {
        // If the port thats being queried does not exist, create it
        if (!this.ports[index]) {
          self.ports[index] = new Port(self, index);
        }

        return self.ports[index] || null;
      }

      // Passing an input into an input means "callback"
      if (self.type === "input" && port.edge.type === "input") {
        return self.node.callback(index, port);
      }

      // If the port in question does not exist, create it
      if (!self.ports[index]) {
        self.ports[index] = new Port(self, index);
      }

      // Wrap callbacks with a new node and attach to the appropriate port on this Edge
      if (this.type === "output" && typeof port === 'function') {
        var tmp = new Node(port, self.node.conductor);
        tmp.name = this.node.name + " -> callback";

        // Create a pipe between this node's output and the temporary node's input
        self.node.output(tmp.input(0));
        port = tmp.input(0);
      }

      // Add the incoming port to the selected port's pipes
      self.ports[index].pipes.push(port);

      // Add the selected port to the incoming port's pipes
      port.pipes.push(self.ports[index]);

      return self.ports[index];
    };
  };

  // Executor kicks off a a flow in a new (parentless) context
  Executor = exports.Executor = function (conductor, context) {
    context = new Context(context);

    // Make every flow asynchronous by way of setTimeout(..., 0)
    var queue = function (node) {
      setTimeout(function () {
        // Setup the context
        var initContext = new Context(context);
        initContext.prepare(node);

        // Execute the node
        node.execute(initContext);
      }, 0);
    };

    // Run the flow!
    return function execute() {
      var i = 0, l = conductor.nodes.length;
      for (i; i < l; i++) {
        queue(conductor.nodes[i]);
      }
    };
  };

  // Node provides a wrapper for functionality and Edges.
  Node = exports.Node = function (fn, conductor, name) {
    var self = this;

    // Every node in this flow gets attached to the conductor instance
    this.conductor = conductor;
    conductor.nodes.push(this);

    // If the incoming fn is a function, make it easier for humans to 
    // attach inputs and such.
    if (typeof fn === "function") {
      // Get the string representation of a function and collect the arguments
      var str     = fn.toString().replace(/\r/g,""), matches,
          fns = str.split("\n");

          for (var i=0; i<fns.length; i++) {
            fns[i] = fns[i].replace(/\/\/.*$/g,"");
          }
          str = fns.join("");
          var start = str.indexOf("/*"), end;
          while (start >= 0) {
              end = str.indexOf("*/");
              str = str.substring(start, (start-end)+2) + str.substring(end+2);
              start = str.indexOf("/*");
          }

          str = str.replace(/[\r\n ]/g, '');
          str = str.replace(/\/\*.*\*\//g,"");
          matches = str.match(/function[^\(]*\(([^\)]*)\)/);


      // If there are arguments
      if (matches && matches.length === 2) {
        // split them apart
        var args = matches[1].replace(/[\n \t]*/g,"").split(",");
        this.args = {};
        var setupArg = function(index, name) {
          self.args[name] = function(port) {
            return self.input(index, port);
          }
        }

        // add the args as wrappers around Node.input()
        for (var i=0; i<args.length; i++) {
          var arg = args[i];
          setupArg(i, arg);
        }
      }
    }
    
    // Every node in this flow gets a unique identifier
    this.index = conductor.nodes.length - 1;
    
    // the Node's name is the index if a name is not passed
    this.name = name || this.index;
    

    // Prepare 3 (for now) edges in which data can flow through
    this.edges = {
      input : new Edge(this, "input"),
      output: new Edge(this, "output"),
      callback: new Edge(this, "callback")
    };

    // Ease of use wrapper for the input edge route method
    this.input = function (index, port) {
      return this.edges.input.route(index, port);
    };

    // Ease of use wrapper for the output edge route method
    this.output = function (port) {
      return this.edges.output.route(0, port);
    };

    // Ease of use wrapper for the callback edge route method
    this.callback = function (index, port) {
      return this.edges.callback.route(index, port);
    };

    // This method returns true when the number of inputs is greater than one which means
    // there are multiple sources "joining" at this node.
    this.isJoin = function () {
      return (this.edges.input.length() > 1);
    };

    // This method returns true if the number of outputs + callbacks is greater than 1.  The reason for
    // this is: it is impossible to have multiple outputs if not by callbacks (or events)
    this.isFork = function () {
      return (this.edges.callback.length() > 1 ||
              this.edges.callback.length() + this.edges.output.length() > 1);
    };

    // Execute the function that this node wraps.
    this.execute = function (context) {
      // As edges are boundries, the input edge needs to be satisfied before continuing.
      if (this.edges.input.satisfied(context) && typeof fn === "function") {
        var edge = this.edges.input,
            values = edge.values(context);

        // Asynchronously execute the function
        setTimeout(function () {
          var result = fn.apply(context, values);
          // The only output you can actually have is a return.. everything else
          // is callback based.  The only reason we'd need to satisfy it is if it's
          // required in the current flow.
          if (self.edges.output.length() > 0) {
            self.edges.output.satisfy(context, 0, result);
          }
        }, 0);
      }
    };
  };

  /*
    Ports are the inlets/outlets in conductor.  
  */
  Port = exports.Port = function (edge, index) {
    this.pipes = []; // these are actual routes
    this.edge = edge;
    this.callback = false;
    this.index = index;
    this.queue = [];
    edge.ports[index] = this;

    // contextual getter/setter
    this.value = function (context, val) {
      var port = this.index,
          type = this.edge.type,
          node = this.edge.node.index;

      context.prepare(this.edge.node);

      // Setter mode
      if (arguments.length === 2) {
        if (context.nodes[node].edges[type].ports) {
          // Set the value in the context
          context.nodes[node].edges[type].ports[port] = {
            value     : val,
            satisfied : true
          };
        }
      }

      // The port is set, return its value
      if (context.nodes[node].edges[type].ports[port]) {
        return context.nodes[node].edges[type].ports[port].value;
      }
    };

    // Ports are satisfied when they have an associated value in the provided context
    this.satisfied = function (context) {
      var node = this.edge.node.index,
          type = this.edge.type,
          port = this.index;

      context.prepare(this.edge.node);

      return (context.nodes[node].edges[type].ports[port] && 
              context.nodes[node].edges[type].ports[port].satisfied === true);
    };

    // Contexts are queued on the port's that they satisfy until the entire edge
    // has been satisfied.  This is important for parallel fork/joins
    this.enqueue = function (data) {
      this.queue.push(data);
    };

    // Attempt to find a match between the incoming context and any one of the queue entries' contexts
    this.match = function (context) {
      var i, c;
      for (i = 0; i < this.queue.length; i++) {
        
        // If the incoming context is the same as the current queue item's context, then we have a match
        if (this.queue[i].context === context) {
          return i;
        }

        // Attempt to match the queue items against the current context's fork queue
        for (c = 0; c < this.queue[i].context.forks.length; c++) {
          // Does this queue context and the current context have a common fork context ancestor?
          if (context.forks.indexOf(this.queue[i].context.forks[c]) !== -1) {
            return i;
          }
        }
      }
      return null;
    };

    // Combine the value of specified queue with the values of the specified Context.  Remove the item
    // in the queue when complete.
    this.join = function (queueIndex, context) {
      var data = this.queue[queueIndex];
      this.queue.splice(queueIndex, 1);
      this.value(context, data.value);
    };

    // Forward the value for this port (located in the incoming Context) down all of this port's pipes.
    // This is done by satisfying all of the target port's with the value.
    this.forward = function (context) {
      var forwarded = [], p, target, targetStr;
      // Satisfy the downstream ports
      for (p = 0; p < this.pipes.length; p++) {
        target       = this.pipes[p];
        targetStr    = target.edge.node.index + "@" +
                           target.edge.type + "#" + target.index;

        // Don't forward to the same port more than once
        if (forwarded.indexOf(targetStr) === -1) {
          // satisfy the target end
          target.edge.satisfy(context, target.index, this.value(context));
          forwarded.push(targetStr);
        }
      }
    };
  };

// Browser/CommonJS compat
}((typeof exports === "undefined") ? window : exports));