import { Outlet, useNavigate } from "react-router-dom";

export default function EventsRoot() {
  const navigate = useNavigate();

  return (
    <div style={{ marginLeft: "8%", marginRight: "8%", maxWidth: 960 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0" }}>
        <h1 style={{ margin: 0 }}>Events</h1>
        <button
          onClick={() => navigate("add")}
          style={{
            padding: "8px 14px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          + Add New Event
        </button>
      </div>
      <p>Details about the event will be displayed here.</p>
      <Outlet />
    </div>
  );
}