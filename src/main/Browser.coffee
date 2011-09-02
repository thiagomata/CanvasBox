CoffeeScript.loadFile = (file) ->
    alert(file);
    code = php.file_get_contents( file );
    eval CoffeeScript.compile code

CoffeeScript.eval = (code, options) ->
  eval CoffeeScript.compile code, options

CoffeeScript.run = (code, options = {}) ->
  options.bare = on
  # Function(CoffeeScript.compile code, options)()
  window.eval.call( window , (CoffeeScript.compile code, options) );

CoffeeScript.load = (url, callback) ->
  xhr = new (window.ActiveXObject or XMLHttpRequest)('Microsoft.XMLHTTP')
  xhr.open 'GET', url, true
  xhr.overrideMimeType 'text/plain' if 'overrideMimeType' of xhr
  xhr.onreadystatechange = ->
    if xhr.readyState is 4
      if xhr.status in [0, 200]
        CoffeeScript.run xhr.responseText
      else
        throw new Error "Could not load #{url}"
      callback() if callback
  xhr.send null

runScripts = ->
  scripts = document.getElementsByTagName 'script'
  coffees = (s for s in scripts when s.type is 'text/coffeescript')
  index = 0
  length = coffees.length
  do execute = ->
    script = coffees[index++]
    if script?.type is 'text/coffeescript'
      if script.src
        CoffeeScript.load script.src, execute
      else
        CoffeeScript.run script.innerHTML
        execute()
  null

if window.addEventListener
  addEventListener 'DOMContentLoaded', runScripts, no
else
  attachEvent 'onload', runScripts
