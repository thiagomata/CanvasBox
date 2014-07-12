php.is_resource = function (handle) {
    // Returns true if variable is a resource  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_resource
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Luis Salazar (http://www.freaky-media.com/)
    // *     example 1: \php.is_resource('a');
    // *     returns 1: false
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    return !(!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource');
};

