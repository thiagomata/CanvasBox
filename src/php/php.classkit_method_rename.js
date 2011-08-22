php.classkit_method_rename = function (classname, methodname, newname) {
    // !No description available for classkit_method_rename. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/classkit_method_rename
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.classkit_method_rename('someClass', 'someMethod', 'newMethod');
    // *     returns 1: true
    
    if (typeof classname === 'string') {
        classname = this.window[classname];
    }

    /*
    var method = classname[methodname]; // Static
    classname[newname] = method;
    delete classname[methodname];
    */

    var method = classname.prototype[methodname];
    classname.prototype[newname] = method;
    delete classname.prototype[methodname];

    return true;
};

