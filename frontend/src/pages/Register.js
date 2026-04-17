import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://3.91.45.136:5000/api/users/register", {
        name,
        email,
        password,
      });

      alert("Registration successful!");
      navigate("/");
    } catch (error) {
  console.error("FULL ERROR:", error);
  
  if (error.response) {
    alert("Error: " + error.response.data.error);
  } else {
    alert("Server not responding");
  }
}
  };

  return (
    <div className="container">
      <h2>📝 Register</h2>

      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      <p style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/")}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;