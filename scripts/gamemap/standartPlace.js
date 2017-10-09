var Places = [];
var SearchingPlace = null;


function Place(name)
{
    this.name = (name) ? name : "";
    this.cards = [];
    this.zombies = 0;
    this.humans = [];
    this.barricades = 0;
    this.maxZombies = 3;
    this.actionOnLand = 0;
    this.noiseToken = 0;

    //Игрок начал обыск
    this.StartSearch = function()
    {
        if(Game.curAction > 0)
        {
            Game.curAction -= 1;
            this.actionOnLand++;
            Log.Add("Начали исследовать " + this.name + "[-1 ОД]");
            if(this.cards.length > 0)
            {
                var rnd = getRandomInt(0, this.cards.length);
                var a = this.cards[rnd];
                while(a.needHuman && Game.humans.indesOf(a.needHuman) == -1)
                {
                    rnd = getRandomInt(0, this.cards.length);
                    a = this.cards[rnd];
                }
                var act = this.cards.splice(rnd, 1)[0];
                Game.ApplyAction(act);
            }
            SearchingPlace = this;
        }
        else
        {
            DialogWin.Show("У вас не хватает очков действий(ОД)", {text:"Ну ладно"});
        }
    }

    this.AddZombie = function()
    {
        if(this.barricades > 0)
        {
            this.barricades -= 1;
        }
        else {
            this.zombies ++;
        }
    }

    this.AddCard = function(card, count)
    {
        if(!count) count = 1;
        for(var i = 0; i < count; i++)
        {
            this.cards.push(new CopyAction(card));
        }
    }

    Places.push(this);
    return this;
}