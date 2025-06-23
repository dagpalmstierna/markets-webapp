import React, { useState } from 'react';


function BuyForm({ onBuy }) {
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [feedback, setFeedback] = useState("");

    const handleBuy = async () => {
        try {
            const res = await fetch("http://localhost:8000/buy", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                ticker: ticker,      
                quantity: quantity   
            })
            });
            const data = await res.json();

            setFeedback(data.message);

            setTicker('');
            setQuantity(1);

            onBuy && onBuy()
        } catch (err) {
            setFeedback("Error: " + err.message);
        }
      };    return (
        <div className="buy-form trade-form">
            <input
                type="text"
                placeholder="Ticker"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button className="buy-button" onClick={handleBuy}>Buy</button>
            {feedback && <p>{feedback}</p>}
        </div>
    );
    
}      
export default BuyForm;
