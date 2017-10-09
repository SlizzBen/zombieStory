var Core = {};
Core.div = null;
Core.createdDivs = [];
Core.screen = [1000, 500];
Core.Main = function () {
  Core.div = document.getElementById('game');
  Core.div.style.backgroundColor = "#454C3D";
  Core.div.style.position = "absolute";
  Core.div.style.width = "1000px";
  Core.div.style.height = "500px";
  Core.div.style.overflow = "hidden";
  Core.div.style.fontFamily = "myFont";
  Core.div.onselectstart = function()
  {
    return false;
  }
  Core.div.onmousemove = function(event)
  {
    if(DragDropObj)
    {
      DragDropObj.style.left = event.clientX + "px";
      DragDropObj.style.top = event.clientY + "px";
    }
  }
  Core.div.onmouseup = function(event)
  {
    if(DragDropObj)
    {
      DragDropObj.remove();
    }
  }

  Core.blackScreen = document.getElementById('game').cloneNode();
  document.body.appendChild(Core.blackScreen);
  Core.blackScreen.style.backgroundColor = "#111111";
  Core.blackScreen.style.position = "absolute";
  Core.blackScreen.style.width = "1000px";
  Core.blackScreen.style.height = "500px";
  Core.blackScreen.style.overflow = "hidden";
  Core.blackScreen.style.fontFamily = "myFont";
  Core.blackScreen.onselectstart = function()
  {
    return false;
  }
  Core.blackScreen.onmousemove = function(event)
  {
    return false;
  }
  Core.blackScreen.onmouseup = function(event)
  {
    return false;
  }
  Core.blackScreen.style.display = "none";
  
  //Core.div.addEventListener("click", Core.OnMouseClick, false);

  MainUI();
  Game.Main();
  DialogWin.preload();
}

Core.callBlackScreen = function(b = true)
{
  Core.blackScreen.style.display = (b) ? "block" : "none";
}


var a;
Core.OnMouseClick = function (e) {
  var x = e.clientX;
  var y = e.clientY;

  for (var i = 0; i < Core.createdDivs.length; i++) {
    var elem = Core.createdDivs[i];
    if (elem && elem.onclick) {
      var pos = elem.getPos();

      if (x >= pos[0] && x <= pos[0] + elem.width() && 
      y >= pos[1] && y <= pos[1] + elem.height()) {
        
      }
    }
  }
}


function CreateDiv(text, size, color, parent) {
  var el = document.createElement("div");
  el.style.position = "absolute";
  el.style.width = (size) ? size[0] : "100px";
  el.style.height = (size) ? size[1] : "50px";
  el.innerHTML = (text) ? text : "";
  if (color) el.style.backgroundColor = color;
  el.clickListeners = [];
  el.appendTo = function (parent, before) {
    if(!before) parent.appendChild(el);
    else
    {
      parent.insertBefore(el, before);
    }
  }

  if (!parent) el.appendTo(Core.div);
  else el.appendTo(parent);
  //Core.div.appendChild(el);
  Core.createdDivs.push(el);

  //Задать позицию элемента
  el.setPos = function (x, y) {
    el.style.left = x;
    el.style.top = y;
  }
  el.setPosPerc = function (x, y) {
    el.style.left = x + "%";
    el.style.top = y + '%';
  }

  el.setPos(0, 0);

  //Добавить слушатель \по клику\
  el.clickListener = function (func) {
    el.clickListeners.push(func);
  }

  el.OnClickEvent = function()
  {
    el.clickListeners.forEach(function(element) {
      element();
    }, this);
  }

  el.addEventListener("click", el.OnClickEvent, false);

  el.width = function (a) {
    if (a) {
      if (typeof (a) == "string" && a.indexOf('%') != -1) {
        el.style.width = a;
      }
      else el.style.width = a + "px";
    }
    return el.offsetWidth;
  }

  el.height = function (a) {
    if (a) {
      if (typeof (a) == "string" && a.indexOf('%') != -1) {
        el.style.height = a;
      }
      else
        el.style.height = a + "px";
    }
    return el.offsetHeight;
  }

  el.border = function (size, radius, color) {
    el.style.border = size + "px solid " + color;
    el.style.borderRadius = radius + "px";
  }

  el.tColor = function (color) {
    el.style.color = color;
  }

  
  el.getPos = function()
  {
    return [+el.style.left.split('px')[0], +el.style.top.split('px')[0]];
  }

  el.text = function(txt)
  {
    el.innerText = txt;
  }

  return el;
}


function CreateImg(img, size, color, parent) {
  var el = document.createElement("div");
  el.style.position = "absolute";
  el.style.width = (size) ? size[0] : "100px";
  el.style.height = (size) ? size[1] : "50px";
  el.style.backgroundImage = "url("+img+")"
  if (color) el.style.backgroundColor = color;
  el.clickListeners = [];
  el.appendTo = function (parent, before) {
    if(!before) parent.appendChild(el);
    else
    {
      parent.insertBefore(el, before);
    }
  }

  if (!parent) el.appendTo(Core.div);
  else el.appendTo(parent);
  //Core.div.appendChild(el);
  Core.createdDivs.push(el);

  //Задать позицию элемента
  el.setPos = function (x, y) {
    el.style.left = x;
    el.style.top = y;
  }
  el.setPosPerc = function (x, y) {
    el.style.left = x + "%";
    el.style.top = y + '%';
  }

  el.setPos(0, 0);

  //Добавить слушатель \по клику\
  el.clickListener = function (func) {
    el.clickListeners.push(func);
  }

  el.OnClickEvent = function()
  {
    el.clickListeners.forEach(function(element) {
      element();
    }, this);
  }

  el.addEventListener("click", el.OnClickEvent, false);

  el.width = function (a) {
    if (a) {
      if (typeof (a) == "string" && a.indexOf('%') != -1) {
        el.style.width = a;
      }
      else el.style.width = a + "px";
    }
    return el.offsetWidth;
  }

  el.height = function (a) {
    if (a) {
      if (typeof (a) == "string" && a.indexOf('%') != -1) {
        el.style.height = a;
      }
      else
        el.style.height = a + "px";
    }
    return el.offsetHeight;
  }

  el.border = function (size, radius, color) {
    el.style.border = size + "px solid " + color;
    el.style.borderRadius = radius + "px";
  }
  
  el.getPos = function()
  {
    return [+el.style.left.split('px')[0], +el.style.top.split('px')[0]];
  }

  el.text = function(txt)
  {
    el.innerText = text;
  }

  return el;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}