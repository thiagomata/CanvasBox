php.ctype_xdigit = function (text) {
    // Checks for character(s) representing a hexadecimal digit  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/ctype_xdigit
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: \php.ctype_xdigit('01dF');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.xd) !== -1;
};

