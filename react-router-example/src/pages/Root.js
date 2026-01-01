import { NavLink, Outlet,useLocation } from "react-router-dom";
import styles from './Root.module.css';
import Newsletter from "./Newsletter";
import { useContext, useEffect } from "react";
import { AuthContext } from "../App";

export default function Root() {
  const authCtx = useContext(AuthContext);
  const isLoginedIn = authCtx.isLoggedIn;  
  const location = useLocation();

  // sync login state from localStorage on navigation (e.g., after action sets token)
  useEffect(() => {
    authCtx.setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <ul className={styles.list}>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>Home</NavLink>
            </li>
            { isLoginedIn && (
            <li>
              <NavLink to="events" className={({ isActive }) => (isActive ? styles.active : undefined)}>Events</NavLink>
            </li>
              )}
            <li>
              <NavLink to="newsletter" className={({ isActive }) => (isActive ? styles.active : undefined)}>Newsletter</NavLink>
            </li>
             <li>
              <NavLink to="auth" className={({ isActive }) => (isActive ? styles.active : undefined)}>Authentication</NavLink>
            </li>
          </ul>
             <Newsletter />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
