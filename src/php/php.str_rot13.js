php.str_rot13 = function (str) {
    // Perform the rot13 transform on a string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/str_rot13
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // *     example 1: \php.str_rot13('Kevin van Zonneveld');
    // *     returns 1: 'Xriva ina Mbaariryq'
    // *     example 2: \php.str_rot13('Xriva ina Mbaariryq');
    // *     returns 2: 'Kevin van Zonneveld'
    // *     example 3: \php.str_rot13(33);
    // *     returns 3: '33'
    
    return (str+'').replace(/[a-z]/gi, function(s){
        return String.fromCharCode(s.charCodeAt(0)+(s.toLowerCase()<'n'?13:-13));
    });
};

