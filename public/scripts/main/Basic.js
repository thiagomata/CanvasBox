"use strict";

/*
File created automatically based on the php.js project, version 1.3.2
@author Kevin van Zonneveld <kevin@vanzonneveld.net>
@author Converted to coffee and changed by <thiago.henrique.mata@gmail.com>
@link http://phpjs.org
 */
var array_keys, explode, file_exists, file_get_contents, implode, in_array, is_object, method_exists, php, require, sort;

php = {};

php.require = require = function(filename) {
  var client_pc, cur_file, d, isXML, js_code, script_block;
  d = window.document;
  isXML = d.documentElement.nodeName !== "HTML" || !d.write;
  js_code = this.file_get_contents(filename);
  script_block = void 0;
  script_block = (d.createElementNS && isXML ? d.createElementNS("http://www.w3.org/1999/xhtml", "script") : d.createElement("script"));
  script_block.type = "text/javascript";
  client_pc = navigator.userAgent.toLowerCase();
  if ((client_pc.indexOf("msie") !== -1) && (client_pc.indexOf("opera") === -1)) {
    script_block.text = js_code;
  } else {
    script_block.appendChild(d.createTextNode(js_code));
  }
  if (script_block !== undefined) {
    if (d.getElementsByTagNameNS && isXML) {
      if (d.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "head")[0]) {
        d.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "head")[0].appendChild(script_block);
      } else {
        d.documentElement.insertBefore(script_block, d.documentElement.firstChild);
      }
    } else {
      d.getElementsByTagName("head")[0].appendChild(script_block);
    }
    cur_file = {};
    cur_file[window.location.href] = 1;
    this.php_js = this.php_js || {};
    if (!this.php_js.includes) {
      this.php_js.includes = cur_file;
    }
    if (!this.php_js.includes[filename]) {
      this.php_js.includes[filename] = 1;
      return 1;
    } else {
      return ++this.php_js.includes[filename];
    }
  }
  return 0;
};

php.require_once = require = function(filename) {
  var client_pc, cur_file, d, isXML, js_code, script_block;
  d = window.document;
  isXML = d.documentElement.nodeName !== "HTML" || !d.write;
  js_code = this.file_get_contents(filename);
  script_block = (d.createElementNS && isXML ? d.createElementNS("http://www.w3.org/1999/xhtml", "script") : d.createElement("script"));
  script_block.type = "text/javascript";
  client_pc = navigator.userAgent.toLowerCase();
  if ((client_pc.indexOf("msie") !== -1) && (client_pc.indexOf("opera") === -1)) {
    script_block.text = js_code;
  } else {
    script_block.appendChild(d.createTextNode(js_code));
  }
  if (typeof script_block !== "undefined") {
    if (d.getElementsByTagNameNS && isXML) {
      if (d.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "head")[0]) {
        d.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "head")[0].appendChild(script_block);
      } else {
        d.documentElement.insertBefore(script_block, d.documentElement.firstChild);
      }
    } else {
      d.getElementsByTagName("head")[0].appendChild(script_block);
    }
    cur_file = {};
    cur_file[window.location.href] = 1;
    this.php_js = this.php_js || {};
    if (!this.php_js.includes) {
      this.php_js.includes = cur_file;
    }
    if (!this.php_js.includes[filename]) {
      this.php_js.includes[filename] = 1;
      return 1;
    } else {
      return ++this.php_js.includes[filename];
    }
  }
  return 0;
};

