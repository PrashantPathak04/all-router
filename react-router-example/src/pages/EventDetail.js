import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";

export default function EventDetail() {
    const params = useParams();
    const data = useLoaderData();
    const event = data?.event ?? data; // handle responses like { event: {...} } or {...}
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Delete this event? This action cannot be undone.")) return;
        setDeleting(true);
        try {
            const res = await fetch(`http://localhost:8080/events/${params.id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete event");
            navigate("/events", { replace: true });
        } catch (err) {
            console.error(err);
            alert("Could not delete event.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <div style={{ maxWidth: 900, margin: "16px auto", padding: 16 }}>
                <button onClick={() => navigate("/events")} style={{ marginBottom: 12 }}>
                    ← Back to Events
                </button>

                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div style={{ flex: "0 0 320px" }}>
                        {event?.image ? (
                            <img
                                src={event.image}
                                alt={event.title || "Event image"}
                                style={{ width: "100%", height: "auto", borderRadius: 8, objectFit: "cover" }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    paddingTop: "56%",
                                    background: "#f0f0f0",
                                    borderRadius: 8,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#666",
                                }}
                            >
                                No image
                            </div>
                        )}
                    </div>

                    <div style={{ flex: 1 }}>
                        <h1 style={{ marginTop: 0 }}>{event?.title ?? `Event ${params.id}`}</h1>
                        <p style={{ color: "#444", whiteSpace: "pre-wrap" }}>
                            {event?.description ?? event?.desc ?? "No description available."}
                        </p>

                        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                            <button
                                onClick={() => navigate(`/events/${params.id}/edit`)}
                                style={{
                                    padding: "8px 12px",
                                    background: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                }}
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                style={{
                                    padding: "8px 12px",
                                    background: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 6,
                                    cursor: deleting ? "not-allowed" : "pointer",
                                }}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function loader({ params }) {
  const response = await fetch(`http://localhost:8080/events/${params.id}`);
  if (!response.ok) {
    throw new Response("Failed to fetch event.", { status: response.status });
  }
  return response.json();
}
