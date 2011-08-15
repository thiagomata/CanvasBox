php.strcmp = function ( str1, str2 ) {
    // Binary safe string comparison  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/strcmp
    // +   original by: Waldo Malqui Silva
    // +      input by: Steve Hilder
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: gorthaur
    // *     example 1: \php.strcmp( 'waldo', 'owald' );
    // *     returns 1: 1
    // *     example 2: \php.strcmp( 'owald', 'waldo' );
    // *     returns 2: -1
    return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
};

