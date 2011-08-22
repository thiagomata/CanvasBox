php.rewind = function (handle) {
    // Rewind the position of a file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/rewind
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: \php.fread(h, 100);
    // *     example 1: \php.rewind(h);
    // *     returns 1: true

    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer ||
            !handle || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
        return false;
    }
    this.php_js.resourceDataPointer[handle.id] = 0;
    return true;
};

