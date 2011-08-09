php.array = function () {
    // !No description available for array. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array
    // +   original by: d3x
    // *     example 1: \php.array('Kevin', 'van', 'Zonneveld');
    // *     returns 1: ['Kevin', 'van', 'Zonneveld']
    return Array.prototype.slice.call(arguments);
};
