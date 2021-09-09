var diepAPI;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Arena": () => (/* reexport */ Arena),
  "ArenaScaling": () => (/* reexport */ ArenaScaling),
  "CanvasKit": () => (/* reexport */ CanvasKit),
  "DiepGamepad": () => (/* reexport */ DiepGamepad),
  "Minimap": () => (/* reexport */ Minimap),
  "PlayerMovement": () => (/* reexport */ PlayerMovement),
  "Vector": () => (/* reexport */ Vector)
});

;// CONCATENATED MODULE: ./src/vector.ts
class Vector {
    x;
    y;
    /**
     * Vector is immutable
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        Object.freeze(this);
    }
    /**
     * Factory function
     *
     * @param {number} x
     * @param {number} y
     * @returns {Vector}
     */
    static from(x, y) {
        return new Vector(x, y);
    }
    /**
     * ( u1 ) + ( v1 ) = ( u1 + v1 )
     * ( u2 )   ( v2 )   ( u2 + v2 )
     *
     * @param {Vector} u
     * @param {Vector} v
     * @returns {Vector}
     */
    static add(u, v) {
        return new Vector(u.x + v.x, u.y + v.y);
    }
    /**
     * ( u1 ) - ( v1 ) = ( u1 - v1 )
     * ( u2 )   ( v2 )   ( u2 - v2 )
     *
     * @param {Vector} u
     * @param {Vector} v
     * @returns {Vector}
     */
    static subtract(u, v) {
        return new Vector(u.x - v.x, u.y - v.y);
    }
    /**
     * ( u1 ) * ( v1 ) = ( u1 * v1 )
     * ( u2 )   ( v2 )   ( u2 * v2 )
     *
     * @param {Vector} u
     * @param {Vector} v
     * @returns {Vector}
     */
    static multiply(u, v) {
        return new Vector(u.x * v.x, u.y * v.y);
    }
    /**
     * ( u1 ) / ( v1 ) = ( u1 / v1 )
     * ( u2 )   ( v2 )   ( u2 / v2 )
     *
     * @param {Vector} u
     * @param {Vector} v
     * @returns {Vector}
     */
    static divide(u, v) {
        return new Vector(u.x / v.x, u.y / v.y);
    }
    /**
     * r * ( v1 ) = ( r * v1 )
     *     ( v2 )   ( r * v2 )
     *
     * @param {number} r
     * @param {Vector} v
     * @returns {Vector}
     */
    static scale(r, v) {
        return new Vector(r * v.x, r * v.y);
    }
    /**
     *
     * @param {Vector} v
     * @returns {Vector}
     */
    static round(v) {
        return new Vector(Math.round(v.x), Math.round(v.y));
    }
    /**
     *
     * @param {Vector} v
     * @returns {number}
     */
    static len(v) {
        return Math.sqrt(v.x ** 2 + v.y ** 2);
    }
    /**
     *
     * @param {Vector} u
     * @param {Vector} v
     * @returns {number} The Euclidean distance between the two vectors
     */
    static distance(u, v) {
        return Vector.len(Vector.subtract(u, v));
    }
    /**
     * Calculates the [centroid](https://en.wikipedia.org/wiki/Centroid)
     *
     * @param  {...Vector} vertices
     * @returns {Vector}
     */
    static centroid(...vertices) {
        const sum = vertices.reduce((acc, vec) => Vector.add(acc, vec), new Vector(0, 0));
        const centroid = Vector.scale(1 / vertices.length, sum);
        return centroid;
    }
    /**
     *
     * @param  {...Vector} vertices
     * @returns {number}
     */
    static radius(...vertices) {
        const centroid = Vector.centroid(...vertices);
        const distance = vertices.reduce((acc, vec) => acc + Vector.distance(centroid, vec), 0);
        const radius = distance / vertices.length;
        return radius;
    }
}

