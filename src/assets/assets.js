import pixisrc from "./images/pixi.png"  // referencing this is the same as directly using an absolute path down there
import reactsrc from "./images/react.png" // for future reference: importing means relative path, using the url means absolute path
export const assets = [
    { name: "pixiIcon", url: './assets/images/pixi.png'},
    { name: "htmlIcon", url: './assets/images/html5.webp'},
    { name: "cssIcon", url: './assets/images/css3.webp'},
    { name: "reactIcon", url: reactsrc },
    { name: "bat", url: "./assets/images/texture.json"},
    { name: "tileset", url: "./assets/images/tileset.json"},
    { name: "terrain", url: "./assets/images/terrain.json"},
    //  Projects  scene
    { name: "pancreas", url: "./assets/images/projects/pancreas.png"},
    { name: "workout", url: "./assets/images/projects/workout.png"},
]