php.file_get_contents = file_get_contents = function(url, flags, context, offset, maxLen) {
  var OPTS, async, breakPos, content, content_type, e, encoding, flagNames, func, headers, href, http_options, http_stream, i, ini, k, method, newTmp, notification, pathPos, req, sendHeader, sendHeaderName, sendHeaders, slash, tmp, userAgentSent, user_agent;
  tmp = void 0;
  headers = [];
  newTmp = [];
  k = 0;
  i = 0;
  href = "";
  pathPos = -1;
  flagNames = 0;
  content = null;
  http_stream = false;
  func = function(value) {
    return value.substring(1) !== "";
  };
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  ini = this.php_js.ini;
  context = context || this.php_js.default_streams_context || null;
  if (!flags) {
    flags = 0;
  }
  OPTS = {
    FILE_USE_INCLUDE_PATH: 1,
    FILE_TEXT: 32,
    FILE_BINARY: 64
  };
  if (typeof flags === "number") {
    flagNames = flags;
  } else {
    flags = [].concat(flags);
    i = 0;
    while (i < flags.length) {
      if (OPTS[flags[i]]) {
        flagNames = flagNames | OPTS[flags[i]];
      }
      i++;
    }
  }
  if (flagNames & OPTS.FILE_BINARY && (flagNames & OPTS.FILE_TEXT)) {
    throw "You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()";
  }
  if ((flagNames & OPTS.FILE_USE_INCLUDE_PATH) && ini.include_path && ini.include_path.local_value) {
    slash = (ini.include_path.local_value.indexOf("/") !== -1 ? "/" : "\\");
    url = ini.include_path.local_value + slash + url;
  } else if (!/^(https?|file):/.test(url)) {
    href = window.location.href;
    pathPos = (url.indexOf("/") === 0 ? href.indexOf("/", 8) - 1 : href.lastIndexOf("/"));
    url = href.slice(0, pathPos + 1) + url;
  }
  http_options = void 0;
  if (context) {
    http_options = context.stream_options && context.stream_options.http;
    http_stream = !!http_options;
  }
  if (!context || !context.stream_options || http_stream) {
    req = (window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest());
    if (!req) {
      throw new Error("XMLHttpRequest not supported");
    }
    method = (http_stream ? http_options.method : "GET");
    async = !!(context && context.stream_params && context.stream_params["phpjs.async"]);
    if (ini["phpjs.ajaxBypassCache"] && ini["phpjs.ajaxBypassCache"].local_value) {
      url += (url.match(/\?/) == null ? "?" : "&") + (new Date()).getTime();
    }
    req.open(method, url, async);
    if (async) {
      notification = context.stream_params.notification;
      if (typeof notification === "function") {
        if (0 && req.addEventListener) {
          throw new Error("File Get Content Error");
        } else {
          req.onreadystatechange = function(aEvt) {
            var bytes_transferred, objContext;
            objContext = {
              responseText: req.responseText,
              responseXML: req.responseXML,
              status: req.status,
              statusText: req.statusText,
              readyState: req.readyState,
              evt: aEvt
            };
            bytes_transferred = void 0;
            switch (req.readyState) {
              case 0:
                notification.call(objContext, 0, 0, "", 0, 0, 0);
                break;
              case 1:
                notification.call(objContext, 0, 0, "", 0, 0, 0);
                break;
              case 2:
                notification.call(objContext, 0, 0, "", 0, 0, 0);
                break;
              case 3:
                bytes_transferred = req.responseText.length * 2;
                notification.call(objContext, 7, 0, "", 0, bytes_transferred, 0);
                break;
              case 4:
                if (req.status >= 200 && req.status < 400) {
                  bytes_transferred = req.responseText.length * 2;
                  notification.call(objContext, 8, 0, "", req.status, bytes_transferred, 0);
                } else if (req.status === 403) {
                  notification.call(objContext, 10, 2, "", req.status, 0, 0);
                } else {
                  notification.call(objContext, 9, 2, "", req.status, 0, 0);
                }
                break;
              default:
                throw "Unrecognized ready state for file_get_contents()";
            }
          };
        }
      }
    }
    if (http_stream) {
      sendHeaders = (http_options.header && http_options.header.split(/\r?\n/)) || [];
      userAgentSent = false;
      i = 0;
      while (i < sendHeaders.length) {
        sendHeader = sendHeaders[i];
        breakPos = sendHeader.search(/:\s*/);
        sendHeaderName = sendHeader.substring(0, breakPos);
        req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos + 1));
        if (sendHeaderName === "User-Agent") {
          userAgentSent = true;
        }
        i++;
      }
      if (!userAgentSent) {
        user_agent = http_options.user_agent || (ini.user_agent && ini.user_agent.local_value);
        if (user_agent) {
          req.setRequestHeader("User-Agent", user_agent);
        }
      }
      content = http_options.content || null;
    }
    if (flagNames & OPTS.FILE_TEXT) {
      content_type = "text/html";
      if (http_options && http_options["phpjs.override"]) {
        content_type = http_options["phpjs.override"];
      } else {
        encoding = (ini["unicode.stream_encoding"] && ini["unicode.stream_encoding"].local_value) || "UTF-8";
        if (http_options && http_options.header && /^content-type:/i.test(http_options.header)) {
          content_type = http_options.header.match(/^content-type:\s*(.*)$/i)[1];
        }
        if (!/;\s*charset=/.test(content_type)) {
          content_type += "; charset=" + encoding;
        }
      }
      req.overrideMimeType(content_type);
    } else {
      if (flagNames & OPTS.FILE_BINARY) {
        req.overrideMimeType("text/plain; charset=x-user-defined");
      }
    }
    try {
      if (http_options && http_options["phpjs.sendAsBinary"]) {
        req.sendAsBinary(content);
      } else {
        req.send(content);
      }
    } catch (_error) {
      e = _error;
      return false;
    }
    tmp = req.getAllResponseHeaders();
    if (tmp) {
      tmp = tmp.split("\n");
      k = 0;
      while (k < tmp.length) {
        if (func(tmp[k])) {
          newTmp.push(tmp[k]);
        }
        k++;
      }
      tmp = newTmp;
      i = 0;
      while (i < tmp.length) {
        headers[i] = tmp[i];
        i++;
      }
      this.$http_response_header = headers;
    }
    if (offset || maxLen) {
      if (maxLen) {
        return req.responseText.substr(offset || 0, maxLen);
      }
      return req.responseText.substr(offset);
    }
    return req.responseText;
  }
  return false;
};

