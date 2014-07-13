php.ini_restore = function (varname) {
    // Restore the value of a configuration option specified by varname  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/ini_restore
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.ini_restore('date.timezone');
    // *     returns 1: 'America/Chicago'
    if (this.php_js && this.php_js.ini && this.php_js.ini[varname]) {
        this.php_js.ini[varname].local_value = this.php_js.ini[varname].global_value;
    }
};

