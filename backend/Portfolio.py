import csv
import os 
from Stock import Stock

CSV_FILE = 'portfolio.csv'

class Portfolio:
    
    holdings: list[Stock]
    cash: float 

    def __init__(self):
        self.holdings = []
        if not os.path.exists(CSV_FILE):
            with open(CSV_FILE, mode='w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(['Ticker', 'Name', 'Quantity', 'Value', 'Current Price', 'Return'])  # Header row
                writer.writerow(['Cash', 'Cash', 0, 1000000, 0, 0])  # Initial cash row
                self.cash = 1000000
        else:
            with open(CSV_FILE, newline='') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    if row['Ticker'] == 'Cash':
                        self.cash = float(row['Value'])
                    else:
                        stock = Stock(row['Ticker'])
                        stock.name = row['Name']
                        stock.quantity = int(row['Quantity'])
                        stock.value = float(row['Value'])
                        stock.current_price = float(row['Current Price'])
                        stock.return_ = float(row['Return'])
                        self.holdings.append(stock)
        
    def sell(self, ticker: str, quantity: int):
        stock = next((s for s in self.holdings if s.ticker == ticker), None)
        if stock is None:
            raise ValueError("Stock not found in portfolio")
        if stock.quantity < quantity:
            raise ValueError("Not enough shares to sell")
        stock.quantity -= quantity
        self.cash += stock.current_price * quantity
        stock.value -= stock.current_price * quantity
        if stock.quantity == 0:
            self.holdings.remove(stock)

        self.update_csv()
    
    def buy(self, ticker: str, quantity: int):
        ticker = ticker.upper()
        stock = next((s for s in self.holdings if s.ticker == ticker), None)
        if stock is None:
            stock = Stock(ticker)
            self.holdings.append(stock)
        if stock.current_price * quantity > self.cash:
            raise ValueError("Not enough cash to buy the stock")
        self.cash -= stock.current_price * quantity
        stock.quantity += quantity
        stock.value += stock.current_price * quantity
        stock.return_ = (stock.current_price - stock.value / stock.quantity) / (stock.value / stock.quantity) if stock.quantity > 0 else 0
        self.update_csv()


    def update_csv(self):
        updated_rows = []
        for stock in self.holdings:
                updated_rows.append({
                    'Ticker': stock.ticker,
                    'Name': stock.name,
                    'Quantity': stock.quantity,
                    'Value': stock.value,
                    'Current Price': stock.current_price,
                    'Return': stock.return_
                })
        updated_rows.append({
            'Ticker': 'Cash',
            'Name': 'Cash',
            'Quantity': 0,
            'Value': self.cash,
            'Current Price': 0,
            'Return': 0
        })
        with open(CSV_FILE, mode='w', newline='') as file:
            fieldnames = ['Ticker', 'Name', 'Quantity', 'Value', 'Current Price', 'Return']
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            writer.writeheader()
            print("Updated csv file with holdings:")
            writer.writerows(updated_rows)
       
    def list_holdings(self):            
        return self.holdings
            