php.fgets = function (handle, length) {
    // Get a line from file pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/fgets
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: \php.fgets(handle, 1);
    // *     returns 1: '<'

    var start=0, fullline='', endlinePos = -1, content = '';

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
        return false;
    }

    start = this.php_js.resourceDataPointer[handle.id];

    if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
        return false; // Resource was already closed or already reached the end of the file
    }

    content = this.php_js.resourceData[handle.id].slice(start);

    endlinePos = content.search(/\r\n?|\n/)+start+1;
    fullline = this.php_js.resourceData[handle.id].slice(start, endlinePos+1);
    if (fullline === '') {
        fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
    }

    length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length/2) || 1; // two bytes per character (or surrogate), but ensure at least one

    this.php_js.resourceDataPointer[handle.id] += length;
    return this.php_js.resourceData[handle.id].substr(start, length);
};

