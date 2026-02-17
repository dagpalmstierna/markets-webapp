from fastapi import FastAPI
from portfolio import Portfolio
from fastapi.middleware.cors import CORSMiddleware
from app import load_market_index

app = FastAPI()
portfolio = Portfolio()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


