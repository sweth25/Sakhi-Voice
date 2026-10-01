import { LanguageConfig, SupportedLanguage } from '../types';

export const LANGUAGES: LanguageConfig[] = [
  {
    id: 'Tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    speechCode: 'ta-IN',
    sampleGreeting: 'வணக்கம் சகோதரி! நான் சகி. உங்களுக்கு என்ன உதவி வேண்டும்?',
  },
  {
    id: 'Hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    speechCode: 'hi-IN',
    sampleGreeting: 'नमस्ते बहन! मैं साखी हूँ। आपकी क्या मदद करूँ?',
  },
  {
    id: 'English',
    name: 'English',
    nativeName: 'English (India)',
    speechCode: 'en-IN',
    sampleGreeting: 'Hello sister! I am Sakhi. How can I help you today?',
  },
  {
    id: 'Telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    speechCode: 'te-IN',
    sampleGreeting: 'నమస్కారం సోదరి! నేను సఖిని. మీకు ఏ సహాయం కావాలి?',
  },
  {
    id: 'Kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    speechCode: 'kn-IN',
    sampleGreeting: 'ನಮಸ್ಕಾರ ಸಹೋದರಿ! ನಾನು ಸಖಿ. ನಿಮಗೆ ಏನು ಸಹಾಯ ಬೇಕು?',
  },
];

export interface TranslationDictionary {
  appTitle: string;
  tagline: string;
  voiceButtonPrompt: string;
  voiceListening: string;
  tapToSpeak: string;
  stopSpeaking: string;
  voiceHelperText: string;
  popularQuestions: string;
  sampleQuestions: string[];
  schemesSectionTitle: string;
  schemesSectionSubtitle: string;
  listenScheme: string;
  viewDetails: string;
  whatYouGet: string;
  whoIsEligible: string;
  requiredDocs: string;
  whereToGo: string;
  whatToSayAtOffice: string;
  sayToDidiButton: string;
  audioPlayingNotice: string;
  createSlipButton: string;
  askSakhiButton: string;
  howToUseApp: string;
  emergencyHelplines: string;
  audioSpeedSlow: string;
  audioSpeedNormal: string;
  readAloud: string;
  stopAudio: string;
  stepNumber: string;
  villageCenter: string;
  whoToMeet: string;
  yes: string;
  no: string;
  eligibleBanner: string;
  slipTitle: string;
  slipSubtitle: string;
  showToCounter: string;
  printOrSave: string;
  close: string;

  categories: {
    all: string;
    maternity: string;
    skills: string;
    daughter: string;
    livelihood: string;
    subsidy: string;
    pension: string;
  };
  schemesAvailable: string;
  safetyNoticeTitle: string;
  safetyNoticeBody: string;
  safetyAudioText: string;
  listenSafety: string;
  helplineFreeCall: string;
  womenHelplineTitle: string;
  womenHelplineDesc: string;
  healthHelplineTitle: string;
  healthHelplineDesc: string;
  childHelplineTitle: string;
  childHelplineDesc: string;
  repeatAudio: string;
  sakhiSpeaking: string;
  playingInfoAudio: string;
  askSakhiFloating: string;
  footerLine1: string;
  footerLine2: string;
  typeQueryPrompt: string;
  typePlaceholder: string;
  askButton: string;
  schemePurpose: string;
  primaryBenefit: string;
  officialHelpline: string;
  nextEligibility: string;
  eligibilitySubtitle: string;
  listenQuestions: string;
  nextDocs: string;
  docsSubtitle: string;
  ifNotHave: string;
  readyWithYou: string;
  tapToTick: string;
  nextSteps: string;
  stepsSubtitle: string;
  nextCounterSpeech: string;
  speakWithConfidence: string;
  counterSpeechDescription: string;
  makeSlip: string;
  docsCountReady: string;
  applicantNameLabel: string;
  applicantNamePlaceholder: string;
  villageLabel: string;
  villagePlaceholder: string;
  tokenLabel: string;
  dateLabel: string;
  counterOfficerNotice: string;
  slipPassTitle: string;
  slipPassSubtitle: string;
  docStatusLabel: string;
  readyStatus: string;
  requiredStatus: string;

