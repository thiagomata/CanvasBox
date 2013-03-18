php.array_filter = function (arr, func) {
    // Filters elements from the array via the callback.  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_filter
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Takes a function as an argument, not a function's name
    // *     example 1: \php.var odd = function (num) {return (num & 1);}; 
    // *     example 1: \php.array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd);
    // *     returns 1: {"a": 1, "c": 3, "e": 5}
    // *     example 2: \php.var even = function (num) {return (!(num & 1));}
    // *     example 2: \php.array_filter([6, 7, 8, 9, 10, 11, 12], even);
    // *     returns 2: {0: 6, 2: 8, 4: 10, 6: 12} 
    
    var retObj = {}, k;
    
    for (k in arr) {
        if (func(arr[k])) {
            retObj[k] = arr[k];
        }
    }
    
    return retObj;
};

