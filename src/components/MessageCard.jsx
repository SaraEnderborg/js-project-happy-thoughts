import Card from "./Card";

const MessageCard = ({ message, onLike }) => {
  return (
    <Card>
      <p className="text-black text-base wrap-break-word">{message.message}</p>
      <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
        {/* Like  */}
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
    </Card>
  );
};
export default MessageCard;
