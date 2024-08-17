import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import "../css/currency.css";
import axios from "axios";

function Currency() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState("");

  let token = "fca_live_FXhn90pUyFbfVTdrOWM2D7FM3b9wcfnXrzIYN0tO";
  let baseUrl = "https://api.freecurrencyapi.com/v1/latest"; 

function validateInput() {  
  const input = document.getElementById('amount');  
  if (input.value < 0) {   
      alert('Negatif değer giremezsiniz!');  
      input.value = ""; // Input alanını boşalt  
  }  
}

  const exchange = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}?apikey=${token}&base_currency=${fromCurrency}`
      );
      const result = (response.data.data[toCurrency] * amount).toFixed(2);
      setResult(result);
    } catch (error) {
      console.log("hata olustu ", error);
    }
  };

  return (
    <div>
      <div className="currency-main">
        <div style={{
    backgroundColor: "teal",
    width: "100%",
    textAlign: "center",
    borderRadius: "15px",
}}>
          <h3 style={{ fontFamily: "arial", color: "#fff" }}>
            DÖVİZ KURU UYGULAMASI
          </h3>
        </div>

        <div style={{ marginTop: "20px" }}>
          <input
            id="amount"
            type="number"
            placeholder="Miktar giriniz.."
            onInput={validateInput}
            min="0"
            onChange={(e) => setAmount(e.target.value)}
            className="amount-input"
          />
          <select
            onChange={(e) => setFromCurrency(e.target.value)}
            className="first-currency-option"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>TRY</option>
          </select>
          <FaArrowRight style={{ marginRight: "10px" }} />

          <select
            onChange={(e) => setToCurrency(e.target.value)}
            className="second-currency-option"
          >
            <option>TRY</option>
            <option>USD</option>
            <option>EUR</option>
          </select>

          <input
            value={result}
            onChange={(e) => setResult(e.target.value)}
            type="text"
            className="result-input"
          />
        </div>

        <div className="button-main">
          <button className="btn-main"

            onClick={exchange}
          >
            Çevir
          </button>
        </div>
      </div>
    </div>
  );
}

export default Currency;
