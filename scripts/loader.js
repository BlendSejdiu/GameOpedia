document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a.btn-animate');
    const loadingScreen = document.getElementById('loadingScreen');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 

            const targetPage = link.getAttribute('href');
            const imageUrl = link.getAttribute('data-image');

            loadingScreen.style.display = 'flex';

            const app = new PIXI.Application({
                width: window.innerWidth,
                height: window.innerHeight,  
                backgroundColor: 0x000000, k
            });

          
            while (loadingScreen.firstChild) {
                loadingScreen.removeChild(loadingScreen.firstChild);
            }

      
            loadingScreen.appendChild(app.view);

           
            PIXI.Assets.load(imageUrl).then((texture) => {
                const sprite = new PIXI.Sprite(texture);

                sprite.anchor.set(0.5);
                
                sprite.x = app.screen.width / 2;
                sprite.y = app.screen.height / 2;

               
                sprite.width = 300; 
                sprite.height = 200; 

                app.stage.addChild(sprite);

                app.ticker.add((delta) => {
                    sprite.rotation += 0.08 * delta;
                });
            });

            setTimeout(() => {
                window.location.href = targetPage;
            }, 1500);
        });
    });
});
