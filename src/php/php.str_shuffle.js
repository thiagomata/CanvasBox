php.str_shuffle = function (str) {
    // Shuffles string. One permutation of all possible is created  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/str_shuffle
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.shuffled = str_shuffle("abcdef");
    // *     results 1: shuffled.length == 6
    
    if (str == undefined) {
        throw 'Wrong parameter count for str_shuffle()';
    }
    
    var getRandomInt = function (max) {
        return Math.floor(Math.random() * (max + 1));
    };
    var newStr = '', rand = 0;
    
    while (str.length) {
        rand = getRandomInt(str.length-1);
        newStr += str.charAt(rand);
        str = str.substring(0, rand)+str.substr(rand+1);
    }
    
    return newStr;
};

