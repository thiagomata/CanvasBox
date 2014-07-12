var conductor = require("../lib/conductor").conductor,
    http      = require("http"),

    // Create an execution context for this example
    flow      = conductor(),

    // Create a semi-static node that returns a port number
    port      = flow.node(function() { return 8000 }, "port"),

    // Create a node that spawns an http server on a specified port, and
    // emits a request/response
    listener  = flow.node(function(port, request, response) {
                  http.createServer(function(req, res) {
                    if (request) {
                      request(req);
                    }
                    if (response) {
                      response(res);
                    }
                  }).listen(port);
                }, "listener"),

    // Create a node to handle the incoming request (routing/etc)
    handler   = flow.node(function(request) { 
                  return "hello world!\n"
                }, "handler"),

    // Create a node that will respond to the request
    responder = flow.node(function(body, response) {
                  response.writeHead(200, {'Content-Type': 'text/plain'});
                  response.end(body);
                }, "responder");

// Setup routes, read left to right.
port.output(listener.args.port());
listener.args.request(handler.args.request());
handler.output(responder.args.body())
listener.args.response(responder.args.response());

// We now have a flow that looks something like:
//
//      [port]
//       |
//      [listener]
//       |     |
//   [handler] |
//       |     |
//      [responder]
//

// kick off the process
flow.execute();