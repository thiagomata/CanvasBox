php.error_reporting = function (level) {
    // Return the current error_reporting level, and if an argument was passed - change to the new level  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/error_reporting
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: ini_set
    // %        note 1: This will not set a global_value or access level for the ini item
    // %        note 2: If you wish the default value to be as in PHP, you must manually set it
    // %        note 3: This function depends on functions implementing error handling
    // %        note 4: See also our at() error suppressor function (@ operator in PHP) in experimental/language/
    // *     example 1: \php.error_reporting(1);
    // *     returns 1: 6135
    return this.ini_set('error_reporting', level);
};

