const reveal = document.querySelectorAll(".reveal")

window.addEventListener("scroll", () => {

    for (let index = 0; index < reveal.length; index++) {
        const rect = reveal[index].getBoundingClientRect()

        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            reveal[index].classList.add("reveal_active")        
    }


    }
})