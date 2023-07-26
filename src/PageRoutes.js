import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import TodoList from "./components/TodoList";
import Profile from "./components/Profile";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};
export default PageRoutes;
