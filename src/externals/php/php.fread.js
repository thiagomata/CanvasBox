php.fread = function (handle, length) {
    // Binary-safe file read  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fread
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: \php.fread(handle, 10);
    // *     returns 1: '123'

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer) {
        return false;
    }

    length = length < 8192 ? (Math.floor(length/2) || 1) : 4096; // 2 bytes per character (or surrogate) means limit of 8192 bytes = 4096 characters; ensure at least one

    var start = this.php_js.resourceDataPointer[handle.id];

    if (start === undefined) {
        return false; // Resource was already closed
    }

    if (!this.php_js.resourceData[handle.id][start]) {
        return ''; // already reached the end of the file (but pointer not closed)
    }

    this.php_js.resourceDataPointer[handle.id] += length;

    return this.php_js.resourceData[handle.id].substr(start, length); // Extra length won't be a problem here
};

