php.dechex = function (number) {
    // Returns a string containing a hexadecimal representation of the given number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/dechex
    // +   original by: Philippe Baumann
    // +   bugfixed by: Onno Marsman
    // +   improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    // +   input by: pilus
    // *     example 1: \php.dechex(10);
    // *     returns 1: 'a'
    // *     example 2: \php.dechex(47);
    // *     returns 2: '2f'
    // *     example 3: \php.dechex(-1415723993);
    // *     returns 3: 'ab9dc427'
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10).toString(16);
};

