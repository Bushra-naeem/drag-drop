import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      name: "STORY-21: Fix search bug",
      category: "wip",
      bgcolor: "lightgrey",
    },
    {
      name: "STORY-22: Update user profile UI",
      category: "in-progress",
      bgcolor: "lightblue",
    },
    {
      name: "STORY-23: Add login error handling",
      category: "completed",
      bgcolor: "lightgreen",
    },
    {
      name: "STORY-24: Optimize dashboard load time",
      category: "wip",
      bgcolor: "lightyellow",
    },
    {
      name: "STORY-25: Implement password reset feature",
      category: "pending",
      bgcolor: "lightcoral",
    },
  ]);

  const onDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };

  //fetches the card id and based on that update the status/category of that card in tasks state
  const onDrop = (event, cat) => {
    let id = event.dataTransfer.getData("id");
    let newTasks = tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });

    setTasks([...newTasks]);
  };

  //method to filter tasks beased on their status
  const getTask = () => {
    const tasksToRender = {
      wip: [],
      complete: [],
    };

    //this div is the task card which is 'draggable' and calls onDragStart method
    //when we drag it
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
        <div className="wip">
          <div className="task-header">In-PROGRESS</div>
          {tasks.map((task, index) => (
            <div key={index} className="task-card">
              <h4>{task.name}</h4>
            </div>
          ))}
        </div>
        <div>
          <div className="task-header">COMPLETED</div>
        </div>
      </div>
    </div>
  );
}

export default App;
