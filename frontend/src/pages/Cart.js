import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateQuantity = (index, type) => {
    const updated = [...cart];

    if (type === "inc") {
      updated.push(updated[index]);
    } else {
      updated.splice(index, 1);
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#fff",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}>
              <div>
                <h4>{item.item_name}</h4>
                <p>₹{item.price}</p>
              </div>

              <div>
                <button onClick={() => updateQuantity(index, "dec")}>-</button>
                <button onClick={() => updateQuantity(index, "inc")}>+</button>
              </div>
            </div>
          ))}

          {/* 💰 BILL */}
          <div style={{ marginTop: "20px" }}>
            <h3>Subtotal: ₹{total}</h3>
            <h4>Delivery: ₹40</h4>
            <h2>Total: ₹{total + 40}</h2>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                background: "#fc8019",
                color: "white",
                padding: "12px",
                width: "100%",
                border: "none",
                borderRadius: "8px"
              }}
            >
              Proceed to Checkout 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;