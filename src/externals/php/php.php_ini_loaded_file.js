php.php_ini_loaded_file = function () {
    // Return the actual loaded ini filename  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/php_ini_loaded_file
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This string representing the path of the main ini file must be manually set by the script to this.php_js.ini_loaded_file
    // *     example 1: \php.php_ini_loaded_file();
    // *     returns 1: 'myini.js'
    if (!this.php_js || !this.php_js.ini_loaded_file) {
        return false;
    }
    return this.php_js.ini_loaded_file;
};

