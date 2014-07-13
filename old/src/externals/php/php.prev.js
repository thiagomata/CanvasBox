php.prev = function (arr) {
    // Move array argument's internal pointer to the previous element and return it  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/prev
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Uses global: php_js to store the array pointer
    // *     example 1: \php.transport = ['foot', 'bike', 'car', 'plane'];
    // *     example 1: \php.prev(transport);
    // *     returns 1: false
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.pointers = this.php_js.pointers || [];
    var indexOf = function (value) {
        for (var i = 0, length=this.length; i < length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    };
    // END REDUNDANT
    var pointers = this.php_js.pointers;
    if (!pointers.indexOf) {
        pointers.indexOf = indexOf;
    }
    var arrpos = pointers.indexOf(arr);
    var cursor = pointers[arrpos+1];
    if (pointers.indexOf(arr) === -1 || cursor === 0) {
        return false;
    }
    if (!(arr instanceof Array)) {
        var ct = 0;
        for (var k in arr) {
            if (ct === cursor-1) {
                pointers[arrpos+1] -= 1;
                return arr[k];
            }
            ct++;
        }
    // Shouldn't reach here
    }
    if (arr.length === 0) {
        return false;
    }
    pointers[arrpos+1] -= 1;
    return arr[pointers[arrpos+1]];
};

