const fontSizeControls = document.querySelectorAll(".font-size")
const book = document.getElementById("book")

fontSizeControls.forEach(control => {
    control.addEventListener('click', (event) => {
        event.preventDefault()

        fontSizeControls.forEach(btn => {
            btn.classList.remove("font-size_active")
        });

        control.classList.add("font-size_active")


        book.classList.remove("font-size_small", "font-size_big")

        const size = control.dataset.size

        if (size === "big") {
            book.classList.add("font-size_big")
        } else if (size === "small") {
            book.classList.add("font-size_small")
        }
    });
});