import jsPDF from "jspdf";

function Invoice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("FoodHub Invoice", 20, 20);

    let y = 40;
    cart.forEach(item => {
      doc.text(`${item.item_name} - ₹${item.price} x ${item.quantity}`, 20, y);
      y += 10;
    });

    doc.text(`Total: ₹${total + 40}`, 20, y + 10);

    doc.save("invoice.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧾 Invoice</h2>

      <button onClick={generatePDF} style={{
        background: "#fc8019",
        color: "white",
        padding: "12px",
        border: "none",
        borderRadius: "8px"
      }}>
        Download Invoice PDF
      </button>
    </div>
  );
}

export default Invoice;