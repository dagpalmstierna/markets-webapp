import React, { useState } from 'react';


function SellForm({ onBuy }) {
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [feedback, setFeedback] = useState("");

    const handleSell = async () => {
        try {
            const res = await fetch("http://localhost:8000/sell", {
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

            onSell && onSell()
        } catch (err) {
            setFeedback("Error: " + err.message);
        }
      };    return (
        <div className="sell-form trade-form">
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
            <button className="sell-button" onClick={handleSell}>Sell</button>
            {feedback && <p>{feedback}</p>}
        </div>
    );
    
}      
export default SellForm;
