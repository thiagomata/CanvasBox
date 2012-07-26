class CanvasBoxException extends Error
    constructor:(strMessage)->
        this.Message = strMessage;
        console.log( strMessage);