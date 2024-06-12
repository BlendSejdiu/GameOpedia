(async () => {

    const app = new PIXI.Application({
        resizeTo: window,
        backgroundColor: 0x1099bb
    });


    const pixiCanvas = document.getElementById('pixi-canvas');
    pixiCanvas.appendChild(app.view);

    const brush = new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, 50).endFill();

  
    const line = new PIXI.Graphics();

    await PIXI.Loader.shared.add(['https://pixijs.com/assets/bg_grass.jpg', 'https://pixijs.com/assets/bg_rotate.jpg']).load();

    const { width, height } = app.screen;
    const stageSize = { width, height };

    const background = Object.assign(new PIXI.Sprite(PIXI.Texture.from('https://pixijs.com/assets/bg_grass.jpg')), stageSize);
    const imageToReveal = Object.assign(new PIXI.Sprite(PIXI.Texture.from('https://pixijs.com/assets/bg_rotate.jpg')), stageSize);
    const renderTexture = PIXI.RenderTexture.create(stageSize);
    const renderTextureSprite = new PIXI.Sprite(renderTexture);

    imageToReveal.mask = renderTextureSprite;

    app.stage.addChild(background, imageToReveal, renderTextureSprite);

    app.stage.interactive = true;
    app.stage.hitArea = app.screen;

    let dragging = false;
    let lastDrawnPoint = null;

    app.stage.on('pointerdown', pointerDown)
             .on('pointerup', pointerUp)
             .on('pointerupoutside', pointerUp)
             .on('pointermove', pointerMove);

    function pointerMove(event) {
        if (dragging) {
            const { x, y } = event.data.global;
            brush.position.set(x, y);
            app.renderer.render({
                container: brush,
                target: renderTexture,
                clear: false,
                skipUpdateTransform: false,
            });

            
            if (lastDrawnPoint) {
                line.clear().moveTo(lastDrawnPoint.x, lastDrawnPoint.y).lineTo(x, y).lineStyle(100, 0xffffff);
                app.renderer.render({
                    container: line,
                    target: renderTexture,
                    clear: false,
                    skipUpdateTransform: false,
                });
            }
            lastDrawnPoint = lastDrawnPoint || new PIXI.Point();
            lastDrawnPoint.set(x, y);
        }
    }

    function pointerDown(event) {
        dragging = true;
        pointerMove(event);
    }

    function pointerUp() {
        dragging = false;
        lastDrawnPoint = null;
    }
})();
