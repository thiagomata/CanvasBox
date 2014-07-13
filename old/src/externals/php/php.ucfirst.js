php.ucfirst = function (str) {
    // Makes a string's first character uppercase  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/ucfirst
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.ucfirst('kevin van zonneveld');
    // *     returns 1: 'Kevin van zonneveld'
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
};

