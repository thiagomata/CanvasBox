php.str_ireplace = function ( search, replace, subject ) {
    // Replaces all occurrences of search in haystack with replace / case-insensitive  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/str_ireplace
    // +   original by: Martijn Wieringa
    // +      input by: penutbutterjelly
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Jack
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Philipp Lenssen
    // *     example 1: \php.str_ireplace('l', 'l', 'HeLLo');
    // *     returns 1: 'Hello'
    // *     example 2: \php.str_ireplace('$', 'foo', '$bar');
    // *     returns 2: 'foobar'
    var i, k = '';
    var searchl = 0;
    var reg;

    var escapeRegex = function(s) {
        return s.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, '\\$1');
    };

    search += '';
    searchl = search.length;
    if (!(replace instanceof Array)) {
        replace = [replace];
        if (search instanceof Array) {
            // If search is an array and replace is a string,
            // then this replacement string is used for every value of search
            while (searchl > replace.length) {
                replace[replace.length] = replace[0];
            }
        }
    }

    if (!(search instanceof Array)) {
        search = [search];
    }
    while (search.length>replace.length) {
        // If replace has fewer values than search,
        // then an empty string is used for the rest of replacement values
        replace[replace.length] = '';
    }

    if (subject instanceof Array) {
        // If subject is an array, then the search and replace is performed
        // with every entry of subject , and the return value is an array as well.
        for (k in subject) {
            if (subject.hasOwnProperty(k)) {
                subject[k] = str_ireplace(search, replace, subject[k]);
            }
        }
        return subject;
    }

    searchl = search.length;
    for (i = 0; i < searchl; i++) {
        reg = new RegExp(escapeRegex(search[i]), 'gi');
        subject = subject.replace(reg, replace[i]);
    }

    return subject;
};
