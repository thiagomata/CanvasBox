php.error_get_last = function () {
    // !No description available for error_get_last. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/error_get_last
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.error_get_last();
    // *     returns 1: null
    // *     example 2: \php.error_get_last();
    // *     returns 2: {type: 256, message: 'My user error', file: 'C:\WWW\index.php', line: 2}

    return this.php_js && this.php_js.last_error ? this.php_js.last_error : null; // Only set if error triggered within at() or trigger_error()
};

