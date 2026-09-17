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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-[#111111] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 text-[#f4f0e8] overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={() => {
            soundFx.playEvidenceClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-[#817b73] hover:text-[#f4f0e8] rounded-lg hover:bg-[#080808] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isRegistered ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#080808] border border-[#ff5a1f]/40 text-[#ff5a1f] font-mono text-[10px] tracking-widest uppercase font-bold">
                <Ticket className="w-3 h-3 text-[#ff5a1f]" />
                <span>OFFICIAL ADMISSION</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#f4f0e8]">
                CLAIM YOUR DEVTALKS PASS
              </h3>
              <p className="text-xs text-[#817b73]">
                100% Free pass to 3 keynote mystery talks, live Q&A, and networking.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[11px] text-[#f4f0e8] uppercase font-bold">Full Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4 py-2.5 bg-[#080808] border border-white/10 focus:border-[#ff5a1f] rounded-xl text-xs font-mono text-[#f4f0e8] placeholder-[#817b73] focus:outline-none shadow-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[11px] text-[#f4f0e8] uppercase font-bold">Work / College Email</label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 bg-[#080808] border border-white/10 focus:border-[#ff5a1f] rounded-xl text-xs font-mono text-[#f4f0e8] placeholder-[#817b73] focus:outline-none shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-[#f4f0e8] uppercase font-bold">Your Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#080808] border border-white/10 rounded-xl text-xs font-mono text-[#f4f0e8] focus:outline-none shadow-xs"
                  >
                    <option value="Developer / Engineer" className="bg-[#111111]">Developer / Engineer</option>
                    <option value="Student / Researcher" className="bg-[#111111]">Student / Researcher</option>
                    <option value="Founder / Operator" className="bg-[#111111]">Founder / Operator</option>
                    <option value="Designer / Product" className="bg-[#111111]">Designer / Product</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-[#f4f0e8] uppercase font-bold">Attendance Mode</label>
                  <select 
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#080808] border border-white/10 rounded-xl text-xs font-mono text-[#f4f0e8] focus:outline-none shadow-xs"
                  >
                    <option value="In-Person Auditorium" className="bg-[#111111]">In-Person Auditorium</option>
                    <option value="Live Worldwide Stream" className="bg-[#111111]">Live Worldwide Stream</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-display font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-[0_4px_16px_rgba(255,90,31,0.25)] transition-all cursor-pointer"
              >
                GENERATE INSTANT PASS →
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#080808] border border-[#ff5a1f] flex items-center justify-center text-[#ff5a1f] shadow-[0_4px_16px_rgba(255,90,31,0.2)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-black text-2xl uppercase text-[#f4f0e8]">
                PASS CONFIRMED!
              </h3>
              <p className="text-xs text-[#817b73]">
                You're registered for DEVTALKS '26. See you at the keynote stage!
              </p>
            </div>

            {/* Generated Ticket Badge */}
            <div className="p-4 bg-[#080808] border border-[#ff5a1f]/40 rounded-xl space-y-3 text-left shadow-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-display font-bold text-sm text-[#f4f0e8]">DEVTALKS '26</span>
                <span className="font-mono text-[10px] text-[#ff5a1f] font-bold">ALL-ACCESS PASS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[#817b73] block text-[10px]">NAME</span>
                  <span className="text-[#f4f0e8] font-semibold">{formData.name}</span>
                </div>
                <div>
                  <span className="text-[#817b73] block text-[10px]">TICKET ID</span>
                  <span className="text-[#f4f0e8] font-semibold">DT26-{(Math.random() * 10000 | 0)}</span>
                </div>
                <div>
                  <span className="text-[#817b73] block text-[10px]">DATE</span>
                  <span className="text-[#f4f0e8]">JAN 10 & 11, 2026</span>
                </div>
                <div>
                  <span className="text-[#817b73] block text-[10px]">ACCESS</span>
                  <span className="text-[#ff8a3d] font-semibold">{formData.attendance}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onClose()}
              className="w-full py-3 bg-[#ff5a1f] hover:bg-[#ff7a45] text-[#080808] font-mono text-xs font-bold tracking-wider uppercase rounded-xl transition-colors cursor-pointer shadow-md"
            >
              DONE & RETURN TO STAGE
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
