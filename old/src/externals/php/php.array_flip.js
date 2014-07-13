php.array_flip = function (trans) {
    // Return array with key <-> value flipped  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_flip
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.array_flip( {a: 1, b: 1, c: 2} );
    // *     returns 1: {1: 'b', 2: 'c'}
    var key, tmp_ar = {};

    for (key in trans) {
        tmp_ar[trans[key]] = key;
    }

    return tmp_ar;
};

