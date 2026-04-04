import PageWrapper from "./PageWrapper";

export default function Home() {
  return (
    <PageWrapper
      title="Welcome to React Router Example"
      subtitle="Explore routing, transitions, and TanStack Router in a polished UI."
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#34495e', marginBottom: '2rem' }}>
          Explore the power of client-side routing in React applications.
        </p>

        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#3498db', marginBottom: '1rem' }}>What You'll Learn</h2>
          <ul style={{ textAlign: 'left', color: '#2c3e50', lineHeight: '1.8' }}>
            <li>Setting up routes and navigation</li>
            <li>Handling dynamic routes and parameters</li>
            <li>Protected routes and authentication</li>
            <li>Nested routes and layouts</li>
            <li><strong>Transitions</strong> - Smooth animations between route changes</li>
            <li><strong>TanStack Router</strong> - Modern routing with advanced features and better performance</li>
          </ul>
        </div>

        <p style={{ marginTop: '2rem', fontSize: '1.1rem', color: '#7f8c8d' }}>
          Get started by exploring the different pages and features of this application.
        </p>
      </div>
    </PageWrapper>
  );
}
