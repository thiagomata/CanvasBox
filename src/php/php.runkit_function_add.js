php.runkit_function_add = function (funcname, arglist, code) {
    // !No description available for runkit_function_add. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/runkit_function_add
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only be added to the global context; use create_function() for an anonymous function
    // *     example 1: \php.runkit_function_add('add', 'a, b', "return (a + b);");
    // *     returns 1: true
    if (this.window[funcname] !== undefined) { // Presumably disallows adding where exists, since there is also redefine function
        return false;
    }
    
    try {
        this.window[funcname] = Function.apply(null, arglist.split(',').concat(code));
    }
    catch (e) {
        return false;
    }
    return true;
};

