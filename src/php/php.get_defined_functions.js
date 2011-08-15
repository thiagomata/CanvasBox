php.get_defined_functions = function () {
    // Returns an array of all defined functions  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_defined_functions
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Test case 1: If get_defined_functions can find itself in the defined functions, it worked :)
    // *     example 1: \php.function test_in_array (array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
    // *     example 1: \php.funcs = get_defined_functions();
    // *     example 1: \php.found = test_in_array(funcs, 'get_defined_functions');
    // *     results 1: found == true
    var i = '', arr = [], already = {};

    for (i in this.window) {
        try {
            if (typeof this.window[i] === 'function') {
                if (!already[i]) {
                    already[i] = 1;
                    arr.push(i);
                }
            }
            else if (typeof this.window[i] === 'object') {
                for (var j in this.window[i]) {
                    if (typeof this.window[j] === 'function' && this.window[j] && !already[j]) {
                        already[j] = 1;
                        arr.push(j);
                    }
                }
            }
        }
        catch (e) {
            // Some objects in Firefox throw exceptions when their properties are accessed (e.g., sessionStorage)
        }
    }

    return arr;
};

