php.register_shutdown_function = function (cb) {
    // Register a user-level function to be called on request termination  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/register_shutdown_function
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.register_shutdown_function(function(first, middle, last) {alert('Goodbye '+first+' '+middle+' '+last+'!');}, 'Kevin', 'van', 'Zonneveld');
    // *     returns 1: 'Goodbye Kevin van Zonneveld!'
    var args = [],
        _addEvent = function (el, type, handler, capturing) {
            if (el.addEventListener) { /* W3C */
                el.addEventListener(type, handler, !!capturing);
            }
            else if (el.attachEvent) { /* IE */
                el.attachEvent('on'+type, handler);
            }
            else { /* OLDER BROWSERS (DOM0) */
                el['on'+type] = handler;
            }
        };

    args = Array.prototype.slice.call(arguments, 1);
    _addEvent(this.window, 'unload', function () {
        cb.apply(null, args);
    }, false);
};

