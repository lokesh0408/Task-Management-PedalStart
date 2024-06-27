import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskForm.css";

const TaskForm = () => {
  const { id } = useParams(); // Extracting the id parameter from the URL using useParams
  const navigate = useNavigate(); // Using useNavigate hook for navigation
  const [title, setTitle] = useState(""); // State to manage task title
  const [description, setDescription] = useState(""); // State to manage task description
  const [dueDate, setDueDate] = useState(""); // State to manage task due date

  // Effect to fetch task details if editing an existing task
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/tasks/${id}`)
        .then((response) => {
          const { title, description, dueDate } = response.data; // Destructure task data from response
          setTitle(title); // Set title state with fetched data
          setDescription(description); // Set description state with fetched data
          setDueDate(dueDate.substring(0, 10)); // Format date and set dueDate state for input type date
        })
        .catch((error) => {
          console.error("Error fetching task:", error); // Log error if fetching task fails
        });
    }
  }, [id]); // Dependency array ensures effect runs only when id changes

  // Handle form submission for adding or updating tasks
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const taskData = { title, description, dueDate }; // Prepare task data object from form inputs
    try {
      if (id) {
        // If id exists, perform update request
        await axios.put(`http://localhost:5000/tasks/${id}`, taskData);
      } else {
        // If id does not exist, perform create request
        await axios.post("http://localhost:5000/tasks", taskData);
      }
      navigate("/"); // Navigate to home page after successful form submission
    } catch (error) {
      console.error("Error saving task:", error); // Log error if saving task fails
    }
  };

  // Render the task form with appropriate inputs and submit button
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-scroll-container">
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state on input change
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state on input change
          />
        </div>
        <div className="form-group">
          <label className="form-label">Due Date:</label>
          <input
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)} // Update dueDate state on input change
          />
        </div>
      </div>
      <button className="form-button" type="submit">
        {id ? "Update Task" : "Add Task"}{" "}
        {/* Dynamic button text based on id existence */}
      </button>
    </form>
  );
};

export default TaskForm;
