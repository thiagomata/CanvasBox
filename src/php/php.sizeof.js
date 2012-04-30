php.sizeof = function ( mixed_var, mode ) {
    // !No description available for sizeof. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/sizeof
    // +   original by: Philip Peterson
    // -    depends on: count
    // *     example 1: \php.sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: \php.sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
 
    return this.count( mixed_var, mode );
};

