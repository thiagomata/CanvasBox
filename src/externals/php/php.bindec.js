php.bindec = function (binary_string) {
    // Returns the decimal equivalent of the binary number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/bindec
    // +   original by: Philippe Baumann
    // *     example 1: \php.bindec('110011');
    // *     returns 1: 51
    // *     example 2: \php.bindec('000110011');
    // *     returns 2: 51
    // *     example 3: \php.bindec('111');
    // *     returns 3: 7
    binary_string = (binary_string+'').replace(/[^01]/gi, '');
    return parseInt(binary_string, 2);
};

