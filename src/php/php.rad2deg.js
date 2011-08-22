php.rad2deg = function (angle) {
    // Converts the radian number to the equivalent number in degrees  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/rad2deg
    // +   original by: Enrique Gonzalez
    // *     example 1: \php.rad2deg(3.141592653589793);
    // *     returns 1: 180
    
    return (angle/Math.PI) * 180;
};

