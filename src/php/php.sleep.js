php.sleep = function (seconds) {
    // Delay for a given number of seconds  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/sleep
    // +   original by: Christian Doebler
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %          note: For study purposes. Current implementation could lock up the user's browser. 
    // %          note: Consider using setTimeout() instead.
    // *     example 1: \php.sleep(1);
    // *     returns 1: 0
    
    var start = new Date().getTime();
    while (new Date() < start + seconds*1000) {}
    return 0;
};

