import React, { useState } from 'react';
import PortfolioTable from '../components/PortfolioTable.jsx';
import TradeForm from '../components/TradeForm.jsx';

export default function PortfolioPage() {
  const [refreshCount, setRefreshCount] = useState(0);
  const handleTrade = () => setRefreshCount(c => c + 1);

  return (
    <div>
      <h2>My Portfolio</h2>
      <PortfolioTable refreshCount={refreshCount} />
      {/* <TradeForm onTradeComplete={handleTrade} /> */}
      
    </div>
  );
}