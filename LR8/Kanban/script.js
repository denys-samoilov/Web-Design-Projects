
let draggedTask = null;

document.querySelectorAll(".task").forEach(task => {
    task.addEventListener("dragstart", () => {
        draggedTask = task;
        setTimeout(() => task.style.display = "none", 0);
    });

    task.addEventListener("dragend", () => {
        setTimeout(() => {
            draggedTask.style.display = "block";
            draggedTask = null;
        }, 0);
    });
});

document.querySelectorAll(".target").forEach(column => {
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", () => {
        if (draggedTask) {
            column.appendChild(draggedTask);
        }
    });
});