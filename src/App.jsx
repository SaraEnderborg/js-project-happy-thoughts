import { useState } from "react";
import Form from "./components/Form.jsx";

function App() {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted message:", message);
    setMessage("");
  };

  return (
    <div className="container">
      <h1>Happy Thoughts</h1>

      <Form message={message} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
