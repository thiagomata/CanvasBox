php.readfile = function (filename, use_include_path, context) {
    // Output a file or a URL  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/readfile
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: echo
    // *     example 1: \php.readfile('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    var read_data = this.file_get_contents(filename, use_include_path, context); // bitwise-or use_include_path?
    this.echo(read_data);
    return read_data;
};

