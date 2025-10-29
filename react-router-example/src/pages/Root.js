import { NavLink, Outlet } from "react-router-dom";
import styles from './Root.module.css';
export default function Root() {
  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul className={styles.list}>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="events" className={({ isActive }) => (isActive ? styles.active : undefined)}>Events</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
