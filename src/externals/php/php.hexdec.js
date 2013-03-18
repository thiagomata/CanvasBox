php.hexdec = function (hex_string) {
    // Returns the decimal equivalent of the hexadecimal number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/hexdec
    // +   original by: Philippe Baumann
    // *     example 1: \php.hexdec('that');
    // *     returns 1: 10
    // *     example 2: \php.hexdec('a0');
    // *     returns 2: 160
    
    hex_string = (hex_string+'').replace(/[^a-f0-9]/gi, '');
    return parseInt(hex_string, 16);
};

