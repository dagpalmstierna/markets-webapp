import React, { useState, useEffect } from 'react';

function PortfolioTable({ refreshCount }) {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('http://localhost:8000/portfolio');
        const data = await res.json();
        setPortfolio(data.portfolio ?? []);
      } catch {
        setPortfolio([]);
      }
    };

    fetchPortfolio();
    const id = setInterval(fetchPortfolio, 10000);
    return () => clearInterval(id);
  }, [refreshCount]);

  if (portfolio.length === 0) {
    return (
      <div className="portfolio-table-container">
        <p className="portfolio-empty">No holdings yet. Use the form above or the Search page to buy stocks.</p>
      </div>
    );
  }

  return (
    <div className="portfolio-table-container">
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Price</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((stock) => {
            const ret = stock["Return"];
            const retColor = ret > 0 ? 'var(--green)' : ret < 0 ? 'var(--red)' : 'inherit';
            return (
              <tr key={stock["Ticker"]}>
                <td style={{ fontWeight: 600 }}>{stock["Ticker"]}</td>
                <td>{stock["Name"]}</td>
                <td>{stock["Quantity"]}</td>
                <td>${stock["Value"]?.toLocaleString()}</td>
                <td>${stock["Current price"]?.toLocaleString()}</td>
                <td style={{ color: retColor }}>{(ret * 100).toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable;
