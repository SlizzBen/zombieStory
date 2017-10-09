

var UI = {};
UI.places = {};

function MainUI()
{

  UI.people = new CreateDiv("Люди : 1");
  UI.people.tColor('#DBDAD6');
  UI.people.setPos(10, 10);
  UI.people.style.fontSize = "14px";
  
  UI.actions = new CreateDiv("ОД : 0");
  UI.actions.tColor('#DBDAD6');
  UI.actions.setPos(110, 10);
  UI.actions.style.fontSize = "14px";

  UI.food = new CreateDiv("Еда : 1");
  UI.food.tColor('#DBDAD6');
  UI.food.setPos(10, 25);
  UI.food.style.fontSize = "14px";

  UI.fuel = new CreateDiv("Топливо : 1");
  UI.fuel.tColor('#DBDAD6');
  UI.fuel.setPos(10, 40);
  UI.fuel.style.fontSize = "14px";

  UI.peopleLayer = new CreateDiv("", [130,300], "#2E3329");
  UI.peopleLayer.setPos(3, 60);
  UI.peopleLayer.border(1, 10, "#BCCEA7");

  UI.log = new CreateDiv("Log", [300,100], "#2E3329");
  UI.log.tColor('#DBDAD6');
  UI.log.setPos(3, 495 - 100);
  UI.log.border(1, 10, "#BCCEA7");
  UI.log.style.textAlign = "center";
  UI.log.style.overflow = "hidden";
  UI.log.style.overflowY = "scroll";

  UI.nextDay = new CreateDiv("Закончить день", [120, 30], "#2E3329");
  UI.nextDay.tColor('#DBDAD6');
  UI.nextDay.setPos(Core.screen[0] - 125, Core.screen[1] - 35);
  UI.nextDay.border(1, 10, "#BCCEA7");
  UI.nextDay.style.textAlign = "center";
  UI.nextDay.clickListener(() => {
    Game.StartDay();
  });
  DrawPlaces();
}

function ClearPlaces()
{
  for(var key in UI.places)
  {
    if(UI.places[key].search_btn) UI.places[key].search_btn.remove();
    UI.places[key].remove();
  }
}

function DrawPlaces()
{
  ClearPlaces()
  new DrawPlace("shelter", [150, 60], Shelter);
}

function DrawPlace(name, pos, place)
{
  var curPlace = new CreateDiv(place.name, [200, 80], "#2E3329");
  curPlace.tColor("#DBDAD6");
  curPlace.setPos(pos[0], pos[1]);
  curPlace.border(1, 5, "#BCCEA7");
  curPlace.onmouseup = function(event)
  {
    if(DragDropObj && DragDropObj.human)
    {
      if(DragDropObj.human.place == place)
      {
        DialogWin.Show("Вы уже здесь", {text:"Ну ладно"});
        return;
      }
      if(Game.curAction == 0)
      {
        DialogWin.Show("У вас не хватает очков действий(ОД)", {text:"Ну ладно"});
        return;
      }
      if(Game.stats.fuel == 0)
      {
        DialogWin.Show("У вас не хватает бензина. Но вы можете попробовать дойти пешком, но вы рискуете не дойти и/или пораниться. (проход 6(5+)) (ранение 6(4+))", {text:"Ну ладно"}, {text:"Попытаться дойти пешком", func : () => {
          var rnd1 = getRandomInt(0, 6)+1;
          var rnd2 = getRandomInt(0, 6)+1;
          Game.curAction -= 1;
          if(rnd1 >= 5)
          {
            Log.Add(DragDropObj.human.name + " пришел в " + place.name);
            Game.MoveHuman(DragDropObj.human, place);
          }
          if(rnd2 < 4)
          {
            DragDropObj.human.getDamage(1);
            Log.Add(DragDropObj.human.name + " получил 1 урон от обморожения");
          }
        }});
        return;
      }
      Game.stats.fuel -= 1;
      Log.Add(DragDropObj.human.name + " пришел в " + place.name);
      Game.MoveHuman(DragDropObj.human, place);
    }
  }
  curPlace.place = place;
  
  if(place.humans.length > 0)
  {
    curPlace.search_btn = new CreateDiv("Искать", [90, 20], "#454C3D");
    curPlace.search_btn.appendTo(curPlace);
    curPlace.search_btn.setPos(107, 57);
    curPlace.search_btn.tColor("#DBDAD6");
    curPlace.search_btn.border(1, 2, "#141612")
    curPlace.search_btn.style.textAlign = 'center';
    curPlace.search_btn.clickListener(() => {
      curPlace.place.StartSearch();
    });

    for(var i = 0; i < place.humans.length; i++)
    {
      var man = new CreateImg("res/person.png", [16,16], null, curPlace);
      man.setPos(181 - i * 13, 3);
    }
    for(var i = 0; i < place.zombies; i++)
    {
      var man = new CreateImg("res/person.png", [16,16], null, curPlace);
      man.setPos(181 - i * 13, 19);
    }
  }
  UI.places[name] = curPlace;
}

function RedrawPlaces()
{
  
}


function Redraw()
{
  clearHumanLayer();

  for(var i = 0; i < Game.humans.length; i++)
  {
    var hum = Game.humans[i];
    var div = new CreateDiv(Game.humans[i].name, [110, 30], "#454C3D", UI.peopleLayer)
    div.tColor("#DBDAD6");
    div.setPos(10, 10 + i * 35);
    div.style.textAlign = "center";
    div.border(1, 2, "#141612")
    var index = i;
    div.clickListener(() => {console.log(Game.humans[index].name);});
    div.addEventListener('mousedown', () => {
      DragDropObj = div.cloneNode(true);
      Core.div.appendChild(DragDropObj);
      DragDropObj.human = Game.humans[index];
    }, false);
    if(hum.infected)
    {
      var man = new CreateImg("res/parmecia.png", [16,16], null, div);
      man.setPos(3, 3);
    }
  }

  UI.people.text("Люди : " + Game.stats.people);
  UI.actions.text("ОД : " + Game.curAction);
  UI.food.text("Еда : " + Game.stats.food);
  UI.fuel.text("Топливо : " + Game.stats.fuel);

  DrawPlaces();
}

var DragDropObj = null;


function clearHumanLayer()
{
  while(UI.peopleLayer.firstChild)
  {
    UI.peopleLayer.removeChild(UI.peopleLayer.firstChild);
  }
}
