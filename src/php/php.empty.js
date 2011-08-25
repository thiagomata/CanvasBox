php.empty = function (mixed_var) {
    // !No description available for empty. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/empty
    // +   original by: Philippe Baumann
    // +      input by: Onno Marsman
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: LH
    // +   improved by: Onno Marsman
    // +   improved by: Francesco
    // +   improved by: Marc Jansen
    // +   input by: Stoyan Kyosev (http://www.svest.org/)
    // *     example 1: \php.empty(null);
    // *     returns 1: true
    // *     example 2: \php.empty(undefined);
    // *     returns 2: true
    // *     example 3: \php.empty([]);
    // *     returns 3: true
    // *     example 4: \php.empty({});
    // *     returns 4: true
    // *     example 5: \php.empty({'aFunc' : function () { alert('humpty'); } });
    // *     returns 5: false
    
    var key;
    
    if (mixed_var === "" ||
        mixed_var === 0 ||
        mixed_var === "0" ||
        mixed_var === null ||
        mixed_var === false ||
        typeof mixed_var === 'undefined'
    ){
        return true;
    }

    if (typeof mixed_var == 'object') {
        for (key in mixed_var) {
            return false;
        }
        return true;
    }

    return false;
};
