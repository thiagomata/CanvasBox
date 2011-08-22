php.method_exists = function (obj, method) {
    // Checks if the class method exists  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/method_exists
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.function class_a() {this.meth1 = function () {return true;}};
    // *     example 1: \php.var instance_a = new class_a();
    // *     example 1: \php.method_exists(instance_a, 'meth1');
    // *     returns 1: true
    // *     example 2: \php.function class_a() {this.meth1 = function () {return true;}};
    // *     example 2: \php.var instance_a = new class_a();
    // *     example 2: \php.method_exists(instance_a, 'meth2');
    // *     returns 2: false
    if (typeof obj === 'string') {
        return this.window[obj] && typeof this.window[obj][method] === 'function';
    }

    return typeof obj[method] === 'function';
};

