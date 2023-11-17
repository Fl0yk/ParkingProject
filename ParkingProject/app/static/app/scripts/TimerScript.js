function startCountdown(secondsRemaining) {
    const countdownElement = document.getElementById('timer');

    const interval = setInterval(function () {
        if (secondsRemaining <= 0) {
            clearInterval(interval);
            countdownElement.innerHTML = 'Timer finished!';
        } else {
            countdownElement.innerHTML = `${Math.floor(secondsRemaining / 60)}:${secondsRemaining % 60} remain`;
            secondsRemaining--;

            sessionStorage.setItem('timer', secondsRemaining);
        }
    }, 1000);
}

const savedTimer = sessionStorage.getItem('timer');

if (savedTimer) {
    //const secondsRemaining = +savedTimer;
    startCountdown(+savedTimer);
} else {
    const initialSeconds = 3600; // 1 час
    startCountdown(initialSeconds);
}