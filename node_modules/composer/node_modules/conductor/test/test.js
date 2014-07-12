var conductor = require("../lib/conductor").conductor,
    Context   = require("../lib/conductor").Context;

var tests   = [],
    pass    = 0,
    fail    = 0,
    execute = function(index) {
      if (!tests[index].logic) {
        try {
          throw new Error(tests[index].msg); // collect the callstack
        } catch (e) {
          fail++;
          tests[index].error = e.stack + "\n";
        }
      } else {
        tests[index].pass = true;
        pass++;
      }
    },
    soon    = function(failmsg, logic) {
      tests.push({
        logic: logic,
        msg : failmsg,
      });

      var index = tests.length-1;
      return function(m, l) {
        tests[index].msg = m || failmsg;
        tests[index].logic   = l || logic;
        execute(index);
      };
    },
    ok      = function(failmsg, logic) {
      tests.push({
        logic: logic,
        msg : failmsg,
      });
      execute(tests.length-1);
    };

//
// Tests
//

var sanityConductor = conductor(),
    sanityNode = sanityConductor.node(function(){}, "sanityNode"),
    sanityContext = new Context();

// Sanity
ok("conductor should expose a node method",
   typeof conductor().node === "function");

ok("Nodes should have input and output methods",
   typeof sanityNode.input === "function" &&
   typeof sanityNode.output === "function");

// For debugging
ok("Nodes should have names if provided", sanityNode.name === "sanityNode");
ok("Nodes should have their id as a name if a name is not provided",
   sanityConductor.node().name === 1);

ok("Root level context has no parent", (new Context()).parent === null);

var reparented = new Context();
reparented.reparent(new Context(null, true));
ok("Reparented nodes should still be leafs",
   reparented.parent.forkNode === true);

ok("a node's edges are empty by default",
   sanityNode.edges.input.length() === 0 &&
   sanityNode.edges.output.length() === 0 &&
   sanityNode.edges.callback.length() === 0);

ok("empty edges should be satisfied by default",
   sanityNode.edges.input.satisfied(sanityContext) &&
   sanityNode.edges.output.satisfied(sanityContext) &&
   sanityNode.edges.callback.satisfied(sanityContext));

ok("empty edges are neither fork nor join nodes",
   sanityNode.isFork() === false && sanityNode.isJoin() === false);

var forkNode = sanityConductor.node(null, "forkNode"),
    joinNode = sanityConductor.node(null, "joinNode"),
    forkNode2 = sanityConductor.node(null, "forkNode2");

forkNode.output(joinNode.input(0));
forkNode.input(0, joinNode.input(1));
forkNode2.input(0, joinNode.input(2));
forkNode2.input(1, joinNode.input(3));

ok("nodes with an output and a callback are fork nodes", forkNode.isFork());
ok("nodes with multiple callbacks are fork nodes", forkNode2.isFork());
ok("nodes with multiple inputs are join nodes", joinNode.isJoin());


// Satisfaction (no callbacks)
var satisfyNode = conductor().node(null, "satisfyNode"),
    satisfyHelper = conductor().node(null, "satisfyHelper"),
    satisfyContext = new Context();

ok("empty input edges are satisfied by default",
   satisfyNode.edges.input.satisfied(satisfyContext));

ok("empty output edges are satisfied by default",
   satisfyHelper.edges.output.satisfied(satisfyContext));

satisfyHelper.output(satisfyNode.input(0));

ok("non-empty input edges are not satisfied by default",
   !satisfyNode.edges.input.satisfied(satisfyContext));

satisfyNode.output(0, satisfyHelper.input(1));
ok("non-empty output edges are not satisfied by default",
   !satisfyNode.edges.output.satisfied(satisfyContext));

satisfyHelper.output(satisfyNode.input(1));
satisfyNode.edges.input.satisfy(satisfyContext, 0, "satisfying input 0");
ok("a join node input edge is not satisfied when only one input is satisfied",
   !satisfyNode.edges.input.satisfied(satisfyContext));

satisfyNode.edges.input.satisfy(satisfyContext, 1, "satisfying input 1");
ok("a join node input edge is satisfied when all inputs are satisfied",
   satisfyNode.edges.input.satisfied(satisfyContext));

// Satisfaction (callbacks)

//  [scn1]
//   |  |
//   |  v
//   | [scn2]
//   |  |
//   v  v
//  [scn3]

