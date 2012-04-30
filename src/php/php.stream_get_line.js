php.stream_get_line = function (handle, length, ending) {
    // Read up to maxlen bytes from a stream or until the ending string is found  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/stream_get_line
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: \php.stream_get_line(handle, 2);
    // *     returns 1: '<'
    var start=0, fullline='';

    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || length !== undefined && !length) {
        return false;
    }

    start = this.php_js.resourceDataPointer[handle.id];

    if (start === undefined || !this.php_js.resourceData[handle.id][start]) {
        return false; // Resource was already closed or already reached the end of the file
    }

    // Fix: Should we also test for /\r\n?|\n/?
    fullline = this.php_js.resourceData[handle.id].slice(start, this.php_js.resourceData[handle.id].indexOf(ending, start)+1);
    if (fullline === '') {
        fullline = this.php_js.resourceData[handle.id].slice(start); // Get to rest of the file
    }

    length = (length === undefined || fullline.length < length) ? fullline.length : Math.floor(length/2) || 1; // two bytes per character (or surrogate), but ensure at least one

    this.php_js.resourceDataPointer[handle.id] += length;
    return this.php_js.resourceData[handle.id].substr(start, length-(fullline && ending && ending.length ? ending.length : 0));
};

