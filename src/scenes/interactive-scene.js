import * as PIXI from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';
import { Manager } from '../manager.js';
import { Tween, Easing} from 'tweedle.js';
import mapData from '../assets/data/map.json'
import { Viewport } from 'pixi-viewport';
export class WorldMap extends PIXI.Container {

constructor() {
    super();
//initialize drag
    Manager.viewport
     .drag()


this.screenWidth = Manager.width;
this.screenHeight = Manager.height;
this.batMovement = PIXI.Loader.shared.resources.bat.spritesheet.animations;
this.tileProps = PIXI.Loader.shared.resources.tileset.textures;
this.tilemap = new CompositeTilemap();
this.mapLayers = mapData.layers;
    for (let i =0;i< this.mapLayers.length;i++) {
    const curLayer = this.mapLayers[i]
    const tileW = curLayer["width"],  tileH = curLayer["height"]
  for (let j =0, curTile; j<curLayer["data"].length;j++) {
     curTile = curLayer["data"][j]
    if (curTile>10000) curTile =  this.extractTile(curTile)
    if(curTile !== 0) {this.tilemap.tile(String(curTile),
                                        (j%tileW)*32,
                                    Math.floor(j/tileW)*32)}
   }
}
    this.addChild(this.tilemap)

}

extractTile (id) {
let rotation = 0
let newId = id

    newId -= 0x80000000
if (id>0x40000000) {
    newId -= 0x40000000
    rotation = Math.PI/2
}
if (newId>0x20000000) {
    newId-= 0x20000000
    rotation = Math.PI
}
return newId
}

update(deltaTime) {
// const newBat = new PIXI.AnimatedSprite(this.batMovement.move_right)
// const moveInterval =  2000+ Math.floor(Math.random()*500)
// const randomDirection =[-1,1][Math.floor(Math.random()*2)]

// newBat.y = Manager.height/2 +Math.random()*Manager.height/4;
// newBat.animationSpeed = 0.1;

// newBat.play();
// new Tween(newBat)
// .to({x:Manager.width+1, y:newBat.y + randomDirection*Math.floor(Math.random()*400) }, moveInterval)
// .yoyo(true)
// .onComplete(()=> { 
//     newBat.destroy()
//     this.removeChild(newBat)})
// .start()
// this.addChild(newBat)
}
}