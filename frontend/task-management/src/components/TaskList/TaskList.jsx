import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // State to hold tasks fetched from server

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks"); // Fetch tasks from server
        setTasks(response.data); // Set tasks state with fetched data
      } catch (error) {
        console.error("Error fetching tasks:", error); // Log error if fetching tasks fails
      }
    };
    fetchTasks(); // Invoke fetchTasks function on component mount
  }, []); // Dependency array is empty, so effect runs only once on mount

  // Function to handle deletion of a task by its id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`); // Send delete request to server
      setTasks(tasks.filter((task) => task._id !== id)); // Update tasks state by filtering out deleted task
    } catch (error) {
      console.error("Error deleting task:", error); // Log error if deletion fails
    }
  };

  // Render the task list with each task displayed as an item
  return (
    <div className="task-list-container">
      <h1 className="task-list-title">Task List</h1>
      <Link to="/new" className="add-task-link">
        Add New Task
      </Link>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <h2 className="task-title">{task.title}</h2>
            <p className="task-description">{task.description}</p>
            <p className="task-due-date">{task.dueDate}</p>
            <div className="button-container">
              <Link to={`/tasks/${task._id}/edit`} className="edit-button">
                Edit
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
