php.sinh = function (arg) {
    // Returns the hyperbolic sine of the number, defined as (exp(number) - exp(-number))/2  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/sinh
    // +   original by: Onno Marsman
    // *     example 1: \php.sinh(-0.9834330348825909);
    // *     returns 1: -1.1497971402636502
    return (Math.exp(arg) - Math.exp(-arg))/2;
};

