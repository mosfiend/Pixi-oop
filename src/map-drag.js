import { Manager } from "./manager"
import { Viewport } from "pixi-viewport"

export function create(renderer) {
    // create the viewport
    // viewport = new Viewport({    // use with modern build toolchain
    viewport = new Viewport({
        // screenWidth: window.innerWidth,              // screen width used by viewport (eg, size of canvas)
        // screenHeight: window.innerHeight,            // screen height used by viewport (eg, size of canvas)
        worldWidth: Manager.width,                        // world width used by viewport (automatically calculated based on container width)
        worldHeight: Manager.height,                      // world height used by viewport (automatically calculated based on container height)
        // threshold: 5,                                // number of pixels to move to trigger an input event (e.g., drag, pinch) or disable a clicked event
        passiveWheel: false,                            // whether the 'wheel' event is set to passive (note: if false, e.preventDefault() will be called when wheel is used over the viewport)
        // stopPropagation: false,                      // whether to stopPropagation of events that impact the viewport (except wheel events, see options.passiveWheel)
        // forceHitArea: null,                          // change the default hitArea from world size to a new value
        // noTicker: false,                             // set this if you want to manually call update() function on each frame
        // ticker: PIXI.Ticker.shared,                  // use this PIXI.ticker for updates
        interaction: Manager.app.renderer.plugins.interaction,   // InteractionManager, available from instantiated WebGLRenderer/CanvasRenderer.plugins.interaction - used to calculate pointer position relative to canvas location on screen
        // divWheel: null,                              // div to attach the wheel event (uses document.body as default)
        // disableOnContextMenu: false,                 // remove oncontextmenu=() => {} from the divWheel element
    })

    viewport
        .drag({
            direction: 'all',                // (x, y, or all) direction to drag
            pressDrag: true,                 // whether click to drag is active
            wheel: true,                     // use wheel to scroll in direction (unless wheel plugin is active)
            wheelScroll: 1,                  // number of pixels to scroll with each wheel spin
            reverse: false,                  // reverse the direction of the wheel scroll
            clampWheel: false,               // clamp wheel (to avoid weird bounce with mouse wheel)
            underflow: 'center',             // (top-left, top-center, etc.) where to place world if too small for screen
            factor: 1,                       // factor to multiply drag to increase the speed of movement
            mouseButtons: 'all',             // changes which mouse buttons trigger drag, use: 'all', 'left', right' 'middle', or some combination, like, 'middle-right'; you may want to set viewport.options.disableOnContextMenu if you want to use right-click dragging
            keyToPress: null,                // array containing https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code codes of keys that can be pressed for the drag to be triggered, e.g.: ['ShiftLeft', 'ShiftRight'}
            ignoreKeyToPressOnTouch: false,  // ignore keyToPress for touch events
            lineHeight: 20,                  // scaling factor for non-DOM_DELTA_PIXEL scrolling events (used for firefox mouse scrolling)
        })
        
    // stars(viewport, STAR_SIZE, BORDER)
    // target.setup(viewport)
    // border(viewport, BORDER)

    // fit and center the world into the panel
    viewport.fit()
    viewport.moveCenter(Manager.width / 2, Manager.height / 2)
}
