php.array_diff_assoc = function () {
    // Returns the entries of arr1 that have values which are not present in any of the others arguments but do additional checks whether the keys are equal  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_diff_assoc
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: 0m3r
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
    // *     returns 1: {1: 'van', 2: 'Zonneveld'}
    var arr1 = arguments[0], retArr = {};
    var k1 = '', i = 1, k = '', arr = {};

    arr1keys:
    for (k1 in arr1) {
        for (i = 1; i < arguments.length; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1] && k === k1) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys;
                }
            }
            retArr[k1] = arr1[k1];
        }
    }

    return retArr;
};

