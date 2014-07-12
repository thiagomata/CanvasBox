php.is_long = function (mixed_var) {
    // Returns true if variable is a long (integer)  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_long
    // +   original by: Paulo Freitas
    //  -   depends on: is_float
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: \php.is_long(186.31);
    // *     returns 1: true
    return this.is_float(mixed_var);
};

