php.get_resource_type = function (handle) {
    // Get the resource type name for a given resource  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/get_resource_type
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.get_resource_type('a');
    // *     returns 1: false
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !== 'PHPJS_Resource') {
        return false;
    }

    return handle.get_resource_type();
};

