// Select the necessary elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const pendingTasksList = document.getElementById("pending-tasks");
const completedTasksList = document.getElementById("completed-tasks");

let tasks = [];

// Function to update the task lists
function updateTaskLists() {
    // Clear the current task lists
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    // Loop through tasks and append them to the appropriate list
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        // Create task text
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Create edit button
        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editTask(task.id));

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        // Create complete button
        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => toggleTaskCompletion(task.id));

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        // Add task to the correct list
        if (task.completed) {
            completedTasksList.appendChild(li);
        } else {
            pendingTasksList.appendChild(li);
        }
    });
}

// Add new task
addTaskButton.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        const newTask = {
            id: Date.now(),
            text: taskInput.value.trim(),
            completed: false,
        };
        tasks.push(newTask);
        taskInput.value = ""; // Clear input field
        updateTaskLists();
    }
});

// Toggle task completion
function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        updateTaskLists();
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskLists();
}

// Edit task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newText = prompt("Edit Task", task.text);
        if (newText && newText.trim() !== "") {
            task.text = newText.trim();
            updateTaskLists();
        }
    }
}
