import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "contexts";
import { toast } from "react-toastify";
import { authDispatchConstants } from "utilities";

export function Header() {
  const [showNav, setShowNav] = useState(false);
  const {
    userState: { isLoggedIn },
    userDispatch,
    setShowAuthModal,
  } = useAuth();
  const { LOGOUT } = authDispatchConstants;
  const hamburgerClickHandler = () => setShowNav((prev) => !prev);
  const loginClickHandler = () => setShowAuthModal(true);
  const logoutClickHandler = () => {
    userDispatch({ type: LOGOUT });
    toast.success("Logged out successfully!");
  };

  const getActiveLinkColor = ({ isActive }) =>
    isActive
      ? { color: "var(--tr-accent-color)" }
      : { color: "var(--tr-white)" };

  const AuthButton = () =>
    isLoggedIn ? (
      <button
        onClick={logoutClickHandler}
        className="bg-transparent bd-none txt-white txt-md txt-semibold"
      >
        Logout
      </button>
    ) : (
      <button
        onClick={loginClickHandler}
        className="bg-transparent bd-none txt-white txt-md txt-semibold"
      >
        Login
      </button>
    );

  return (
    <header className="d-flex pd-x-lg pd-y-sm align-i-center f-wrap">
      <h2 className="logo txt-xlg txt-accent">
        <NavLink to="/">Crickstreams</NavLink>
      </h2>
      <button
        className="hamburger mr-left-auto tr-btn tr-btn-icon hide"
        onClick={hamburgerClickHandler}
      >
        <i className="fas fa-bars"></i>
      </button>
      <ul
        className={`nav mr-left-auto d-flex align-i-center gap-sm ${
          showNav && "active"
        }`}
      >
        <li>
          <NavLink
            className="txt-white txt-md txt-semibold"
            style={getActiveLinkColor}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="txt-white txt-md txt-semibold"
            style={getActiveLinkColor}
            to="/explore"
          >
            Explore
          </NavLink>
        </li>
        <li>
          <AuthButton />
        </li>
      </ul>
    </header>
  );
}
