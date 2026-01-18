const tasks = localStorage.getItem("tasks") 
    ? JSON.parse(localStorage.getItem("tasks")) 
    : []; // array

const tasksList = document.getElementById("tasksList");
const taskForm = document.getElementById("taskForm");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
})

function addTask() {
    const taskTitleValue = document.getElementById("taskTitle").value;
    if (taskTitleValue.trim() === "") {
        alert("Judul tugas tidak boleh kosong");
        return;
    }

    const newTask = {
        id: tasks.length + 1,
        title: taskTitleValue.trim()
    };

    tasks.push(newTask);
    document.getElementById("taskTitle").value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask();
}

function checkTask(index) {
    const taskElement = document.getElementById(`task${index}`);
    const checkboxElement = document.getElementById(`checkTask${index}`);

    if (checkboxElement.checked) {
        taskElement.classList.add("checked");
        tasks[index].checked = true;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        taskElement.classList.remove("checked");
        tasks[index].checked = false;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function deleteTask(index) {
    tasks.splice(index,1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask();
}

function renderTask() {
    tasksList.innerHTML = "";

    if (tasks.length === 0) {
        const li = document.createElement("li");
        li.classList.add("tasks-list-item");
        li.innerHTML = `
            <div class="tasks">
                <div class="task-title">
                    Tidak Ada Kegiatan
                </div>
            </div>
        `;

        tasksList.appendChild(li);
        return;
    }


    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("tasks-list-item");

        if (task.checked === true) {
            li.classList.add("checked");
        }

        li.innerHTML = `
            <div class="task">
                <div>
                    <input type="checkbox" onchange="checkTask(${index})" id="checkTask${index}" ${task.checked ? "checked=true" : ""}/>
                </div>
                <div class="task-title">${task.title}</div>
                <button class="button" onclick="deleteTask(${index})">Hapus</button>
            </div>
        `;

        li.id = `task${index}`;
        tasksList.appendChild(li);
    })
}

function main() {
    renderTask();
}

main();