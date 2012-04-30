php.get_include_path = function () {
    // !No description available for get_include_path. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_include_path
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.get_include_path();
    // *     returns 1: '/phpjs'

    if (this.php_js && this.php_js.ini && this.php_js.ini.include_path && this.php_js.ini.include_path.local_value) {
        return this.php_js.ini.include_path.local_value;
    }
    return '';
};

