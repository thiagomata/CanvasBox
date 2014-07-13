php.get_cfg_var = function (varname) {
    // Get the value of a PHP configuration option  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_cfg_var
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: The ini values must be set within an ini file
    // *     example 1: \php.get_cfg_var('date.timezone');
    // *     returns 1: 'Asia/Hong_Kong'
    if (this.php_js && this.php_js.ini && this.php_js.ini[varname].global_value !== undefined) {
        if (this.php_js.ini[varname].global_value === null) {
            return '';
        }
        return this.php_js.ini[varname].global_value;
    }
    return '';
};

