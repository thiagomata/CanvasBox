php.deg2rad = function (angle) {
    // Converts the number in degrees to the radian equivalent  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/deg2rad
    // +   original by: Enrique Gonzalez
    // *     example 1: \php.deg2rad(45);
    // *     returns 1: 0.7853981633974483
    
    return (angle/180)*Math.PI;
};