var satisfyCallbackConductor = conductor(),
    scn1 = satisfyCallbackConductor.node(function(fn1,fn2) {
      fn1("calling scn2#0");
      fn2("calling scn3#0");
    }, "scn1"),
    scn2 = satisfyCallbackConductor.node(function(val) {
      return val;
    } , "scn2"),
    scn3 = satisfyCallbackConductor.node(function() {
    }, "scn3"),
    scc  = new Context();

scn1.input(0, scn2.input(0));
scn1.input(1, scn3.input(0));
scn2.output(0, scn3.input(0));

ok("callbacks should not unsatisfy a fork node's inputs",
   scn1.edges.input.satisfied(scc));

ok("fork nodes are not satisfied when no callbacks have been satisfied",
   !scn1.edges.callback.satisfied(scc));

scn1.edges.callback.satisfy(scc, 0, "scn1's output from callback 1");
ok("fork nodes are not satisfied until all callbacks have been satisfied",
   !scn1.edges.callback.satisfied(scc));


// Ports and pipes
var ptc = conductor(),
    ptc1 = ptc.node(function() { return "hello"; }, "ptc1"),
    ptc2 = ptc.node(function() {  }, "ptc2"),
    ptcContext = new Context(),
    ptcExecute = soon("values should be passed into execute");

ptc1.output(ptc2.input(0));

ptc2.execute = function(context) {
  ptcExecute(null, this.edges.input.values(context)[0] === "testing");
};

ptc1.edges.output.satisfy(ptcContext, 0, "testing");
ok("ptc2's input edge should be satisfied",
   ptc2.edges.input.satisfied(ptcContext));


// Sanity test
//
// [n]
//  |
//  v
// [output]
//
var c = conductor(),
    n = c.node(function() {
      return "first node!";
    }, "first node");

var basicSyncTest = soon("basic sync test: expecting 'first node!'", null);
n.output(function(str) {
  basicSyncTest(null, str === "first node!");
});
c.execute();

// 2 node flow (Sync)
//
// [n1]
//  |
//  v
// [n2]
//  |
//  v
// [output]
//
var c1 = conductor(),
    n1 = c1.node(function() {
      return "1";
    }, "n1"),
    n2 = c1.node(function(str) {
      return str + "2";
    }, "n2");

var chainedTest = soon("chained sync test: expecting 12");
n2.input(0, n1.output());
n2.output(function(str) {
  chainedTest(null, str === "12");
});

c1.execute();

// Split and join (Sync)
//
//   [A]
//   | |
//   v v
// [B] [C]
//   | |
//   v v
//   [D]
//    |
//    v
// [output]
//
var flow = conductor(),
    saj = {
      A : flow.node(function(a1, a2) { a1("A1"); a2("A2"); }, "saj-A"),
      B : flow.node(function(str) { return "B" + str }, "saj-B"),
      C : flow.node(function(str) { return "C" + str }, "saj-C"),
      D : flow.node(function(str1, str2) { return str1 + str2; }, "saj-D"),
    }, splitAndJoinSyncTest = soon("Execution should result in BA1CA2");
saj.A.input(0, saj.B.input(0));
saj.A.input(1, saj.C.input(0));
saj.B.output(saj.D.input(0));
saj.C.output(saj.D.input(1));
saj.D.output(function(value) {
  splitAndJoinSyncTest("Execution should result in BA1CA2 not " + value,
                       value === "BA1CA2");
});
flow.execute();

// Split and join (Async)
//
//   [A]
//   | |
//   v v
// [B] [C]
//   | |
//   v v
//   [D]
//    |
//    v
// [output]
//
var sajAsyncFlow = conductor(),
    sajAsync = {
      A : sajAsyncFlow.node(function(a1, a2) { a1("A1"); a2("A2"); }, "saja-A"),
      B : sajAsyncFlow.node(function(str) { return "B" + str }, "saja-B"),
      C : sajAsyncFlow.node(function(fn, str) {
        setTimeout(function() {
          fn("C" + str);
        }, 10);
      }, "saja-C"),
      D : sajAsyncFlow.node(function(str1, str2) { return str1 + str2; }, "saja-D")
    }, splitAndJoinAsyncTest = soon("Execution should result in BA1CA2");
