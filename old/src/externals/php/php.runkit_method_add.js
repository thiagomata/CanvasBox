php.runkit_method_add = function (classname, methodname, args, code, flags) {
    // !No description available for runkit_method_add. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/runkit_method_add
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.function a (){}
    // *     example 1: \php.runkit_method_add ('a', 'b', 'a,b', 'return a+b');
    // *     returns 1: true
    var func, argmnts = [];

    switch (flags) {
        case 'RUNKIT_ACC_PROTECTED':
            throw 'Protected not supported';
        case 'RUNKIT_ACC_PRIVATE':
            throw 'Private not supported';
        case 'RUNKIT_ACC_PUBLIC':
            default:
                break;
    }

    argmnts = args.split(/,\s*/);

    if (typeof classname === 'string') {
        classname = this.window[classname];
    }

// Could use the following to add as a static method to the class
//        func = Function.apply(null, argmnts.concat(code));
//            classname[methodname] = func;
    func = Function.apply(null, argmnts.concat(code));
    classname.prototype[methodname] = func;
    return true;
};

