import React, { useState } from 'react';
import { X, Mic, Volume2, Sparkles, ArrowRight, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { audioController } from '../utils/audio';

interface HelpWalkthroughModalProps {
  currentLanguage: SupportedLanguage;
  onClose: () => void;
  highContrast?: boolean;
}

export const HelpWalkthroughModal: React.FC<HelpWalkthroughModalProps> = ({
  currentLanguage,
  onClose,
  highContrast = false,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [slide, setSlide] = useState(0);

  const SLIDE_ICONS = [
    <Mic className="w-12 h-12 text-rose-500 font-black" />,
    <Volume2 className="w-12 h-12 text-amber-500 font-black" />,
    <Sparkles className="w-12 h-12 text-emerald-500 font-black" />,
  ];

  const slides = t.walkthroughSlides || [];
  const currentSlide = slides[slide] || {
    title: t.howToUseApp,
    desc: '',
    audioScript: '',
  };

  const handlePlaySlideAudio = () => {
    audioController.playFeedbackSound('tap');
    if (currentSlide.audioScript) {
      audioController.speak(currentSlide.audioScript, currentLanguage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-3xl shadow-2xl border-2 overflow-hidden my-auto flex flex-col ${
          highContrast ? 'bg-stone-950 border-amber-400 text-white' : 'bg-white border-stone-400 text-stone-950'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 flex items-center justify-between border-b-2 ${
            highContrast ? 'bg-stone-900 border-amber-400 text-white' : 'bg-stone-950 border-stone-800 text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400 font-black" />
            <h3 className="font-black text-base sm:text-lg font-serif">
              {t.howToUseApp}
            </h3>
          </div>
          <button
            onClick={() => {
              audioController.stop();
              audioController.playFeedbackSound('tap');
              onClose();
            }}
            className="p-2 min-w-[44px] min-h-[44px] rounded-xl bg-stone-800 hover:bg-stone-700 border-2 border-white/60 text-white flex items-center justify-center font-bold"
            title={t.close}
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="p-6 text-center space-y-4">
          <div
            className={`w-20 h-20 mx-auto rounded-3xl border-2 flex items-center justify-center shadow-xs ${
              highContrast ? 'bg-stone-900 border-amber-400' : 'bg-amber-100 border-amber-300'
            }`}
          >
            {SLIDE_ICONS[slide] || SLIDE_ICONS[0]}
          </div>

          <h4
            className={`text-xl font-black font-serif ${
              highContrast ? 'text-white' : 'text-stone-950'
            }`}
          >
            {currentSlide.title}
          </h4>

          <p
            className={`text-sm sm:text-base leading-relaxed font-bold ${
              highContrast ? 'text-stone-200' : 'text-stone-900'
            }`}
          >
            {currentSlide.desc}
          </p>

          {/* Audio Listen Button */}
          <div className="pt-2">
            <button
              onClick={handlePlaySlideAudio}
              className={`inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full font-black text-xs sm:text-sm border-2 transition-all shadow-xs ${
                highContrast
                  ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-400'
              }`}
            >
              <Volume2 className="w-4 h-4 text-amber-700 font-black" />
              <span>{t.walkthroughListen}</span>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-3 rounded-full transition-all border ${
                  idx === slide
                    ? highContrast
                      ? 'bg-amber-400 border-amber-300 w-8'
                      : 'bg-amber-700 border-amber-900 w-8'
                    : highContrast
                    ? 'bg-stone-800 border-stone-700 w-3'
                    : 'bg-stone-300 border-stone-400 w-3'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div
          className={`p-4 border-t-2 flex items-center justify-between gap-3 ${
            highContrast ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-300'
          }`}
        >
          <button
            onClick={() => {
              if (slide > 0) {
                setSlide(slide - 1);
                audioController.playFeedbackSound('tap');
              }
            }}
            disabled={slide === 0}
            className={`px-4 py-2.5 min-h-[44px] rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 border-2 transition-colors ${
              slide === 0
                ? 'opacity-40 cursor-not-allowed bg-stone-300 border-stone-300 text-stone-500'
                : highContrast
                ? 'bg-stone-800 hover:bg-stone-700 text-white border-stone-600'
                : 'bg-stone-200 hover:bg-stone-300 text-stone-950 border-stone-400'
            }`}
          >
            <ArrowLeft className="w-4 h-4 font-black" />
            <span>{t.prevButton}</span>
          </button>

          {slide < slides.length - 1 ? (
            <button
              onClick={() => {
                setSlide(slide + 1);
                audioController.playFeedbackSound('tap');
              }}
              className={`px-6 py-2.5 min-h-[44px] rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors border-2 ${
                highContrast
                  ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
                  : 'bg-stone-950 hover:bg-stone-900 text-white border-stone-950'
              }`}
            >
              <span>{t.nextButton}</span>
              <ArrowRight className="w-4 h-4 font-black" />
            </button>
          ) : (
            <button
              onClick={() => {
                audioController.stop();
                audioController.playFeedbackSound('tap');
                onClose();
              }}
              className={`px-6 py-2.5 min-h-[44px] rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors border-2 ${
                highContrast
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-stone-950 border-emerald-300'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-900'
              }`}
            >
              <span>{t.startUsingButton}</span>
              <Check className="w-4 h-4 font-black" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
