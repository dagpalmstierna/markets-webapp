import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Kör såhär:
// uvicorn main:app --reload
// npm run dev
import BuyForm from './components/BuyForm.jsx'
import SellForm from './components/SellForm.jsx'
import PortfolioTable from './components/PortfolioTable.jsx'
import TradeForm from './components/TradeForm.jsx'
import SearchBar from './components/SearchBar.jsx'

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import SearchPage    from './pages/SearchPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
// Div = en behållare för innehåll, knappar, text formulär
// h1 = rubriknivå 1 (högsta nivå)

function App() {
  // En enkel räknare som vi bump:ar när ett köp är klart
  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>My App</h1>
        <nav className="main-nav">
          <NavLink to="/"        end>Search</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/backtest">Backtest</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/"        element={<SearchPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
