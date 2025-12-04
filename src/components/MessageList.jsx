import MessageCard from "./MessageCard";

export default function MessageList({ messages }) {
  return (
    <>
      {messages.map((msg, i) => (
        <MessageCard key={i} {...msg} />
      ))}
    </>
  );
}
