import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import MarketsPage   from './pages/MarketsPage.jsx';
import SearchPage    from './pages/SearchPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <h1><NavLink to="/">Markets</NavLink></h1>
        <nav className="main-nav">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/"          element={<MarketsPage />} />
          <Route path="/markets"   element={<MarketsPage />} />
          <Route path="/search"    element={<SearchPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
