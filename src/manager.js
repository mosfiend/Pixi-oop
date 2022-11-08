import * as PIXI from "pixi.js"
import { Group } from "tweedle.js";
import { Viewport } from "pixi-viewport";
export class Manager {
     constructor() { 
        console.log(Viewport,
            Viewport.constructor, new Viewport())
     }
     static viewport;
     static navBar;
     static currentScene;


// With getters but not setters, these variables become read-only
 static get width() {
        return Manager._width;
    }
 static get height() {
        return Manager._height;
    }

    // Use this function ONCE to start the entire machinery
 static initialize(width, height, background) {

        // store our width and height
        Manager._width = width;
        Manager._height = height;

        // Create our pixi app
        Manager.app = new PIXI.Application({
            view: document.getElementById("pixi-canvas"),
            resizeTo: window,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });
        Manager.app.stage.interactive = true  
        Manager.app.stage.buttonMode = true;
        Manager.app.stage.sortableChildren = true;

        Manager.app.stage.on("mousemove", Manager.mouseCoordinates)
        Manager.app.ticker.add(Manager.update)
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
 
 static changeScene(newScene, parent) {
    if (Manager.currentScene) {
       if (parent === "viewport") Manager.app.stage.removeChild(Manager.currentScene);
       else                       Manager.viewport.removeChild(Manager.currentScene); 

        Manager.currentScene.destroy();

    
    }

    Manager.currentScene = newScene;
    if (parent == "viewport")     Manager.viewport.addChildAt(Manager.currentScene, 0);
    else                          Manager.app.stage.addChildAt(Manager.currentScene, 0);
    ; 
}

 
 static mouseCoordinates () {
  let localMousePos =  Manager.app.renderer.plugins.interaction.mouse.global
  if (Manager.currentScene.moveOrbits) Manager.currentScene.moveOrbits(localMousePos.x, localMousePos.y)
  }
static update(deltaTime) {
      if (Manager.currentScene) {
            Manager.currentScene.update(deltaTime)
        }
      if (Manager.navBar) {
            Manager.navBar.update(deltaTime)
        }
    }
}