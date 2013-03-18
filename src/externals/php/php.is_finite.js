php.is_finite = function (val) {
    // Returns whether argument is finite  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_finite
    // +   original by: Onno Marsman
    // *     example 1: \php.is_finite(Infinity);
    // *     returns 1: false
    // *     example 2: \php.is_finite(-Infinity);
    // *     returns 2: false
    // *     example 3: \php.is_finite(0);
    // *     returns 3: true
    var warningType = '';

    if (val===Infinity || val===-Infinity) {
        return false;
    }

    //Some warnings for maximum PHP compatibility
    if (typeof val=='object') {
        warningType = (val instanceof Array ? 'array' : 'object');
    } else if (typeof val=='string' && !val.match(/^[\+\-]?\d/)) {
        //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        warningType = 'string';
    }
    if (warningType) {
        throw new Error('Warning: is_finite() expects parameter 1 to be double, '+warningType+' given');
    }

    return true;
};

