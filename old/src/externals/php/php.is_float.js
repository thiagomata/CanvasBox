php.is_float = function (mixed_var) {
    // Returns true if variable is float point  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_float
    // +   original by: Paulo Freitas
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: \php.is_float(186.31);
    // *     returns 1: true
    if (typeof mixed_var !== 'number') {
        return false;
    }

    return !!(mixed_var % 1);
};

