php.array_merge_recursive = function (arr1, arr2){
    // Recursively merges elements from passed arrays into one array  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/array_merge_recursive
    // +   original by: Subhasis Deb
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: array_merge
    // *     example 1: \php.arr1 = {'color': {'favourite': 'read'}, 0: 5}
    // *     example 1: \php.arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
    // *     example 1: \php.array_merge_recursive(arr1, arr2)
    // *     returns 1: {'color': {'favorite': {0: 'red', 1: 'green'}, 0: 'blue'}, 1: 5, 1: 10}
    var idx = '';

    if ((arr1 && (arr1 instanceof Array)) && (arr2 && (arr2 instanceof Array))) {
        for (idx in arr2) {
            arr1.push(arr2[idx]);
        }
    } else if ((arr1 && (arr1 instanceof Object)) && (arr2 && (arr2 instanceof Object))) {
        for (idx in arr2) {
            if (idx in arr1) {
                if (typeof arr1[idx] == 'object' && typeof arr2 == 'object') {
                    arr1[idx] = this.array_merge(arr1[idx], arr2[idx]);
                } else {
                    arr1[idx] = arr2[idx];
                }
            } else {
                arr1[idx] = arr2[idx];
            }
        }
    }
    
    return arr1;
};