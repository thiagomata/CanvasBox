php.array_change_key_case = function (array) {
    // Retuns an array with all string keys lowercased [or uppercased]  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_change_key_case
    // +   original by: Ates Goral (http://magnetiq.com)
    // +   improved by: marrtins
    // *     example 1: \php.array_change_key_case(42);
    // *     returns 1: false
    // *     example 2: \php.array_change_key_case([ 3, 5 ]);
    // *     returns 2: {0: 3, 1: 5}
    // *     example 3: \php.array_change_key_case({ FuBaR: 42 });
    // *     returns 3: {"fubar": 42}
    // *     example 4: \php.array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');
    // *     returns 4: {"fubar": 42}
    // *     example 5: \php.array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');
    // *     returns 5: {"FUBAR": 42}
    // *     example 6: \php.array_change_key_case({ FuBaR: 42 }, 2);
    // *     returns 6: {"FUBAR": 42}
    var case_fn, tmp_ar = {}, argc = arguments.length, argv = arguments, key;

    if (array instanceof Array) {
        return array; 
    }

    if (array instanceof Object) {
        if (argc === 1 || argv[1] === 'CASE_LOWER' || argv[1] === 0){
            case_fn = "toLowerCase";
        } else{
            case_fn = "toUpperCase";
        }
        for (key in array) {
            tmp_ar[key[case_fn]()] = array[key];
        }
        return tmp_ar;
    }

    return false;
};
