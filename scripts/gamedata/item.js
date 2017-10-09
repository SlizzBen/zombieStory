function Item(name, onUse)
{
    this.name = name;
    this.use = onUse;
    Items.push(this);
}
var Items = [];

var medKit = new Item("Аптечка", () => {
    DialogWin.Show("Выбери кого вылечить");
    for(var i = 0; i < Game.humans.length; i++)
    {
        var hum = Game.humans[i];
        var a = {text : hum.name, func: () => {hum.hp = 2; hum.infected = false;}}
        DialogWin.AddBtn(a);
    }
    
    
})