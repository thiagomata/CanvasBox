php.runkit_method_redefine = function (classname, methodname, args, code, flags) {
    // !No description available for runkit_method_redefine. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/runkit_method_redefine
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.runkit_method_redefine('someClass', 'someMethod', 'a,b', 'return a+b');
    // *     returns 1: true
    // In JavaScript, this is identical to runkit_method_add

    var argmnts = [], func;
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };

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

    if (getFuncName(classname) !== 'PHP_JS' ||  // By default, don't allow overriding of PHP functions
        (this.php_js && this.php_js.ini && this.php_js.ini['runkit.internal_override'] &&
        (this.php_js.ini['runkit.internal_override'].local_value === true ||
            this.php_js.ini['runkit.internal_override'].local_value === 1 ||
            this.php_js.ini['runkit.internal_override'].local_value === '1' ||
            this.php_js.ini['runkit.internal_override'].local_value === 'true'
            )
        )) {
        // Could use the following to add as a static method to the class
        //        func = Function.apply(null, argmnts.concat(code));
        //            classname[methodname] = func;
        func = Function.apply(null, argmnts.concat(code));
        classname.prototype[methodname] = func;
        return true;
    }
    return false;
};

