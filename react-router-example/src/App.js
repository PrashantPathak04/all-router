import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Event, { loader as eventLoader } from "./pages/Event";
import NewEvent from "./pages/NewEvent";

import Root from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";
import EventDetail,{loader as eventDetailLoader} from "./pages/EventDetail";
import ErrorDetail from "./pages/ErrorDetail";

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
          { path: ":id", element: <EventDetail />, loader:eventDetailLoader},
          { path: ":id/edit", element: <NewEvent />, loader: eventDetailLoader },
        ],
      },
      { path: "events/add", element: <NewEvent /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;