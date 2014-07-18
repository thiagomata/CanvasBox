"use strict"

###
File created automatically based on the php.js project, version 1.3.2
@author Kevin van Zonneveld <kevin@vanzonneveld.net>
@author Converted to coffee and changed by <thiago.henrique.mata@gmail.com>
@link http://phpjs.org
###
php = {}
php.require = require = (filename) ->
  
  # http://kevin.vanzonneveld.net
  # +   original by: Michael White (http://getsprink.com)
  # +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # +      input by: Brett Zamir (http://brett-zamir.me)
  # +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # +   input by: Yen-Wei Liu
  # +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  # %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
  # %        note 2: Uses global: php_js to keep track of included files
  # -    depends on: file_get_contents
  # *     example 1: require('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
  # *     returns 1: 2
  d = window.document
  isXML = d.documentElement.nodeName isnt "HTML" or not d.write # Latter is for silly comprehensiveness
  js_code = @file_get_contents(filename)
  script_block = undefined
  script_block = (if (d.createElementNS and isXML) then d.createElementNS("http://www.w3.org/1999/xhtml", "script") else d.createElement("script"))
  script_block.type = "text/javascript"
  client_pc = navigator.userAgent.toLowerCase()
  if (client_pc.indexOf("msie") isnt -1) and (client_pc.indexOf("opera") is -1)
    script_block.text = js_code
  else
    script_block.appendChild d.createTextNode(js_code)
  if script_block isnt `undefined`
    if d.getElementsByTagNameNS and isXML
      if d.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "head")[0]
        d.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "head")[0].appendChild script_block
      else
        d.documentElement.insertBefore script_block, d.documentElement.firstChild # in case of XUL
    else
      d.getElementsByTagName("head")[0].appendChild script_block
    
    # save include state for reference by include_once and require_once()
    cur_file = {}
    cur_file[window.location.href] = 1
    
    # BEGIN REDUNDANT
    @php_js = @php_js or {}
    
    # END REDUNDANT
    @php_js.includes = cur_file  unless @php_js.includes
    unless @php_js.includes[filename]
      @php_js.includes[filename] = 1
      return 1
    else
      return ++@php_js.includes[filename]
  0
php.require_once = require = (filename) ->
  
  # http://kevin.vanzonneveld.net
  # +   original by: Michael White (http://getsprink.com)
  # +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # +      input by: Brett Zamir (http://brett-zamir.me)
  # +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # +   input by: Yen-Wei Liu
  # +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  # %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
  # %        note 2: Uses global: php_js to keep track of included files
  # -    depends on: file_get_contents
  # *     example 1: require('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
  # *     returns 1: 2
  d = window.document
  isXML = d.documentElement.nodeName isnt "HTML" or not d.write # Latter is for silly comprehensiveness
  js_code = @file_get_contents(filename)
  script_block = (if d.createElementNS and isXML then d.createElementNS("http://www.w3.org/1999/xhtml", "script") else d.createElement("script"))
  script_block.type = "text/javascript"
  client_pc = navigator.userAgent.toLowerCase()
  if (client_pc.indexOf("msie") isnt -1) and (client_pc.indexOf("opera") is -1)
    script_block.text = js_code
  else
    script_block.appendChild d.createTextNode(js_code)
  if typeof script_block isnt "undefined"
    # in case of XUL
    (if d.getElementsByTagNameNS and isXML then ((if d.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "head")[0] then d.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "head")[0].appendChild(script_block) else d.documentElement.insertBefore(script_block, d.documentElement.firstChild))) else d.getElementsByTagName("head")[0].appendChild(script_block))
    
    # save include state for reference by include_once and require_once()
    cur_file = {}
    cur_file[window.location.href] = 1
    
    # BEGIN REDUNDANT
    @php_js = @php_js or {}
    
    # END REDUNDANT
    @php_js.includes = cur_file  unless @php_js.includes
    unless @php_js.includes[filename]
      @php_js.includes[filename] = 1
      return 1
    else
      return ++@php_js.includes[filename]
  0


