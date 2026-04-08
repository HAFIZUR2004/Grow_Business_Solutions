export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#131313]/40 backdrop-blur-xl z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-black">Obsidian</div>

        <div className="hidden md:flex gap-8 text-sm text-white">
          <a href="#">Services</a>
          <a href="#">Portfolio</a>
          <a href="#">Process</a>
          <a href="#">Insights</a>
        </div>

        <button className="bg-purple-500 px-6 py-2 rounded-full">
          Start Project
        </button>
      </div>
    </nav>
  );
}
