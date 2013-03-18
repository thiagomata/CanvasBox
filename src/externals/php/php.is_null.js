php.is_null = function (mixed_var) {
    // Returns true if variable is null  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_null
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: \php.is_null('23');
    // *     returns 1: false
    // *     example 2: \php.is_null(null);
    // *     returns 2: true
    return ( mixed_var === null );
};

