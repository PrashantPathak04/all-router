import { Link, useLoaderData } from "react-router-dom";

export default function Event() {
  // const [eventsList, seteventsList] = useState([]);
  const events = useLoaderData();
  const eventsList = events.events;
  // useEffect(() => {
  //   const fetchEvents = 
  //   fetchEvents();
  // }, []);

  return (
    <>
      <h1>Event Page</h1>
      <p>Details about the event will be displayed here.</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {eventsList.length === 0 ? (
          <li>Loading events…</li>
        ) : (
          eventsList.map((event) => (
            <li
              key={event.id}
              style={{
                marginBottom: 16,
                border: "1px solid #e6e6e6",
                padding: 12,
                borderRadius: 8,
                background: "#fff",
              }}
            >
              <Link
                to={`${event.id}`}
                style={{
                  display: "flex",
                  gap: 12,
                  textDecoration: "none",
                  color: "inherit",
                  alignItems: "flex-start",
                }}
              >
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title || "Event image"}
                    style={{
                      width: 160,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 6,
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 160,
                      height: 100,
                      background: "#f0f0f0",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#777",
                      flexShrink: 0,
                    }}
                  >
                    No image
                  </div>
                )}

                <div>
                  <h2 style={{ margin: "0 0 6px", fontSize: 18 }}>
                    {event.title || "Untitled event"}
                  </h2>
                  <p style={{ margin: 0, color: "#444", whiteSpace: "pre-wrap" }}>
                    {event.description || event.desc || "No description available."}
                  </p>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}


export async function loader (){
        const response = await fetch("http://localhost:8080/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        return response.json();
    } 