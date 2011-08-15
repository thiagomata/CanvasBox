php.cosh = function (arg) {
    // Returns the hyperbolic cosine of the number, defined as (exp(number) + exp(-number))/2  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/cosh
    // +   original by: Onno Marsman
    // *     example 1: \php.cosh(-0.18127180117607017);
    // *     returns 1: 1.0164747716114113
    return (Math.exp(arg) + Math.exp(-arg))/2;
};

