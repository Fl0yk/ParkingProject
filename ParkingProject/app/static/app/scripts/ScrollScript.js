const car1 = document.getElementById('car1');
const car2 = document.getElementById('car2');
const scrollSpeed = 0.8;

window.addEventListener('scroll', () => {
    const value = scrollY;
    car1.style.top = `${240 + value * scrollSpeed}px`;
    car2.style.top = `${240 + value * scrollSpeed * 0.8}px`;
});