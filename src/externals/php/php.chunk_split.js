php.chunk_split = function (body, chunklen, end) {
    // Returns split line  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/chunk_split
    // +   original by: Paulo Freitas
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Theriault
    // *     example 1: \php.chunk_split('Hello world!', 1, '*');
    // *     returns 1: 'H*e*l*l*o* *w*o*r*l*d*!*'
    // *     example 2: \php.chunk_split('Hello world!', 10, '*');
    // *     returns 2: 'Hello worl*d!*'
    
    chunklen = parseInt(chunklen, 10) || 76;
    end = end || '\r\n';

    if (chunklen < 1) {
        return false;
    }

    return body.match(new RegExp(".{0," + chunklen + "}", "g")).join(end);
};

