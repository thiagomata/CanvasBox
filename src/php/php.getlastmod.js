php.getlastmod = function () {
    // Get time of last page modification  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/getlastmod
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Will not work on browsers which don't support document.lastModified
    // *     example 1: \php.getlastmod();
    // *     returns 1: 1237610043
    return new Date(this.window.document.lastModified).getTime()/1000;
};