;// CONCATENATED MODULE: ./src/canvasKit.mjs
class CanvasKit {
    /**
     * The consumer will be called before
     * @param {string} method
     * @param {Function} consumer The consumer with `(target, thisArg, args)` as arguments
     */
    static hook(method, consumer) {
        const target = window.CanvasRenderingContext2D.prototype;
        target[method] = new Proxy(target[method], {
            apply(target, thisArg, args) {
                consumer(target, thisArg, args);
                return Reflect.apply(target, thisArg, args);
            },
        });
    }

    /**
     * replaces the function. Use `return Reflect.apply(target, thisArg, args);` in
     * your function to call the original function.
     * @param {string} method
     * @param {Function} func The func with `(target, thisArg, args)` as arguments
     */
    static replace(method, func) {
        const target = window.CanvasRenderingContext2D.prototype;
        target[method] = new Proxy(target[method], {
            apply(target, thisArg, args) {
                func(target, thisArg, args);
            },
        });
    }

    /**
     * The consumer will be called before.
     * @param {Function} consumer The consumer with `(target, thisArg, args)` as arguments
     */
    static hookRAF(consumer) {
        window.requestAnimationFrame = new Proxy(window.requestAnimationFrame, {
            apply(target, thisArg, args) {
                consumer(target, thisArg, args);
                return Reflect.apply(target, thisArg, args);
            },
        });
    }
}

;// CONCATENATED MODULE: ./src/diepGamepad.mjs
class DiepGamepad {
    /**
     * Emulates a Gampad
     * when `gamepad.connected` is set to `true` the game will
     * ignore following keyboard inputs:
     * 		W, A, S, D, upArrow, leftArrow, downArrow, rightArray
     *      leftMouse, rightMouse, Spacebar, Shift,
     *      MouseMovement to change tank angle
     * these are also the only keys we emulate with this gamepad
     *
     */
    constructor() {
        this._axes = [0, 0, 0, 0];
        this._buttons = [...Array(17)].map((x) => {
            return { pressed: false };
        });
        this._connected = false;

        window.navigator.getGamepads = () => [this._connected ? this.toGamepad() : undefined];
    }

    set x(value) {
        this._axes[0] = value;
    }
    set y(value) {
        this._axes[1] = value;
    }
    set mx(value) {
        this._axes[2] = value;
    }
    set my(value) {
        this._axes[3] = value;
    }
    set leftMouse(value) {
        this._buttons[7].pressed = value;
    }
    set rightMouse(value) {
        this._buttons[6].pressed = value;
    }
    set connected(value) {
        this._connected = value;
    }

    get x() {
        return this._axes[0];
    }
    get y() {
        return this._axes[1];
    }
    get mx() {
        return this._axes[2];
    }
    get my() {
        return this._axes[3];
    }
    get leftMouse() {
        return this._buttons[7].pressed;
    }
    get rightMouse() {
        return this._buttons[6].pressed;
    }
    get connected() {
        return this._connected;
    }

    toGamepad() {
        return {
            axes: this._axes,
            buttons: this._buttons,
            mapping: 'standard',
        };
    }
}

;// CONCATENATED MODULE: ./src/minimap.mjs



let instance = null;

class Minimap {
    constructor() {
        if (instance) return instance;
        instance = this;

        this._minimapDim = new Vector(1, 1);
        this._minimapPos = new Vector(0, 0);

        this._viewportDim = new Vector(1, 1);
        this._viewPortPos = new Vector(0, 0);

        this._arrowPos = new Vector(0.5, 0.5);

        this._drawViewport = false;
        const int = setInterval(() => {
            if (window.input === undefined) return;
            clearInterval(int);
            window.input.set_convar('ren_minimap_viewport', true);
            window.input.set_convar = new Proxy(window.input.set_convar, {
                apply: (target, thisArg, args) => {
                    if (args[0] === 'ren_minimap_viewport') this._drawViewport = args[1];
                    else Reflect.apply(target, thisArg, args);
                },
            });
        }, 10);

        this._minimapHook();
        this._viewportHook();
        this._arrowHook();
    }

