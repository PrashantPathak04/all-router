import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Event, { loader as eventLoader } from "./pages/Event";
import NewEvent,{action as eventSaveAction} from "./pages/NewEvent";

import Root from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";
import EventDetail,{loader as eventDetailLoader,action as deleteAction} from "./pages/EventDetail";
import ErrorDetail from "./pages/ErrorDetail";
import {action as NewsletterAction} from "./pages/Newsletter";
import NewsletterSignup from "./pages/NewsletterSignup";
import Auth, { action as authAction } from "./pages/Auth";
import { requireAuth } from "./util/requireAuth";
import { createContext,useState } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";
// import { useLocation } from "react-router-dom";

export const AuthContext = createContext(false);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorDetail />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <ProtectedRoute><EventsRoot /></ProtectedRoute>,
        // loader: requireAuth,
        children: [
          { index: true, element: <Event />, loader: eventLoader}, 
          { path: ":id", element: <EventDetail />, loader:eventDetailLoader, action: deleteAction},
          { path: ":id/edit", element: <NewEvent />, loader: eventDetailLoader,action: eventSaveAction },
        ],
      },
      { path: "events/add", element: <NewEvent />, action: eventSaveAction, loader: requireAuth},
      { path: "auth", element: <Auth />, action: authAction},
      { path: "newsletter", element: <NewsletterSignup />, action: NewsletterAction},
    ],
  },
]);

function App() {
  const [isLoginedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoginedIn, setIsLoggedIn }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;