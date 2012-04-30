php.lcfirst = function (str) {
    // !No description available for lcfirst. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/lcfirst
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.lcfirst('Kevin Van Zonneveld');
    // *     returns 1: 'kevin Van Zonneveld'
    str += '';
    var f = str.charAt(0).toLowerCase();
    return f + str.substr(1);
};

