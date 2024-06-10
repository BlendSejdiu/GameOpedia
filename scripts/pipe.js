document.addEventListener('DOMContentLoaded', () => {
    const toTopButton = document.getElementById('toTop');
    const body = document.body;

    function isScrolledToBottom() {
        return window.innerHeight + window.scrollY >= document.body.scrollHeight;
    }

    async function playSound() {
        const audio = new Audio('sound/pipe.mp3');
        audio.volume = 0.5; 
        audio.play();
    }

    async function showBlackScreen() {
        const blackScreen = document.createElement('div');
        blackScreen.classList.add('black-screen');
        body.appendChild(blackScreen);
        blackScreen.offsetHeight;
        blackScreen.style.opacity = '1'; 
        await new Promise(resolve => setTimeout(resolve, 0)); 
    }

    function removeBlackScreen() {
        const blackScreen = document.querySelector('.black-screen');
        if (blackScreen) {
            blackScreen.style.opacity = '0'; 
            setTimeout(() => {
                blackScreen.parentNode.removeChild(blackScreen);
            }, 500); 
        }
    }

    window.addEventListener('scroll', () => {
        if (isScrolledToBottom()) {
            toTopButton.style.display = 'block'; 
        } else if (window.pageYOffset > 750) {
            toTopButton.style.display = 'block'; 
        } else {
            toTopButton.style.display = 'none'; 
        }
    });

    toTopButton.addEventListener('click', async () => {
         playSound(); 
        await showBlackScreen();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setTimeout(() => {
            removeBlackScreen();
        }, 1000);
    });
});
