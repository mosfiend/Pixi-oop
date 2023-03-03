import * as PIXI from 'pixi.js'
import { DisplayObject } from 'pixi.js';
import { Tween, Easing, Group } from "tweedle.js";
import { Manager } from "../manager.js"

export class OrbitScene extends PIXI.Container {
 constructor(loading) {
    super();
    this.alpha = 0
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth/2;
    this.y = 30;
this.circle1 = new PIXI.Graphics();
this.circle2 = new PIXI.Graphics();
this.circle3 = new PIXI.Graphics();
this.circle4 = new PIXI.Graphics();
this.circle5 = new PIXI.Graphics();
this.circle6 = new PIXI.Graphics();
this.circle7 = new PIXI.Graphics();
this.circle1.beginFill(0x99EE00)
      .drawCircle(0, 0, 80)
this.circle2.beginFill(0x7BE801)
      .drawCircle(0, 0, 140)
this.circle3.beginFill(0x7BE801)
      .drawCircle(0, 0, 200)
this.circle4.lineStyle(3,  0x99EE00)
      .beginFill(0x7BE801)
      .drawCircle(0, 0, 260)
this.circle5.lineStyle(3, 0x99EE00)
      .drawCircle(0, 0, 350)
this.circle6.lineStyle(3, 0x99EE00)
      .drawCircle(0, 0, 450)
this.circle7.lineStyle(3, 0x99EE00)
      .drawCircle(0, 0, 560)

      this.circle1.alpha = 0.8
      this.circle2.alpha = 0.8
      this.circle3.alpha = 0.5
      this.circle4.alpha = 0.2
      this.circle5.alpha = 0.5
      this.circle6.alpha = 0.5
      this.circle7.alpha = 0.5
      this.addChild(this.circle7,this.circle6,this.circle5,this.circle4,this.circle3,this.circle2,this.circle1)
      this.mousePosX =0
      this.mousePosY =0
// this.x = Math.random()* circleHeight
// this.y = Equation(x)
if (PIXI.Loader.shared.progress=== 100) {
this.pixiContainer = new skillIcons("pixiIcon",this.circle7,557, 0.2+Math.random());
this.reactContainer = new skillIcons("reactIcon",this.circle6,447, 0.2+Math.random());
this.htmlContainer = new skillIcons("htmlIcon",this.circle5,347, 0.2+Math.random());
this.cssContainer = new skillIcons("cssIcon",this.circle4,257, 0.2+Math.random());
this.addChild(this.pixiContainer, this.reactContainer, this.htmlContainer, this.cssContainer)
            this.pixiContainer.popIn()
            .chain(this.reactContainer.popIn()
            .chain(this.htmlContainer.popIn()     
            .chain(this.cssContainer.popIn()))) 
            .start()
this.update = function(deltaTime) {
      this.pixiContainer.spin();
      this.reactContainer.spin();
      this.htmlContainer.spin();
      this.cssContainer.spin();
  }
 }
}

moveOrbits (X, Y) {
this.mousePosX = X
this.mousePosY = Y
let curPos = {
       cir1X:this.circle1.x, cir1Y:this.circle1.y,
       cir2X:this.circle2.x, cir2Y:this.circle2.y,
       cir3X:this.circle3.x, cir3Y:this.circle3.y,
       cir4X:this.circle4.x, cir4Y:this.circle4.y,
       cir5X:this.circle5.x, cir5Y:this.circle5.y,
       cir6X:this.circle6.x, cir6Y:this.circle6.y,
       cir7X:this.circle7.x, cir7Y:this.circle7.y,
      }
let finishPos = {
       cir1X:(X-this.x)/8   , cir1Y:(-Y+30)/16,
       cir2X:(X-this.x)/7.5 , cir2Y:(-Y+30)/15,
       cir3X:(X-this.x)/7   , cir3Y:(-Y+30)/14,
       cir4X:(X-this.x)/6.5 , cir4Y:(-Y+30)/13,
       cir5X:(X-this.x)/6   , cir5Y:(-Y+30)/12,
       cir6X:(X-this.x)/5   , cir6Y:(-Y+30)/10,
       cir7X:(X-this.x)/4   , cir7Y:(-Y+30)/8,
      }
const moveAll = new Tween(curPos)
      .to(finishPos, 500)
      .onUpdate(()=> {
            this.circle1.x = curPos.cir1X;
            this.circle2.x = curPos.cir2X;
            this.circle3.x = curPos.cir3X;
            this.circle4.x = curPos.cir4X;
            this.circle5.x = curPos.cir5X;
            this.circle6.x = curPos.cir6X;
            this.circle7.x = curPos.cir7X;

            this.circle1.y = curPos.cir1Y;
            this.circle2.y = curPos.cir2Y;
            this.circle3.y = curPos.cir3Y;
            this.circle4.y = curPos.cir4Y;
            this.circle5.y = curPos.cir5Y;
            this.circle6.y = curPos.cir6Y;
            this.circle7.y = curPos.cir7Y;
            this.alpha = 0.6+ ((-this.screenHeight+30-this.circle1.y*16)/(-this.screenHeight+30))*0.4;
      })
      .easing(Easing.Cubic.Out)
      .start()
}

transitionIn() {
      Manager.app.stage.addChildAt(Manager.skillScene,1) //Put in front of viewport, but behind navbar
      let updated = {alpha:this.alpha}
let fadeIn = new Tween(updated)
      if (PIXI.Loader.shared.progress<100) {
      PIXI.Loader.shared.onProgress.add(()=> {
            fadeIn
            .to({alpha:PIXI.Loader.shared.progress/100},400)
            .onUpdate(()=> {
                  this.alpha = updated.alpha
                  })
            .onComplete(()=> {
                  Manager.app.stage.on("mousemove", ()=>{
                        this.moveOrbits(...Manager.mouseCoordinates())});
                  
            })
            .start()
      })
      PIXI.Loader.shared.onComplete.once(()=> {

            this.pixiContainer = new skillIcons("pixiIcon",this.circle7,557, 0.2+Math.random()/2, 0);
            this.reactContainer = new skillIcons("reactIcon",this.circle6,447, 0.2+Math.random()/2, 0);
            this.htmlContainer = new skillIcons("htmlIcon",this.circle5,347, 0.2+Math.random()/2, 0);
            this.cssContainer = new skillIcons("cssIcon",this.circle4,257, 0.2+Math.random()/2, 0);
            this.addChild(this.pixiContainer, this.reactContainer, this.htmlContainer, this.cssContainer)
            this.pixiContainer.popIn()
            .chain(this.reactContainer.popIn()
            .chain(this.htmlContainer.popIn()     
            .chain(this.cssContainer.popIn()))) 
            .start()
            this.update= function(deltaTime) {
                  this.pixiContainer.spin();
                  this.reactContainer.spin();
                  this.htmlContainer.spin();
                  this.cssContainer.spin();
             }   
      })
      }
      else {
fadeIn
.to({alpha:1},400)
.onUpdate(()=> {
      this.alpha = updated.alpha;
      })
.onComplete(()=> {
      Manager.app.stage.on("mousemove", ()=>{
            this.moveOrbits(...Manager.mouseCoordinates())});
//       Manager.app.stage.on("pointerdown", ()=>{
// new Tween(this)
// .to({scale:1},300)
// .start()
// .repeat(1)
// .yoyo(true)
// .start()
// })
})
.start()
}
}

transitionOut() {
      const alpha = this.alpha
      const fadeOut=    new Tween(this.circle1.scale)
      .to({x:12,y:12},900)
      .onUpdate(()=> {
            this.circle2.scale = this.circle1.scale*0.7
            this.circle3.scale = this.circle1.scale*0.6
            this.circle4.scale = this.circle1.scale*0.5
this.alpha = alpha*((12-this.circle1.scale.x)/12)

      })
      .onComplete(()=> {
            Manager.skillScene.destroy();
            Manager.app.stage.removeChild(Manager.skillScene);
              })
      .easing(Easing.Quadratic.InOut)

              Manager.app.stage.off("mousemove")
              fadeOut.start()
}
downloadProgress(loader) {
      const progressRatio = loader.progress / 100;
  }

resize(w,h) {
      this.screenWidth = w
      this.screenHeight = h
this.x = this.screenWidth/2

}
update(deltaTime) {
 }
}

export class skillIcons extends PIXI.Container {
      constructor(sprite,circle, R, speed) {
            super();
            this.alpha = 0
            this.speed= speed
            this.spriteName= sprite
            this.circle = circle
            this[sprite] = PIXI.Sprite.from(sprite);
            this[sprite].height = 90;
            this[sprite].width = 90;
            this[sprite].anchor.set(0.5,0.5);
            this[sprite].x = Math.round(Math.random()*R) * Math.sign(0.5-Math.random());
            this[sprite].y = this.getCircleY(this[sprite].x, circle.x, circle.y, R);
            this.addChild(this[sprite])
      }

spin () {
this.angle+=this.speed
this[this.spriteName].angle-=this.speed
this.x= this.circle.x
this.y= this.circle.y
}
getCircleY  (iconX, X1,Y1, r) {
      const delta = 4*Y1**2 - 4*((iconX-X1)**2 + Y1**2 - r**2)
      if (delta ===0) {
            return Y1}
      else if (delta >0) {
                  return  (2*Y1 + Math.sqrt(delta))/2
      }
      else if (delta <0) {console.log("error shoulna happened")}
                              }

  popIn()  {
      return new Tween(this)
      .to({alpha:1},300)
}
}