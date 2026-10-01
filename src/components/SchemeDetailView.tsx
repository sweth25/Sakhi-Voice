import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Share2,
  Printer,
  ChevronRight,
  Check,
  Building2,
  UserCheck,
  CreditCard,
  PhoneCall,
} from 'lucide-react';
import { Scheme, SupportedLanguage } from '../types';
import { getSchemeInLanguage } from '../data/localizedSchemes';
import { TRANSLATIONS } from '../data/translations';
import { audioController } from '../utils/audio';

interface SchemeDetailViewProps {
  scheme: Scheme;
  currentLanguage: SupportedLanguage;
  onClose: () => void;
  onOpenSlipModal: (scheme: Scheme, checkedDocs: string[]) => void;
  isSpeaking: boolean;
  highContrast?: boolean;
}

export const SchemeDetailView: React.FC<SchemeDetailViewProps> = ({
  scheme: rawScheme,
  currentLanguage,
  onClose,
  onOpenSlipModal,
  isSpeaking,
  highContrast = false,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  // Ensure the scheme is in the currently selected language
  const scheme = getSchemeInLanguage(rawScheme, currentLanguage);

  // Active step / tab inside the scheme detail
  const [activeTab, setActiveTab] = useState<'benefit' | 'eligibility' | 'documents' | 'steps' | 'counterSpeech'>('benefit');

  // Interactive user checklist of documents they possess
  const [checkedDocs, setCheckedDocs] = useState<string[]>([]);
  // Eligibility answers
  const [eligibilityAnswers, setEligibilityAnswers] = useState<Record<number, boolean>>({});

  const handleToggleDoc = (docId: string, docName: string) => {
    audioController.playFeedbackSound('tap');
    setCheckedDocs((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    );
  };

  const handleAnswerEligibility = (index: number, answer: boolean) => {
    audioController.playFeedbackSound('tap');
    const newAnswers = { ...eligibilityAnswers, [index]: answer };
    setEligibilityAnswers(newAnswers);

    // If all answered positively, speak congratulations!
    const allAnswered = scheme.eligibilityQuestions.every((_, i) => newAnswers[i] === true);
    if (allAnswered) {
      audioController.playFeedbackSound('success');
      audioController.speak(t.eligibleBanner, currentLanguage);
    }
  };

  const handlePlayCounterSpeech = () => {
    audioController.playFeedbackSound('tap');
    audioController.speak(scheme.counterAudioScript, currentLanguage);
  };

  const handlePlayDocExplanation = (docName: string, desc: string, howToGet: string) => {
    audioController.playFeedbackSound('tap');
    const speechText = `${docName}। ${desc}। ${t.ifNotHave} ${howToGet}`;
    audioController.speak(speechText, currentLanguage);
  };

  const allEligible =
    scheme.eligibilityQuestions.length > 0 &&
    scheme.eligibilityQuestions.every((_, i) => eligibilityAnswers[i] === true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-3xl rounded-3xl shadow-2xl border-2 overflow-hidden my-auto max-h-[95vh] flex flex-col ${
          highContrast ? 'bg-stone-950 border-amber-400 text-white' : 'bg-white border-stone-300 text-stone-950'
        }`}
      >
        {/* Sticky Top Header */}
        <div
          className={`p-4 sm:p-6 flex items-start justify-between gap-3 shrink-0 ${
            highContrast
              ? 'bg-stone-900 border-b-2 border-amber-400 text-white'
              : 'bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 text-white'
          }`}
        >
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-stone-950/70 border border-white/50 text-white text-xs font-black uppercase tracking-wider mb-2">
              {scheme.code}
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif leading-snug">
              {scheme.nativeTitle}
            </h2>
            <p className="text-sm font-black text-amber-200 mt-1">
              {scheme.cashBenefit}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Listen Button */}
            <button
              onClick={() => {
                audioController.playFeedbackSound('tap');
                audioController.speak(scheme.shortAudioScript, currentLanguage);
              }}
              className={`px-3.5 py-2 min-h-[44px] rounded-2xl transition-all shadow-xs border-2 flex items-center gap-1.5 cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-700 text-white border-rose-800 animate-pulse'
                  : 'bg-stone-900/80 hover:bg-stone-900 border-white/60 text-white'
              }`}
              title={`${t.listenScheme} (Gemini Voice)`}
              aria-label={t.listenScheme}
            >
              <Volume2 className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-black hidden sm:inline">{t.listenScheme}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                audioController.stop();
                audioController.playFeedbackSound('tap');
                onClose();
              }}
              className="p-3 min-w-[44px] min-h-[44px] rounded-2xl bg-stone-900/60 hover:bg-stone-900/80 border-2 border-white/60 text-white transition-colors flex items-center justify-center"
              title={t.close}
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tactile Tab Navigation with WCAG AAA Contrast */}
        <div
          className={`flex items-center gap-2 p-2.5 border-b-2 overflow-x-auto shrink-0 scrollbar-none ${
            highContrast ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-300'
          }`}
        >
          <button
            onClick={() => {
              setActiveTab('benefit');
              audioController.playFeedbackSound('tap');
              audioController.speak(scheme.tagline + '। ' + scheme.cashBenefit, currentLanguage);
            }}
            className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
              activeTab === 'benefit'
                ? highContrast
                  ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md'
                  : 'bg-stone-950 text-white border-stone-950 shadow-md'
                : highContrast
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-100 border-stone-700'
                : 'bg-white hover:bg-stone-200 text-stone-950 border-stone-300'
            }`}
          >
            <span>💰 {t.whatYouGet}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('eligibility');
              audioController.playFeedbackSound('tap');
            }}
            className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
              activeTab === 'eligibility'
                ? highContrast
                  ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md'
                  : 'bg-stone-950 text-white border-stone-950 shadow-md'
                : highContrast
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-100 border-stone-700'
                : 'bg-white hover:bg-stone-200 text-stone-950 border-stone-300'
            }`}
          >
            <span>✅ {t.whoIsEligible}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('documents');
              audioController.playFeedbackSound('tap');
            }}
            className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
              activeTab === 'documents'
                ? highContrast
                  ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md'
                  : 'bg-stone-950 text-white border-stone-950 shadow-md'
                : highContrast
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-100 border-stone-700'
                : 'bg-white hover:bg-stone-200 text-stone-950 border-stone-300'
            }`}
          >
            <span>📄 {t.requiredDocs}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('steps');
              audioController.playFeedbackSound('tap');
            }}
            className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
              activeTab === 'steps'
                ? highContrast
                  ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md'
                  : 'bg-stone-950 text-white border-stone-950 shadow-md'
                : highContrast
                ? 'bg-stone-800 hover:bg-stone-700 text-stone-100 border-stone-700'
                : 'bg-white hover:bg-stone-200 text-stone-950 border-stone-300'
            }`}
          >
            <span>🚶 {t.whereToGo}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('counterSpeech');
              audioController.playFeedbackSound('tap');
            }}
            className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
              activeTab === 'counterSpeech'
                ? 'bg-emerald-700 text-white border-emerald-800 shadow-md'
                : 'text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border-emerald-400'
            }`}
          >
            <span>📢 {t.whatToSayAtOffice}</span>
          </button>
        </div>

        {/* Scrollable Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: What You Get (Benefit) */}
          {activeTab === 'benefit' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div
                className={`p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center gap-4 ${
                  highContrast
                    ? 'bg-stone-900 border-amber-400 text-white'
                    : 'bg-amber-100/90 border-amber-400 text-amber-950'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border-2 ${
                    highContrast
                      ? 'bg-amber-400 text-stone-950 border-amber-300 font-black'
                      : 'bg-amber-700 text-white border-amber-800'
                  }`}
                >
                  <CreditCard className="w-8 h-8" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h4
                    className={`text-xs font-black uppercase tracking-wider ${
                      highContrast ? 'text-amber-300' : 'text-amber-950'
                    }`}
                  >
                    {t.primaryBenefit}
                  </h4>
                  <p
                    className={`text-xl sm:text-2xl font-black mt-0.5 ${
                      highContrast ? 'text-white' : 'text-stone-950'
                    }`}
                  >
                    {scheme.cashBenefit}
                  </p>
                  <p
                    className={`text-xs sm:text-sm font-bold mt-1 ${
                      highContrast ? 'text-stone-200' : 'text-stone-800'
                    }`}
                  >
                    {scheme.benefitType}
                  </p>
                </div>
              </div>

              {/* Tagline / Overview */}
              <div
                className={`p-5 rounded-2xl border-2 shadow-xs ${
                  highContrast
                    ? 'bg-stone-900 border-stone-700 text-white'
                    : 'bg-white border-stone-300 text-stone-950'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className={`text-sm font-black ${
                      highContrast ? 'text-amber-300' : 'text-stone-950'
                    }`}
                  >
                    {t.schemePurpose}
                  </h4>
                  <button
                    onClick={() => {
                      audioController.playFeedbackSound('tap');
                      audioController.speak(scheme.tagline, currentLanguage);
                    }}
                    className={`text-xs font-black flex items-center gap-1 px-3 py-1.5 min-h-[44px] rounded-xl border-2 ${
                      highContrast
                        ? 'bg-stone-800 text-amber-300 border-amber-400'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-400'
                    }`}
                  >
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>{t.listenScheme}</span>
                  </button>
                </div>
                <p
                  className={`text-sm leading-relaxed font-bold ${
                    highContrast ? 'text-stone-100' : 'text-stone-900'
                  }`}
                >
                  {scheme.tagline}
                </p>
              </div>

              {/* Official Helpline Info */}
              <div
                className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-2 ${
                  highContrast
                    ? 'bg-stone-900 border-stone-700 text-stone-100'
                    : 'bg-stone-100 border-stone-300 text-stone-950'
                }`}
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
                  <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.officialHelpline}: <strong>{scheme.helpline}</strong></span>
                </div>
                <span className="text-xs font-bold font-mono hidden sm:inline opacity-80">
                  {scheme.officialPortal}
                </span>
              </div>

              {/* Next CTA */}
              <button
                onClick={() => {
                  setActiveTab('eligibility');
                  audioController.playFeedbackSound('tap');
                }}
                className={`w-full py-4 px-4 min-h-[48px] rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-colors border-2 ${
                  highContrast
                    ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
                    : 'bg-stone-950 hover:bg-stone-800 text-white border-stone-950'
                }`}
              >
                <span>{t.nextEligibility}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 2: Eligibility Check */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-base sm:text-lg font-black font-serif ${
                      highContrast ? 'text-white' : 'text-stone-950'
                    }`}
                  >
                    {t.whoIsEligible}
                  </h3>
                  <p
                    className={`text-xs font-bold ${
                      highContrast ? 'text-stone-300' : 'text-stone-800'
                    }`}
                  >
                    {t.eligibilitySubtitle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const qTexts = scheme.eligibilityQuestions.map((q) => q.question).join('। ');
                    audioController.playFeedbackSound('tap');
                    audioController.speak(qTexts, currentLanguage);
                  }}
                  className={`p-2.5 min-h-[44px] rounded-xl text-xs font-black flex items-center gap-1.5 border-2 ${
                    highContrast
                      ? 'bg-stone-800 text-amber-300 border-amber-400'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-400'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.listenQuestions}</span>
                </button>
              </div>

              <div className="space-y-3">
                {scheme.eligibilityQuestions.map((q, idx) => {
                  const currentAnswer = eligibilityAnswers[idx];
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border-2 space-y-3 ${
                        highContrast
                          ? 'bg-stone-900 border-stone-700 text-white'
                          : 'bg-stone-50 border-stone-300 text-stone-950'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p
                            className={`text-sm sm:text-base font-black ${
                              highContrast ? 'text-white' : 'text-stone-950'
                            }`}
                          >
                            {idx + 1}. {q.question}
                          </p>
                          <p
                            className={`text-xs font-bold mt-1 ${
                              highContrast ? 'text-amber-200' : 'text-stone-800'
                            }`}
                          >
                            {q.helperText}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            audioController.playFeedbackSound('tap');
                            audioController.speak(q.question, currentLanguage);
                          }}
                          className={`p-2 min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center ${
                            highContrast
                              ? 'text-amber-300 border-stone-700 hover:bg-stone-800'
                              : 'text-stone-700 border-stone-300 hover:bg-stone-200'
                          }`}
                          title={t.listenQuestions}
                        >
                          <Volume2 className="w-4 h-4 text-amber-700" />
                        </button>
                      </div>

                      {/* Yes / No Buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleAnswerEligibility(idx, true)}
                          className={`flex-1 py-2.5 px-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all border-2 ${
                            currentAnswer === true
                              ? 'bg-emerald-700 text-white shadow-md ring-4 ring-emerald-300 border-emerald-800'
                              : highContrast
                              ? 'bg-stone-800 hover:bg-stone-700 text-white border-stone-600'
                              : 'bg-white hover:bg-emerald-50 text-stone-950 border-stone-400'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          <span>{t.yes}</span>
                        </button>
                        <button
                          onClick={() => handleAnswerEligibility(idx, false)}
                          className={`flex-1 py-2.5 px-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all border-2 ${
                            currentAnswer === false
                              ? 'bg-rose-700 text-white shadow-md ring-4 ring-rose-300 border-rose-800'
                              : highContrast
                              ? 'bg-stone-800 hover:bg-stone-700 text-white border-stone-600'
                              : 'bg-white hover:bg-rose-50 text-stone-950 border-stone-400'
                          }`}
                        >
                          <X className="w-4 h-4" />
                          <span>{t.no}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Eligibility Result Banner */}
              {allEligible && (
                <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-500 flex items-center gap-3 text-emerald-950 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="w-7 h-7 text-emerald-700 shrink-0 font-black" />
                  <div className="text-xs sm:text-sm font-black leading-snug">
                    {t.eligibleBanner}
                  </div>
                </div>
              )}

              {/* Next CTA */}
              <button
                onClick={() => {
                  setActiveTab('documents');
                  audioController.playFeedbackSound('tap');
                }}
                className={`w-full py-4 px-4 min-h-[48px] rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-colors border-2 ${
                  highContrast
                    ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
                    : 'bg-stone-950 hover:bg-stone-800 text-white border-stone-950'
                }`}
              >
                <span>{t.nextDocs}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 3: Visual Document Checklist */}
          {activeTab === 'documents' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-base sm:text-lg font-black font-serif ${
                      highContrast ? 'text-white' : 'text-stone-950'
                    }`}
                  >
                    {t.requiredDocs}
                  </h3>
                  <p
                    className={`text-xs font-bold ${
                      highContrast ? 'text-stone-300' : 'text-stone-800'
                    }`}
                  >
                    {t.docsSubtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scheme.documents.map((doc) => {
                  const isChecked = checkedDocs.includes(doc.id);
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isChecked
                          ? 'bg-emerald-100/90 border-emerald-500 ring-2 ring-emerald-300 text-emerald-950'
                          : highContrast
                          ? 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-white'
                          : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-950 shadow-xs'
                      }`}
                      onClick={() => handleToggleDoc(doc.id, doc.name)}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-colors ${
                                isChecked
                                  ? 'bg-emerald-700 border-emerald-800 text-white'
                                  : 'bg-white border-stone-400'
                              }`}
                            >
                              {isChecked && <Check className="w-5 h-5 font-black text-white" />}
                            </div>
                            <h4
                              className={`text-sm font-black ${
                                isChecked
                                  ? 'text-emerald-950'
                                  : highContrast
                                  ? 'text-white'
                                  : 'text-stone-950'
                              }`}
                            >
                              {doc.name}
                            </h4>
                          </div>

                          {/* Listen to document explanation */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayDocExplanation(doc.name, doc.description, doc.howToGet);
                            }}
                            className={`p-2 min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center border ${
                              highContrast
                                ? 'text-amber-300 border-stone-700 hover:bg-stone-800'
                                : 'text-amber-800 border-stone-200 hover:bg-amber-100'
                            }`}
                            title={t.listenScheme}
                          >
                            <Volume2 className="w-4 h-4 text-amber-700" />
                          </button>
                        </div>

                        <p
                          className={`text-xs font-bold mt-2.5 leading-relaxed ${
                            isChecked
                              ? 'text-emerald-950'
                              : highContrast
                              ? 'text-stone-200'
                              : 'text-stone-800'
                          }`}
                        >
                          {doc.description}
                        </p>

                        <div className="mt-3 pt-2 border-t border-stone-200 text-xs font-bold text-amber-950 bg-amber-100 p-2.5 rounded-xl border border-amber-300">
                          <strong>{t.ifNotHave}</strong> {doc.howToGet}
                        </div>
                      </div>

                      <div className="mt-3 text-xs font-black text-stone-800">
                        {isChecked ? t.readyWithYou : t.tapToTick}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Next CTA */}
              <button
                onClick={() => {
                  setActiveTab('steps');
                  audioController.playFeedbackSound('tap');
                }}
                className={`w-full py-4 px-4 min-h-[48px] rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-colors border-2 ${
                  highContrast
                    ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
                    : 'bg-stone-950 hover:bg-stone-800 text-white border-stone-950'
                }`}
              >
                <span>{t.nextSteps}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 4: Steps & Where to Go in the Village */}
          {activeTab === 'steps' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className={`text-base sm:text-lg font-black font-serif ${
                      highContrast ? 'text-white' : 'text-stone-950'
                    }`}
                  >
                    {t.whereToGo}
                  </h3>
                  <p
                    className={`text-xs font-bold ${
                      highContrast ? 'text-stone-300' : 'text-stone-800'
                    }`}
                  >
                    {t.stepsSubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {scheme.steps.map((st) => (
                  <div
                    key={st.stepNumber}
                    className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 ${
                      highContrast
                        ? 'bg-stone-900 border-stone-700 text-white'
                        : 'bg-stone-50 border-stone-300 text-stone-950'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-amber-700 text-white text-sm font-black flex items-center justify-center shrink-0 mt-0.5 border-2 border-amber-800">
                      {st.stepNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm sm:text-base font-black ${
                            highContrast ? 'text-white' : 'text-stone-950'
                          }`}
                        >
                          {st.title}
                        </h4>
                        <button
                          onClick={() => {
                            audioController.playFeedbackSound('tap');
                            audioController.speak(`${st.stepNumber}. ${st.title}। ${st.description}`, currentLanguage);
                          }}
                          className={`p-2 min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center ${
                            highContrast
                              ? 'text-amber-300 border-stone-700 hover:bg-stone-800'
                              : 'text-amber-800 border-stone-200 hover:bg-amber-100'
                          }`}
                        >
                          <Volume2 className="w-4 h-4 text-amber-700" />
                        </button>
                      </div>
                      <p
                        className={`text-xs sm:text-sm font-bold mt-1 leading-relaxed ${
                          highContrast ? 'text-stone-200' : 'text-stone-800'
                        }`}
                      >
                        {st.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-black">
                        <span
                          className={`px-3 py-1.5 rounded-xl border-2 flex items-center gap-1.5 ${
                            highContrast
                              ? 'bg-stone-800 border-stone-700 text-amber-300'
                              : 'bg-white border-stone-300 text-stone-950'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>{t.villageCenter}: {st.actionPlace}</span>
                        </span>
                        <span
                          className={`px-3 py-1.5 rounded-xl border-2 flex items-center gap-1.5 ${
                            highContrast
                              ? 'bg-stone-800 border-stone-700 text-emerald-300'
                              : 'bg-white border-stone-300 text-stone-950'
                          }`}
                        >
                          <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{t.whoToMeet}: {st.personToMeet}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next CTA */}
              <button
                onClick={() => {
                  setActiveTab('counterSpeech');
                  audioController.playFeedbackSound('tap');
                }}
                className="w-full py-4 px-4 min-h-[48px] rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-colors border-2 border-emerald-800"
              >
                <span>{t.nextCounterSpeech}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 5: Counter Speech Card (The ultimate real-world barrier breaker) */}
          {activeTab === 'counterSpeech' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div
                className={`p-5 rounded-3xl border-3 shadow-md ${
                  highContrast
                    ? 'bg-stone-900 border-emerald-400 text-white'
                    : 'bg-gradient-to-br from-emerald-100 via-teal-50 to-white border-emerald-500'
                }`}
              >
                <div className="flex items-center gap-2 text-emerald-950 font-black text-sm mb-2">
                  <Sparkles className="w-5 h-5 text-emerald-700 font-bold" />
                  <span>{t.speakWithConfidence}</span>
                </div>

                <p
                  className={`text-xs font-bold mb-4 leading-relaxed ${
                    highContrast ? 'text-stone-200' : 'text-stone-800'
                  }`}
                >
                  {t.counterSpeechDescription}
                </p>

                {/* The Exact Spoken Message Box */}
                <div
                  className={`p-4 rounded-2xl border-2 text-base md:text-lg font-serif font-black leading-relaxed shadow-inner ${
                    highContrast
                      ? 'bg-stone-950 border-emerald-400 text-white'
                      : 'bg-white border-emerald-400 text-stone-950'
                  }`}
                >
                  "{scheme.counterAudioScript}"
                </div>

                {/* Big Green Play Button */}
                <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handlePlayCounterSpeech}
                    className="w-full sm:flex-1 py-4 px-6 min-h-[56px] rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base flex items-center justify-center gap-3 shadow-xl ring-4 ring-emerald-300 active:scale-95 transition-all border-2 border-emerald-800"
                  >
                    <Volume2 className="w-6 h-6 animate-pulse" />
                    <span>{t.sayToDidiButton}</span>
                  </button>
                </div>

                <p className="text-center text-xs font-black text-emerald-950 mt-3">
                  🔊 {t.audioPlayingNotice}
                </p>
              </div>

              {/* Generate Assistance Slip Button */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenSlipModal(scheme, checkedDocs)}
                  className={`w-full py-4 px-4 min-h-[48px] rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-colors border-2 ${
                    highContrast
                      ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
                      : 'bg-stone-950 hover:bg-stone-800 text-white border-stone-950'
                  }`}
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>{t.createSlipButton}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions with WCAG AA/AAA Buttons */}
        <div
          className={`p-3.5 border-t-2 flex items-center justify-between gap-2 shrink-0 ${
            highContrast ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-300'
          }`}
        >
          <button
            onClick={() => onOpenSlipModal(scheme, checkedDocs)}
            className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-black border-2 transition-colors ${
              highContrast
                ? 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-amber-400'
                : 'bg-stone-200 hover:bg-stone-300 text-stone-950 border-stone-300'
            }`}
          >
            <Printer className="w-4 h-4 text-stone-700" />
            <span>{t.makeSlip}</span>
          </button>

          <button
            onClick={() => {
              audioController.stop();
              audioController.playFeedbackSound('tap');
              onClose();
            }}
            className={`px-5 py-2.5 min-h-[44px] rounded-xl text-xs font-black transition-colors border-2 ${
              highContrast
                ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
                : 'bg-stone-900 hover:bg-stone-800 text-white border-stone-900'
            }`}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
