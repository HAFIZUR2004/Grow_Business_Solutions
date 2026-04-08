import React from 'react';

const EngineeringProtocol = () => {
  return (
    <div className="bg-[#131313] text-white min-h-screen py-32 px-4 relative font-sans">
      
      {/* Grid Pattern Background - matching the subtle grid in image */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black mb-24 tracking-tighter text-center">
          The Engineering Protocol.
        </h2>

        {/* Vertical Timeline Structure */}
        <div className="relative flex w-full max-w-[1000px] justify-center">
          
          {/* Central Vertical Line */}
          <div className="absolute h-full w-[2px] bg-white/10 top-0 left-1/2 transform -translate-x-1/2"></div>
          
          {/* Vertical Container for Items */}
          <div className="relative flex flex-col items-center w-full space-y-32">
            
            {/* Step 1: Discovery (Left) */}
            <div className="relative flex w-full items-center">
              <div className="w-1/2 text-right pr-20 relative">
                <h4 className="text-xl font-bold text-[#b5a7ff]">01. Discovery</h4>
                <p className="text-base text-gray-400 max-w-[400px] ml-auto">Deep-dive audit into existing systems and market opportunities.</p>
                <span className="material-symbols-outlined absolute -bottom-10 right-20 text-4xl text-gray-600">architecture</span>
              </div>
              
              {/* Point */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-[#b5a7ff] border-4 border-[#131313] shadow-[0_0_15px_#b5a7ff]"></div>
              
              <div className="w-1/2 text-left pl-20 relative">
                <span className="material-symbols-outlined text-5xl text-gray-600">search</span>
              </div>
            </div>

            {/* Step 2: Blueprint (Right) */}
            <div className="relative flex w-full items-center">
              <div className="w-1/2 text-right pr-20 relative">
                <span className="material-symbols-outlined text-5xl text-gray-600">code</span>
              </div>
              
              {/* Point */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-[#3ee8f6] border-4 border-[#131313] shadow-[0_0_15px_#3ee8f6]"></div>
              
              <div className="w-1/2 text-left pl-20 relative">
                <h4 className="text-xl font-bold text-[#3ee8f6]">02. Blueprint</h4>
                <p className="text-base text-gray-400 max-w-[400px]">Wireframing the high-fidelity user journey and technical stack mapping.</p>
              </div>
            </div>

            {/* Step 3: Engineering (Left) */}
            <div className="relative flex w-full items-center">
              <div className="w-1/2 text-right pr-20 relative">
                <h4 className="text-xl font-bold text-[#b5a7ff]">03. Engineering</h4>
                <p className="text-base text-gray-400 max-w-[400px] ml-auto">Sprinting through development with modular, test-driven architecture.</p>
                <span className="material-symbols-outlined absolute -bottom-10 right-16 text-4xl text-gray-600">speed</span>
              </div>
              
              {/* Point */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-[#b5a7ff] border-4 border-[#131313] shadow-[0_0_15px_#b5a7ff]"></div>
              
              <div className="w-1/2 text-left pl-20 relative">
              </div>
            </div>

            {/* Step 4: Optimization (Right) */}
            <div className="relative flex w-full items-center">
              <div className="w-1/2 text-right pr-20 relative">
              </div>
              
              {/* Point */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-[#3ee8f6] border-4 border-[#131313] shadow-[0_0_15px_#3ee8f6]"></div>
              
              <div className="w-1/2 text-left pl-20 relative">
                <h4 className="text-xl font-bold text-[#3ee8f6]">04. Optimization</h4>
                <p className="text-base text-gray-400 max-w-[400px]">Iterative fine-tuning and deployment on high-speed global nodes.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default EngineeringProtocol;