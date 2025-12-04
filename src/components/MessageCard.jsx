import Card from "./Card";

export default function MessageCard({ text, date }) {
  return (
    <Card>
      <p>{text}</p>
      <p className="text-sm text-gray-400">{date.toLocaleTimeString()}</p>
    </Card>
  );
}
