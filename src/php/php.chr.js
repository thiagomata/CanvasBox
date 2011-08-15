php.chr = function (codePt) {
    // Converts a codepoint number to a character  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/chr
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.chr(75);
    // *     returns 1: 'K'
    // *     example 1: \php.chr(65536) === '\uD800\uDC00';
    // *     returns 1: true
    
    if (codePt > 0xFFFF) { // Create a four-byte string (length 2) since this code point is high
                                             //   enough for the UTF-16 encoding (JavaScript internal use), to
                                             //   require representation with two surrogates (reserved non-characters
                                             //   used for building other characters; the first is "high" and the next "low")
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    }
    else {
        return String.fromCharCode(codePt);
    }
};

