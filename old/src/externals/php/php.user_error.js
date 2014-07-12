php.user_error = function (error_msg, error_type) {
    // !No description available for user_error. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/user_error
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: trigger_error
    // *     example 1: \php.user_error('Cannot divide by zero', 256);
    // *     returns 1: true
    return this.trigger_error(error_msg, error_type);
};

