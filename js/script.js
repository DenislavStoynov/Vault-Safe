let app, background, door, handle, handleShadow, blink, doorOpen, doorOpenShadow;
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

window.onload = async function () {
    // Start application
    try {
        await start();
    } catch (error) {
        console.error(error);
        return;
    }
};

const loadAsset = async (pathPrefix, asset, fileExtension) => {
    const assetPath = `${pathPrefix}${asset}${fileExtension}`;
    const texture = await PIXI.Assets.load(assetPath);
    return texture;
};

const loadInitialAssets = async (bgAsset, doorAsset, handleAsset, handleShadowAsset) => {
    try {
        const assetsToLoad = [
            loadAsset(pathPrefix, bgAsset, fileExtension),
            loadAsset(pathPrefix, doorAsset, fileExtension),
            loadAsset(pathPrefix, handleAsset, fileExtension),
            loadAsset(pathPrefix, handleShadowAsset, fileExtension)
        ];

        const [bgTexture, doorTexture, handleTexture, handleShadowTexture] = await Promise.all(assetsToLoad);

        background = new PIXI.Sprite(bgTexture);
        door = new PIXI.Sprite(doorTexture);
        handle = new PIXI.Sprite(handleTexture);
        handleShadow = new PIXI.Sprite(handleShadowTexture);
    } catch (error) {
        throw error;
    }
};

const updateBackground = () => {
    background.anchor.set(0, 0);
    background.width = app.renderer.width;
    background.height = app.renderer.height;
};

const updateDoor = () => {
    door.anchor.set(0.5);
    door.width = app.renderer.width / 3;
    door.height = app.renderer.height / 1.6;
    door.position.set(app.renderer.width / 1.95, app.renderer.height / 2.05);
};

const updateHandle = () => {
    handle.anchor.set(0.5);
    handle.width = door.width / 3;
    handle.height = door.height / 2.4;
    handle.position.set(door.position.x - (door.width * 0.03046875), door.position.y);
    handle.interactive = true;
};

const updateHandleShadow = () => {
    handleShadow.anchor.set(0.5);
    handleShadow.width = handle.width;
    handleShadow.height = handle.height;
    handleShadow.position.set(handle.position.x + ((handle.width * 1) / 100), handle.position.y);
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

const startGame = async () => {
    // Load initial assets
    const { bgAsset, doorAsset, doorOpenAsset, doorOpenShadowAsset, handleAsset, handleShadowAsset, blinkAsset } = assets;
    try {
        await loadInitialAssets(bgAsset, doorAsset, handleAsset, handleShadowAsset);
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

    /* Animation */
    const code = [{ rotations: 3, dir: 'clockwise' }, { rotations: 5, dir: 'counterclockwise' }, { rotations: 1, dir: 'clockwise' }];
    let clicks = 1, counter = 0;
    handle.on('pointerdown', async (event) => {
        if (!handle.interactive) return; // If interaction is disabled -> return

        handle.interactive = false;

        const clickPositionX = event.data.global.x - handle.x;
        const rotationSide = handle.rotation;
        const targetRotation = clickPositionX < 0 ? rotationSide - Math.PI / 3 : rotationSide + Math.PI / 3; // < 0 ? 60 degrees counterclockwise : 60 degrees clockwise
        const curRotation = clickPositionX < 0 ? 'counterclockwise' : 'clockwise';
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
        resetClicksAndCounter();
        console.log("Restarting...");
        resetGame();
    } else {
        if (isClickCountLessThanRequired(code, clicks, counter)) {
            clicks++;
        } else {
            if (isCounterWithinBounds(code, counter)) {
                counter++;
                clicks = 1;
            } else {
                console.log("You Win!");
                resetGame();
            }
        }
    }
    return { clicks, counter };
};

const isIncorrectDirection = (code, counter, curRotation) => code[counter].dir !== curRotation;

const resetClicksAndCounter = () => {
    clicks = 1;
    counter = 0;
};

const isClickCountLessThanRequired = (code, clicks, counter) => clicks < code[counter].rotations;

const isCounterWithinBounds = (code, counter) => counter < code.length - 1;

const resetGame = () => {
    // Remove previous assets
    app.stage.removeChild(background);
    app.stage.removeChild(door);
    app.stage.removeChild(handleShadow);
    app.stage.removeChild(handle);

    // Restart the game
    startGame();
};