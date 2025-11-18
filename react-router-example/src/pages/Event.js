import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";

export default function Event() {
  const events = useLoaderData();
  const eventsList = events.events;
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8080/events/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete event.");
        }

        // Optionally, you can refresh the events list or navigate back
        window.location.reload(); // Reloads the page to fetch updated events
      } catch (error) {
        console.error(error);
        alert("Failed to delete event.");
      }
    }
  };

  return (
    <div style={{ marginLeft: "8%", marginRight: "8%", maxWidth: 960  }}>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Link
                  to={`${event.id}`}
                  style={{
                    display: "flex",
                    gap: 12,
                    textDecoration: "none",
                    color: "inherit",
                    alignItems: "flex-start",
                    flex: 1,
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

                <div>
                  <button
                    onClick={() => navigate(`${event.id}/edit`)}
                    style={{
                      padding: "6px 12px",
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 500,
                      marginLeft: 12,
                      flexShrink: 0,
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    style={{
                      padding: "6px 12px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 500,
                      marginLeft: 12,
                      flexShrink: 0,
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response("Failed to fetch events.", { status: response.status });
  }
  return response.json();
}