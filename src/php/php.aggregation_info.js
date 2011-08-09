php.aggregation_info = function (obj) {
    // !No description available for aggregation_info. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/aggregation_info
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: aggregate_info
    // *     example 1: \php.var A = function () {};
    // *     example 1: A.prop = 5;
    // *     example 1: A.prototype.someMethod = function () {};
    // *     example 1: \php.var b = {};
    // *     example 1: \php.aggregate(b, 'A');
    // *     example 1: \php.aggregation_info(b);
    // *     returns 1: {'A':{methods:['someMethod'], properties:['prop']}}
    
    return this.aggregate_info(obj);
};
