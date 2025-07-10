import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

interface SearchResult {
  id: number;
  title: string;
  content?: string;
  description?: string;
  summary?: string;
  url?: string;
  score?: number;
  date?: string;
  source?: string;
}

interface ApiResponse {
  query: string;
  strategy: string;
  total_results: number;
  results: SearchResult[];
  execution_time_ms: number;
}

function Index() {
  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() && !keywords.trim()) return;
    
    setLoading(true);
    setError(null);
    setResults([]);
    
    try {
      // Build API URL with parameters
      let apiUrl = `https://c968-62-193-124-9.ngrok-free.app/search?q=${encodeURIComponent(query)}`;
      
      if (keywords.trim()) {
        apiUrl += `&share_search=${encodeURIComponent(keywords)}`;
      }
      
      if (dateFrom) {
        apiUrl += `&date_from=${encodeURIComponent(dateFrom)}`;
      }
      
      if (dateTo) {
        apiUrl += `&date_to=${encodeURIComponent(dateTo)}`;
      }

      apiUrl += `&top_k=10`;

      console.log('Calling API:', apiUrl);

      const response = await axios.get<ApiResponse>(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      console.log('API Response:', response.data);
      setResults(response.data.results || []);
      
      // Smooth scroll to results section
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
      
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <img src="/image.png" alt="Logo" className="logo" />

      <div className="search-section">
        <div className="tagline">Smarter search. Better results. Faster decisions.</div>

        <div className="search-group">
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

          <div className="search-box">
            <div className="icon"><FaSearch /></div>
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
      </div>

      {/* Results Section */}
      <div id="results-section" className="results-section">
        {results.length > 0 && (
          <div className="results-container">
            <h2 className="results-title">Search Results ({results.length})</h2>
            <div className="results-cards">
              {results.map((result, index) => (
                <div key={result.id || index} className="result-card">
                  <h3 className="result-header">
                    <span className="result-id">#{result.id || index + 1}</span>
                    <span className="result-title">{result.title || 'Untitled'}</span>
                  </h3>
                  <p className="result-content">
                    {result.summary || result.description || result.content || 'No description available'}
                  </p>
                  {result.url && (
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="result-link">
                      View Source
                    </a>
                  )}
                  {result.score && (
                    <div className="result-score">Score: {(result.score * 100).toFixed(1)}%</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sigma shape */}
      <div className="rectangle-top"></div>
      <div className="triangle-right"></div>
      <div className="rectangle-bottom"></div>
    </div>
  );
}

export default Index;
