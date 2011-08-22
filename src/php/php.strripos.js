php.strripos = function (haystack, needle, offset) {
    // Finds position of last occurrence of a string within another string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/strripos
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   input by: saulius
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.strripos('Kevin van Zonneveld', 'E');
    // *     returns 1: 16
    haystack = (haystack+'').toLowerCase();
    needle = (needle+'').toLowerCase();
    
    var i = -1;
    if (offset) {
        i = (haystack+'').slice(offset).lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
        // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
        if (i !== -1) {
            i += offset;
        }
    }
    else {
        i = (haystack+'').lastIndexOf(needle);
    }
    return i >= 0 ? i : false;
};

