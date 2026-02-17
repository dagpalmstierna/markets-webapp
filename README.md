# Markets Dashboard (IN PROGRESS)

A full-stack stock market dashboard with live data from Yahoo Finance. Browse global indices, search any ticker, manage a simulated portfolio, and backtest trading strategies.

## Features

- **Live Market Overview** — Real-time prices for major indices (S&P 500, Dow Jones, NASDAQ, FTSE 100, DAX, Nikkei 225)
- **Stock Search** — Look up any ticker for current price and interactive historical charts (1d–5y)
- **Paper Trading** — Buy and sell stocks with a virtual $1M portfolio, track holdings and returns
- **Backtesting** — Test strategies (e.g. moving average crossover) against historical data with Sharpe ratio reporting

## Tech Stack

**Frontend:** React, Chart.js, React Router, Vite
**Backend:** Python, FastAPI, yfinance, pandas

## Getting Started

```bash
# Backend
cd backend
pip install fastapi uvicorn yfinance pandas numpy
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

The frontend runs on `localhost:5173` and the backend on `localhost:8000`.
