import { useState } from "react";
import CreateMessage from "./components/CreateMessage";
import MessageList from "./components/MessageList";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (message.length < 5 || message.length > 140) return;

    setMessages([{ text: message, date: new Date() }, ...messages]);
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-appBg flex justify-center font-mono">
      <section className="w-full max-w-xl px-4">
        <h1 className="text-center text-2xl font-bold my-4">Happy Thoughts</h1>

        <CreateMessage
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmit}
        />

        <MessageList messages={messages} />
      </section>
    </main>
  );
}
