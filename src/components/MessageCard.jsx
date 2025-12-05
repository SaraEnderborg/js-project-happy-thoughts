import { useState } from "react";
import Card from "./Card";

export default function MessageCard({ text, date }) {
  const [likes, setLikes] = useState(0);

  return (
    <Card>
      <div className="bg-white p-6 flex flex-col gap-4">
        <p className="text-black text-base">{text}</p>

        <div className="flex justify-between items-center text-sm text-gray-400">
          {/* Like */}
          <button
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 bg-pink-200 rounded-full flex items-center justify-center">
              ❤️
            </div>
            <span>x {likes}</span>
          </button>

          {/* Tid */}
          <span>{new Date(date).toLocaleTimeString()}</span>
        </div>
      </div>
    </Card>
  );
}
