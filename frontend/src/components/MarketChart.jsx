import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip);

const NAMES = {
  "^GSPC": "S&P 500",
  "^DJI": "Dow Jones",
  "^IXIC": "NASDAQ",
  "^FTSE": "FTSE 100",
  "^GDAXI": "DAX",
  "^N225": "Nikkei 225",
};

function MarketChart({ ticker, price, history }) {
  const closes = history.map(h => h.close);
  const isUp = closes.length >= 2 && closes[closes.length - 1] >= closes[0];
  const color = isUp ? '#22c55e' : '#ef4444';

  const data = {
    labels: history.map(h => h.date),
    datasets: [
      {
        data: closes,
        borderColor: color,
        backgroundColor: isUp ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: {
        display: true,
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: {
          color: '#8b8fa3',
          font: { size: 10 },
          callback: v => v.toLocaleString(),
        },
        border: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e2233',
        titleColor: '#e1e4ec',
        bodyColor: '#e1e4ec',
        borderColor: '#2a2e3e',
        borderWidth: 1,
        padding: 8,
      },
    },
  };

  return (
    <div className="market-chart">
      <div className="market-chart-header">
        <span className="market-chart-ticker">{NAMES[ticker] || ticker}</span>
        <span className="market-chart-price" style={{ color }}>
          {price != null ? `$${price.toLocaleString()}` : '—'}
        </span>
      </div>
      <div style={{ height: 160 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default MarketChart;
