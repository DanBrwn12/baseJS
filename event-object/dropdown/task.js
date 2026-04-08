const dropdown = document.querySelector(".dropdown")
const dropdownList = document.querySelector(".dropdown__list")
const dropdownLinks = document.querySelectorAll(".dropdown__link")
const dropdownValue = document.querySelector(".dropdown__value")

dropdownValue.addEventListener("click", () => {
    dropdownList.classList.toggle("dropdown__list_active")
})


dropdownLinks.forEach((link) => {

    link.addEventListener("click", (event) => {
        event.preventDefault()
        dropdownList.classList.remove("dropdown__list_active")        
        dropdownValue.textContent = link.textContent

    })
})