const editBtn = document.querySelector(".edit-btn");
const container = document.querySelector(".card-container");

let editMode = false;

function updateCards() {
    return document.querySelectorAll(".flip-container");
}

function setDragState() {
    updateCards().forEach(card => {
        card.setAttribute("draggable", editMode ? "true" : "false");
    });
}

editBtn.addEventListener("click", () => {
    editMode = !editMode;

    container.classList.toggle("edit-mode", editMode);

    editBtn.textContent = editMode ? "Готово" : "Редагувати";

    updateCards().forEach(card => {
        card.setAttribute("draggable", editMode ? "true" : "false");
    });
});

container.addEventListener("click", (e) => {
    if (!editMode) return;

    if (e.target.classList.contains("delete")) {
        e.target.closest(".flip-container").remove();
    }
});

container.addEventListener("dragstart", (e) => {
    if (!editMode) return;

    const card = e.target.closest(".flip-container");
    if (!card) return;

    card.classList.add("dragging");
});

container.addEventListener("dragend", (e) => {
    const card = e.target.closest(".flip-container");
    if (!card) return;

    card.classList.remove("dragging");
});

container.addEventListener("dragover", (e) => {
    if (!editMode) return;
    e.preventDefault();

    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(container, e.clientY);

    if (!dragging) return;

    if (afterElement == null) {
        container.appendChild(dragging);
    } else {
        container.insertBefore(dragging, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const elements = [...container.querySelectorAll(".flip-container:not(.dragging)")];

    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}