sajAsync.A.input(0, sajAsync.B.input(0));
sajAsync.A.input(1, sajAsync.C.input(1));
sajAsync.B.output(sajAsync.D.input(0));
sajAsync.C.input(0, sajAsync.D.input(1));
sajAsync.D.output(function(value) {
  splitAndJoinAsyncTest("Execution should result in BA1CA2 not " + value,
                       value === "BA1CA2");
});
sajAsyncFlow.execute();


// Parallel flows (Async)
// [A]
//  |
//  v
// [B]
//  |
//  v
// [C]
//
var results = [4,3,2,1],
    pflow = conductor(),
    pAsync = {
      A : pflow.node(function(fn) {
        var count = 4, loc = 1;
        setTimeout(function next() {
          fn(loc);
          loc++;
          if (loc <= count) {
            setTimeout(next, 0);
          }
        }, 0);
      }),
      B : pflow.node(function(value, fn) {
        setTimeout(function() {
          fn(value);
        }, 1000/value);
      }),
      C : pflow.node(function(value) {
        results.push(value);
        return value;
      }),
      D : pflow.node(function(value) {
          var ex = results.shift();
          ok("parallel results should be " + ex + " not " + value, value === ex);
      })
    };

pAsync.A.input(0, pAsync.B.input(0));
pAsync.B.input(1, pAsync.C.input(0));
pAsync.C.output(pAsync.D.input(0));
pflow.execute();


// Parallel Asynchronous Split/Join
//
//   [A]
//   | |
//   v v
// [B] [C]
//   | |
//   v v
//   [D]
//    |
//    v
//   [E]
//
var paspResults = ['910','78','56','34','12'],
    paspflow = conductor(),
    pasp = {
      A : paspflow.node(function(cb1, cb2) {
        var count = 10, loc = 1;
        setTimeout(function paspnext() {
          cb1(loc);
          loc++;
          cb2(loc);
          loc++;
          if (loc <= count) {
            setTimeout(paspnext, 0);
          }
        }, 0);
      }, "pasp-A"),
      B : paspflow.node(function(value, fn) {
        setTimeout(function() {
            fn(value);
        }, 1000/value);
      }, "pasp-B"),
      C : paspflow.node(function(value) {
        return value;
      }, "pasp-C"),
      D : paspflow.node(function(v1, v2) {
        return v1 + "" + v2;
      }, "pasp-D"),
      E : paspflow.node(function(value) {
          var ex = paspResults.shift();
          ok("parallel split/join results should be " + ex + " not " + value,
             value === ex);
      }, "pasp-E")
    };

pasp.A.input(0, pasp.B.input(0));
pasp.A.input(1, pasp.C.input(0));
pasp.B.input(1, pasp.D.input(0));
pasp.C.output(pasp.D.input(1));
pasp.D.output(pasp.E.input(0));
paspflow.execute();

// User friendly route mapping
var uf = conductor(),
    ufSoon = soon("User friendly pipe mapping should work correctly.");
    ufn = {
      A : uf.node(function(callback) {
        callback("hello");
      }),
      B : uf.node(function(data) {
        return data + " world";
      }),
      C : uf.node(function(testData) {
        ufSoon("Expecting 'hello world' not '" + testData + "'", testData === "hello world");
      })
    };

ufn.A.args.callback(ufn.B.args.data());
ufn.B.output(ufn.C.args.testData());
uf.execute();

// Function argument parsing tests
var fapt        = conductor(),
    newline     = fapt.node(function(a, b,   
                  c) {}),
    lineComment = fapt.node(function(a // this is a comment
                            ,b){}),
    multiComment = fapt.node(function(a /*
      this is a multiline comment
    */, b, /* single line comment */c) {});
    
ok("parsing new lines should not be a problem",
    newline.args.a && newline.args.b && newline.args.c);

ok("parsing line comments should not be a problem", 
  lineComment.args.a && lineComment.args.b);

ok("parsing multi-line comments should not be a problem", 
  multiComment.args.a && multiComment.args.b && multiComment.args.c);

//
// RESULTS
//
process.on("exit", function() {
  for (var i=0; i<tests.length; i++) {
    if (tests[i].error) {
      console.log(tests[i].error);
    } else if (!tests[i].pass) {
      console.log("Error: ", tests[i].msg, "\n    not executed\n");
    }
  }

  console.log(JSON.stringify({
   total: tests.length,
   fail: tests.length - pass,
   pass: pass
  }));
});
