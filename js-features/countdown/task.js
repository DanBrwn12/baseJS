const timer = document.getElementById("timer")

const interval = setInterval (() => {
    if (timer.textContent > 0) {
        timer.textContent -= 1
    } else {
        clearInterval(interval)

    }
}, 1000)

alert("Вы победили в конкурсе!")