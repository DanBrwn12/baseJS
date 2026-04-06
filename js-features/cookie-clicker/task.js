const img = document.getElementsByTagName("img")[0]
const clickCounter = document.getElementById("clicker__counter")
const clickerSpeed = document.getElementById("clicker__speed")

let lastClickTime = null

img.onclick = function () {
    let clickCounterChanger = Number(clickCounter.textContent)
    clickCounter.textContent  = clickCounterChanger + 1

    if (clickCounterChanger % 2 === 0) {
        img.width = 250
    } else {
        img.width = 200
    }

    const now = new Date()

    if (lastClickTime != null) {
        const timeDiffSeconds = (now - lastClickTime) / 1000;

        const speed = (1 / timeDiffSeconds).toFixed(2);

        clickerSpeed.textContent = speed;
    } else {

        clickerSpeed.textContent = "0";
    }

    lastClickTime = now


}