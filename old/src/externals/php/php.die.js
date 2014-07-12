php.die = function (status) {
    // !No description available for die. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/die
    // +   original by: Brett Zamir (http://brett-zamir.me)
    //  -   depends on: exit
    // %        note 1: Should be considered expirimental. Please comment on this function.
    // *     example 1: \php.die();
    // *     returns 1: null
    return this.exit(status);
};

