import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Users, 
  ArrowUpRight 
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function AboutSection({ onRegisterNow }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section 
      id="about" 
      className="relative w-full min-h-[500px] bg-[#080808] text-[#f4f0e8] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-t border-white/10 overflow-hidden select-none"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto w-full relative z-10 space-y-12 sm:space-y-16"
      >
        
        {/* ================= HEADER ================= */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 border-b border-white/10 pb-6 sm:pb-8">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#111111] border border-[#ff5a1f]/30 text-[#ff5a1f] font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#ff5a1f]" />
              <span>THE VISION & CONFERENCE</span>
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#f4f0e8]">
              ABOUT DEVTALKS <span className="text-[#ff5a1f]">'26</span>
            </h2>

            <p className="font-sans text-xs sm:text-base text-[#817b73] max-w-2xl leading-relaxed font-normal">
              More than just slides and scripted presentations. A meeting of <span className="text-[#ff8a3d] font-semibold">builders, pioneers, and innovators</span> reshaping the modern digital economy.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onRegisterNow();
            }}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(255,90,31,0.25)] hover:scale-105 cursor-pointer active:scale-95"
          >
            <span>CLAIM FREE PASS</span>
            <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>
        </motion.div>

        {/* ================= 3 PILLARS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          <motion.div variants={itemVariants} className="p-5 sm:p-8 bg-[#111111] border border-white/10 rounded-2xl space-y-3 sm:space-y-4 hover:border-[#ff5a1f]/50 transition-all shadow-sm group">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#080808] border border-[#ff5a1f]/30 flex items-center justify-center text-[#ff5a1f] group-hover:scale-110 transition-transform shadow-xs">
              <Zap className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#ff5a1f] tracking-widest uppercase">PILLAR 01</span>
              <h3 className="font-display font-black text-lg sm:text-2xl uppercase text-[#f4f0e8] tracking-wide">
                Raw & Unfiltered
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#817b73] leading-relaxed font-sans">
              No generic corporate fluff. <span className="text-[#f4f0e8] font-semibold">Real architecture stories</span>, massive failures, and the exact engineering breakthroughs that scaled unicorns.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-5 sm:p-8 bg-[#111111] border border-white/10 rounded-2xl space-y-3 sm:space-y-4 hover:border-[#ff5a1f]/50 transition-all shadow-sm group">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#080808] border border-[#ff5a1f]/30 flex items-center justify-center text-[#ff5a1f] group-hover:scale-110 transition-transform shadow-xs">
              <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#ff5a1f] tracking-widest uppercase">PILLAR 02</span>
              <h3 className="font-display font-black text-lg sm:text-2xl uppercase text-[#f4f0e8] tracking-wide">
                High-Trust Network
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#817b73] leading-relaxed font-sans">
              Connect with fellow <span className="text-[#f4f0e8] font-semibold">developers, founders, angels, and creators</span> in an intimate, high-impact environment built for lasting collaborations.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-5 sm:p-8 bg-[#111111] border border-white/10 rounded-2xl space-y-3 sm:space-y-4 hover:border-[#ff5a1f]/50 transition-all shadow-sm group">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#080808] border border-[#ff5a1f]/30 flex items-center justify-center text-[#ff5a1f] group-hover:scale-110 transition-transform shadow-xs">
              <Users className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#ff5a1f] tracking-widest uppercase">PILLAR 03</span>
              <h3 className="font-display font-black text-lg sm:text-2xl uppercase text-[#f4f0e8] tracking-wide">
                Next-Gen Frontier
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#817b73] leading-relaxed font-sans">
              Deep dives into <span className="text-[#f4f0e8] font-semibold">AI systems, autonomous agents</span>, distributed fintech, and sustainable computing architectures.
            </p>
          </motion.div>

        </div>

        {/* ================= STATS ROW ================= */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-8 bg-[#111111] border border-white/10 rounded-2xl shadow-sm">
          <div className="text-center space-y-1">
            <div className="font-display font-black text-2xl sm:text-5xl text-[#f4f0e8]">3</div>
            <div className="font-mono text-[10px] sm:text-xs text-[#ff5a1f] font-bold tracking-widest uppercase">Iconic Keynotes</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-2xl sm:text-5xl text-[#f4f0e8]">1,500+</div>
            <div className="font-mono text-[10px] sm:text-xs text-[#ff5a1f] font-bold tracking-widest uppercase">Live Attendees</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-2xl sm:text-5xl text-[#f4f0e8]">2 DAYS</div>
            <div className="font-mono text-[10px] sm:text-xs text-[#ff5a1f] font-bold tracking-widest uppercase">Intensive Sessions</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-2xl sm:text-5xl text-[#ff8a3d]">100%</div>
            <div className="font-mono text-[10px] sm:text-xs text-[#ff5a1f] font-bold tracking-widest uppercase">Free Pass</div>
          </div>
        </motion.div>

      </motion.div>

    </section>
  );
}
