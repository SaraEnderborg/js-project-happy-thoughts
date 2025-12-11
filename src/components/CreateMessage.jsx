import Card from "./Card";

const MAX_LENGTH = 140;

const CreateMessage = ({ message, setMessage, onSubmit }) => {
  const isInvalid = message.length < 5 || message.length > MAX_LENGTH;
  const isTooLong = message.length > MAX_LENGTH;
  const remaining = MAX_LENGTH - message.length;

  return (
    <Card>
      <form onSubmit={onSubmit} className="px-8 py-6">
        <h2 className="text-2xl font-bold mb-4">
          What's making you happy right now?
        </h2>

        <textarea
          id="message"
          name="message"
          aria-label="Your happy thought"
          rows="3"
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
          className={`
    mt-2 px-4 py-3 rounded-full font-semibold
    transition-all duration-200
    bg-[#ef9595]
      ${
        isInvalid
          ? "bg-gray-300 text-gray-600"
          : "bg-[#ef9595] text-black shadow-md hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
      }
  `}
        >
          ❤️ Send Happy Thought ❤️
        </button>
      </form>
    </Card>
  );
};
export default CreateMessage;
