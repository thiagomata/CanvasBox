php.runkit_function_copy = function (funcname, targetname) {
    // !No description available for runkit_function_copy. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/runkit_function_copy
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Function can only be copied to and from the global context
    // *     example 1: \php.function plus (a, b) { return (a + b); }
    // *     example 1: \php.runkit_function_copy('plus', 'add');
    // *     returns 1: true
    if (typeof this.window[funcname] !== 'function' || this.window[targetname] !== undefined) { //  (presumably disallow overwriting existing variables)
        return false;
    }
    this.window[targetname] = this.window[funcname];
    return true;
};

