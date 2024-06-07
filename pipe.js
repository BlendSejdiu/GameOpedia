document.addEventListener('DOMContentLoaded', () => {
    const toTopButton = document.getElementById('toTop');
    const body = document.body;

    function isScrolledToBottom() {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight;
    }

    async function playSound() {
        const audio = new Audio('sound/pipe.mp3');
        audio.volume = 0.5; // Adjust volume level (0.0 to 1.0)
        audio.play();
    }

    async function showBlackScreen() {
        const blackScreen = document.createElement('div');
        blackScreen.classList.add('black-screen');
        body.appendChild(blackScreen);
        // Trigger reflow to apply CSS transition
        blackScreen.offsetHeight;
        blackScreen.style.opacity = '1'; // Make the screen fully opaque
        await new Promise(resolve => setTimeout(resolve, 0)); // Wait for the transition
    }

    function removeBlackScreen() {
        const blackScreen = document.querySelector('.black-screen');
        if (blackScreen) {
            blackScreen.style.opacity = '0'; // Make the screen transparent
            setTimeout(() => {
                blackScreen.parentNode.removeChild(blackScreen);
            }, 500); // Remove after transition duration
        }
    }

    window.addEventListener('scroll', () => {
        if (isScrolledToBottom()) {
            toTopButton.style.display = 'block'; // Display the button when scrolled to bottom
        } else {
            toTopButton.style.display = 'none'; // Hide the button when not at the bottom
        }
    });

    toTopButton.addEventListener('click', async () => {
         playSound(); // Wait for sound to finish playing
        await showBlackScreen();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setTimeout(() => {
            removeBlackScreen();
        }, 1000); // Adjust duration as needed
    });
});