    get minimapDim() {
        return this._minimapDim;
    }

    get minimapPos() {
        return this._minimapPos;
    }

    get viewportDim() {
        return this._viewportDim;
    }

    get viewportPos() {
        return this._viewportPos;
    }

    /**
     * @returns The position of the arrow normalized to the range [0,1]
     */
    get arrowPos() {
        return this._arrowPos;
    }

    drawViewport(value) {
        this._drawViewport = value;
    }

    _minimapHook() {
        CanvasKit.hook('strokeRect', (target, thisArg, args) => {
            const transform = thisArg.getTransform();

            this._minimapDim = new Vector(transform.a, transform.d);
            this._minimapPos = new Vector(transform.e, transform.f);
        });
    }

    _viewportHook() {
        CanvasKit.replace('fillRect', (target, thisArg, args) => {
            const transform = thisArg.getTransform();

            if (
                Math.round((transform.a / transform.d) * 10_000) !==
                Math.round((window.innerWidth / window.innerHeight) * 10_000)
            ) {
                return Reflect.apply(target, thisArg, args);
            }
            if (transform.a >= window.innerWidth && transform.d >= window.innerHeight) {
                return Reflect.apply(target, thisArg, args);
            }

            this._viewportDim = new Vector(transform.a, transform.d);
            this._viewportPos = new Vector(transform.e, transform.f);

            if (this._drawViewport) return Reflect.apply(target, thisArg, args);
        });
    }

    _arrowHook() {
        let index = 0;

        let pointA;
        let pointB;
        let pointC;

        const calculatePos = () => {
            const side1 = Math.round(Vector.distance(pointA, pointB));
            const side2 = Math.round(Vector.distance(pointA, pointC));
            const side3 = Math.round(Vector.distance(pointB, pointC));
            if (side1 === side2 && side2 === side3) return;

            const centroid = Vector.centroid(pointA, pointB, pointC);
            const arrowPos = Vector.subtract(centroid, this._minimapPos);
            const position = Vector.divide(arrowPos, this._minimapDim);

            this._arrowPos = position;
        };

        CanvasKit.hook('beginPath', (target, thisArg, args) => {
            index = 1;
        });
        CanvasKit.hook('moveTo', (target, thisArg, args) => {
            if (index === 1) {
                index++;
                pointA = new Vector(args[0], args[1]);
                return;
            }
            index = 0;
        });
        CanvasKit.hook('lineTo', (target, thisArg, args) => {
            if (index === 2) {
                index++;
                pointB = new Vector(args[0], args[1]);
                return;
            }
            if (index === 3) {
                index++;
                pointC = new Vector(args[0], args[1]);
                return;
            }
            index = 0;
        });
        CanvasKit.hook('fill', (target, thisArg, args) => {
            if (index === 4) {
                index++;
                calculatePos();
                return;
            }
            index = 0;
        });
    }
}

;// CONCATENATED MODULE: ./src/arenaScaling.mjs



let arenaScaling_instance = null;

class ArenaScaling {
    constructor() {
        if (arenaScaling_instance) return arenaScaling_instance;
        arenaScaling_instance = this;

        this._scalingFactor = 1;

        CanvasKit.hook('stroke', (target, thisArg, args) => {
            if (thisArg.fillStyle === '#cdcdcd' && thisArg.globalAlpha !== 0) {
                this._scalingFactor = thisArg.globalAlpha * 10;
            }
        });
    }

    /**
     * @returns {number} The scaling factor
     */
    get scalingFactor() {
        return this._scalingFactor;
    }

    /**
     * @returns {number} The window ratio
     */
    get windowRatio() {
        return Math.max(window.innerWidth / 1920, window.innerHeight / 1080);
    }

    /**
     * @returns {number} The player fov
     */
    get fov() {
        return this.scalingFactor / this.windowRatio;
    }

    /**
     *
     * @param {Vector} v The vector in screen units
     * @returns {Vector} The vector in arena units
     */
    toArenaUnits(v) {
        return Vector.scale(1 / this._scalingFactor, v);
    }

