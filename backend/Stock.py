import yfinance as yf

class Stock:
    def __init__(self, ticker: str):
        data = yf.Ticker(ticker).info
        self.ticker = ticker
        self.name = data.get('longName', 'Unknown')
        self.quantity = 0
        self.value = 0.0
        self.current_price = data.get('regularMarketPrice', 0.0)
        self.return_ = 0.0
        
    def to_dict(self):
        return {
            'Ticker': self.ticker,
            'Name': self.name,
            'Quantity': self.quantity,
            'Value': self.round(self.value),
            'Current price': self.round(self.current_price),
            'Return': self.round(self.return_)
        }
    
    def round(self, value):
        return round(value, 2) if isinstance(value, float) else value
