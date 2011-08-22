php.trigger_error = function (error_msg, error_type) {
    // Generates a user-level error/warning/notice message  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/trigger_error
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Although this function should only allow the E_USER_ types, we'll allow the
    // %        note 1: others here in order to be able to simulate more types (though should not trigger
    // %        note 1: aggregates like E_STRICT or E_ALL).
    // %        note 1: See also our experimental at() function (to mimic the @ error suppressor)
    // -    depends on: echo
    // *     example 1: \php.trigger_error('This will just be a notice');
    // *     returns 1: true

    // Fix: get to work with set_error_handler()'s handler when that is added

    var type = 0, i = 0, that = this, prepend = '', append = '';
    if (!error_type) {
        error_type = 'E_USER_NOTICE';
    }
    var ini_on = function (ini) {
        return that.php_js.ini[ini] && that.php_js.ini[ini].local_value &&
            ((that.php_js.ini[ini].local_value.toString &&
                that.php_js.ini[ini].local_value.toString().toLowerCase &&
                (that.php_js.ini[ini].local_value.toString().toLowerCase() === 'on' ||
                that.php_js.ini[ini].local_value.toString().toLowerCase() === 'true')) ||
            parseInt(that.php_js.ini[ini].local_value, 10) === 1);
    };
    var display_errors = function (type) {
        return that.php_js.ini.error_reporting &&
                    (type & that.php_js.ini.error_reporting.local_value) && ini_on('display_errors');
    };
    var TYPES = { // Including all types for completeness, but should not trigger aggregates like E_STRICT or E_ALL
        E_ERROR:1, // Fatal run-time errors. These indicate errors that can not be recovered from, such as a memory allocation problem. Execution of the script is halted.
        E_WARNING:2, // Run-time warnings (non-fatal errors). Execution of the script is not halted.
        E_PARSE:4, // Compile-time parse errors. Parse errors should only be generated by the parser.
        E_NOTICE:8, // Run-time notices. Indicate that the script encountered something that could indicate an error, but could also happen in the normal course of running a script.
        E_CORE_ERROR:16, // Fatal errors that occur during PHP's initial startup. This is like an E_ERROR, except it is generated by the core of PHP.
        E_CORE_WARNING:32, // Warnings (non-fatal errors) that occur during PHP's initial startup. This is like an E_WARNING, except it is generated by the core of PHP.
        E_COMPILE_ERROR:64, // Fatal compile-time errors. This is like an E_ERROR, except it is generated by the Zend Scripting Engine.
        E_COMPILE_WARNING:128, // Compile-time warnings (non-fatal errors). This is like an E_WARNING, except it is generated by the Zend Scripting Engine.
        E_USER_ERROR:256, // User-generated error message. This is like an E_ERROR, except it is generated in PHP code by using the PHP function trigger_error().
        E_USER_WARNING:512, // User-generated warning message. This is like an E_WARNING, except it is generated in PHP code by using the PHP function trigger_error().
        E_USER_NOTICE:1024, // User-generated notice message. This is like an E_NOTICE, except it is generated in PHP code by using the PHP function trigger_error().
        E_STRICT:2048, // Enable to have PHP suggest changes to your code which will ensure the best interoperability and forward compatibility of your code.
        E_RECOVERABLE_ERROR:4096, // Catchable fatal error. It indicates that a probably dangerous error occured, but did not leave the Engine in an unstable state. If the error is not caught by a user defined handle (see also set_error_handler()), the application aborts as it was an E_ERROR.
        E_DEPRECATED:8192, // Run-time notices. Enable this to receive warnings about code that will not work in future versions.
        E_USER_DEPRECATED:16384, // User-generated warning message. This is like an E_DEPRECATED, except it is generated in PHP code by using the PHP function trigger_error().
        E_ALL:30719 // All errors and warnings, as supported, except of level E_STRICT in PHP < 6.     in:32767, // PHP 6, in:30719, // PHP 5.3.x, in:6143, // PHP 5.2.x, previously:2047, //
    };
    if (typeof error_type === 'number') {
        type = error_type;
    }
    else { // Allow for a single string or an array of string flags
        error_type = [].concat(error_type);
        for (i=0; i < error_type.length; i++) {
            // Resolve string input to bitwise
            if (TYPES[error_type[i]]) {
                type = type | TYPES[error_type[i]];
            }
        }
    }
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    if (type & TYPES.E_USER_ERROR || 
        type & TYPES.E_ERROR ||
        type & TYPES.E_CORE_ERROR ||
        type & TYPES.E_COMPILE_ERROR ||
        type & TYPES.E_RECOVERABLE_ERROR ||
        type & TYPES.E_PARSE) {
        if (ini_on('track_errors')) {
            this.$php_errormsg = error_msg; // Can assign to this global, as in PHP (see http://php.net/manual/en/reserved.variables.phperrormsg.php )
        }
        if (display_errors(type)) {
            prepend = this.php_js.ini.error_prepend_string ? this.php_js.ini.error_prepend_string : '';
            append = this.php_js.ini.error_append_string ? this.php_js.ini.error_append_string : '';
            this.echo(prepend+'Error: '+error_msg+' '+append);
        }
        var e = new Error(error_msg); // Might, for Mozilla, allow to somehow pass in a fileName and lineNumber (2nd and 3rd arguments to Error)
        e.type = type;
        this.php_js.last_error = {message:e.message, file:e.fileName, line:e.lineNumber, type:e.type}; // fileName and lineNumber presently not working (see note just above)
        throw e;
    }

    if (display_errors(type)) {
        switch (type) {
            case TYPES.E_USER_WARNING:
            case TYPES.E_WARNING:
            case TYPES.E_CORE_WARNING:
            case TYPES.E_COMPILE_WARNING:
                this.echo('Warning: '+error_msg);
                break;
            case TYPES.E_USER_NOTICE:
            case TYPES.E_NOTICE:
                this.echo('Notice: '+error_msg);
                break;
            case TYPES.E_DEPRECATED:
            case TYPES.E_USER_DEPRECATED:
                this.echo('Deprecated: '+error_msg);
                break;
            default:
                throw 'Unrecognized error type';
        }
    }

    return true;
};

