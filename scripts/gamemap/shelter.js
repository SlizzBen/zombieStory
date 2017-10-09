var Shelter = new Place("Убежище");

Shelter.maxZombies = 5;

Shelter.AddCard(act_fuel, 5);
Shelter.AddCard(act_food, 5);
Shelter.AddCard(new Action("Собака!", "", () => {
    DialogWin.Show("Раскапывая обломки вы обнаружили собаку, на ошейнике у нее написано 'Бобик'",
    {text : 'Приютить собаку(дать 1 ед. еды)', func : () => {
        Game.AddHuman(dog, Shelter);
        Shelter.AddCard(stock);
    }},
    {text : 'Бросить её', func : () => {
        Shelter.AddCard(shelter_zombie_dog);
    }}
)
}));
Shelter.AddCard(act_zombie_attack, 3);
Shelter.AddCard(act_fuel, 5);

var stock = new Action("Склад" , "", () => {
    DialogWin.Show("Вы решили заглянуть в ту часть убежищи, куда вас вел Бобик. В полу было отверстие, где вы нашли 3 ед. еды и 2 ед. бензина", 
    {text:"Круто"});
});
var shelter_zombie_dog = new Action("Бобик-зомби", "", () => {
    var hum = Shelter.humans[0];
    DialogWin.Show("Вы нашли труп собаки, которая совсем недавно была еще живая. Видимо она умерла от голода...", {text:"Мы были вынуждены", func: () => {
        DialogWin.Show("Она резко подорвалась, но в ее глазах уже не видно жизни, она успела укусить " + hum.name+", но и сама получила смертельный удар в голову."+hum.name+" совершает суицид, чтобы не стать зомби", {text:"..."});
    }}, {text:"Я даже не жалею об этом", func: () => {
        DialogWin.Show("Она резко подорвалась, но в ее глазах уже не видно жизни, она успела укусить " + hum.name+", но и сама получила смертельный удар в голову."+hum.name+" совершает суицид, чтобы не стать зомби", {text:"..."});
    }})
});

var shelter_signal = new Action("Сигнал", "", () => {
    DialogWin.Show("Обыскивая часовню вы задеваете какой-то рычаг, после чего раздается звон колокола. (+1 жетон шума)", {text:"Ой"});
    Shelter.noiseToken += 1;
});
Shelter.AddCard(shelter_signal);

Shelter.AddCard(new Action("Аптечка" , "", () => {
    
}))