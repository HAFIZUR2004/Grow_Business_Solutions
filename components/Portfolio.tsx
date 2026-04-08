export default function Portfolio() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl font-bold mb-10">Portfolio</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            FinTech Project
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            Mobile App
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            Data System
          </div>
        </div>
      </div>
    </section>
  );
}