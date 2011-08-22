php.stream_get_contents = function (handle, maxLength, offset) {
    // Reads all remaining bytes (or up to maxlen bytes) from a stream and returns them as a string.  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/stream_get_contents
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.var stream = fopen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: \php.stream_get_contents(stream, 7, 2);
    // *     returns 1: 'DOCTYPE'
    if (!this.php_js || !this.php_js.resourceData || !this.php_js.resourceDataPointer || !handle || !handle.id) {
        return false;
    }
    offset = offset || 0;
    this.php_js.resourceDataPointer[handle.id] += offset;
    
    var chrs = this.php_js.resourceData[handle.id].slice(this.php_js.resourceDataPointer[handle.id]);
    chrs = maxLength >= 0 ? chrs.substr(0, maxLength) : chrs;

    this.echo(chrs);
    this.php_js.resourceDataPointer[handle.id] += chrs.length;
    
    return chrs;
};

