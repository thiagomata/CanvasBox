php.ctype_graph = function (text) {
    // Checks for any printable character(s) except space  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/ctype_graph
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: setlocale
    // *     example 1: \php.ctype_graph('!%');
    // *     returns 1: true
    if (typeof text !== 'string') {
        return false;
    }
    // BEGIN REDUNDANT
    this.setlocale('LC_ALL', 0); // ensure setup of localization variables takes place
    // END REDUNDANT
    return text.search(this.php_js.locales[this.php_js.localeCategories.LC_CTYPE].LC_CTYPE.gr) !== -1;
};

