php.ctype_upper = function (text) {
    // Checks for uppercase character(s)  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/ctype_upper
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: \php.ctype_upper('AZ');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.up) !== -1;
};
