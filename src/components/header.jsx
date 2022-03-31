import { useState } from "react";
import { Link } from "react-router-dom";
export function Header() {
  const [showNav, setShowNav] = useState(false);
  const hamburgerClickHandler = () => setShowNav((prev) => !prev);
  return (
    <header className="d-flex pd-x-lg pd-y-sm align-i-center f-wrap">
      <h2 className="logo txt-xlg txt-accent">
        <Link to="/">Cricstreams</Link>
      </h2>
      <button
        className="hamburger ml-auto tr-btn tr-btn-icon hide"
        onClick={hamburgerClickHandler}
      >
        <i className="fas fa-bars"></i>
      </button>
      <ul className={`nav ml-auto d-flex align-i-center gap-sm ${showNav && 'active'}`}>
        <li>
          <Link className="txt-white txt-md txt-semibold" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="txt-white txt-md txt-semibold" to="/explore">
            Explore
          </Link>
        </li>
        <li>
          <Link className="txt-white txt-md txt-semibold" to="/auth">
            Login
          </Link>
        </li>
      </ul>
    </header>
  );
}
