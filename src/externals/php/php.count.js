php.count = function (mixed_var, mode) {
    // Count the number of elements in a variable (usually an array)  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/count
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Waldo Malqui Silva
    // +      bugfixed by: Soren Hansen
    // +      input by: merabi
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: \php.count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
    var key, cnt = 0;

    if (mixed_var === null){
        return 0;
    } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object){
        return 1;
    }

    if (mode === 'COUNT_RECURSIVE') {
        mode = 1;
    }
    if (mode != 1) {
        mode = 0;
    }

    for (key in mixed_var){
        if (mixed_var.hasOwnProperty(key)) {
            cnt++;
            if ( mode==1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object) ){
                cnt += this.count(mixed_var[key], 1);
            }
        }
    }

    return cnt;
};

