import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handlePayment = () => {
    alert("💳 Payment Successful!");
    navigate("/invoice");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💳 Payment</h2>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
        <h3>Total Amount: ₹{total + 40}</h3>

        <input placeholder="Card Number" style={inputStyle} />
        <input placeholder="MM/YY" style={inputStyle} />
        <input placeholder="CVV" style={inputStyle} />

        <button onClick={handlePayment} style={btnStyle}>
          Pay Now 🚀
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const btnStyle = {
  background: "#28a745",
  color: "white",
  padding: "12px",
  width: "100%",
  border: "none",
  borderRadius: "8px"
};

export default Payment;