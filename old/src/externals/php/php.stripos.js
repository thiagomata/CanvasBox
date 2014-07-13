php.stripos = function ( f_haystack, f_needle, f_offset ){
    // Finds position of first occurrence of a string within another, case insensitive  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/stripos
    // +     original by: Martijn Wieringa
    // +      revised by: Onno Marsman
    // *         example 1: \php.stripos('ABC', 'a');
    // *         returns 1: 0
    var haystack = (f_haystack+'').toLowerCase();
    var needle = (f_needle+'').toLowerCase();
    var index = 0;
 
    if ((index = haystack.indexOf(needle, f_offset)) !== -1) {
        return index;
    }
    return false;
};

