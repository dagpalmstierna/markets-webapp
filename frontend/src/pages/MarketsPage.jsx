// nyckelmakro tal, räntor, index etc 
import React, { useEffect, useState } from 'react';
import MarketTable from '../components/MarketTable.jsx';

export default function MarketsPage() {
  const [markets, setMarkets] = useState([]);

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

    fetchMarkets();
    const id = setInterval(fetchMarkets, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h2>Markets Dashboard</h2>
      <div className="markets-grid">
        {markets.map(m => (
          <MarketTable key={m.ticker} ticker={m.ticker} price={m.price} />
        ))}
      </div>
    </div>
  );
}