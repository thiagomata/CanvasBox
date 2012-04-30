php.is_string = function (mixed_var){
    // Returns true if variable is a Unicode or binary string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_string
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.is_string('23');
    // *     returns 1: true
    // *     example 2: \php.is_string(23.5);
    // *     returns 2: false
    return (typeof( mixed_var ) == 'string');
};

