import { NavLink, Outlet } from "react-router-dom";
import styles from './Root.module.css';
import Newsletter from "./Newsletter";
export default function Root() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <ul className={styles.list}>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="events" className={({ isActive }) => (isActive ? styles.active : undefined)}>Events</NavLink>
            </li>
            <li>
              <NavLink to="newsletter" className={({ isActive }) => (isActive ? styles.active : undefined)}>Newsletter</NavLink>
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
