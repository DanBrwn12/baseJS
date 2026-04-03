const timer = document.getElementById("timer");

let totalSeconds = Number(timer.textContent);

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`; 
}

timer.textContent = formatTime(totalSeconds)


const interval = setInterval (() => {
    if (totalSeconds > 0) {
        totalSeconds -= 1
        timer.textContent = formatTime(totalSeconds)

    } else {
        clearInterval(interval)
        alert("Вы победили в конкурсе!")
    }
    
}, 1000)


