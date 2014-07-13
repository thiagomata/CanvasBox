php.substr_replace = function (str, replace, start, length) {
    // Replaces part of a string with another string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/substr_replace
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0);
    // *     returns 1: 'bob'
    // *     example 2: $var = 'ABCDEFGH:/MNRPQR/';
    // *     example 2: \php.substr_replace($var, 'bob', 0, $var.length);
    // *     returns 2: 'bob'
    // *     example 3: \php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0);
    // *     returns 3: 'bobABCDEFGH:/MNRPQR/'
    // *     example 4: \php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1);
    // *     returns 4: 'ABCDEFGH:/bob/'
    // *     example 5: \php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', -7, -1);
    // *     returns 5: 'ABCDEFGH:/bob/'
    // *     example 6: 'substr_replace('ABCDEFGH:/MNRPQR/', '', 10, -1)'
    // *     returns 6: 'ABCDEFGH://'
    if (start < 0) { // start position in str
        start = start + str.length;
    }
    length = length !== undefined ? length : str.length;
    if (length < 0) {
        length = length + str.length - start;
    }
    return str.slice(0, start)+replace.substr(0, length)+replace.slice(length)+str.slice(start+length);
};

