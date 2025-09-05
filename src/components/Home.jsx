function Home() {
  const stats = [
    {
      title: 'Ocean Temperature',
      value: '18.2°C',
      change: '+0.8°C',
      icon: '🌡️',
      trend: 'up'
    },
    {
      title: 'Fish Stock Index',
      value: '847K',
      change: '-12%',
      icon: '🐟',
      trend: 'down'
    },
    {
      title: 'DNA Species Count',
      value: '25,847',
      change: '+234',
      icon: '🧬',
      trend: 'up'
    },
    {
      title: 'Sustainability Index',
      value: '72.4',
      change: '+5.2',
      icon: '♻️',
      trend: 'up'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <img 
            src="https://www.marinebiodiversity.ca/how-marine-artificial-intelligence-is-revolutionizing-ocean-conservation/" 
            alt="Ocean background" 
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            AI-Driven Unified Data Platform for Ocean, Fisheries & Molecular Research
          </h1>
          <p className="hero-subtitle">
            Harness the power of artificial intelligence to unlock insights from ocean data, 
            fisheries research, and molecular biology for a sustainable marine future.
          </p>
          <button className="cta-button">
            Get Started
            <span className="button-arrow">→</span>
          </button>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Real-Time Ocean Insights</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3 className="stat-title">{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-change ${stat.trend}`}>
                    <span className="change-indicator">
                      {stat.trend === 'up' ? '↗' : '↘'}
                    </span>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Interactive Ocean Mapping</h3>
              <p>Visualize ocean data with interactive maps and real-time monitoring systems.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Advanced Analytics</h3>
              <p>Generate insights from complex datasets using machine learning algorithms.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Predictions</h3>
              <p>Predict future trends and environmental changes with AI-powered models.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Molecular Analysis</h3>
              <p>Analyze genetic diversity and molecular patterns in marine ecosystems.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;