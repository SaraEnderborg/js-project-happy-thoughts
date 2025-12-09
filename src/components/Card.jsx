export default function Card({ children }) {
  return (
    <div className="bg-[#f2f0f0] border border-black shadow-[8px_8px_0_black] p-1 mb-6">
      {children}
    </div>
  );
}
