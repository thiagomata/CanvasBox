php.get_defined_vars = function () {
    // Returns an associative array of names and values of all currently defined variable names (variables in the current scope)  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_defined_vars
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Test case 1: If get_defined_vars can find itself in the defined vars, it worked :)
    // *     example 1: \php.function test_in_array(array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
    // *     example 1: \php.funcs = get_defined_vars();
    // *     example 1: \php.found = test_in_array(funcs, 'get_defined_vars');
    // *     results 1: found == true
    var i = '', arr = [], already = {};

    for (i in this.window) {
        try {
            if (typeof this.window[i] === 'object') {
                for (var j in this.window[i]) {
                    if (this.window[j] && !already[j]) {
                        already[j] = 1;
                        arr.push(j);
                    }
                }
            }
            else if (!already[i]) {
                already[i] = 1;
                arr.push(i);
            }
        }
        catch (e) { // Problems accessing some properties in FF (e.g., sessionStorage)
            if (!already[i]) {
                already[i] = 1;
                arr.push(i);
            }
        }
    }

    return arr;
};

