php.natsort = function (inputArr) {
    // Sort an array using natural sort  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/natsort
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: This function deviates from PHP in returning a copy of the array instead
    // %        note 1: of acting by reference and returning true; this was necessary because
    // %        note 1: IE does not allow deleting and re-adding of properties without caching
    // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 1: get the PHP behavior, but use this only if you are in an environment
    // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 1: property deletion is supported. Note that we intend to implement the PHP
    // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 1: is by reference in PHP anyways
    // -    depends on: strnatcmp
    // *     example 1: $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"};
    // *     example 1: $array1 = natsort($array1);
    // *     returns 1: {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}
    var valArr=[], keyArr=[], k, i, ret, that = this, strictForIn = false, populateArr = {};

    var bubbleSort = function (keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                ret = that.strnatcmp(inputArr[j+1], inputArr[j]);
                if (ret < 0) {
                    tempValue = inputArr[j];
                    inputArr[j] = inputArr[j+1];
                    inputArr[j+1] = tempValue;
                    tempKeyVal = keyArr[j];
                    keyArr[j] = keyArr[j+1];
                    keyArr[j+1] = tempKeyVal;
                }
            }
        }
    };

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT

    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && 
                    this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    // Get key and value arrays
    for (k in inputArr) {
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            keyArr.push(k);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    try {
        // Sort our new temporary arrays
        bubbleSort(keyArr, valArr);
    } catch (e) {
        return false;
    }

    // Repopulate the old array
    for (i = 0; i < valArr.length; i++) {
        populateArr[keyArr[i]] = valArr[i];
    }

    return strictForIn || populateArr;
};