php.file_get_contents = file_get_contents = (url, flags, context, offset, maxLen) ->
  
  #  discuss at: http://phpjs.org/functions/file_get_contents/
  # original by: Legaev Andrey
  #    input by: Jani Hartikainen
  #    input by: Raphael (Ao) RUDLER
  # improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # improved by: Brett Zamir (http://brett-zamir.me)
  # bugfixed by: Brett Zamir (http://brett-zamir.me)
  #        note: This function uses XmlHttpRequest and cannot retrieve resource from different domain without modifications.
  #        note: Synchronous by default (as in PHP) so may lock up browser. Can
  #        note: get async by setting a custom "phpjs.async" property to true and "notification" for an
  #        note: optional callback (both as context params, with responseText, and other JS-specific
  #        note: request properties available via 'this'). Note that file_get_contents() will not return the text
  #        note: in such a case (use this.responseText within the callback). Or, consider using
  #        note: jQuery's: $('#divId').load('http://url') instead.
  #        note: The context argument is only implemented for http, and only partially (see below for
  #        note: "Presently unimplemented HTTP context options"); also the arguments passed to
  #        note: notification are incomplete
  #        test: skip
  #   example 1: var buf file_get_contents('http://google.com');
  #   example 1: buf.indexOf('Google') !== -1
  #   returns 1: true
  tmp = undefined
  headers = []
  newTmp = []
  k = 0
  i = 0
  href = ""
  pathPos = -1
  flagNames = 0
  content = null
  http_stream = false
  func = (value) ->
    value.substring(1) isnt ""

  
  # BEGIN REDUNDANT
  @php_js = @php_js or {}
  @php_js.ini = @php_js.ini or {}
  
  # END REDUNDANT
  ini = @php_js.ini
  context = context or @php_js.default_streams_context or null
  flags = 0  unless flags
  OPTS =
    FILE_USE_INCLUDE_PATH: 1
    FILE_TEXT: 32
    FILE_BINARY: 64

  if typeof flags is "number"
    
    # Allow for a single string or an array of string flags
    flagNames = flags
  else
    flags = [].concat(flags)
    i = 0
    while i < flags.length
      flagNames = flagNames | OPTS[flags[i]]  if OPTS[flags[i]]
      i++
  
  # These flags shouldn't be together
  throw "You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()"  if flagNames & OPTS.FILE_BINARY and (flagNames & OPTS.FILE_TEXT)
  if (flagNames & OPTS.FILE_USE_INCLUDE_PATH) and ini.include_path and ini.include_path.local_value
    slash = (if ini.include_path.local_value.indexOf("/") isnt -1 then "/" else "\\")
    url = ini.include_path.local_value + slash + url
  else unless /^(https?|file):/.test(url)
    
    # Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
    href = window.location.href
    pathPos = (if url.indexOf("/") is 0 then href.indexOf("/", 8) - 1 else href.lastIndexOf("/"))
    url = href.slice(0, pathPos + 1) + url
  http_options = undefined
  if context
    http_options = context.stream_options and context.stream_options.http
    http_stream = !!http_options
  if not context or not context.stream_options or http_stream
    req = (if window.ActiveXObject then new ActiveXObject("Microsoft.XMLHTTP") else new XMLHttpRequest())
    throw new Error("XMLHttpRequest not supported")  unless req
    method = (if http_stream then http_options.method else "GET")
    async = !!(context and context.stream_params and context.stream_params["phpjs.async"])
    url += ((if not url.match(/\?/)? then "?" else "&")) + (new Date()).getTime()  if ini["phpjs.ajaxBypassCache"] and ini["phpjs.ajaxBypassCache"].local_value # Give optional means of forcing bypass of cache
    req.open method, url, async
    if async
      notification = context.stream_params.notification
      if typeof notification is "function"
        
        # Fix: make work with req.addEventListener if available: https://developer.mozilla.org/En/Using_XMLHttpRequest
        if 0 and req.addEventListener
          
          # Unimplemented so don't allow to get here
          #
          #                    req.addEventListener('progress', updateProgress, false);
          #                    req.addEventListener('load', transferComplete, false);
          #                    req.addEventListener('error', transferFailed, false);
          #                    req.addEventListener('abort', transferCanceled, false);
          #                    
          throw new Error("File Get Content Error")
        else
          req.onreadystatechange = (aEvt) ->
            
            # aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent
            # Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials
            #
            #  PHP Constants:
            #  STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.
            #  STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.
            #  STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.
            #  STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.
            #  STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.
            #  STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .
            #  STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.
            #  STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.
            #  STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.
            #  STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).
            #
            #  STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.
            #  STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.
            #  STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.
            #  
            objContext =
              responseText: req.responseText
              responseXML: req.responseXML
              status: req.status
              statusText: req.statusText
              readyState: req.readyState
              evt: aEvt

            # properties are not available in PHP, but offered on notification via 'this' for convenience
            # notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')
            # Need to add message, etc.
            bytes_transferred = undefined
            switch req.readyState
              when 0
                
                #     UNINITIALIZED     open() has not been called yet.
                notification.call objContext, 0, 0, "", 0, 0, 0
              when 1
                
                #     LOADING     send() has not been called yet.
                notification.call objContext, 0, 0, "", 0, 0, 0
              when 2
                
                #     LOADED     send() has been called, and headers and status are available.
                notification.call objContext, 0, 0, "", 0, 0, 0
              when 3
                
                #     INTERACTIVE     Downloading; responseText holds partial data.
                # One character is two bytes
                bytes_transferred = req.responseText.length * 2
                notification.call objContext, 7, 0, "", 0, bytes_transferred, 0
              when 4
                
                #     COMPLETED     The operation is complete.
                if req.status >= 200 and req.status < 400
                  
                  # One character is two bytes
                  bytes_transferred = req.responseText.length * 2
                  notification.call objContext, 8, 0, "", req.status, bytes_transferred, 0
                else if req.status is 403
                  
                  # Fix: These two are finished except for message
                  notification.call objContext, 10, 2, "", req.status, 0, 0
                else
                  
                  # Errors
                  notification.call objContext, 9, 2, "", req.status, 0, 0
              else
                throw "Unrecognized ready state for file_get_contents()"
            return
    if http_stream
      sendHeaders = (http_options.header and http_options.header.split(/\r?\n/)) or []
      userAgentSent = false
      i = 0
      while i < sendHeaders.length
        sendHeader = sendHeaders[i]
        breakPos = sendHeader.search(/:\s*/)
        sendHeaderName = sendHeader.substring(0, breakPos)
        req.setRequestHeader sendHeaderName, sendHeader.substring(breakPos + 1)
        userAgentSent = true  if sendHeaderName is "User-Agent"
        i++
      unless userAgentSent
        user_agent = http_options.user_agent or (ini.user_agent and ini.user_agent.local_value)
        req.setRequestHeader "User-Agent", user_agent  if user_agent
      content = http_options.content or null
    
    #
    #            // Presently unimplemented HTTP context options
    #            // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.
    #            var request_fulluri = http_options.request_fulluri || false;
    #            // The max number of redirects to follow. Value 1 or less means that no redirects are followed.
    #            var max_redirects = http_options.max_redirects || 20;
    #            // HTTP protocol version
    #            var protocol_version = http_options.protocol_version || 1.0;
    #            // Read timeout in seconds, specified by a float
    #            var timeout = http_options.timeout || (ini.default_socket_timeout && ini.default_socket_timeout.local_value);
    #            // Fetch the content even on failure status codes.
    #            var ignore_errors = http_options.ignore_errors || false;
    #            
    if flagNames & OPTS.FILE_TEXT
      
      # Overrides how encoding is treated (regardless of what is returned from the server)
      content_type = "text/html"
      if http_options and http_options["phpjs.override"]
        
        # Fix: Could allow for non-HTTP as well
        # We use this, e.g., in gettext-related functions if character set
        content_type = http_options["phpjs.override"]
      
      #   overridden earlier by bind_textdomain_codeset()
      else
        encoding = (ini["unicode.stream_encoding"] and ini["unicode.stream_encoding"].local_value) or "UTF-8"
        
        # We'll assume a content-type expects its own specified encoding if present
        # We let any header encoding stand
        content_type = http_options.header.match(/^content-type:\s*(.*)$/i)[1]  if http_options and http_options.header and (/^content-type:/i).test(http_options.header)
        
        # If no encoding
        content_type += "; charset=" + encoding  unless (/;\s*charset=/).test(content_type)
      req.overrideMimeType content_type
    
    # Default is FILE_BINARY, but for binary, we apparently deviate from PHP in requiring the flag, since many if not
    #     most people will also want a way to have it be auto-converted into native JavaScript text instead
    
    # Trick at https://developer.mozilla.org/En/Using_XMLHttpRequest to get binary
    else req.overrideMimeType "text/plain; charset=x-user-defined"  if flagNames & OPTS.FILE_BINARY
    
    # Getting an individual byte then requires:
    # throw away high-order byte (f7) where x is 0 to responseText.length-1 (see notes in our substr())
    # responseText.charCodeAt(x) & 0xFF;
    try
      if http_options and http_options["phpjs.sendAsBinary"]
        
        # For content sent in a POST or PUT request (use with file_put_contents()?)
        # In Firefox, only available FF3+
        req.sendAsBinary content
      else
        req.send content
    catch e
      
      # catches exception reported in issue #66
      return false
    tmp = req.getAllResponseHeaders()
    if tmp
      tmp = tmp.split("\n")
      k = 0
      while k < tmp.length
        newTmp.push tmp[k]  if func(tmp[k])
        k++
      tmp = newTmp
      i = 0
      while i < tmp.length
        headers[i] = tmp[i]
        i++
      
      # see http://php.net/manual/en/reserved.variables.httpresponseheader.php
      @$http_response_header = headers
    if offset or maxLen
      return req.responseText.substr(offset or 0, maxLen)  if maxLen
      return req.responseText.substr(offset)
    return req.responseText
  false

