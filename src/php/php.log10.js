php.log10 = function (arg) {
    // Returns the base-10 logarithm of the number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/log10
    // +   original by: Philip Peterson
    // +   improved by: Onno Marsman
    // +   improved by: Tod Gentille
    // *     example 1: \php.log10(10);
    // *     returns 1: 1
    // *     example 2: \php.log10(1);
    // *     returns 2: 0
    return Math.log(arg)/Math.LN10;
};

