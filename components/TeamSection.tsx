import React from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
 {
  id: 1,
  name: "Hafizur Rahman", // আপনার নাম অনুযায়ী পরিবর্তন করতে পারেন
  role: "Founder & Lead Developer",
  description: "Architecting high-performance digital ecosystems with MERN stack expertise and a passion for premium, animated user experiences.",
  imageUrl: "/team/profile.jpg", // public ফোল্ডারে আপনার ছবি এই নামে রাখুন
},
  {
    id: 2,
    name: "Elena Vance",
    role: "Head of Strategy",
    description: "Transforming complex market data into elegant, actionable roadmaps for global enterprise ecosystems.",
    imageUrl: "/team/profile.jpg",
  },
  {
    id: 3,
    name: "Julian Kross",
    role: "Lead Systems Architect",
    description: "Building the invisible foundations that power high-concurrency applications with zero-latency precision.",
    imageUrl: "/team/profile.jpg",
  }
];

const TeamSection = () => {
  return (
    <section className="relative py-24 px-6 bg-[#131313] overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mesh-gradient" />
      
      {/* Abstract Background Lines (SVG) */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100,200 Q400,100 800,400 T1800,200" fill="none" stroke="#958ea0" strokeWidth="1" />
        <path d="M-100,600 Q600,800 1200,400 T2000,700" fill="none" stroke="#958ea0" strokeWidth="0.5" />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Area */}
        <div className="mb-20 max-w-3xl">
          <span className="inline-block text-[#4cd7f6] font-bold tracking-[0.3em] text-[12px] uppercase mb-6">
            The Architects of Growth
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#e5e2e1] mb-8 leading-[1.1]">
            Meet the Team at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d0bcff] to-[#4cd7f6]">
              Grow Business Solutions
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#cbc3d7] leading-relaxed max-w-2xl font-light">
            A curated collective of visionary designers, strategic engineers, and creative thinkers redefining the digital landscape.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id}
              className={`group p-8 rounded-2xl transition-all duration-500 ease-out flex flex-col h-full transform hover:-translate-y-2 
                bg-[#353534]/40 backdrop-blur-xl border border-[#494454]/20 hover:border-[#4cd7f6]/50 hover:shadow-[0_0_40px_-10px_rgba(76,215,246,0.2)]
                ${index === 1 ? 'md:mt-12' : ''} // আপনার ডিজাইনের সেই staggered ইফেক্ট
              `}
            >
              {/* Member Image */}
              <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-xl">
                <img 
                  src={member.imageUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Member Details */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#e5e2e1] tracking-tight mb-2">
                  {member.name}
                </h3>
                <p className="text-[#4cd7f6] font-medium tracking-widest text-xs uppercase mb-6">
                  {member.role}
                </p>
                <p className="text-[#cbc3d7] text-sm leading-relaxed mb-8 flex-grow">
                  {member.description}
                </p>

                {/* Social Icons Placeholder */}
                <div className="flex gap-4 items-center">
                  <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#cbc3d7] hover:text-[#4cd7f6] transition-colors">
                    <span className="material-symbols-outlined text-lg">share</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#cbc3d7] hover:text-[#4cd7f6] transition-colors">
                    <span className="material-symbols-outlined text-lg">public</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        
      </div>
    </section>
  );
};

export default TeamSection;