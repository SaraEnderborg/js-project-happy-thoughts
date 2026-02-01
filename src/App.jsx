import { useState, useEffect } from "react";
import CreateMessage from "./components/CreateMessage";
import MessageList from "./components/MessageList";

const API_URL = "https://happy-thoughts-api-11z5.onrender.com";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/thoughts?sort=createdAt`);
        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }

        const jsonRes = await res.json();

        if (!jsonRes.success) {
          console.error("an error occurred:", jsonRes.message);
          return;
        }

        setMessages(jsonRes.response);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (message.length < 5 || message.length > 140) {
      setError("Your message must be between 5 and 140 characters.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/thoughts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const jsonRes = await res.json();

      if (!res.ok || !jsonRes.success) {
        throw new Error(
          jsonRes.message || "Failed to post Happy thought. Please try again.",
        );
      }

      const newMessage = jsonRes.response;
      setMessages((prev) => [newMessage, ...prev]);
      setMessage("");
    } catch (error) {
      console.error("Error posting message:", error);
      setError(
        "Something wen't wrong posting your happy thought. Please try again.",
      );
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await fetch(`${API_URL}/thoughts/${id}/like`, {
        method: "PATCH",
      });
      const jsonRes = await res.json();

      if (!res.ok || !jsonRes.success) {
        throw new Error(jsonRes.message || "Failed to like the message.");
      }
      const updatedMessage = jsonRes.response; //here is the thought with updated likes

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg,
        ),
      );
    } catch (error) {
      console.error("Error liking message:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/thoughts/${id}`, {
        method: "DELETE",
      });
      const jsonRes = await res.json();

      if (!res.ok || !jsonRes.success) {
        throw new Error(jsonRes.message || "Failed to delete the message.");
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleEdit = async (id, newText) => {
    setError("");

    if (newText.length < 5 || newText.length > 140) {
      setError("Your message must be between 5 and 140 characters.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/thoughts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newText }),
      });

      const jsonRes = await res.json();

      if (!res.ok || !jsonRes.success) {
        throw new Error(jsonRes.message || "Failed to update message.");
      }

      const updated = jsonRes.response;

      setMessages((prev) =>
        prev.map((msg) => (msg._id === updated._id ? updated : msg)),
      );
    } catch (error) {
      console.error("Error editing message:", error);
      setError("Something went wrong updating the message.");
    }
  };

  return (
    <main className="min-h-screen flex justify-center font-mono">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-[900px] px-4 pt-8 space-y-10">
          <CreateMessage
            message={message}
            setMessage={setMessage}
            onSubmit={handleSubmit}
          />
          {error && (
            <div
              className="bg-red-300 border border-red-600 text-black p-4 rounded-md mt-6 shadow-md"
              role="alert"
              aria-live="assertive"
            >
              {error}
              <button
                onClick={() => setError("")}
                className="ml-3 text-black font-bold text-2xl hover:text-red-800"
                aria-label="Dismiss error message"
              >
                ×
              </button>
            </div>
          )}
          {loading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : (
            <MessageList
              messages={messages}
              onLike={handleLike}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </section>
    </main>
  );
};
export default App;
