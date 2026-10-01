/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Volume2,
  VolumeX,
  MessageCircle,
  HelpCircle,
  RotateCcw,
  Baby,
  Scissors,
  PiggyBank,
  Flame,
  Coins,
  Users,
  Grid,
} from 'lucide-react';
import { Scheme, SupportedLanguage } from './types';
import { getAllSchemesInLanguage } from './data/localizedSchemes';
import { TRANSLATIONS } from './data/translations';
import { audioController } from './utils/audio';
import { Header } from './components/Header';
import { VoiceMicHero } from './components/VoiceMicHero';
import { SchemeCard } from './components/SchemeCard';
import { SchemeDetailView } from './components/SchemeDetailView';
import { AssistanceSlipModal } from './components/AssistanceSlipModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { HelpWalkthroughModal } from './components/HelpWalkthroughModal';

const VALID_LANGUAGES: SupportedLanguage[] = [
  'Tamil',
  'Hindi',
  'English',
  'Telugu',
  'Kannada',
];

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sakhi_preferred_language');
        if (saved && VALID_LANGUAGES.includes(saved as SupportedLanguage)) {
          return saved as SupportedLanguage;
        }
      } catch (e) {
        console.warn('Failed to read language from localStorage', e);
      }
    }
    return 'Hindi';
  });

  // High contrast mode for low-light environments and visual impairments
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sakhi_high_contrast');
        if (saved !== null) {
          return saved === 'true';
        }
        // Match system dark/high contrast preference if set
        if (window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches) {
          return true;
        }
      } catch (e) {
        console.warn('Failed to read high contrast preference', e);
      }
    }
    return false;
  });

  // Persist language to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('sakhi_preferred_language', currentLanguage);
    } catch (e) {
      console.warn('Failed to persist language to localStorage', e);
    }
  }, [currentLanguage]);

  // Persist high contrast mode
  useEffect(() => {
    try {
      localStorage.setItem('sakhi_high_contrast', String(highContrast));
      if (highContrast) {
        document.documentElement.classList.add('high-contrast-mode');
      } else {
        document.documentElement.classList.remove('high-contrast-mode');
      }
    } catch (e) {
      console.warn('Failed to persist high contrast mode', e);
    }
  }, [highContrast]);

  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [slipModalSchemeId, setSlipModalSchemeId] = useState<string | null>(null);
  const [slipCheckedDocs, setSlipCheckedDocs] = useState<string[]>([]);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState('');
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [isProcessingQuery, setIsProcessingQuery] = useState(false);

  // Audio state tracking
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(0.88);
  const [lastSpokenText, setLastSpokenText] = useState('');

  // Category filter for quick zero-reading visual selection
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const t = TRANSLATIONS[currentLanguage];

  // Fetch schemes fully localized for the active language
  const allLocalizedSchemes = getAllSchemesInLanguage(currentLanguage);

  const selectedScheme = selectedSchemeId
    ? allLocalizedSchemes.find((s) => s.id === selectedSchemeId) || null
    : null;

  const slipModalScheme = slipModalSchemeId
    ? allLocalizedSchemes.find((s) => s.id === slipModalSchemeId) || null
    : null;

  // Subscribe to audio state
  useEffect(() => {
    const unsubscribe = audioController.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleHighContrast = () => {
    audioController.playFeedbackSound('tap');
    const nextState = !highContrast;
    setHighContrast(nextState);
    const feedback = nextState ? t.highContrastMode : t.standardContrastMode;
    audioController.speak(feedback, currentLanguage);
  };

  const handleToggleSpeechRate = () => {
    const nextRate = speechRate < 1 ? 1.0 : 0.85;
    setSpeechRate(nextRate);
    audioController.setRate(nextRate);
  };

  const handleStopSpeaking = () => {
    audioController.stop();
  };

  const handleRepeatLastAudio = () => {
    if (lastSpokenText) {
      audioController.playFeedbackSound('tap');
      audioController.speak(lastSpokenText, currentLanguage);
    }
  };

  // When user speaks or types a query in the Hero section
  const handleSearchQuery = (query: string) => {
    setAiInitialQuery(query);
    setAiModalOpen(true);
  };

  const handleOpenSlip = (scheme: Scheme, checkedDocs: string[]) => {
    setSlipModalSchemeId(scheme.id);
    setSlipCheckedDocs(checkedDocs);
  };

  // Filter schemes based on category
  const filteredSchemes =
    selectedCategory === 'all'
      ? allLocalizedSchemes
      : allLocalizedSchemes.filter((s) => s.category === selectedCategory);

  const CATEGORIES = [
    { id: 'all', label: t.categories.all, icon: <Grid className="w-4 h-4 font-black" /> },
    { id: 'maternity', label: t.categories.maternity, icon: <Baby className="w-4 h-4 font-black" /> },
    { id: 'skills', label: t.categories.skills, icon: <Scissors className="w-4 h-4 font-black" /> },
    { id: 'daughter', label: t.categories.daughter, icon: <PiggyBank className="w-4 h-4 font-black" /> },
    { id: 'livelihood', label: t.categories.livelihood, icon: <Users className="w-4 h-4 font-black" /> },
    { id: 'subsidy', label: t.categories.subsidy, icon: <Flame className="w-4 h-4 font-black" /> },
    { id: 'pension', label: t.categories.pension, icon: <Coins className="w-4 h-4 font-black" /> },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-150 ${
        highContrast
          ? 'bg-stone-950 text-white selection:bg-amber-400 selection:text-stone-950'
          : 'bg-amber-50/40 text-stone-950'
      }`}
    >
      {/* Top Accessible Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        isSpeaking={isSpeaking}
        onStopSpeaking={handleStopSpeaking}
        onOpenHelp={() => setHelpModalOpen(true)}
        onOpenAssistant={() => {
          setAiInitialQuery('');
          setAiModalOpen(true);
        }}
        speechRate={speechRate}
        onToggleSpeechRate={handleToggleSpeechRate}
        highContrast={highContrast}
        onToggleHighContrast={handleToggleHighContrast}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8">
        {/* Prominent Voice Mic Hero with zero-barrier audio guidance */}
        <VoiceMicHero
          currentLanguage={currentLanguage}
          onSearchQuery={handleSearchQuery}
          isProcessingQuery={isProcessingQuery}
          highContrast={highContrast}
        />

        {/* Visual Category Filter Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3
              className={`text-base md:text-lg font-black font-serif ${
                highContrast ? 'text-amber-300' : 'text-stone-950'
              }`}
            >
              {t.schemesSectionTitle}
            </h3>
            <span
              className={`text-xs font-black px-2.5 py-1 rounded-lg border-2 ${
                highContrast
                  ? 'bg-stone-900 border-amber-400 text-amber-300'
                  : 'bg-stone-100 border-stone-300 text-stone-900'
              }`}
            >
              {filteredSchemes.length} {t.schemesAvailable}
            </span>
          </div>

          {/* Interactive filter tabs with WCAG AAA touch targets and contrast */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    audioController.playFeedbackSound('tap');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs md:text-sm font-black whitespace-nowrap transition-all border-2 shadow-xs cursor-pointer ${
                    isActive
                      ? highContrast
                        ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md ring-2 ring-white/50'
                        : 'bg-amber-700 text-white border-amber-900 shadow-md ring-2 ring-amber-300'
                      : highContrast
                      ? 'bg-stone-900 hover:bg-stone-800 text-stone-100 border-stone-700'
                      : 'bg-white hover:bg-stone-100 text-stone-900 border-stone-300'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              currentLanguage={currentLanguage}
              onSelect={(s) => {
                setSelectedSchemeId(s.id);
                setLastSpokenText(s.shortAudioScript);
                audioController.playFeedbackSound('tap');
                audioController.speak(s.shortAudioScript, currentLanguage);
              }}
              isCurrentlyPlaying={isSpeaking && lastSpokenText === scheme.shortAudioScript}
              highContrast={highContrast}
            />
          ))}
        </div>

        {/* Anti-Middleman Awareness / Safety Promise with strong contrast */}
        <div
          className={`mb-12 p-5 rounded-3xl border-2 shadow-xs flex flex-col sm:flex-row items-center gap-4 ${
            highContrast
              ? 'bg-stone-900 border-emerald-400 text-white'
              : 'bg-gradient-to-r from-emerald-100 via-teal-100 to-white border-emerald-400 text-emerald-950'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs border-2 ${
              highContrast
                ? 'bg-emerald-400 text-stone-950 border-emerald-300'
                : 'bg-emerald-700 text-white border-emerald-800'
            }`}
          >
            <ShieldCheck className="w-6 h-6 font-black" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4
              className={`text-base font-black font-serif ${
                highContrast ? 'text-emerald-300' : 'text-emerald-950'
              }`}
            >
              {t.safetyNoticeTitle}
            </h4>
            <p
              className={`text-xs sm:text-sm font-bold mt-1 leading-relaxed ${
                highContrast ? 'text-stone-200' : 'text-stone-900'
              }`}
            >
              {t.safetyNoticeBody}
            </p>
          </div>
          <button
            onClick={() => {
              audioController.playFeedbackSound('tap');
              audioController.speak(t.safetyAudioText, currentLanguage);
            }}
            className={`px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-xs transition-colors shrink-0 border-2 cursor-pointer ${
              highContrast
                ? 'bg-emerald-400 hover:bg-emerald-300 text-stone-950 border-emerald-300'
                : 'bg-white hover:bg-emerald-50 text-emerald-950 border-emerald-600'
            }`}
          >
            <Volume2 className="w-4 h-4 font-black" />
            <span>{t.listenSafety}</span>
          </button>
        </div>

        {/* Essential Emergency & Assistance Helpline Directory */}
        <div
          className={`rounded-3xl p-6 border-2 shadow-xs ${
            highContrast ? 'bg-stone-900 border-stone-700 text-white' : 'bg-white border-stone-300 text-stone-950'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <PhoneCall className={`w-5 h-5 font-black ${highContrast ? 'text-amber-400' : 'text-amber-700'}`} />
              <h3
                className={`text-base sm:text-lg font-black font-serif ${
                  highContrast ? 'text-white' : 'text-stone-950'
                }`}
              >
                {t.emergencyHelplines}
              </h3>
            </div>
            <span
              className={`text-xs font-black px-2.5 py-1 rounded-md border ${
                highContrast
                  ? 'bg-stone-950 text-stone-300 border-stone-700'
                  : 'bg-stone-100 text-stone-800 border-stone-300'
              }`}
            >
              {t.helplineFreeCall}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              className={`p-4 rounded-2xl border-2 ${
                highContrast
                  ? 'bg-stone-950 border-rose-500/80 text-white'
                  : 'bg-rose-100/80 border-rose-300 text-rose-950'
              }`}
            >
              <span className={`text-[11px] font-black uppercase tracking-wider block ${highContrast ? 'text-rose-400' : 'text-rose-900'}`}>
                {t.womenHelplineTitle}
              </span>
              <span className={`text-2xl font-black font-mono mt-0.5 block ${highContrast ? 'text-rose-300' : 'text-rose-950'}`}>
                181
              </span>
              <p className={`text-xs font-bold mt-1.5 leading-snug ${highContrast ? 'text-stone-200' : 'text-stone-800'}`}>
                {t.womenHelplineDesc}
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border-2 ${
                highContrast
                  ? 'bg-stone-950 border-amber-500/80 text-white'
                  : 'bg-amber-100/80 border-amber-300 text-amber-950'
              }`}
            >
              <span className={`text-[11px] font-black uppercase tracking-wider block ${highContrast ? 'text-amber-400' : 'text-amber-900'}`}>
                {t.healthHelplineTitle}
              </span>
              <span className={`text-2xl font-black font-mono mt-0.5 block ${highContrast ? 'text-amber-300' : 'text-amber-950'}`}>
                104
              </span>
              <p className={`text-xs font-bold mt-1.5 leading-snug ${highContrast ? 'text-stone-200' : 'text-stone-800'}`}>
                {t.healthHelplineDesc}
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border-2 ${
                highContrast
                  ? 'bg-stone-950 border-emerald-500/80 text-white'
                  : 'bg-emerald-100/80 border-emerald-300 text-emerald-950'
              }`}
            >
              <span className={`text-[11px] font-black uppercase tracking-wider block ${highContrast ? 'text-emerald-400' : 'text-emerald-900'}`}>
                {t.childHelplineTitle}
              </span>
              <span className={`text-2xl font-black font-mono mt-0.5 block ${highContrast ? 'text-emerald-300' : 'text-emerald-950'}`}>
                1098
              </span>
              <p className={`text-xs font-bold mt-1.5 leading-snug ${highContrast ? 'text-stone-200' : 'text-stone-800'}`}>
                {t.childHelplineDesc}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Audio Player Bar when sound is speaking */}
      {isSpeaking && (
        <div
          className={`fixed bottom-4 left-4 right-4 max-w-xl mx-auto z-40 p-4 rounded-2xl shadow-2xl backdrop-blur-md border-2 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200 ${
            highContrast
              ? 'bg-black border-amber-400 text-white'
              : 'bg-stone-950 text-white border-stone-700'
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border animate-pulse ${
                highContrast
                  ? 'bg-amber-400 text-stone-950 border-white'
                  : 'bg-amber-500 text-stone-950 border-amber-300'
              }`}
            >
              <Volume2 className="w-5 h-5 font-black" />
            </div>
            <div className="overflow-hidden">
              <p
                className={`text-xs font-black uppercase tracking-wider ${
                  highContrast ? 'text-amber-300' : 'text-amber-400'
                }`}
              >
                {t.sakhiSpeaking}
              </p>
              <p className="text-xs sm:text-sm font-bold text-stone-100 truncate">
                {lastSpokenText || t.playingInfoAudio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRepeatLastAudio}
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-stone-800 hover:bg-stone-700 border-2 border-stone-600 text-white flex items-center justify-center"
              title={t.repeatAudio}
              aria-label={t.repeatAudio}
            >
              <RotateCcw className="w-4 h-4 font-black" />
            </button>
            <button
              onClick={handleStopSpeaking}
              className="px-4 py-2 min-h-[44px] rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-sm border-2 border-rose-400"
              aria-label={t.stopAudio}
            >
              <VolumeX className="w-4 h-4 font-black" />
              <span>{t.stopAudio}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Ask Sakhi Button for mobile & quick queries */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => {
            setAiInitialQuery('');
            setAiModalOpen(true);
            audioController.playFeedbackSound('tap');
          }}
          className={`flex items-center gap-2 px-5 py-3.5 min-h-[48px] rounded-full font-black text-sm shadow-2xl transition-all cursor-pointer border-2 ${
            highContrast
              ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-white ring-4 ring-black scale-105 active:scale-95'
              : 'bg-gradient-to-r from-amber-700 to-rose-700 hover:from-amber-800 hover:to-rose-800 text-white border-white ring-4 ring-amber-200/80 active:scale-95'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${highContrast ? 'text-stone-950' : 'text-amber-200'}`} />
          <span>{t.askSakhiFloating}</span>
        </button>
      </div>

      {/* Modals */}
      {selectedScheme && (
        <SchemeDetailView
          scheme={selectedScheme}
          currentLanguage={currentLanguage}
          onClose={() => setSelectedSchemeId(null)}
          onOpenSlipModal={handleOpenSlip}
          isSpeaking={isSpeaking}
          highContrast={highContrast}
        />
      )}

      {slipModalScheme && (
        <AssistanceSlipModal
          scheme={slipModalScheme}
          checkedDocIds={slipCheckedDocs}
          currentLanguage={currentLanguage}
          onClose={() => setSlipModalSchemeId(null)}
          highContrast={highContrast}
        />
      )}

      {aiModalOpen && (
        <AiAssistantModal
          currentLanguage={currentLanguage}
          initialQuery={aiInitialQuery}
          activeScheme={selectedScheme}
          onClose={() => {
            setAiModalOpen(false);
            setAiInitialQuery('');
          }}
          onSelectSchemeById={(schemeId) => {
            setSelectedSchemeId(schemeId);
            setAiModalOpen(false);
            setAiInitialQuery('');
          }}
          isSpeaking={isSpeaking}
          highContrast={highContrast}
        />
      )}

      {helpModalOpen && (
        <HelpWalkthroughModal
          currentLanguage={currentLanguage}
          onClose={() => setHelpModalOpen(false)}
          highContrast={highContrast}
        />
      )}

      {/* Persistent Floating Gemini Voice Player when speaking */}
      {isSpeaking && (
        <div className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto z-50 animate-in slide-in-from-bottom duration-300 pointer-events-auto">
          <div
            className={`p-3 sm:p-3.5 rounded-2xl shadow-2xl border-2 flex items-center justify-between gap-3 ${
              highContrast
                ? 'bg-stone-950 border-amber-400 text-white'
                : 'bg-stone-900 border-amber-400 text-white'
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shrink-0 shadow-md">
                <Volume2 className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    Gemini Voice Playing
                  </span>
                  {/* Equalizer animation */}
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-2" />
                    <span
                      className="w-1 bg-rose-400 rounded-full animate-bounce h-3"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-1 bg-amber-400 rounded-full animate-bounce h-1.5"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
                <p className="text-xs text-stone-200 line-clamp-1 font-bold">
                  {audioController.getCurrentPlayingText() || t.audioPlayingNotice}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  audioController.playFeedbackSound('tap');
                  handleToggleSpeechRate();
                }}
                className="px-2.5 py-1.5 min-h-[36px] rounded-lg text-xs font-black bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 cursor-pointer"
                title="Change speed"
              >
                {speechRate < 1 ? '0.85x' : '1.0x'}
              </button>

              <button
                onClick={() => {
                  audioController.playFeedbackSound('tap');
                  handleStopSpeaking();
                }}
                className="flex items-center gap-1 px-3 py-1.5 min-h-[36px] rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
                title={t.stopAudio}
                aria-label={t.stopAudio}
              >
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">{t.stopAudio}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple Accessible Footer with high contrast */}
      <footer
        className={`mt-auto py-8 text-center text-xs border-t-2 ${
          highContrast
            ? 'bg-stone-950 border-stone-800 text-stone-300'
            : 'bg-white border-stone-300 text-stone-700'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-black text-sm">
            {t.footerLine1}
          </p>
          <p className={`text-xs font-bold ${highContrast ? 'text-stone-400' : 'text-stone-600'}`}>
            {t.footerLine2}
          </p>
        </div>
      </footer>
    </div>
  );
}

