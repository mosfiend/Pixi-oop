import * as PIXI from "pixi.js"
import { Group } from "tweedle.js";
import { Viewport, click } from "pixi-viewport";
export class Manager {
     constructor() { 
     }
static currentScene;
static navBar;
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
        console.log(Manager.app)
    }

 static changeScene(newScene) {
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        Manager.currentScene = newScene;
        Manager.app.stage.addChildAt(Manager.currentScene, 0);
    }

 static annexes(navScene) {
    Manager.navbar = navScene;
    Manager.app.stage.addChild(Manager.navbar);
 }
 static _viewport
 static _application
 static domEase
 static FADE_TIME = 2000

static viewport() {
    Manager._viewport = Manager.app.stage.addChild(new Viewport(
         {
             interaction: Manager.app.renderer.plugins.interaction,
             passiveWheel: false,
             stopPropagation: true
         }))
    Manager._viewport
         .drag({ clampWheel: false })
         .wheel({ smooth: 3, trackpadPinch: true, wheelZoom: false, })
         .pinch()
         .decelerate()
 
     // test for x/y independent scaling
     // _viewport.scale.y = 1.5
 
     // test for removeListeners()
     // _viewport.removeListeners()
 
     // _viewport.clampZoom({ minWidth: 1000 })

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