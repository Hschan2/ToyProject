/**
 * Audio Synthesis Engine using the Web Audio API
 * Generates natural ambient night wind and the resonant strike of the Korean Bosingak bell.
 * Handles browser autoplay policies, muting, and volume scaling.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private windSource: AudioBufferSourceNode | null = null;
  private isWindPlaying = false;
  private isMuted = false;
  private masterVolume = 0.7;

  /**
   * Initializes AudioContext safely on user interaction
   */
  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) {
        console.warn("[SoundManager] Web Audio API is not supported in this browser.");
        return null;
      }
      this.ctx = new AudioCtxClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch((err) => {
        console.warn("[SoundManager] Context resume failed:", err);
      });
    }

    return this.ctx;
  }

  /**
   * Sets master volume (0.0 to 1.0)
   */
  public setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.masterVolume, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Toggles mute state
   */
  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.masterVolume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Starts procedural ambient night wind
   */
  public startWind() {
    const ctx = this.ensureContext();
    if (!ctx || this.isWindPlaying) return;

    try {
      // 5-second looping noise buffer
      const bufferSize = ctx.sampleRate * 5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      // Pink noise generation for warm wind sensation
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }

      this.windSource = ctx.createBufferSource();
      this.windSource.buffer = noiseBuffer;
      this.windSource.loop = true;

      // Lowpass and bandpass filters for howling wind character
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // Low-Frequency Oscillator (LFO) to modulate wind intensity slowly
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // Gentle gust every ~6 seconds
      lfoGain.gain.setValueAtTime(140, ctx.currentTime);

      lfo.connect(filter.frequency);
      lfo.start();

      this.windGain = ctx.createGain();
      this.windGain.gain.setValueAtTime(0.01, ctx.currentTime);
      this.windGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 3);

      this.windSource.connect(filter);
      filter.connect(this.windGain);
      if (this.masterGain) {
        this.windGain.connect(this.masterGain);
      }

      this.windSource.start();
      this.isWindPlaying = true;
    } catch (err) {
      console.error("[SoundManager] Error playing wind ambient:", err);
    }
  }

  /**
   * Stops ambient night wind
   */
  public stopWind() {
    if (!this.isWindPlaying || !this.windSource) return;
    try {
      if (this.windGain && this.ctx) {
        this.windGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.5);
      }
      setTimeout(() => {
        this.windSource?.stop();
        this.windSource?.disconnect();
        this.windSource = null;
        this.isWindPlaying = false;
      }, 600);
    } catch (err) {
      console.error(err);
      this.isWindPlaying = false;
    }
  }

  /**
   * Rings the traditional Bosingak bronze bell with authentic acoustic beat (맥놀이)
   */
  public ringBell() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Harmonic frequencies simulating the deep resonant Korean temple bell
    // 64Hz fundamental + 65.5Hz (beating interval 1.5Hz) + overtones
    const partials = [
      { freq: 64.0, gain: 0.6, decay: 9.0 },
      { freq: 65.5, gain: 0.55, decay: 8.5 }, // Beating partner creates 'woong-woong' pulse
      { freq: 148.0, gain: 0.4, decay: 6.5 },
      { freq: 228.0, gain: 0.35, decay: 5.0 },
      { freq: 382.0, gain: 0.25, decay: 4.0 },
      { freq: 610.0, gain: 0.15, decay: 2.5 },
      { freq: 1120.0, gain: 0.08, decay: 1.2 },
    ];

    const bellBus = ctx.createGain();
    bellBus.gain.setValueAtTime(0.8, now);
    if (this.masterGain) {
      bellBus.connect(this.masterGain);
    }

    // Strike impulse (wooden mallet wooden thud)
    const malletOsc = ctx.createOscillator();
    const malletGain = ctx.createGain();
    malletOsc.type = "sine";
    malletOsc.frequency.setValueAtTime(110, now);
    malletOsc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    malletGain.gain.setValueAtTime(0.9, now);
    malletGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    malletOsc.connect(malletGain);
    malletGain.connect(bellBus);
    malletOsc.start(now);
    malletOsc.stop(now + 0.2);

    // Resonant partials
    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const partGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      partGain.gain.setValueAtTime(0.0001, now);
      // Quick attack
      partGain.gain.exponentialRampToValueAtTime(gain, now + 0.02);
      // Long reverberant decay
      partGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(partGain);
      partGain.connect(bellBus);

      osc.start(now);
      osc.stop(now + decay + 0.1);
    });
  }
}

export const soundManager = new SoundManager();
