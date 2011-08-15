php.is_infinite = function (val) {
    // Returns whether argument is infinite  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_infinite
    // +   original by: Onno Marsman
    // *     example 1: \php.is_infinite(Infinity);
    // *     returns 1: true
    // *     example 2: \php.is_infinite(-Infinity);
    // *     returns 2: true
    // *     example 3: \php.is_infinite(0);
    // *     returns 3: false
    var warningType = '';

    if (val===Infinity || val===-Infinity) {
        return true;
    }

    //Some warnings for maximum PHP compatibility
    if (typeof val=='object') {
        warningType = (val instanceof Array ? 'array' : 'object');
    } else if (typeof val=='string' && !val.match(/^[\+\-]?\d/)) {
        //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        warningType = 'string';
    }
    if (warningType) {
        throw new Error('Warning: is_infinite() expects parameter 1 to be double, '+warningType+' given');
    }

    return false;
};

