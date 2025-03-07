import React from "react";
import useTasks from "../hooks/useTasks";

export default function Home() {
  const { tasks, addTask, markTaskAsCompleted } = useTasks();

  return (
    <div className="home-background">
        {/* Content Wrapper */}
        <div className="home-content-wrapper">

            {/* To-Do List (Right Side Panel) */}
            <div className="todo-panel-home">
            <h2>To-Do List</h2>
            <ul>
                {tasks.map((task) => (
                <li key={task.id}>
                    {task.title}
                    <button onClick={() => markTaskAsCompleted(task.id)}>
                    ✔
                    </button>
                </li>
                ))}
            </ul>
            <button onClick={() => addTask({ title: "New Task" })}>
                + Add Task
            </button>
            </div>
            
        </div>
    </div>
  );
}
