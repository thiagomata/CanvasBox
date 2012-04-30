php.getenv = function (varname) {
    // Get the value of an environment variable  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/getenv
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: We are not using $_ENV as in PHP, you could define
    // %        note 1: "$_ENV = this.php_js.ENV;" and get/set accordingly
    // %        note 2: Returns e.g. 'en-US' when set global this.php_js.ENV is set
    // %        note 3: Uses global: php_js to store environment info
    // *     example 1: \php.getenv('LC_ALL');
    // *     returns 1: false
    
    if (!this.php_js || !this.php_js.ENV || !this.php_js.ENV[varname]) {
        return false;
    }

    return this.php_js.ENV[varname];
};

