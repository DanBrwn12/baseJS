const rotatorCases = document.querySelectorAll(".rotator__case")
let currentIndex = 0
let interval = 1000

function switchCase() {

    rotatorCases[currentIndex].classList.remove("rotator__case_active");

    const color = rotatorCases[currentIndex].dataset.color;
    if (color) {
        rotatorCases[currentIndex].style.color = color;
    }

    currentIndex = (currentIndex + 1) % rotatorCases.length;
    
    rotatorCases[currentIndex].classList.add("rotator__case_active");

    const speed = rotatorCases[currentIndex].dataset.speed;
    const nextInterval = speed ? Number(speed) : 1000;
    
    setTimeout(switchCase, nextInterval);
}

const firstSpeed = rotatorCases[0].dataset.speed;
const startInterval = firstSpeed ? Number(firstSpeed) : 1000;
setTimeout(switchCase, startInterval);
