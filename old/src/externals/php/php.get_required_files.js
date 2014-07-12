php.get_required_files = function () {
    // !No description available for get_required_files. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_required_files
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: get_included_files
    // *     example 1: \php.get_required_files();
    // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']
    return this.get_included_files();
};

