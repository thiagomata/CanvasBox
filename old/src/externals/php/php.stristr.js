php.stristr = function (haystack, needle, bool) {
    // Finds first occurrence of a string within another, case insensitive  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/stristr
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfxied by: Onno Marsman
    // *     example 1: \php.stristr('Kevin van Zonneveld', 'Van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: \php.stristr('Kevin van Zonneveld', 'VAN', true);
    // *     returns 2: 'Kevin '
    var pos = 0;

    haystack += '';
    pos = haystack.toLowerCase().indexOf( (needle+'').toLowerCase() );
    if (pos == -1){
        return false;
    } else{
        if (bool) {
            return haystack.substr( 0, pos );
        } else{
            return haystack.slice( pos );
        }
    }
};

