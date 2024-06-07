const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;
function showSlide(index) {
    if (index >= images.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex = index;
    }
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
}
prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
});
nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
});
setInterval(() => {
    showSlide(currentIndex + 1);
}, 5000);
