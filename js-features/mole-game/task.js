const dead = document.getElementById("dead")
const lost = document.getElementById("lost")

function resetGame() {
    dead.textContent = 0
    lost.textContent = 0
}

function checkGameOver() {
    const deadCount = Number(dead.textContent)
    const lostCount = Number(lost.textContent)


    if (deadCount === 10) {
        alert("Победа!")
        resetGame()
    } else if (lostCount === 5) {
        alert("Вы проиграли!")
        resetGame()
    }
}

for (let index = 1; index <= 9; index++) {
    const hole = document.getElementById(`hole${index}`)

    hole.onclick = function() {
        let deadCount = Number(dead.textContent)
        let lostCount = Number(lost.textContent)

        if (hole.className.includes("hole_has-mole")) {
            deadCount++
            dead.textContent = deadCount
        } else {
            lostCount++
            lost.textContent = lostCount
        }

        checkGameOver()
    }
    
}