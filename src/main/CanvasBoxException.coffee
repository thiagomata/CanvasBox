class CanvasBoxException extends Error
    
    objParentError: null

    strParentErrorMessage: null

    strMessage: null

    constructor:(strMessage)->
      this.Message = strMessage;
      console.log( strMessage);
    
    setParentError:( objError )->
      window.bug = objError
      if( php.is_object( objError ) )
        @objParentError = objError
        if( php.method_exists( "getMessage" , objError ) )
          @strParentErrorMessage = objError.getMessage()
        else
          @strParentErrorMessage = objError.message
      else
        @strParentErrorMessage = objError
      console.log( @strParentErrorMessage )

    getMessage:()->
      return  @strMessage + "\n" + @strParentErrorMessage
