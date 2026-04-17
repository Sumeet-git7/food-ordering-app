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

  // 🔥 SMART CART (quantity-based)
  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map(i =>
        i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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

      {/* 🔥 STICKY HEADER */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#fc8019",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>🍔 FoodHub</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/cart")}>
            🛒 {cart.reduce((sum, i) => sum + (i.quantity || 1), 0)}
          </button>

          <button onClick={() => navigate("/orders")}>
            📦 Orders
          </button>

          <button
            onClick={() => {
              localStorage.clear();
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

      {/* 🍔 CATEGORY FILTERS */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        {["All", "Pizza", "Burger", "Pasta"].map(cat => (
          <button
            key={cat}
            onClick={() => setSearch(cat === "All" ? "" : cat)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "20px",
              border: "none",
              background: "#eee",
              cursor: "pointer"
            }}
          >
            {cat}
          </button>
        ))}
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
            .map(item => {

              const cartItem = cart.find(i => i.id === item.id);

              return (
                <div key={item.id} style={{
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}>

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

                  <div style={{ padding: "15px" }}>
                    <h3>{item.item_name}</h3>

                    <p style={{ color: "#777", fontSize: "14px" }}>
                      ⭐ 4.{Math.floor(Math.random() * 5)} • 30 mins
                    </p>

                    <h4 style={{ color: "#fc8019" }}>₹{item.price}</h4>

                    {/* 🛒 BUTTON / QUANTITY */}
                    {cartItem ? (
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "10px"
                      }}>
                        <button onClick={() => addToCart(item)}>+</button>
                        <span>{cartItem.quantity}</span>
                        <button
                          onClick={() => {
                            const updated = cart.map(i =>
                              i.id === item.id
                                ? { ...i, quantity: i.quantity - 1 }
                                : i
                            ).filter(i => i.quantity > 0);

                            setCart(updated);
                            localStorage.setItem("cart", JSON.stringify(updated));
                          }}
                        >
                          -
                        </button>
                      </div>
                    ) : (
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
                    )}

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
              );
            })}

        </div>
      )}

    </div>
  );
}

export default Menu;