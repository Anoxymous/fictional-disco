import_JS("./ui/controls.js")
// const import_ss_styl = [];

function main() 
{
	const config = [
					{ id: "J-1", name: "movement", coord: "+50,+50,percent", size: "30,30,percent", type: "joystick" },
					{ id: "B-2", name: "attack", coord: "  0,  0,percent", size: "15,15,percent", type: "button" },
					{ id: "B-3", name: "attack", coord: " -0,  0,percent", size: "15,15,percent", type: "button" },
					{ id: "B-4", name: "attack", coord: "  0, -0,percent", size: "15,15,percent", type: "button" },
					{ id: "B-5", name: "attack", coord: " -0, -0,percent", size: "15,15,percent", type: "button" }
			];

	const controls = new TouchControls();
	controls.onInput((id, data) => {
			console.log("Input:", id, data);
	});

	controls.init(document.getElementById("gameArea"), config);
}
 

/*
// import {initRenderer,scene,camera,renderer} from "./engine/renderer.js"
import {createPlayer,player,stats,updatePlayer} from "./entities/player.js"
import {spawnEnemies,enemies,updateEnemies} from "./entities/enemy.js"
import {updateCombat} from "./systems/combat.js"
import {toggleInventory,updateInventory} from "./systems/inventory.js"
import {updateLoot} from "./systems/loot.js"
import {updateQuestUI} from "./systems/quests.js"
import {updateMinimap} from "./ui/minimap.js"
import {saveGame,loadGame} from "./systems/save.js"

initRenderer()
createPlayer(scene)
spawnEnemies(scene)

document.getElementById("bag").onclick=toggleInventory

function hud(){
document.getElementById("hp").innerText=stats.hp
document.getElementById("mana").innerText=stats.mana
document.getElementById("xp").innerText=stats.xp
document.getElementById("level").innerText=stats.level
}

function loop(){

updatePlayer()
updateEnemies(player)
updateCombat(player)
updateLoot()
updateInventory()
updateQuestUI()
updateMinimap(player,enemies)
hud()

renderer.render(scene,camera)
requestAnimationFrame(loop)

}

loadGame(stats)
loop()

window.onbeforeunload=()=>saveGame(stats)
*/