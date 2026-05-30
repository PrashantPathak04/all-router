import { Suspense } from "react";
import { Await, useLoaderData} from "react-router-dom";
import EventList from "./EventList";
import {useQuery} from "@tanstack/react-query";
import { loaderEvents } from "../util/http";

export default function Event() {
  const {data: events,isError,Error} = useQuery({
    queryKey: ['events'],
    queryFn: loaderEvents,
    suspense: true,
    staleTime: 1000 * 60 * 1, // 5 minutes
    // gcTime: 1000 * 60 * 2, // 10 minutes
  });

  console.log("Event component data:", events, isError, Error);

  return (
    <>
    {isError && <p>Error: {Error.message}</p>}
    <Suspense fallback={<p>Loading all events...</p>}>
      <Await resolve={events}>
        {(eventsList) => ( <EventList events={eventsList} /> )}
      </Await>
    </Suspense>
    </>
  );
}

// async function loaderEvents() {
//   const response = await fetch("http://localhost:8080/events");
//   if (!response.ok) {
//     throw new Response("Failed to fetch events.", { status: response.status });
//   }
//   console.log("Fetched events:", response);
//   return response.json();
// } 

export function loader() {
  return {events: loaderEvents()};
} 