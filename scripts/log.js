
var Log = {};
Log.messages = [];

Log.Add = function(text)
{
    if(text == "") return;
    var time = ((new Date()) - Game.startTime);
    var sec = (time / 1000) % 60;
    sec = Math.floor(sec);
    var min = (time / (1000 * 60)) % 60;
    min = Math.floor(min);
    var msg = new CreateDiv("["+ ((min < 10) ? ("0"+min) : min)+":"+((sec < 10) ? ("0"+sec) : sec) + "] " +text, [100, 20])
    if(UI.log.childNodes.length > 1)
    {
        msg.appendTo(UI.log, UI.log.childNodes[1]);
    }
    else 
    {
        msg.appendTo(UI.log);
    }
    msg.style.position = "relative";
    msg.style.fontSize = '12px';
    msg.width('80%');
    Log.messages.push(msg);

    if(Log.messages.length > 20)
    {
        UI.log.removeChild(Log.messages.splice(0,1)[0])
    }
}