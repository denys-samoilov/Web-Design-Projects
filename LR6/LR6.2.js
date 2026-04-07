let currentSort = "";

let sortDiv = document.querySelector("#sort-div");
let addForm = document.querySelector('#add-form');
let addButton = document.querySelector('[name = "add-btn"]');
let taskNameInput = document.querySelector('[name = "task-name-input"]');

let tasksContainer = document.querySelector("#tasks-container");   

let tasks = []; 

addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask();
    let sortedTasks = sortTasks(currentSort);
    refreshTasks(sortedTasks);
});

sortDiv.addEventListener('click', (event) => {
    if (event.target.tagName === "BUTTON") {
        currentSort = event.target.dataset.sort;
        let sortedTasks = sortTasks(currentSort);
        refreshTasks(sortedTasks);
    }
});

let addTask = () => {
    let taskName = taskNameInput.value;

    let task = {
        name: taskName,
        isCompleted: false,
        dateOfCreating: new Date().toLocaleString(),
        dateOfUpdating: new Date().toLocaleString()
    };

    tasks.push(task);
    taskNameInput.value = "";
    return task;
}

let refreshTasks = (tasksList) => {
    tasksContainer.innerHTML = "";
    for (let i = 0; i < tasksList.length; i++) {
        let task = tasksList[i];
        let taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `         
            <b><p class="task-name">${task.name}</p></b>
            <label class="task-label">
                Task Done: 
                <input type="checkbox" class="task-checkbox" ${task.isCompleted ? "checked" : ""}>
            </label> 
            <button class="delete-button">Delete</button>
            <button class="edit-button">Edit</button>
        `;

        let checkbox = taskElement.querySelector(".task-checkbox");
        let deleteButton = taskElement.querySelector(".delete-button");
        let editButton = taskElement.querySelector(".edit-button");

        checkbox.addEventListener("change", () => {
            tasks[i].isCompleted = checkbox.checked;
        });

        deleteButton.addEventListener("click", () => {
            taskElement.classList.add("removing");
            setTimeout(() => {
                deleteTask(i);
                let sortedTasks = sortTasks(currentSort);
            refreshTasks(sortedTasks);
            }, 300);    
        });

        editButton.addEventListener("click", () => {
            editTask(i);
            let sortedTasks = sortTasks(currentSort);
            refreshTasks(sortedTasks);
        });
        

        tasksContainer.appendChild(taskElement);
    }
    return tasks;
}

let deleteTask = (index) => {
    let task = tasks[index];
    tasks.splice(index, 1);
    return task;
}

let editTask = (index) => {
    let task = tasks[index];
    let newTaskName = prompt("Enter new task name", task.name);
    if (newTaskName === null || newTaskName === "") {
        return;
    }
    task.name = newTaskName;
    task.dateOfUpdating = new Date().toLocaleString();
    return task;
}

let sortTasks = (sortBy) => {
    let sortedTasks = [...tasks];
    if (sortBy === "name") {
        sortedTasks.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "dateOfCreating") {
        sortedTasks.sort((a, b) => new Date(b.dateOfCreating) - new Date(a.dateOfCreating));
    } else if (sortBy === "dateOfUpdating") {
        sortedTasks.sort((a, b) => new Date(b.dateOfUpdating) - new Date(a.dateOfUpdating));
    }
    return sortedTasks;
}