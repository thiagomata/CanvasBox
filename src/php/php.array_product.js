php.array_product = function ( input ) {
    // Returns the product of the array entries  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_product
    // +   original by: Waldo Malqui Silva
    // *     example 1: \php.array_product([ 2, 4, 6, 8 ]);
    // *     returns 1: 384
    var Index = 0, product = 1;
    if ( input instanceof Array ) {
        while ( Index < input.length ) {
            product *= ( !isNaN( input [ Index ] ) ? input [ Index ] : 0 );
            Index++;
        }
    } else {
        product = null;
    }

    return product;
};
