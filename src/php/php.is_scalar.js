php.is_scalar = function (mixed_var) {
    // Returns true if value is a scalar  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_scalar
    // +   original by: Paulo Freitas
    // *     example 1: \php.is_scalar(186.31);
    // *     returns 1: true
    // *     example 2: \php.is_scalar({0: 'Kevin van Zonneveld'});
    // *     returns 2: false
    return (/boolean|number|string/).test(typeof mixed_var);
};

