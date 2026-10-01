import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, Send, Volume2, Search, ArrowRight, CornerDownLeft } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';
import { audioController, LANGUAGE_SPEECH_CODES } from '../utils/audio';

interface VoiceMicHeroProps {
  currentLanguage: SupportedLanguage;
  onSearchQuery: (query: string) => void;
  isProcessingQuery: boolean;
  highContrast?: boolean;
}

export const VoiceMicHero: React.FC<VoiceMicHeroProps> = ({
  currentLanguage,
  onSearchQuery,
  isProcessingQuery,
  highContrast = false,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [hasMicPermissionError, setHasMicPermissionError] = useState(false);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const t = TRANSLATIONS[currentLanguage];

  // Initialize SpeechRecognition if supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.lang = LANGUAGE_SPEECH_CODES[currentLanguage] || 'hi-IN';

          recognition.onstart = () => {
            setIsListening(true);
            setInterimText('');
            audioController.playFeedbackSound('start-record');
          };

          recognition.onresult = (event: any) => {
            let current = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              current += event.results[i][0].transcript;
            }
            setInterimText(current);
          };

          recognition.onend = () => {
            setIsListening(false);
            audioController.playFeedbackSound('stop-record');
            // If we captured something, trigger search
            if (interimText.trim()) {
              onSearchQuery(interimText.trim());
            }
          };

          recognition.onerror = (event: any) => {
            console.warn('Speech recognition error:', event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
              setHasMicPermissionError(true);
            }
          };

          recognitionRef.current = recognition;
        } catch (e) {
          console.warn('Speech recognition could not be initialized:', e);
        }
      }
    }
  }, [currentLanguage, interimText, onSearchQuery]);

  // Fallback MediaRecorder implementation if SpeechRecognition fails
  const startRecordingMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach((track) => track.stop());

        // Convert blob to base64 and send to Gemini transcribe
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Data = (reader.result as string).split(',')[1];
          try {
            const res = await fetch('/api/gemini/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                audioBase64: base64Data,
                mimeType: 'audio/webm',
                language: currentLanguage,
              }),
            });
            const data = await res.json();
            if (data.success && data.transcript) {
              setInterimText(data.transcript);
              onSearchQuery(data.transcript);
            }
          } catch (err) {
            console.error('Transcription error:', err);
          }
        };
      };

      mediaRecorder.start();
      setIsListening(true);
      audioController.playFeedbackSound('start-record');
    } catch (err) {
      console.error('Mic permission denied:', err);
      setHasMicPermissionError(true);
      setIsListening(false);
    }
  };

  const handleMicClick = () => {
    audioController.stop(); // Stop any currently playing audio

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      setIsListening(false);
      audioController.playFeedbackSound('stop-record');
      return;
    }

    setHasMicPermissionError(false);
    setInterimText('');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = LANGUAGE_SPEECH_CODES[currentLanguage] || 'hi-IN';
        recognitionRef.current.start();
        return;
      } catch (e) {
        console.warn('Recognition start failed, trying media recorder:', e);
      }
    }

    // MediaRecorder fallback
    startRecordingMedia();
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    audioController.playFeedbackSound('tap');
    onSearchQuery(textInput.trim());
    setTextInput('');
  };

  const handleChipClick = (query: string) => {
    audioController.playFeedbackSound('tap');
    onSearchQuery(query);
  };

  return (
    <div
      className={`relative overflow-hidden pt-6 pb-10 px-4 rounded-3xl border-2 shadow-sm mb-8 transition-colors ${
        highContrast
          ? 'bg-stone-950 border-amber-400 text-white'
          : 'bg-gradient-to-b from-amber-100 via-orange-50 to-white border-amber-300'
      }`}
    >
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Welcome Tagline Overlay & Welcoming Voice Trigger */}
        <div className="mb-3 flex items-center justify-center gap-2.5 flex-wrap">
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wide border-2 shadow-xs ${
              highContrast
                ? 'bg-amber-400 text-stone-950 border-amber-300'
                : 'bg-amber-200 text-amber-950 border-amber-400'
            }`}
          >
            {t.tagline}
          </span>

          <button
            onClick={() => {
              audioController.playFeedbackSound('tap');
              const greeting =
                LANGUAGES.find((l) => l.id === currentLanguage)?.sampleGreeting ||
                t.voiceHelperText;
              audioController.speak(greeting, currentLanguage);
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[36px] rounded-full text-xs font-black border-2 transition-transform active:scale-95 shadow-xs cursor-pointer ${
              highContrast
                ? 'bg-stone-900 hover:bg-stone-800 text-amber-300 border-amber-400'
                : 'bg-white hover:bg-amber-50 text-amber-950 border-amber-400'
            }`}
            title="Listen to Sakhi's welcoming voice"
            aria-label="Listen to Sakhi's welcoming voice"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-600 font-black animate-pulse" />
            <span>
              {currentLanguage === 'English'
                ? 'Listen to Welcome Voice'
                : currentLanguage === 'Tamil'
                ? 'வரவேற்பு குரலை கேளுங்கள்'
                : currentLanguage === 'Telugu'
                ? 'స్వాగత స్వరం వినండి'
                : currentLanguage === 'Kannada'
                ? 'ಸ್ವಾಗತ ಧ್ವನಿ ಕೇಳಿ'
                : 'स्वागत आवाज़ सुनें'}
            </span>
          </button>
        </div>

        {/* Section Heading with WCAG AAA Contrast */}
        <h2
          className={`text-2xl md:text-4xl font-black font-serif mb-4 leading-snug tracking-tight ${
            highContrast ? 'text-white' : 'text-stone-950'
          }`}
        >
          {t.schemesSectionSubtitle}
        </h2>

        {/* Central Giant Voice Mic Button */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="relative group">
            {/* Ripple rings while listening */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-rose-500/50 animate-ping duration-1000 scale-125" />
                <div className="absolute -inset-3 rounded-full border-4 border-rose-500 animate-pulse duration-700" />
              </>
            )}

            <button
              onClick={handleMicClick}
              disabled={isProcessingQuery}
              className={`relative z-10 w-28 h-28 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all transform active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 ${
                isListening
                  ? 'bg-rose-700 hover:bg-rose-800 text-white ring-4 ring-rose-400'
                  : highContrast
                  ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 ring-4 ring-amber-300 font-black'
                  : 'bg-gradient-to-tr from-amber-700 via-orange-600 to-rose-700 text-white ring-4 ring-amber-400 hover:scale-105'
              }`}
              aria-label={isListening ? t.stopSpeaking : t.tapToSpeak}
            >
              {isListening ? (
                <MicOff className="w-12 h-12 animate-bounce" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
              <span className="text-xs font-black mt-1.5 tracking-tight px-1">
                {isListening ? t.stopSpeaking : t.tapToSpeak}
              </span>
            </button>
          </div>

          {/* Voice Prompt Status Text */}
          <div className="mt-5 min-h-[3rem] flex flex-col items-center justify-center">
            {isListening ? (
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-100 border-2 border-rose-400 text-rose-950 text-sm font-black shadow-xs animate-pulse">
                <span className="w-3 h-3 rounded-full bg-rose-700 animate-ping" />
                <span>{t.voiceListening}</span>
              </div>
            ) : isProcessingQuery ? (
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-950 text-sm font-black shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-800 animate-spin" />
                <span>{t.sakhiThinking}</span>
              </div>
            ) : (
              <div
                className={`px-4 py-2 rounded-2xl border-2 shadow-xs text-xs sm:text-sm font-bold max-w-lg mx-auto ${
                  highContrast
                    ? 'bg-stone-900 border-stone-700 text-stone-100'
                    : 'bg-white border-stone-300 text-stone-900'
                }`}
              >
                {t.voiceHelperText}
              </div>
            )}

            {/* Interim Transcript display */}
            {interimText && (
              <div className="mt-3 text-base font-black text-amber-300 bg-stone-950 px-5 py-2 rounded-xl border-2 border-amber-400 shadow-md max-w-lg">
                "{interimText}"
              </div>
            )}

            {hasMicPermissionError && (
              <p className="mt-3 text-xs font-black text-rose-950 bg-rose-100 px-4 py-2 rounded-xl border-2 border-rose-400">
                {t.micPermissionError}
              </p>
            )}
          </div>
        </div>

        {/* Quick Query Spoken Chips */}
        <div className="mt-4">
          <p
            className={`text-xs font-black uppercase tracking-wider mb-3 ${
              highContrast ? 'text-amber-300' : 'text-stone-900'
            }`}
          >
            {t.popularQuestions}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {t.sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(q)}
                className={`group flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs md:text-sm font-black border-2 shadow-xs transition-all active:scale-95 ${
                  highContrast
                    ? 'bg-stone-900 hover:bg-stone-800 text-white border-amber-400 hover:border-amber-300'
                    : 'bg-white hover:bg-amber-100 text-stone-950 border-stone-300 hover:border-amber-500'
                }`}
              >
                <Volume2 className="w-4 h-4 text-amber-700 shrink-0 group-hover:scale-110 transition-transform" />
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Text Search Toggle for users who want to type */}
        <div
          className={`mt-6 pt-4 border-t ${
            highContrast ? 'border-stone-800' : 'border-amber-300'
          }`}
        >
          {!showTextInput ? (
            <button
              onClick={() => setShowTextInput(true)}
              className={`inline-flex items-center gap-2 px-4 py-2 min-h-[44px] text-xs font-black rounded-xl border-2 transition-colors ${
                highContrast
                  ? 'bg-stone-900 hover:bg-stone-800 text-amber-300 border-amber-400'
                  : 'bg-white hover:bg-stone-100 text-stone-950 border-stone-300'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{t.typeQueryPrompt}</span>
            </button>
          ) : (
            <form onSubmit={handleTextSubmit} className="max-w-md mx-auto flex items-center gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={t.typePlaceholder}
                className={`flex-1 px-4 py-2.5 min-h-[44px] text-sm rounded-xl border-2 font-bold focus:outline-none focus:ring-4 focus:ring-amber-500 shadow-xs ${
                  highContrast
                    ? 'bg-stone-900 border-amber-400 text-white placeholder:text-stone-400'
                    : 'bg-white border-stone-400 text-stone-950 placeholder:text-stone-600'
                }`}
              />
              <button
                type="submit"
                disabled={!textInput.trim() || isProcessingQuery}
                className="px-5 py-2.5 min-h-[44px] rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-black text-sm flex items-center gap-1.5 shadow-sm transition-colors border-2 border-amber-900"
              >
                <span>{t.askButton}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
