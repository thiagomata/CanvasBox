php.usleep = function (microseconds) {
    // Delay for a given number of micro seconds  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/usleep
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: For study purposes. Current implementation could lock up the user's browser.
    // %        note 1: Consider using setTimeout() instead.
    // %        note 2: Note that this function's argument, contrary to the PHP name, does not
    // %        note 2: start being significant until 1,000 microseconds (1 millisecond)
    // *     example 1: \php.usleep(2000000); // delays for 2 seconds
    // *     returns 1: true
    var start = new Date().getTime();
    while (new Date() < (start + microseconds/1000)) {}
    return true;
};

