import pandas as pd
import numpy as np

class Strategy:
    def __init__(self, data: pd.DataFrame):
        self.performance = {
            "total_return": 0.0,
            "sharpe_ratio": 0.0
        }
        self.data = data.copy()
        if "Close" not in self.data:
            raise ValueError("DataFrame must have a 'Close' column")
        # will hold +1 / –1 / 0 signals
        self.signals: pd.Series = pd.Series(0.0, index=self.data.index)

    def generate_signals(self) -> pd.Series:
        raise NotImplementedError

    def simulate(self) -> dict:
        # 1) generate +1/-1 signals
        self.signals = self.generate_signals()

        trade_returns = []
        in_position   = False
        entry_price   = None

        # 2) walk through each timestamp
        for date, sig in self.signals.iteritems():
            price = self.data.at[date, "Close"]
            if sig == 1 and not in_position:
                entry_price = price
                in_position = True
            elif sig == -1 and in_position:
                r = (price - entry_price) / entry_price
                trade_returns.append(r)
                in_position = False

        # 3) close any open trade at the very end
        if in_position:
            final_price = self.data["Close"].iloc[-1]
            r = (final_price - entry_price) / entry_price
            trade_returns.append(r)

        # 4) total compounded return
        total_return = np.prod([1 + r for r in trade_returns]) - 1

        # 5) simple Sharpe on trade returns
        if len(trade_returns) > 1 and np.std(trade_returns):
            sharpe = np.mean(trade_returns) / np.std(trade_returns) * np.sqrt(len(trade_returns))
        else:
            sharpe = np.nan

        self.performance["total_return"]   = total_return
        self.performance["sharpe_ratio"]   = sharpe
        return self.performance


class MovingAverageCrossover(Strategy):
    def __init__(self, data: pd.DataFrame, short_window=20, long_window=50):
        super().__init__(data)
        self.short_window = short_window
        self.long_window  = long_window

    def generate_signals(self) -> pd.Series:
        sma = self.data["Close"].rolling(self.short_window).mean()
        lma = self.data["Close"].rolling(self.long_window ).mean()
        return (sma > lma).astype(int).diff().fillna(0)
