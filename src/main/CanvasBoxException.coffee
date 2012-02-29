class CanvasBoxException extends Error
    constructor:(strMessage)->
        this.Message = strMessage;
        alert( strMessage);