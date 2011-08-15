php.is_numeric = function (mixed_var) {
    // Returns true if value is a number or a numeric string  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_numeric
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: David
    // +   improved by: taith
    // +   bugfixed by: Tim de Koning
    // +   bugfixed by: WebDevHobo (http://webdevhobo.blogspot.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.is_numeric(186.31);
    // *     returns 1: true
    // *     example 2: \php.is_numeric('Kevin van Zonneveld');
    // *     returns 2: false
    // *     example 3: \php.is_numeric('+186.31e2');
    // *     returns 3: true
    // *     example 4: \php.is_numeric('');
    // *     returns 4: false
    // *     example 4: \php.is_numeric([]);
    // *     returns 4: false
    return (typeof(mixed_var) === 'number' || typeof(mixed_var) === 'string') && mixed_var !== '' && !isNaN(mixed_var);
};

