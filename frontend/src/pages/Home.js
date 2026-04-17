import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>

      <h1>🍔 FoodHub</h1>
      <h3>Delicious food delivered to you</h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "30px"
      }}>
        {["Pizza Place", "Burger Hub", "Pasta Corner"].map((res, i) => (
          <div key={i} style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/menu")}
          >
            <h3>{res}</h3>
            <p>⭐ 4.{i+2} • 30 mins</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;