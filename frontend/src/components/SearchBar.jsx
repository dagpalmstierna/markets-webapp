import React, { useState } from 'react';

function SearchBar({ onTradeComplete }) {
  const [ticker, setTicker]     = useState('');
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState('');
  const [qty, setQty]           = useState(1);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSearch = async () => {
    if (!ticker.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    setFeedback('');
    try {
      const res  = await fetch(`http://localhost:8000/price/${ticker.toUpperCase()}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Could not reach server');
    } finally {
      setLoading(false);
    }
  };

  const doTrade = async (type) => {
    if (!result || qty < 1) return;
    try {
      const res  = await fetch(`http://localhost:8000/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: result.ticker, quantity: qty })
      });
      const data = await res.json();
      setFeedback(data.message || JSON.stringify(data));
      setQty(1);
      onTradeComplete && onTradeComplete();
    } catch (err) {
      setFeedback('Error: ' + err.message);
    }
  };

  const onKeyDown = e => e.key === 'Enter' && handleSearch();

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Enter ticker symbol (e.g. AAPL)"
          value={ticker}
          onChange={e => setTicker(e.target.value.toUpperCase())}
          onKeyDown={onKeyDown}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="search-error">{error}</p>}

      {result && (
        <div className="search-result-card">
          <div className="search-result-info">
            <span className="search-result-ticker">{result.ticker}</span>
            <span className="search-result-price">${result.price.toFixed(2)}</span>
          </div>
          <div className="search-trade-row">
            <input
              type="number"
              min="1"
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
            />
            <button className="buy-button" onClick={() => doTrade('buy')}>Buy</button>
            <button className="sell-button" onClick={() => doTrade('sell')}>Sell</button>
          </div>
          {feedback && <p className="search-feedback">{feedback}</p>}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
