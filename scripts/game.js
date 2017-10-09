var Game = {
    stats : {
        people : 0,
        food : 1,
        fuel : 1,
        trash : 0,
    },

};
Game.items = [];
Game.humans = [];
Game.actionPerDay = 0;
Game.curAction = 0;
Game.startTime;
Game.halfFood = false;
Game.eventWithHumTarget;

Game.setEventWithTargetHuman = function(f)
{
    Game.eventWithHumTarget = f;
}

Game.ApplyAction = function(action)
{
    Log.Add(action.text);
    action.func();
    Redraw();
}

Game.Main = function () {
    Game.startTime = new Date();
    var hum = GetRandomHuman();
    Game.AddHuman(hum, Shelter);
    Game.curAction = Game.actionPerDay;
    Redraw();
}

Game.RemoveHuman = function(human)
{
    var ind = Game.humans.indexOf(human);
    if(ind > -1)
    {
        Game.humans.splice(ind, 1);
    }
    Redraw();
}

Game.StartDay = function()
{
    Game.curAction = Game.actionPerDay;
    for(var a = 0; a < Game.stats.people; a++)
    {
        Shelter.AddZombie();
    }
    for(var i = 0; i < Places.length; i++)
    {
        var place = Places[i];
        place.actionOnLand = 0;
        for(var a = 0; a < place.noiseToken; a++)
        {
            if(getRandomInt(1, 7) < 4) place.AddZombie();
        }
        place.noiseToken = 0;
        for(var a = 0; a < place.humans.length; a++)
        {
            place.AddZombie();
        }
        var dif = place.zombies - place.maxZombies;
        if(dif > 0)
        {
            place.zombies = place.maxZombies;
            for(var i = 0; i < dif; i++)
            {
                if(place.humans.length == 0) continue;
                Log.Add("В " + place.name + " зомби ворвались во внутрь");
                Game.HumanFight(place.humans[0]);
            }
        }
    }

    for(var i = 0; i < Game.humans.length; i++)
    {
        if(Game.halfFood)
        {
            Game.halfFood = false;
            continue;
        }
        var human = Game.humans[i];
        if(Game.stats.food > 0)
        {
            Game.stats.food -= 1;
            Game.halfFood = true;
            continue;
        }
        else
        {
            human.die("Не хватка еды");
        }
    }
    for(var i = 0; i < Game.stats.people; i++)
    {
        if(Game.halfFood)
        {
            Game.halfFood = false;
            continue;
        }
        if(Game.stats.food > 0)
        {
            Game.stats.food -= 1;
            Game.halfFood = true;
        }
        else
        {
            Game.stats.people -= 1;
        }
    }
    Game.halfFood = false;
    Redraw();
}

Game.HumanFight = function(hum)
{
    var attack = getRandomInt(0, 5) + 1;
    var infection = getRandomInt(0, 5) + 1;
    if (attack >= 5) {
        Log.Add("Вы одолели зомби без потерь");
    }
    else {
        
        if (!hum) {
            ShowError("Не могу получить Выжевшего")
        }
        else {
            hum.getDamage(1);
            if (hum.hp > 0) {
                if (infection < 4) {
                    Log.Add(hum.name + " получил заражение");
                    hum.addInfection(1);
                }
            }
        }
    }
}


Game.MoveHuman = function(human, place)
{
    if(human.place)
    {
        var ind = place.humans.indexOf(human);
        if(ind > -1) place.humans.splice(ind, 1);
    }
    if(place) 
    {
        human.place = place;
        place.humans.push(human);
    }
    Redraw();
}

Game.Update = function () {

}

Game.AddHuman = function (human, place) {
    if(Humans.indexOf(human) != -1) Humans.splice(Humans.indexOf(human), 1);
    Game.humans.push(human);
    Game.actionPerDay++;
    Log.Add(human.name + " пришел в " + place.name);
    if(human.place)
    {
        var ind = place.humans.indexOf(human);
        if(ind > -1) place.humans.splice(ind, 1);
    }
    if(place) 
    {
        human.place = place;
        place.humans.push(human);
    }
    Redraw();
}

