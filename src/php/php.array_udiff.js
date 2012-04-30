php.array_udiff = function () {
    // Returns the entries of arr1 that have values which are not present in any of the others arguments. Elements are compared by user supplied function.  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_udiff
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    // *     example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
    // *     example 1: \php.array_udiff($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 == string2) return 0; return -1;});
    // *     returns 1: {c: 'blue'}
    var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
    var arr = '', i = 1, k1 = '', k = '';
    cb = (typeof cb === 'string') ? this.window[cb] : (cb instanceof Array) ? this.window[cb[0]][cb[1]] : cb;

    arr1keys:
    for (k1 in arr1) {
        for (i=1; i < arguments.length-1; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (cb(arr[k], arr1[k1]) === 0) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys;
                }
            }
            retArr[k1] = arr1[k1];
        }
    }

    return retArr;
};

