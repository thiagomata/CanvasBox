php.set_time_limit = function (seconds) {
    // Sets the maximum time a script can run  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/set_time_limit
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.set_time_limit(4);
    // *     returns 1: undefined

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT

    this.window.setTimeout(function () {
        if (!this.php_js.timeoutStatus) {
            this.php_js.timeoutStatus = true;
        }
        throw 'Maximum execution time exceeded';
    }, seconds*1000);
};

