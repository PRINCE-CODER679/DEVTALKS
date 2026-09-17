import React from 'react';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Users, 
  ArrowUpRight 
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function AboutSection({ onRegisterNow }) {
  return (
    <section 
      id="about" 
      className="relative w-full min-h-[600px] bg-[#080808] text-white py-24 px-4 sm:px-8 lg:px-12 border-t border-[#222222] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#FF5500]/40 text-[#FFAA00] font-mono text-xs font-bold tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>THE VISION & CONFERENCE</span>
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white">
              ABOUT DEVTALKS <span className="text-[#FF5500]">'26</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
              More than just slides and scripted presentations. A meeting of builders, pioneers, and innovators reshaping the modern digital economy.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onRegisterNow();
            }}
            className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF6A00] to-[#FF5500] hover:from-[#FF6A00] hover:to-[#FFAA00] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,85,0,0.45)] hover:scale-105 cursor-pointer"
          >
            <span>CLAIM FREE PASS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* ================= 3 PILLARS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 sm:p-8 bg-[#111111] border border-[#262626] rounded-2xl space-y-4 hover:border-[#FF5500]/50 hover:bg-[#161616] transition-all shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase text-white">
              01. Raw & Unfiltered
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              No generic corporate fluff. Real architecture stories, massive failures, and the exact engineering breakthroughs that scaled unicorns.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-[#111111] border border-[#262626] rounded-2xl space-y-4 hover:border-[#FF5500]/50 hover:bg-[#161616] transition-all shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase text-white">
              02. High-Trust Network
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Connect with fellow developers, founders, angels, and creators in an intimate, high-impact environment built for lasting collaborations.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-[#111111] border border-[#262626] rounded-2xl space-y-4 hover:border-[#FF5500]/50 hover:bg-[#161616] transition-all shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase text-white">
              03. Next-Gen Frontier
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Deep dives into AI systems, autonomous agents, distributed fintech, and sustainable computing architectures.
            </p>
          </div>

        </div>

        {/* ================= STATS ROW ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#111111] border border-[#262626] rounded-2xl shadow-md">
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-white">3</div>
            <div className="font-mono text-xs text-[#FFAA00] font-bold tracking-widest uppercase">Iconic Keynotes</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-white">1,500+</div>
            <div className="font-mono text-xs text-[#FFAA00] font-bold tracking-widest uppercase">Live Attendees</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-white">2 DAYS</div>
            <div className="font-mono text-xs text-[#FFAA00] font-bold tracking-widest uppercase">Intensive Sessions</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-white">100%</div>
            <div className="font-mono text-xs text-[#FFAA00] font-bold tracking-widest uppercase">Free Registration</div>
          </div>
        </div>

      </div>

    </section>
  );
}
