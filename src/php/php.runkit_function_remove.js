php.runkit_function_remove = function (funcname) {
    // !No description available for runkit_function_remove. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/runkit_function_remove
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only remove from the global context
    // *     example 1: \php.function add (a, b, c) {return a+b+c;}
    // *     example 1: \php.runkit_function_remove('add');
    // *     returns 1: true
    if (this.window[funcname] === undefined) { // Requires existing function?
        return false;
    }

    try {
        this.window[funcname] = undefined;
    }
    catch (e) {
        return false;
    }
    return true;
};

