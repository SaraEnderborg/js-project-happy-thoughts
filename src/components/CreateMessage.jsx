import Card from "./Card";

export default function CreateMessage({ message, setMessage, onSubmit }) {
  const maxLength = 140;
  const isInvalid = message.length < 5 || message.length > maxLength;

  return (
    <Card>
      <form onSubmit={onSubmit} className="bg-[#f2f0f0] px-8 py-6">
        <h2 className="text-xl font-bold mb-4">
          What is making you happy right now?
        </h2>

        <textarea
          rows="4"
          maxLength={maxLength}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="My happy thought is..."
          className="
            bg-white text-black
            border border-black
            w-full
            px-4 py-3
            resize-none
            block
          "
        />

        <p className="text-sm text-right mt-1">
          {message.length}/{maxLength}
        </p>
        <button
          type="submit"
          disabled={isInvalid}
          className={`
    mt-4 px-6 py-2 rounded-full font-semibold
    transition-all duration-200
    bg-pink-400 text-white shadow-md
    hover:bg-pink-500 hover:shadow-lg hover:-translate-y-0.5
    active:scale-95
    disabled:bg-pink-300 disabled:opacity-100 disabled:cursor-not-allowed
  `}
        >
          ❤️ Send happy thought ❤️
        </button>
      </form>
    </Card>
  );
}
