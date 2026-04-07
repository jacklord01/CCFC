"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClubSettings } from "@/lib/settings";
import "./Navbar.css";

export default function Navbar({ settings }: { settings: ClubSettings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isActive = (path: string) => pathname === path;
  const isFundraiseActive = pathname?.startsWith("/fundraise");

  const closeAll = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">

        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={closeAll}>
          <div className="nav-logo-img" style={{ backgroundImage: `url('${settings.CLUB_LOGO}')` }} />
          <span className="nav-logo-text">{settings.CLUB_NAME}</span>
        </Link>

        {/* Desktop + Mobile Nav Links */}
        <ul className={`nav-links${mobileOpen ? " mobile-open" : ""}`} role="list">
          <li>
            <Link href="/" className={`nav-link${isActive("/") ? " active" : ""}`} onClick={closeAll}>Home</Link>
          </li>
          <li>
            <Link href="/teams" className={`nav-link${isActive("/teams") ? " active" : ""}`} onClick={closeAll}>Matches</Link>
          </li>
          <li>
            <Link href="/news" className={`nav-link${isActive("/news") ? " active" : ""}`} onClick={closeAll}>News</Link>
          </li>
          <li>
            <Link href="/gallery" className={`nav-link${isActive("/gallery") ? " active" : ""}`} onClick={closeAll}>Gallery</Link>
          </li>
          <li>
            <Link href="/about" className={`nav-link${isActive("/about") ? " active" : ""}`} onClick={closeAll}>About Us</Link>
          </li>
          <li>
            <Link href="/shop" className={`nav-link${isActive("/shop") ? " active" : ""}`} onClick={closeAll}>Shop</Link>
          </li>

          {/* Fundraise Dropdown */}
          <li className="nav-dropdown">
            <button
              className={`nav-dropdown-toggle${isFundraiseActive ? " active" : ""}${dropdownOpen ? " open" : ""}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              Fundraise
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`nav-dropdown-menu${dropdownOpen ? " open" : ""}`} role="menu">
              <Link href="/fundraise/lotto" className="nav-dropdown-item" onClick={closeAll} role="menuitem">
                🎟 Lotto
              </Link>
              <Link href="/fundraise/donation" className="nav-dropdown-item" onClick={closeAll} role="menuitem">
                💚 Donate
              </Link>
            </div>
          </li>

          <li>
            <Link href="/contact" className={`nav-link${isActive("/contact") ? " active" : ""}`} onClick={closeAll}>Contact</Link>
          </li>

          {/* Cart Component Obsoleted by SumUp external linking */}
        </ul>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => { setMobileOpen(!mobileOpen); setDropdownOpen(false); }}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span style={{ transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>

      </div>
    </nav>
  );
}
