import React from "react";
import "./layout.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // get current route

  // Determine button text and link based on current page
  const isDynamic = location.pathname === "/dynamic";
  const buttonText = isDynamic
    ? "Move To Static Simulation"
    : "Move To Dynamic Simulation";
  const buttonLink = isDynamic ? "/" : "/dynamic";

  return (
    <header className="header">
      <h1 className="header-title">Single Server Simulation System</h1>
      <div className="dynamic-page">
        <Link to={buttonLink} className="dynamic-button">
          {buttonText}
        </Link>
      </div>
    </header>
  );
};

export default Header;
