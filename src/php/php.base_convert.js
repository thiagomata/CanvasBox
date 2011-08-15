php.base_convert = function (number, frombase, tobase) {
    // Converts a number in a string from any base <= 36 to any base <= 36  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/base_convert
    // +   original by: Philippe Baumann
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // *     example 1: \php.base_convert('A37334', 16, 2);
    // *     returns 1: '101000110111001100110100'
    return parseInt(number + '', frombase | 0).toString(tobase | 0);
};

