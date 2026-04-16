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

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("🛒 Added to cart!");
  };

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
    <div style={{ background: "#f8f8f8", minHeight: "100vh" }}>

      {/* 🔥 HEADER */}
      <div style={{
        background: "#fc8019",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <h2>🍔 FoodHub</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/cart")}>
            🛒 {cart.length}
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

      {/* 🔍 SEARCH */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="🔍 Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* ⏳ Loading */}
      {loading ? (
        <h3 style={{ textAlign: "center" }}>Loading delicious food...</h3>
      ) : menu.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No items available</h3>
      ) : (

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px"
        }}>

          {menu
            .filter(item =>
              item.item_name.toLowerCase().includes(search.toLowerCase())
            )
            .map(item => (

              <div key={item.id} style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s"
              }}>

                {/* 🍕 IMAGE */}
                <img
                  src={item.image_url}
                  alt={item.item_name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Food";
                  }}
                />

                {/* 📄 DETAILS */}
                <div style={{ padding: "15px" }}>
                  <h3>{item.item_name}</h3>

                  {/* ⭐ Fake rating + delivery */}
                  <p style={{ color: "#777", fontSize: "14px" }}>
                    ⭐ 4.{Math.floor(Math.random() * 5)} • 30 mins
                  </p>

                  <h4 style={{ color: "#fc8019" }}>₹{item.price}</h4>

                  {/* 🛒 Add to Cart */}
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      background: "#fc8019",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "6px",
                      marginTop: "10px",
                      cursor: "pointer"
                    }}
                  >
                    Add to Cart 🛒
                  </button>

                  {/* 📦 Order */}
                  <button
                    onClick={() => orderItem(item.id)}
                    style={{
                      background: "#282c3f",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "6px",
                      marginTop: "10px",
                      cursor: "pointer"
                    }}
                  >
                    Order Now
                  </button>
                </div>

              </div>
            ))}

        </div>
      )}

      {/* 🛒 Footer Cart Summary */}
      <div style={{
        textAlign: "center",
        padding: "15px",
        background: "#fff",
        borderTop: "1px solid #ddd"
      }}>
        <h3>🛒 Cart Items: {cart.length}</h3>
      </div>

    </div>
  );
}

export default Menu;