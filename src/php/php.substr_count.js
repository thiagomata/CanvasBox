php.substr_count = function (haystack, needle, offset, length) {
    // Returns the number of times a substring occurs in the string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/substr_count
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: \php.substr_count('Kevin van Zonneveld', 'e');
    // *     returns 1: 3
    // *     example 2: \php.substr_count('Kevin van Zonneveld', 'K', 1);
    // *     returns 2: 0
    // *     example 3: \php.substr_count('Kevin van Zonneveld', 'Z', 0, 10);
    // *     returns 3: false
    var pos = 0, cnt = 0;

    haystack += '';
    needle += '';
    if (isNaN(offset)) {offset = 0;}
    if (isNaN(length)) {length = 0;}
    offset--;

    while ((offset = haystack.indexOf(needle, offset+1)) != -1){
        if (length > 0 && (offset+needle.length) > length){
            return false;
        } else{
            cnt++;
        }
    }

    return cnt;
};

