php.runkit_import = function (file, flags) {
    // !No description available for runkit_import. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/runkit_import
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: file_get_contents
    // %        note 1: does not return an associative array as in PHP and will evaluate all variables, not only those in a function or class
    // %        note 2: Implement instead with include?
    // *     example 1: \php.runkit_import('http://example.com/somefile.js');
    // *     returns 1: undefined
    if (flags) {
        // RUNKIT_IMPORT_FUNCTIONS, RUNKIT_IMPORT_CLASS_METHODS, RUNKIT_IMPORT_CLASS_CONSTS,
        // RUNKIT_IMPORT_CLASS_PROPS, RUNKIT_IMPORT_CLASSES, RUNKIT_IMPORT_OVERRIDE
        // CLASSKIT_AGGREGATE_OVERRIDE ?
        throw 'Flags not supported for runkit_import';
    }

    eval(this.file_get_contents(file));
};

