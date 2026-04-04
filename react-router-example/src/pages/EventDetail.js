import { useParams, useNavigate, useLoaderData,useSubmit } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "./PageWrapper";

export default function EventDetail() {
    const params = useParams();
    const data = useLoaderData();
    const event = data?.event ?? data;
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);
    const submit = useSubmit();

    const handleDelete = async () => {
        if (!window.confirm("Delete this event? This action cannot be undone.")) return;
        setDeleting(true);
        try {
            submit(null, { method: "delete"});
        } catch (err) {
            console.error(err);
            alert("Could not delete event.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <PageWrapper
            title={event?.title ?? `Event ${params.id}`}
            subtitle="Detailed information and actions."
        >
            <button onClick={() => navigate("/events")} style={{ marginBottom: 20, padding: '10px 14px', borderRadius: 10, border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}>
                ← Back to Events
            </button>

            <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: 'wrap' }}>
                <div style={{ flex: "0 0 320px", minWidth: 280 }}>
                    {event?.image ? (
                        <img
                            src={event.image}
                            alt={event.title || "Event image"}
                            style={{ width: "100%", height: "auto", borderRadius: 18, objectFit: "cover" }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                paddingTop: "56%",
                                background: "#f0f0f0",
                                borderRadius: 18,
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

                <div style={{ flex: 1, minWidth: 280 }}>
                    <p style={{ color: "#4b5563", marginTop: 0, whiteSpace: "pre-wrap" }}>
                        {event?.description ?? event?.desc ?? "No description available."}
                    </p>

                    <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate(`/events/${params.id}/edit`)}
                            style={{
                                padding: "12px 16px",
                                background: "#28a745",
                                color: "#fff",
                                border: "none",
                                borderRadius: 12,
                                cursor: 'pointer',
                                minWidth: 120,
                            }}
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            style={{
                                padding: "12px 16px",
                                background: "#dc3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: 12,
                                cursor: deleting ? "not-allowed" : "pointer",
                                minWidth: 120,
                            }}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export async function loader({ params }) {
  const response = await fetch(`http://localhost:8080/events/${params.id}`);
  if (!response.ok) {
    throw new Response("Failed to fetch event.", { status: response.status });
  }
  return response.json();
}

export async function action({ params, request }) {
    if (request.method.toLowerCase() !== "delete") {
        throw new Response("Method Not Allowed", { status: 405 });
    }       
    const response = await fetch(`http://localhost:8080/events/${params.id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
     throw new Response("Failed to delete event.", { status: response.status });
    }  
    return null;
}           
