php.is_nan = function (val) {
    // Returns whether argument is not a number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_nan
    // +   original by: Onno Marsman
    // +      input by: Robin
    // *     example 1: \php.is_nan(NaN);
    // *     returns 1: true
    // *     example 2: \php.is_nan(0);
    // *     returns 2: false
    var warningType = '';

    if (typeof val=='number' && isNaN(val)) {
        return true;
    }

    //Some errors for maximum PHP compatibility
    if (typeof val=='object') {
        warningType = (val instanceof Array ? 'array' : 'object');
    } else if (typeof val=='string' && !val.match(/^[\+\-]?\d/)) {
        //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        warningType = 'string';
    }
    if (warningType) {
        throw new Error('Warning: is_nan() expects parameter 1 to be double, '+warningType+' given');
    }

    return false;
};

