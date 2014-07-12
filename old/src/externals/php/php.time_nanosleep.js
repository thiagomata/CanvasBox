php.time_nanosleep = function (seconds, nanosecs) {
    // Delay for a number of seconds and nano seconds  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/time_nanosleep
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: For study purposes. Current implementation could lock up the user's browser.
    // %        note 1: Consider using setTimeout() instead.
    // %        note 2: Note that the following function's argument, contrary to the reference to
    // %        note 2: nanoseconds, does not start being significant until 1,000,000 nanoseconds (milliseconds),
    // %        note 2: since that is the smallest unit handled by JavaScript's Date function.
    // *     example 1: \php.time_nanosleep(1, 2000000000); // delays for 3 seconds
    // *     returns 1: true
    var start = new Date().getTime();
    while (new Date() < (start + seconds*1000+nanosecs/1000000)) {}
    return true;
};

