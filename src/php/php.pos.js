php.pos = function (arr) {
    // !No description available for pos. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/pos
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Uses global: php_js to store the array pointer
    // -    depends on: current
    // *     example 1: \php.transport = ['foot', 'bike', 'car', 'plane'];
    // *     example 1: \php.pos(transport);
    // *     returns 1: 'foot'
    
    return this.current(arr);
};

