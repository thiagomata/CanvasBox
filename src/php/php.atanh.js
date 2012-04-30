php.atanh = function (arg) {
    // Returns the inverse hyperbolic tangent of the number, i.e. the value whose hyperbolic tangent is number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/atanh
    // +   original by: Onno Marsman
    // *     example 1: \php.atanh(0.3);
    // *     returns 1: 0.3095196042031118
    return 0.5 * Math.log((1+arg)/(1-arg));
};

