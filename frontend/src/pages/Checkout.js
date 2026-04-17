import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    alert("🎉 Order placed successfully!");
    localStorage.removeItem("cart");
    navigate("/orders");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💳 Checkout</h2>

      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px"
      }}>
        <h3>Order Summary</h3>

        {cart.map((item, i) => (
          <p key={i}>
            {item.item_name} - ₹{item.price}
          </p>
        ))}

        <hr />

        <p>Subtotal: ₹{total}</p>
        <p>Delivery: ₹40</p>
        <h2>Total: ₹{total + 40}</h2>

        <button
          onClick={placeOrder}
          style={{
            background: "#28a745",
            color: "white",
            padding: "12px",
            width: "100%",
            border: "none",
            borderRadius: "8px"
          }}
        >
          Pay & Place Order 🚀
        </button>
      </div>
    </div>
  );
}

export default Checkout;