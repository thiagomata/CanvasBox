php.ftell = function (handle) {
    // Get file pointer's read/write position  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/ftell
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.var h = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: \php.fread(h, 100);
    // *     example 1: \php.ftell(h);
    // *     returns 1: 99

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
    return this.php_js.resourceDataPointer[handle.id]*2-1; // We're currently storing by character, so need to multiply by two; subtract one to appear like array pointer
};

