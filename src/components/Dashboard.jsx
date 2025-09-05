import { useState, useEffect } from 'react';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [chartData, setChartData] = useState({
    temperature: {
      data: [40, 60, 35, 70, 55, 80, 45],
      trend: '+2.1°C since 1990',
      color: '#1e40af'
    },
    fishStock: {
      data: [
        { name: 'Tuna', value: 70, color: '#1e40af' },
        { name: 'Salmon', value: 45, color: '#06b6d4' },
        { name: 'Cod', value: 85, color: '#0891b2' },
        { name: 'Mackerel', value: 30, color: '#0369a1' },
        { name: 'Sardine', value: 60, color: '#22d3ee' }
      ],
      status: 'Stable populations'
    },
    diversity: {
      segments: [
        { name: 'Fish', percentage: 45, color: '#1e40af' },
        { name: 'Marine Mammals', percentage: 15, color: '#06b6d4' },
        { name: 'Crustaceans', percentage: 25, color: '#0891b2' },
        { name: 'Other', percentage: 15, color: '#cbd5e1' }
      ],
      totalSpecies: '25,847'
    }
  });

  const speciesOptions = [
    { species: 'Bluefin Tuna', region: 'North Atlantic', category: 'fish' },
    { species: 'Atlantic Salmon', region: 'North Atlantic', category: 'fish' },
    { species: 'Pacific Cod', region: 'North Pacific', category: 'fish' },
    { species: 'Great White Shark', region: 'Global', category: 'fish' },
    { species: 'Blue Whale', region: 'Global', category: 'mammal' },
    { species: 'Humpback Whale', region: 'North Pacific', category: 'mammal' },
    { species: 'Atlantic Lobster', region: 'North Atlantic', category: 'crustacean' },
    { species: 'King Crab', region: 'Arctic Ocean', category: 'crustacean' },
    { species: 'Sea Turtle', region: 'Indian Ocean', category: 'reptile' },
    { species: 'Coral Reef Fish', region: 'Southern Ocean', category: 'fish' }
  ];

  const chartDataSets = {
    'Bluefin Tuna': {
      temperature: {
        data: [45, 50, 48, 52, 49, 55, 51],
        trend: '+1.8°C optimal range',
        color: '#dc2626'
      },
      fishStock: {
        data: [
          { name: 'Bluefin Tuna', value: 25, color: '#dc2626' },
          { name: 'Yellowfin', value: 65, color: '#1e40af' },
          { name: 'Albacore', value: 45, color: '#06b6d4' },
          { name: 'Bigeye', value: 35, color: '#0891b2' },
          { name: 'Skipjack', value: 80, color: '#22d3ee' }
        ],
        status: 'Critically low - Conservation needed'
      },
      diversity: {
        segments: [
          { name: 'Tuna Species', percentage: 60, color: '#dc2626' },
          { name: 'Other Large Fish', percentage: 25, color: '#1e40af' },
          { name: 'Small Fish', percentage: 10, color: '#06b6d4' },
          { name: 'Marine Life', percentage: 5, color: '#cbd5e1' }
        ],
        totalSpecies: '1,247'
      }
    },
    'Blue Whale': {
      temperature: {
        data: [35, 40, 38, 42, 39, 45, 41],
        trend: '+0.9°C migration impact',
        color: '#0891b2'
      },
      fishStock: {
        data: [
          { name: 'Krill', value: 90, color: '#22d3ee' },
          { name: 'Small Fish', value: 70, color: '#06b6d4' },
          { name: 'Copepods', value: 85, color: '#0891b2' },
          { name: 'Plankton', value: 95, color: '#1e40af' },
          { name: 'Squid', value: 40, color: '#0369a1' }
        ],
        status: 'Abundant food sources'
      },
      diversity: {
        segments: [
          { name: 'Marine Mammals', percentage: 35, color: '#0891b2' },
          { name: 'Krill & Plankton', percentage: 40, color: '#22d3ee' },
          { name: 'Small Fish', percentage: 20, color: '#06b6d4' },
          { name: 'Other', percentage: 5, color: '#cbd5e1' }
        ],
        totalSpecies: '8,432'
      }
    },
    'Atlantic Salmon': {
      temperature: {
        data: [30, 35, 32, 38, 34, 40, 36],
        trend: '+1.5°C spawning zones',
        color: '#f59e0b'
      },
      fishStock: {
        data: [
          { name: 'Atlantic Salmon', value: 40, color: '#f59e0b' },
          { name: 'Pacific Salmon', value: 75, color: '#1e40af' },
          { name: 'Trout', value: 60, color: '#06b6d4' },
          { name: 'Char', value: 50, color: '#0891b2' },
          { name: 'Steelhead', value: 55, color: '#22d3ee' }
        ],
        status: 'Moderate decline - Habitat restoration needed'
      },
      diversity: {
        segments: [
          { name: 'Salmon Species', percentage: 50, color: '#f59e0b' },
          { name: 'River Fish', percentage: 30, color: '#1e40af' },
          { name: 'Marine Fish', percentage: 15, color: '#06b6d4' },
          { name: 'Other', percentage: 5, color: '#cbd5e1' }
        ],
        totalSpecies: '3,156'
      }
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = speciesOptions.filter(option =>
        option.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleSearchSelect = (option) => {
    setSelectedSpecies(option.species);
    setSelectedRegion(option.region);
    setSearchQuery(`${option.species} - ${option.region}`);
    setShowDropdown(false);
    
    // Update chart data based on selection
    const newData = chartDataSets[option.species];
    if (newData) {
      setChartData(newData);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedSpecies('');
    setSelectedRegion('');
    setShowDropdown(false);
    // Reset to default data
    setChartData({
      temperature: {
        data: [40, 60, 35, 70, 55, 80, 45],
        trend: '+2.1°C since 1990',
        color: '#1e40af'
      },
      fishStock: {
        data: [
          { name: 'Tuna', value: 70, color: '#1e40af' },
          { name: 'Salmon', value: 45, color: '#06b6d4' },
          { name: 'Cod', value: 85, color: '#0891b2' },
          { name: 'Mackerel', value: 30, color: '#0369a1' },
          { name: 'Sardine', value: 60, color: '#22d3ee' }
        ],
        status: 'Stable populations'
      },
      diversity: {
        segments: [
          { name: 'Fish', percentage: 45, color: '#1e40af' },
          { name: 'Marine Mammals', percentage: 15, color: '#06b6d4' },
          { name: 'Crustaceans', percentage: 25, color: '#0891b2' },
          { name: 'Other', percentage: 15, color: '#cbd5e1' }
        ],
        totalSpecies: '25,847'
      }
    });
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="page-title">Ocean Data Dashboard</h1>
        
        {/* AI Search Box */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-box">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search species or region (e.g., Bluefin Tuna, North Atlantic)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button onClick={clearSearch} className="clear-btn">✕</button>
              )}
            </div>
            
            {showDropdown && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((option, index) => (
                  <div
                    key={index}
                    className="search-option"
                    onClick={() => handleSearchSelect(option)}
                  >
                    <div className="option-species">{option.species}</div>
                    <div className="option-region">{option.region}</div>
                    <div className="option-category">{option.category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {selectedSpecies && (
            <div className="selected-info">
              <div className="info-card">
                <div className="info-icon">🐟</div>
                <div className="info-content">
                  <div className="info-species">{selectedSpecies}</div>
                  <div className="info-region">📍 {selectedRegion}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="dashboard-grid">
          {/* Interactive Ocean Map */}
          <div className="map-section">
            <div className="card map-card">
              <h3 className="card-title">
                Interactive Ocean Map
                {selectedSpecies && <span className="map-filter"> - {selectedSpecies}</span>}
              </h3>
              <div className="map-placeholder">
                <img 
                  src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                  alt="Ocean map placeholder" 
                  className="map-image"
                />
                <div className="map-overlay">
                  <div className="map-controls">
                    <button className="map-btn active">Temperature</button>
                    <button className="map-btn">Salinity</button>
                    <button className="map-btn">pH Levels</button>
                  </div>
                  {selectedRegion && (
                    <div className="map-region-indicator">
                      📍 Focused on {selectedRegion}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            {/* Ocean Temperature Trend */}
            <div className="card chart-card">
              <h3 className="card-title">
                Ocean Temperature Trend
                {selectedSpecies && <span className="chart-filter"> - {selectedSpecies} Habitat</span>}
              </h3>
              <div className="chart-placeholder line-chart">
                <div className="chart-lines">
                  {chartData.temperature.data.map((height, index) => (
                    <div 
                      key={index}
                      className="chart-line" 
                      style={{
                        height: `${height}%`,
                        background: `linear-gradient(to top, ${chartData.temperature.color}, ${chartData.temperature.color}aa)`
                      }}
                    ></div>
                  ))}
                </div>
                <div className="chart-info" style={{ color: chartData.temperature.color }}>
                  📈 {chartData.temperature.trend}
                </div>
              </div>
            </div>

            {/* Fish Stock Levels */}
            <div className="card chart-card">
              <h3 className="card-title">
                {selectedSpecies ? `${selectedSpecies} Related Species` : 'Fish Stock Levels'}
              </h3>
              <div className="chart-placeholder bar-chart">
                <div className="chart-bars">
                  {chartData.fishStock.data.map((item, index) => (
                    <div 
                      key={index}
                      className="chart-bar" 
                      style={{
                        height: `${item.value}%`,
                        background: `linear-gradient(to top, ${item.color}, ${item.color}aa)`
                      }}
                      title={`${item.name}: ${item.value}%`}
                    ></div>
                  ))}
                </div>
                <div className="chart-labels">
                  {chartData.fishStock.data.map((item, index) => (
                    <span key={index}>{item.name}</span>
                  ))}
                </div>
                <div className="chart-status" style={{ 
                  color: chartData.fishStock.status.includes('low') ? '#dc2626' : 
                         chartData.fishStock.status.includes('decline') ? '#f59e0b' : '#10b981'
                }}>
                  {chartData.fishStock.status}
                </div>
              </div>
            </div>

            {/* Species Diversity */}
            <div className="card chart-card">
              <h3 className="card-title">
                {selectedSpecies ? `${selectedSpecies} Ecosystem Diversity` : 'Species Diversity'}
              </h3>
              <div className="chart-placeholder pie-chart">
                <div className="pie-chart-container">
                  <div 
                    className="pie-chart-circle"
                    style={{
                      background: `conic-gradient(
                        ${chartData.diversity.segments.map((segment, index) => {
                          const startAngle = chartData.diversity.segments.slice(0, index).reduce((sum, s) => sum + s.percentage, 0) * 3.6;
                          const endAngle = startAngle + segment.percentage * 3.6;
                          return `${segment.color} ${startAngle}deg ${endAngle}deg`;
                        }).join(', ')}
                      )`
                    }}
                  ></div>
                  <div className="pie-center">
                    <div className="pie-total">{chartData.diversity.totalSpecies}</div>
                    <div className="pie-label">Species</div>
                  </div>
                </div>
                <div className="pie-legend">
                  {chartData.diversity.segments.map((segment, index) => (
                    <div key={index} className="legend-item">
                      <span 
                        className="legend-color" 
                        style={{ backgroundColor: segment.color }}
                      ></span>
                      <span>{segment.name} ({segment.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;