php.md5_file = function ( str_filename ) {
    // Calculate the md5 hash of given filename  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/md5_file
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: file_get_contents
    // -    depends on: md5
    // *     example 1: \php.md5_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '202cb962ac59075b964b07152d234b70'
    var buf = '';

    buf = this.file_get_contents(str_filename);
    
    if (!buf) {
        return false;
    }
    
    return this.md5(buf);
};

