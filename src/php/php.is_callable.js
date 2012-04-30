php.is_callable = function (v, syntax_only, callable_name) {
    // Returns true if var is callable.  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_callable
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: The variable callable_name cannot work as a string variable passed by reference as in PHP (since JavaScript does not support passing strings by reference), but instead will take the name of a global variable and set that instead
    // %        note 2: When used on an object, depends on a constructor property being kept on the object prototype
    // *     example 1: \php.is_callable('is_callable');
    // *     returns 1: true
    // *     example 2: \php.is_callable('bogusFunction', true);
    // *     returns 2:true // gives true because does not do strict checking
    // *     example 3: \php.function SomeClass () {}
    // *     example 3: SomeClass.prototype.someMethod = function (){};
    // *     example 3: \php.var testObj = new SomeClass();
    // *     example 3: \php.is_callable([testObj, 'someMethod'], true, 'myVar');
    // *     example 3: \php.alert(myVar); // 'SomeClass::someMethod'
    var name='', obj={}, method='';
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (typeof v === 'string') {
        obj = this.window;
        method = v;
        name = v;
    }
    else if (v instanceof Array && v.length === 2 && typeof v[0] === 'object' && typeof v[1] === 'string') {
        obj = v[0];
        method = v[1];
        name = (obj.constructor && getFuncName(obj.constructor))+'::'+method;
    }
    else {
        return false;
    }
    if (syntax_only || typeof obj[method] === 'function') {
        if (callable_name) {
            this.window[callable_name] = name;
        }
        return true;
    }
    return false;
};

