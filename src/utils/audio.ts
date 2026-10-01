import { SupportedLanguage } from '../types';

export const LANGUAGE_SPEECH_CODES: Record<SupportedLanguage, string> = {
  Tamil: 'ta-IN',
  Hindi: 'hi-IN',
  English: 'en-IN',
  Telugu: 'te-IN',
  Kannada: 'kn-IN',
};

class AudioController {
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeakingState = false;
  private onStateChangeCallbacks: Set<(isSpeaking: boolean) => void> = new Set();
  private speechRate = 0.88; // Slightly slower, calm cadence ideal for elderly or rural listeners

  public subscribe(cb: (isSpeaking: boolean) => void) {
    this.onStateChangeCallbacks.add(cb);
    return () => {
      this.onStateChangeCallbacks.delete(cb);
    };
  }

  private setSpeaking(state: boolean) {
    this.isSpeakingState = state;
    this.onStateChangeCallbacks.forEach((cb) => cb(state));
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  public setRate(rate: number) {
    this.speechRate = Math.max(0.6, Math.min(1.5, rate));
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.speechRate;
    }
  }

  public getRate(): number {
    return this.speechRate;
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        console.warn('Error pausing audio:', e);
      }
      this.currentAudio = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn('Error cancelling speech synthesis:', e);
      }
    }

    this.setSpeaking(false);
  }

  private clientAudioCache = new Map<string, string>();

  private currentPlayingText: string | null = null;
  private isGeminiVoice = false;

  public getCurrentPlayingText(): string | null {
    return this.currentPlayingText;
  }

  public isUsingGeminiVoice(): boolean {
    return this.isGeminiVoice;
  }

  /**
   * Plays pre-generated Gemini Kore voice audio directly from base64
   */
  public async playBase64Audio(
    base64: string,
    mimeType: string = 'audio/wav',
    cacheKey?: string,
    spokenText?: string
  ): Promise<void> {
    if (!base64) return;
    this.stop();
    this.currentPlayingText = spokenText || null;
    this.isGeminiVoice = true;
    this.setSpeaking(true);

    const audioUrl = `data:${mimeType};base64,${base64}`;
    if (cacheKey) {
      this.clientAudioCache.set(cacheKey, audioUrl);
    }

    try {
      const audio = new Audio(audioUrl);
      audio.playbackRate = this.speechRate;
      this.currentAudio = audio;

      audio.onended = () => {
        this.setSpeaking(false);
        this.currentAudio = null;
        this.currentPlayingText = null;
      };

      audio.onerror = () => {
        this.setSpeaking(false);
        this.currentAudio = null;
        this.currentPlayingText = null;
      };

      await audio.play();
    } catch (e) {
      console.warn('Audio play error:', e);
      this.setSpeaking(false);
      this.currentAudio = null;
      this.currentPlayingText = null;
    }
  }

  /**
   * Speaks the given text in the requested regional language using natural, warm Gemini human voice.
   */
  public async speak(text: string, language: SupportedLanguage = 'Hindi'): Promise<void> {
    if (!text || typeof text !== 'string') return;
    this.stop();

    // Clean text of markdown, asterisks, brackets, hashes, or tags
    const cleanText = text
      .replace(/[*#_`~]/g, '')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    this.currentPlayingText = cleanText;
    this.setSpeaking(true);

    const cacheKey = `${language}:${cleanText}`;

    // Check client-side audio cache first for instant playback
    if (this.clientAudioCache.has(cacheKey)) {
      try {
        const audioUrl = this.clientAudioCache.get(cacheKey)!;
        const audio = new Audio(audioUrl);
        audio.playbackRate = this.speechRate;
        this.currentAudio = audio;
        this.isGeminiVoice = true;

        audio.onended = () => {
          this.setSpeaking(false);
          this.currentAudio = null;
          this.currentPlayingText = null;
        };

        audio.onerror = () => {
          this.fallbackWebSpeech(cleanText, language);
        };

        await audio.play();
        return;
      } catch {
        // Continue to fresh fetch
      }
    }

    // Step 1: Request high-fidelity natural Gemini human voice from server (with retry)
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch('/api/gemini/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: cleanText, language }),
        });

        if (res.ok) {
          const data = await res.json();

          if (data.success && data.audioBase64) {
            const audioUrl = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;

            // Cache in memory for instant reuse
            if (this.clientAudioCache.size > 200) {
              const first = this.clientAudioCache.keys().next().value;
              if (first) this.clientAudioCache.delete(first);
            }
            this.clientAudioCache.set(cacheKey, audioUrl);

            const audio = new Audio(audioUrl);
            audio.playbackRate = this.speechRate;
            this.currentAudio = audio;
            this.isGeminiVoice = true;

            audio.onended = () => {
              this.setSpeaking(false);
              this.currentAudio = null;
              this.currentPlayingText = null;
            };

            audio.onerror = () => {
              this.fallbackWebSpeech(cleanText, language);
            };

            await audio.play();
            return;
          }
        }
      } catch (fetchErr) {
        console.warn(`Attempt ${attempt + 1} fetching Gemini audio:`, fetchErr);
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 200));
        }
      }
    }

    // Step 2: Fallback to browser SpeechSynthesis only if server completely failed
    this.isGeminiVoice = false;
    this.fallbackWebSpeech(cleanText, language);
  }

  private fallbackWebSpeech(text: string, language: SupportedLanguage) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.setSpeaking(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const targetLang = LANGUAGE_SPEECH_CODES[language] || 'hi-IN';
      utterance.lang = targetLang;
      utterance.rate = this.speechRate;
      utterance.pitch = 1.05; // Slightly warm, friendly pitch

      const selectVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const primaryCode = targetLang.split('-')[0].toLowerCase();
        const matchingVoice = voices.find(
          (v) =>
            v.lang.toLowerCase() === targetLang.toLowerCase() ||
            v.lang.toLowerCase().startsWith(primaryCode)
        );
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      };

      selectVoice();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = selectVoice;
      }

      utterance.onend = () => {
        this.setSpeaking(false);
      };

      utterance.onerror = () => {
        this.setSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.setSpeaking(false);
    }
  }

  /**
   * Sound effect for tactile feedback (gentle bell chime)
   */
  public playFeedbackSound(type: 'tap' | 'start-record' | 'stop-record' | 'success') {
    if (typeof window === 'undefined' || !window.AudioContext) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'start-record') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'stop-record') {
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        osc.frequency.setValueAtTime(500, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      // Ignore audio context autoplay restriction
    }
  }
}

export const audioController = new AudioController();
