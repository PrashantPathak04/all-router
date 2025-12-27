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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorDetail />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          { index: true, element: <Event />, loader: eventLoader}, 
          { path: ":id", element: <EventDetail />, loader:eventDetailLoader, action: deleteAction},
          { path: ":id/edit", element: <NewEvent />, loader: eventDetailLoader,action: eventSaveAction },
        ],
      },
      { path: "events/add", element: <NewEvent />, action: eventSaveAction},
      { path: "auth", element: <Auth />, action: authAction},
      { path: "newsletter", element: <NewsletterSignup />, action: NewsletterAction},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;