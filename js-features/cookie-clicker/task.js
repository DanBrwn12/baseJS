const img = document.getElementsByTagName("img")[0]
const clickCounter = document.getElementById("clicker__counter")



img.onclick = function () {
    let clickCounterChanger = Number(clickCounter.textContent)
    clickCounter.textContent  = clickCounterChanger + 1

    if (clickCounterChanger % 2 === 0) {
        img.width = 250
    } else {
        img.width = 200
    }
}