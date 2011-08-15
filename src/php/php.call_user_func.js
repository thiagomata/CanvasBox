php.call_user_func = function (cb) {
    // Call a user function which is the first parameter  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/call_user_func
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Diplom@t (http://difane.com/)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.call_user_func('isNaN', 'a');
    // *     returns 1: true
    var func;
 
    if (typeof cb === 'string') {
        func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
    } else if (cb instanceof Array) {
        func = ( typeof cb[0] == 'string' ) ? eval(cb[0]+"['"+cb[1]+"']") : func = cb[0][cb[1]];
    } else if (typeof cb === 'function') {
        func = cb;
    }
   
    if (typeof func != 'function') {
        throw new Error(func + ' is not a valid function');
    }

    var parameters = Array.prototype.slice.call(arguments, 1);
    return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) :
                ( typeof cb[0] !== 'object' ) ? func.apply(null, parameters) : func.apply(cb[0], parameters);
};

