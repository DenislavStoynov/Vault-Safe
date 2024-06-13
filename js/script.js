let app, background, door, handle, handleShadow, doorOpen, doorOpenShadow, blink1, blink2, blink3;
let blink_texture;
let timeCounter = 0;
let timeText, timerInterval;
const pathPrefix = '../assets/';
const fileExtension = '.png';
const assets = {
    bgAsset: 'bg',
    doorAsset: 'door',
    doorOpenAsset: 'doorOpen',
    doorOpenShadowAsset: 'doorOpenShadow',
    handleAsset: 'handle',
    handleShadowAsset: 'handleShadow',
    blinkAsset: 'blink'
};
const directions = ["clockwise", "counterclockwise"];
window.onload = async function () {
    // Start application
    try {
        await start();
    } catch (error) {
        console.error(error);
        return;
    }
};

const getTimerFontSize = () => Math.min(background.width, background.height) * 0.016;

const createCounterText = () => {
    timeText = new PIXI.Text(formatTime(timeCounter), { fontFamily: 'Arial', fontSize: getTimerFontSize(), fill: '#ffffff' });
    timeText.position.set(background.x - background.width * 0.203, background.y - background.height * 0.059);
    app.stage.addChild(timeText);
};

const updateCounterText = () => {
    timeText.text = formatTime(timeCounter);
};

