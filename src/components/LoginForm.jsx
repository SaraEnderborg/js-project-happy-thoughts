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
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/user-login`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok ");
      }
      handleLogin(data.response);

      setFormData({ email: "", password: "" });
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
    <form
      className="border border-black bg-white/60 p-4 rounded-md shadow space-y-3"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold">Login</h2>

      <label className="block">
        <span className="block mb-1">Email</span>
        <input
          className="w-full border border-black rounded px-3 py-2 bg-white"
          onChange={handleChange}
          type="email"
          name="email"
          value={formData.email}
          autoComplete="email"
          required
        />
      </label>

      <label className="block">
        <span className="block mb-1">Password</span>
        <input
          className="w-full border border-black rounded px-3 py-2 bg-white"
          onChange={handleChange}
          type="password"
          name="password"
          value={formData.password}
          autoComplete="current-password"
          required
        />
      </label>

      {error && (
        <p className="bg-red-200 border border-red-500 p-2 rounded">{error}</p>
      )}

      <button
        type="submit"
        className="w-full border border-black rounded px-3 py-2 bg-white hover:bg-gray-100 font-bold"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
