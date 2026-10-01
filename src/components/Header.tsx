import React, { useState } from 'react';
import { Volume2, VolumeX, Globe, HelpCircle, Sparkles, ChevronDown, Check, Contrast } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';
import { audioController } from '../utils/audio';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  onOpenHelp: () => void;
  onOpenAssistant: () => void;
  speechRate: number;
  onToggleSpeechRate: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  isSpeaking,
  onStopSpeaking,
  onOpenHelp,
  speechRate,
  onToggleSpeechRate,
  highContrast,
  onToggleHighContrast,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage];

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    onLanguageChange(lang);
    setLangMenuOpen(false);
    audioController.playFeedbackSound('tap');
    const selected = LANGUAGES.find((l) => l.id === lang);
    if (selected) {
      audioController.speak(selected.sampleGreeting, lang);
    }
  };

  const handleToggleContrastClick = () => {
    onToggleHighContrast();
    audioController.playFeedbackSound('tap');
    const notice = !highContrast ? t.highContrastMode : t.standardContrastMode;
    audioController.speak(notice, currentLanguage);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        highContrast
          ? 'bg-stone-950 text-white border-b-2 border-amber-400 shadow-lg'
          : 'bg-white border-b-2 border-stone-200 shadow-xs'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm ring-2 ${
              highContrast
                ? 'bg-amber-500 text-stone-950 ring-amber-400 font-black'
                : 'bg-gradient-to-br from-amber-600 to-rose-600 ring-amber-200'
            }`}
          >
            <span className="font-serif text-2xl font-black tracking-tight">स</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1
                className={`text-xl md:text-2xl font-black tracking-tight font-serif ${
                  highContrast ? 'text-white' : 'text-stone-950'
                }`}
              >
                {t.appTitle}
              </h1>
              <span
                className={`hidden sm:inline-block text-xs font-black px-2.5 py-0.5 rounded-full border-2 ${
                  highContrast
                    ? 'bg-amber-400 text-stone-950 border-amber-300'
                    : 'bg-amber-100 text-amber-950 border-amber-400'
                }`}
              >
                {currentLanguage === 'English'
                  ? 'Your Digital Companion'
                  : currentLanguage === 'Tamil'
                  ? 'உங்கள் டிஜிட்டல் தோழி'
                  : currentLanguage === 'Telugu'
                  ? 'మీ డిజిటల్ స్నేహితురాలు'
                  : currentLanguage === 'Kannada'
                  ? 'ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಸಂಗಾತಿ'
                  : 'आपकी डिजिटल साथी'}
              </span>
              <span
                className={`hidden md:inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full border-2 ${
                  highContrast
                    ? 'bg-stone-800 text-amber-300 border-amber-400'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-400 shadow-xs'
                }`}
                title="Powered by Google Gemini Voice"
              >
                <Sparkles className="w-3 h-3 text-amber-600 animate-spin" />
                <span>Gemini Voice</span>
              </span>
            </div>
            <p
              className={`hidden md:block text-xs font-bold line-clamp-1 ${
                highContrast ? 'text-amber-200' : 'text-stone-800'
              }`}
            >
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Speaking indicator & stop button */}
          {isSpeaking && (
            <button
              onClick={() => {
                onStopSpeaking();
                audioController.playFeedbackSound('tap');
              }}
              className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-black rounded-xl bg-rose-700 text-white border-2 border-rose-800 shadow-sm animate-pulse hover:bg-rose-800 transition-colors"
              title={t.stopAudio}
            >
              <VolumeX className="w-4 h-4 text-white" />
              <span className="hidden xs:inline">{t.stopAudio}</span>
            </button>
          )}

          {/* High Contrast / Low-Light Environment Mode Toggle */}
          <button
            onClick={handleToggleContrastClick}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-black rounded-xl transition-all border-2 shadow-xs ${
              highContrast
                ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300 ring-2 ring-amber-400/50'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-300'
            }`}
            title={highContrast ? t.standardContrastMode : t.highContrastMode}
            aria-pressed={highContrast}
            aria-label={highContrast ? t.standardContrastMode : t.highContrastMode}
          >
            <Contrast className={`w-4 h-4 ${highContrast ? 'text-stone-950' : 'text-stone-800'}`} />
            <span className="hidden sm:inline">
              {highContrast ? t.standardContrastMode : t.highContrastMode}
            </span>
          </button>

          {/* Speech Rate Toggle (0.8x Slow vs 1.0x Normal) */}
          <button
            onClick={() => {
              onToggleSpeechRate();
              audioController.playFeedbackSound('tap');
              const nextRateText =
                speechRate < 1
                  ? currentLanguage === 'English'
                    ? 'Normal speed enabled'
                    : 'सामान्य गति'
                  : currentLanguage === 'English'
                  ? 'Slow clear speech enabled'
                  : 'धीमी आवाज़';
              audioController.speak(nextRateText, currentLanguage);
            }}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-black rounded-xl transition-colors border-2 ${
              highContrast
                ? 'bg-stone-900 hover:bg-stone-800 text-stone-100 border-stone-700'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-300'
            }`}
            title={speechRate < 1 ? t.audioSpeedNormal : t.audioSpeedSlow}
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>{speechRate < 1 ? t.audioSpeedSlow : t.audioSpeedNormal}</span>
          </button>

          {/* How to use app audio guide */}
          <button
            onClick={() => {
              onOpenHelp();
              audioController.playFeedbackSound('tap');
            }}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-black rounded-xl transition-colors border-2 ${
              highContrast
                ? 'bg-stone-900 hover:bg-stone-800 text-amber-300 border-amber-400'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-400'
            }`}
            title={t.howToUseApp}
          >
            <HelpCircle className="w-4 h-4 text-amber-800" />
            <span className="hidden sm:inline">
              {currentLanguage === 'English'
                ? 'Help'
                : currentLanguage === 'Tamil'
                ? 'உதவி'
                : currentLanguage === 'Telugu'
                ? 'సహాయం'
                : currentLanguage === 'Kannada'
                ? 'ಸಹಾಯ'
                : 'मदद'}
            </span>
          </button>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] text-sm font-black rounded-xl bg-amber-700 hover:bg-amber-800 text-white shadow-sm transition-colors border-2 border-amber-800 ring-2 ring-amber-500/20"
              aria-label="भाषा चुनें / Select Language"
            >
              <Globe className="w-4 h-4" />
              <span>{LANGUAGES.find((l) => l.id === currentLanguage)?.nativeName}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown Menu */}
            {langMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
                  onClick={() => setLangMenuOpen(false)}
                />
                <div
                  className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 border-2 ${
                    highContrast
                      ? 'bg-stone-900 border-amber-400 text-white'
                      : 'bg-white border-stone-400 text-stone-950'
                  }`}
                >
                  <div
                    className={`px-3 py-2 text-xs font-black border-b ${
                      highContrast
                        ? 'text-amber-300 border-stone-700'
                        : 'text-stone-900 border-stone-200'
                    }`}
                  >
                    अपनी भाषा चुनें / Select Language
                  </div>
                  <div className="py-1 max-h-72 overflow-y-auto space-y-1">
                    {LANGUAGES.map((lang) => {
                      const isSelected = lang.id === currentLanguage;
                      return (
                        <button
                          key={lang.id}
                          onClick={() => handleSelectLanguage(lang.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-colors border-2 min-h-[44px] ${
                            isSelected
                              ? highContrast
                                ? 'bg-amber-400 text-stone-950 font-black border-amber-300'
                                : 'bg-amber-100 text-amber-950 font-black border-amber-400'
                              : highContrast
                              ? 'text-white border-transparent hover:bg-stone-800 font-bold'
                              : 'text-stone-900 border-transparent hover:bg-stone-100 font-bold'
                          }`}
                        >
                          <div>
                            <span className="text-base font-extrabold block">{lang.nativeName}</span>
                            <span
                              className={`text-xs font-semibold ${
                                isSelected
                                  ? highContrast
                                    ? 'text-stone-900'
                                    : 'text-amber-900'
                                  : highContrast
                                  ? 'text-stone-300'
                                  : 'text-stone-600'
                              }`}
                            >
                              {lang.name}
                            </span>
                          </div>
                          {isSelected && (
                            <Check
                              className={`w-5 h-5 font-black ${
                                highContrast ? 'text-stone-950' : 'text-amber-800'
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