  // New keys for complete dynamic UI localization
  docsSummaryBadge: string;
  sakhiThinking: string;
  micPermissionError: string;
  aiGuidanceTitle: string;
  aiGuidanceSubtitle: string;
  aiCheckingRules: string;
  aiPleaseWait: string;
  sorrySister: string;
  schemeLabel: string;
  askMorePlaceholder: string;
  prevButton: string;
  nextButton: string;
  startUsingButton: string;
  walkthroughListen: string;
  walkthroughSlides: {
    title: string;
    desc: string;
    audioScript: string;
  }[];
  highContrastMode: string;
  standardContrastMode: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  Hindi: {
    appTitle: 'साखी',
    tagline: 'गाँव की बहनों की अपनी डिजिटल साथी - बिना अंग्रेजी, बिना डर, सीधे अपनी आवाज़ में',
    voiceButtonPrompt: 'माइक दबाकर बोलें',
    voiceListening: 'सुन रही हूँ... अपनी बात कहें',
    tapToSpeak: 'बोलकर पूछें',
    stopSpeaking: 'सुनना बंद करें',
    voiceHelperText: 'जैसे बोलें: "सिलाई मशीन के पैसे कैसे मिलेंगे?" या "गर्भवती महिला की मदद"',
    popularQuestions: 'या इनमें से कोई एक छूकर पूछें:',
    sampleQuestions: [
      'माँ और बच्चे के ₹5000 कैसे मिलेंगे?',
      'मुफ्त सिलाई मशीन और ट्रेनिंग कैसे मिलेगी?',
      'बेटी का ₹250 वाला सरकारी खाता कैसे खोलें?',
      'मुफ्त गैस चूल्हा और सिलेंडर कैसे मिलेगा?',
    ],
    schemesSectionTitle: 'प्रमुख सरकारी योजनाएं',
    schemesSectionSubtitle: 'किसी भी योजना को छूकर आवाज़ में सुनें और समझें',
    listenScheme: 'आवाज़ में सुनें',
    viewDetails: 'पूरी जानकारी देखें',
    whatYouGet: 'आपको क्या मिलेगा?',
    whoIsEligible: 'क्या आप पात्र हैं? (जांचें)',
    requiredDocs: 'कौन से कागज़ चाहिए?',
    whereToGo: 'गाँव में कहाँ जाएं?',
    whatToSayAtOffice: 'दीदी या बाबू को क्या बोलें?',
    sayToDidiButton: 'यह आवाज़ आंगनवाड़ी दीदी को सुनाएं',
    audioPlayingNotice: 'फ़ोन की आवाज़ तेज करके काउंटर पर सुनाएं',
    createSlipButton: 'अपनी सहायता पर्ची बनाएं',
    askSakhiButton: 'साखी से अपनी भाषा में पूछें',
    howToUseApp: 'ऐप कैसे चलाएं? (आवाज़ में सीखें)',
    emergencyHelplines: 'ज़रूरी सरकारी हेल्पलाइन',
    audioSpeedSlow: 'धीमी आवाज़',
    audioSpeedNormal: 'सामान्य गति',
    readAloud: 'बोलकर बताएं',
    stopAudio: 'आवाज़ रोकें',
    stepNumber: 'कदम',
    villageCenter: 'स्थान',
    whoToMeet: 'किससे मिलें',
    yes: 'हाँ',
    no: 'नहीं',
    eligibleBanner: 'बधाई हो बहन! आप इस योजना के लिए पूरी तरह पात्र हैं।',
    slipTitle: 'गाँव सहायता पर्ची (Sahayata Parchi)',
    slipSubtitle: 'यह पर्ची आंगनवाड़ी दीदी या CSC केंद्र पर दिखाएं',
    showToCounter: 'काउंटर पर दिखाएं या आवाज़ सुनाएं',
    printOrSave: 'फ़ोन में रखें या फोटो लें',
    close: 'बंद करें',

    categories: {
      all: 'सभी योजनाएं',
      maternity: 'माँ और बच्चा (₹5000)',
      skills: 'सिलाई व हुनर (₹15000)',
      daughter: 'बेटी की बचत (8.2%)',
      livelihood: 'लखपति दीदी समूह',
      subsidy: 'मुफ्त गैस कनेक्शन',
      pension: 'महिला सम्मान (मासिक)',
    },
    schemesAvailable: 'योजनाएं उपलब्ध',
    safetyNoticeTitle: 'सरकारी योजनाएं पूर्णतः निःशुल्क हैं - किसी को पैसे न दें',
    safetyNoticeBody: 'आंगनवाड़ी, आशा दीदी या पंचायत भवन में फॉर्म भरने का कोई शुल्क नहीं लगता। अगर कोई आपसे पैसे मांगे तो तुरंत महिला हेल्पलाइन 181 पर सूचित करें।',
    safetyAudioText: 'सरकारी योजनाएं पूर्णतः निःशुल्क हैं। किसी भी बिचौलिए या दलाल को पैसे न दें। आंगनवाड़ी और पंचायत में फॉर्म मुफ्त भरे जाते हैं। किसी भी शिकायत के लिए 181 पर कॉल करें।',
    listenSafety: 'यह सुनें',
    helplineFreeCall: '24x7 निःशुल्क कॉल',
    womenHelplineTitle: 'महिला हेल्पलाइन (Women in Distress)',
    womenHelplineDesc: 'किसी भी समस्या, घरेलू हिंसा या योजना सलाह हेतु',
    healthHelplineTitle: 'स्वास्थ्य व आशा परामर्श (Health Helpline)',
    healthHelplineDesc: 'गर्भावस्था, टीकाकरण व पोषण संबंधी सलाह',
    childHelplineTitle: 'बाल सहायता हेल्पलाइन (Childline)',
    childHelplineDesc: 'बच्चों की सुरक्षा, शिक्षा व सुकन्या जानकारी',
    repeatAudio: 'दोबारा सुनें',
    sakhiSpeaking: 'साखी बोल रही है...',
    playingInfoAudio: 'जानकारी आवाज़ में सुनाई जा रही है',
    askSakhiFloating: 'साखी से पूछें',
    footerLine1: 'साखी (Sakhi) · डिजिटल भारत में ग्रामीण बहनों की आवाज़ और अधिकार',
    footerLine2: 'शून्य डिजिटल बाधा (Zero Digital Knowledge) पहल · सभी सरकारी योजनाओं की जानकारी पूर्णतः निःशुल्क',
    typeQueryPrompt: 'लिखकर पूछना चाहती हैं? यहाँ दबाएं',
    typePlaceholder: 'यहाँ अपनी ज़रूरत लिखें... (उदा: सिलाई मशीन, मातृत्व)',
    askButton: 'पूछें',
    schemePurpose: 'योजना का उद्देश्य',
    primaryBenefit: 'मुख्य सरकारी लाभ',
    officialHelpline: 'सरकारी हेल्पलाइन',
    nextEligibility: 'आगे बढ़ें: क्या आप पात्र हैं?',
    eligibilitySubtitle: 'नीचे दिए सरल सवालों का उत्तर देकर अपनी पात्रता जांचें:',
    listenQuestions: 'सवाल सुनें',
    nextDocs: 'आगे बढ़ें: ज़रूरी कागज़ात देखें',
    docsSubtitle: 'जो कागज़ आपके पास तैयार हैं, उन पर सही का निशान लगाएं:',
    ifNotHave: 'यदि नहीं है:',
    readyWithYou: '✓ आपके पास तैयार है',
    tapToTick: 'छूकर टिक लगाएं',
    nextSteps: 'आगे बढ़ें: गाँव में कहाँ जाना है?',
    stepsSubtitle: 'गाँव में आवेदन करने के आसान कदम:',
    nextCounterSpeech: 'आगे बढ़ें: दीदी को क्या बोलना है?',
    speakWithConfidence: 'बिना झिझक काउंटर पर बात करें',
    counterSpeechDescription: 'यदि आप काउंटर पर बोलने में संकोच करती हैं, तो अपने मोबाइल की आवाज़ फुल करें और नीचे दिया हरा बटन दबाएं। आपका फोन आंगनवाड़ी दीदी या बाबू जी को साफ-साफ सब समझा देगा:',
    makeSlip: 'पर्ची बनाएं',
    docsCountReady: 'तैयार',
    applicantNameLabel: 'आपका नाम (ऐच्छिक):',
    applicantNamePlaceholder: 'उदा: रेखा देवी',
    villageLabel: 'गाँव / पंचायत:',
    villagePlaceholder: 'उदा: रामपुर',
    tokenLabel: 'टोकन संख्या / Token ID',
    dateLabel: 'तारीख / Date',
    counterOfficerNotice: 'सेवा केंद्र संचालक से निवेदन: कृपया इस ग्रामीण बहन का ऑनलाइन फॉर्म भरने में सहायता करें। यह योजना महिला सशक्तिकरण के तहत निःशुल्क है।',
    slipPassTitle: 'सरकारी सेवा आवेदन पर्ची',
    slipPassSubtitle: '(इसे आंगनवाड़ी दीदी, आशा दीदी या CSC केंद्र पर दिखाएं)',
    docStatusLabel: 'ज़रूरी कागज़ात की स्थिति:',
    readyStatus: '✓ तैयार',
    requiredStatus: 'लागू',

    docsSummaryBadge: 'मुख्य कागज़ात चाहिए (आधार, बैंक पासबुक)',
    sakhiThinking: 'साखी सोच रही है... (योजनाएं खोजी जा रही हैं)',
    micPermissionError: 'माइक की अनुमति नहीं मिली। कृपया ब्राउज़र में माइक चालू करें या नीचे लिखकर पूछें।',
    aiGuidanceTitle: 'साखी सलाहकार (AI Guidance)',
    aiGuidanceSubtitle: 'आपकी भाषा में संपूर्ण सरकारी जानकारी',
    aiCheckingRules: 'साखी सरकारी नियम और जानकारी जांच रही है...',
    aiPleaseWait: '(कृपया 1-2 सेकंड प्रतीक्षा करें)',
    sorrySister: 'माफ करें बहन!',
    schemeLabel: 'योजना:',
    askMorePlaceholder: 'और कुछ पूछना है? यहाँ अपनी बात लिखें...',
    prevButton: 'पिछला',
    nextButton: 'अगला',
    startUsingButton: 'शुरू करें',
    walkthroughListen: 'यह निर्देश आवाज़ में सुनें',
    walkthroughSlides: [
      {
        title: '1. लिखने की कोई ज़रूरत नहीं - सीधे बोलें',
        desc: 'स्क्रीन पर दिख रहे बड़े गोल बटन को दबाएं और अपनी भाषा में कहें कि आपको क्या मदद चाहिए। जैसे: "मुझे सिलाई मशीन सीखनी है" या "गर्भवती महिला के पैसे"।',
        audioScript: 'नमस्ते बहन। आपको कुछ भी लिखने की ज़रूरत नहीं है। बस बड़े गोल माइक बटन को दबाएं और जैसे आप अपनी बहन से बात करती हैं, वैसे ही अपनी आवाज़ में बोलें।',
      },
      {
        title: '2. किसी भी तस्वीर को छूकर सुनें',
        desc: 'ऐप में किसी भी कार्ड या कागज़ के नाम पर स्पीकर का बटन लगा है। उसे छूने पर फोन खुद सब कुछ बोलकर सुनाएगा।',
        audioScript: 'यदि आपको पढ़ने में परेशानी होती है, तो चिंता न करें। हर तस्वीर के पास एक आवाज़ का बटन है। उसे छूते ही फोन आपको पूरी बात बोलकर सुनाएगा।',
      },
      {
        title: '3. काउंटर पर फोन से बोलवाएं',
        desc: 'जब आप आंगनवाड़ी या जन सेवा केंद्र जाएं, तो "दीदी को क्या बोलें" वाला हरा बटन दबाएं। आपका फोन खुद अधिकारी को आपकी बात समझा देगा।',
        audioScript: 'सरकारी दफ्तर या आंगनवाड़ी जाने पर संकोच न करें। फोन की आवाज़ तेज करें और हरा बटन दबाएं। आपका फोन खुद आंगनवाड़ी दीदी को साफ-साफ सब बता देगा।',
      },
    ],
    highContrastMode: 'उच्च कंट्रास्ट (कम रोशनी)',
    standardContrastMode: 'सामान्य कंट्रास्ट',
  },

