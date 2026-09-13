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
}

export const soundFx = new AudioSynthesizer();
