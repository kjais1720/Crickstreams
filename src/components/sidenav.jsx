import { NavLink, Link } from "react-router-dom";
import styles from "./styles/sidenav.module.css";
export function SideNav() {
  const navLinks = [
    {
      path: "/explore",
      name: "Explore",
      icon: "compass",
    },
    {
      path: "/playlists",
      name: "Playlists",
      icon: "list",
    },
    {
      path: "/liked-videos",
      name: "Liked videos",
      icon: "thumbs-up",
    },
    {
      path: "/history",
      name: "History",
      icon: "history",
    },
    {
      path: "/watch-later",
      name: "Watch later",
      icon: "bookmark",
    },
  ];
  return (
    <aside className={styles.navigation}>
      <ul>
        {navLinks.map(({ path, name, icon }, idx) => (
          <li key={idx} className={styles.listItem}>
            <NavLink
              to={path}
              className={`${styles.link} sidenav-link d-flex pd-xs align-i-center`}
            >
              <span className={`${styles.linkIcon} far fa-${icon}`}></span>
              <span className={styles.linkTitle}>{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