php.file_exists = file_exists = (url) ->
  
  # http://kevin.vanzonneveld.net
  # +   original by: Enrique Gonzalez
  # +      input by: Jani Hartikainen
  # +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
  # %        note 1: Synchronous so may lock up browser, mainly here for study purposes.
  # *     example 1: file_exists('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
  # *     returns 1: '123'
  req = (if window.ActiveXObject then new ActiveXObject("Microsoft.XMLHTTP") else new XMLHttpRequest())
  throw new Error("XMLHttpRequest not supported")  unless req
  
  # HEAD Results are usually shorter (faster) than GET
  req.open "HEAD", url, false
  req.send null
  return true  if req.status is 200
  false
  
php.implode = implode = (glue, pieces) ->
  
  #  discuss at: http://phpjs.org/functions/implode/
  # original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # improved by: Waldo Malqui Silva
  # improved by: Itsacon (http://www.itsacon.net/)
  # bugfixed by: Brett Zamir (http://brett-zamir.me)
  #   example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
  #   returns 1: 'Kevin van Zonneveld'
  #   example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
  #   returns 2: 'Kevin van Zonneveld'
  i = ""
  retVal = ""
  tGlue = ""
  if arguments_.length is 1
    pieces = glue
    glue = ""
  if typeof pieces is "object"
    return pieces.join(glue)  if Object::toString.call(pieces) is "[object Array]"
    for i of pieces
      retVal += tGlue + pieces[i]
      tGlue = glue
    return retVal
  pieces

