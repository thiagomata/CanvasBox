php.strchr = function ( haystack, needle, bool ) {
    // An alias for strstr  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/strchr
    // +   original by: Philip Peterson
    // -    depends on: strstr
    // *     example 1: \php.strchr('Kevin van Zonneveld', 'van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: \php.strchr('Kevin van Zonneveld', 'van', true);
    // *     returns 2: 'Kevin '
 
    return this.strstr( haystack, needle, bool );
};

