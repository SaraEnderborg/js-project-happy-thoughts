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
      setFormData({ username: "", email: "", password: "" });
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
    <form
      className="border border-black bg-white/60 p-4 rounded-md shadow space-y-3"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold">Sign Up</h2>

      <div className="space-y-3">
        <label className="block">
          <span className="block mb-1">Username</span>
          <input
            className="w-full border border-black rounded px-3 py-2 bg-white"
            onChange={handleChange}
            type="text"
            name="username"
            value={formData.username}
            autoComplete="username"
            required
          />
        </label>

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
            autoComplete="new-password"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full border border-black rounded px-3 py-2 bg-white hover:bg-gray-100 font-bold"
      >
        Sign Up
      </button>

      {error && (
        <p className="bg-red-200 border border-red-500 p-2 rounded">{error}</p>
      )}
    </form>
  );
};

export default SignupForm;
