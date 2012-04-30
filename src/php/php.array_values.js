php.array_values = function (input) {
    // Return just the values from the input array  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_values
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}
    var tmp_arr = [], cnt = 0;
    var key = '';

    for ( key in input ){
        tmp_arr[cnt] = input[key];
        cnt++;
    }

    return tmp_arr;
};

