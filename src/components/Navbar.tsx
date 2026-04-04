"use client";
import { useState } from "react";
import Link from "next/link";
import "./Navbar.css"; // We will create this

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo-link">
          <div className="logo-placeholder">CCFC</div>
          <span className="logo-text">Castlebar Celtic</span>
        </Link>
        
        {/* Hamburger Icon */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Nav Links */}
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link href="/" className="nav-item" onClick={toggleMenu}>Home</Link>
          <Link href="/teams" className="nav-item" onClick={toggleMenu}>Teams & Fixtures</Link>
          <Link href="/shop" className="nav-item" onClick={toggleMenu}>Shop</Link>
          
          <div className="dropdown">
            <span className="nav-item dropdown-toggle">Fundraise</span>
            <div className="dropdown-menu">
              <Link href="/fundraise/lotto" className="dropdown-item" onClick={toggleMenu}>Play Club Lotto</Link>
            </div>
          </div>
          
          <Link href="/about" className="nav-item" onClick={toggleMenu}>About</Link>
          
          <Link href="/shop" className="btn-primary" onClick={toggleMenu}>Store</Link>
        </div>
      </div>
    </nav>
  );
}
