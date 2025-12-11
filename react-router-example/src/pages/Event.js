import { Suspense } from "react";
import { Await, useLoaderData} from "react-router-dom";
import EventList from "./EventList";

export default function Event() {
  const {events} = useLoaderData(); // now events is the resolved data
  // const navigate = useNavigate()


  return (
    <Suspense fallback={<p>Loading all events...</p>}>
      <Await resolve={events}>
        {(eventsList) => ( <EventList events={eventsList} /> )}
      </Await>
    </Suspense>
  );
}

async function loaderEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response("Failed to fetch events.", { status: response.status });
  }
  console.log("Fetched events:", response);
  return response.json();
} 

export function loader() {
  return {events: loaderEvents()};
} 