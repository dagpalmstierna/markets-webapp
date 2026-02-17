import React from 'react';
import SearchBar from '../components/SearchBar.jsx';

export default function SearchPage() {
  return (
    <div>
      <h2 className="page-title">Search Ticker</h2>
      <SearchBar onTradeComplete={() => {}} />
    </div>
  );
}