  Tamil: {
    appTitle: 'சகி (Sakhi)',
    tagline: 'கிராமப்புற பெண்களுக்கான குரல் வழி அரசு திட்ட வழிகாட்டி - உங்கள் சொந்த மொழியில்',
    voiceButtonPrompt: 'மைக் அழுத்தி பேசவும்',
    voiceListening: 'கேட்கிறேன்... பேசுங்கள்',
    tapToSpeak: 'பேசி கேட்கவும்',
    stopSpeaking: 'நிறுத்தவும்',
    voiceHelperText: 'எ.கா: "தையல் இயந்திர உதவி தொகை எப்படி பெறுவது?" அல்லது "கர்ப்பிணி உதவி"',
    popularQuestions: 'அல்லது தொட்டு கேட்கவும்:',
    sampleQuestions: [
      'கர்ப்பிணி பெண்களுக்கு ₹5000 உதவித்தொகை',
      'இலவச தையல் இயந்திரம் மற்றும் பயிற்சி',
      'பெண் குழந்தைகளுக்கான சேமிப்பு திட்டம்',
      'இலவச எரிவாயு அடுப்பு திட்டம்',
    ],
    schemesSectionTitle: 'அரசு நலத்திட்டங்கள்',
    schemesSectionSubtitle: 'திட்டத்தை தொட்டு குரலில் கேட்டு அறியவும்',
    listenScheme: 'குரலில் கேட்க',
    viewDetails: 'முழு விவரம்',
    whatYouGet: 'உங்களுக்கு என்ன கிடைக்கும்?',
    whoIsEligible: 'நீங்கள் தகுதியானவரா?',
    requiredDocs: 'தேவையான ஆவணங்கள்',
    whereToGo: 'எங்கு செல்ல வேண்டும்?',
    whatToSayAtOffice: 'அதிகாரியிடம் என்ன பேச வேண்டும்?',
    sayToDidiButton: 'இந்த குரலை அங்கன்வாடியில் ஒலிக்கவும்',
    audioPlayingNotice: 'ஒலியை உயர்த்தி அலுவலகத்தில் காட்டவும்',
    createSlipButton: 'உதவி சீட்டு உருவாக்கவும்',
    askSakhiButton: 'சகியிடம் தமிழில் பேசவும்',
    howToUseApp: 'பயன்படுத்துவது எப்படி?',
    emergencyHelplines: 'அவசர உதவி எண்கள்',
    audioSpeedSlow: 'மெதுவான குரல்',
    audioSpeedNormal: 'வழக்கமான வேகம்',
    readAloud: 'படித்து காட்டவும்',
    stopAudio: 'நிறுத்தவும்',
    stepNumber: 'படி',
    villageCenter: 'இடம்',
    whoToMeet: 'யாரை சந்திக்க வேண்டும்',
    yes: 'ஆம்',
    no: 'இல்லை',
    eligibleBanner: 'வாழ்த்துகள் சகோதரி! நீங்கள் தகுதியானவர்.',
    slipTitle: 'கிராம உதவி சீட்டு (Sahayata Slip)',
    slipSubtitle: 'இந்த சீட்டை மையத்தில் காட்டவும்',
    showToCounter: 'மையத்தில் காட்டவும்',
    printOrSave: 'சேமிக்க / படம் எடுக்க',
    close: 'மூடுக',

    categories: {
      all: 'அனைத்து திட்டங்கள்',
      maternity: 'தாய் & குழந்தை (₹5000)',
      skills: 'தையல் & பயிற்சி (₹15000)',
      daughter: 'மகள் சேமிப்பு (8.2%)',
      livelihood: 'சுய உதவி குழு',
      subsidy: 'இலவச காஸ் அடுப்பு',
      pension: 'மாதாந்திர உதவி',
    },
    schemesAvailable: 'திட்டங்கள் உள்ளன',
    safetyNoticeTitle: 'அரசு திட்டங்கள் முற்றிலும் இலவசம் - யாரிடமும் பணம் கொடுக்க வேண்டாம்',
    safetyNoticeBody: 'அங்கன்வாடி அல்லது சேவை மையத்தில் படிவம் நிரப்ப கட்டணம் கிடையாது. யாரேனும் பணம் கேட்டால் 181 எண்ணை தொடர்பு கொள்ளவும்.',
    safetyAudioText: 'அரசு திட்டங்கள் முற்றிலும் இலவசம். இடைத்தரகர்களுக்கு பணம் கொடுக்க வேண்டாம். புகார்களுக்கு 181 எண்ணை அழைக்கவும்.',
    listenSafety: 'கேட்க',
    helplineFreeCall: '24x7 இலவச அழைப்பு',
    womenHelplineTitle: 'பெண்கள் உதவி எண் (Women Helpline)',
    womenHelplineDesc: 'எந்தவொரு உதவி மற்றும் பாதுகாப்பு ஆலோசனைக்கு',
    healthHelplineTitle: 'சுகாதார ஆலோசனை எண் (Health Helpline)',
    healthHelplineDesc: 'கர்ப்பகாலம் மற்றும் தடுப்பூசி ஆலோசனை',
    childHelplineTitle: 'குழந்தைகள் உதவி எண் (Childline)',
    childHelplineDesc: 'குழந்தைகள் பாதுகாப்பு மற்றும் சேமிப்பு தகவல்',
    repeatAudio: 'மீண்டும் கேட்க',
    sakhiSpeaking: 'சகி பேசுகிறது...',
    playingInfoAudio: 'தகவல் குரலில் ஒலிக்கப்படுகிறது',
    askSakhiFloating: 'சகியிடம் கேட்கவும்',
    footerLine1: 'சகி (Sakhi) · கிராமப்புற பெண்களுக்கான டிஜிட்டல் தோழி',
    footerLine2: 'அனைத்து அரசு திட்டங்களின் தகவலும் முற்றிலும் இலவசம்',
    typeQueryPrompt: 'எழுதி கேட்க வேண்டுமா? இங்கே அழுத்தவும்',
    typePlaceholder: 'உங்கள் தேவையை எழுதுங்கள்... (எ.கா: தையல் இயந்திரம்)',
    askButton: 'கேட்க',
    schemePurpose: 'திட்டத்தின் நோக்கம்',
    primaryBenefit: 'முக்கிய பலன்',
    officialHelpline: 'அரசு உதவி எண்',
    nextEligibility: 'அடுத்து: நீங்கள் தகுதியானவரா?',
    eligibilitySubtitle: 'கீழே உள்ள எளிய கேள்விகளுக்கு பதிலளித்து தகுதியை அறியவும்:',
    listenQuestions: 'கேள்விகளை கேட்க',
    nextDocs: 'அடுத்து: தேவையான ஆவணங்கள்',
    docsSubtitle: 'உங்களிடம் உள்ள ஆவணங்களை டிக் செய்யவும்:',
    ifNotHave: 'இல்லையெனில்:',
    readyWithYou: '✓ தயாராக உள்ளது',
    tapToTick: 'தொட்டு டிக் செய்யவும்',
    nextSteps: 'அடுத்து: எங்கு செல்ல வேண்டும்?',
    stepsSubtitle: 'கிராமத்தில் விண்ணப்பிப்பதற்கான படிகள்:',
    nextCounterSpeech: 'அடுத்து: அதிகாரியிடம் என்ன பேச வேண்டும்?',
    speakWithConfidence: 'தயக்கமின்றி பேசவும்',
    counterSpeechDescription: 'அலுவலகத்தில் பேச தயக்கமாக இருந்தால், ஒலியை உயர்த்தி பச்சை பொத்தானை அழுத்தவும். உங்கள் தொலைபேசி அதிகாரியிடம் பேசும்:',
    makeSlip: 'சீட்டு உருவாக்கவும்',
    docsCountReady: 'தயார்',
    applicantNameLabel: 'உங்கள் பெயர்:',
    applicantNamePlaceholder: 'எ.கா: லட்சுமி',
    villageLabel: 'கிராமம்:',
    villagePlaceholder: 'எ.கா: மங்கலம்',
    tokenLabel: 'டோக்கன் எண் / Token ID',
    dateLabel: 'தேதி / Date',
    counterOfficerNotice: 'அதிகாரிக்கான வேண்டுகோள்: தயவுசெய்து இந்த சகோதரிக்கு இலவசமாக ஆன்லைனில் விண்ணப்பிக்க உதவவும்.',
    slipPassTitle: 'அரசு சேவை விண்ணப்ப சீட்டு',
    slipPassSubtitle: '(அங்கன்வாடி அல்லது மையத்தில் காட்டவும்)',
    docStatusLabel: 'ஆவணங்களின் நிலை:',
    readyStatus: '✓ தயார்',
    requiredStatus: 'தேவை',

    docsSummaryBadge: 'முக்கிய ஆவணங்கள் தேவை (ஆதார், பாஸ்புக்)',
    sakhiThinking: 'சகி யோசிக்கிறது... (திட்டங்களை தேடுகிறது)',
    micPermissionError: 'மைக் அனுமதி இல்லை. உலாவியில் மைக் அனுமதியை இயக்கவும் அல்லது எழுதி கேட்கவும்.',
    aiGuidanceTitle: 'சகி ஆலோசகர் (AI Guidance)',
    aiGuidanceSubtitle: 'உங்கள் மொழியில் முழுமையான அரசு திட்ட தகவல்',
    aiCheckingRules: 'சகி அரசு விதிகளையும் தகவலையும் சரிபார்க்கிறது...',
    aiPleaseWait: '(தயவுசெய்து 1-2 நொடிகள் காத்திருக்கவும்)',
    sorrySister: 'மன்னிக்கவும் சகோதரி!',
    schemeLabel: 'திட்டம்:',
    askMorePlaceholder: 'வேறு ஏதேனும் கேட்க வேண்டுமா? இங்கே எழுதவும்...',
    prevButton: 'முந்தையது',
    nextButton: 'அடுத்தது',
    startUsingButton: 'தொடங்கவும்',
    walkthroughListen: 'இந்த வழிகாட்டலை கேட்கவும்',
    walkthroughSlides: [
      {
        title: '1. எழுத வேண்டியதில்லை - நேரடியாக பேசுங்கள்',
        desc: 'பெரிய மைக் பொத்தானை அழுத்தி உங்களுக்கு என்ன உதவி வேண்டும் என்று உங்கள் மொழியில் பேசுங்கள்.',
        audioScript: 'வணக்கம் சகோதரி. எழுத தேவையில்லை. மைக் பொத்தானை அழுத்தி நேரடியாக பேசுங்கள்.',
      },
      {
        title: '2. படங்களை தொட்டு குரலில் கேட்கலாம்',
        desc: 'ஒவ்வொரு திட்ட அட்டையிலும் உள்ள ஒலி பொத்தானை அழுத்தினால் விவரம் குரலில் ஒலிக்கும்.',
        audioScript: 'எந்தவொரு தகவலையும் படிக்க சிரமமாக இருந்தால், ஒலி பொத்தானை தொட்டு குரலில் கேட்கலாம்.',
      },
      {
        title: '3. அரசு அலுவலகத்தில் போனை பேச வைக்கலாம்',
        desc: 'அலுவலகத்தில் தயங்காமல் பச்சை பொத்தானை அழுத்தினால் உங்கள் போன் அதிகாரியிடம் பேசும்.',
        audioScript: 'அங்கன்வாடி அல்லது சேவை மையத்தில் தயங்க வேண்டாம். பச்சை பொத்தானை அழுத்தினால் போனே பேசும்.',
      },
    ],
    highContrastMode: 'அதிக மாறுபாடு (குறைந்த வெளிச்சம்)',
    standardContrastMode: 'வழக்கமான பார்வை',
  },

