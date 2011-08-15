php.stream_context_get_params = function (stream_or_context) {
    // !No description available for stream_context_get_params. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/stream_context_get_params
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.var params = {notification:function (notification_code, severity, message, message_code, bytes_transferred, bytes_max) {}};
    // *     example 1: \php.var context = stream_context_create({}, params);
    // *     example 1: \php.stream_context_get_params(context);
    // *     returns 1: {notification:function (notification_code, severity, message, message_code, bytes_transferred, bytes_max) {}, options:{}}
    return stream_or_context.stream_params;
};

