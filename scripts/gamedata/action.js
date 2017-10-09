

function Action(title, text, func, hum) {
    this.title = title;
    this.text = text;
    this.func = func;
    this.needHuman = (hum) ? hum : null;
    return this;
}

function ActionWithHuman(human, text, title) {
    this.title = (title) ? title : "Новый выживший!";
    this.text = (text) ? text : "Вы встретили нового выжившего, его зовут " + human.name;
    this.func = function () {
        Game.AddHuman(human);
    }
    return this;
}

function CopyAction(act) {
    this.id = act.id;
    this.title = act.title;
    this.text = act.text;
    this.func = act.func;
    return this;
}
