import { useState } from "react";
import Card from "./Card";

const MessageCard = ({ message, onLike, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(message.message);

  const isInvalid = draft.length < 5 || draft.length > 140;

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
        <button onClick={() => onLike(message._id)} className="flex gap-2">
          ❤️ x {message.hearts}
        </button>

        <div className="flex gap-3 items-center">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-blue-500"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSave}
                disabled={isInvalid}
                className="text-green-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-500"
              >
                Cancel
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => onDelete(message._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
};

export default MessageCard;