php.explode = explode = (delimiter, string, limit) ->
  
  #  discuss at: http://phpjs.org/functions/explode/
  # original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  #   example 1: explode(' ', 'Kevin van Zonneveld');
  #   returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
  return null  if arguments_.length < 2 or typeof delimiter is "undefined" or typeof string is "undefined"
  return false  if delimiter is "" or delimiter is false or delimiter is null
  return 0: ""  if typeof delimiter is "function" or typeof delimiter is "object" or typeof string is "function" or typeof string is "object"
  delimiter = "1"  if delimiter is true
  
  # Here we go...
  delimiter += ""
  string += ""
  s = string.split(delimiter)
  return s  if typeof limit is "undefined"
  
  # Support for limit
  limit = 1  if limit is 0
  
  # Positive limit
  if limit > 0
    return s  if limit >= s.length
    return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)])
  
  # Negative limit
  return []  if -limit >= s.length
  s.splice s.length + limit
  s

php.array_keys = array_keys = (input, search_value, argStrict) ->
  
  #  discuss at: http://phpjs.org/functions/array_keys/
  # original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  #    input by: Brett Zamir (http://brett-zamir.me)
  #    input by: P
  # bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # bugfixed by: Brett Zamir (http://brett-zamir.me)
  # improved by: jd
  # improved by: Brett Zamir (http://brett-zamir.me)
  #   example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
  #   returns 1: {0: 'firstname', 1: 'surname'}
  search = typeof search_value isnt "undefined"
  tmp_arr = []
  strict = !!argStrict
  include = true
  key = ""
  
  # Duck-type check for our own array()-created PHPJS_Array
  return input.keys(search_value, argStrict)  if input and typeof input is "object" and input.change_key_case
  for key of input
    if input.hasOwnProperty(key)
      include = true
      if search
        if strict and input[key] isnt search_value
          include = false
        else include = false  unless input[key] is search_value
      tmp_arr[tmp_arr.length] = key  if include
  tmp_arr

