import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://32.192.1.214:5001/api/menu")
      .then(res => {
        setMenu(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🛒 Add to Cart (FIXED: sync + alert)
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("🛒 Added to cart!");
  };

  // 📦 Place Order
  const orderItem = async (itemId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      await axios.post("http://32.192.1.214:5002/api/orders/place", {
        user_id: user.id,
        item_id: itemId,
        quantity: 1,
      });

      alert("✅ Order placed!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed");
    }
  };

  return (
    <div className="menu-container">

      {/* 🔥 Header (FIXED layout) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <h2>🍔 Food Menu</h2>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={() => navigate("/cart")}>
            🛒 Cart ({cart.length})
          </button>

          <button onClick={() => navigate("/orders")}>
            📦 Orders
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("cart");
              navigate("/");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* 🔍 Search */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
      </div>

      {/* ⏳ Loading */}
      {loading ? (
        <h3 style={{ textAlign: "center" }}>Loading menu...</h3>
      ) : menu.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No items available</h3>
      ) : (
        <div className="menu-grid">
          {menu
            .filter(item =>
              item.item_name.toLowerCase().includes(search.toLowerCase())
            )
            .map(item => (
              <div className="card" key={item.id}>

                {/* 🍕 Image FIX */}
                <img
                  src={item.image_url}
                  alt={item.item_name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Food";
                  }}
                />

                <h3>{item.item_name}</h3>

                <p className="price">₹{item.price}</p>

                {/* 🛒 Add to Cart */}
                <button onClick={() => addToCart(item)}>
                  Add to Cart 🛒
                </button>

                {/* 📦 Order */}
                <button onClick={() => orderItem(item.id)}>
                  Order Now
                </button>

              </div>
            ))}
        </div>
      )}

      {/* 🛒 Cart Summary */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3>🛒 Cart Items: {cart.length}</h3>
      </div>

    </div>
  );
}

export default Menu;