  Telugu: {
    appTitle: 'సఖి (Sakhi)',
    tagline: 'గ్రామీణ మహిళల కోసం ప్రత్యేక ప్రభుత్వ పథకాల వాయిస్ గైడ్ - మీ స్వంత భాషలో',
    voiceButtonPrompt: 'మైక్ నొక్కి మాట్లాడండి',
    voiceListening: 'వింటున్నాను... మాట్లాడండి',
    tapToSpeak: 'మాట్లాడి అడగండి',
    stopSpeaking: 'ఆపండి',
    voiceHelperText: 'ఉదాహరణ: "కుట్టు మిషన్ సహాయం ఎలా పొందాలి?" లేదా "గర్భిణీ స్త్రీలకు సహాయం"',
    popularQuestions: 'లేదా వీటిని తాకండి:',
    sampleQuestions: [
      'గర్భిణీ స్త్రీలకు ₹5000 పథకం',
      'ఉచిత కుట్టు మిషన్ మరియు శిక్షణ',
      'ఆడపిల్లల సుకన్య సమృద్ధి ఖాతా',
      'ఉచిత గ్యాస్ స్టవ్ మరియు సిలిండర్',
    ],
    schemesSectionTitle: 'ముఖ్యమైన ప్రభుత్వ పథకాలు',
    schemesSectionSubtitle: 'పథకాన్ని తాకి వాయిస్ ద్వారా తెలుసుకోండి',
    listenScheme: 'వినండి',
    viewDetails: 'పూర్తి వివరాలు',
    whatYouGet: 'మీకు ఏమి లభిస్తుంది?',
    whoIsEligible: 'మీరు అర్హులేనా?',
    requiredDocs: 'కావలసిన పత్రాలు',
    whereToGo: 'ఎక్కడికి వెళ్ళాలి?',
    whatToSayAtOffice: 'అధికారితో ఏమి మాట్లాడాలి?',
    sayToDidiButton: 'ఈ వాయిస్ అంగన్‌వాడీలో వినిపించండి',
    audioPlayingNotice: 'వాల్యూమ్ పెంచి ఆఫీసులో వినిపించండి',
    createSlipButton: 'సహాయ స్లిప్ తయారు చేయండి',
    askSakhiButton: 'తెలుగులో సఖిని అడగండి',
    howToUseApp: 'ఎలా ఉపయోగించాలి?',
    emergencyHelplines: 'ముఖ్యమైన హెల్ప్‌లైన్లు',
    audioSpeedSlow: 'నెమ్మది వాయిస్',
    audioSpeedNormal: 'సాధారణం',
    readAloud: 'చదివి వినిపించండి',
    stopAudio: 'ఆపండి',
    stepNumber: 'దశ',
    villageCenter: 'కేంద్రం',
    whoToMeet: 'ఎవరిని కలవాలి',
    yes: 'అవును',
    no: 'కాదు',
    eligibleBanner: 'అభినందనలు సోదరి! మీరు ఈ పథకానికి అర్హులు.',
    slipTitle: 'సహాయ స్లిప్ (Sahayata Slip)',
    slipSubtitle: 'ఈ స్లిప్‌ను కేంద్రంలో చూపించండి',
    showToCounter: 'కౌంటర్‌లో చూపించండి',
    printOrSave: 'సేవ్ చేసుకోండి',
    close: 'మూసివేయి',

    categories: {
      all: 'అన్ని పథకాలు',
      maternity: 'తల్లీ బిడ్డ (₹5000)',
      skills: 'కుట్టు మిషన్ (₹15000)',
      daughter: 'ఆడపిల్ల పొదుపు (8.2%)',
      livelihood: 'స్వయం సహాయక సంఘం',
      subsidy: 'ఉచిత గ్యాస్ కనెక్షన్',
      pension: 'మహిళా గౌరవ పథకం',
    },
    schemesAvailable: 'పథకాలు అందుబాటులో ఉన్నాయి',
    safetyNoticeTitle: 'ప్రభుత్వ పథకాలు ఉచితం - ఎవరికీ డబ్బులు ఇవ్వవద్దు',
    safetyNoticeBody: 'అంగన్‌వాడీ లేదా మీ-సేవలో దరఖాస్తుకు ఎలాంటి ఫీజు లేదు. ఎవరైనా డబ్బులు అడిగితే 181 హెల్ప్‌లైన్‌కు కాల్ చేయండి.',
    safetyAudioText: 'ప్రభుత్వ పథకాలు పూర్తిగా ఉచితం. దళారులకు డబ్బులు ఇవ్వకండి. ఫిర్యాదుల కోసం 181 కి కాల్ చేయండి.',
    listenSafety: 'వినండి',
    helplineFreeCall: '24x7 ఉచిత కాల్',
    womenHelplineTitle: 'మహిళా హెల్ప్‌లైన్ (181)',
    womenHelplineDesc: 'ఏ సమస్యకైనా, పథకాల సమాచారానికైనా',
    healthHelplineTitle: 'ఆరోగ్య హెల్ప్‌లైన్ (104)',
    healthHelplineDesc: 'గర్భధారణ, టీకాల సలహాల కోసం',
    childHelplineTitle: 'చైల్డ్‌లైన్ (1098)',
    childHelplineDesc: 'పిల్లల భద్రత, సుకన్య సమాచారం',
    repeatAudio: 'మళ్ళీ వినండి',
    sakhiSpeaking: 'సఖి మాట్లాడుతోంది...',
    playingInfoAudio: 'సమాచారం వినిపించబడుతోంది',
    askSakhiFloating: 'సఖిని అడగండి',
    footerLine1: 'సఖి (Sakhi) · గ్రామీణ మహిళల డిజిటల్ స్నేహితురాలు',
    footerLine2: 'అన్ని ప్రభుత్వ పథకాల సమాచారం పూర్తిగా ఉచితం',
    typeQueryPrompt: 'టైప్ చేసి అడగాలనుకుంటున్నారా? ఇక్కడ నొక్కండి',
    typePlaceholder: 'మీ ప్రశ్న రాయండి... (ఉదా: కుట్టు మిషన్)',
    askButton: 'అడగండి',
    schemePurpose: 'పథకం ఉద్దేశ్యం',
    primaryBenefit: 'ప్రధాన ప్రయోజనం',
    officialHelpline: 'ప్రభుత్వ హెల్ప్‌లైన్',
    nextEligibility: 'తర్వాత: మీరు అర్హులేనా?',
    eligibilitySubtitle: 'సహజమైన ప్రశ్నలకు సమాధానమిచ్చి అర్హతను తెలుసుకోండి:',
    listenQuestions: 'ప్రశ్నలను వినండి',
    nextDocs: 'తర్వాత: కావలసిన పత్రాలు',
    docsSubtitle: 'మీ వద్ద ఉన్న పత్రాలను టిక్ చేయండి:',
    ifNotHave: 'ఒకవేళ లేకపోతే:',
    readyWithYou: '✓ సిద్ధంగా ఉంది',
    tapToTick: 'టిక్ చేయడానికి తాకండి',
    nextSteps: 'తర్వాత: ఎక్కడికి వెళ్ళాలి?',
    stepsSubtitle: 'దరఖాస్తు చేసుకోవడానికి సులభమైన దశలు:',
    nextCounterSpeech: 'తర్వాత: అధికారితో ఏమి మాట్లాడాలి?',
    speakWithConfidence: 'ధైర్యంగా మాట్లాడండి',
    counterSpeechDescription: 'కౌంటర్‌లో మాట్లాడటానికి సందేహం ఉంటే, వాల్యూమ్ పెంచి ఆకుపచ్చ బటన్ నొక్కండి. మీ ఫోన్ అధికారితో మాట్లాడుతుంది:',
    makeSlip: 'స్లిప్ తయారు చేయండి',
    docsCountReady: 'సిద్ధం',
    applicantNameLabel: 'మీ పేరు:',
    applicantNamePlaceholder: 'ఉదా: వరలక్ష్మి',
    villageLabel: 'గ్రామం:',
    villagePlaceholder: 'ఉదా: కొండపల్లి',
    tokenLabel: 'టోకెన్ నంబర్ / Token ID',
    dateLabel: 'తేదీ / Date',
    counterOfficerNotice: 'అధికారికి విజ్ఞప్తి: దయచేసి ఈ సోదరికి ఉచితంగా ఆన్‌లైన్ దరఖాస్తు చేయడంలో సహాయం చేయండి.',
    slipPassTitle: 'ప్రభుత్వ సేవా దరఖాస్తు స్లిప్',
    slipPassSubtitle: '(అంగన్‌వాడీ లేదా కేంద్రంలో చూపించండి)',
    docStatusLabel: 'పత్రాల స్థితి:',
    readyStatus: '✓ సిద్ధం',
    requiredStatus: 'అవసరం',

    docsSummaryBadge: 'ముఖ్యమైన పత్రాలు అవసరం (ఆధార్, పాస్‌బుక్)',
    sakhiThinking: 'సఖి ఆలోచిస్తోంది... (పథకాలను శోధిస్తోంది)',
    micPermissionError: 'మైక్ అనుమతి లేదు. బ్రౌజర్‌లో మైక్ అనుమతి ఇవ్వండి లేదా టైప్ చేసి అడగండి.',
    aiGuidanceTitle: 'సఖి సలహాదారు (AI Guidance)',
    aiGuidanceSubtitle: 'మీ భాషలో సంపూర్ణ ప్రభుత్వ పథకాల సమాచారం',
    aiCheckingRules: 'సఖి ప్రభుత్వ నిబంధనలను పరిశీలిస్తోంది...',
    aiPleaseWait: '(దయచేసి 1-2 సెకన్లు వేచి ఉండండి)',
    sorrySister: 'క్షమించండి సోదరి!',
    schemeLabel: 'పథకం:',
    askMorePlaceholder: 'ఇంకా ఏదైనా అడగాలా? ఇక్కడ రాయండి...',
    prevButton: 'మునుపటిది',
    nextButton: 'తరువాత',
    startUsingButton: 'ప్రారంభించండి',
    walkthroughListen: 'ఈ సూచనలు వాయిస్‌లో వినండి',
    walkthroughSlides: [
      {
        title: '1. రాయవలసిన అవసరం లేదు - నేరుగా మాట్లాడండి',
        desc: 'పెద్ద మైక్ బటన్ నొక్కి మీకు ఏ సహాయం కావాలో మీ స్వంత భాషలో చెప్పండి.',
        audioScript: 'నమస్కారం సోదరి. రాయాల్సిన పనిలేదు. మైక్ బటన్ నొక్కి నేరుగా మాట్లాడండి.',
      },
      {
        title: '2. బొమ్మలను తాకి వాయిస్ వినండి',
        desc: 'యాప్‌లో ఏ కార్డ్ అయినా తాకితే ఫోన్ స్పష్టంగా చదివి వినిపిస్తుంది.',
        audioScript: 'చదవడం కష్టంగా ఉంటే ఆడియో బటన్ నొక్కండి. ఫోన్ మొత్తం చదివి వినిపిస్తుంది.',
      },
      {
        title: '3. ఆఫీసులో ఫోన్‌తో మాట్లాడించండి',
        desc: 'కౌంటర్‌లో మాట్లాడటానికి మొహమాటపడకండి. ఆకుపచ్చ బటన్ నొక్కితే ఫోనే మాట్లాడుతుంది.',
        audioScript: 'ఆఫీసులో సందేహపడకండి. ఆకుపచ్చ బటన్ నొక్కితే ఫోన్ స్వయంగా అధికారితో మాట్లాడుతుంది.',
      },
    ],
    highContrastMode: 'అధిక కాంట్రాస్ట్ (తక్కువ వెలుతురు)',
    standardContrastMode: 'సాధారణ వీక్షణ',
  },

