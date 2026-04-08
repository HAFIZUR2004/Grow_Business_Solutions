import React from 'react';

const TechStack = () => {
  return (
    <section className="py-32 px-8 overflow-hidden relative bg-[#131313] text-[#E5E2E1]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* Left Side: Content */}
        <div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            The Modern <span className="text-primary text-blue-500">Atomic</span> Tech Stack.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            আমরা শুধু টুলস ব্যবহার করি না, সেগুলোর ওপর পূর্ণ নিয়ন্ত্রণ রাখি। পারফরম্যান্স, স্কেলেবিলিটি এবং দীর্ঘমেয়াদী মেইনটেইনেবিলিটির ওপর ভিত্তি করেই আমাদের টেকনোলজি সিলেকশন করা হয়।
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white/5">
                <span className="material-symbols-outlined text-yellow-400">bolt</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Next-Gen Reactivity</h4>
                <p className="text-sm text-gray-400">Next.js এবং React Server Components এর মাধ্যমে সুপার ফাস্ট লোডিং নিশ্চিত করা হয়।</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white/5">
                <span className="material-symbols-outlined text-blue-400">terminal</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Full-Stack Scalability</h4>
                <p className="text-sm text-gray-400">Node.js, Express এবং MongoDB/Postgres এর সমন্বয়ে শক্তিশালী ব্যাকএন্ড আর্কিটেকচার।</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Floating Visuals */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Background Gradient Blur */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl opacity-50"></div>
          
          {/* Center Piece - Core */}
          <div className="w-48 h-48 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center relative z-20 shadow-2xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-transparent animate-pulse"></div>
            <div className="absolute text-center">
              <div className="text-[10px] font-black uppercase tracking-tighter opacity-50">Core</div>
              <div className="text-2xl font-black">MERN+</div>
            </div>
          </div>

          {/* Floating Tech Bubbles */}
          
          {/* Next.js */}
          <div className="absolute top-10 left-10 w-28 h-28 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-[bounce_6s_ease-in-out_infinite] z-30 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Next.js</span>
          </div>

          {/* React */}
          <div className="absolute top-20 right-10 w-28 h-28 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-[bounce_7s_ease-in-out_infinite_0.5s] z-30 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">React</span>
          </div>

          {/* MongoDB */}
          <div className="absolute bottom-20 left-0 w-28 h-28 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-[bounce_5s_ease-in-out_infinite_1s] z-30 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">MongoDB</span>
          </div>

          {/* PostgreSQL */}
          <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-[bounce_8s_ease-in-out_infinite_1.5s] z-30 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">PostgreSQL</span>
          </div>

          {/* Node.js */}
          <div className="absolute top-1/2 -left-8 w-24 h-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-[bounce_9s_ease-in-out_infinite] z-30 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Node.js</span>
          </div>

          {/* Express.js */}
          <div className="absolute bottom-1/2 -right-4 w-24 h-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-[bounce_7s_ease-in-out_infinite_2s] z-30 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Express</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStack;