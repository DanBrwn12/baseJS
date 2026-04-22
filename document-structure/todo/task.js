const formInput = document.getElementById("tasks__form")
const input = document.getElementById("task__input")

const formTask = document.getElementById("tasks__list")


formInput.addEventListener("submit", (event) => {
    event.preventDefault()

    const inputText = input.value.trim()

    if (inputText !== "") {
        const task = document.createElement("div")
        task.className = "task"

        const taskTitle = document.createElement("div")
        taskTitle.className = "task__title"
        taskTitle.textContent = inputText

        const removeButton = document.createElement("a")
        removeButton.href = "#"
        removeButton.className = "task__remove"
        removeButton.innerHTML = "&times;"

        formTask.appendChild(task)

        task.appendChild(taskTitle)
        task.appendChild(removeButton)


        removeButton.addEventListener("click", (event) => {
            event.preventDefault()
            task.remove()
        })
    } 
})