import React from 'react';

export default function TechStack() {
  return (
    <section className="py-32 px-8 overflow-hidden relative bg-[#131313] text-[#E5E2E1]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* Left Side: Content */}
        <div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            The Modern <span className="text-primary">Atomic</span> Tech Stack.
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            We don't just use tools; we master them. Our selection of technologies is driven by performance, scalability, and long-term maintainability.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-surface-container-highest">
                <span className="material-symbols-outlined text-secondary">bolt</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Next-Gen Reactivity</h4>
                <p className="text-sm text-on-surface-variant">Harnessing the power of Next.js and React Server Components for instant load states.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-surface-container-highest">
                <span className="material-symbols-outlined text-primary">terminal</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Type-Safe Architecture</h4>
                <p className="text-sm text-on-surface-variant">Full-stack TypeScript implementation to ensure runtime stability and developer velocity.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Floating Visuals */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Background Gradient Blur */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container/5 to-secondary-container/5 blur-3xl opacity-50"></div>
          
          {/* Center Piece */}
          <div className="w-48 h-48 rounded-full glass-card flex items-center justify-center relative z-20 shadow-2xl">
            {/* Using a placeholder for the crystalline image provided in HTML */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent animate-pulse"></div>
            <div className="absolute text-center">
              <div className="text-[10px] font-black uppercase tracking-tighter opacity-50">Core</div>
              <div className="text-2xl font-black">OBSIDIAN</div>
            </div>
          </div>

          {/* Floating Tech Bubbles */}
          <div className="absolute top-10 left-20 w-32 h-32 rounded-full glass-card flex flex-col items-center justify-center p-4 animate-[bounce_6s_ease-in-out_infinite] z-30 shadow-xl">
            <span className="material-symbols-outlined text-4xl mb-2 text-white">javascript</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Next.js</span>
          </div>

          <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full glass-card flex flex-col items-center justify-center p-4 animate-[bounce_8s_ease-in-out_infinite_1s] z-30 shadow-xl">
            <span className="material-symbols-outlined text-4xl mb-2 text-secondary">database</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Postgres</span>
          </div>

          <div className="absolute top-1/2 -right-4 w-28 h-28 rounded-full glass-card flex flex-col items-center justify-center p-4 animate-[bounce_7s_ease-in-out_infinite_0.5s] z-30 shadow-xl">
            <span className="material-symbols-outlined text-4xl mb-2 text-primary">verified</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">TypeScript</span>
          </div>
        </div>

      </div>
    </section>
  );
}