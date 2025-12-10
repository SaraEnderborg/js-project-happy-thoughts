import Card from "./Card";

const MessageCard = ({ message, onLike }) => {
  return (
    <Card>
      <div className="bg-white p-6 flex flex-col gap-4">
        <p className="text-black text-base">{message.message}</p>

        <div className="flex justify-between items-center text-sm text-gray-400">
          {/* Like */}
          <button
            onClick={() => onLike(message._id)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 bg-pink-200 rounded-full flex items-center justify-center">
              ❤️
            </div>
            <span>x {message.hearts}</span>
          </button>

          {/* Tid */}
          <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
        </div>
      </div>
    </Card>
  );
};
export default MessageCard;
