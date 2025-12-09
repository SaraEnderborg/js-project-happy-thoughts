import MessageCard from "./MessageCard";
import { motion, AnimatePresence } from "framer-motion";

export default function MessageList({ messages }) {
  return (
    <div className="mt-10 flex flex-col gap-6">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <MessageCard text={message.text} date={message.date} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
