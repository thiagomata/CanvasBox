php.acosh = function (arg) {
    // Returns the inverse hyperbolic cosine of the number, i.e. the value whose hyperbolic cosine is number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/acosh
    // +   original by: Onno Marsman
    // *     example 1: \php.acosh(8723321.4);
    // *     returns 1: 16.674657798418625
    return Math.log(arg + Math.sqrt(arg*arg-1));
};