php.in_array = in_array = (needle, haystack, argStrict) ->
  
  #  discuss at: http://phpjs.org/functions/in_array/
  # original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # improved by: vlado houba
  # improved by: Jonas Sciangula Street (Joni2Back)
  #    input by: Billy
  # bugfixed by: Brett Zamir (http://brett-zamir.me)
  #   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
  #   returns 1: true
  #   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
  #   returns 2: false
  #   example 3: in_array(1, ['1', '2', '3']);
  #   example 3: in_array(1, ['1', '2', '3'], false);
  #   returns 3: true
  #   returns 3: true
  #   example 4: in_array(1, ['1', '2', '3'], true);
  #   returns 4: false
  key = ""
  strict = !!argStrict
  
  #we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
  #in just one for, in order to improve the performance 
  #deciding wich type of comparation will do before walk array
  if strict
    for key of haystack
      return true  if haystack[key] is needle
  else
    for key of haystack
      return true  if haystack[key] is needle
  false

php.sort = sort = (inputArr, sort_flags) ->
  
  #  discuss at: http://phpjs.org/functions/sort/
  # original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  #  revised by: Brett Zamir (http://brett-zamir.me)
  # improved by: Brett Zamir (http://brett-zamir.me)
  #        note: SORT_STRING (as well as natsort and natcasesort) might also be
  #        note: integrated into all of these functions by adapting the code at
  #        note: http://sourcefrog.net/projects/natsort/natcompare.js
  #        note: This function deviates from PHP in returning a copy of the array instead
  #        note: of acting by reference and returning true; this was necessary because
  #        note: IE does not allow deleting and re-adding of properties without caching
  #        note: of property position; you can set the ini of "phpjs.strictForIn" to true to
  #        note: get the PHP behavior, but use this only if you are in an environment
  #        note: such as Firefox extensions where for-in iteration order is fixed and true
  #        note: property deletion is supported. Note that we intend to implement the PHP
  #        note: behavior by default if IE ever does allow it; only gives shallow copy since
  #        note: is by reference in PHP anyways
  #        note: Since JS objects' keys are always strings, and (the
  #        note: default) SORT_REGULAR flag distinguishes by key type,
  #        note: if the content is a numeric string, we treat the
  #        note: "original type" as numeric.
  #  depends on: i18n_loc_get_default
  #   example 1: var arr = ['Kevin', 'van', 'Zonneveld']
  #   example 1: sort(arr);
  #   example 1: $result = arr;
  #   returns 1: ['Kevin', 'Zonneveld', 'van']
  #   example 2: ini_set('phpjs.strictForIn', true);
  #   example 2: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  #   example 2: sort(fruits);
  #   example 2: $result = fruits;
  #   returns 2: {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
  valArr = []
  keyArr = []
  k = ""
  i = 0
  sorter = false
  that = this
  strictForIn = false
  populateArr = []
  switch sort_flags
    when "SORT_STRING"
      
      # compare items as strings
      sorter = (a, b) ->
        that.strnatcmp a, b
    when "SORT_LOCALE_STRING"
      
      # compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
      loc = @i18n_loc_get_default()
      sorter = @php_js.i18nLocales[loc].sorting
    when "SORT_NUMERIC"
      
      # compare items numerically
      sorter = (a, b) ->
        a - b
    when "SORT_REGULAR"
    
    # compare items normally (don't change types)
    else
      sorter = (a, b) ->
        aFloat = parseFloat(a)
        bFloat = parseFloat(b)
        aNumeric = aFloat + "" is a
        bNumeric = bFloat + "" is b
        if aNumeric and bNumeric
          return (if aFloat > bFloat then 1 else (if aFloat < bFloat then -1 else 0))
        else if aNumeric and not bNumeric
          return 1
        else return -1  if not aNumeric and bNumeric
        (if a > b then 1 else (if a < b then -1 else 0))
  
  # BEGIN REDUNDANT
  try
    @php_js = @php_js or {}
  catch e
    @php_js = {}
  @php_js.ini = @php_js.ini or {}
  
  # END REDUNDANT
  strictForIn = @php_js.ini["phpjs.strictForIn"] and @php_js.ini["phpjs.strictForIn"].local_value and @php_js.ini["phpjs.strictForIn"].local_value isnt "off"
  populateArr = (if strictForIn then inputArr else populateArr)
  for k of inputArr
    
    # Get key and value arrays
    if inputArr.hasOwnProperty(k)
      valArr.push inputArr[k]
      delete inputArr[k]  if strictForIn
  valArr.sort sorter
  i = 0
  while i < valArr.length
    
    # Repopulate the old array
    populateArr[i] = valArr[i]
    i++
  strictForIn or populateArr

php.method_exists = method_exists = (obj, method) ->
  
  # http://kevin.vanzonneveld.net
  # +   original by: Brett Zamir (http://brett-zamir.me)
  # *     example 1: function class_a() {this.meth1 = function () {return true;}};
  # *     example 1: var instance_a = new class_a();
  # *     example 1: method_exists(instance_a, 'meth1');
  # *     returns 1: true
  # *     example 2: function class_a() {this.meth1 = function () {return true;}};
  # *     example 2: var instance_a = new class_a();
  # *     example 2: method_exists(instance_a, 'meth2');
  # *     returns 2: false
  return window[obj] and typeof window[obj][method] is "function"  if typeof obj is "string"
  typeof obj[method] is "function"

php.is_object = is_object = (mixed_var) ->
  
  #  discuss at: http://phpjs.org/functions/is_object/
  # original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  # improved by: Legaev Andrey
  # improved by: Michael White (http://getsprink.com)
  #   example 1: is_object('23');
  #   returns 1: false
  #   example 2: is_object({foo: 'bar'});
  #   returns 2: true
  #   example 3: is_object(null);
  #   returns 3: false
  return false  if Object::toString.call(mixed_var) is "[object Array]"
  mixed_var isnt null and typeof mixed_var is "object"