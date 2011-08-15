php.forward_static_call_array = function (cb, parameters) {
    // !No description available for forward_static_call_array. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/forward_static_call_array
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: No real relevance to late static binding here; might also use call_user_func_array()
    // *     example 1: \php.forward_static_call_array('isNaN', ['a']);
    // *     returns 1: true
    // *     example 2: \php.forward_static_call_array('isNaN', [1]);
    // *     returns 2: false

    var func;

    if (typeof cb == 'string') {
        if (typeof this[cb] == 'function') {
            func = this[cb];
        } else {
            func = (new Function(null, 'return ' + cb))();
        }
    } else if (cb instanceof Array) {
        func = eval(cb[0]+"['"+cb[1]+"']");
    }

    if (typeof func != 'function') {
        throw new Error(func + ' is not a valid function');
    }

    return func.apply(null, parameters);
};

