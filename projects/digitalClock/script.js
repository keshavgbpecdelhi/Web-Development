function updateClock() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const hourDeg = (hours % 12) * 30 + minutes * 0.5;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const secondDeg = seconds * 6 + milliseconds * 0.006;

    document.getElementById("hour").style.transform =
        `rotate(${hourDeg}deg)`;

    document.getElementById("minute").style.transform =
        `rotate(${minuteDeg}deg)`;

    document.getElementById("second").style.transform =
        `rotate(${secondDeg}deg)`;

    document.getElementById("digitalTime").textContent =
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

updateClock();
setInterval(updateClock, 1000);