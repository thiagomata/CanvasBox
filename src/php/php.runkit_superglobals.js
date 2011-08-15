php.runkit_superglobals = function () {
    // !No description available for runkit_superglobals. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/runkit_superglobals
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: You must manually define the superglobals to be able to use them.
    // %          note 2: Another alternative (though you can't reflect on them with this function) is to use import_request_variables()
    // *     example 1: \php.runkit_superglobals();
    // *     returns 1: []
    var superglobal = {}, p='', arr=[];
    var superglobals = ['$_GET', '$_POST', '$_REQUEST', '$_COOKIE', '$_SESSION', '$_SERVER', '$_ENV', '$_FILES'];
    for (var i=0; i < superglobals.length; i++) {
        superglobal = this.window[superglobals[i]];
        for (p in superglobal) {
            arr.push(superglobal[p]);
        }
    }
    return arr;
};

