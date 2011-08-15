php.classkit_method_remove = function (classname, methodname) {
    // !No description available for classkit_method_remove. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/classkit_method_remove
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.classkit_method_remove('someClass', 'someMethod');
    // *     returns 1: true
    
    if (typeof classname === 'string') {
        classname = this.window[classname];
    }
    delete classname.prototype[methodname]; // Delete any on prototype
    // delete classname[methodname]; // Delete any as static class method
    return true;
};

