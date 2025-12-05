import MessageCard from "./MessageCard";

export default function MessageList({ messages }) {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {messages.map((message, index) => (
        <MessageCard key={index} text={message.text} date={message.date} />
      ))}
    </div>
  );
}
