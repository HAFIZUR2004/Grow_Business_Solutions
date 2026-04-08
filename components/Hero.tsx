export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 px-8 overflow-hidden bg-[#131313] text-[#E5E2E1]">
      {/* Background Glows & Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-600/10 blur-[100px] rounded-full"></div>
      
      {/* SVG Bezier Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
        <path d="M-100,500 C200,300 500,800 1200,400 S1600,200 1800,600" stroke="#958ea0" fill="none" strokeWidth="1"></path>
      </svg>

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Text Content */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Software Engineering Excellence
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 bg-gradient-to-b from-white via-[#E5E2E1] to-[#958EA0] bg-clip-text text-transparent">
            Grow Business Solutions <span className="block">BD.</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Architecting high-performance digital ecosystems for the global market. We turn complex requirements into elegant, obsidian-grade software.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-[#a078ff] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_40px_-5px_rgba(160,120,255,0.4)] transition-all active:scale-95">
              View Ecosystem
            </button>
            <button className="bg-white/5 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/10 transition-all">
              Our Thesis
            </button>
          </div>
        </div>

        {/* Visual Elements/Mockup */}
        <div className="lg:col-span-5 relative h-[500px] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Animated Rings */}
            <div className="absolute w-80 h-80 border-2 border-purple-500/20 rounded-xl rotate-45 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-64 h-64 border border-cyan-500/30 rounded-full animate-ping"></div>
            
            {/* Main Glass Card */}
            <div className="w-[80%] aspect-square bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden rotate-[-5deg] relative z-20 shadow-2xl">
              <img 
                alt="Abstract wireframe" 
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                src="https://i.ibb.co.com/FbdCFPgW/1594.jpg" 
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-[0_0_80px_-10px_rgba(208,188,255,0.3)] z-30">
              <div className="text-purple-400 text-3xl font-black">99.9%</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-400">Uptime SLA</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}