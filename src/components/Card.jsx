export default function Card({ children }) {
  return (
    <div className="border border-black shadow-[6px_6px_2px_1px_black] bg-white p-4 mt-8">
      {children}
    </div>
  );
}
