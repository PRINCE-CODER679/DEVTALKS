import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowUpRight, Bell, Check, Shield, Share2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function EventDetails({ event }) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    soundFx.playAccessGranted();
    setSubscribed(true);
  };

  const handleShare = () => {
    soundFx.playEvidenceClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section 
      id="event" 
      className="relative min-h-screen py-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-editorial-border space-y-20"
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-editorial-border pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-lightRed tracking-mega uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            SECTION 07 // OFFICIAL ASSEMBLY DOSSIER
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
            DEVTALKS '26
          </h2>

          <p className="font-mono text-xs sm:text-sm text-editorial-muted tracking-widest uppercase font-semibold">
            {event.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-editorial-border hover:border-editorial-borderHover font-mono text-xs text-editorial-light transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-brand-red" />
            <span>{copiedLink ? 'LINK COPIED' : 'SHARE INVESTIGATION'}</span>
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Date Box */}
        <div className="bg-surface/80 border border-editorial-border p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-full border border-brand-red/30 flex items-center justify-center bg-brand-red/5">
            <Calendar className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <div className="font-mono text-[10px] text-editorial-dim tracking-widest uppercase">DATE OF ASSEMBLY</div>
            <div className="font-display font-bold text-xl text-white mt-1 uppercase">{event.schedule.date}</div>
          </div>
          <p className="font-sans text-xs text-editorial-muted">
            Doors open at {event.schedule.doorsOpen}. Entry requires confirmed campus pass.
          </p>
        </div>

        {/* Time Box */}
        <div className="bg-surface/80 border border-editorial-border p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-full border border-brand-red/30 flex items-center justify-center bg-brand-red/5">
            <Clock className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <div className="font-mono text-[10px] text-editorial-dim tracking-widest uppercase">TIMING & DURATION</div>
            <div className="font-display font-bold text-xl text-white mt-1 uppercase">{event.schedule.time}</div>
          </div>
          <p className="font-sans text-xs text-editorial-muted">
            Includes keynote address, interactive student Q&A, and networking mixer.
          </p>
        </div>

        {/* Venue Box */}
        <div className="bg-surface/80 border border-editorial-border p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-full border border-brand-red/30 flex items-center justify-center bg-brand-red/5">
            <MapPin className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <div className="font-mono text-[10px] text-editorial-dim tracking-widest uppercase">LOCATION & VENUE</div>
            <div className="font-display font-bold text-xl text-white mt-1 uppercase">{event.schedule.venue}</div>
          </div>
          <p className="font-sans text-xs text-editorial-muted">
            {event.schedule.seating}. Live secure stream on campus intranet.
          </p>
        </div>

        {/* Organizer Box */}
        <div className="bg-surface/80 border border-editorial-border p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-full border border-brand-red/30 flex items-center justify-center bg-brand-red/5">
            <Shield className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <div className="font-mono text-[10px] text-editorial-dim tracking-widest uppercase">ORGANIZED BY</div>
            <div className="font-display font-bold text-xl text-brand-lightRed mt-1 uppercase">DEVKRAFT</div>
          </div>
          <p className="font-sans text-xs text-editorial-muted">
            Official Technical Club under the {event.organizer.parentBody}.
          </p>
        </div>

      </div>

      {/* Itinerary Timeline */}
      <div className="space-y-6">
        <div className="font-mono text-xs text-editorial-dim tracking-widest uppercase">
          EVENT TIMELINE // SESSIONS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {event.timeline.map((item, idx) => (
            <div key={idx} className="bg-surface/50 border border-editorial-border p-5 space-y-2 relative">
              <div className="font-mono text-xs text-brand-lightRed font-bold">
                {item.time}
              </div>
              <div className="font-display font-bold text-sm text-white uppercase">
                {item.title}
              </div>
              <p className="font-sans text-[11px] text-editorial-dim">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stay Updated / Notification Card */}
      <div className="bg-gradient-to-r from-surface via-subtle to-surface border border-editorial-border p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              NEVER MISS A CLUE OR REVEAL.
            </h3>
            <p className="font-sans text-sm text-editorial-muted leading-relaxed">
              Get direct alerts the moment Day 2, Day 3, and the official identity decode go live.
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="ENTER STUDENT EMAIL..."
                required
                className="bg-void border border-editorial-border px-5 py-3 font-mono text-xs text-white placeholder-editorial-dim focus:border-brand-red focus:outline-none flex-grow"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-red hover:bg-brand-crimson text-white font-mono text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap"
              >
                STAY UPDATED →
              </button>
            </form>
          ) : (
            <div className="p-4 bg-green-500/10 border border-green-500/40 text-green-400 font-mono text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>DISPATCH SUBSCRIPTION CONFIRMED. YOU WILL RECEIVE DAILY EMBARGO UPDATES.</span>
            </div>
          )}
        </div>
      </div>

      {/* Institutional Footer */}
      <footer className="pt-12 border-t border-editorial-border flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-editorial-dim">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold tracking-widest">DEVKRAFT</span>
          <span>•</span>
          <span>TRAINING & PLACEMENT CELL</span>
          <span>•</span>
          <span>DEVTALKS '26</span>
        </div>

        <div className="text-center sm:text-right text-[11px] text-editorial-dim">
          CONFIDENTIAL TEASER MICROSITE • ALL RIGHTS RESERVED
        </div>
      </footer>
    </section>
  );
}
