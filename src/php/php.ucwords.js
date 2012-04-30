php.ucwords = function(str) {
    // Uppercase the first character of every word in a string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/ucwords
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Waldo Malqui Silva
    // +   bugfixed by: Onno Marsman
    // +   improved by: Robin
    // *     example 1: \php.ucwords('kevin van zonneveld');
    // *     returns 1: 'Kevin Van Zonneveld'
    // *     example 2: \php.ucwords('HELLO WORLD');
    // *     returns 2: 'HELLO WORLD'
    return (str + '').replace(/^(.)|\s(.)/g, function ($1) {
        return $1.toUpperCase();
    });
};

