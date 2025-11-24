import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./layout.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamically set title based on route
  const getTitle = () => {
    switch (location.pathname) {
      case "/newspaper":
        return "Newspaper Simulation System";
      case "/two-server":
        return "2-Server Simulation System";
      case "/":
        return "Single Server Simulation System";
      default:
        return "Simulation System";
    }
  };

  const handleNavigation = (route) => {
    setOpen(false);
    navigate(route);
  };

  return (
    <header className="header">
      <h1 className="header-title">{getTitle()}</h1>

      <div className="dropdown-container">
        <button className="dropdown-button" onClick={() => setOpen(!open)}>
          Go To
        </button>

        {open && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => handleNavigation("/")}
            >
              Single Server Simulation
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleNavigation("/newspaper")}
            >
              Newspaper Simulation
            </div>

            <div
              className="dropdown-item"
              onClick={() => handleNavigation("/two-server")}
            >
              2-Server Simulation
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
