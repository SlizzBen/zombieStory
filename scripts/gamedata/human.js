var Humans = [];
var StartHumans = [];

function Human(name, stats)
{
    this.name = name;
    this.stats = stats;
    this.place = null;
    this.hp = 2;
    this.infected = false;
    this.infection = 0;

    this.getDamage = function(count)
    {
        this.hp -= count;
        if(this.hp <= 0)
        {
            this.die();
        }
    } 

    this.addInfection = function(count)
    {
        this.infection += count;
        if(this.infection > 0)
        {
            this.infected = true;
        }
        else
        {
            this.infected = false;
        }
    }

    this.die = function(txt)
    {
        Log.Add(this.name + " умирает " + ((txt) ? txt : ""));
        var ind = this.place.humans.indexOf(this);
        if(ind > -1) this.place.humans.splice(ind, 1);
        Game.RemoveHuman(this);
    }



    Humans.push(this);
    return this;
}

function GetRandomHuman()
{
    var rnd = getRandomInt(0, StartHumans.length);
    var hum = StartHumans.splice(rnd, 1)[0];
    return hum;
}


var chief = new Human("Повар", {str : 5, agi:1, int:3});
var lumberJack = new Human("Лесоруб", {str : 6, agi:3, int:1});
var dog = new Human("Бобик", {str : 3, agi : 4, int:0});

StartHumans.push(chief);
StartHumans.push(lumberJack);