php.function_exists = function (function_name) {
    // Checks if the function exists  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/function_exists
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Steve Clay
    // +   improved by: Legaev Andrey
    // *     example 1: \php.function_exists('isFinite');
    // *     returns 1: true
    if (typeof function_name == 'string'){
        return (typeof this.window[function_name] == 'function');
    } else{
        return (function_name instanceof Function);
    }
};

