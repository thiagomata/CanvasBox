php.long2ip = function ( proper_address ) {
    // Converts an (IPv4) Internet network address into a string in Internet standard dotted format  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/long2ip
    // +   original by: Waldo Malqui Silva
    // *     example 1: \php.long2ip( 3221234342 );
    // *     returns 1: '192.0.34.166'
    
    var output = false;
    
    if ( !isNaN( proper_address ) && ( proper_address >= 0 || proper_address <= 4294967295 ) ) {
        output = Math.floor(proper_address / Math.pow( 256, 3 ) ) + '.' +
            Math.floor( ( proper_address % Math.pow( 256, 3 ) ) / Math.pow( 256, 2 ) ) + '.' +
            Math.floor( ( ( proper_address % Math.pow( 256, 3 ) )  % Math.pow( 256, 2 ) ) / Math.pow( 256, 1 ) ) + '.' +
            Math.floor( ( ( ( proper_address % Math.pow( 256, 3 ) ) % Math.pow( 256, 2 ) ) % Math.pow( 256, 1 ) ) / Math.pow( 256, 0 ) );
    }
    
    return output;
};

