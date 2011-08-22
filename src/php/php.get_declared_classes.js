php.get_declared_classes = function () {
    // !No description available for get_declared_classes. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_declared_classes
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +    depends on: class_exists
    // *     example 1: \php.function A (z) {this.z=z} // Assign 'this' in constructor, making it class-like
    // *     example 1: \php.function B () {}
    // *     example 1: B.c = function () {}; // Add a static method, making it class-like
    // *     example 1: \php.function C () {}
    // *     example 1: C.prototype.z = function () {}; // Add to prototype, making it behave as a "class"
    // *     example 1: \php.get_declared_classes()
    // *     returns 1: [C, B, A]

    var i = '', j = '', arr = [], already = {};

    for (i in this.window) {
        try {
            if (typeof this.window[i] === 'function') {
                if (!already[i] && this.class_exists(i)) {
                    already[i] = 1;
                    arr.push(i);
                }
            } else if (typeof this.window[i] === 'object') {
                for (j in this.window[i]) {
                    if (typeof this.window[j] === 'function' && this.window[j] && !already[j] && this.class_exists(j)) {
                        already[j] = 1;
                        arr.push(j);
                    }
                }
            }
        } catch (e) {

        }
    }

    return arr;
};

