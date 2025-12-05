import { useState } from "react";
import CreateMessage from "./components/CreateMessage";
import MessageList from "./components/MessageList";

export default function App() {
  console.log("APP.JSX HERE");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log("MESSAGES:", messages);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("SUBMIT CLICKED");

    if (message.length < 5 || message.length > 140) return;

    setMessages((prev) => [{ text: message, date: new Date() }, ...prev]);

    setMessage("");
  }

  return (
    <main className="min-h-screen flex justify-center font-mono">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-[900px] px-4 space-y-10">
          <CreateMessage
            message={message}
            setMessage={setMessage}
            onSubmit={handleSubmit}
          />

          <MessageList messages={messages} />
        </div>
      </section>
    </main>
  );
}
