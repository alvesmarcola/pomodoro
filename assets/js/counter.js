const pomodoroSelect = document.querySelector('#pomodoro');
const shortInterval = document.querySelector('#short-break');
const longInterval = document.querySelector('#long-break');
const startButton = document.querySelector('#start');
const counter = document.querySelector('#counter');

let selectedTimer = 'pomodoro';
let intervalId;

function selectTimer(timer) {
    selectedTimer = timer;
    changeSelectedClasses(timer);
    changeTimerValue(timer);
    clearInterval(intervalId); // Limpar o temporizador atual
}

function sTom(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const padMinutes = minutes.toString().padStart(2, '0');
    const padSeconds = seconds.toString().padStart(2, '0');
    return `${padMinutes}:${padSeconds}`;
}

function getTimerValue(timer) {
    return {
        pomodoro: 25 * 60,
        'short-break': 5 * 60,
        'long-break': 25 * 60
    }[timer];
}

function changeTimerValue(timer) {
    const timerValue = getTimerValue(timer);
    counter.textContent = sTom(timerValue);
}

function changeSelectedClasses(timer) {
    if (timer === 'pomodoro') {
        pomodoroSelect.classList.add('active-button');
        shortInterval.classList.remove('active-button');
        longInterval.classList.remove('active-button');
    } else if (timer === 'short-break') {
        pomodoroSelect.classList.remove('active-button');
        shortInterval.classList.add('active-button');
        longInterval.classList.remove('active-button');
    } else if (timer === 'long-break') {
        pomodoroSelect.classList.remove('active-button');
        shortInterval.classList.remove('active-button');
        longInterval.classList.add('active-button');
    }
}

function startTimer(timer) {
    clearInterval(intervalId); // Para qualquer temporizador existente antes de iniciar um novo
    let seconds = getTimerValue(timer);

    intervalId = setInterval(() => {
        seconds--;

        counter.textContent = sTom(seconds);

        if (seconds <= 0) { // Alterado de '===' para '<='
            clearInterval(intervalId);
            // Aqui você pode adicionar lógica para lidar com o final do temporizador, como iniciar um novo temporizador de intervalo
        }
    }, 1000); // Alterando de 10 para 1000 (1 segundo)
}

startButton.addEventListener('click', function() {
    startTimer(selectedTimer); // Chamar startTimer com o temporizador selecionado
});
