"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __importStar(require("pixi.js"));
var gsap_1 = __importDefault(require("gsap"));
var app;
var background;
var door;
var handle;
var handleShadow;
var doorOpen;
var doorOpenShadow;
var blink1;
var blink2;
var blink3;
var blink_texture;
var timeCounter = 0;
var timeText;
var timerInterval;
var pathPrefix = '../assets/';
var fileExtension = '.png';
var assets = {
    bgAsset: 'bg',
    doorAsset: 'door',
    doorOpenAsset: 'doorOpen',
    doorOpenShadowAsset: 'doorOpenShadow',
    handleAsset: 'handle',
    handleShadowAsset: 'handleShadow',
    blinkAsset: 'blink'
};
var directions = ["clockwise", "counterclockwise"];
window.onload = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, start()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getTimerFontSize = function () { return Math.min(background.width, background.height) * 0.016; };
var createCounterText = function () {
    timeText = new PIXI.Text(formatTime(timeCounter), { fontFamily: 'Arial', fontSize: getTimerFontSize(), fill: '#ffffff' });
    timeText.position.set(background.x - background.width * 0.203, background.y - background.height * 0.059);
    app.stage.addChild(timeText);
};
var updateCounterText = function () {
    timeText.text = formatTime(timeCounter);
};
var formatTime = function (timeCounter) {
    var minutes = Math.floor(timeCounter / 60);
    var seconds = timeCounter % 60;
    return "".concat(minutes, ":").concat(seconds.toString().padStart(2, '0'));
};
var startTimer = function () {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(function () {
        timeCounter++;
        updateCounterText();
    }, 1000);
};
var updateTimerStylesAndPosition = function () {
    timeText.style.fontSize = "".concat(getTimerFontSize(), "px");
    timeText.position.set(background.x - background.width * 0.203, background.y - background.height * 0.059);
};
var loadAsset = function (pathPrefix, asset, fileExtension) { return __awaiter(void 0, void 0, void 0, function () {
    var assetPath, texture;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                assetPath = "".concat(pathPrefix).concat(asset).concat(fileExtension);
                return [4 /*yield*/, PIXI.Assets.load(assetPath)];
            case 1:
                texture = _a.sent();
                return [2 /*return*/, texture];
        }
    });
}); };
var loadAssets = function (bgAsset, doorAsset, handleAsset, handleShadowAsset, doorOpenAsset, doorOpenShadowAsset, blinkAsset) { return __awaiter(void 0, void 0, void 0, function () {
    var assetsToLoad, _a, bgTexture, doorTexture, handleTexture, handleShadowTexture, doorOpenTexture, doorOpenShadowTexture, blinkTexture, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                assetsToLoad = [
                    loadAsset(pathPrefix, bgAsset, fileExtension),
                    loadAsset(pathPrefix, doorAsset, fileExtension),
                    loadAsset(pathPrefix, handleAsset, fileExtension),
                    loadAsset(pathPrefix, handleShadowAsset, fileExtension),
                    loadAsset(pathPrefix, doorOpenAsset, fileExtension),
                    loadAsset(pathPrefix, doorOpenShadowAsset, fileExtension),
                    loadAsset(pathPrefix, blinkAsset, fileExtension),
                ];
                return [4 /*yield*/, Promise.all(assetsToLoad)];
            case 1:
                _a = _b.sent(), bgTexture = _a[0], doorTexture = _a[1], handleTexture = _a[2], handleShadowTexture = _a[3], doorOpenTexture = _a[4], doorOpenShadowTexture = _a[5], blinkTexture = _a[6];
                background = new PIXI.Sprite(bgTexture);
                door = new PIXI.Sprite(doorTexture);
                handle = new PIXI.Sprite(handleTexture);
                handleShadow = new PIXI.Sprite(handleShadowTexture);
                doorOpen = new PIXI.Sprite(doorOpenTexture);
                doorOpenShadow = new PIXI.Sprite(doorOpenShadowTexture);
                blink_texture = blinkTexture;
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateBackground = function () {
    background.anchor.set(0.5);
    var scale = 1.0; // Default scale
    // Check if it's on laptop or mobile landscape orientation
    if (app.renderer.width > app.renderer.height || app.renderer.width >= 800) {
        // Landscape orientation on mobile or laptop
        scale = app.renderer.width / background.texture.width;
    }
    else {
        // Portrait orientation on mobile or smaller screens
        var minDimension = Math.min(app.renderer.width, app.renderer.height); // Find the minimum dimension of the screen
        scale = minDimension / Math.max(background.texture.width, background.texture.height); // Scale based on the smaller dimension
    }
    // Prevent elements from going off-screen on smaller devices
    var maxScale = 1.0;
    background.scale.set(Math.min(scale, maxScale));
    background.position.set(app.renderer.width / 2, app.renderer.height / 2);
};
var updateDoor = function () {
    door.anchor.set(0.5);
    door.width = background.width / 3;
    door.height = background.height / 1.6;
    door.position.set(background.x * 1.015, background.y * 0.99);
};
var updateHandle = function () {
    handle.anchor.set(0.5);
    handle.width = door.width * 0.35;
    handle.height = door.height * 0.4;
    handle.position.set(door.position.x * 0.97, door.position.y);
    handle.interactive = true;
};
var updateHandleShadow = function () {
    handleShadow.anchor.set(0.5);
    handleShadow.width = handle.width;
    handleShadow.height = handle.height;
    handleShadow.position.set(handle.position.x * 1.01, handle.position.y);
};
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, initializeApp()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log("Failed to initialize application! Exiting...", error_3);
                return [2 /*return*/];
            case 3:
                startGame();
                return [2 /*return*/];
        }
    });
}); };
var startGame = function (winner) { return __awaiter(void 0, void 0, void 0, function () {
    var bgAsset, doorAsset, doorOpenAsset, doorOpenShadowAsset, handleAsset, handleShadowAsset, blinkAsset, error_4, code, clicks, counter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bgAsset = assets.bgAsset, doorAsset = assets.doorAsset, doorOpenAsset = assets.doorOpenAsset, doorOpenShadowAsset = assets.doorOpenShadowAsset, handleAsset = assets.handleAsset, handleShadowAsset = assets.handleShadowAsset, blinkAsset = assets.blinkAsset;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, loadAssets(bgAsset, doorAsset, handleAsset, handleShadowAsset, doorOpenAsset, doorOpenShadowAsset, blinkAsset)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log("Failed to load assets!", error_4);
                return [2 /*return*/];
            case 4:
                updateBackground();
                updateDoor();
                updateHandle();
                updateHandleShadow();
                app.stage.addChild(background);
                app.stage.addChild(door);
                app.stage.addChild(handleShadow);
                app.stage.addChild(handle);
                if (!winner) return [3 /*break*/, 7];
                return [4 /*yield*/, closeDoor()];
            case 5:
                _a.sent();
                return [4 /*yield*/, lockSafe()];
            case 6:
                _a.sent();
                timeCounter = 0;
                updateCounterText();
                _a.label = 7;
            case 7:
                createCounterText();
                startTimer();
                code = generateRandomCode();
                console.log(code);
                clicks = 1, counter = 0;
                handle.on('pointerdown', function (event) { return __awaiter(void 0, void 0, void 0, function () {
                    var clickPositionX, rotationSide, targetRotation, curRotation;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!handle.interactive)
                                    return [2 /*return*/];
                                handle.interactive = false;
                                clickPositionX = event.data.global.x - handle.x;
                                rotationSide = handle.rotation;
                                targetRotation = clickPositionX < 0 ? rotationSide - Math.PI / 3 : rotationSide + Math.PI / 3;
                                curRotation = clickPositionX < 0 ? directions[1] : directions[0];
                                return [4 /*yield*/, Promise.all([
                                        gsap_1.default.to(handle, { rotation: targetRotation, duration: 1 }),
                                        gsap_1.default.to(handleShadow, { rotation: targetRotation, duration: 1 })
                                    ])];
                            case 1:
                                _b.sent();
                                (_a = handleRotation(code, clicks, counter, curRotation), clicks = _a.clicks, counter = _a.counter);
                                handle.interactive = true;
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
var initializeApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            app = new PIXI.Application({ background: "transparent", resizeTo: window });
            document.body.appendChild(app.view);
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
var handleRotation = function (code, clicks, counter, curRotation) {
    if (isIncorrectDirection(code, counter, curRotation)) {
        console.log("Restarting...");
        lockSafe().then(function () {
            resetGame(false);
        });
    }
    else {
        if (isClickCountLessThanRequired(code, clicks, counter)) {
            clicks++;
        }
        else {
            if (isCounterWithinBounds(code, counter)) {
                counter++;
                clicks = 1;
            }
            else {
                console.log("You successfully unlocked the safe for ".concat(formatTime(timeCounter), " seconds!"));
                win().then(function () {
                    resetGame(true);
                });
            }
        }
    }
    return { clicks: clicks, counter: counter };
};
var isIncorrectDirection = function (code, counter, curRotation) { return code[counter].dir !== curRotation; };
var isClickCountLessThanRequired = function (code, clicks, counter) { return clicks < code[counter].rotations; };
var isCounterWithinBounds = function (code, counter) { return counter < code.length - 1; };
var resetGame = function (winner) {
    app.stage.removeChild(background);
    app.stage.removeChild(timeText);
    if (!winner) {
        app.stage.removeChild(door);
        app.stage.removeChild(handleShadow);
        app.stage.removeChild(handle);
    }
    startGame(winner);
};
var generateRandomCode = function () {
    return [
        { rotations: Math.floor(Math.random() * 9) + 1, dir: directions[Math.floor(Math.random() * directions.length)] },
        { rotations: Math.floor(Math.random() * 9) + 1, dir: directions[Math.floor(Math.random() * directions.length)] },
        { rotations: Math.floor(Math.random() * 9) + 1, dir: directions[Math.floor(Math.random() * directions.length)] },
    ];
};
var lockSafe = function () {
    return new Promise(function (resolve) {
        gsap_1.default.to([handle, handleShadow], { rotation: handle.rotation + Math.PI * 12, duration: 4, onComplete: resolve });
    });
};
var createBlink = function () {
    var newBlink = new PIXI.Sprite(blink_texture);
    newBlink.anchor.set(0.5);
    newBlink.width = handle.width;
    newBlink.height = newBlink.width;
    return newBlink;
};
var glitterAnimation = function (blink) {
    return gsap_1.default.timeline({ repeat: 1, repeatDelay: 0.5 })
        .to(blink, { alpha: 0, duration: 1 })
        .to(blink, { alpha: 1, duration: 1 });
};
var win = function () {
    doorOpen.anchor.set(0.5);
    doorOpen.position.set(door.x + door.width / 1.5, door.y);
    doorOpen.scale.set(door.scale.x, door.scale.y);
    doorOpen.alpha = 0;
    doorOpenShadow.anchor.set(0.5);
    doorOpenShadow.position.set(door.x + door.width / 1.4, door.y * 1.05);
    doorOpenShadow.scale.set(door.scale.x, door.scale.y);
    doorOpenShadow.alpha = 0;
    blink1 = createBlink();
    blink2 = createBlink();
    blink3 = createBlink();
    blink1.position.set(door.x * 0.81, door.y);
    blink2.position.set(door.x * 0.96, door.y);
    blink3.position.set(door.x * 1.04, door.y + (door.height * 0.25));
    app.stage.addChild(blink1);
    app.stage.addChild(blink2);
    app.stage.addChild(blink3);
    app.stage.addChild(doorOpenShadow);
    app.stage.addChild(doorOpen);
    glitterAnimation(blink1);
    glitterAnimation(blink2);
    glitterAnimation(blink3);
    return new Promise(function (resolve) { return gsap_1.default.to([handle, handleShadow, door], {
        alpha: 0, duration: 1, onComplete: function () {
            app.stage.removeChild(handle);
            app.stage.removeChild(handleShadow);
            app.stage.removeChild(door);
            gsap_1.default.to([doorOpen, doorOpenShadow], {
                alpha: 1, duration: 1, onComplete: function () {
                    resolve();
                }
            });
        }
    }); });
};
var closeDoor = function () {
    door.alpha = 0;
    handle.alpha = 0;
    handleShadow.alpha = 0;
    return new Promise(function (resolve) { return gsap_1.default.to([blink1, blink2, blink3, doorOpen, doorOpenShadow], {
        alpha: 0, duration: 1, onComplete: function () {
            app.stage.removeChild(blink1);
            app.stage.removeChild(blink2);
            app.stage.removeChild(blink3);
            app.stage.removeChild(doorOpen);
            app.stage.removeChild(doorOpenShadow);
            gsap_1.default.to([door, handle, handleShadow], {
                alpha: 1, duration: 1, onComplete: function () {
                    resolve();
                }
            });
        }
    }); });
};
window.addEventListener('resize', function () {
    updateBackground();
    updateDoor();
    updateHandle();
    updateHandleShadow();
    updateTimerStylesAndPosition();
});
