php.octdec = function (oct_string) {
    // Returns the decimal equivalent of an octal string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/octdec
    // +   original by: Philippe Baumann
    // *     example 1: \php.octdec('77');
    // *     returns 1: 63
    oct_string = (oct_string+'').replace(/[^0-7]/gi, '');
    return parseInt(oct_string, 8);
};

