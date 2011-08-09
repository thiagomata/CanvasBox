php.array_walk = function (array, funcname, userdata) {
    // Apply a user function to every member of an array  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_walk
    // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
    // *     example 1: \php.array_walk ({'a':'b'}, 'void', 'userdata');
    // *     returns 1: true
    // *     example 2: \php.array_walk ('a', 'void', 'userdata');
    // *     returns 2: false
    
    var key; 
    
    if (typeof array !== 'object' || array === null) {
        return false;
    }
    
    for (key in array) {
        if (typeof(userdata) !== 'undefined') {
            eval(funcname + '( array [key] , key , userdata  )' );
        } else {
            eval(funcname + '(  userdata ) ');
        }
    }
    
    return true;
};
