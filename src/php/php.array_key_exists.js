php.array_key_exists = function ( key, search ) {
    // Checks if the given key or index exists in the array  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_key_exists
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
    // *     example 1: \php.array_key_exists('kevin', {'kevin': 'van Zonneveld'});
    // *     returns 1: true
    // input sanitation
    if (!search || (search.constructor !== Array && search.constructor !== Object)){
        return false;
    }

    return key in search;
};

