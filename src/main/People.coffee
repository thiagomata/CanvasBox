class People
    name: "anonymous"
    speak:->
        alert("hi i am #{@name}");
    constructor:(@name)->
        alert("#{@name} say hello world");