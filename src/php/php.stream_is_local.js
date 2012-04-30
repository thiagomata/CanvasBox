php.stream_is_local = function (stream_or_url) {
    // string stream_resolve_include_path(string filename[, resource context]) U 
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/stream_is_local
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.stream_is_local('/etc');
    // *     returns 1: true

    if (typeof stream_or_url === 'string') {
        return ((/^(https?|ftps?|ssl|tls):/).test(stream_or_url)) ? false : true; // Need a better check than this
    }
    return stream_or_url.is_local ? true : false;
};

