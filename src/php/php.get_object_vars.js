php.get_object_vars = function (obj) {
    // Returns an array of object properties  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_object_vars
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.function Myclass () {this.privMethod = function (){}}
    // *     example 1: Myclass.classMethod = function () {}
    // *     example 1: Myclass.prototype.myfunc1 = function () {return(true);};
    // *     example 1: Myclass.prototype.myfunc2 = function () {return(true);}
    // *     example 1: \php.get_object_vars('MyClass')
    // *     returns 1: {}
    var retArr = {}, prop = '';

    for (prop in obj) {
        if (typeof obj[prop] !== 'function' && prop !== 'prototype') {
            retArr[prop] = obj[prop];
        }
    }
    for (prop in obj.prototype) {
        if (typeof obj.prototype[prop] !== 'function') {
            retArr[prop] = obj.prototype[prop];
        }
    }
    
    return retArr;
};

