import React, { useEffect, useState } from 'react';
import MarketChart from '../components/MarketChart.jsx';

export default function MarketsPage() {
  const [markets, setMarkets] = useState([]);
  const [history, setHistory] = useState({});
  const [period, setPeriod] = useState('1m');

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetch('http://localhost:8000/markets');
        const data = await res.json();
        setMarkets(data.markets || []);
      } catch (err) {
        setMarkets([]);
      }
    };

    const fetchHistory = async (tick) => {
      try {
        const res = await fetch(`http://localhost:8000/history/${tick}?period=${period}`);
        const data = await res.json();
        setHistory(h => ({ ...h, [tick]: data.history || [] }));
      } catch (err) {
        setHistory(h => ({ ...h, [tick]: [] }));
      }
    };

    const update = async () => {
      await fetchMarkets();
      markets.forEach(m => fetchHistory(m.ticker));
    };

    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [period]);

  return (
    <div>
      <h2>Markets Dashboard</h2>
      <div className="period-buttons">
        {["1d", "1w", "1m", "1y", "5y"].map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={period === p ? "active" : ""}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="markets-grid">
        {markets.map(m => (
          <MarketChart
            key={m.ticker}
            ticker={m.ticker}
            history={history[m.ticker] || []}
          />
        ))}
      </div>
    </div>
  );
}