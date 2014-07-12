php.decbin = function (number) {
    // Returns a string containing a binary representation of the number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/decbin
    // +   original by: Enrique Gonzalez
    // +   bugfixed by: Onno Marsman
    // +   improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    // +   input by: pilus
    // +   input by: nord_ua
    // *     example 1: \php.decbin(12);
    // *     returns 1: '1100'
    // *     example 2: \php.decbin(26);
    // *     returns 2: '11010'
    // *     example 3: \php.decbin('26');
    // *     returns 3: '11010'
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10).toString(2);
};