const formatTime = (timeCounter) => {
    const minutes = Math.floor(timeCounter / 60);
    const seconds = timeCounter % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const startTimer = () => {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(() => {
        timeCounter++;
        updateCounterText();
    }, 1000);
};

const updateTimerStylesAndPosition = () => {
    timeText.style.fontSize = `${getTimerFontSize()}px`;
    timeText.position.set(background.x - background.width * 0.203, background.y - background.height * 0.059);
};

const loadAsset = async (pathPrefix, asset, fileExtension) => {
    const assetPath = `${pathPrefix}${asset}${fileExtension}`;
    const texture = await PIXI.Assets.load(assetPath);
    return texture;
};

const loadAssets = async (bgAsset, doorAsset, handleAsset, handleShadowAsset, doorOpenAsset, doorOpenShadowAsset, blinkAsset) => {
    try {
        const assetsToLoad = [
            loadAsset(pathPrefix, bgAsset, fileExtension),
            loadAsset(pathPrefix, doorAsset, fileExtension),
            loadAsset(pathPrefix, handleAsset, fileExtension),
            loadAsset(pathPrefix, handleShadowAsset, fileExtension),
            loadAsset(pathPrefix, doorOpenAsset, fileExtension),
            loadAsset(pathPrefix, doorOpenShadowAsset, fileExtension),
            loadAsset(pathPrefix, blinkAsset, fileExtension),
        ];

        const [bgTexture, doorTexture, handleTexture, handleShadowTexture, doorOpenTexture, doorOpenShadowTexture, blinkTexture] = await Promise.all(assetsToLoad);

        background = new PIXI.Sprite(bgTexture);
        door = new PIXI.Sprite(doorTexture);
        handle = new PIXI.Sprite(handleTexture);
        handleShadow = new PIXI.Sprite(handleShadowTexture);
        doorOpen = new PIXI.Sprite(doorOpenTexture);
        doorOpenShadow = new PIXI.Sprite(doorOpenShadowTexture);
        blink_texture = blinkTexture;
    } catch (error) {
        throw error;
    }
};

const updateBackground = () => {
    background.anchor.set(0.5);

    let scale = 1.0; // Default scale

    // Check if it's on laptop or mobile landscape orientation
    if (app.renderer.width > app.renderer.height || app.renderer.width >= 800) {
        // Landscape orientation on mobile or laptop
        scale = app.renderer.width / background.texture.width;
    } else {
        // Portrait orientation on mobile or smaller screens
        const minDimension = Math.min(app.renderer.width, app.renderer.height); // Find the minimum dimension of the screen
        scale = minDimension / Math.max(background.texture.width, background.texture.height); // Scale based on the smaller dimension
    }

    // Prevent elements from going off-screen on smaller devices
    const maxScale = 1.0;
    background.scale.set(Math.min(scale, maxScale));

    background.position.set(app.renderer.width / 2, app.renderer.height / 2);
};

const updateDoor = () => {
    door.anchor.set(0.5);
    door.width = background.width / 3;
    door.height = background.height / 1.6;
    door.position.set(background.x * 1.015, background.y * 0.99);
};

const updateHandle = () => {
    handle.anchor.set(0.5);
    handle.width = door.width * 0.35;
    handle.height = door.height * 0.4;
    handle.position.set(door.position.x * 0.97, door.position.y);
    handle.interactive = true;
};

const updateHandleShadow = () => {
    handleShadow.anchor.set(0.5);
    handleShadow.width = handle.width;
    handleShadow.height = handle.height;
    handleShadow.position.set(handle.position.x * 1.01, handle.position.y);
};

const start = async () => {
    // Initialize app
    try {
        await initializeApp();
    } catch (error) {
        console.log("Failed to initialize application! Exiting...", error);
        return;
    }

    // Start the game
    startGame();
};

const startGame = async (winner) => {
    // Load initial assets
    const { bgAsset, doorAsset, doorOpenAsset, doorOpenShadowAsset, handleAsset, handleShadowAsset, blinkAsset } = assets;
    try {
        await loadAssets(bgAsset, doorAsset, handleAsset, handleShadowAsset, doorOpenAsset, doorOpenShadowAsset, blinkAsset);
    } catch (error) {
        console.log("Failed to load assets!", error);
        return;
    }
    updateBackground();
    updateDoor();
    updateHandle();
    updateHandleShadow();
    app.stage.addChild(background);
    app.stage.addChild(door);
    app.stage.addChild(handleShadow);
    app.stage.addChild(handle);
    if (winner) {
        await closeDoor();
        await lockSafe();
        timeCounter = 0;
        updateCounterText();
    }
    createCounterText();
    startTimer();
    /* Generate code */
    const code = generateRandomCode();
    console.log(code);
    let clicks = 1, counter = 0;
    handle.on('pointerdown', async (event) => {
        if (!handle.interactive) return; // If interaction is disabled -> return

        handle.interactive = false;

        const clickPositionX = event.data.global.x - handle.x;
        const rotationSide = handle.rotation;
        const targetRotation = clickPositionX < 0 ? rotationSide - Math.PI / 3 : rotationSide + Math.PI / 3; // < 0 ? 60 degrees counterclockwise : 60 degrees clockwise
        const curRotation = clickPositionX < 0 ? directions[1] : directions[0];
        // Animate rotation
        await Promise.all([
            gsap.to(handle, { rotation: targetRotation, duration: 1 }),
            gsap.to(handleShadow, { rotation: targetRotation, duration: 1 })
        ]);
        ({ clicks, counter } = handleRotation(code, clicks, counter, curRotation));
        // Re-enable interaction
        handle.interactive = true;
    });
};

const initializeApp = async () => {
    try {
        app = new PIXI.Application();
        await app.init({ background: "transparent", resizeTo: window });
        document.body.appendChild(app.view);
    } catch (error) {
        throw error;
    }
};

const handleRotation = (code, clicks, counter, curRotation) => {
    if (isIncorrectDirection(code, counter, curRotation)) {
        console.log("Restarting...");
        lockSafe().then(() => {
            // After spinning, reset the game
            resetGame(false);
        });
    } else {
        if (isClickCountLessThanRequired(code, clicks, counter)) {
            clicks++;
        } else {
            if (isCounterWithinBounds(code, counter)) {
                counter++;
                clicks = 1;
            } else {
                console.log(`You successfully unlocked the safe for ${formatTime(timeCounter)} seconds!`);
                win().then(() => {
                    resetGame(true);
                })
            }
        }
    }
    return { clicks, counter };
};

const isIncorrectDirection = (code, counter, curRotation) => code[counter].dir !== curRotation;

const isClickCountLessThanRequired = (code, clicks, counter) => clicks < code[counter].rotations;

const isCounterWithinBounds = (code, counter) => counter < code.length - 1;

const resetGame = (winner) => {
    // Remove previous assets
    app.stage.removeChild(background);
    app.stage.removeChild(timeText);
    if (!winner) {
        app.stage.removeChild(door);
        app.stage.removeChild(handleShadow);
        app.stage.removeChild(handle);
    }

    // Start the game
    startGame(winner);
};

const generateRandomCode = () => {
    return [
        { rotations: Math.floor(Math.random() * 0) + 1, dir: directions[Math.floor(Math.random() * directions.length)] },
        // { rotations: Math.floor(Math.random() * 9) + 1, dir: directions[Math.floor(Math.random() * directions.length)] },
        // { rotations: Math.floor(Math.random() * 9) + 1, dir: directions[Math.floor(Math.random() * directions.length)] },
    ];
};

const lockSafe = () => {
    return new Promise((resolve) => {
        gsap.to([handle, handleShadow], { rotation: handle.rotation + Math.PI * 12, duration: 4, onComplete: resolve });
    });
};

const createBlink = () => {
    const newBlink = new PIXI.Sprite(blink_texture);
    newBlink.anchor.set(0.5);
    newBlink.width = handle.width;
    newBlink.height = newBlink.width;
    return newBlink;
};

const glitterAnimation = (blink) => {
    return gsap.timeline({ repeat: 1, repeatDelay: 0.5 })
        .to(blink, { alpha: 0, duration: 1 })
        .to(blink, { alpha: 1, duration: 1 });
};

const win = () => {
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

    return new Promise((resolve) => gsap.to([handle, handleShadow, door], {
        alpha: 0, duration: 1, onComplete: async function () {
            app.stage.removeChild(handle);
            app.stage.removeChild(handleShadow);
            app.stage.removeChild(door);
            await gsap.to([doorOpen, doorOpenShadow], { alpha: 1, duration: 1 });
            resolve();
        }
    }));
};

const closeDoor = () => {
    door.alpha = 0;
    handle.alpha = 0;
    handleShadow.alpha = 0;

    return new Promise((resolve) => gsap.to([blink1, blink2, blink3, doorOpen, doorOpenShadow], {
        alpha: 0, duration: 1, onComplete: async function () {
            app.stage.removeChild(blink1);
            app.stage.removeChild(blink2);
            app.stage.removeChild(blink3);
            app.stage.removeChild(doorOpen);
            app.stage.removeChild(doorOpenShadow);
            await gsap.to([door, handle, handleShadow], { alpha: 1, duration: 1 });
            resolve();
        }
    }))
};



window.addEventListener('resize', () => {
    updateBackground();
    updateDoor();
    updateHandle();
    updateHandleShadow();
    updateTimerStylesAndPosition();
});