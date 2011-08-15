php.asort = function (inputArr, sort_flags) {
    // Sort an array and maintain index association  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/asort
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   input by: paulo kuong
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Adam Wallner (http://web2.bitbaro.hu/)
    // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    // %        note 1: integrated into all of these functions by adapting the code at
    // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
    // %        note 2: The examples are correct, this is a new way
    // %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
    // %        note 3: This function deviates from PHP in returning a copy of the array instead
    // %        note 3: of acting by reference and returning true; this was necessary because
    // %        note 3: IE does not allow deleting and re-adding of properties without caching
    // %        note 3: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 3: get the PHP behavior, but use this only if you are in an environment
    // %        note 3: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 3: property deletion is supported. Note that we intend to implement the PHP
    // %        note 3: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 3: is by reference in PHP anyways
    // -    depends on: strnatcmp
    // -    depends on: i18n_loc_get_default
    // *     example 1: \php.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: \php.data = asort(data);
    // *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    // *     returns 1: true
    // *     example 2: \php.ini_set('phpjs.strictForIn', true);
    // *     example 2: \php.data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 2: \php.asort(data);
    // *     results 2: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    // *     returns 2: true
    var valArr=[], keyArr=[], k, i, ret, sorter, that = this, strictForIn = false, populateArr = {};

    switch (sort_flags) {
        case 'SORT_STRING': // compare items as strings
            sorter = function (a, b) {
                return that.strnatcmp(a, b);
            };
            break;
        case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
            var loc = this.i18n_loc_get_default();
            sorter = this.php_js.i18nLocales[loc].sorting;
            break;
        case 'SORT_NUMERIC': // compare items numerically
            sorter = function (a, b) {
                return (a - b);
            };
            break;
        case 'SORT_REGULAR': // compare items normally (don't change types)
        default:
            sorter = function (a, b) {
                if (a > b) {
                    return 1;
                }
                if (a < b) {
                    return -1;
                }
                return 0;
            };
            break;
    }

    var bubbleSort = function (keyArr, inputArr) {
        var i, j, tempValue, tempKeyVal;
        for (i = inputArr.length-2; i >= 0; i--) {
            for (j = 0; j <= i; j++) {
                ret = sorter(inputArr[j+1], inputArr[j]);
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

