// Select elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const pendingTasksList = document.getElementById("pending-tasks");
const completedTasksList = document.getElementById("completed-tasks");
const taskHistoryList = document.getElementById("task-history");

// Add a new task
addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskItem = createTaskItem(taskText);
    pendingTasksList.appendChild(taskItem);

    taskInput.value = "";
});

// Create a new task item
function createTaskItem(taskText) {
    const li = document.createElement("li");
    li.className = "list-group-item";

    const span = document.createElement("span");
    span.textContent = taskText;

    const completeButton = document.createElement("button");
    completeButton.className = "complete-btn";
    completeButton.innerHTML = "✔";
    completeButton.addEventListener("click", () => {
        moveToCompleted(li);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerHTML = "✖";
    deleteButton.addEventListener("click", () => {
        moveToHistory(li, "Deleted");
    });

    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    return li;
}

// Move task to completed
function moveToCompleted(taskItem) {
    const completedTask = taskItem.cloneNode(true);
    completedTask.querySelector(".complete-btn").remove();
    completedTask.querySelector(".delete-btn").addEventListener("click", () => {
        moveToHistory(completedTask, "Completed");
    });

    completedTasksList.appendChild(completedTask);
    taskItem.remove();
}

// Move task to history
function moveToHistory(taskItem, status) {
    const historyItem = document.createElement("li");
    historyItem.className = "list-group-item";

    const timestamp = new Date().toLocaleString();

    historyItem.textContent = `${taskItem.querySelector("span").textContent} - ${status} on ${timestamp}`;
    taskHistoryList.appendChild(historyItem);

    taskItem.remove();
}
