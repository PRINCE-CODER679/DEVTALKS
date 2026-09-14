import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Ticket } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function RegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer / Engineer',
    attendance: 'In-Person Auditorium'
  });
  const [isRegistered, setIsRegistered] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    soundFx.playRevealUnlocked();
    setIsRegistered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-[#111111] border border-[#333333] rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={() => {
            soundFx.playEvidenceClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-[#222222] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isRegistered ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#FF2A1A]/40 text-[#FF2A1A] font-mono text-[10px] tracking-widest uppercase">
                <Ticket className="w-3 h-3" />
                <span>OFFICIAL ADMISSION</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                CLAIM YOUR DEVTALKS PASS
              </h3>
              <p className="text-xs text-neutral-300">
                100% Free pass to 3 keynote mystery talks, live Q&A, and networking.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[11px] text-neutral-300 uppercase">Full Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4 py-2.5 bg-black border border-[#333333] focus:border-[#FF2A1A] rounded-xl text-xs font-mono text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[11px] text-neutral-300 uppercase">Work / College Email</label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 bg-black border border-[#333333] focus:border-[#FF2A1A] rounded-xl text-xs font-mono text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-neutral-300 uppercase">Your Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black border border-[#333333] rounded-xl text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="Developer / Engineer">Developer / Engineer</option>
                    <option value="Student / Researcher">Student / Researcher</option>
                    <option value="Founder / Operator">Founder / Operator</option>
                    <option value="Designer / Product">Designer / Product</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-neutral-300 uppercase">Attendance Mode</label>
                  <select 
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black border border-[#333333] rounded-xl text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="In-Person Auditorium">In-Person Auditorium</option>
                    <option value="Live Worldwide Stream">Live Worldwide Stream</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FF2A1A] hover:bg-[#D91C1C] text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-md transition-all"
              >
                GENERATE INSTANT PASS →
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#181818] border border-[#EB0028] flex items-center justify-center text-[#EB0028]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-black text-2xl uppercase text-white">
                PASS CONFIRMED!
              </h3>
              <p className="text-xs text-neutral-300">
                You're registered for DEVTALKS '26. See you at the keynote stage!
              </p>
            </div>

            {/* Generated Ticket Badge */}
            <div className="p-4 bg-black border border-[#FF2A1A] rounded-xl space-y-3 text-left">
              <div className="flex items-center justify-between border-b border-[#262626] pb-2">
                <span className="font-display font-bold text-sm text-white">DEVTALKS '26</span>
                <span className="font-mono text-[10px] text-[#FF2A1A] font-bold">ALL-ACCESS PASS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block text-[10px]">NAME</span>
                  <span className="text-white font-semibold">{formData.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">TICKET ID</span>
                  <span className="text-white font-semibold">DT26-{(Math.random() * 10000 | 0)}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">DATE</span>
                  <span className="text-white">JAN 10 & 11, 2026</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">ACCESS</span>
                  <span className="text-white">{formData.attendance}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onClose()}
              className="w-full py-3 bg-white text-black font-mono text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-[#FF2A1A] hover:text-white transition-colors"
            >
              DONE & RETURN TO STAGE
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
