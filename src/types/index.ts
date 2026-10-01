export type SupportedLanguage = 'Tamil' | 'Hindi' | 'English' | 'Telugu' | 'Kannada';

export interface LanguageConfig {
  id: SupportedLanguage;
  name: string;
  nativeName: string;
  speechCode: string;
  sampleGreeting: string;
}

export interface DocumentRequirement {
  id: string;
  name: string;
  nativeName: string;
  description: string;
  iconName: 'id' | 'book' | 'certificate' | 'health' | 'card' | 'camera';
  howToGet: string;
  photoSampleHint: string;
}

export interface SchemeStep {
  stepNumber: number;
  title: string;
  description: string;
  actionPlace: string;
  personToMeet: string;
}

export interface Scheme {
  id: string;
  code: string;
  title: string;
  nativeTitle: string;
  tagline: string;
  category: 'maternity' | 'skills' | 'daughter' | 'subsidy' | 'pension' | 'livelihood';
  cashBenefit: string;
  benefitType: string;
  iconName: 'baby' | 'scissors' | 'piggy' | 'flame' | 'coins' | 'users';
  colorTheme: string;
  shortAudioScript: string;
  eligibilityQuestions: {
    question: string;
    helperText: string;
    expectedAnswer: boolean;
  }[];
  documents: DocumentRequirement[];
  steps: SchemeStep[];
  counterAudioScript: string; // The script she can play to the clerk/Anganwadi didi
  helpline: string;
  officialPortal: string;
}

export interface UserAssistanceSlip {
  schemeId: string;
  schemeTitle: string;
  userName?: string;
  villageName?: string;
  documentsChecked: string[];
  date: string;
  slipNumber: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sakhi';
  text: string;
  audioScript?: string;
  timestamp: string;
  schemeContext?: string;
  suggestedActions?: string[];
  documents?: { name: string; desc: string }[];
}
