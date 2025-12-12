const Card = ({ children, backgroundColor = "bg-white" }) => {
  return (
    <div
      className={`border border-black shadow-[8px_8px_0_black] p-6 mb-6 flex flex-col gap-5 ${backgroundColor}`}
    >
      {children}
    </div>
  );
};
export default Card;
