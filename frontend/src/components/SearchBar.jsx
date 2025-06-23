// src/components/SearchBar.jsx
import React, { useState } from 'react';

function SearchBar({ onTradeComplete }) {
  const [ticker, setTicker]     = useState('');
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState('');
  const [qty, setQty]           = useState(1);
  const [feedback, setFeedback] = useState('');

  const handleSearch = async () => {
    if (!ticker) return;
    try {
      const res  = await fetch(`http://localhost:8000/price/${ticker.toUpperCase()}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
        setError('');
      }
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  const doTrade = async (type) => {
    if (!result || qty < 1) return;
    try {
      const res  = await fetch(`http://localhost:8000/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: result.ticker,
          quantity: qty
        })
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
          placeholder="Search ticker…"
          value={ticker}
          onChange={e => setTicker(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="search-error">{error}</p>}

      {result && (
        <div className="search-result-inline">
          <span className="search-result-label">
            {result.ticker}: ${result.price.toFixed(2)}
          </span>

          <input
            type="number"
            min="1"
            className="search-qty"
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
          />

          <button
            className="buy-button inline"
            onClick={() => doTrade('buy')}
          >
            Buy
          </button>
          <button
            className="sell-button inline"
            onClick={() => doTrade('sell')}
          >
            Sell
          </button>
        </div>
      )}

      {feedback && <p className="search-feedback">{feedback}</p>}
    </div>
  );
}

export default SearchBar;