  Kannada: {
    appTitle: 'ಸಖಿ (Sakhi)',
    tagline: 'ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ - ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ ಸರಕಾರಿ ಯೋಜನೆಗಳು',
    voiceButtonPrompt: 'ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ',
    voiceListening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ... ಮಾತನಾಡಿ',
    tapToSpeak: 'ಮಾತನಾಡಿ ಕೇಳಿ',
    stopSpeaking: 'ನಿಲ್ಲಿಸಿ',
    voiceHelperText: 'ಉದಾ: "ಹೊಲಿಗೆ ಯಂತ್ರ ಸಹಾಯ ಹೇಗೆ ಪಡೆಯುವುದು?" ಅಥವಾ "ಗರ್ಭಿಣಿ ಮಹಿಳೆಯರ ನೆರವು"',
    popularQuestions: 'ಅಥವಾ ಇವುಗಳನ್ನು ಸ್ಪರ್ಶಿಸಿ:',
    sampleQuestions: [
      'ಗರ್ಭಿಣಿ ಮಹಿಳೆಯರಿಗೆ ₹5000 ನೆರವು',
      'ಉಚಿತ ಹೊಲಿಗೆ ಯಂತ್ರ ಮತ್ತು ತರಬೇತಿ',
      'ಹೆಣ್ಣು ಮಗುವಿನ ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಖಾತೆ',
      'ಉಚಿತ ಗ್ಯಾಸ್ ಒಲೆ ಮತ್ತು ಸಿಲಿಂಡರ್',
    ],
    schemesSectionTitle: 'ಪ್ರಮುಖ ಸರಕಾರಿ ಯೋಜನೆಗಳು',
    schemesSectionSubtitle: 'ಯೋಜನೆಯನ್ನು ಸ್ಪರ್ಶಿಸಿ ಧ್ವನಿಯಲ್ಲಿ ತಿಳಿಯಿರಿ',
    listenScheme: 'ಕೇಳಿ',
    viewDetails: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    whatYouGet: 'ನಿಮಗೆ ಏನು ಸಿಗುತ್ತದೆ?',
    whoIsEligible: 'ನೀವು ಅರ್ಹರೇ?',
    requiredDocs: 'ಬೇಕಾಗುವ ದಾಖಲೆಗಳು',
    whereToGo: 'ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?',
    whatToSayAtOffice: 'ಅಧಿಕಾರಿಗೆ ಏನು ಹೇಳಬೇಕು?',
    sayToDidiButton: 'ಈ ಧ್ವನಿಯನ್ನು ಅಂಗನವಾಡಿಯಲ್ಲಿ ಪ್ಲೇ ಮಾಡಿ',
    audioPlayingNotice: 'ಧ್ವನಿ ಹೆಚ್ಚಿಸಿ ಕಚೇರಿಯಲ್ಲಿ ಕೇಳಿಸಿ',
    createSlipButton: 'ಸಹಾಯ ಚೀಟಿ ರಚಿಸಿ',
    askSakhiButton: 'ಸಖಿಯೊಂದಿಗೆ ಮಾತನಾಡಿ',
    howToUseApp: 'ಬಳಸುವುದು ಹೇಗೆ?',
    emergencyHelplines: 'ತುರ್ತು ಸಹಾಯವಾಣಿ',
    audioSpeedSlow: 'ನಿಧಾನ ಧ್ವನಿ',
    audioSpeedNormal: 'ಸಾಮಾನ್ಯ',
    readAloud: 'ಓದಿ ಹೇಳಿ',
    stopAudio: 'ನಿಲ್ಲಿಸಿ',
    stepNumber: 'ಹಂತ',
    villageCenter: 'ಸ್ಥಳ',
    whoToMeet: 'ಯಾರನ್ನು ಭೇಟಿ ಮಾಡಬೇಕು',
    yes: 'ಹೌದು',
    no: 'ಇಲ್ಲ',
    eligibleBanner: 'ಅಭಿನಂದನೆಗಳು ಸಹೋದರಿ! ನೀವು ಈ ಯೋಜನೆಗೆ ಅರ್ಹರು.',
    slipTitle: 'ಸಹಾಯ ಚೀಟಿ',
    slipSubtitle: 'ಈ ಚೀಟಿಯನ್ನು ಕೇಂದ್ರದಲ್ಲಿ ತೋರಿಸಿ',
    showToCounter: 'ಕೌಂಟರ್‌ನಲ್ಲಿ ತೋರಿಸಿ',
    printOrSave: 'ಉಳಿಸಿಕೊಳ್ಳಿ',
    close: 'ಮುಚ್ಚಿ',

    categories: {
      all: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು',
      maternity: 'ತಾಯಿ ಮತ್ತು ಮಗು (₹5000)',
      skills: 'ಹೊಲಿಗೆ ಯಂತ್ರ (₹15000)',
      daughter: 'ಮಗಳ ಉಳಿತಾಯ (8.2%)',
      livelihood: 'ಸ್ವಸಹಾಯ ಗುಂಪು',
      subsidy: 'ಉಚಿತ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ',
      pension: 'ಮಹಿಳಾ ಧನಸಹಾಯ',
    },
    schemesAvailable: 'ಯೋಜನೆಗಳು ಲಭ್ಯವಿದೆ',
    safetyNoticeTitle: 'ಸರಕಾರಿ ಯೋಜನೆಗಳು ಸಂಪೂರ್ಣ ಉಚಿತ - ಯಾರಿಗೂ ಹಣ ನೀಡಬೇಡಿ',
    safetyNoticeBody: 'ಅಂಗನವಾಡಿ ಅಥವಾ ಪಂಚಾಯತ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲ. ಹಣ ಕೇಳಿದರೆ 181 ಕ್ಕೆ ಕರೆ ಮಾಡಿ.',
    safetyAudioText: 'ಸರಕಾರಿ ಯೋಜನೆಗಳು ಸಂಪೂರ್ಣ ಉಚಿತ. ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಹಣ ನೀಡಬೇಡಿ. ದೂರುಗಳಿಗೆ 181 ಕ್ಕೆ ಕರೆ ಮಾಡಿ.',
    listenSafety: 'ಕೇಳಿ',
    helplineFreeCall: '24x7 ಉಚಿತ ಕರೆ',
    womenHelplineTitle: 'ಮಹಿಳಾ ಸಹಾಯವಾಣಿ (Women Helpline 181)',
    womenHelplineDesc: 'ಯಾವುದೇ ಸಮಸ್ಯೆ ಮತ್ತು ಕಾನೂನು ನೆರವಿಗಾಗಿ',
    healthHelplineTitle: 'ಆರೋಗ್ಯ ಸಹಾಯವಾಣಿ (104)',
    healthHelplineDesc: 'ಗರ್ಭಧಾರಣೆ ಮತ್ತು ಲಸಿಕೆ ಸಲಹೆಗಳು',
    childHelplineTitle: 'ಮಕ್ಕಳ ಸಹಾಯವಾಣಿ (1098)',
    childHelplineDesc: 'ಮಕ್ಕಳ ರಕ್ಷಣೆ ಮತ್ತು ಸುಕನ್ಯಾ ಮಾಹಿತಿ',
    repeatAudio: 'ಮತ್ತೆ ಕೇಳಿ',
    sakhiSpeaking: 'ಸಖಿ ಮಾತನಾಡುತ್ತಿದೆ...',
    playingInfoAudio: 'ಮಾಹಿತಿಯನ್ನು ಧ್ವನಿಯಲ್ಲಿ ತಿಳಿಸಲಾಗುತ್ತಿದೆ',
    askSakhiFloating: 'ಸಖಿಯನ್ನು ಕೇಳಿ',
    footerLine1: 'ಸಖಿ (Sakhi) · ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರ ಡಿಜಿಟಲ್ ಸಂಗಾತಿ',
    footerLine2: 'ಎಲ್ಲಾ ಸರಕಾರಿ ಯೋಜನೆಗಳ ಮಾಹಿತಿ ಸಂಪೂರ್ಣ ಉಚಿತ',
    typeQueryPrompt: 'ಟೈಪ್ ಮಾಡಿ ಕೇಳಬೇಕೆ? ಇಲ್ಲಿ ಒತ್ತಿ',
    typePlaceholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ... (ಉದಾ: ಹೊಲಿಗೆ ಯಂತ್ರ)',
    askButton: 'ಕೇಳಿ',
    schemePurpose: 'ಯೋಜನೆಯ ಉದ್ದೇಶ',
    primaryBenefit: 'ಮುಖ್ಯ ಪ್ರಯೋಜನ',
    officialHelpline: 'ಸರಕಾರಿ ಸಹಾಯವಾಣಿ',
    nextEligibility: 'ಮುಂದೆ: ನೀವು ಅರ್ಹರೇ?',
    eligibilitySubtitle: 'ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ ನಿಮ್ಮ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ:',
    listenQuestions: 'ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ',
    nextDocs: 'ಮುಂದೆ: ಬೇಕಾಗುವ ದಾಖಲೆಗಳು',
    docsSubtitle: 'ನಿಮ್ಮ ಬಳಿ ಇರುವ ದಾಖಲೆಗಳಿಗೆ ಟಿಕ್ ಮಾಡಿ:',
    ifNotHave: 'ಇಲ್ಲದಿದ್ದರೆ:',
    readyWithYou: '✓ ನಿಮ್ಮ ಬಳಿ ಇದೆ',
    tapToTick: 'ಟಿಕ್ ಮಾಡಲು ಸ್ಪರ್ಶಿಸಿ',
    nextSteps: 'ಮುಂದೆ: ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?',
    stepsSubtitle: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸರಳ ಹಂತಗಳು:',
    nextCounterSpeech: 'ಮುಂದೆ: ಅಧಿಕಾರಿಗೆ ಏನು ಹೇಳಬೇಕು?',
    speakWithConfidence: 'ಧೈರ್ಯವಾಗಿ ಮಾತನಾಡಿ',
    counterSpeechDescription: 'ಕಚೇರಿಯಲ್ಲಿ ಮಾತನಾಡಲು ಮುಜುಗರವಿದ್ದರೆ, ಧ್ವನಿ ಹೆಚ್ಚಿಸಿ ಹಸಿರು ಬಟನ್ ಒತ್ತಿ. ನಿಮ್ಮ ಫೋನ್ ಮಾತನಾಡುತ್ತದೆ:',
    makeSlip: 'ಚೀಟಿ ರಚಿಸಿ',
    docsCountReady: 'ಸಿದ್ಧ',
    applicantNameLabel: 'ನಿಮ್ಮ ಹೆಸರು:',
    applicantNamePlaceholder: 'ಉದಾ: ರೂಪಾ ದೇವಿ',
    villageLabel: 'ಗ್ರಾಮ:',
    villagePlaceholder: 'ಉದಾ: ಮಲ್ಲಾಪುರ',
    tokenLabel: 'ಟೋಕನ್ ಸಂಖ್ಯೆ / Token ID',
    dateLabel: 'ದಿನಾಂಕ / Date',
    counterOfficerNotice: 'ಅಧಿಕಾರಿಗೆ ವಿನಂತಿ: ದಯವಿಟ್ಟು ಈ ಸಹೋದರಿಗೆ ಉಚಿತವಾಗಿ ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಹಾಯ ಮಾಡಿ.',
    slipPassTitle: 'ಸರಕಾರಿ ಸೇವಾ ಅರ್ಜಿ ಚೀಟಿ',
    slipPassSubtitle: '(ಅಂಗನವಾಡಿ ಅಥವಾ ಕೇಂದ್ರದಲ್ಲಿ ತೋರಿಸಿ)',
    docStatusLabel: 'ದಾಖಲೆಗಳ ಸ್ಥಿತಿ:',
    readyStatus: '✓ ಸಿದ್ಧ',
    requiredStatus: 'ಅಗತ್ಯ',

    docsSummaryBadge: 'ಮುಖ್ಯ ದಾಖಲೆಗಳು ಬೇಕು (ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್)',
    sakhiThinking: 'ಸಖಿ ಯೋಚಿಸುತ್ತಿದೆ... (ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ)',
    micPermissionError: 'ಮೈಕ್ ಅನುಮತಿ ಸಿಕ್ಕಿಲ್ಲ. ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮೈಕ್ ಆನ್ ಮಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ ಕೇಳಿ.',
    aiGuidanceTitle: 'ಸಖಿ ಮಾರ್ಗದರ್ಶಿ (AI Guidance)',
    aiGuidanceSubtitle: 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಸಂಪೂರ್ಣ ಸರಕಾರಿ ಮಾಹಿತಿ',
    aiCheckingRules: 'ಸಖಿ ಸರಕಾರಿ ನಿಯಮಗಳು ಮತ್ತು ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಿದೆ...',
    aiPleaseWait: '(ದಯವಿಟ್ಟು 1-2 ಸೆಕೆಂಡು ಕಾಯಿರಿ)',
    sorrySister: 'ಕ್ಷಮಿಸಿ ಸಹೋದರಿ!',
    schemeLabel: 'ಯೋಜನೆ:',
    askMorePlaceholder: 'ಇನ್ನೂ ಏನಾದರೂ ಕೇಳಬೇಕೇ? ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
    prevButton: 'ಹಿಂದಿನದು',
    nextButton: 'ಮುಂದಿನದು',
    startUsingButton: 'ಪ್ರಾರಂಭಿಸಿ',
    walkthroughListen: 'ಈ ಸೂಚನೆಗಳನ್ನು ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ',
    walkthroughSlides: [
      {
        title: '1. ಬರೆಯುವ ಅಗತ್ಯವಿಲ್ಲ - ನೇರವಾಗಿ ಮಾತನಾಡಿ',
        desc: 'ದೊಡ್ಡ ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ನಿಮಗೆ ಏನು ಸಹಾಯ ಬೇಕು ಎಂದು ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ.',
        audioScript: 'ನಮಸ್ಕಾರ ಸಹೋದರಿ. ಬರೆಯುವ ಅಗತ್ಯವಿಲ್ಲ. ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ನೇರವಾಗಿ ಮಾತನಾಡಿ.',
      },
      {
        title: '2. ಚಿತ್ರಗಳನ್ನು ಸ್ಪರ್ಶಿಸಿ ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ',
        desc: 'ಯಾವುದೇ ಕಾರ್ಡ್‌ನಲ್ಲಿರುವ ಸ್ಪೀಕರ್ ಬಟನ್ ಒತ್ತಿದರೆ ಫೋನ್ ಎಲ್ಲವನ್ನೂ ಓದಿ ಹೇಳುತ್ತದೆ.',
        audioScript: 'ಓದಲು ಕಷ್ಟವಾದರೆ ಸ್ಪೀಕರ್ ಬಟನ್ ಒತ್ತಿ. ಫೋನ್ ಸಂಪೂರ್ಣವಾಗಿ ಓದಿ ಹೇಳುತ್ತದೆ.',
      },
      {
        title: '3. ಕಚೇರಿಯಲ್ಲಿ ಫೋನ್ ಮಾತನಾಡಲಿ',
        desc: 'ಅಂಗನವಾಡಿ ಅಥವಾ ಕೇಂದ್ರದಲ್ಲಿ ಹಿಂಜರಿಯದೆ ಹಸಿರು ಬಟನ್ ಒತ್ತಿ, ಫೋನ್ ಅಧಿಕಾರಿಯೊಂದಿಗೆ ಮಾತನಾಡುತ್ತದೆ.',
        audioScript: 'ಕೌಂಟರ್‌ನಲ್ಲಿ ಹಿಂಜರಿಯಬೇಡಿ. ಹಸಿರು ಬಟನ್ ಒತ್ತಿದರೆ ಫೋನ್ ತಾನೇ ಅಧಿಕಾರಿಗೆ ತಿಳಿಸುತ್ತದೆ.',
      },
    ],
    highContrastMode: 'ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್ (ಕಡಿಮೆ ಬೆಳಕು)',
    standardContrastMode: 'ಸಾಮಾನ್ಯ ವೀಕ್ಷಣೆ',
  },

