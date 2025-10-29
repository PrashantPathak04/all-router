import { Link } from "react-router-dom";

export default function Event() {
  const eventsList = [
    { id: 'e1', title: 'Event 1' },
    { id: 'e2', title: 'Event 2' },
  ];

    return <>
    <h1>Event Page</h1>
    <p>Details about the event will be displayed here.</p>
    <ul>
      {eventsList.map(event => (
        <li key={event.id}><Link to={`eventDetails/${event.id}`}>{event.title}</Link></li>
      ))}
    </ul>
    </>;
}
