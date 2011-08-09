php.abs = function (mixed_number)  {
    // Return the absolute value of the number  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/abs
    // +   original by: Waldo Malqui Silva
    // +   improved by: Karol Kowalski
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: \php.abs(4.2);
    // *     returns 1: 4.2
    // *     example 2: \php.abs(-4.2);
    // *     returns 2: 4.2
    // *     example 3: \php.abs(-5);
    // *     returns 3: 5
    // *     example 4: \php.abs('_argos');
    // *     returns 4: 0
    return Math.abs(mixed_number) || 0;
};
