php.class_exists = function (cls) {
    // Checks if the class exists  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/class_exists
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.function class_a() {this.meth1 = function () {return true;}};
    // *     example 1: \php.var instance_a = new class_a();
    // *     example 1: \php.class_exists('class_a');
    // *     returns 1: true
    var i = '';
    cls = this.window[cls]; // Note: will prevent inner classes

    if (typeof cls !== 'function') {return false;}

    for (i in cls.prototype) {
        return true;
    }
    for (i in cls) { // If static members exist, then consider a "class"
        if (i !== 'prototype') {
            return true;
        }
    }
    if (cls.toSource && cls.toSource().match(/this\./)) { 
        // Hackish and non-standard but can probably detect if setting
        // a property (we don't want to test by instantiating as that
        // may have side-effects)
        return true;
    }
    
    return false;
};

