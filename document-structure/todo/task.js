const formInput = document.getElementById("tasks__form")
const input = document.getElementById("task__input")

const formTask = document.getElementById("tasks__list")

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks")
    
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks)
        tasks.forEach(taskText => {
            createTaskElement(taskText)
        });
    }
}

function saveTasks() {
    const tasks = []
    const taskElements = document.querySelectorAll(".task .task__title");
    
    taskElements.forEach(taskTitle => {
        tasks.push(taskTitle.textContent)
    });
    
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function createTaskElement(taskText) {
    const task = document.createElement("div")
    task.className = "task"

    const taskTitle = document.createElement("div")
    taskTitle.className = "task__title"
    taskTitle.textContent = taskText

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
        saveTasks()
    })
}

formInput.addEventListener("submit", (event) => {
    event.preventDefault()

    const inputText = input.value.trim()

    if (inputText !== "") {
        createTaskElement(inputText)
        saveTasks()
        input.value = ""
    }
})

loadTasks()