php.file_exists = file_exists = function(url) {
  var req;
  req = (window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest());
  if (!req) {
    throw new Error("XMLHttpRequest not supported");
  }
  req.open("HEAD", url, false);
  req.send(null);
  if (req.status === 200) {
    return true;
  }
  return false;
};

php.implode = implode = function(glue, pieces) {
  var i, retVal, tGlue;
  i = "";
  retVal = "";
  tGlue = "";
  if (arguments_.length === 1) {
    pieces = glue;
    glue = "";
  }
  if (typeof pieces === "object") {
    if (Object.prototype.toString.call(pieces) === "[object Array]") {
      return pieces.join(glue);
    }
    for (i in pieces) {
      retVal += tGlue + pieces[i];
      tGlue = glue;
    }
    return retVal;
  }
  return pieces;
};

php.explode = explode = function(delimiter, string, limit) {
  var s;
  if (arguments_.length < 2 || typeof delimiter === "undefined" || typeof string === "undefined") {
    return null;
  }
  if (delimiter === "" || delimiter === false || delimiter === null) {
    return false;
  }
  if (typeof delimiter === "function" || typeof delimiter === "object" || typeof string === "function" || typeof string === "object") {
    return {
      0: ""
    };
  }
  if (delimiter === true) {
    delimiter = "1";
  }
  delimiter += "";
  string += "";
  s = string.split(delimiter);
  if (typeof limit === "undefined") {
    return s;
  }
  if (limit === 0) {
    limit = 1;
  }
  if (limit > 0) {
    if (limit >= s.length) {
      return s;
    }
    return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)]);
  }
  if (-limit >= s.length) {
    return [];
  }
  s.splice(s.length + limit);
  return s;
};

php.array_keys = array_keys = function(input, search_value, argStrict) {
  var include, key, search, strict, tmp_arr;
  search = typeof search_value !== "undefined";
  tmp_arr = [];
  strict = !!argStrict;
  include = true;
  key = "";
  if (input && typeof input === "object" && input.change_key_case) {
    return input.keys(search_value, argStrict);
  }
  for (key in input) {
    if (input.hasOwnProperty(key)) {
      include = true;
      if (search) {
        if (strict && input[key] !== search_value) {
          include = false;
        } else {
          if (input[key] !== search_value) {
            include = false;
          }
        }
      }
      if (include) {
        tmp_arr[tmp_arr.length] = key;
      }
    }
  }
  return tmp_arr;
};

php.in_array = in_array = function(needle, haystack, argStrict) {
  var key, strict;
  key = "";
  strict = !!argStrict;
  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  }
  return false;
};

php.sort = sort = function(inputArr, sort_flags) {
  var e, i, k, keyArr, loc, populateArr, sorter, strictForIn, that, valArr;
  valArr = [];
  keyArr = [];
  k = "";
  i = 0;
  sorter = false;
  that = this;
  strictForIn = false;
  populateArr = [];
  switch (sort_flags) {
    case "SORT_STRING":
      sorter = function(a, b) {
        return that.strnatcmp(a, b);
      };
      break;
    case "SORT_LOCALE_STRING":
      loc = this.i18n_loc_get_default();
      sorter = this.php_js.i18nLocales[loc].sorting;
      break;
    case "SORT_NUMERIC":
      sorter = function(a, b) {
        return a - b;
      };
      break;
    case "SORT_REGULAR":
      break;
    default:
      sorter = function(a, b) {
        var aFloat, aNumeric, bFloat, bNumeric;
        aFloat = parseFloat(a);
        bFloat = parseFloat(b);
        aNumeric = aFloat + "" === a;
        bNumeric = bFloat + "" === b;
        if (aNumeric && bNumeric) {
          return (aFloat > bFloat ? 1 : (aFloat < bFloat ? -1 : 0));
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else {
          if (!aNumeric && bNumeric) {
            return -1;
          }
        }
        if (a > b) {
          return 1;
        } else {
          if (a < b) {
            return -1;
          } else {
            return 0;
          }
        }
      };
  }
  try {
    this.php_js = this.php_js || {};
  } catch (_error) {
    e = _error;
    this.php_js = {};
  }
  this.php_js.ini = this.php_js.ini || {};
  strictForIn = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && this.php_js.ini["phpjs.strictForIn"].local_value !== "off";
  populateArr = (strictForIn ? inputArr : populateArr);
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(sorter);
  i = 0;
  while (i < valArr.length) {
    populateArr[i] = valArr[i];
    i++;
  }
  return strictForIn || populateArr;
};

php.method_exists = method_exists = function(obj, method) {
  if (typeof obj === "string") {
    return window[obj] && typeof window[obj][method] === "function";
  }
  return typeof obj[method] === "function";
};

php.is_object = is_object = function(mixed_var) {
  if (Object.prototype.toString.call(mixed_var) === "[object Array]") {
    return false;
  }
  return mixed_var !== null && typeof mixed_var === "object";
};

//# sourceMappingURL=maps/Basic.js.map