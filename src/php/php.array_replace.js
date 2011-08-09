php.array_replace = function (arr) {
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.array_replace(["orange", "banana", "apple", "raspberry"], {0 : "pineapple", 4 : "cherry"}, {0:"grape"});
    // *     returns 1: {0: 'grape', 1: 'banana', 2: 'apple', 3: 'raspberry', 4: 'cherry'}

    if (arguments.length < 2) {
        throw new Error('There should be at least 2 arguments passed to array_replace()');
    }

    // Although docs state that the arguments are passed in by reference, it seems they are not altered, but rather the copy that is returned (just guessing), so we make a copy here, instead of acting on arr itself
    var retObj = {};
    for (var prop in arr) {
        retObj[prop] = arr[prop];
    }

    for (var i = 1; i < arguments.length; i++) {
        for (var p in arguments[i]) {
            retObj[p] = arguments[i][p];
        }
    }
    return retObj;
};
