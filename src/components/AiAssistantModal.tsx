import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Mic,
  Send,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
  FileText,
  PhoneCall,
} from 'lucide-react';
import { Scheme, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { audioController, LANGUAGE_SPEECH_CODES } from '../utils/audio';

interface AiAssistantModalProps {
  currentLanguage: SupportedLanguage;
  initialQuery?: string;
  activeScheme?: Scheme | null;
  onClose: () => void;
  onSelectSchemeById?: (schemeId: string) => void;
  isSpeaking: boolean;
  highContrast?: boolean;
}

export interface GeminiGuidanceResult {
  greeting: string;
  matchedSchemeId?: string;
  identifiedScheme: string;
  schemeSummary: string;
  cashBenefit: string;
  eligibilityCheck: string[];
  requiredDocuments: { name: string; simpleDesc: string; iconType?: string }[];
  whereToGo: {
    primaryPlace: string;
    secondaryPlace: string;
    whatToSay: string;
  };
  voiceScript: string;
  encouragement: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  currentLanguage,
  initialQuery = '',
  activeScheme = null,
  onClose,
  onSelectSchemeById,
  isSpeaking,
  highContrast = false,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [guidance, setGuidance] = useState<GeminiGuidanceResult | null>(null);
  const [responseAudio, setResponseAudio] = useState<{ base64: string; mimeType: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Run initial query on mount if provided
  React.useEffect(() => {
    if (initialQuery) {
      handleAskGemini(initialQuery);
    }
  }, [initialQuery]);

  const handleAskGemini = async (promptText: string) => {
    if (!promptText.trim()) return;
    setIsLoading(true);
    setErrorMessage('');
    audioController.stop();

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          language: currentLanguage,
          currentScheme: activeScheme ? activeScheme.title : null,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setGuidance(json.data);
        if (json.audioBase64) {
          setResponseAudio({ base64: json.audioBase64, mimeType: json.mimeType || 'audio/wav' });
          audioController.playBase64Audio(
            json.audioBase64,
            json.mimeType || 'audio/wav',
            `${currentLanguage}:${json.data.voiceScript}`
          );
        } else if (json.data.voiceScript) {
          audioController.speak(json.data.voiceScript, currentLanguage);
        }
      } else {
        setErrorMessage(json.details || 'जानकारी लाने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setErrorMessage('सर्वर से संपर्क नहीं हो सका। कृपया अपनी आवाज़ में दोबारा पूछें।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim() || isLoading) return;
    audioController.playFeedbackSound('tap');
    handleAskGemini(queryInput);
    setQueryInput('');
  };

  const handlePlayScript = () => {
    if (responseAudio?.base64) {
      audioController.playFeedbackSound('tap');
      audioController.playBase64Audio(responseAudio.base64, responseAudio.mimeType);
    } else if (guidance?.voiceScript) {
      audioController.playFeedbackSound('tap');
      audioController.speak(guidance.voiceScript, currentLanguage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl rounded-3xl shadow-2xl border-2 overflow-hidden my-auto max-h-[92vh] flex flex-col ${
          highContrast ? 'bg-stone-950 border-amber-400 text-white' : 'bg-white border-stone-300 text-stone-950'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-5 flex items-center justify-between gap-3 shrink-0 ${
            highContrast
              ? 'bg-stone-900 border-b-2 border-amber-400 text-white'
              : 'bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-stone-950/70 border border-white/50 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg font-serif">
                {t.aiGuidanceTitle}
              </h3>
              <p className="text-xs text-amber-200 font-bold">
                {t.aiGuidanceSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {guidance?.voiceScript && (
              <button
                onClick={handlePlayScript}
                className={`p-2.5 min-w-[44px] min-h-[44px] rounded-xl transition-all border-2 flex items-center justify-center ${
                  isSpeaking
                    ? 'bg-rose-700 text-white border-rose-800 animate-pulse'
                    : 'bg-stone-900/60 hover:bg-stone-900/80 border-white/60 text-white'
                }`}
                title={t.readAloud}
                aria-label={t.readAloud}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => {
                audioController.stop();
                audioController.playFeedbackSound('tap');
                onClose();
              }}
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-stone-900/60 hover:bg-stone-900/80 border-2 border-white/60 text-white flex items-center justify-center"
              title={t.close}
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full border-4 border-amber-600 border-t-transparent animate-spin" />
              <p className="text-base font-black text-stone-900 dark:text-white">
                {t.aiCheckingRules}
              </p>
              <p className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {t.aiPleaseWait}
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-100 border-2 border-rose-400 text-rose-950 text-sm">
              <p className="font-black">{t.sorrySister}</p>
              <p className="text-xs font-bold mt-1">{errorMessage}</p>
            </div>
          )}

          {guidance && !isLoading && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Warm Greeting & Encouragement */}
              <div
                className={`p-4 rounded-2xl border-2 space-y-1 ${
                  highContrast
                    ? 'bg-stone-900 border-amber-400 text-white'
                    : 'bg-amber-100/90 border-amber-300 text-stone-950'
                }`}
              >
                <p
                  className={`text-base font-black font-serif ${
                    highContrast ? 'text-amber-300' : 'text-amber-950'
                  }`}
                >
                  {guidance.greeting}
                </p>
                <p
                  className={`text-xs sm:text-sm font-bold ${
                    highContrast ? 'text-stone-100' : 'text-stone-900'
                  }`}
                >
                  {guidance.encouragement}
                </p>
              </div>

              {/* Identified Scheme & Benefit */}
              <div
                className={`p-4 rounded-2xl border-2 ${
                  highContrast
                    ? 'bg-stone-900 border-stone-700 text-white'
                    : 'bg-stone-50 border-stone-300 text-stone-950'
                }`}
              >
                <span
                  className={`text-[11px] font-black uppercase tracking-wider block ${
                    highContrast ? 'text-amber-300' : 'text-amber-950'
                  }`}
                >
                  {t.schemeLabel}
                </span>
                <h4
                  className={`text-lg font-black font-serif mt-0.5 ${
                    highContrast ? 'text-white' : 'text-stone-950'
                  }`}
                >
                  {guidance.identifiedScheme}
                </h4>
                <div
                  className={`mt-2 text-sm sm:text-base font-black px-3.5 py-1.5 rounded-xl border-2 inline-block ${
                    highContrast
                      ? 'bg-amber-400 text-stone-950 border-amber-300'
                      : 'bg-emerald-100 text-emerald-950 border-emerald-400'
                  }`}
                >
                  💰 {guidance.cashBenefit}
                </div>
                <p
                  className={`text-xs sm:text-sm font-bold mt-2.5 leading-relaxed ${
                    highContrast ? 'text-stone-100' : 'text-stone-900'
                  }`}
                >
                  {guidance.schemeSummary}
                </p>

                {onSelectSchemeById && (
                  <button
                    onClick={() => {
                      audioController.playFeedbackSound('tap');
                      const sName = (guidance.identifiedScheme || '').toLowerCase();
                      const targetId =
                        guidance.matchedSchemeId ||
                        (sName.includes('सिलाई') || sName.includes('vishwakarma') || sName.includes('தையல்') || sName.includes('ಕುಟ್ಟು') || sName.includes('ಹೊಲಿಗೆ')
                          ? 'pm_vishwakarma'
                          : sName.includes('sukanya') || sName.includes('सुकन्या') || sName.includes('மகள்') || sName.includes('ಹೆಣ್ಣು')
                          ? 'sukanya_samriddhi'
                          : sName.includes('lakhpati') || sName.includes('लखपति') || sName.includes('சுய உதவி')
                          ? 'lakhpati_didi'
                          : sName.includes('ujjwala') || sName.includes('उज्ज्वला') || sName.includes('எரிவாயு') || sName.includes('ಗ್ಯಾಸ್')
                          ? 'pm_ujjwala'
                          : sName.includes('ladli') || sName.includes('लाडली')
                          ? 'ladli_bahna'
                          : 'pmmvy');
                      onSelectSchemeById(targetId);
                      onClose();
                    }}
                    className={`mt-3.5 w-full py-3 px-4 min-h-[44px] rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer border-2 ${
                      highContrast
                        ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
                        : 'bg-amber-700 hover:bg-amber-800 text-white border-amber-900'
                    }`}
                  >
                    <span>{t.viewDetails}</span>
                    <ArrowRight className="w-4 h-4 font-bold" />
                  </button>
                )}
              </div>

              {/* Eligibility Check Bullets */}
              {guidance.eligibilityCheck && guidance.eligibilityCheck.length > 0 && (
                <div
                  className={`p-4 rounded-2xl border-2 shadow-xs ${
                    highContrast
                      ? 'bg-stone-900 border-stone-700 text-white'
                      : 'bg-white border-stone-300 text-stone-950'
                  }`}
                >
                  <h5
                    className={`text-xs font-black uppercase tracking-wider mb-2.5 ${
                      highContrast ? 'text-amber-300' : 'text-stone-950'
                    }`}
                  >
                    ✅ {t.whoIsEligible}
                  </h5>
                  <div className="space-y-2">
                    {guidance.eligibilityCheck.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm font-bold ${
                          highContrast ? 'text-stone-100' : 'text-stone-900'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 font-black" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Documents */}
              {guidance.requiredDocuments && guidance.requiredDocuments.length > 0 && (
                <div
                  className={`p-4 rounded-2xl border-2 shadow-xs ${
                    highContrast
                      ? 'bg-stone-900 border-stone-700 text-white'
                      : 'bg-white border-stone-300 text-stone-950'
                  }`}
                >
                  <h5
                    className={`text-xs font-black uppercase tracking-wider mb-2.5 ${
                      highContrast ? 'text-amber-300' : 'text-stone-950'
                    }`}
                  >
                    📄 {t.requiredDocs}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {guidance.requiredDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border-2 text-xs ${
                          highContrast
                            ? 'bg-stone-800 border-stone-700 text-white'
                            : 'bg-stone-50 border-stone-300 text-stone-950'
                        }`}
                      >
                        <p className="font-black text-sm">{doc.name}</p>
                        <p
                          className={`text-xs font-bold mt-1 ${
                            highContrast ? 'text-stone-300' : 'text-stone-700'
                          }`}
                        >
                          {doc.simpleDesc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Where to go & What to say */}
              {guidance.whereToGo && (
                <div
                  className={`p-4 rounded-2xl border-2 space-y-2 ${
                    highContrast
                      ? 'bg-stone-900 border-emerald-400 text-white'
                      : 'bg-emerald-100/90 border-emerald-400 text-emerald-950'
                  }`}
                >
                  <h5 className="text-xs font-black uppercase tracking-wider">
                    📍 {t.whereToGo}
                  </h5>
                  <p
                    className={`text-xs sm:text-sm font-black flex items-center gap-1.5 ${
                      highContrast ? 'text-emerald-300' : 'text-emerald-950'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{guidance.whereToGo.primaryPlace} ({guidance.whereToGo.secondaryPlace})</span>
                  </p>
                  <div
                    className={`mt-2 p-3.5 rounded-xl border-2 text-xs leading-relaxed ${
                      highContrast
                        ? 'bg-stone-950 border-emerald-400 text-white'
                        : 'bg-white border-emerald-300 text-stone-950 font-bold'
                    }`}
                  >
                    <strong className="font-black">{t.whatToSayAtOffice}:</strong> "{guidance.whereToGo.whatToSay}"
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Bar at Bottom */}
        <div
          className={`p-3.5 sm:p-4 border-t-2 shrink-0 ${
            highContrast ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-300'
          }`}
        >
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder={t.askMorePlaceholder}
              className={`flex-1 px-4 py-2.5 min-h-[44px] text-xs sm:text-sm rounded-xl border-2 font-bold focus:outline-none focus:ring-4 focus:ring-amber-500 shadow-xs ${
                highContrast
                  ? 'bg-stone-950 border-amber-400 text-white placeholder:text-stone-400'
                  : 'bg-white border-stone-400 text-stone-950 placeholder:text-stone-600'
              }`}
            />
            <button
              type="submit"
              disabled={!queryInput.trim() || isLoading}
              className={`px-5 py-2.5 min-h-[44px] rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors border-2 ${
                highContrast
                  ? 'bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 border-amber-300'
                  : 'bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white border-amber-900'
              }`}
            >
              <span>{t.askButton}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
