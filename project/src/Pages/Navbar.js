import React from "react";
import "../CSS/Navbar.css";

const Navbar = ({ handleLogout }) => {
  return (
    <header className="navbar">
      <div className="navbar-brand">Campus Rent</div>
      <div className="navbar-search">
        <input type="text" placeholder="Search for products, brands and more" />
        <button>🔍</button>
      </div>
      <div className="navbar-links">
        <a href="/home">Home</a>
        <a href="/profile">Profile</a>
        <a
          href="./"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Logout
        </a>
      </div>
    </header>
  );
};

export default Navbar;
