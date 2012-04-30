php.key = function (arr) {
    // Return the key of the element currently pointed to by the internal array pointer  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/key
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Riddler (http://www.frontierwebdev.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Uses global: php_js to store the array pointer
    // *     example 1: \php.array = {fruit1: 'apple', 'fruit2': 'orange'}
    // *     example 1: \php.key(array);
    // *     returns 1: 'fruit1'
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

    if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
    }
    var cursor = pointers[pointers.indexOf(arr)+1];
    if (!(arr instanceof Array)) {
        var ct = 0;
        for (var k in arr) {
            if (ct === cursor) {
                return k;
            }
            ct++;
        }
        return false; // Empty
    }
    if (arr.length === 0) {
        return false;
    }
    return cursor;
};

