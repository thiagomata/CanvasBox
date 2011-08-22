php.is_real = function (mixed_var) {
    // !No description available for is_real. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_real
    // +   original by: Brett Zamir (http://brett-zamir.me)
    //  -   depends on: is_float
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: \php.is_double(186.31);
    // *     returns 1: true
    return this.is_float(mixed_var);
};

