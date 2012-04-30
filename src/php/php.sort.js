php.sort = function (inputArr, sort_flags) {
    // Sort an array  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/sort
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
    // %        note 1: integrated into all of these functions by adapting the code at
    // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
    // %        note 2: This function deviates from PHP in returning a copy of the array instead
    // %        note 2: of acting by reference and returning true; this was necessary because
    // %        note 2: IE does not allow deleting and re-adding of properties without caching
    // %        note 2: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 2: get the PHP behavior, but use this only if you are in an environment
    // %        note 2: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 2: property deletion is supported. Note that we intend to implement the PHP
    // %        note 2: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 2: is by reference in PHP anyways
    // -    depends on: i18n_loc_get_default
    // *     example 1: \php.sort(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: ['Kevin', 'Zonneveld', 'van']
    // *     example 2: \php.ini_set('phpjs.strictForIn', true);
    // *     example 2: \php.fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 2: \php.sort(fruits);
    // *     results 2: fruits == {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
    // *     returns 2: true
    var valArr = [], keyArr=[], k = '', i = 0, sorter = false, that = this, strictForIn = false, populateArr = [];

    switch (sort_flags) {
        case 'SORT_STRING': // compare items as strings
            sorter = function (a, b) {
                return that.strnatcmp(a, b);
            };
            break;
        case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with  i18n_loc_set_default() as of PHP6)
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

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT

    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && 
                    this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;

    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push(inputArr[k]);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }

    valArr.sort(sorter);

    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        populateArr[i] = valArr[i];
    }
    return strictForIn || populateArr;
};

