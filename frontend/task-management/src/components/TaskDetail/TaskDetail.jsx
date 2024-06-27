import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Importing necessary hooks from react-router-dom for routing
import "./TaskDetail.css";

const TaskDetail = () => {
  const { id } = useParams(); // Extracting the id parameter from the URL using useParams
  const [task, setTask] = useState({}); // State to store the task details
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  // Fetch task details from the server based on the id parameter
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`);
        setTask(response.data); // Updating state with the fetched task data
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask(); // Invoke the fetchTask function on component mount and whenever id changes
  }, [id]);

  // Handle delete operation for the current task
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      navigate("/"); // Navigate to the home page after successful deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle edit operation for the current task
  const handleEdit = () => {
    navigate(`/edit/${id}`); // Navigate to the edit page for the current task
  };

  // Render the task details and provide buttons for edit and delete actions
  return (
    <div className="task-detail">
      <h1 className="task-title">{task.title}</h1>
      <p className="task-description">{task.description}</p>
      <p className="task-due-date">{task.dueDate}</p>
      <div className="button-container">
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
