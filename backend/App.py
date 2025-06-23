from fastapi import FastAPI
import yfinance as yf
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Portfolio import Portfolio

app = FastAPI()
portfolio = Portfolio()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TradeRequest(BaseModel):
    ticker: str
    quantity: int

def get_current_price(ticker: str):
    stock = yf.Ticker(ticker)
    return stock.info.get("regularMarketPrice")

def get_portfolio():
    return portfolio.list_holdings()
    
@app.get("/price/{ticker}")
def get_price(ticker: str):
    try:
        price = get_current_price(ticker)
        if price is None:
            return {"error": "No live price available for this ticker"}

        return {
            "ticker": ticker,
            "price": price
        }
    except Exception as e:
        return {"error": str(e)}

@app.post("/buy")
def buy_stock(data: TradeRequest):
    price = get_current_price(data.ticker)
    if price is None:
        return {"error": "No live price available for this ticker"}
    portfolio.buy(data.ticker, data.quantity)
    return {"message": f"Bought {data.quantity} shares of {data.ticker} at ${price:.2f} per share.",
            "cost": price * data.quantity}

@app.post("/sell")
def sell_stock(data: TradeRequest):
    price = get_current_price(data.ticker)
    if price is None:
        return {"error": "No live price available for this ticker"}
    portfolio.sell(data.ticker, data.quantity)
    return {"message": f"Sold {data.quantity} shares of {data.ticker} at ${price:.2f} per share.",
            "sum": price * data.quantity}

@app.get("/portfolio")
def load_portfolio():
    return {
       "portfolio": [stock.to_dict() for stock in portfolio.list_holdings()]
    }

@app.get("/markets")
def get_markets():
    tickers = ["^GSPC", "^DJI", "^IXIC", "^FTSE", "^GDAXI", "^N225"]
    data = []
    for t in tickers:
        info = yf.Ticker(t).info
        data.append({
            "ticker": t,
            "price": info.get("regularMarketPrice")
        })
    return {"markets": data}

@app.get("/history/{ticker}")
def get_history(ticker: str, period: str = "1mo"):
    period_map = {
        "1d": "1d",
        "1w": "7d",
        "1m": "1mo",
        "1y": "1y",
        "5y": "5y",
    }
    yf_period = period_map.get(period, "1mo")
    hist = yf.download(ticker, period=yf_period, interval="1d")
    history = [
        {"date": str(idx.date()), "close": row["Close"]}
        for idx, row in hist.iterrows()
    ]
    return {"ticker": ticker, "history": history}

    
