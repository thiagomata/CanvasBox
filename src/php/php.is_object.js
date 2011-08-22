php.is_object = function (mixed_var){
    // Returns true if variable is an object  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_object
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   improved by: Michael White (http://getsprink.com)
    // *     example 1: \php.is_object('23');
    // *     returns 1: false
    // *     example 2: \php.is_object({foo: 'bar'});
    // *     returns 2: true
    // *     example 3: \php.is_object(null);
    // *     returns 3: false
    if (mixed_var instanceof Array) {
        return false;
    } else {
        return (mixed_var !== null) && (typeof( mixed_var ) == 'object');
    }
};

