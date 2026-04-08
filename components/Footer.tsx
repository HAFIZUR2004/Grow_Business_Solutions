export default function Footer() {
  return (
    <footer className="py-20 text-center border-t">
      <h3 className="text-xl font-bold">Obsidian</h3>

      <div className="flex justify-center gap-6 mt-6 text-sm">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>

      <p className="mt-10 text-xs text-gray-400">
        © 2024 Obsidian Software Agency
      </p>
    </footer>
  );
}