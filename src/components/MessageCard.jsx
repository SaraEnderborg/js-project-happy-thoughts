import { useState } from "react";
import Card from "./Card";

const MessageCard = ({ message, onLike, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(message.message);

  const isInvalid = draft.length < 5 || draft.length > 140;

  const btnPink =
    "bg-pink-400 hover:bg-pink-500 text-white font-bold px-3 py-1 rounded-full shadow transition disabled:opacity-50 disabled:cursor-not-allowed";

  const btnNeutral =
    "bg-white border border-black hover:bg-gray-100 text-black font-bold px-3 py-1 rounded-full shadow transition";

  const btnDanger =
    "bg-red-400 hover:bg-red-500 text-white font-bold px-3 py-1 rounded-full shadow transition";

  const handleSave = () => {
    if (isInvalid) return;
    onEdit(message._id, draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(message.message);
    setIsEditing(false);
  };

  return (
    <Card>
      {!isEditing ? (
        <p className="text-black text-base wrap-break-word">
          {message.message}
        </p>
      ) : (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-2 text-black"
        />
      )}

      <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
        <button
          onClick={() => onLike(message._id)}
          className="flex gap-2 items-center bg-white/70 border border-black rounded-full px-3 py-1 shadow hover:bg-white transition"
        >
          ❤️ x {message.hearts}
        </button>

        <div className="flex gap-3 items-center">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={btnNeutral}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSave}
                disabled={isInvalid}
                className={btnPink}
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={btnNeutral}
              >
                Cancel
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => onDelete(message._id)}
            className={btnDanger}
          >
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
};

export default MessageCard;
