import React, { useState, useEffect } from 'react';

function PortfolioTable( { refreshCount }) {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('http://localhost:8000/portfolio');
        const data = await res.json()
        console.log('portfolio payload:', data)
        const arr = data.portfolio ?? []
        setPortfolio(arr)
      } catch (err) {
        setPortfolio([]);
      }
    }

    fetchPortfolio();
    const id = setInterval(fetchPortfolio, 10000); // uppdatera var 10:e sekund
    return () => clearInterval(id)
  }, [refreshCount]);

  return (
    <div className="portfolio-table-container">
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Current Price</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((stock) => (
            <tr key={stock.ticker}>
              <td>{stock["Ticker"]}</td>
              <td>{stock["Name"]}</td>
              <td>{stock["Quantity"]}</td>
              <td>{stock["Value"]}</td>
              <td>{stock["Current price"]}</td>
              <td>{(stock["Return"] * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable
