const images = document.querySelectorAll('.carousel-slide');
const speedRange = document.getElementById('imageSpeed');

let curImage = 0;
let interval;

//получаем значение из формы или задаем по умолчанию
let intervalTime = speedRange && speedRange.value * 1000 || 3000;


function startCarousel() {
    //задаем интервал вызова функции по переключению картинок
    interval = setInterval(nextSlide, intervalTime);
}

function stopCarousel() {
    //Очищаем интервал
    clearInterval(interval);
}

function nextSlide() {
    if (!document.hasFocus()) {
        return;
    }

    images[curImage].classList.remove('active');
    curImage = ++curImage % images.length;
    images[curImage].classList.add('active');
}

if (speedRange) {
    speedRange.addEventListener('change', () => {
        stopCarousel();

        intervalTime = speedRange.value * 1000;
        startCarousel();
    });
}
startCarousel();