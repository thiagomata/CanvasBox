php.strpbrk = function (haystack, char_list) {
    // Search a string for any of a set of characters  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/strpbrk
    // +   original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
    // +   bugfixed by: Onno Marsman
    // +    revised by: Christoph
    // +    improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.strpbrk('This is a Simple text.', 'is');
    // *     returns 1: 'is is a Simple text.'
    for (var i = 0, len = haystack.length; i < len; ++i) {
        if (char_list.indexOf(haystack.charAt(i)) >= 0)
            return haystack.slice(i);
    }
    return false;
};

