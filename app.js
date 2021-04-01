const start = document.querySelector('.btn-start');
const stop = document.querySelector('.btn-stop');
const reset = document.querySelector('.btn-reset');
const lap = document.querySelector('.btn-lap');
const lapDisplay = document.querySelector('.lapDisplay');
let lapCount = 0;
const timer = document.querySelector('.timer');


let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning;

start.addEventListener('click', () => {
    if(isRunning) {
        throw new Error('Stopwatch has already started')
    }
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        displayTimer(convertTimeToString(elapsedTime));
    }, 10);
})

lap.addEventListener('click', () => {
    if (timer.innerHTML !== '00:00:00') {
        lapCount += 1;
        let li = document.createElement('li');
        li.innerText = `Lap ${lapCount} (${timer.innerHTML})`;
        lapDisplay.appendChild(li);
    }
})

stop.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
})

reset.addEventListener('click', () => {
    clearInterval(timerInterval);
    displayTimer('00:00:00');
    elapsedTime = 0;
    lapCount = 0;
    lapDisplay.innerHTML = '';
})

function displayTimer(time) {
    timer.innerHTML = time;
}

function convertTimeToString(time) {
    let hrsDiff = time / 3600000;
    let h = Math.floor(hrsDiff);

    let minDiff = (hrsDiff - h) * 60;
    let m = Math.floor(minDiff);

    let secDiff = (minDiff - m) * 60;
    let s = Math.floor(secDiff);

    let msDiff = (secDiff - s) * 100;
    let ms = Math.floor(msDiff);

    return `
        ${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}:${ms.toString().padStart(2,"0")}
    `
}