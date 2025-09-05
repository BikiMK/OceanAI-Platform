function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Team Credits</h3>
            <div className="team-list">
              <p>Dr. Marina Rodriguez - Marine Biology</p>
              <p>Prof. Alex Chen - AI Research</p>
              <p>Sarah Kim - Data Science</p>
              <p>Dr. James Wilson - Ocean Analytics</p>
            </div>
          </div>

          <div className="footer-section">
            <h3>Data Sources</h3>
            <div className="source-list">
              <p>NOAA Ocean Database</p>
              <p>Global Ocean Observing System</p>
              <p>Marine Biodiversity Information System</p>
              <p>International Council for Exploration of the Sea</p>
            </div>
          </div>

          <div className="footer-section">
            <h3>Research Partners</h3>
            <div className="partner-list">
              <p>Woods Hole Oceanographic Institution</p>
              <p>Scripps Institution of Oceanography</p>
              <p>Marine Biological Laboratory</p>
              <p>National Ocean Service</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 OceanAI Platform. All rights reserved.</p>
          <p>Advancing ocean science through artificial intelligence</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;