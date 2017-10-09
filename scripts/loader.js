var scriptList = [
	'scripts/draw.js',
    'scripts/core.js',
    'scripts/gamedata/human.js',
    'scripts/gamedata/action.js',
    'scripts/gamedata/item.js',
    'scripts/gamedata/actionList/simple_actions.js',
    'scripts/gamemap/standartPlace.js',
    'scripts/gamemap/shelter.js',
    'scripts/log.js',
    'scripts/dialogWin.js',
    'scripts/game.js',
	];





var loadScript = function(src, callback, appendTo) {
    var script = document.createElement('script');

    if (!appendTo) {
        appendTo = document.getElementsByTagName('head')[0];
    }

    if (script.readyState && !script.onload) {
        // IE, Opera
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        }
    }
    else {
        // Rest
        script.onload = callback;
    }

    script.src = src;
    appendTo.appendChild(script);
}
function startLoad()
{
	if(scriptList.length == 0){
    Core.Main();
		return;
	}
	var script = scriptList.splice(0, 1);
	loadScript(script, startLoad, document.head);
}

startLoad();
