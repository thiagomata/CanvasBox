php.is_int = function (mixed_var) {
    // !No description available for is_int. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_int
    // +   original by: Alex
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Matt Bradley
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: \php.is_int(23)
    // *     returns 1: true
    // *     example 2: \php.is_int('23')
    // *     returns 2: false
    // *     example 3: \php.is_int(23.5)
    // *     returns 3: false
    // *     example 4: \php.is_int(true)
    // *     returns 4: false
    if (typeof mixed_var !== 'number') {
        return false;
    }

    return !(mixed_var % 1);
};

