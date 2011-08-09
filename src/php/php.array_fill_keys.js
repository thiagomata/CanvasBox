php.array_fill_keys = function (keys, value) {
    // Create an array using the elements of the first parameter as keys each initialized to val  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_fill_keys
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
    // *     example 1: \php.array_fill_keys(keys, 'banana')
    // *     returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}
    
    var retObj = {}, key = '';
    
    for (key in keys) {
        retObj[keys[key]] = value;
    }
    
    return retObj;
};
