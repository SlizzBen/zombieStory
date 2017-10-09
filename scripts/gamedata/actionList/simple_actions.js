var act_fuel = new Action("Бензин", "", () => {
    var rnd = (getRandomInt(0, 100) < 90) ? 1 : 2;
    DialogWin.Show("Вы нашли запасы бензина (+" + rnd + "ед.)",
        {
            text: 'Забрать', func: () => {
                Game.stats.fuel += rnd;
                Log.Add("Вы нашли " + rnd + " ед. бензина");
            }
        }
    )
});

var act_food = new Action("Еда", "", () => {
    var rnd = getRandomInt(0, 100);
    var i = (rnd < 70) ? 1 : (rnd < 90) ? 2 : 3;
    DialogWin.Show("Вы нашли запасы еды (+" + i + "ед.)",
        {
            text: 'Забрать', func: () => {
                Game.stats.food += i;
                Log.Add("Вы нашли " + i + " ед. еды");
            }
        }
    )
});

var act_zombie_attack = new Action("Зомби", "", () => {
    var rnd = getRandomInt(0, 100);
    var count = (rnd < 80) ? 1 : 2;
    DialogWin.Show("Вы наткнулись на " + count + " зомби. Но вы можете попробовать отбиться.\r\nОтбиться (драка 6(5+), в случае получения урона заражение 6(4+)",
        { text: "Отбиться" , func: () => {
            for (var i = 0; i < count; i++) {
                var hum = SearchingPlace.humans[0];
                Game.HumanFight(hum);
            }
        }})
})