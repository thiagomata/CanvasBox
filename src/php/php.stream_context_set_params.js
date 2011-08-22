php.stream_context_set_params = function (stream_or_context, params) {
    // Set parameters for a file context  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/stream_context_set_params
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.var context = stream_context_create();
    // *     example 1: \php.stream_context_set_params({notification:function (notification_code, severity, message, message_code, bytes_transferred, bytes_max) {}});
    // *     returns 1: true
    var param = '';

    // Docs also allow for "options" as a parameter here (i.e., setting options instead of parameters) and source seems to allow encoding, input_encoding, output_encoding, and default_mode
    for (param in params) { // Overwrites all, or just supplied? Seems like just supplied
        if (param === 'options') {
            stream_or_context.stream_options = params[param]; // Overwrite all?
        }
        else {
            stream_or_context.stream_params[param] = params[param];
        }
    }
    return true;    
};

