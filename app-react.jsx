const MyTaskForm = (props) => {
    return (
        <form className="form" id="taskForm" onSubmit={(event) => props.onSubmit(event)}>
            <div className="form-group">
                <label htmlFor="taskTitle" className="form-label">
                    Mau Ngapain Hari Ini?
                </label>
                <input 
                    type="text" 
                    className="form-input form-input--full"
                    id="taskTitle"
                    name="taskTitle"
                    placeholder="Masukkan Kegiatan..."
                    onChange={(event) => props.setTaskTitle(event.target.value)}
                    value={props.taskTitle}
                />
            </div>
            <div className="form-group form-group--button-right">
                <button className="button" type="submit">Simpan</button>
            </div>
        </form>
    )
};

const MyTaskList = (props) => {
    return (
        <div className="tasks">
            <h2 className="tasks-title">Agendaku</h2>
            <ul className="tasks-list" id="tasksList">
                {
                    props.tasks.length > 0 ? (
                        props.tasks.map((task, index) => <li key={task.id} className={`tasks-list-item ${task.checked ? "checked" : ""}`}>
                            <div className="task">
                                <div>
                                    <input type="checkbox" checked={task.checked} onChange={(event) => props.checkTask(event, index)}/>
                                </div>
                                <div className="task-title">{task.title}</div>
                                <button className="button" onClick={() => props.deleteTask(index)}>Hapus</button>
                            </div>
                        </li>)
                    ) : (
                        <div className="tasks">
                            <div className="task-title">
                                Tidak Ada Kegiatan
                            </div>
                        </div>
                    )
                }
            </ul>
        </div>
    )
};

const MyTaskContainer = (props) => {
    return <div className="container">{props.children}</div>
}

const App = () => {

    const [taskTitle, setTaskTitle] = React.useState("");
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks))
        }
    }, []);

    const addTask = (event) => {
        event.preventDefault();
        if (taskTitle.trim() === "") {
            alert("Judul tigas tidak boleh kosong...");
            return;
        }
        
        const newTask = {
            id: tasks.length + 1,
            title: taskTitle,
        };

        setTasks([...tasks, newTask]);
        setTaskTitle("");
        localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    };

    const deleteTask = (taskIndex) => {
        const updatedTask = tasks.filter((_, index) => index !== taskIndex);
        setTasks(updatedTask);
        localStorage.setItem("tasks", JSON.stringify(updatedTask));
    };

    const checkTask = (event, taskIndex) => {
        const isChecked = event.target.checked;
        const updatedTasks = tasks.map((task, index) => {
            if (taskIndex === index) {
                return {
                    ...task,
                    checked: isChecked,
                }
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    return (
        <MyTaskContainer>
            <MyTaskForm onSubmit={addTask} taskTitle={taskTitle} setTaskTitle={setTaskTitle}/>
            <MyTaskList tasks={tasks} checkTask={checkTask} deleteTask={deleteTask}/>
        </MyTaskContainer>
    )
}



const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <App/>
);