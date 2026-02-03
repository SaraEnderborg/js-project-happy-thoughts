import { useState } from "react";
import { API_BASE_URL } from "../constants";

const SignupForm = ({ handleLogin }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/users/user-signup`, {
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

      if (!response.ok && response.status > 499) {
        throw new Error("Failed to create user");
      }

      const resJson = await response.json();

      if (!resJson.success) {
        throw new Error(resJson.message || "Failed to create user");
      }

      handleLogin(resJson.response);

      //Reset form
      e.target.reset();
    } catch (error) {
      setError(error.message);
      console.log("Signup error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form className="user-signup.form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div className="login-inputs">
        <label>
          Username:
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
          />
        </label>

        <label>
          Email:
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </label>

        <label>
          Password:
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </label>
      </div>

      <button type="submit">Sign Up</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
export default SignupForm;
