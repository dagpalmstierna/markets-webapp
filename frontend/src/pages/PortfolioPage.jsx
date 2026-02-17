import React, { useState } from 'react';
import PortfolioTable from '../components/PortfolioTable.jsx';
import TradeForm from '../components/TradeForm.jsx';

export default function PortfolioPage() {
  const [refreshCount, setRefreshCount] = useState(0);
  const handleTrade = () => setRefreshCount(c => c + 1);

  return (
    <div>
      <h2 className="page-title">My Portfolio</h2>
      <TradeForm onTradeComplete={handleTrade} />
      <PortfolioTable refreshCount={refreshCount} />
    </div>
  );
}
