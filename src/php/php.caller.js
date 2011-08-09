php._phpjs_shared_bc = function () {
    php.require_once( php.path + 'php._phpjs_shared_bc.js' );
    return php.call_user_func_array( php._phpjs_shared_bc , arguments );
}

php.abs = function()  {
    php.require_once( php.path + 'php.abs.js' );
    return php.call_user_func_array( php.abs , arguments );
}

php.acos = function (arg) {
    php.require_once( php.path + 'php.acos.js' );
    return php.call_user_func_array( php.acos , arguments );
}

php.acosh = function (arg) {
    php.require_once( php.path + 'php.acosh.js' );
    return php.call_user_func_array( php.acosh , arguments );
}

php.addcslashes = function (arg) { 
    php.require_once( php.path + 'php.addcslashes.js' ); 
    return php.call_user_func_array( php.addcslashes , arguments );
}

php.addslashes = function (arg) { 
    php.require_once( php.path + 'php.addslashes.js' ); 
    return php.call_user_func_array( php.addslashes , arguments );
} 

php.aggregate = function (arg) { 
    php.require_once( php.path + 'php.aggregate.js' ); 
    return php.call_user_func_array( php.aggregate , arguments );
}

php.aggregate_info = function (arg) { 
    php.require_once( php.path + 'php.aggregate_info.js' ); 
    return php.call_user_func_array( php.aggregate_info , arguments );
} 
