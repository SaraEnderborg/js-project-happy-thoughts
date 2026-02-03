import { useState } from "react";
import { API_BASE_URL } from "../constants";

const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/users/user-login`, {
        method: "POST",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok ");
      }

      const data = await response.json();
      handleLogin(data.respone);
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      console.log("Login error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form className="user-login.form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="login-inputs">
        <label>
          Username
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
          />
        </label>
        <label>
          Email
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </label>
        <label>
          Password
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
