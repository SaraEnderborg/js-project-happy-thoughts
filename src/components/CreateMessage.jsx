import Card from "./Card";

export default function CreateMessage({ message, setMessage, onSubmit }) {
  const remaining = 140 - message.length;
  const isInvalid = message.length < 5 || message.length > 140;

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <h2 className="font-bold text-lg mb-2">
          What’s making you happy right now?
        </h2>

        <textarea
          rows="3"
          maxLength="140"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type here..."
          className="w-full p-2 border resize-none"
        />

        <p
          className={`text-right ${
            remaining < 0 ? "text-red-500" : "text-gray-500"
          }`}
        >
          {remaining} characters left
        </p>

        <button
          type="submit"
          disabled={isInvalid}
          className={`
            mt-2 px-4 py-2 rounded-full font-semibold transition
            ${
              isInvalid
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-button hover:bg-buttonHover text-white"
            }
          `}
        >
          ❤️ Send Happy Thought
        </button>
      </form>
    </Card>
  );
}
