import React from 'react';
import { Volume2, ArrowRight, Baby, Scissors, PiggyBank, Flame, Users, Coins, CheckCircle2, Sparkles } from 'lucide-react';
import { Scheme, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { audioController } from '../utils/audio';

interface SchemeCardProps {
  scheme: Scheme;
  currentLanguage: SupportedLanguage;
  onSelect: (scheme: Scheme) => void;
  isCurrentlyPlaying: boolean;
  highContrast?: boolean;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  currentLanguage,
  onSelect,
  isCurrentlyPlaying,
  highContrast = false,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const renderIcon = () => {
    switch (scheme.iconName) {
      case 'baby':
        return <Baby className="w-8 h-8 text-rose-600" />;
      case 'scissors':
        return <Scissors className="w-8 h-8 text-amber-600" />;
      case 'piggy':
        return <PiggyBank className="w-8 h-8 text-emerald-600" />;
      case 'flame':
        return <Flame className="w-8 h-8 text-orange-600" />;
      case 'users':
        return <Users className="w-8 h-8 text-indigo-600" />;
      case 'coins':
        return <Coins className="w-8 h-8 text-purple-600" />;
      default:
        return <Coins className="w-8 h-8 text-amber-600" />;
    }
  };

  const handleListenAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioController.playFeedbackSound('tap');
    audioController.speak(scheme.shortAudioScript, currentLanguage);
  };

  return (
    <div
      onClick={() => onSelect(scheme)}
      className={`group relative rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md ${
        highContrast
          ? 'bg-stone-900 border-amber-400 text-white hover:border-amber-300'
          : 'bg-white border-stone-300 hover:border-amber-500 text-stone-950'
      }`}
    >
      <div>
        {/* Top Header: Visual Icon + Direct Audio Listen Button */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs border-2 ${
              highContrast
                ? 'bg-stone-800 border-amber-400 text-amber-300'
                : 'bg-amber-100/90 border-amber-300'
            }`}
          >
            {renderIcon()}
          </div>

          <button
            onClick={handleListenAudio}
            className={`flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl text-xs font-black transition-all shadow-xs border-2 cursor-pointer ${
              isCurrentlyPlaying
                ? 'bg-rose-700 text-white border-rose-800 animate-pulse'
                : highContrast
                ? 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-amber-400'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-400'
            }`}
            title={`${t.listenScheme} (Gemini AI Voice)`}
            aria-label={`${t.listenScheme}: ${scheme.title}`}
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>{isCurrentlyPlaying ? t.sakhiSpeaking : t.listenScheme}</span>
            <Sparkles className="w-3 h-3 text-amber-600 animate-spin ml-0.5" />
          </button>
        </div>

        {/* Title */}
        <h3
          className={`text-lg md:text-xl font-black font-serif leading-snug transition-colors ${
            highContrast
              ? 'text-white group-hover:text-amber-300'
              : 'text-stone-950 group-hover:text-amber-900'
          }`}
        >
          {scheme.nativeTitle}
        </h3>

        {/* Tagline */}
        <p
          className={`text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed font-bold ${
            highContrast ? 'text-stone-200' : 'text-stone-800'
          }`}
        >
          {scheme.tagline}
        </p>

        {/* Big Cash / Primary Benefit Callout */}
        <div
          className={`mt-4 px-4 py-3 rounded-2xl border-2 ${
            highContrast
              ? 'bg-stone-950 border-amber-400 text-white'
              : 'bg-amber-50/90 border-amber-300 text-stone-950'
          }`}
        >
          <div
            className={`text-[11px] font-black uppercase tracking-wider ${
              highContrast ? 'text-amber-300' : 'text-amber-900'
            }`}
          >
            {t.whatYouGet}
          </div>
          <div
            className={`text-base sm:text-lg font-black mt-0.5 ${
              highContrast ? 'text-white' : 'text-stone-950'
            }`}
          >
            {scheme.cashBenefit}
          </div>
        </div>

        {/* Document Requirements Snippet */}
        <div
          className={`mt-3 flex items-center gap-1.5 text-xs font-bold ${
            highContrast ? 'text-amber-200' : 'text-stone-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{scheme.documents.length} {t.docsSummaryBadge}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div
        className={`mt-5 pt-3.5 border-t-2 flex items-center justify-between ${
          highContrast ? 'border-stone-800' : 'border-stone-200'
        }`}
      >
        <span
          className={`text-xs font-black ${
            highContrast ? 'text-amber-300' : 'text-stone-950 group-hover:text-amber-900'
          }`}
        >
          {t.viewDetails}
        </span>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border-2 ${
            highContrast
              ? 'bg-amber-400 text-stone-950 border-amber-300'
              : 'bg-stone-900 group-hover:bg-amber-700 text-white border-stone-900 group-hover:border-amber-700'
          }`}
        >
          <ArrowRight className="w-4 h-4 font-bold" />
        </div>
      </div>
    </div>
  );
};
