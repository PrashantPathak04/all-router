import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Root.module.css";
import Newsletter from "./Newsletter";
import { useContext, useEffect } from "react";
import { AuthContext } from "../App";

export default function Root() {
  const authCtx = useContext(AuthContext);
  const isLoginedIn = authCtx.isLoggedIn;
  const location = useLocation();
  const navigate = useNavigate();

  // sync login state from localStorage on navigation (e.g., after action sets token)
  useEffect(() => {
    authCtx.setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    authCtx.setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <ul className={styles.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Home
              </NavLink>
            </li>
            {isLoginedIn && (
              <li>
                <NavLink
                  to="events"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                >
                  Events
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="newsletter"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Newsletter
              </NavLink>
            </li>
            <li>
              <NavLink
                to="auth"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          </ul>
          <div className={styles.actions}>
            <Newsletter />
            {isLoginedIn && (
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={logoutHandler}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
