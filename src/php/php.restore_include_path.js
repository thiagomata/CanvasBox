php.restore_include_path = function () {
    // !No description available for restore_include_path. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/restore_include_path
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.restore_include_path();
    // *     returns 1: undefined

    if (this.php_js && this.php_js.ini && this.php_js.ini.include_path) {
        this.php_js.ini.include_path.local_value = this.php_js.ini.include_path.global_value;
    }
};

