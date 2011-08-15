php.asinh = function (arg) {
    // Returns the inverse hyperbolic sine of the number, i.e. the value whose hyperbolic sine is number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/asinh
    // +   original by: Onno Marsman
    // *     example 1: \php.asinh(8723321.4);
    // *     returns 1: 16.67465779841863
    return Math.log(arg + Math.sqrt(arg*arg+1));
};

