/*fixa färgen på knappen*/

import Card from "./Card";

export default function CreateMessage({ message, setMessage, onSubmit }) {
  const maxLength = 140;
  const isInvalid = message.length < 5 || message.length > maxLength;
  const isTooLong = message.length > maxLength;
  const remaining = maxLength - message.length;

  return (
    <Card>
      <form onSubmit={onSubmit} className="px-8 py-6">
        <h2 className="text-2xl font-bold mb-4">
          What's making you happy right now?
        </h2>

        <textarea
          rows="3"
          /*maxLength={maxLength}*/
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="My happy thought is..."
          className="
            bg-white text-black
            border border-gray-300
            rounded-lg
            w-full
            px-4 py-3
            resize-none
            block
          "
        />

        <p
          className={`text-sm text-right mt-1 ${
            isTooLong ? "text-red-500 font-semibold" : "text-gray-500"
          }`}
        >
          {remaining} characters left
        </p>

        <button
          type="submit"
          disabled={isInvalid}
          className={`
    mt-2 px-4 py-3 rounded-full font-semibold
    transition-all duration-200
    bg-[#ef9595]
      ${
        isInvalid
          ? "opacity-50 cursor-not-allowed"
          : "text-black shadow-md hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
      }
  `}
        >
          ❤️ Send Happy Thought ❤️
        </button>
      </form>
    </Card>
  );
}
