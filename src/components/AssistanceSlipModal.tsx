import React, { useState } from 'react';
import { X, Printer, Download, Check, Volume2, Sparkles, QrCode, FileText } from 'lucide-react';
import { Scheme, SupportedLanguage } from '../types';
import { getSchemeInLanguage } from '../data/localizedSchemes';
import { TRANSLATIONS } from '../data/translations';
import { audioController } from '../utils/audio';

interface AssistanceSlipModalProps {
  scheme: Scheme;
  checkedDocIds: string[];
  currentLanguage: SupportedLanguage;
  onClose: () => void;
  highContrast?: boolean;
}

export const AssistanceSlipModal: React.FC<AssistanceSlipModalProps> = ({
  scheme: rawScheme,
  checkedDocIds,
  currentLanguage,
  onClose,
  highContrast = false,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const scheme = getSchemeInLanguage(rawScheme, currentLanguage);
  const [userName, setUserName] = useState('');
  const [villageName, setVillageName] = useState('');
  const [tokenNumber] = useState(() => `SKH-${Math.floor(100000 + Math.random() * 900000)}`);

  const currentDate = new Date().toLocaleDateString(currentLanguage === 'English' ? 'en-IN' : 'hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    audioController.playFeedbackSound('tap');
    window.print();
  };

  const handleReadSlip = () => {
    audioController.playFeedbackSound('tap');
    const spokenText = `${t.slipTitle}। ${tokenNumber}। ${scheme.nativeTitle}। ${
      userName ? `${t.applicantNameLabel}: ${userName}। ` : ''
    }${
      villageName ? `${t.villageLabel}: ${villageName}। ` : ''
    }${t.counterOfficerNotice}`;
    audioController.speak(spokenText, currentLanguage);
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
            <FileText className="w-5 h-5 text-amber-400 font-black" />
            <h3 className="font-black text-base sm:text-lg font-serif">
              {t.slipTitle}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReadSlip}
              className="p-2 min-w-[44px] min-h-[44px] rounded-xl bg-stone-800 hover:bg-stone-700 border-2 border-white/60 text-white flex items-center justify-center font-bold"
              title={t.listenScheme}
              aria-label={t.listenScheme}
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
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
        </div>

        {/* Printable Pass Slip Content */}
        <div
          id="printable-slip"
          className={`p-5 sm:p-6 space-y-4 text-sm ${
            highContrast ? 'bg-black text-white' : 'bg-amber-50/50 text-stone-950'
          }`}
        >
          {/* Subtitle / Counter instruction */}
          <div className={`text-center pb-3 border-b-2 border-dashed ${highContrast ? 'border-stone-700' : 'border-stone-400'}`}>
            <p className={`text-xs font-black uppercase tracking-widest ${highContrast ? 'text-amber-400' : 'text-amber-950'}`}>
              {t.appTitle}
            </p>
            <h2 className="text-xl font-black font-serif mt-0.5">
              {t.slipPassTitle}
            </h2>
            <p className={`text-xs font-bold mt-1 ${highContrast ? 'text-stone-300' : 'text-stone-700'}`}>
              {t.slipPassSubtitle}
            </p>
          </div>

          {/* Token & Date */}
          <div
            className={`flex items-center justify-between p-3.5 rounded-xl border-2 shadow-xs ${
              highContrast ? 'bg-stone-900 border-amber-400 text-white' : 'bg-white border-stone-300 text-stone-950'
            }`}
          >
            <div>
              <span className={`text-[11px] font-black uppercase block ${highContrast ? 'text-amber-300' : 'text-stone-700'}`}>
                {t.tokenLabel}
              </span>
              <span className={`text-lg font-black font-mono tracking-wider ${highContrast ? 'text-amber-400' : 'text-stone-950'}`}>
                {tokenNumber}
              </span>
            </div>
            <div className="text-right">
              <span className={`text-[11px] font-black uppercase block ${highContrast ? 'text-stone-300' : 'text-stone-700'}`}>
                {t.dateLabel}
              </span>
              <span className="text-xs font-black">{currentDate}</span>
            </div>
          </div>

          {/* Scheme Name */}
          <div
            className={`p-3.5 rounded-xl border-2 ${
              highContrast ? 'bg-stone-900 border-stone-700 text-white' : 'bg-amber-100/80 border-amber-300 text-stone-950'
            }`}
          >
            <span className={`text-[11px] font-black uppercase tracking-wider ${highContrast ? 'text-amber-300' : 'text-amber-950'}`}>
              {t.schemesSectionTitle}:
            </span>
            <div className="text-base sm:text-lg font-black mt-0.5">
              {scheme.nativeTitle}
            </div>
            <div
              className={`text-xs sm:text-sm font-black mt-1.5 px-2.5 py-1 rounded-lg border-2 inline-block ${
                highContrast ? 'bg-amber-400 text-stone-950 border-amber-300' : 'bg-emerald-200 text-emerald-950 border-emerald-500'
              }`}
            >
              💰 {t.whatYouGet} {scheme.cashBenefit}
            </div>
          </div>

          {/* Optional Applicant Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className={`text-xs font-black block mb-1 ${highContrast ? 'text-stone-200' : 'text-stone-900'}`}>
                {t.applicantNameLabel}
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t.applicantNamePlaceholder}
                className={`w-full px-3.5 py-2.5 min-h-[44px] text-xs font-bold rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-amber-500 ${
                  highContrast
                    ? 'bg-stone-900 border-stone-700 text-white placeholder:text-stone-400'
                    : 'bg-white border-stone-400 text-stone-950 placeholder:text-stone-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-xs font-black block mb-1 ${highContrast ? 'text-stone-200' : 'text-stone-900'}`}>
                {t.villageLabel}
              </label>
              <input
                type="text"
                value={villageName}
                onChange={(e) => setVillageName(e.target.value)}
                placeholder={t.villagePlaceholder}
                className={`w-full px-3.5 py-2.5 min-h-[44px] text-xs font-bold rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-amber-500 ${
                  highContrast
                    ? 'bg-stone-900 border-stone-700 text-white placeholder:text-stone-400'
                    : 'bg-white border-stone-400 text-stone-950 placeholder:text-stone-600'
                }`}
              />
            </div>
          </div>

          {/* Document Checklist Ready Status */}
          <div
            className={`p-3.5 rounded-xl border-2 shadow-xs space-y-2.5 ${
              highContrast ? 'bg-stone-900 border-stone-700 text-white' : 'bg-white border-stone-300 text-stone-950'
            }`}
          >
            <div className="text-xs font-black flex items-center justify-between">
              <span>{t.docStatusLabel}</span>
              <span
                className={`text-xs font-black px-2 py-0.5 rounded-md border ${
                  highContrast ? 'bg-amber-400 text-stone-950 border-amber-300' : 'bg-emerald-100 text-emerald-950 border-emerald-400'
                }`}
              >
                {checkedDocIds.length} / {scheme.documents.length} {t.docsCountReady}
              </span>
            </div>

            <div className="space-y-2">
              {scheme.documents.map((doc) => {
                const isChecked = checkedDocIds.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    className={`flex items-center justify-between text-xs py-1.5 px-2 rounded-lg border ${
                      highContrast
                        ? 'border-stone-800 bg-stone-950/60'
                        : 'border-stone-200 bg-stone-50'
                    }`}
                  >
                    <span className="font-bold">{doc.name}</span>
                    <span
                      className={`text-[11px] font-black px-2.5 py-1 rounded-md border ${
                        isChecked
                          ? highContrast
                            ? 'bg-emerald-400 text-stone-950 border-emerald-300'
                            : 'bg-emerald-200 text-emerald-950 border-emerald-400'
                          : highContrast
                          ? 'bg-stone-800 text-stone-300 border-stone-700'
                          : 'bg-stone-200 text-stone-800 border-stone-300'
                      }`}
                    >
                      {isChecked ? `✓ ${t.readyStatus}` : t.requiredStatus}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Official Counter Request Instruction */}
          <div
            className={`p-3.5 rounded-xl border-2 text-center ${
              highContrast
                ? 'bg-stone-900 border-amber-400/80 text-white'
                : 'bg-stone-100 border-stone-300 text-stone-950'
            }`}
          >
            <p className="text-xs font-bold leading-relaxed">
              {t.counterOfficerNotice}
            </p>
            <p
              className={`text-xs mt-1.5 font-mono font-black ${
                highContrast ? 'text-amber-300' : 'text-stone-800'
              }`}
            >
              {t.officialHelpline}: {scheme.helpline}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`p-4 border-t-2 flex flex-col sm:flex-row items-center gap-2.5 ${
            highContrast ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-300'
          }`}
        >
          <button
            onClick={handlePrint}
            className={`w-full sm:flex-1 py-3 px-4 min-h-[44px] rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 border-2 ${
              highContrast
                ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
                : 'bg-amber-700 hover:bg-amber-800 text-white border-amber-900'
            }`}
          >
            <Printer className="w-4 h-4 font-black" />
            <span>{t.printOrSave}</span>
          </button>

          <button
            onClick={() => {
              audioController.playFeedbackSound('tap');
              onClose();
            }}
            className={`w-full sm:w-auto py-3 px-6 min-h-[44px] rounded-xl text-xs sm:text-sm font-black transition-colors border-2 ${
              highContrast
                ? 'bg-stone-800 hover:bg-stone-700 text-white border-stone-600'
                : 'bg-stone-200 hover:bg-stone-300 text-stone-950 border-stone-400'
            }`}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
