php.php_ini_scanned_files = function () {
    // Return comma-separated string of .ini files parsed from the additional ini dir  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/php_ini_scanned_files
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This comma-separated string of files contained in one directory must be manually set by the script to this.php_js.ini_scanned_files
    // *     example 1: \php.php_ini_scanned_files();
    // *     returns 1: 'myini.js,myini2.js'
    if (!this.php_js || !this.php_js.ini_scanned_files) {
        return false;
    }
    return this.php_js.ini_scanned_files;
};

