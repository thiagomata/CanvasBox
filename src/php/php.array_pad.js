php.array_pad = function ( input, pad_size, pad_value ) {
    // Returns a copy of input array padded with pad_value to size pad_size  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_pad
    // +   original by: Waldo Malqui Silva
    // *     example 1: \php.array_pad([ 7, 8, 9 ], 2, 'a');
    // *     returns 1: [ 7, 8, 9]
    // *     example 2: \php.array_pad([ 7, 8, 9 ], 5, 'a');
    // *     returns 2: [ 7, 8, 9, 'a', 'a']
    // *     example 3: \php.array_pad([ 7, 8, 9 ], 5, 2);
    // *     returns 3: [ 7, 8, 9, 2, 2]
    // *     example 4: \php.array_pad([ 7, 8, 9 ], -5, 'a');
    // *     returns 4: [ 'a', 'a', 7, 8, 9 ]
    var pad = [], newArray = [], newLength, i=0;

    if ( input instanceof Array && !isNaN( pad_size ) ) {
        newLength = ( ( pad_size < 0 ) ? ( pad_size * -1 ) : pad_size );
        if ( newLength > input.length ) {
            for ( i = 0; i < ( newLength - input.length ); i++ ) { newArray [ i ] = pad_value; }
            pad = ( ( pad_size < 0 ) ? newArray.concat( input ) : input.concat( newArray ) );
        } else {
            pad = input;
        }
    }

    return pad;
};
