import React from "react";
import "./layout.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Simulation System | Designed & Developed by{" "}
        <a
          href="https://github.com/Koushik9010"
          target="_blank"
          rel="noopener noreferrer"
        >
          Koushik Dey
        </a>
      </p>
    </footer>
  );
};

export default Footer;
