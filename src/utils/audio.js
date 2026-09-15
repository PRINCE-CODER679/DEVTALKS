/**
 * Native Web Audio Ambient Synthesizer
 * Provides an atmospheric cinematic low-frequency drone & tactile clicks
 * No external mp3 files required — 100% lightweight & instantaneous.
 */

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.droneGain = null;
    this.droneOsc = null;
    this.filter = null;
    this.isPlaying = false;
    this.isMuted = true; // Default muted for respectful auto-play policy
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleAmbient(forceState) {
    this.initContext();
    if (!this.ctx) return false;

    const targetState = forceState !== undefined ? forceState : this.isMuted;

    if (targetState === false) {
      // Unmute and start ambient drone
      this.startDrone();
      this.isMuted = false;
    } else {
      // Mute
      this.stopDrone();
      this.isMuted = true;
    }
    return !this.isMuted;
  }

  startDrone() {
    if (this.isPlaying || !this.ctx) return;

    try {
      // Low cinematic sub-bass drone
      this.droneOsc = this.ctx.createOscillator();
      this.droneOsc.type = 'sawtooth';
      this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // 55Hz (A1)

      // Lowpass filter for dark cinema texture
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3);

      this.droneOsc.connect(this.filter);
      this.filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn("Audio Context Drone initialization note:", e);
    }
  }

  stopDrone() {
    if (!this.isPlaying || !this.droneGain || !this.ctx) return;
    try {
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        if (this.droneOsc) {
          this.droneOsc.stop();
          this.droneOsc.disconnect();
          this.droneOsc = null;
        }
        this.isPlaying = false;
      }, 800);
    } catch (e) {
      this.isPlaying = false;
    }
  }

  playEvidenceClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playAccessGranted() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [220, 330, 440, 660];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.13);
      });
    } catch (e) {}
  }

  playAccessDenied() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.setValueAtTime(80, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }

  playCinematicImpact() {
    this.initContext();
    if (!this.ctx) return;
    try {
      // Deep sub-drop
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.9);
    } catch (e) {}
  }

  startCinematicTheme() {
    this.isMuted = false;
    this.initContext();
    if (!this.ctx) return;
    this.startDrone();
    this.playCinematicIntroTrack();
  }

  stopCinematicTheme() {
    this.stopDrone();
    this.isMuted = true;
  }

  playCinematicIntroTrack() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      
      // 1. Deep Sub Bass Drone Riser
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(45, now);
      subOsc.frequency.linearRampToValueAtTime(65, now + 15.0);

      const subFilter = this.ctx.createBiquadFilter();
      subFilter.type = 'lowpass';
      subFilter.frequency.setValueAtTime(120, now);
      subFilter.frequency.exponentialRampToValueAtTime(320, now + 18.0);
      subFilter.Q.setValueAtTime(3.0, now);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.14, now + 3.0);
      subGain.gain.linearRampToValueAtTime(0.22, now + 16.0);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 24.0);

      subOsc.connect(subFilter);
      subFilter.connect(subGain);
      subGain.connect(this.ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 24.0);

      // 2. Cyber Rhythmic Sonar / Tech Glitch Pulses across the full video
      const pulseNotes = [110, 146.83, 164.81, 220, 293.66, 329.63, 440, 587.33];
      for (let t = 0.4; t < 22.0; t += 0.45) {
        const pOsc = this.ctx.createOscillator();
        const pGain = this.ctx.createGain();
        pOsc.type = 'sine';
        const note = pulseNotes[Math.floor((t % 4) * 2)] || 220;
        pOsc.frequency.setValueAtTime(note, now + t);
        pOsc.frequency.exponentialRampToValueAtTime(note * 0.5, now + t + 0.16);

        pGain.gain.setValueAtTime(0.03 + Math.min(t / 22.0, 1) * 0.04, now + t);
        pGain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.18);

        pOsc.connect(pGain);
        pGain.connect(this.ctx.destination);
        pOsc.start(now + t);
        pOsc.stop(now + t + 0.2);
      }

      // 3. Tension White-Noise / Filter Sweep Riser
      const bufferSize = this.ctx.sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const nFilter = this.ctx.createBiquadFilter();
      nFilter.type = 'bandpass';
      nFilter.frequency.setValueAtTime(300, now + 4.5);
      nFilter.frequency.exponentialRampToValueAtTime(3500, now + 18.0);
      nFilter.Q.setValueAtTime(4, now + 4.5);

      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.001, now + 4.5);
      nGain.gain.exponentialRampToValueAtTime(0.08, now + 18.0);
      nGain.gain.exponentialRampToValueAtTime(0.0001, now + 20.0);

      noise.connect(nFilter);
      nFilter.connect(nGain);
      nGain.connect(this.ctx.destination);
      noise.start(now + 4.5);
      noise.stop(now + 9.0);

    } catch (e) {
      console.warn("Cinematic Intro Track error:", e);
    }
  }

  playReactionPop(type = 'fire') {
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      if (type === 'fire' || type === 'hype') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);
      } else if (type === 'zap' || type === 'bolt') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);
      } else if (type === 'heart') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.1);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.07);
      }

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }
}

export const soundFx = new AudioSynthesizer();
