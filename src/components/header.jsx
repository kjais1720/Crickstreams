import { useState } from "react";
import { NavLink } from "react-router-dom";
export function Header() {
  const [showNav, setShowNav] = useState(false);
  const hamburgerClickHandler = () => setShowNav((prev) => !prev);
  const getActiveLinkColor = ({isActive}) => isActive ? {color:"var(--tr-accent-color)"} : {color:"var(--tr-white)"};
  return (
    <header className="d-flex pd-x-lg pd-y-sm align-i-center f-wrap">
      <h2 className="logo txt-xlg txt-accent">
        <NavLink to="/">Cricstreams</NavLink>
      </h2>
      <button
        className="hamburger ml-auto tr-btn tr-btn-icon hide"
        onClick={hamburgerClickHandler}
      >
        <i className="fas fa-bars"></i>
      </button>
      <ul className={`nav ml-auto d-flex align-i-center gap-sm ${showNav && 'active'}`}>
        <li>
          <NavLink className="txt-white txt-md txt-semibold" style={getActiveLinkColor} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="txt-white txt-md txt-semibold" style={getActiveLinkColor} to="/explore">
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink className="txt-white txt-md txt-semibold" style={getActiveLinkColor} to="/auth">
            Login
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
