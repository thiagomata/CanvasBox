php.strstr = function (haystack, needle, bool) {
    // Finds first occurrence of a string within another  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/strstr
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.strstr('Kevin van Zonneveld', 'van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: \php.strstr('Kevin van Zonneveld', 'van', true);
    // *     returns 2: 'Kevin '
    // *     example 3: \php.strstr('name@example.com', '@');
    // *     returns 3: '@example.com'
    // *     example 4: \php.strstr('name@example.com', '@', true);
    // *     returns 4: 'name'
    var pos = 0;
    
    haystack += '';
    pos = haystack.indexOf( needle );
    if (pos == -1) {
        return false;
    } else{
        if (bool){
            return haystack.substr( 0, pos );
        } else{
            return haystack.slice( pos );
        }
    }
};

