php.str_split = function (string, split_length) {
    // Convert a string to an array. If split_length is specified, break the string down into chunks each split_length characters long.  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/str_split
    // +     original by: Martijn Wieringa
    // +     improved by: Brett Zamir (http://brett-zamir.me)
    // +     bugfixed by: Onno Marsman
    // +      revised by: Theriault
    // *         example 1: \php.str_split('Hello Friend', 3);
    // *         returns 1: ['Hel', 'lo ', 'Fri', 'end']
    if (string === undefined || !string.toString || split_length < 1) {
        return false;
    }
    return string.toString().match(new RegExp('.{1,' + (split_length || '1') + '}', 'g'));
};

