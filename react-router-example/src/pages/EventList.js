import { Link, useNavigate } from "react-router-dom";

const EventList = (eventsList) => {
    const events = eventsList.events.events;
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
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '2rem',
            listStyle: 'none',
            padding: 0
        }}>
                {events.length === 0 ? (
                    <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: '1rem'
                        }}>
                            ⏳
                        </div>
                        <h3 style={{
                            color: '#34495e',
                            marginBottom: '0.5rem',
                            fontSize: '1.5rem'
                        }}>
                            Loading Amazing Events...
                        </h3>
                        <p style={{
                            color: '#7f8c8d',
                            margin: 0,
                            fontSize: '1.1rem'
                        }}>
                            Please wait while we fetch the latest events for you
                        </p>
                    </div>
                ) : (
                    events.map((event) => (
                        <div
                            key={event.id}
                            style={{
                                background: 'white',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                border: '2px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                                e.currentTarget.style.borderColor = '#3498db';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <Link
                                to={`${event.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    display: 'block'
                                }}
                            >
                                {event.image ? (
                                    <div style={{ position: 'relative' }}>
                                        <img
                                            src={event.image}
                                            alt={event.title || "Event image"}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            background: 'rgba(52, 152, 219, 0.9)',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>
                                            📅 Event
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{
                                        height: '200px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '3rem'
                                    }}>
                                        🎪
                                    </div>
                                )}

                                <div style={{ padding: '1.5rem 1.5rem 0 1.5rem' }}>
                                    <h2 style={{
                                        margin: '0 0 0.5rem 0',
                                        fontSize: '1.4rem',
                                        color: '#2c3e50',
                                        fontWeight: '600',
                                        lineHeight: '1.3'
                                    }}>
                                        {event.title || "Untitled Event"}
                                    </h2>
                                    <p style={{
                                        margin: 0,
                                        color: '#7f8c8d',
                                        lineHeight: '1.5',
                                        fontSize: '0.95rem',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {event.description || event.desc || "No description available."}
                                    </p>
                                </div>
                            </Link>

                            <div style={{
                                padding: '0 1.5rem 1.5rem 1.5rem'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    justifyContent: 'center',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid #ecf0f1'
                                }}>
                                    <button
                                        onClick={() => navigate(`${event.id}/edit`)}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '25px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)',
                                            flex: 1
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.3)';
                                        }}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '25px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
                                            flex: 1
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)';
                                        }}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
    );
};

export default EventList;
