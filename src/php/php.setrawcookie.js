php.setrawcookie = function (name, value, expires, path, domain, secure) {
    // Send a cookie with no url encoding of the value  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/setrawcookie
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   derived from: setcookie
    // +   input by: Michael
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: \php.setcookie('author_name', 'Kevin van Zonneveld');
    // *     returns 1: true
    if (typeof expires === 'string' && (/^\d+$/).test(expires)) {
        expires = parseInt(expires, 10);
    }

    if (expires instanceof Date) {
        expires = expires.toGMTString();
    } else if (typeof(expires) === 'number') {
        expires = (new Date(expires * 1e3)).toGMTString();
    }

    var r = [name + '=' + value], s = {}, i = '';
    s = {expires: expires, path: path, domain: domain};
    for (i in s) {
        if (s.hasOwnProperty(i)) { // Exclude items on Object.prototype
            s[i] && r.push(i + '=' + s[i]);
        }
    }
    
    return secure && r.push('secure'),
                    this.window.document.cookie = r.join(";"),
                        true;
};

