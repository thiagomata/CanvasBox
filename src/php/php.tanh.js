php.tanh = function (arg) {
    // Returns the hyperbolic tangent of the number, defined as sinh(number)/cosh(number)  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/tanh
    // +   original by: Onno Marsman
    // *     example 1: \php.tanh(5.4251848798444815);
    // *     returns 1: 0.9999612058841574
    return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
};

