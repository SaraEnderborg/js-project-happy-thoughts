import { useState, useEffect } from "react";
import CreateMessage from "./components/CreateMessage";
import MessageList from "./components/MessageList";

export default function App() {
  console.log("APP.JSX HERE");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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
    console.log("SUBMIT CLICKED");

    if (message.length < 5 || message.length > 140) return;

    try {
      const response = await fetch(
        "https://happy-thoughts-api-4ful.onrender.com/thoughts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const newMessage = await response.json();

      setMessages((prev) => [newMessage, ...prev]);

      setMessage("");
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  const handleLike = async (Id) => {
    try {
      const response = await fetch(
        `https://happy-thoughts-api-4ful.onrender.com/thoughts/${Id}/like`,
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
          {loading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : (
            <MessageList messages={messages} onLike={handleLike} />
          )}
        </div>
      </section>
    </main>
  );
}
