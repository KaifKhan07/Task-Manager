import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

const Header = () => {
  const [login, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('login');
    setIsLogin(false);
    navigate('/login');
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem('login') === "true";
    setIsLogin(loginStatus);
  }, []);

  return (
    <>
      {login && (
        <nav>
          <ul className="d-flex justify-content-center gap-5 bg-dark p-3 fs-4 w-100">
            <li>
              <Link to="/" className="links">Add Task</Link>
            </li>
            <li>
              <Link to="/tasks" className="links">Tasks</Link>
            </li>
            {/* Align logout button to the right */}
            <li className="logout-container">
              <Link 
                to="/login" 
                className="links logout-btn" 
                onClick={logout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
