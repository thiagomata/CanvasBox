php.get_included_files = function () {
    // Returns an array with the file names that were included (includes require and once varieties)  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_included_files
    // +   original by: Michael White (http://getsprink.com)
    // %        note 1: Uses global: php_js to keep track of included files
    // *     example 1: \php.get_included_files();
    // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']
    var cur_file = {};
    cur_file[this.window.location.href] = 1;
    if (!this.php_js) {
        this.php_js = {};
    }
    if (!this.php_js.includes) {
        this.php_js.includes = cur_file;
    }

    var includes = [];
    var i = 0;
    for (var key in this.php_js.includes){
        includes[i] = key;
        i++;
    }

    return includes;
};

