php.join = function (glue, pieces) {
    // An alias for implode  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/join
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: implode
    // *     example 1: \php.join(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'
    return this.implode( glue, pieces );
};

