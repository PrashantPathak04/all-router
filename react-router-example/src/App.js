import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Event from './pages/Event';
// import NewEvent from './pages/NewEvent';

import Root from './pages/Root';
import EventDetail from './pages/EventDetail';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "events", element: <Event /> },
      { path: "events/eventDetails/:id", element: <EventDetail /> },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
