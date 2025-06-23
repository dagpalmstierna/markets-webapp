import React from 'react';

function MarketTable({ ticker, price }) {
  return (
    <table className="market-table">
      <thead>
        <tr>
          <th>{ticker}</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ticker}</td>
          <td>{price !== null && price !== undefined ? price.toFixed(2) : 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default MarketTable;