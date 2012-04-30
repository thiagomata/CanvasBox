php.pclose = function (handle) {
    // Close a file pointer opened by popen()  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/pclose
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.var handle = popen('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'r');
    // *     example 1: \php.pclose(handle);
    // *     returns 1: true
    if (!handle || handle.opener !== 'popen') {
        return false;
    }

    try {
        delete this.php_js.resourceDataPointer[handle.id];
        delete this.php_js.resourceData[handle.id]; // Free up memory
    }
    catch (e) {
        return false;
    }
    return true;
};

