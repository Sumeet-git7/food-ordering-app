import { useState } from "react";
import axios from "axios";

function Checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [orderPlaced, setOrderPlaced] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    try {
      for (let item of cart) {
        await axios.post("http://localhost:5002/api/orders/place", {
          user_id: user.id,
          item_id: item.id,
          quantity: 1,
        });
      }

      localStorage.removeItem("cart");
      setOrderPlaced(true);
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div className="checkout-container">
      <h2>💳 Checkout</h2>

      {orderPlaced ? (
        <div>
          <h3>✅ Order Successful!</h3>
          <h4>🧾 Bill</h4>

          {cart.map((item, i) => (
            <p key={i}>
              {item.item_name} - ₹{item.price}
            </p>
          ))}

          <h3>Total: ₹{total}</h3>
        </div>
      ) : (
        <div>
          <h3>Total Amount: ₹{total}</h3>

          <button onClick={placeOrder}>
            Pay & Place Order 💳
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;