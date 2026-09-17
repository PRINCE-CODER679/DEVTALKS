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
      className="relative w-full min-h-[600px] bg-[#080808] text-[#f4f0e8] py-24 px-4 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#ff5a1f]/30 text-[#ff5a1f] font-mono text-xs font-bold tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5a1f]" />
              <span>THE VISION & CONFERENCE</span>
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-[#f4f0e8]">
              ABOUT DEVTALKS <span className="text-[#ff5a1f]">'26</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#817b73] max-w-2xl leading-relaxed font-normal">
              More than just slides and scripted presentations. A meeting of <span className="text-[#ff8a3d] font-semibold">builders, pioneers, and innovators</span> reshaping the modern digital economy.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onRegisterNow();
            }}
            className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(255,90,31,0.25)] hover:scale-105 cursor-pointer"
          >
            <span>CLAIM FREE PASS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* ================= 3 PILLARS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 sm:p-8 bg-[#111111] border border-white/10 rounded-2xl space-y-4 hover:border-[#ff5a1f]/50 transition-all shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-[#080808] border border-[#ff5a1f]/30 flex items-center justify-center text-[#ff5a1f] group-hover:scale-110 transition-transform shadow-xs">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold text-[#ff5a1f] tracking-widest uppercase">PILLAR 01</span>
              <h3 className="font-display font-black text-xl sm:text-2xl uppercase text-[#f4f0e8] tracking-wide">
                Raw & Unfiltered
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#817b73] leading-relaxed font-sans">
              No generic corporate fluff. <span className="text-[#f4f0e8] font-semibold">Real architecture stories</span>, massive failures, and the exact engineering breakthroughs that scaled unicorns.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-[#111111] border border-white/10 rounded-2xl space-y-4 hover:border-[#ff5a1f]/50 transition-all shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-[#080808] border border-[#ff5a1f]/30 flex items-center justify-center text-[#ff5a1f] group-hover:scale-110 transition-transform shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold text-[#ff5a1f] tracking-widest uppercase">PILLAR 02</span>
              <h3 className="font-display font-black text-xl sm:text-2xl uppercase text-[#f4f0e8] tracking-wide">
                High-Trust Network
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#817b73] leading-relaxed font-sans">
              Connect with fellow <span className="text-[#f4f0e8] font-semibold">developers, founders, angels, and creators</span> in an intimate, high-impact environment built for lasting collaborations.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-[#111111] border border-white/10 rounded-2xl space-y-4 hover:border-[#ff5a1f]/50 transition-all shadow-sm group">
            <div className="w-12 h-12 rounded-xl bg-[#080808] border border-[#ff5a1f]/30 flex items-center justify-center text-[#ff5a1f] group-hover:scale-110 transition-transform shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-bold text-[#ff5a1f] tracking-widest uppercase">PILLAR 03</span>
              <h3 className="font-display font-black text-xl sm:text-2xl uppercase text-[#f4f0e8] tracking-wide">
                Next-Gen Frontier
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#817b73] leading-relaxed font-sans">
              Deep dives into <span className="text-[#f4f0e8] font-semibold">AI systems, autonomous agents</span>, distributed fintech, and sustainable computing architectures.
            </p>
          </div>

        </div>

        {/* ================= STATS ROW ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#111111] border border-white/10 rounded-2xl shadow-sm">
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-[#f4f0e8]">3</div>
            <div className="font-mono text-xs text-[#ff5a1f] font-bold tracking-widest uppercase">Iconic Keynotes</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-[#f4f0e8]">1,500+</div>
            <div className="font-mono text-xs text-[#ff5a1f] font-bold tracking-widest uppercase">Live Attendees</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-[#f4f0e8]">2 DAYS</div>
            <div className="font-mono text-xs text-[#ff5a1f] font-bold tracking-widest uppercase">Intensive Sessions</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-[#ff8a3d]">100%</div>
            <div className="font-mono text-xs text-[#ff5a1f] font-bold tracking-widest uppercase">Free Registration</div>
          </div>
        </div>

      </div>

    </section>
  );
}
