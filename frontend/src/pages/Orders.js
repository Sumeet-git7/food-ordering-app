import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://32.192.1.214:5002/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="orders-container">
      <h2>📦 Order History</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div className="order-card" key={order.id}>
              <h3>{order.item_name}</h3>
              <p>👤 {order.name}</p>
              <p>📦 Quantity: {order.quantity}</p>
              <p className="status">✔ Delivered</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;