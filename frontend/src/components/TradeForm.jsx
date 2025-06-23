import React, { useState } from 'react';

function TradeForm({ onTradeComplete }) {
  const [ticker, setTicker]     = useState('');
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState('');

  const doTrade = async (type) => {
    try {
      const res = await fetch(`http://localhost:8000/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker: ticker.toUpperCase(), quantity })
      });
      const data = await res.json();
      setFeedback(data.message || JSON.stringify(data));

      // nollställ inputar
      setTicker('');
      setQuantity(1);

      // triggera omhämtning i parent
      onTradeComplete && onTradeComplete();
    } catch (err) {
      setFeedback('Error: ' + err.message);
    }
  };

  return (
    <div className="trade-form">
      <input
        type="text"
        placeholder="Ticker"
        value={ticker}
        onChange={e => setTicker(e.target.value.toUpperCase())}
      />
      <input
        type="number"
        placeholder="Quantity"
        min="1"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      />
      <button
        className="buy-button"
        onClick={() => doTrade('buy')}
        disabled={!ticker || quantity < 1}
      >
        Buy
      </button>
      <button
        className="sell-button"
        onClick={() => doTrade('sell')}
        disabled={!ticker || quantity < 1}
      >
        Sell
      </button>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default TradeForm;