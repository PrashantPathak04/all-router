import { Outlet, useNavigate } from "react-router-dom";
import PageWrapper from "./PageWrapper";

export default function EventsRoot() {
  const navigate = useNavigate();

  return (
    <PageWrapper
      title="Events"
      subtitle="Browse and manage your events in one place."
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0', gap: '1rem', flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#1f2937' }}>Event Dashboard</h2>
        <button
          onClick={() => navigate("add")}
          style={{
            padding: '10px 18px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          + Add New Event
        </button>
      </div>
      <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
        Select an event from the list or create a new one.
      </p>
      <Outlet />
    </PageWrapper>
  );
}