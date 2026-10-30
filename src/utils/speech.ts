import { Language } from '../types';

export const LANGUAGE_SPEECH_MAP: Record<Language, string> = {
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  en: 'en-IN'
};

class AudioHelper {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioCtx: AudioContext | null = null;
  private sirenOscillator: OscillatorNode | null = null;
  private sirenGain: GainNode | null = null;
  private sirenInterval: any = null;

  // Speak text using Web Speech API
  speak(
    text: string,
    lang: Language = 'hi',
    rate: number = 0.95,
    onEnd?: () => void,
    onError?: () => void
  ): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      if (onEnd) onEnd();
      return false;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANGUAGE_SPEECH_MAP[lang] || 'hi-IN';
      utterance.rate = rate; // slightly slower for better clarity for workers
      utterance.pitch = 1.0;

      // Try selecting an Indian voice if available
      const voices = window.speechSynthesis.getVoices();
      const targetPrefix = LANGUAGE_SPEECH_MAP[lang].split('-')[0];
      const matchingVoice = voices.find(
        (v) => v.lang.startsWith(targetPrefix) || v.lang.includes('IN')
      );
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        this.currentUtterance = null;
        if (onError) onError();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('Error invoking speech:', e);
      if (onEnd) onEnd();
      return false;
    }
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    return window.speechSynthesis.speaking;
  }

  // Web Audio API Synthesized Loud Emergency Siren
  startEmergencySiren() {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (this.sirenOscillator) {
        this.stopEmergencySiren();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();

      let high = false;
      this.sirenInterval = setInterval(() => {
        if (!this.audioCtx || !this.sirenOscillator) return;
        const now = this.audioCtx.currentTime;
        const targetFreq = high ? 650 : 950;
        this.sirenOscillator.frequency.setTargetAtTime(targetFreq, now, 0.08);
        high = !high;
      }, 350);

      this.sirenOscillator = osc;
      this.sirenGain = gain;
    } catch (err) {
      console.warn('Could not start emergency siren audio:', err);
    }
  }

  stopEmergencySiren() {
    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }
    if (this.sirenOscillator) {
      try {
        this.sirenOscillator.stop();
        this.sirenOscillator.disconnect();
      } catch (e) {}
      this.sirenOscillator = null;
    }
    if (this.sirenGain) {
      try {
        this.sirenGain.disconnect();
      } catch (e) {}
      this.sirenGain = null;
    }
  }

  // Trigger device haptic vibration
  triggerVibration(pattern: number[] = [200, 100, 200, 100, 400]) {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }
}

export const speechService = new AudioHelper();
