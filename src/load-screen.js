import { Container, Graphics, Loader } from "pixi.js";
import { Manager } from "./manager.js";
import { Navbar } from "./navBar.js";
import { assets } from "./assets/assets.js";
import { WorldMap } from "./scenes/interactive-scene.js";
import * as viewport from "./map-drag.js"
export class LoaderScene extends Container {

    constructor() {
        super();
        const loaderBarWidth = Manager.width * 0.8;
    this.loaderBarFill = new Graphics();
        this.loaderBarFill.beginFill(0x008800, 1)
            .drawRect(0, 0, loaderBarWidth, 50)
            .endFill();
        this.loaderBarFill.scale.x = 0;
    this.loaderBarBoder = new Graphics();
        this.loaderBarBoder.lineStyle(10, 0x0, 1)
            .drawRect(0, 0, loaderBarWidth, 50);

        this.loaderBar = new Container();
        this.loaderBar.addChild(this.loaderBarFill);
        this.loaderBar.addChild(this.loaderBarBoder);
        this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
        this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
        this.addChild(this.loaderBar);

        Loader.shared.add(assets)
        Loader.shared.onProgress.add(this.downloadProgress.bind(this));
        Loader.shared.onComplete.once(this.gameLoaded.bind(this));
        Loader.shared.load();
    }
     downloadProgress(loader) {
        const progressRatio = loader.progress / 100;
        this.loaderBarFill.scale.x = progressRatio;
    }
     gameLoaded() {
        Manager.changeScene(new WorldMap());
        Manager.annexes(new Navbar())
        viewport.create(Manager.app.renderer)
 }
    update(deltaTime) {
    }
} 