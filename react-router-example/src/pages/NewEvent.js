import { useNavigate, useLoaderData, Form, redirect,useActionData } from "react-router-dom";
import { useState, useEffect } from "react";
import PageWrapper from "./PageWrapper";

export default function NewEvent() {
    const EditloaderEvent = useLoaderData();
    const loaderEvent = EditloaderEvent?.event ?? EditloaderEvent;
    const navigate = useNavigate();
    const actionData = useActionData();
    const [formData, setFormData] = useState(() => ({
        title: loaderEvent?.title ?? "",
        description: loaderEvent?.description ?? loaderEvent?.desc ?? "",
        image: loaderEvent?.image ?? "",
        date: loaderEvent?.date ?? loaderEvent?.dateTime ?? "",
    }));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (loaderEvent) {
            setFormData({
                title: loaderEvent.title ?? "",
                description: loaderEvent.description ?? loaderEvent.desc ?? "",
                image: loaderEvent.image ?? "",
                date: loaderEvent.date ?? loaderEvent.dateTime ?? "",
            });
        }
    }, [loaderEvent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isEditMode = !!(loaderEvent && (loaderEvent.id ?? loaderEvent._id));

    return (
        <PageWrapper
            title={isEditMode ? "Edit Event" : "Add New Event"}
            subtitle="Use this form to save and update event details."
        >
            {error && (
                <div style={{ background: "#f8d7da", color: "#721c24", padding: 12, borderRadius: 8, marginBottom: 16 }}>
                    {error}
                </div>
            )}

            <Form method={isEditMode ? "patch" : "post"} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {actionData?.errors && (
                   <>
                       {Object.values(actionData.errors).map((errMsg, index) => (
                           <div key={index} style={{ color: "red", marginBottom: 8 }}>{errMsg}</div>
                       ))}
                   </>
                )}
                <div>
                    <label htmlFor="title" style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
                        Event Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px 14px",
                            border: "1px solid #ddd",
                            borderRadius: 10,
                            fontSize: 14,
                            boxSizing: "border-box",
                        }}
                        placeholder="Enter event title"
                    />
                </div>

                <div>
                    <label htmlFor="description" style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
                        Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="5"
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            borderRadius: 4,
                            fontSize: 14,
                            boxSizing: "border-box",
                            fontFamily: "inherit",
                        }}
                        placeholder="Enter event description"
                    />
                </div>

                <div>
                    <label htmlFor="image" style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
                        Image URL
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            borderRadius: 4,
                            fontSize: 14,
                            boxSizing: "border-box",
                        }}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div>
                    <label htmlFor="date" style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
                        Event Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date ? String(formData.date).slice(0, 10) : ""}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid #ddd",
                            borderRadius: 4,
                            fontSize: 14,
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "10px 16px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: 4,
                            cursor: loading ? "not-allowed" : "pointer",
                            fontSize: 14,
                            fontWeight: 500,
                            opacity: loading ? 0.6 : 1,
                        }}
                    >
                        {loading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Event" : "Create Event")}
                    </button>
                    <button
                        type="button"
                        onClick={() => (isEditMode ? navigate(`/events/${loaderEvent.id ?? loaderEvent._id}`) : navigate("/events"))}
                        style={{
                            padding: "10px 16px",
                            background: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </Form>
        </PageWrapper>
    );
}

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    const eventData = {
        title: data.get("title"),
        description: data.get("description"),
        image: data.get("image"),
        date: data.get("date"),
    };
    const isEdit = method === "PATCH";

    const url = isEdit
        ? `http://localhost:8080/events/${params.id}`
        : "http://localhost:8080/events";               
    const response = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
    });                         
    if(response.status === 422){
        return response;
    }   

    if (!response.ok) {
        throw new Response("Could not save event.", { status: 500 });
    }           

    return redirect("/events");
}    