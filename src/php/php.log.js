php.log = function (arg, base) {
    // Returns the natural logarithm of the number, or the base log if base is specified  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/log
    // +   original by: Onno Marsman
    // *     example 1: \php.log(8723321.4, 7);
    // *     returns 1: 8.212871815082147
    if (base === undefined) {
        return Math.log(arg);
    } else {
        return Math.log(arg)/Math.log(base);
    }
};

