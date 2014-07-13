php.func_get_arg = function (num) {
    // Get the $arg_num'th argument that was passed to the function  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/func_get_arg
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: May not work in all JS implementations
    // *     example 1: \php.function tmp_a() {return func_get_arg(1);}
    // *     example 1: \php.tmp_a('a', 'b');
    // *     returns 1: 'a'
    if (!arguments.callee.caller) {
        try {
            throw new Error('Either you are using this in a browser which does not support the "caller" property or you are calling this from a global context');
            //return false;
        } catch (e){
            return false;
        }
    }

    if (num > arguments.callee.caller.arguments.length - 1) {
        try {
            throw new Error('Argument number is greater than the number of arguments actually passed');
            //return false;
        } catch (e2){
            return false;
        }
    }

    return arguments.callee.caller.arguments[num];
};

