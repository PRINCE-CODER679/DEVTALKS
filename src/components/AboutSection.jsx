import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Users, 
  HelpCircle, 
  ChevronDown, 
  ArrowUpRight 
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function AboutSection({ onRegisterNow }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What is DEVTALKS '26?",
      a: "DEVTALKS '26 is an unvarnished developer conference and mystery keynote series bringing the sharpest minds in engineering, product, AI, and venture capital directly to the stage."
    },
    {
      q: "How does the Mystery Speaker campaign work?",
      a: "Leading up to the event, classified clues and dossiers are unlocked for each of our 3 keynote speakers. Attendees can test their guesses, earn detective rank, and unlock exclusive backstage passes."
    },
    {
      q: "Is attendance free?",
      a: "Yes! General admission passes for both the in-person auditorium keynote and the live worldwide stream are 100% free with pre-registration."
    },
    {
      q: "When will the full speaker roster be revealed?",
      a: "Speaker identities will be formally unmasked during the live countdown event on January 10th & 11th, 2026."
    }
  ];

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-[#060606] text-white py-24 px-4 sm:px-8 lg:px-12 border-t border-[#222222] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#FF2A1A]/40 text-[#FF2A1A] font-mono text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE VISION & CONFERENCE</span>
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white">
              ABOUT DEVTALKS <span className="text-[#FF2A1A]">'26</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-2xl">
              More than just slides and scripted presentations. A meeting of builders, pioneers, and innovators reshaping the modern digital economy.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playEvidenceClick();
              onRegisterNow();
            }}
            className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF2A1A] text-white hover:bg-[#D91C1C] font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md"
          >
            <span>CLAIM FREE PASS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* ================= 3 PILLARS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 bg-[#111111] border border-[#262626] rounded-2xl space-y-4 hover:border-[#FF2A1A]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FF2A1A]/40 flex items-center justify-center text-[#FF2A1A]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase text-white">
              01. Raw & Unfiltered
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              No generic corporate fluff. Real architecture stories, massive failures, and the exact engineering breakthroughs that scaled unicorns.
            </p>
          </div>

          <div className="p-6 bg-[#111111] border border-[#262626] rounded-2xl space-y-4 hover:border-[#FF2A1A]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FF2A1A]/40 flex items-center justify-center text-[#FF2A1A]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase text-white">
              02. High-Trust Network
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Connect with fellow developers, founders, angels, and creators in an intimate, high-impact environment built for lasting collaborations.
            </p>
          </div>

          <div className="p-6 bg-[#111111] border border-[#262626] rounded-2xl space-y-4 hover:border-[#FF2A1A]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#FF2A1A]/40 flex items-center justify-center text-[#FF2A1A]">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#111111] border border-[#262626] rounded-2xl">
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-white">3</div>
            <div className="font-mono text-xs text-[#FF2A1A] tracking-widest uppercase">Iconic Keynotes</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-white">1,500+</div>
            <div className="font-mono text-xs text-[#FF2A1A] tracking-widest uppercase">Live Attendees</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-white">2 DAYS</div>
            <div className="font-mono text-xs text-[#FF2A1A] tracking-widest uppercase">Intensive Sessions</div>
          </div>
          <div className="text-center space-y-1">
            <div className="font-display font-black text-3xl sm:text-5xl text-white">100%</div>
            <div className="font-mono text-xs text-[#FF2A1A] tracking-widest uppercase">Free Registration</div>
          </div>
        </div>

        {/* ================= FAQ ACCORDION ================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#FF2A1A]" />
            <h3 className="font-display font-bold text-2xl uppercase text-white">
              FREQUENTLY ASKED QUESTIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#111111] border border-[#262626] rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => {
                    soundFx.playEvidenceClick();
                    setOpenFaq(openFaq === idx ? -1 : idx);
                  }}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-[#181818] transition-colors"
                >
                  <span className="font-mono text-xs sm:text-sm font-semibold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${openFaq === idx ? 'rotate-180 text-[#FF2A1A]' : ''}`} />
                </button>

                {openFaq === idx && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-[#222222]"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
