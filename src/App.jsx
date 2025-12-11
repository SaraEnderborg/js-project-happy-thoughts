import { useState, useEffect } from "react";
import CreateMessage from "./components/CreateMessage";
import MessageList from "./components/MessageList";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://happy-thoughts-api-4ful.onrender.com/thoughts"
        );
        const data = await response.json();
        setMessages(data);
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

    if (message.length < 5 || message.length > 140) {
      setError("Your message must be between 5 and 140 characters.");
      return;
    }
    try {
      const response = await fetch(
        "https://happy-thoughts-api-4ful.onrender.com/thoughts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post Happy thought. Please try again.");
      }

      const newMessage = await response.json();
      setMessages((prev) => [newMessage, ...prev]);
      setMessage("");
    } catch (error) {
      console.error("Error posting message:", error);
      setError(
        "Something wen't wrong posting your happy thought. Please try again."
      );
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await fetch(
        `https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`,
        {
          method: "POST",
        }
      );
      const updatedMessage = await response.json();

      // Loopa igenom alla meddelanden.
      // Om rätt post hittas → ersätt den med den nya från servern.
      // Annars → låt den vara orörd.

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    } catch (error) {
      console.error("Error liking message:", error);
    }
  };

  return (
    <main className="min-h-screen flex justify-center font-mono">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-[900px] px-4 space-y-10">
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
            <MessageList messages={messages} onLike={handleLike} />
          )}
        </div>
      </section>
    </main>
  );
};
export default App;
