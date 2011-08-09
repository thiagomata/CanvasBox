php.array_rand = function ( input, num_req ) {
    // Return key/keys for random entry/entries in the array  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_rand
    // +   original by: Waldo Malqui Silva
    // *     example 1: \php.array_rand( ['Kevin'], 1 );
    // *     returns 1: 0
    var indexes = [];
    var ticks = num_req || 1;
    var checkDuplicate = function ( input, value ) {
        var exist = false, index = 0;
        while ( index < input.length ) {
            if ( input [ index ] === value ) {
                exist = true;
                break;
            }
            index++;
        }
        return exist;
    };

    if ( input instanceof Array && ticks <= input.length ) {
        while ( true ) {
            var rand = Math.floor( ( Math.random( ) * input.length ) );
            if ( indexes.length === ticks ) { break; }
            if ( !checkDuplicate( indexes, rand ) ) { indexes.push( rand ); }
        }
    } else {
        indexes = null;
    }

    return ( ( ticks == 1 ) ? indexes.join( ) : indexes );
};
