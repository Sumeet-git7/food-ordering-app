import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const navigate = useNavigate();

  // Remove item
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <h3>{item.item_name}</h3>
            <p>₹{item.price}</p>

            <button onClick={() => removeItem(index)}>❌ Remove</button>
          </div>
        ))
      )}

      <h3>Total: ₹{total}</h3>

      {cart.length > 0 && (
        <button onClick={() => navigate("/checkout")}>
          Proceed to Checkout 💳
        </button>
      )}
    </div>
  );
}

export default Cart;