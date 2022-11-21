import './styles/style.scss'
import { Manager } from './manager.js'
import { LoaderScene } from './load-screen'
import { Viewport } from 'pixi-viewport'

Manager.initialize(window.innerWidth, window.innerHeight, 0x333377);


Manager.vp();
Manager.loadScene(new LoaderScene())
