import pixisrc from "./images/pixi.png"  // referencing this is the same as directly using an absolute path down there
import reactsrc from "./images/react.png" // for future reference: importing means relative path, using the url means absolute path
export const assets = [
    { name: "pixiIcon", url: './assets/images/pixi.png'},
    { name: "reactIcon", url: reactsrc },
    { name: "bat", url: "./assets/images/texture.json"},
    { name: "tileset", url: "./assets/images/tileset.json"},
    { name: "terrain", url: "./assets/images/terrain.json"},
]
