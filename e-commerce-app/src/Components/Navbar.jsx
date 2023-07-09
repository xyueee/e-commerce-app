import React, { Component, useRef } from "react";
import { BiCart } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import "../Styles/Navbar.css";

const Navbar = () => {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    <>
      <nav ref={navRef} className="navbar">
        <a href="/#">Products</a>
        <button className="nav-button" onClick={showNavbar}>
          <BiCart></BiCart>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