  English: {
    appTitle: 'Sakhi',
    tagline: 'Your compassionate rural government scheme companion - voice guided in your language',
    voiceButtonPrompt: 'Tap mic to speak',
    voiceListening: 'Listening... speak clearly',
    tapToSpeak: 'Tap to Speak',
    stopSpeaking: 'Stop Listening',
    voiceHelperText: 'Say for example: "How to get a free sewing machine?" or "Maternity assistance ₹5000"',
    popularQuestions: 'Or tap any quick query:',
    sampleQuestions: [
      'How to get ₹5,000 maternity assistance?',
      'Free sewing machine and ₹15,000 skill toolkit',
      'How to open ₹250 account for my daughter?',
      'Free LPG gas stove and cylinder scheme',
    ],
    schemesSectionTitle: 'Key Government Schemes',
    schemesSectionSubtitle: 'Tap any scheme to listen and understand in simple terms',
    listenScheme: 'Listen Aloud',
    viewDetails: 'View Details',
    whatYouGet: 'What will you receive?',
    whoIsEligible: 'Are you eligible? (Quick Check)',
    requiredDocs: 'Which documents are required?',
    whereToGo: 'Where to visit in your village?',
    whatToSayAtOffice: 'What to say to the officer / Didi?',
    sayToDidiButton: 'Play this speech for Anganwadi / CSC operator',
    audioPlayingNotice: 'Turn volume up and play at the government counter',
    createSlipButton: 'Generate Assistance Slip',
    askSakhiButton: 'Ask Sakhi in your language',
    howToUseApp: 'How to use this app? (Audio guide)',
    emergencyHelplines: 'Key Government Helplines',
    audioSpeedSlow: 'Slow Speech',
    audioSpeedNormal: 'Normal Speed',
    readAloud: 'Read Aloud',
    stopAudio: 'Stop Audio',
    stepNumber: 'Step',
    villageCenter: 'Location',
    whoToMeet: 'Whom to meet',
    yes: 'Yes',
    no: 'No',
    eligibleBanner: 'Congratulations sister! You appear fully eligible for this scheme.',
    slipTitle: 'Village Assistance Slip',
    slipSubtitle: 'Show this slip at the Anganwadi or CSC Center',
    showToCounter: 'Show at counter or play audio',
    printOrSave: 'Save on Phone / Take Screenshot',
    close: 'Close',

    categories: {
      all: 'All Schemes',
      maternity: 'Mother & Child (₹5000)',
      skills: 'Sewing & Skills (₹15000)',
      daughter: 'Daughter Savings (8.2%)',
      livelihood: 'Self Help Group',
      subsidy: 'Free LPG Gas',
      pension: 'Women Direct Support',
    },
    schemesAvailable: 'Schemes Available',
    safetyNoticeTitle: 'Government schemes are 100% free - Do not pay any money to anyone',
    safetyNoticeBody: 'There are no charges for registration at Anganwadi or Panchayat centers. If anyone demands money, report immediately to Helpline 181.',
    safetyAudioText: 'Government schemes are completely free. Do not give any money to middlemen. Forms are filled free of cost. Call 181 for any complaints.',
    listenSafety: 'Listen This',
    helplineFreeCall: '24x7 Toll-Free Call',
    womenHelplineTitle: 'Women in Distress Helpline (181)',
    womenHelplineDesc: 'For any emergency, safety, or scheme guidance',
    healthHelplineTitle: 'Health & ASHA Advice (104)',
    healthHelplineDesc: 'Pregnancy, immunization, and nutritional guidance',
    childHelplineTitle: 'Child Helpline (Childline 1098)',
    childHelplineDesc: 'Child safety, education, and Sukanya details',
    repeatAudio: 'Repeat Audio',
    sakhiSpeaking: 'Sakhi is speaking...',
    playingInfoAudio: 'Information is being spoken aloud',
    askSakhiFloating: 'Ask Sakhi',
    footerLine1: 'Sakhi · Empowering rural women with digital dignity and voice access',
    footerLine2: 'Zero Digital Knowledge Initiative · All scheme information is completely free',
    typeQueryPrompt: 'Prefer typing your query? Tap here',
    typePlaceholder: 'Type your question... (e.g., Sewing machine)',
    askButton: 'Ask',
    schemePurpose: 'Purpose of Scheme',
    primaryBenefit: 'Primary Benefit',
    officialHelpline: 'Official Helpline',
    nextEligibility: 'Next: Are you eligible?',
    eligibilitySubtitle: 'Answer simple questions below to verify eligibility:',
    listenQuestions: 'Listen Questions',
    nextDocs: 'Next: Required Documents',
    docsSubtitle: 'Tick the documents you currently possess:',
    ifNotHave: 'If you do not have it:',
    readyWithYou: '✓ Ready with you',
    tapToTick: 'Tap to mark as ready',
    nextSteps: 'Next: Where to visit in your village?',
    stepsSubtitle: 'Simple steps to apply in your village:',
    nextCounterSpeech: 'Next: What to say to the officer?',
    speakWithConfidence: 'Speak at the counter with confidence',
    counterSpeechDescription: 'If you feel nervous speaking at government offices, turn your phone volume up and tap the green button below. Your phone will speak politely on your behalf:',
    makeSlip: 'Create Slip',
    docsCountReady: 'Ready',
    applicantNameLabel: 'Your Name (Optional):',
    applicantNamePlaceholder: 'e.g., Rekha Devi',
    villageLabel: 'Village / Panchayat:',
    villagePlaceholder: 'e.g., Rampur',
    tokenLabel: 'Token Number / Token ID',
    dateLabel: 'Date',
    counterOfficerNotice: 'Request to Service Center Operator: Please assist this sister in submitting her online application free of charge under government welfare initiatives.',
    slipPassTitle: 'Government Welfare Service Slip',
    slipPassSubtitle: '(Show at Anganwadi or CSC Center)',
    docStatusLabel: 'Document Status:',
    readyStatus: '✓ Ready',
    requiredStatus: 'Required',

    docsSummaryBadge: 'Key documents required (Aadhaar, Bank Passbook)',
    sakhiThinking: 'Sakhi is thinking... (Finding schemes)',
    micPermissionError: 'Microphone permission not granted. Please enable microphone access in your browser or type your question below.',
    aiGuidanceTitle: 'Sakhi Advisor (AI Guidance)',
    aiGuidanceSubtitle: 'Complete government welfare information in your language',
    aiCheckingRules: 'Sakhi is verifying scheme rules and guidelines...',
    aiPleaseWait: '(Please wait 1-2 seconds)',
    sorrySister: 'Sorry sister!',
    schemeLabel: 'Scheme:',
    askMorePlaceholder: 'Want to ask anything else? Write here...',
    prevButton: 'Previous',
    nextButton: 'Next',
    startUsingButton: 'Get Started',
    walkthroughListen: 'Listen to instructions',
    walkthroughSlides: [
      {
        title: '1. No typing needed - Speak directly',
        desc: 'Tap the large round mic button and speak in your language about what help you need.',
        audioScript: 'Hello sister. There is no need to write anything. Just tap the mic button and speak in your own voice.',
      },
      {
        title: '2. Tap any picture or card to listen',
        desc: 'Every scheme card has a speaker button. Tapping it will read the information aloud.',
        audioScript: 'If you have trouble reading, do not worry. Tap the audio button and your phone will explain everything.',
      },
      {
        title: '3. Let your phone speak at the office',
        desc: 'At the Anganwadi or CSC counter, tap the green button and your phone will speak to the officer for you.',
        audioScript: 'Do not hesitate at the government office. Tap the green button and your phone will speak politely to the didi or clerk.',
      },
    ],
    highContrastMode: 'High Contrast (Low Light)',
    standardContrastMode: 'Standard View',
  },
};
