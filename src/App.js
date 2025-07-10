import React, { useState } from 'react';
import './App.css';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { fetchData } from './api';

function App() {
  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await fetchData(query, keywords, dateFrom, dateTo);
      setResults(data);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <img src="/logo.png" alt="Logo" className="logo" />

    
    <div className="search-section">
        <div className="tagline">Smarter search. Better results. Faster decisions.</div>
    
        <div className="search-group">
          {/* ✅ Small "search by share" on the left */}
          <div className="keyword-box">
            <input
              type="text"
              placeholder="search by share"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              disabled={loading}
            />
          </div>

          {/* ✅ Main search bar on the right */}
          <div className="search-box">
            <div className="icon">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="what are you looking for?"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              disabled={loading}
            />
            <div className="date-filter-toggle" onClick={() => setShowDateFilter(!showDateFilter)}>
              <FaCalendarAlt />
            </div>
            <button onClick={handleSearch} disabled={loading || (!query.trim() && !keywords.trim())}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {showDateFilter && (
          <div className="date-filter">
            <div className="date-inputs">
              <div className="date-input-group">
                <label>From:</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="date-input-group">
                <label>To:</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        )}

        {error && <div className="error">{error}</div>}
        {results && (
          <div className="results">
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Sigma-like shapes */}
      <div className="rectangle-top"></div>
      <div className="triangle-right"></div>
      <div className="rectangle-bottom"></div>
    </div>
  );
}

export default App;
