import * as PIXI from 'pixi.js'
import { Tween, Easing } from "tweedle.js";
import { Manager } from "../manager.js"

export  class OrbitScene extends PIXI.Container {
constructor() {
    super()
    this.screenWidth = Manager.width
    this.screenHeight = Manager.height
    this.x = this.screenWidth/2
    this.y = 30
this.circle1 = new PIXI.Graphics()
this.circle2 = new PIXI.Graphics()
this.circle3 = new PIXI.Graphics()
this.circle4 = new PIXI.Graphics()
this.circle5 = new PIXI.Graphics()
this.circle6 = new PIXI.Graphics()
this.circle7 = new PIXI.Graphics()
this.circle1.beginFill(0x99EE00)
      .drawCircle(0, 0, 80)
this.circle2.beginFill(0x7BE801)
      .drawCircle(0, 0, 140)
this.circle3.beginFill(0x7BE801)
      .drawCircle(0, 0, 200)
this.circle4.lineStyle(10,  0x99EE00)
      .beginFill(0x7BE801)
      .drawCircle(0, 0, 260)
this.circle5.lineStyle(3, 0x99EE00)
      .drawCircle(0, 0, 350)
this.circle6.lineStyle(3, 0x99EE00)
      .drawCircle(0, 0, 450)
this.circle7.lineStyle(3, 0x99EE00)
      .drawCircle(0, 0, 560)
      this.circle2.alpha = 0.8
      this.circle3.alpha = 0.5
      this.circle4.alpha = 0.2
      this.circle5.alpha = 0.5
      this.circle6.alpha = 0.5
      this.circle7.alpha = 0.5
      this.addChild(this.circle7,this.circle6,this.circle5,this.circle4,this.circle3,this.circle2,this.circle1)
      this.mousePosX =0
      this.mousePosY =0

this.pixiContainer = new PIXI.Container()
this.reactContainer = new PIXI.Container()
this.addChild(this.pixiContainer, this.reactContainer)
this.pixiLogo = PIXI.Sprite.from("pixiIcon")
this.pixiLogo.height = 90
this.pixiLogo.width = 90
this.pixiLogo.anchor.set(0.5,0.5)
this.pixiLogo.x = 200
this.pixiLogo.y = 560
this.reactLogo = PIXI.Sprite.from("reactIcon")
this.reactLogo.height = 90
this.reactLogo.width = 90
this.reactLogo.anchor.set(0.5,0.5)
this.reactLogo.x = -447
this.reactLogo.y = 0
this.pixiContainer.addChild(this.pixiLogo)
this.reactContainer.addChild(this.reactLogo)
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
            this.circle1.x = curPos.cir1X
            this.circle2.x = curPos.cir2X
            this.circle3.x = curPos.cir3X
            this.circle4.x = curPos.cir4X
            this.circle5.x = curPos.cir5X
            this.circle6.x = curPos.cir6X
            this.circle7.x = curPos.cir7X

            this.circle1.y = curPos.cir1Y
            this.circle2.y = curPos.cir2Y
            this.circle3.y = curPos.cir3Y
            this.circle4.y = curPos.cir4Y
            this.circle5.y = curPos.cir5Y
            this.circle6.y = curPos.cir6Y
            this.circle7.y = curPos.cir7Y
            this.alpha = 0.6+ ((-this.screenHeight+30-this.circle1.y*16)/(-this.screenHeight+30))*0.4
      })
      .easing(Easing.Cubic.Out)
      .start()
}

update(deltaTime) {
 this.pixiContainer.angle += 1
 this.reactContainer.angle += 1
 this.pixiLogo.angle -=1
 this.reactLogo.angle -=1
this.pixiContainer.x = this.circle7.x
this.pixiContainer.y = this.circle7.y
this.reactContainer.x = this.circle6.x
this.reactContainer.y = this.circle6.y
 }
}