php.quotemeta = function (str) {
    // Quotes meta characters  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/quotemeta
    // +   original by: Paulo Freitas
    // *     example 1: \php.quotemeta(". + * ? ^ ( $ )");
    // *     returns 1: '\. \+ \* \? \^ \( \$ \)'
    return (str+'').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
};