    /**
     *
     * @param {Vector} v The vector in arena units
     * @returns {Vector} The vector in screen units
     */
    toScreenUnits(v) {
        return Vector.scale(this._scalingFactor, v);
    }
}

;// CONCATENATED MODULE: ./src/arena.mjs





let arena_instance = null;

class Arena {
    constructor() {
        if (arena_instance) return arena_instance;
        arena_instance = this;

        const minimap = new Minimap();
        const arenaScaling = new ArenaScaling();

        this._size = 1;

        CanvasKit.hookRAF((target, thisArg, args) => {
            const ratio = Vector.divide(minimap.minimapDim, minimap.viewportDim);
            const arenaDim = Vector.multiply(ratio, new Vector(window.innerWidth, window.innerHeight));
            const arenaSize = Vector.round(arenaScaling.toArenaUnits(arenaDim));
            this._size = arenaSize.x;
        });
    }

    /**
     * @returns {number} The Arena size in arena units
     */
    get size() {
        return this._size;
    }

    //These methods are not much used. can be moved to playerMovement.mjs where its currently only used.
    /**
     *
     * @param {Vector} vector The vector in [0, 1] coordinates
     * @returns {Vector} The scaled vector in [-Arena.size/2, Arena.size/2] coordinates
     */
    scale(vector) {
        const scale = (value) => Math.round(this._size * (value - 0.5));
        return new Vector(scale(vector.x), scale(vector.y));
    }
    /**
     *
     * @param {Vector} vector - The scaled vector in [-Arena.size/2, Arena.size/2] coordinates
     * @returns {Vector} The unscaled vector in [0, 1] coordinates
     */
    unscale(vector) {
        const unscale = (value) => value / this._size + 0.5;
        return new Vector(unscale(vector.x), unscale(vector.y));
    }
}

;// CONCATENATED MODULE: ./src/movement.mjs


class Movement {
    constructor() {
        this._position = new Vector(0, 0);
        this._velocity = new Vector(0, 0);

        this._velocitySamples = Array(10).fill(this._velocity);
        this._velocitySamplesIndex = 0;
        this._velocityLastTime = Date.now();
    }

    /**
     * @returns {Vector}
     */
    get position() {
        return this._position;
    }

    /**
     * @returns {Vector}
     */
    get velocity() {
        return this._velocity;
    }

    /**
     *
     * @param {Vector} newPos The new position
     */
    updatePos(newPos) {
        this._updateVelocity(newPos);
        this._position = newPos;
    }

    /**
     *
     * @param {Vector} newPos The new position
     * @private
     */
    _updateVelocity(newPos) {
        const timeNow = Date.now();
        const time = (timeNow - this._velocityLastTime) / 1000;
        this._velocityLastTime = timeNow;

        const velocity = Vector.scale(1 / time, Vector.subtract(newPos, this._position));

        // add current velocity to our samples array
        this._velocitySamples[this._velocitySamplesIndex] = velocity;
        this._velocitySamplesIndex = (this._velocitySamplesIndex + 1) % this._velocitySamples.length;

        // calculate the average velocity
        this._velocity = Vector.scale(
            1 / this._velocitySamples.length,
            this._velocitySamples.reduce((acc, x) => Vector.add(acc, x))
        );
    }
}

;// CONCATENATED MODULE: ./src/playerMovement.mjs





let playerMovement_instance = null;

class PlayerMovement extends Movement {
    /**
     * Using the minimap arrow to get the player position and velocity
     */
    constructor() {
        super();
        if (playerMovement_instance) return playerMovement_instance;
        playerMovement_instance = this;

        const minimap = new Minimap();
        const arena = new Arena();

        CanvasKit.hookRAF(() => {
            this.updatePos(arena.scale(minimap.arrowPos));
        });
    }
}

;// CONCATENATED MODULE: ./src/index.mjs










diepAPI = __webpack_exports__;
/******/ })()
;
window.diepAPI = diepAPI
