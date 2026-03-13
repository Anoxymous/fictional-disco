// App Info
const APP_TITLE = "Shadowwild";

// Style
import_CSS("styles.css");

// Libraries
import_JS("./ui/controls.js")


function main(app_area) 
{
	const controlls_config = [
					{ id: "Mve", name: "movement", coord: "5, -5,percent", size: "25,25,percent", type: "joystick", style: "touch-joystick" },
//					{ id: "Cam", name: "camera", coord: "+50,+50,percent", size: "30,30,percent", type: "D-Pad", style: "touch-joystick" },
					{ id: "Atk", name: "attack",  coord: "  -5,  -5,percent",  size: "15,15,percent", type: "button", style: "touch-button" },
					{ id: "S-1", name: "skill-1", coord: "  -5,  -27,percent", size: "10,10,percent", type: "button", style: "touch-button" },
					{ id: "S-2", name: "skill-2", coord: "  -5,  -40,percent", size: "10,10,percent", type: "button", style: "touch-button" },
					{ id: "S-3", name: "skill-3", coord: "  -5,  -53,percent", size: "10,10,percent", type: "button", style: "touch-button" },
					{ id: "S-4", name: "skill-4", coord: "  -5,  -66,percent", size: "10,10,percent", type: "button", style: "touch-button" },
					{ id: "B-1", name: "belt-1", coord: " +41, -5,percent", size: "10,10,percent", type: "button", style: "touch-button" },
					{ id: "B-2", name: "belt-2", coord: " +47, -5,percent", size: "10,10,percent", type: "button", style: "touch-button" },
					{ id: "B-3", name: "belt-3", coord: " +53, -5,percent", size: "10,10,percent", type: "button", style: "touch-button" },
					{ id: "B-4", name: "belt-4", coord: " +59, -5,percent", size: "10,10,percent", type: "button", style: "touch-button" },
					{ id: "m-1", name: "menu-1", coord: " 5, 5,percent", size: "10,10,percent", type: "button", style: "touch-button" },
					{ id: "m-2", name: "menu-1", coord: " -5, 5,percent", size: "10,10,percent", type: "button", style: "touch-button" },
			];

	setupControls(app_area, controlls_config)
}

function setupControls(app_area, config)
{
	const controls = new TouchControls();
	
	controls.onInput((id, data) => {
			console.log("Input:", id, data);
	});

	controls.init(app_area, config);

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