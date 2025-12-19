
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { RocketLaunchIcon, SparklesIcon, GlobeAltIcon, CpuChipIcon } from '@heroicons/react/24/solid';

const FloatingIcon = ({ icon: Icon, delay, x, y, color }: { icon: any, delay: number, x: string, y: string, color: string }) => (
    <div 
      className="absolute animate-float hidden lg:block pointer-events-none z-20"
      style={{ 
        top: y, 
        left: x, 
        animationDelay: `${delay}s`,
        animationDuration: '6s'
      }}
    >
      <div className={`p-4 rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 shadow-2xl ${color}`}>
        <Icon className="w-8 h-8" />
      </div>
    </div>
);

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Thematic Background Image */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bc04?q=80&w=2000&auto=format&fit=crop" 
          alt="Orion Constellation Background" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
        />
        {/* Overlays for Depth and Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/40 to-zinc-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 opacity-60"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Floating Elements */}
      <FloatingIcon icon={RocketLaunchIcon} delay={0} x="10%" y="25%" color="text-orange-400" />
      <FloatingIcon icon={CpuChipIcon} delay={2} x="85%" y="30%" color="text-blue-400" />
      <FloatingIcon icon={GlobeAltIcon} delay={1} x="12%" y="75%" color="text-purple-400" />
      <FloatingIcon icon={SparklesIcon} delay={3} x="88%" y="70%" color="text-yellow-400" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-24 md:py-40 flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-10 backdrop-blur-md">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-mono text-blue-300 uppercase tracking-[0.2em] font-bold">Everything is Working</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mb-8 leading-[1] drop-shadow-2xl">
          AI Amplifies, <br/>
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x">
            I Create.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-zinc-200 max-w-3xl mx-auto leading-relaxed font-light mb-12 drop-shadow-lg">
          Your 24/7 partner handles messages, bookings, and payments so you can focus on the work you love. 
          Zero boring office work. Powered by <span className="text-blue-400 font-medium">Orion Dev Core</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
          <a href="#chat-demo" className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-full font-bold text-sm tracking-widest hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              TALK TO ORION BOLT PRO
          </a>
          <a href="#packages" className="w-full sm:w-auto px-10 py-5 bg-zinc-950/80 backdrop-blur-md text-white border border-zinc-700 rounded-full font-bold text-sm tracking-widest hover:bg-zinc-800 transition-all hover:border-zinc-500">
              SEE OUR PRICES
          </a>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};
