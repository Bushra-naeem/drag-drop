import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      name: "STORY-21: Fix search bug",
      category: "complete",
      bgcolor: "lightgrey",
    },
    {
      name: "STORY-22: Update user profile UI",
      category: "complete",
      bgcolor: "lightblue",
    },
    {
      name: "STORY-23: Add login functionality",
      category: "wip",
      bgcolor: "lightgreen",
    },
    {
      name: "STORY-24: Optimize dashboard load time",
      category: "wip",
      bgcolor: "lightyellow",
    },
    {
      name: "STORY-25: Implement password feature",
      category: "wip",
      bgcolor: "lightcoral",
    },
  ]);

  const [newTaskName, setNewTaskName] = useState("");

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

  const onDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };

  const onDrop = (event, category) => {
    let id = event.dataTransfer.getData("id");
    let newTasks = tasks.filter((task) => {
      if (task.name == id) {
        task.category = category;
      }
      return task;
    });

    setTasks([...newTasks]);
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
          onDragStart={(e) => onDragStart(e, t.name)}
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
          onDrop={(e) => {
            onDrop(e, "wip");
          }}
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
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, "complete")}
        >
          <div className="task-header">COMPLETED</div>
          {getTask().complete}
        </div>
      </div>
    </div>
  );
}
export default App;
