php.runkit_method_rename = function (classname, methodname, newname) {
    // !No description available for runkit_method_rename. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/runkit_method_rename
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.runkit_method_rename('someClass', 'someMethod', 'newMethod');
    // *     returns 1: true
    
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };

    if (typeof classname === 'string') {
        classname = this.window[classname];
    }

    /*
    var method = classname[methodname]; // Static
    classname[newname] = method;
    delete classname[methodname];
    */

    if (getFuncName(classname) !== 'PHP_JS' ||  // By default, don't allow overriding of PHP functions
        (this.php_js && this.php_js.ini && this.php_js.ini['runkit.internal_override'] &&
        (this.php_js.ini['runkit.internal_override'].local_value === true ||
            this.php_js.ini['runkit.internal_override'].local_value === 1 ||
            this.php_js.ini['runkit.internal_override'].local_value === '1' ||
            this.php_js.ini['runkit.internal_override'].local_value === 'true'
            )
        )) {
        var method = classname.prototype[methodname];
        classname.prototype[newname] = method;
        delete classname.prototype[methodname];
        return true;
    }
    return false;
};

