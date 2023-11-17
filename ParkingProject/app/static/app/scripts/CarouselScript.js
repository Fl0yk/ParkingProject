const images = document.querySelectorAll('.carousel-slide');
const speedRange = document.getElementById('imageSpeed');

let curImage = 0;
let interval;

//�������� �������� �� ����� ��� ������ �� ���������
let intervalTime = speedRange && speedRange.value * 1000 || 3000;


function startCarousel() {
    //������ �������� ������ ������� �� ������������ ��������
    interval = setInterval(nextSlide, intervalTime);
}

function stopCarousel() {
    //������� ��������
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