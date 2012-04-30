php.chop = function ( str, charlist ) {
    // !No description available for chop. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/chop
    // +   original by: Paulo Freitas
    // -    depends on: rtrim
    // *     example 1: \php.rtrim('    Kevin van Zonneveld    ');
    // *     returns 1: '    Kevin van Zonneveld'
    return this.rtrim(str, charlist);
};

