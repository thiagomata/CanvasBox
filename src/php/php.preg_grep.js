php.preg_grep = function (pattern, input, flags) {
    // Searches array and returns entries which match regex  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/preg_grep
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: If pass pattern as string, must escape backslashes, even for single quotes
    // %          note 2: The regular expression itself must be expressed JavaScript style
    // %          note 3: It is not recommended to submit the pattern as a string, as we may implement
    // %          note 3:   parsing of PHP-style expressions (flags, etc.) in the future
    // *     example 1: \php.var arr = [1, 4, 4.5, 3, 'a', 4.4];
    // *     example 1: \php.preg_grep("/^(\\d+)?\\.\\d+$/", arr);
    // *     returns 1: {2: 4.5, 5: 4.4}

    var p='', retObj = {};
    var invert = (flags === 1 || flags === 'PREG_GREP_INVERT'); // Todo: put flags as number and do bitwise checks (at least if other flags allowable); see pathinfo()

    if (typeof pattern === 'string') {
        pattern = eval(pattern);
    }

    if (invert) {
        for (p in input) {
            if (input[p].search(pattern) === -1) {
                retObj[p] = input[p];
            }
        }
    } else {
        for (p in input) {
            if (input[p].search(pattern) !== -1) {
                retObj[p] = input[p];
            }
        }
    }

    return retObj;
};

