import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");

    return storedTasks
      ? JSON.parse(storedTasks)
      : [
          {
            name: "Fix search bug",
            category: "complete",
            bgcolor: "lightgrey",
          },
          {
            name: "Update user profile UI",
            category: "complete",
            bgcolor: "lightblue",
          },
          {
            name: "Add login functionality",
            category: "wip",
            bgcolor: "lightgreen",
          },
          {
            name: "Optimize dashboard load time",
            category: "wip",
            bgcolor: "lightyellow",
          },
          {
            name: "Implement password feature",
            category: "wip",
            bgcolor: "lightcoral",
          },
        ];
  });

  const [newTaskName, setNewTaskName] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getRandomColor = () => {
    const letters = "89ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const addNewTask = () => {
    if (newTaskName.trim() === "") {
      alert("Task name cannot be empty!");
      return;
    }

    const newTask = {
      name: newTaskName,
      category: "wip",
      bgcolor: getRandomColor(),
    };

    setTasks([...tasks, newTask]);
    setNewTaskName("");
  };

  const onDragStart = (task) => {
    setDraggedTask(task);
  };

  const onDragEnd = () => {
    setDraggedTask(null);
  };

  const onDrop = (category) => {
    if (!draggedTask) return;

    const updatedTasks = tasks.map((task) =>
      task.name === draggedTask.name ? { ...task, category } : task
    );

    setTasks(updatedTasks);
    setDraggedTask(null);
  };

  const onTouchStart = (task) => {
    setDraggedTask(task);
  };

  const onTouchEnd = () => {
    setDraggedTask(null);
  };

  const getTask = () => {
    const tasksToRender = {
      wip: [],
      complete: [],
    };

    tasks.forEach((t) => {
      tasksToRender[t.category].push(
        <div
          key={t.name}
          onDragStart={() => onDragStart(t)}
          onDragEnd={onDragEnd}
          onTouchStart={() => onTouchStart(t)}
          onTouchEnd={onTouchEnd}
          draggable
          className="task-card"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      );
    });

    return tasksToRender;
  };

  return (
    <div className="drag-drop-container">
      <h2 className="drag-drop-header">JIRA BOARD: Sprint 21U</h2>

      <div className="drag-drop-board">
        <div
          className="wip"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop("wip")}
          onTouchEnd={() => onDrop("wip")}
        >
          <div className="task-header">In-PROGRESS</div>
          {getTask().wip}
          <div className="add-task-container">
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter task name"
              className="task-input"
            />
            <button onClick={addNewTask} className="add-task-button">
              +
            </button>
          </div>
        </div>
        <div
          className="complete"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop("complete")}
          onTouchEnd={() => onDrop("complete")}
        >
          <div className="task-header">COMPLETED</div>
          {getTask().complete}
        </div>
      </div>
    </div>
  );
}

export default App;
