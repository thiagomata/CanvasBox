php.str_getcsv = function ( input, delimiter, enclosure, escape ) {
    // Parse a CSV string into an array  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/str_getcsv
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.str_getcsv('"abc", "def", "ghi"');
    // *     returns 1: ['abc', 'def', 'ghi']
    var output = [];
    var backwards = function (str) { // We need to go backwards to simulate negative look-behind (don't split on 
                                                              //an escaped enclosure even if followed by the delimiter and another enclosure mark)
        return str.split('').reverse().join('');
    };
    var pq = function (str) { // preg_quote()
        return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
    };

    delimiter = delimiter || ',';
    enclosure = enclosure || '"';
    escape = escape || '\\';

    input = input.replace(new RegExp('^\\s*'+pq(enclosure)), '').replace(new RegExp(pq(enclosure)+'\\s*$'), '');

    // PHP behavior may differ by including whitespace even outside of the enclosure
    input = backwards(input).split(new RegExp(pq(enclosure)+'\\s*'+pq(delimiter)+'\\s*'+pq(enclosure)+'(?!'+pq(escape)+')', 'g')).reverse();

    for (var i = 0; i < input.length; i++) {
        output.push(backwards(input[i]).replace(new RegExp(pq(escape)+pq(enclosure), 'g'), enclosure));
    }

    return output;
};

