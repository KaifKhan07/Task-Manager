import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../src/Components/Header";
import AddTask from "./Pages/AddTask";
import Tasks from "./Pages/Task";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Login";
import ProtectedRoutes from "./Pages/ProtectedRoutes";

const App = () => {
  return (
    <div>
      <Router>
        <Header />

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ProtectedRoutes Component={AddTask} />} />
            <Route
              path="/tasks"
              element={<ProtectedRoutes Component={Tasks} />}
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
