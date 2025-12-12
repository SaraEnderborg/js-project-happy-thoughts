import MessageCard from "./MessageCard";
import { motion } from "motion/react";

const MessageList = ({ messages, onLike }) => {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {messages.map((message) => (
        <motion.div
          key={message._id}
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <MessageCard message={message} onLike={onLike} />
        </motion.div>
      ))}
    </div>
  );
};
export default MessageList;
