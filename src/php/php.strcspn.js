php.strcspn = function (str, mask, start, length) {
    // Finds length of initial segment consisting entirely of characters not found in mask. If start or/and length is provide works like strcspn(substr($s,$start,$len),$bad_chars)  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/strcspn
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.strcspn('abcdefg123', '1234567890');
    // *     returns 1: 7
    // *     example 2: \php.strcspn('123abc', '1234567890');
    // *     returns 2: 3
    start = start ? start : 0;
    var count = (length && ((start + length) < str.length)) ? start + length : str.length;
    strct:
    for (var i=start, lgth=0; i < count; i++) {
        for (var j=0; j < mask.length; j++) {
            if (str.charAt(i).indexOf(mask[j]) !== -1) {
                continue strct;
            }
        }
        ++lgth;
    }
    
    return lgth;
};

