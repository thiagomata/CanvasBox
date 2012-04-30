php.stream_context_set_option = function (stream_or_context, optionsOrWrapper, option, value) {
    // * Overloaded form: stream_context_set_option(resource context|resource stream, array options)  * Set an option (or several options) for a wrapper  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/stream_context_set_option
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.var opts = {http:{ method:'GET', header: 'Accept-language: en\r\nCookie: foo=bar\r\n' } };
    // *     example 1: \php.var context = stream_context_create(opts);
    // *     example 1: \php.stream_context_set_option(context, opts);
    // *     returns 1: true
    if (option) {
        if (!stream_or_context.stream_options[optionsOrWrapper]) { // Don't overwrite all?
            stream_or_context.stream_options[optionsOrWrapper] = {};
        }
        stream_or_context.stream_options[optionsOrWrapper][option] = value;
    }
    else {
        stream_or_context.stream_options = optionsOrWrapper;
    }
    return true;
};

