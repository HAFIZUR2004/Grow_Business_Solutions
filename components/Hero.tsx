export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 px-8">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-12">
        
        <div>
          <h1 className="text-6xl font-black mb-6">
            Grow Business Solutions BD
          </h1>

          <p className="text-gray-400 mb-6">
            Architecting high-performance digital ecosystems.
          </p>

          <div className="flex gap-4">
            <button className="bg-purple-500 px-6 py-3 rounded-full">
              View
            </button>
            <button className="border px-6 py-3 rounded-full">
              Learn
            </button>
          </div>
        </div>

        <div className="h-[400px] bg-gray-800 rounded-3xl" />
      </div>
    </section>
  );
}