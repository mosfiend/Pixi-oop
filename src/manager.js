import * as PIXI from "pixi.js";
import {Tween, Group } from "tweedle.js";
import { Viewport } from "pixi-viewport";
import { Navbar } from "./navBar.js";
import { assets } from "./assets/assets.js";
import { OrbitScene } from "./scenes/orbit-scene.js";
import { ProjectScene } from "./scenes/projects-scene.js";
export class Manager {
     constructor() { 
     }
     static viewport;
     static navBar;
     static mapScene;
     static skillScene;
     static projectScene;
     static currentScene;
     static x;
     static y;

// With getters but not setters, these variables become read-only
 static get width() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
 static get height() {
        return Math.max(document.documentElement.clientHeight, window.innerWidth || 0);
    }
    
    // Use this function ONCE to start the entire machinery
 static initialize(width, height, background) {

        // store our width and height
        Manager._width = width;
        Manager._height = height;

        // Create our pixi app
        Manager.app = new PIXI.Application({
        view: document.getElementById("pixi-canvas"),
        resizeTo: window, // This line here handles the actual resize!
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        backgroundColor: background
        });
        Manager.app.stage.interactive = true  
        Manager.app.stage.sortableChildren = true;

        Manager.app.ticker.add(Manager.update)
        window.addEventListener("resize", Manager.resize);
    }

     static resize() {
        if (Manager[Manager.currentScene]) {
            Manager[Manager.currentScene].resize(Manager.width, Manager.height);
        }
        Manager.navbar.resize(Manager.width,Manager.height)
    }
static vp() {
 Manager.viewport = new Viewport({
        screenWidth: window.innerWidth,              // screen width used by viewport (eg, size of canvas)
        screenHeight: window.innerHeight,            // screen height used by viewport (eg, size of canvas)
        worldWidth: Manager.width,                         // world width used by viewport (automatically calculated based on container width)
        worldHeight: Manager.height,                       // world height used by viewport (automatically calculated based on container height)
        passiveWheel: false,                            // whether the 'wheel' event is set to passive (note: if false, e.preventDefault() will be called when wheel is used over the viewport)
        // stopPropagation: false,                      // whether to stopPropagation of events that impact the viewport (except wheel events, see options.passiveWheel)
        // forceHitArea: null,                          // change the default hitArea from world size to a new value
        // noTicker: false,                             // set this if you want to manually call update() function on each frame
        // divWheel: null,                              // div to attach the wheel event (uses document.body as default)
        // disableOnContextMenu: false,                 // remove oncontextmenu=() => {} from the divWheel element
        interaction: Manager.app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })
Manager.app.stage.addChildAt(Manager.viewport, 0) // could have just used addChild, just being safe
 }

 static annexes(navScene) {
    Manager.navbar = navScene;
    Manager.app.stage.addChild(Manager.navbar);
 }
static startLoading() {
function gameLoaded() {
    Manager.annexes(new Navbar());
    Manager.startScene(new ProjectScene());
}
PIXI.Loader.shared.add(assets);
    PIXI.Loader.shared.onComplete.once(gameLoaded)
    PIXI.Loader.shared.load();
}

static startScene(scene1) {
    Manager.currentScene = "projectScene"
    Manager.projectScene = scene1
    Manager.projectScene.transitionIn()
    // Manager.currentScene = "skillScene"
    // Manager.skillScene = scene1
    // Manager.skillScene.transitionIn()
}

static changeScene(scene, name) {  
    Manager[name] = scene
    Manager[Manager.currentScene].transitionOut()
    Manager.currentScene = name
    Manager[Manager.currentScene].transitionIn()
    }

static mouseCoordinates () {
  let mousePos =  Manager.app.renderer.plugins.interaction.mouse.global;
    return [mousePos.x, mousePos.y]
}

static update(deltaTime) {
    Group.shared.update()
      if (Manager.currentScene) {
            Manager[Manager.currentScene].update(deltaTime)
        }

      if (Manager.navBar) {
            Manager.navBar.update(deltaTime)
        }
    }
}