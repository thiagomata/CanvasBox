php.array_intersect_ukey = function  () {
    // Returns the entries of arr1 that have keys which are present in all the other arguments. Kind of equivalent to array_diff(array_keys($arr1), array_keys($arr2)[,array_keys(...)]). The comparison of the keys is performed by a user supplied function. Equivalent of array_intersect_uassoc() but does not do compare of the data.  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_intersect_ukey
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: $array1 = {blue: 1, red: 2, green: 3, purple: 4}
    // *     example 1: $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    // *     example 1: \php.array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
    // *     returns 1: {blue: 1, green: 3}
    var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
    var k1 = '', i = 1, arr = {}, k = '';

    cb = (typeof cb === 'string') ? this.window[cb] : (cb instanceof Array) ? this.window[cb[0]][cb[1]] : cb;

    arr1keys:
    for (k1 in arr1) {
        arrs:
        for (i = 1; i < arguments.length-1; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (cb(k, k1) === 0 ) {
                    if (i === arguments.length-2) {
                        retArr[k1] = arr1[k1];
                    }
                    // If the innermost loop always leads at least once to an equal value, continue the loop until done
                    continue arrs;
                }
            }
            // If it reaches here, it wasn't found in at least one array, so try next value
            continue arr1keys;
        }
    }

    return retArr;
    
};

