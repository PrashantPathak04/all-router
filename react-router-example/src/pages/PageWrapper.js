export default function PageWrapper({ title, subtitle, children, noHeader, style }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #eef7ff 0%, #f7fbff 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: 24,
        boxShadow: '0 30px 60px rgba(15, 23, 42, 0.08)',
        padding: '2rem',
        minHeight: 'calc(100vh - 96px)',
        ...style
      }}>
        {!noHeader && (title || subtitle) && (
          <header style={{ marginBottom: '1.75rem' }}>
            {title && (
              <h1 style={{
                margin: 0,
                fontSize: '2.75rem',
                color: '#1f2937',
                lineHeight: 1.05,
                letterSpacing: '-0.03em'
              }}>
                {title}
              </h1>
            )}
            {subtitle && (
              <p style={{
                margin: '1rem 0 0',
                color: '#4b5563',
                fontSize: '1.05rem',
                lineHeight: 1.6
              }}>
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}
