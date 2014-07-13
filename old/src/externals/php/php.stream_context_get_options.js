php.stream_context_get_options = function (stream_or_context) {
    // Retrieve options for a stream/wrapper/context  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/stream_context_get_options
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.var opts = {http:{method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n'}};
    // *     example 1: \php.var context = stream_context_create(opts);
    // *     example 1: \php.stream_context_get_options(context);
    // *     returns 1: {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' }}
    return stream_or_context.stream_options;
};

