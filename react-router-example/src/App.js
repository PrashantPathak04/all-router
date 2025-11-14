import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import Event,{loader as eventLoader} from './pages/Event';
// import NewEvent from './pages/NewEvent';

import Root from './pages/Root';
import EventDetail from './pages/EventDetail';
import ErrorDetail from './pages/ErrorDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<ErrorDetail/>,
    children: [
      { index: true, element: <Home /> },
      { path: "events", element: <Event />, loader:eventLoader},
      { path: "events/:id", element: <EventDetail /> },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
