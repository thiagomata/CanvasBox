php.get_class = function (obj) {
    // Retrieves the class name  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_class
    // +   original by: Ates Goral (http://magnetiq.com)
    // +   improved by: David James
    // *     example 1: \php.get_class(new (function MyClass() {}));
    // *     returns 1: "MyClass"
    // *     example 2: \php.get_class({});
    // *     returns 2: "Object"
    // *     example 3: \php.get_class([]);
    // *     returns 3: false
    // *     example 4: \php.get_class(42);
    // *     returns 4: false
    // *     example 5: \php.get_class(window);
    // *     returns 5: false
    // *     example 6: \php.get_class(function MyFunction() {});
    // *     returns 6: false
    if (obj instanceof Object && !(obj instanceof Array) && 
        !(obj instanceof Function) && obj.constructor &&
        obj != this.window) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1];
        }
    }

    return false;
};

