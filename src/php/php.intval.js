php.intval = function (mixed_var, base) {
    // Get the integer value of a variable using the optional base for the conversion  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/intval
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: stensi
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Matteo
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.intval('Kevin van Zonneveld');
    // *     returns 1: 0
    // *     example 2: \php.intval(4.2);
    // *     returns 2: 4
    // *     example 3: \php.intval(42, 8);
    // *     returns 3: 42
    // *     example 4: \php.intval('09');
    // *     returns 4: 9
    // *     example 5: \php.intval('1e', 16);
    // *     returns 5: 30
    var tmp;

    var type = typeof( mixed_var );

    if (type === 'boolean') {
        return (mixed_var) ? 1 : 0;
    } else if (type === 'string') {
        tmp = parseInt(mixed_var, base || 10);
        return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
    } else if (type === 'number' && isFinite(mixed_var) ) {
        return Math.floor(mixed_var);
    } else {
        return 0;
    }
};

