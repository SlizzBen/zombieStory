var DialogWin = {};
DialogWin.btns = 0;
var btn_list = [];

DialogWin.preload = function()
{
    DialogWin.div = new CreateDiv("", [400, 200], "#2E3329");
    DialogWin.div.setPos(Core.screen[0] / 2 - 200, Core.screen[1] / 2 - 100);
    DialogWin.div.border(1, 5, "#BCCEA7");
    DialogWin.div.appendTo(Core.blackScreen);
    DialogWin.div.style.display = "none";
    DialogWin.div.div_text = new CreateDiv("TestText", [380, 180]);
    DialogWin.div.div_text.appendTo(DialogWin.div);
    DialogWin.div.div_text.setPos(10, 10);
    DialogWin.div.div_text.tColor("#DBDAD6");
    DialogWin.div.div_text.style.textAlign = 'center';
}

DialogWin.Show = function(text, ...btns)
{
    DialogWin.btns = 0;
    Core.callBlackScreen();
    DialogWin.div.style.display = "block";
    DialogWin.div.div_text.innerText = text;
    while(btn_list.length > 0)
    {
        btn_list.splice(0, 1)[0].remove();
    }

    for(var i = 0; i < btns.length; i++)
    {
        var btn = new CreateDiv(btns[i].text, [400, 20], "#5A6350", Core.blackScreen);
        var func = btns[i].func;
        btn.setPos(Core.screen[0] / 2 - 200, Core.screen[1] / 2 + 98 + i * 22);
        btn.tColor("#DBDAD6");
        
        btn.style.borderBottom = "2px solid #747F67";
        btn.style.borderLeft = "1px solid #BCCEA7";
        btn.style.borderRight = "1px solid #BCCEA7";
        if(i == btns.length - 1)
        {
            btn.style.borderBottom = "1px solid #BCCEA7";
            btn.style.borderRadius = "0px 0px 5px 5px";
        }
        btn_list.push(btn);
        btn.onmousemove = function()
        {
            this.style.backgroundColor = "#859177";
        }
        btn.onmouseout = function()
        {
            this.style.backgroundColor = "#5A6350";
        }
        if(func) btn.clickListener(func);
        btn.clickListener(DialogWin.Hide);
        DialogWin.btns++;
    }
}

DialogWin.AddBtn = function(btn)
{
    var btn = new CreateDiv(btn.text, [400, 20], "#5A6350", Core.blackScreen);
    var func = btn.func;
    btn.setPos(Core.screen[0] / 2 - 200, Core.screen[1] / 2 + 98 + DialogWin.btns * 22);
    btn.tColor("#DBDAD6");
    
    btn.style.borderBottom = "2px solid #747F67";
    btn.style.borderLeft = "1px solid #BCCEA7";
    btn.style.borderRight = "1px solid #BCCEA7";
    btn.style.borderBottom = "1px solid #BCCEA7";
    btn_list.push(btn);
    btn.onmousemove = function()
    {
        this.style.backgroundColor = "#859177";
    }
    btn.onmouseout = function()
    {
        this.style.backgroundColor = "#5A6350";
    }
    if(func) btn.clickListener(func);
    btn.clickListener(DialogWin.Hide);
    DialogWin.btns++;
}

DialogWin.Hide = function()
{
    Core.callBlackScreen(false);
    DialogWin.div.style.display = "none";
    Redraw();
    
}


function ShowError(text)
{
    ShowDialog.Show(text, {text:"Ok"});
}