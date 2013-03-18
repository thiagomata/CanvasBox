php.hypot = function (x, y) {
    // Returns sqrt(num1*num1 + num2*num2)  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/hypot
    // +   original by: Onno Marsman
    // *     example 1: \php.hypot(3, 4);
    // *     returns 1: 5
    // *     example 2: \php.hypot([], 'a');
    // *     returns 2: 0
    return Math.sqrt(x*x + y*y) || 0;
};

