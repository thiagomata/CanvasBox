php.is_bool = function (mixed_var)
{
    // Returns true if variable is a boolean  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/is_bool
    // +   original by: Onno Marsman
    // *     example 1: \php.is_bool(false);
    // *     returns 1: true
    // *     example 2: \php.is_bool(0);
    // *     returns 2: false
    return (typeof mixed_var === 'boolean');
};

