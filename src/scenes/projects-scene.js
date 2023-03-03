import * as PIXI from "pixi.js"
import { Easing, Tween } from "tweedle.js";
import { Manager } from "../manager";
export class ProjectScene extends PIXI.Container {
    constructor() {
        super();
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.x = this.screenWidth > 780 ? (this.screenWidth / 2) : 0;
        this.projects = [];
        this.projectsContainer = new PIXI.Container();
        // this.contactForm = new Contact(this.x, this.screenHeight);
        this.projectHeight = 500;
        this.carouselHeight = (this.projectHeight + 50) * 3 /*Number of projects, no idea how to implement this organically*/
        this.terrainStart = (this.screenHeight - this.carouselHeight) / 2
        this.terrainEnd = (this.screenHeight + this.carouselHeight) / 2
        // I could position the projects one by one and only assign a value to this variable afterwards. However I doubt I will be changing 
        // its value around a lot, so it's doing just fine for now
        this.projects.push(new Project("pancreas", this.projects.length, this.projectHeight, this.terrainStart, this.terrainEnd, this.carouselHeight, "https://mosted.itch.io/pancreas"));
        this.projects.push(new Project("workout",  this.projects.length, this.projectHeight, this.terrainStart, this.terrainEnd, this.carouselHeight, "https://adoring-agnesi-1cfb67.netlify.app/"));
        this.projects.push(new Project("pancreas", this.projects.length, this.projectHeight, this.terrainStart, this.terrainEnd, this.carouselHeight));

        this.projects.forEach(project => { this.addChild(project) });
        // this.contactForm.interactive = true;
        // this.contactForm.buttonMode = true;
        // this.addChild(this.contactForm);
    }

    update(deltaTime) {
        for (let i = 0; i < this.projects.length; i++) {
        for (let i = 0; i < this.projects.length; i++) {
            this.projects[i].update()
        }
    }
    }

    resize() {
        this.screenWidth = Manager.width;
        this.screenHeight = Manager.height;
        this.x = this.screenWidth > 780 ? (this.screenWidth / 2) : 0;
        this.contactForm.resize();
    }
    transitionIn() {
        Manager.app.stage.addChildAt(Manager.projectScene, 1)
        //   new Tween()
        //   .to({alpha:PIXI.Loader.shared.progress/100},400)
        //   .onUpdate(()=> {
        //         this.alpha = updated.alpha
        //         })
        //   .onComplete(()=> {
        //         Manager.app.stage.on("mousemove", ()=>{
        //               this.moveOrbits(...Manager.mouseCoordinates())});
        //   })
        //   .start()
    }

    transitionOut() {
        Manager.projectScene.destroy();
        Manager.app.stage.removeChild(Manager.skillScene);

    }
}
export class Project extends PIXI.Container {
    constructor(sprite, index, height, terrainStart, terrainEnd, carouselHeight, url) {
        super();
        this.terrainStart = terrainStart;
        this.terrainEnd = terrainEnd;
        this.carouselHeight = carouselHeight
        this.sprite = PIXI.Sprite.from(sprite);
        this.sprite.x = 0;
        this.sprite.y = 0;
        // this.sprite.width = 500;
        // this.sprite.height = height;
        this.y = this.terrainStart + (height + 50) * index; //position relative to overall carousel height
        this.parallelogram = new PIXI.Graphics();
        this.parallelogram.beginFill(0xffff00);
        this.parallelogram.drawRect(0, 0, 500, height);
        this.parallelogram.skew.x = -Math.PI / 9;
        this.sprite.mask = this.parallelogram;
        this.addChild(this.sprite, this.parallelogram);
this.interactive = true;
this.buttonMode = true;
        this.on('click', function(){
    //check if user has clicked on slide
        //redirect user to desired link
        window.open(url,'_blank')
});
    }

    update(deltaTime) {
        this.y += 2

        if ((this.y) > this.terrainEnd) {
            this.y = this.terrainStart
        }
    }
}

// export class Contact extends PIXI.Container {
//     constructor(width, height) {
//         super();
//         this.rectangle = false;
//         this.x = 200
//         this.screenWidth = Manager.width;
//         this.screenHeight = Manager.height;
//         this.background = new PIXI.Graphics();
//         this.background.beginFill(0x1F1F33)
//             .drawRect(this.screenHeight * Math.tan(-Math.PI / 9), 0, this.screenWidth, this.screenHeight);
//         this.message = new PIXI.Text("Interested in what you see? Contact me!",
//             { align: 'center', fontSize: 24, fill: 0xeeeeee, wordWrap: true, wordWrapWidth: 150 })
//         this.parallelogram = new PIXI.Graphics();
//         this.parallelogram.beginFill();
//         this.parallelogram.drawRect(0, 0, 200, this.screenHeight);
//         this.parallelogram.skew.x = -Math.PI / 9
//         this.mask = this.parallelogram
//         this.addChild(this.background, this.message, this.parallelogram)
//         this.on("pointerdown", () => { this.rectangle ? this.unrectangalize() : this.rectangalize() })
//     }

//     update(deltaTime) {
//     }

//     resize() {
//     }

//     rectangalize() {
//         this.rectangle = true;

//         const stuffToChange = {
//             x: this.x,
//             skew: this.parallelogram.skew.x,
//             width: this.background.width,
//             scale: 1
//         }

//         const changeTo = {
//             x: this.screenHeight * Math.tan(-Math.PI / 9),
//             skew: 0,
//             width: this.screenWidth / 2
//         }
//         const enlargeForm = new Tween(stuffToChange)
//             .to(changeTo, 600)
//             .onUpdate(() => {
//                 this.parallelogram.x = stuffToChange.x
//                 this.parallelogram.skew.x = stuffToChange.skew
//             })
//         enlargeForm.start()
//     }
//     unrectangalize() {
//         this.rectangle = false;
//         const stuffToChange = {
//             x: 0,
//             skew: this.parallelogram.skew.x,
//             width: this.background.width,
//         }

//         const changeTo = {
//             x: 0,
//             skew: -Math.PI / 9,
//             width: 200,
//         }
//         const enlargeForm = new Tween(stuffToChange)
//             .to(changeTo, 600)
//             .onUpdate(() => {
//                 this.x = stuffToChange.x
//                 this.parallelogram.skew.x = stuffToChange.skew
//             })
//         enlargeForm.start()
//     }
// }