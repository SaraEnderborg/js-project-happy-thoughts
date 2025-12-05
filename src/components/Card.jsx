export default function Card({ children }) {
  return (
    <div className="bg-white border border-black shadow-[8px_8px_0_black] p-6 mb-6">
      {children}
    </div>
  );
}
