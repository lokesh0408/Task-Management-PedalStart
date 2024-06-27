import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskDetail from "./components/TaskDetail/TaskDetail";

const App = () => {
  return (
    <Router>
      {/* Wrap the application in Router to enable routing */}
      <div className="container">
        <Routes>
          {/* Define Routes to specify the routes in the application */}
          <Route path="/" element={<TaskList />} />
          {/* Route for the TaskList component at the root path */}
          <Route path="/new" element={<TaskForm />} />
          {/* Route for the TaskForm component to create a new task */}
          <Route path="/tasks/:id" element={<TaskDetail />} />
          {/* Route for the TaskDetail component to view a specific task */}
          <Route path="/edit/:id" element={<TaskForm />} />
          {/* Route for the TaskForm component to edit a specific task */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
