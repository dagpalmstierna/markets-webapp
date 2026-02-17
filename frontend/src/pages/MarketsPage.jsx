import React, { useEffect, useState, useRef } from 'react';
import MarketChart from '../components/MarketChart.jsx';

const TICKERS = ["^GSPC", "^DJI", "^IXIC", "^FTSE", "^GDAXI", "^N225"];

export default function MarketsPage() {
  const [markets, setMarkets] = useState([]);
  const [history, setHistory] = useState({});
  const [period, setPeriod] = useState('1m');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchMarkets = async () => {
      try {
        const res = await fetch('http://localhost:8000/markets');
        const data = await res.json();
        if (!cancelled) setMarkets(data.markets || []);
      } catch {
        if (!cancelled) setMarkets([]);
      }
    };

    const fetchAllHistory = async () => {
      const results = {};
      await Promise.all(
        TICKERS.map(async (tick) => {
          try {
            const res = await fetch(`http://localhost:8000/history/${tick}?period=${period}`);
            const data = await res.json();
            results[tick] = data.history || [];
          } catch {
            results[tick] = [];
          }
        })
      );
      if (!cancelled) setHistory(results);
    };

    const update = async () => {
      setLoading(true);
      await Promise.all([fetchMarkets(), fetchAllHistory()]);
      if (!cancelled) setLoading(false);
    };

    update();
    const id = setInterval(update, 60000);
    return () => { cancelled = true; clearInterval(id); };
  }, [period]);

  const priceMap = {};
  markets.forEach(m => { priceMap[m.ticker] = m.price; });

  return (
    <div>
      <h2 className="page-title">Markets Dashboard</h2>
      <div className="period-buttons">
        {["1d", "1w", "1m", "1y", "5y"].map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={period === p ? "active" : ""}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>
      {loading && markets.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading market data...</p>
      ) : (
        <div className="markets-grid">
          {TICKERS.map(tick => (
            <MarketChart
              key={tick}
              ticker={tick}
              price={priceMap[tick]}
              history={history[tick] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
