import { Scheme, SupportedLanguage } from '../types';
import { SCHEMES } from './schemes';
import { KANNADA_SCHEMES } from './schemes_kannada';

export interface LocalizedSchemeContent {
  title: string;
  nativeTitle: string;
  tagline: string;
  cashBenefit: string;
  benefitType: string;
  shortAudioScript: string;
  eligibilityQuestions: {
    question: string;
    helperText: string;
    expectedAnswer: boolean;
  }[];
  documents: {
    id: string;
    name: string;
    nativeName: string;
    description: string;
    howToGet: string;
    photoSampleHint: string;
  }[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    actionPlace: string;
    personToMeet: string;
  }[];
  counterAudioScript: string;
}

// Translations for all 6 schemes across Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, English
export const SCHEME_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, LocalizedSchemeContent>>> = {
  pmmvy: {
    Tamil: {
      title: 'Pradhan Mantri Matru Vandana Yojana',
      nativeTitle: 'பிரதம மந்திரி மாத்ரு வந்தனா திட்டம் (தாய் & குழந்தைக்கான நிதி)',
      tagline: 'கர்ப்பிணி மற்றும் பாலூட்டும் தாய்மார்களுக்கு ஊட்டச்சத்து மற்றும் ஓய்வுக்கான அரசு நிதி உதவி',
      cashBenefit: '₹5,000 – ₹6,000 நேரடியாக வங்கி கணக்கில்',
      benefitType: '2 தவணைகளில் நேரடியாக வங்கி கணக்கில் செலுத்துதல் (DBT)',
      shortAudioScript:
        'வணக்கம் சகோதரி, இந்த திட்டம் கர்ப்பிணி பெண்களுக்கு ஆகும். முதல் குழந்தைக்கு ₹5,000 மற்றும் இரண்டாவது பெண் குழந்தைக்கு ₹6,000 அரசு தருகிறது. இந்த பணம் உங்கள் வங்கி கணக்கில் நேரடியாக வரும்.',
      eligibilityQuestions: [
        { question: 'உங்கள் வயது 19 அல்லது அதற்கு மேற்பட்டதா?', helperText: '19 வயதுக்கு மேற்பட்ட பெண்களுக்கு பொருந்தும்', expectedAnswer: true },
        { question: 'இது உங்கள் முதல் குழந்தையா அல்லது இரண்டாவது பெண் குழந்தையா?', helperText: 'முதல் குழந்தைக்கு ₹5000, 2வது பெண் குழந்தைக்கு ₹6000', expectedAnswer: true },
        { question: 'ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு உள்ளதா?', helperText: 'பணம் நேரடியாக உங்கள் வங்கி கணக்கிற்கு வரும்', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_mother', name: 'தாயின் ஆதார் அட்டை (Aadhaar Card)', nativeName: 'உங்கள் ஆதார் அட்டை', description: 'அடையாளம் மற்றும் முகவரி சான்றுக்காக.', howToGet: 'தபால் அலுவலகம் அல்லது வங்கியில் எடுக்கவும்.', photoSampleHint: '12 இலக்க எண் தெளிவாக இருக்க வேண்டும்' },
        { id: 'bank_passbook', name: 'வங்கி பாஸ்புக் (Bank Passbook)', nativeName: 'வங்கி கணக்கு புத்தகம்', description: 'உங்கள் பெயரில் உள்ள கணக்கு (ஆதார் இணைக்கப்பட்டது).', howToGet: 'அருகிலுள்ள வங்கியில் ஜீரோ பேலன்ஸ் கணக்கு தொடங்கவும்.', photoSampleHint: 'பெயர் மற்றும் கணக்கு எண் உள்ள பக்கம்' },
        { id: 'mcp_card', name: 'தடுப்பூசி அட்டை (MCP Card)', nativeName: 'தாய்-சேய் பாதுகாப்பு அட்டை', description: 'கர்ப்ப காலத்தில் ஆஷா அல்லது மருத்துவமனை தரும் அட்டை.', howToGet: 'அங்கன்வாடி அல்லது ஆஷா பணியாளரிடம் இலவசமாக பெறலாம்.', photoSampleHint: 'தடுப்பூசி தேதி பதிவான பக்கம்' },
      ],
      steps: [
        { stepNumber: 1, title: 'ஆவணங்களை தயார் செய்யுங்கள்', description: 'ஆதார் அட்டை, வங்கி பாஸ்புக் மற்றும் தடுப்பூசி அட்டையை எடுத்து வைக்கவும்.', actionPlace: 'வீட்டில்', personToMeet: 'நீங்களே' },
        { stepNumber: 2, title: 'அங்கன்வாடி மையத்திற்கு செல்லுங்கள்', description: 'அங்கன்வாடி பணியாளரை சந்தித்து மாத்ரு வந்தனா திட்ட விண்ணப்பம் கேட்கவும்.', actionPlace: 'அங்கன்வாடி மையம்', personToMeet: 'அங்கன்வாடி பணியாளர்' },
        { stepNumber: 3, title: 'இலவசமாக விண்ணப்பித்து ரசீது பெறவும்', description: 'பணியாளர் இலவசமாக இணையத்தில் விண்ணப்பித்து ரசீது தருவார்.', actionPlace: 'அங்கன்வாடி மையம்', personToMeet: 'பணியாளர்' },
      ],
      counterAudioScript: 'வணக்கம் அக்கா, எனக்கு பிரதம மந்திரி மாத்ரு வந்தனா திட்டத்தில் விண்ணப்பிக்க வேண்டும். ஆதார் அட்டை, வங்கி புத்தகம் மற்றும் தடுப்பூசி அட்டை உள்ளது. தயவுசெய்து எனது படிவத்தை பூர்த்தி செய்து ரசீது கொடுங்கள்.',
    },
    Telugu: {
      title: 'Pradhan Mantri Matru Vandana Yojana',
      nativeTitle: 'ప్రధాన మంత్రి మాతృ వందన యోజన (తల్లీ బిడ్డల ఆర్థిక సహాయం)',
      tagline: 'గర్భిణీలు మరియు పాలిచ్చే తల్లుల పోషణ కోసం ప్రభుత్వ ఆర్థిక సహాయం',
      cashBenefit: '₹5,000 – ₹6,000 నేరుగా బ్యాంక్ ఖాతాలో',
      benefitType: '2 విడతల్లో నేరుగా బ్యాంక్ ఖాతాలో జమ (DBT)',
      shortAudioScript: 'నమస్కారం సోదరి, ఈ పథకం గర్భిణీ స్త్రీల కోసం. మొదటి బిడ్డకు ₹5,000 మరియు రెండవది ఆడపిల్ల అయితే ₹6,000 ప్రభుత్వం ఇస్తుంది. మంచి ఆహారం కోసం ఈ డబ్బు నేరుగా మీ బ్యాంక్ ఖాతాలోకే వస్తుంది.',
      eligibilityQuestions: [
        { question: 'మీ వయస్సు 19 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ ఉందా?', helperText: '19 ఏళ్లు పైబడిన మహిళలకు వర్తిస్తుంది', expectedAnswer: true },
        { question: 'ఇది మీ మొదటి బిడ్డా లేదా రెండవ ఆడపిల్లనా?', helperText: 'మొదటి కాన్పుకు ₹5000, 2వ ఆడపిల్లకు ₹6000 లభిస్తుంది', expectedAnswer: true },
        { question: 'ఆధార్ లింక్ అయిన బ్యాంక్ ఖాతా ఉందా?', helperText: 'డబ్బు నేరుగా ఖాతాలోకే జమ అవుతుంది', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_mother', name: 'తల్లి ఆధార్ కార్డు (Aadhaar Card)', nativeName: 'మీ ఆధార్ కార్డు', description: 'గుర్తింపు మరియు చిరునామా కోసం.', howToGet: 'పోస్టాఫీస్ లేదా బ్యాంకులో ఆధార్ పొందవచ్చు.', photoSampleHint: '12 అంకెల నంబర్ స్పష్టంగా కనిపించాలి' },
        { id: 'bank_passbook', name: 'బ్యాంక్ పాస్‌బుక్ (Bank Passbook)', nativeName: 'మీ బ్యాంక్ పాస్‌బుక్', description: 'మీ పేరు మీద ఉన్న ఆధార్ లింక్ ఖాతా.', howToGet: 'సమీప బ్యాంకులో ఖాతా తెరవండి.', photoSampleHint: 'పేరు, ఖాతా నంబర్ ఉన్న మొదటి పేజీ' },
        { id: 'mcp_card', name: 'టీకా కార్డు / ఎంసీపీ కార్డు (MCP Card)', nativeName: 'అంగన్‌వాడీ సంరక్షణ కార్డు', description: 'గర్భధారణ సమయంలో ఆశా ఇచ్చే కార్డు.', howToGet: 'గ్రామ ఆశా లేదా అంగన్‌వాడీ వద్ద లభిస్తుంది.', photoSampleHint: 'టీకాల తేదీలు ఉన్న పేజీ' },
      ],
      steps: [
        { stepNumber: 1, title: 'పత్రాలను సిద్ధం చేసుకోండి', description: 'ఆధార్ కార్డు, బ్యాంక్ పాస్‌బుక్ మరియు టీకా కార్డు సిద్ధంగా ఉంచుకోండి.', actionPlace: 'ఇంట్లో', personToMeet: 'మీరే' },
        { stepNumber: 2, title: 'అంగన్‌వాడీ కేంద్రానికి వెళ్లండి', description: 'మాతృ వందన పథకం కోసం దరఖాస్తు చేసుకోవాలని చెప్పండి.', actionPlace: 'అంగన్‌వాడీ కేంద్రం', personToMeet: 'అంగన్‌వాడీ కార్యకర్త' },
        { stepNumber: 3, title: 'ఉచితంగా దరఖాస్తు చేసి రసీదు పొందండి', description: 'కార్యకర్త ఆన్‌లైన్‌లో ఉచితంగా దరఖాస్తు చేస్తారు. రసీదు తీసుకోండి.', actionPlace: 'అంగన్‌వాడీ కేంద్రం', personToMeet: 'కార్యకర్త' },
      ],
      counterAudioScript: 'నమస్తే అక్క, నాకు ప్రధాన మంత్రి మాతృ వందన యోజన కింద దరఖాస్తు చేయాలి. నా దగ్గర ఆధార్ కార్డు, బ్యాంక్ పాస్‌బుక్ మరియు టీకా కార్డు ఉన్నాయి. దయచేసి నా దరఖాస్తు పూర్తి చేసి రసీదు ఇవ్వండి.',
    },
    English: {
      title: 'Pradhan Mantri Matru Vandana Yojana',
      nativeTitle: 'Pradhan Mantri Matru Vandana Yojana (Maternity Support)',
      tagline: 'Direct financial assistance for nutrition and rest for pregnant and lactating mothers',
      cashBenefit: '₹5,000 – ₹6,000 directly into your bank account',
      benefitType: 'Direct Benefit Transfer (DBT) in 2 installments',
      shortAudioScript: 'Hello sister, this scheme is for pregnant women. The government provides ₹5,000 for the first child and ₹6,000 if the second child is a girl. This money comes directly into your bank account.',
      eligibilityQuestions: [
        { question: 'Are you 19 years of age or older?', helperText: 'Valid for women aged 19 and above', expectedAnswer: true },
        { question: 'Is this your first pregnancy or second girl child?', helperText: '₹5,000 for 1st child, ₹6,000 for 2nd girl child', expectedAnswer: true },
        { question: 'Do you have an Aadhaar-linked bank account in your name?', helperText: 'Benefit is transferred directly into your personal account', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_mother', name: "Mother's Aadhaar Card", nativeName: 'Your Aadhaar Card', description: 'Identity and address proof. Name must match bank account.', howToGet: 'Available at your nearest Post Office or bank.', photoSampleHint: '12-digit number clearly visible' },
        { id: 'bank_passbook', name: 'Bank Passbook', nativeName: 'Your Bank Account Passbook', description: 'Your personal single account (joint not accepted).', howToGet: 'Open a zero-balance Jan Dhan account at any bank.', photoSampleHint: 'First page showing account number and IFSC' },
        { id: 'mcp_card', name: 'Mother and Child Protection (MCP) Card', nativeName: 'Anganwadi Immunization Card', description: 'Given free by your village ASHA didi or hospital.', howToGet: 'Obtain free from your village Anganwadi worker.', photoSampleHint: 'Page showing checkup and immunization record' },
      ],
      steps: [
        { stepNumber: 1, title: 'Prepare documents at home', description: 'Collect your Aadhaar card, bank passbook, and MCP health card together.', actionPlace: 'At home', personToMeet: 'Self' },
        { stepNumber: 2, title: 'Visit your village Anganwadi center', description: 'Meet your Anganwadi worker or ASHA didi and request to apply for PMMVY.', actionPlace: 'Anganwadi Center', personToMeet: 'Anganwadi Worker (Didi)' },
        { stepNumber: 3, title: 'Free registration and receive receipt', description: 'The worker will register you online completely free of charge. Collect acknowledgment receipt.', actionPlace: 'Anganwadi Center', personToMeet: 'Operator' },
      ],
      counterAudioScript: 'Hello sister, I would like to apply for the Pradhan Mantri Matru Vandana Yojana. I have brought my Aadhaar card, bank passbook, and MCP card. Please register my form and give me an acknowledgment slip.',
    },
  },
  pm_vishwakarma: {
    Tamil: {
      title: 'PM Vishwakarma - Free Sewing Machine Scheme',
      nativeTitle: 'பிஎம் விஸ்வகர்மா - இலவச தையல் இயந்திரம் & பயிற்சி திட்டம்',
      tagline: 'தையல் தொழில் செய்யும் பெண்களுக்கு ₹15,000 டூல்கிட் மற்றும் தினசரி ₹500 உதவித்தொகை',
      cashBenefit: '₹15,000 இலவச தையல் கருவி வவுச்சர் + ₹500/நாள் உதவித்தொகை',
      benefitType: 'இலவச பயிற்சி, ₹15,000 டூல்கிட் மற்றும் பிணையில்லா கடன்',
      shortAudioScript: 'வணக்கம் சகோதரி, நீங்கள் தையல் வேலை செய்கிறீர்கள் அல்லது கற்றுக்கொள்ள விரும்புகிறீர்கள் என்றால், அரசு உங்களுக்கு 5 நாட்கள் இலவச பயிற்சி, நாளொன்றுக்கு ₹500 உதவித்தொகை மற்றும் தையல் இயந்திரம் வாங்க ₹15,000 வவுச்சர் தருகிறது.',
      eligibilityQuestions: [
        { question: 'உங்கள் வயது 18 அல்லது அதற்கு மேற்பட்டதா?', helperText: '18 வயதுக்கு மேற்பட்ட பெண்கள் விண்ணப்பிக்கலாம்', expectedAnswer: true },
        { question: 'நீங்கள் தையல் வேலை செய்கிறீர்களா அல்லது கற்க விரும்புகிறீர்களா?', helperText: 'தையல் கலைஞர் மற்றும் கைவினைஞர்களுக்கு பொருந்தும்', expectedAnswer: true },
        { question: 'மொபைல் எண் இணைக்கப்பட்ட ஆதார் அட்டை உள்ளதா?', helperText: 'ஓடிபி சரிபார்ப்புக்கு மொபைல் இணைப்பு தேவை', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'ஆதார் அட்டை (Aadhaar Card)', nativeName: 'உங்கள் ஆதார் அட்டை', description: 'மொபைல் எண் இணைக்கப்பட்ட ஆதார் அட்டை.', howToGet: 'தபால் அலுவலகத்தில் மொபைல் எண்ணை இணைக்கவும்.', photoSampleHint: 'தெளிவான நகல்' },
        { id: 'bank_passbook', name: 'வங்கி பாஸ்புக் (Bank Passbook)', nativeName: 'வங்கி கணக்கு புத்தகம்', description: 'பயிற்சி உதவித்தொகை வரும் வங்கி கணக்கு.', howToGet: 'ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு.', photoSampleHint: 'கணக்கு எண் மற்றும் IFSC குறியீடு' },
      ],
      steps: [
        { stepNumber: 1, title: 'இ-சேவை (CSC) மையத்திற்கு செல்லவும்', description: 'ஆதார், ரேஷன் அட்டை மற்றும் வங்கியுடன் இ-சேவை மையத்திற்கு செல்லவும்.', actionPlace: 'பொது சேவை மையம் (CSC)', personToMeet: 'மைய இயக்குநர்' },
        { stepNumber: 2, title: 'தையல் பிரிவில் பதிவு செய்யவும்', description: 'பிஎம் விஸ்வகர்மா தையல் பிரிவில் பதிவு செய்யுமாறு கூறவும். இது முற்றிலும் இலவசம்.', actionPlace: 'CSC மையம்', personToMeet: 'CSC ஆப்ரேட்டர்' },
        { stepNumber: 3, title: 'பயிற்சி மற்றும் தையல் இயந்திர வவுச்சர் பெறவும்', description: '5 நாள் இலவச பயிற்சி, ₹2,500 உதவித்தொகை மற்றும் ₹15,000 தையல் இயந்திர வவுச்சர் கிடைக்கும்.', actionPlace: 'பயிற்சி மையம்', personToMeet: 'பயிற்சியாளர்' },
      ],
      counterAudioScript: 'வணக்கம் அண்ணா, எனக்கு பிஎம் விஸ்வகர்மா திட்டத்தில் தையல் பிரிவில் பதிவு செய்ய வேண்டும். என்னிடம் ஆதார் அட்டை, ரேஷன் அட்டை மற்றும் வங்கி பாஸ்புக் உள்ளது. தயவுசெய்து எனது கைரேகை வைத்து பதிவு செய்து கொடுங்கள்.',
    },
    Telugu: {
      title: 'PM Vishwakarma - Free Sewing Machine Scheme',
      nativeTitle: 'పీఎం విశ్వకర్మ - ఉచిత కుట్టు మిషన్ మరియు శిక్షణ పథకం',
      tagline: 'కుట్టు పని చేసే మహిళలకు ₹15,000 టూల్‌కిట్ మరియు రోజువారీ భత్యం',
      cashBenefit: '₹15,000 ఉచిత కుట్టు మిషన్ వోచర్ + ₹500/రోజు స్టైపెండ్',
      benefitType: 'ఉచిత శిక్షణ, ₹15,000 టూల్‌కిట్ మరియు తక్కువ వడ్డీతో రుణం',
      shortAudioScript: 'నమస్కారం సోదరి, మీరు కుట్టు పని చేస్తుంటే లేదా నేర్చుకోవాలనుకుంటే, ప్రభుత్వం మీకు 5 రోజుల ఉచిత శిక్షణ, ప్రతిరోజూ ₹500 భత్యం మరియు కొత్త కుట్టు మిషన్ కోసం ₹15,000 వోచర్ ఇస్తుంది.',
      eligibilityQuestions: [
        { question: 'మీ వయస్సు 18 సంవత్సరాల కంటే ఎక్కువ ఉందా?', helperText: '18 ఏళ్లు పైబడిన మహిళలు అర్హులు', expectedAnswer: true },
        { question: 'మీరు కుట్టు పని చేస్తారా లేదా నేర్చుకోవాలనుకుంటున్నారా?', helperText: 'దర్జీలు, చేతివృత్తుల వారు అర్హులు', expectedAnswer: true },
        { question: 'ఆధార్‌తో మొబైల్ నంబర్ లింక్ అయి ఉందా?', helperText: 'ఓటీపీ వెరిఫికేషన్ కోసం మొబైల్ అవసరం', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'ఆధార్ కార్డు (Aadhaar Card)', nativeName: 'మీ ఆధార్ కార్డు', description: 'మొబైల్ నంబర్ లింక్ అయిన ఆధార్.', howToGet: 'పోస్టాఫీసులో మొబైల్ నంబర్ లింక్ చేయండి.', photoSampleHint: 'స్పష్టమైన జిరాక్స్' },
        { id: 'bank_passbook', name: 'బ్యాంక్ పాస్‌బుక్ (Bank Passbook)', nativeName: 'బ్యాంక్ ఖాతా పాస్‌బుక్', description: 'స్టైపెండ్ మరియు డబ్బు రావడానికి.', howToGet: 'ఆధార్ లింక్ బ్యాంక్ ఖాతా.', photoSampleHint: 'ఖాతా నంబర్ స్పష్టంగా కనిపించాలి' },
      ],
      steps: [
        { stepNumber: 1, title: 'మీ-సేవ / CSC కేంద్రానికి వెళ్లండి', description: 'ఆధార్, రేషన్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్‌తో వెళ్లండి.', actionPlace: 'CSC కేంద్రం', personToMeet: 'ఆపరేటర్' },
        { stepNumber: 2, title: 'దర్జీ (కుట్టు పని) విభాగంలో నమోదు చేయండి', description: 'పీఎం విశ్వకర్మలో దర్జీ ట్రేడ్ కింద ఉచితంగా నమోదు చేయమని చెప్పండి.', actionPlace: 'CSC కేంద్రం', personToMeet: 'ఆపరేటర్' },
        { stepNumber: 3, title: 'శిక్షణ మరియు కుట్టు మిషన్ వోచర్ పొందండి', description: '5 రోజుల ఉచిత శిక్షణ, ₹2,500 స్టైపెండ్ మరియు ₹15,000 వోచర్ లభిస్తుంది.', actionPlace: 'శిక్షణ కేంద్రం', personToMeet: 'అధికారులు' },
      ],
      counterAudioScript: 'నమస్తే అన్నా, నాకు పీఎం విశ్వకర్మ పథకం కింద కుట్టు మిషన్ (దర్జీ) ట్రేడ్‌లో దరఖాస్తు చేయాలి. నా దగ్గర ఆధార్, రేషన్ కార్డు, బ్యాంక్ పాస్‌బుక్ ఉన్నాయి. దయచేసి బయోమెట్రిక్ వేసి దరఖాస్తు చేయండి.',
    },
    English: {
      title: 'PM Vishwakarma - Free Sewing Machine Scheme',
      nativeTitle: 'PM Vishwakarma - Free Sewing Machine & Skill Scheme',
      tagline: '₹15,000 toolkit voucher and daily stipend for women learning or practicing tailoring',
      cashBenefit: '₹15,000 Free Sewing Toolkit Voucher + ₹500/day Stipend',
      benefitType: 'Free 5-day training, ₹15,000 toolkit voucher & collateral-free credit',
      shortAudioScript: 'Hello sister, if you do tailoring or want to learn sewing, the government provides 5 to 7 days of free training, ₹500 daily stipend, and a ₹15,000 e-voucher to purchase a brand new modern sewing machine.',
      eligibilityQuestions: [
        { question: 'Are you 18 years of age or older?', helperText: 'Eligible for women aged 18 and above', expectedAnswer: true },
        { question: 'Do you practice tailoring or wish to learn sewing skills?', helperText: 'Tailors and artisans are eligible', expectedAnswer: true },
        { question: 'Is your mobile number linked with your Aadhaar card?', helperText: 'Required for OTP biometric verification', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'Aadhaar Card', nativeName: 'Your Aadhaar Card', description: 'Aadhaar card linked with active mobile number.', howToGet: 'Link mobile at any nearby Post Office.', photoSampleHint: 'Clear photocopy' },
        { id: 'bank_passbook', name: 'Bank Passbook', nativeName: 'Bank Account Passbook', description: 'Aadhaar-seeded bank account for stipend.', howToGet: 'Any commercial or rural bank account.', photoSampleHint: 'Account number clearly visible' },
      ],
      steps: [
        { stepNumber: 1, title: 'Visit your nearest CSC Center', description: 'Take your Aadhaar card, bank passbook, and mobile phone to your local CSC.', actionPlace: 'CSC Center', personToMeet: 'CSC Operator' },
        { stepNumber: 2, title: 'Register under Tailor (Darzi) trade', description: 'Ask the operator to register you under the PM Vishwakarma Tailor trade. It is completely free.', actionPlace: 'CSC Center', personToMeet: 'Operator' },
        { stepNumber: 3, title: 'Complete training & receive voucher', description: 'Attend 5 days of free training, earn ₹2,500 stipend, and get ₹15,000 sewing machine voucher.', actionPlace: 'Training Center', personToMeet: 'Trainer' },
      ],
      counterAudioScript: 'Hello brother, I would like to register for the PM Vishwakarma Scheme under the Tailor trade for a sewing machine. I have brought my Aadhaar card, ration card, and bank passbook. Please submit my registration.',
    },
  },
  sukanya_samriddhi: {
    Tamil: {
      title: 'Sukanya Samriddhi Yojana',
      nativeTitle: 'சுகன்யா சம்ரிதி திட்டம் (பெண் குழந்தைகளுக்கான சேமிப்பு)',
      tagline: 'பெண் குழந்தைகளின் படிப்பு மற்றும் திருமணத்திற்காக அரசின் மிக உயர்ந்த 8.2% வட்டி தரும் சேமிப்பு',
      cashBenefit: '₹250 ஆரம்ப வைப்பு + அரசின் 8.2% அதிகபட்ச வட்டி',
      benefitType: 'முழு வரிவிலக்கு, அரசு உத்தரவாத சேமிப்பு, பெண் குழந்தை 21 வயதில் முழு தொகை',
      shortAudioScript: 'வணக்கம் சகோதரி, உங்கள் மகள் 10 வயதுக்கு உட்பட்டவர் என்றால், வெறும் ₹250 செலுத்தி தபால் அலுவலகத்தில் சுகன்யா சம்ரிதி கணக்கு தொடங்கலாம். இதில் அரசு அதிகபட்சமாக 8.2% வட்டி தருகிறது.',
      eligibilityQuestions: [
        { question: 'உங்கள் மகளின் வயது 10 அல்லது அதற்கு உட்பட்டதா?', helperText: 'பிறந்தது முதல் 10 வயது வரை கணக்கு தொடங்கலாம்', expectedAnswer: true },
        { question: 'மகளின் பிறப்பு சான்றிதழ் உள்ளதா?', helperText: 'வயது சரிபார்ப்புக்கு பிறப்பு சான்றிதழ் அவசியம்', expectedAnswer: true },
        { question: 'தாய் அல்லது தந்தையின் ஆதார் அட்டை உள்ளதா?', helperText: 'பெற்றோர் பாதுகாவலராக கணக்கு திறக்க வேண்டும்', expectedAnswer: true },
      ],
      documents: [
        { id: 'birth_cert', name: 'பிறப்பு சான்றிதழ் (Birth Certificate)', nativeName: 'மகளின் பிறப்பு சான்றிதழ்', description: 'பெயர் மற்றும் பிறந்த தேதி உள்ள சான்றிதழ்.', howToGet: 'கிராம பஞ்சாயத்து அல்லது மருத்துவமனையில் பெறவும்.', photoSampleHint: 'பிறந்த தேதி தெளிவாக தெரிய வேண்டும்' },
        { id: 'mother_aadhaar', name: 'தாயின் ஆதார் அட்டை', nativeName: 'பெற்றோரின் ஆதார் அட்டை', description: 'பாதுகாவலர் அடையாள சான்று.', howToGet: 'அசல் ஆதார் அட்டை.', photoSampleHint: 'தெளிவான நகல்' },
      ],
      steps: [
        { stepNumber: 1, title: 'ஆவணங்களுடன் தபால் அலுவலகம் செல்லவும்', description: 'பிறப்பு சான்றிதழ், ஆதார் அட்டை மற்றும் ₹250 எடுத்து செல்லவும்.', actionPlace: 'தபால் அலுவலகம்', personToMeet: 'தபால் அதிகாரி' },
        { stepNumber: 2, title: 'சுகன்யா சம்ரிதி படிவம் பூர்த்தி செய்யவும்', description: 'மகளின் பெயரில் கணக்கு தொடங்க படிவம் வாங்கி பூர்த்தி செய்யவும்.', actionPlace: 'தபால் கவுண்டர்', personToMeet: 'அலுவலர்' },
        { stepNumber: 3, title: 'பாஸ்புக் பெற்றுக்கொள்ளவும்', description: 'கணக்கு தொடங்கியவுடன் பாஸ்புக் கிடைக்கும்.', actionPlace: 'தபால் அலுவலகம்', personToMeet: 'அலுவலர்' },
      ],
      counterAudioScript: 'வணக்கம் தபால் அதிகாரியே, எனது மகளுக்கு சுகன்யா சம்ரிதி திட்டத்தில் கணக்கு தொடங்க வேண்டும். மகளின் பிறப்பு சான்றிதழ், எனது ஆதார் மற்றும் ₹250 உள்ளது. கணக்கு திறந்து பாஸ்புக் கொடுங்கள்.',
    },
    Telugu: {
      title: 'Sukanya Samriddhi Yojana',
      nativeTitle: 'సుకన్య సమృద్ధి యోజన (ఆడపిల్లల బంగారు భవిష్యత్ ఖాతా)',
      tagline: 'ఆడపిల్లల చదువు, పెళ్లి కోసం అత్యధిక 8.2% వడ్డీ ఇచ్చే ప్రభుత్వ పొదుపు పథకం',
      cashBenefit: '₹250 తో ఖాతా ప్రారంభం + 8.2% ప్రభుత్వ అత్యధిక వడ్డీ',
      benefitType: 'పూర్తి పన్ను మినహాయింపు, ఆడపిల్లకు 21 ఏళ్లు వచ్చేసరికి పూర్తి మొత్తం లభిస్తుంది',
      shortAudioScript: 'నమస్కారం సోదరి, మీ కుమార్తె వయస్సు 10 సంవత్సరాల లోపు ఉంటే, పోస్టాఫీసులో కేవలం ₹250 తో సుకన్య సమృద్ధి ఖాతా తెరవవచ్చు. ప్రభుత్వం ఇందులో అత్యధికంగా 8.2% వడ్డీ ఇస్తుంది.',
      eligibilityQuestions: [
        { question: 'మీ కుమార్తె వయస్సు 10 సంవత్సరాల లోపు ఉందా?', helperText: 'పుట్టినప్పటి నుండి 10 సంవత్సరాల వరకు తెరవవచ్చు', expectedAnswer: true },
        { question: 'పాప జనన ధృవీకరణ పత్రం (బర్త్ సర్టిఫికెట్) ఉందా?', helperText: 'వయస్సు ధృవీకరణ కోసం అవసరం', expectedAnswer: true },
        { question: 'తల్లి లేదా తండ్రి ఆధార్ కార్డు ఉందా?', helperText: 'సంరక్షకునిగా ఖాతా తెరవడానికి', expectedAnswer: true },
      ],
      documents: [
        { id: 'birth_cert', name: 'జనన ధృవీకరణ పత్రం (Birth Certificate)', nativeName: 'పాప బర్త్ సర్టిఫికెట్', description: 'పాప పేరు, పుట్టిన తేదీ ఉన్న పత్రం.', howToGet: 'పంచాయతీ లేదా ఆసుపత్రి నుంచి పొందండి.', photoSampleHint: 'పుట్టిన తేదీ స్పష్టంగా ఉండాలి' },
        { id: 'mother_aadhaar', name: 'తల్లి/తండ్రి ఆధార్ కార్డు', nativeName: 'తల్లి లేదా తండ్రి ఆధార్', description: 'సంరక్షకుని గుర్తింపు కోసం.', howToGet: 'ఆధార్ కార్డు జిరాక్స్.', photoSampleHint: 'స్పష్టమైన జిరాక్స్' },
      ],
      steps: [
        { stepNumber: 1, title: '₹250 తో పోస్టాఫీసుకు వెళ్లండి', description: 'బర్త్ సర్టిఫికెట్, ఆధార్ మరియు ₹250 తీసుకెళ్లండి.', actionPlace: 'పోస్టాఫీస్', personToMeet: 'పోస్ట్‌మాస్టర్' },
        { stepNumber: 2, title: 'సుకన్య సమృద్ధి ఫారం నింపండి', description: 'పాప పేరు మీద సుకన్య ఖాతా తెరవాలని ఫారం నింపండి.', actionPlace: 'కౌంటర్', personToMeet: 'క్లర్క్' },
        { stepNumber: 3, title: 'పాస్‌బుక్ తీసుకోండి', description: 'ఖాతా తెరిచిన తర్వాత మీకు పాస్‌బుక్ వస్తుంది.', actionPlace: 'పోస్టాఫీస్', personToMeet: 'పోస్ట్‌మాస్టర్' },
      ],
      counterAudioScript: 'నమస్తే పోస్ట్‌మాస్టర్ గారు, నా కుమార్తె కోసం సుకన్య సమృద్ధి యోజన ఖాతా తెరవాలి. నా దగ్గర బర్త్ సర్టిఫికెట్, ఆధార్ మరియు ₹250 ఉన్నాయి. దయచేసి ఖాతా తెరిచి పాస్‌బుక్ ఇవ్వండి.',
    },
    English: {
      title: 'Sukanya Samriddhi Yojana',
      nativeTitle: 'Sukanya Samriddhi Yojana (Daughter Savings Scheme)',
      tagline: 'Highest 8.2% government guaranteed savings account for your daughter education and marriage',
      cashBenefit: 'Open with just ₹250 + Highest 8.2% Government Interest',
      benefitType: 'Triple Tax-Free, matures when girl turns 21 or for education at 18',
      shortAudioScript: 'Hello sister, if your daughter is under 10 years old, you can open a Sukanya Samriddhi account at any post office with just ₹250. The government provides the highest interest rate of 8.2%.',
      eligibilityQuestions: [
        { question: 'Is your daughter under 10 years of age?', helperText: 'Can be opened anytime up to age 10', expectedAnswer: true },
        { question: 'Do you have your daughter birth certificate?', helperText: 'Required for age verification', expectedAnswer: true },
        { question: 'Do you have the parent Aadhaar card?', helperText: 'Parent acts as guardian', expectedAnswer: true },
      ],
      documents: [
        { id: 'birth_cert', name: "Daughter's Birth Certificate", nativeName: 'Birth Certificate', description: 'Certificate mentioning daughter name and birth date.', howToGet: 'From Panchayat secretary or hospital.', photoSampleHint: 'Date of birth clearly visible' },
        { id: 'mother_aadhaar', name: "Parent's Aadhaar Card", nativeName: 'Mother or Father Aadhaar Card', description: 'Guardian identity and address proof.', howToGet: 'Original or clear photocopy.', photoSampleHint: 'Clear photocopy' },
      ],
      steps: [
        { stepNumber: 1, title: 'Take documents and ₹250 to Post Office', description: 'Carry birth certificate, Aadhaar card, 2 photos, and ₹250 cash.', actionPlace: 'Nearest Post Office', personToMeet: 'Postmaster' },
        { stepNumber: 2, title: 'Fill application form', description: 'Request account opening form for Sukanya Samriddhi.', actionPlace: 'Post Office Counter', personToMeet: 'Counter Clerk' },
        { stepNumber: 3, title: 'Receive your Sukanya Passbook', description: 'Collect your passbook. Deposit small amounts whenever convenient.', actionPlace: 'Post Office', personToMeet: 'Postmaster' },
      ],
      counterAudioScript: 'Hello Postmaster sir, I would like to open a Sukanya Samriddhi account for my daughter. I have brought her birth certificate, my Aadhaar card, and ₹250 cash. Please open the account and give me the passbook.',
    },
  },
  lakhpati_didi: {
    Tamil: {
      title: 'Lakhpati Didi & NRLM Self Help Groups',
      nativeTitle: 'லக்பதி சகோதரி - மகளிர் சுய உதவிக்குழு & வாழ்வாதார திட்டம்',
      tagline: 'கிராமப்புற பெண்கள் குழுவாக இணைந்து தையல், பால் பண்ணை மூலம் ஆண்டுக்கு ₹1 லட்சம் வருமானம் ஈட்ட உதவி',
      cashBenefit: '₹1 முதல் 5 லட்சம் வரை குறைந்த வட்டியில் மகளிர் குழு கடன் + இலவச பயிற்சி',
      benefitType: 'கூட்டு சேமிப்பு, வணிக பயிற்சி மற்றும் பிணையில்லா கடன்',
      shortAudioScript: 'வணக்கம் சகோதரி, லக்பதி சகோதரி திட்டம் கிராமப்புற பெண்கள் சொந்த காலில் நிற்க உதவுகிறது. 10 முதல் 12 பெண்கள் சேர்ந்து மகளிர் சுய உதவிக்குழு அமைக்கலாம். அரசு பால் பண்ணை, தையல் அல்லது கடை தொடங்க குறைந்த வட்டியில் பணம் மற்றும் பயிற்சி அளிக்கிறது.',
      eligibilityQuestions: [
        { question: 'உங்கள் வயது 18 முதல் 60 வரை உள்ளதா?', helperText: 'கிராமப்புற உழைக்கும் பெண்களுக்கு பொருந்தும்', expectedAnswer: true },
        { question: 'பிற பெண்களுடன் சேர்ந்து குழுவாக வேலை செய்ய விரும்புகிறீர்களா?', helperText: 'சுய உதவி குழுவில் 10-15 பெண்கள் இருப்பார்கள்', expectedAnswer: true },
        { question: 'ஆதார் அட்டை மற்றும் ரேஷன் அட்டை உள்ளதா?', helperText: 'கிராமத்தில் வசிப்பதற்கான சான்று', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'ஆதார் அட்டை (Aadhaar Card)', nativeName: 'உங்கள் ஆதார் அட்டை', description: 'அடையாளம் மற்றும் குழு உறுப்பினர் சான்று.', howToGet: 'அசல் ஆதார் அட்டை நகல்.', photoSampleHint: 'தெளிவான நகல்' },
        { id: 'ration_card', name: 'ரேஷன் அட்டை (Ration Card)', nativeName: 'ரேஷன் அட்டை', description: 'கிராமத்தில் வசிப்பதற்கான சான்று.', howToGet: 'குடும்ப ரேஷன் அட்டை.', photoSampleHint: 'பெயர் உள்ள பக்கம்' },
      ],
      steps: [
        { stepNumber: 1, title: 'கிராம சுய உதவிக்குழு பொறுப்பாளரை சந்திக்கவும்', description: 'உங்கள் கிராமத்து குழு சகி அல்லது பஞ்சாயத்து அலுவலகத்திற்கு செல்லவும்.', actionPlace: 'பஞ்சாயத்து அலுவலகம்', personToMeet: 'குழு சகி' },
        { stepNumber: 2, title: 'சுய உதவி குழுவில் இணையவும்', description: 'மாதம் ₹50-₹100 சிறு சேமிப்புடன் குழுவில் இணையவும்.', actionPlace: 'வாராந்திர குழு கூட்டம்', personToMeet: 'குழு தலைவர்' },
        { stepNumber: 3, title: 'பயிற்சி மற்றும் வங்கி கடன் பெறவும்', description: 'தையல், பால் பண்ணை அல்லது கடைக்கு ₹1-2 லட்சம் வரை குறைந்த வட்டி கடன் பெறவும்.', actionPlace: 'வங்கி / பிடிஓ அலுவலகம்', personToMeet: 'வங்கி மேலாளர்' },
      ],
      counterAudioScript: 'வணக்கம் அக்கா, நான் கிராமத்து மகளிர் சுய உதவி குழுவில் இணைந்து லக்பதி சகோதரி திட்டத்தில் பயிற்சி பெற விரும்புகிறேன். குழுவில் எப்படி இணைவது என்று வழிகாட்டுங்கள்.',
    },
    Telugu: {
      title: 'Lakhpati Didi & NRLM Self Help Groups',
      nativeTitle: 'లక్షాధికారి దీదీ - స్వయం సహాయక సంఘాలు & జీవనోపాధి',
      tagline: 'గ్రామీణ మహిళలు వ్యాపారాలు చేసి ఏడాదికి ₹1 లక్షకు పైగా సంపాదించే పథకం',
      cashBenefit: '₹1 నుండి 5 లక్షల వరకు తక్కువ వడ్డీతో సమూహ రుణం + ఉచిత శిక్షణ',
      benefitType: 'సమూహ పొదుపు, వ్యాపార నైపుణ్యాలు, పాడి పరిశ్రమ, కుట్టు పనికి రుణం',
      shortAudioScript: 'నమస్కారం సోదరి, లక్షాధికారి దీదీ పథకం మహిళలు తమ కాళ్లపై తాము నిలబడటానికి సహాయపడుతుంది. గ్రామంలోని మహిళలు కలిసి స్వయం సహాయక సంఘం ఏర్పాటు చేసుకోవచ్చు. వ్యాపారం ప్రారంభించడానికి ప్రభుత్వం తక్కువ వడ్డీకే రుణం ఇస్తుంది.',
      eligibilityQuestions: [
        { question: 'మీ వయస్సు 18 నుండి 60 సంవత్సరాల మధ్య ఉందా?', helperText: 'పనిచేసే గ్రామీణ మహిళలు అర్హులు', expectedAnswer: true },
        { question: 'ఇతర మహిళలతో కలిసి పొదుపు లేదా పని చేయాలనుకుంటున్నారా?', helperText: 'స్వయం సహాయక సంఘంలో 10-15 మంది మహిళలు ఉంటారు', expectedAnswer: true },
        { question: 'ఆధార్ మరియు రేషన్ కార్డు ఉన్నాయా?', helperText: 'గ్రామ నివాస ధృవీకరణ', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'ఆధార్ కార్డు (Aadhaar Card)', nativeName: 'మీ ఆధార్ కార్డు', description: 'గుర్తింపు మరియు సభ్యత్వానికి.', howToGet: 'ఆధార్ కార్డు జిరాక్స్.', photoSampleHint: 'స్పష్టమైన జిరాక్స్' },
        { id: 'ration_card', name: 'రేషన్ కార్డు (Ration Card)', nativeName: 'రేషన్ కార్డు', description: 'గ్రామ నివాస రుజువు.', howToGet: 'కుటుంబ రేషన్ కార్డు.', photoSampleHint: 'పేరు ఉన్న పేజీ' },
      ],
      steps: [
        { stepNumber: 1, title: 'గ్రామ గ్రూప్ సఖిని కలవండి', description: 'మీ గ్రామ మహిళా సంఘం సఖి లేదా పంచాయతీకి వెళ్లండి.', actionPlace: 'పంచాయతీ భవనం', personToMeet: 'సమూహ సఖి' },
        { stepNumber: 2, title: 'స్వయం సహాయక సంఘంలో చేరండి', description: 'నెలకు ₹50-₹100 పొదుపుతో సంఘంలో సభ్యురాలిగా చేరండి.', actionPlace: 'సంఘం సమావేశం', personToMeet: 'సంఘం లీడర్' },
        { stepNumber: 3, title: 'నైపుణ్యాలు మరియు బ్యాంక్ రుణం పొందండి', description: 'కుట్టు, పాడి పరిశ్రమ లేదా కిరాణా దుకాణం కోసం బ్యాంక్ ద్వారా చవకైన రుణం పొందండి.', actionPlace: 'బ్యాంక్', personToMeet: 'మేనేజర్' },
      ],
      counterAudioScript: 'నమస్తే అక్క, నేను గ్రామ స్వయం సహాయక సంఘంలో చేరి లక్షాధికారి దీదీ పథకం ద్వారా జీవనోపాధి శిక్షణ పొందాలనుకుంటున్నాను. దయచేసి నేను ఎలా చేరాలో చెప్పండి.',
    },
    English: {
      title: 'Lakhpati Didi & NRLM Self Help Groups',
      nativeTitle: 'Lakhpati Didi - Women Self Help Groups & Livelihood',
      tagline: 'Empowering rural women collectives to earn over ₹1,00,000 annually through micro-enterprises',
      cashBenefit: 'Collateral-free low-interest loan up to ₹1-5 Lakh + Free Business Training',
      benefitType: 'Group savings, livelihood training in dairy, tailoring, and micro-business',
      shortAudioScript: 'Hello sister, the Lakhpati Didi scheme empowers rural women to stand on their own feet. Women form groups of 10 to 12 members. The government provides low-interest credit and training for tailoring, dairy farming, or shops.',
      eligibilityQuestions: [
        { question: 'Are you between 18 and 60 years of age?', helperText: 'Eligible for rural working-age women', expectedAnswer: true },
        { question: 'Do you want to save or work together with fellow village women?', helperText: 'SHGs consist of 10-15 women members', expectedAnswer: true },
        { question: 'Do you have an Aadhaar card and ration card?', helperText: 'Proof of village residency', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'Aadhaar Card', nativeName: 'Your Aadhaar Card', description: 'Identity and SHG membership proof.', howToGet: 'Photocopy of original Aadhaar.', photoSampleHint: 'Clear copy' },
        { id: 'ration_card', name: 'Ration Card', nativeName: 'Family Ration Card', description: 'Proof of village residence.', howToGet: 'Food and supplies department card.', photoSampleHint: 'Page with your name' },
      ],
      steps: [
        { stepNumber: 1, title: 'Meet your Village Group Sakhi', description: 'Visit your village Panchayat or meet the SHG Community Resource Person (CRP).', actionPlace: 'Gram Panchayat Bhawan', personToMeet: 'Group Sakhi' },
        { stepNumber: 2, title: 'Join a Women Self Help Group (SHG)', description: 'Participate in small monthly savings of ₹50-₹100 to begin collective fund access.', actionPlace: 'Weekly SHG meeting', personToMeet: 'SHG President' },
        { stepNumber: 3, title: 'Receive skills & bank linkage loan', description: 'Get ₹1 to ₹2 lakh subsidized credit for tailoring, poultry, dairy, or a grocery shop.', actionPlace: 'Bank / Block Office', personToMeet: 'Mission Manager' },
      ],
      counterAudioScript: 'Hello sister, I want to join the village Self Help Group and receive livelihood training under the Lakhpati Didi initiative. Please guide me on how to enroll.',
    },
  },
  pm_ujjwala: {
    Tamil: {
      title: 'Pradhan Mantri Ujjwala Yojana 2.0',
      nativeTitle: 'பிரதம மந்திரி உஜ்வாலா திட்டம் (இலவச காஸ் அடுப்பு & சிலிண்டர்)',
      tagline: 'புகையற்ற சமையல், ஆரோக்கிய வாழ்வு: ஏழை கிராமப்புற பெண்களுக்கு இலவச காஸ் இணைப்பு',
      cashBenefit: 'இலவச காஸ் சிலிண்டர் + காஸ் அடுப்பு + ₹300 மானியம்',
      benefitType: 'முன்பணம் இல்லை, இலவச அடுப்பு மற்றும் முதல் சிலிண்டர் இலவசம்',
      shortAudioScript: 'வணக்கம் சகோதரி, உஜ்வாலா திட்டத்தின் கீழ் அரசு ஏழை பெண்களுக்கு இலவச காஸ் சிலிண்டர், ரெகுலேட்டர் மற்றும் காஸ் அடுப்பு வழங்குகிறது. அடுப்பு புகையிலிருந்து விடுதலை கிடைக்கும்.',
      eligibilityQuestions: [
        { question: 'உங்கள் வயது 18 அல்லது அதற்கு மேற்பட்டதா?', helperText: 'குடும்பத்தின் வயது வந்த பெண்ணின் பெயரில் மட்டுமே இணைப்பு', expectedAnswer: true },
        { question: 'உங்கள் வீட்டில் ஏற்கனவே வேறு காஸ் இணைப்பு இல்லையா?', helperText: 'குடும்பத்தில் யாருக்கும் காஸ் இணைப்பு இருக்கக்கூடாது', expectedAnswer: true },
        { question: 'உங்களிடம் ரேஷன் அட்டை உள்ளதா?', helperText: 'ஏழை எளிய குடும்பங்களுக்கு முன்னுரிமை', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'பெண்ணின் ஆதார் அட்டை (Aadhaar Card)', nativeName: 'உங்கள் ஆதார் அட்டை', description: 'அடையாளம் மற்றும் முகவரி சான்று.', howToGet: 'அசல் ஆதார் அட்டை.', photoSampleHint: 'தெளிவான நகல்' },
        { id: 'ration_card', name: 'ரேஷன் அட்டை (Ration Card)', nativeName: 'குடும்ப அட்டை', description: 'குடும்ப உறுப்பினர்களின் பெயர் உள்ள அட்டை.', howToGet: 'உணவு வழங்கல் துறை அட்டை.', photoSampleHint: 'உறுப்பினர்கள் பட்டியல் பக்கம்' },
      ],
      steps: [
        { stepNumber: 1, title: 'காஸ் ஏஜென்சிக்கு செல்லவும்', description: 'இந்தியன், பாரத் அல்லது ஹெச்பி காஸ் ஏஜென்சிக்கு செல்லவும்.', actionPlace: 'காஸ் ஏஜென்சி அல்லது CSC', personToMeet: 'விநியோகஸ்தர்' },
        { stepNumber: 2, title: 'உஜ்வாலா 2.0 படிவம் பூர்த்தி செய்யவும்', description: 'இலவச இணைப்பு பெற விரும்புவதாக கூறி கைரேகை இ-கேஒய்சி செய்யவும்.', actionPlace: 'காஸ் ஏஜென்சி கவுண்டர்', personToMeet: 'மேலாளர்' },
        { stepNumber: 3, title: 'காஸ் அடுப்பு மற்றும் சிலிண்டர் பெறவும்', description: 'ஒப்புதலுக்கு பின் இலவச காஸ் அடுப்பு, பைப் மற்றும் சிலிண்டர் கிடைக்கும்.', actionPlace: 'காஸ் ஏஜென்சி', personToMeet: 'விநியோகஸ்தர்' },
      ],
      counterAudioScript: 'வணக்கம் அண்ணா, எனக்கு உஜ்வாலா 2.0 திட்டத்தில் இலவச காஸ் இணைப்புக்கு விண்ணப்பிக்க வேண்டும். வீட்டில் வேறு காஸ் இணைப்பு இல்லை. இது எனது ஆவணங்கள், தயவுசெய்து படிவத்தை பெற்றுக்கொள்ளுங்கள்.',
    },
    Telugu: {
      title: 'Pradhan Mantri Ujjwala Yojana 2.0',
      nativeTitle: 'ప్రధాన మంత్రి ఉజ్జ్వల యోజన (ఉచిత గ్యాస్ స్టవ్ & సిలిండర్)',
      tagline: 'పొగ నుండి విముక్తి, ఆరోగ్యకరమైన జీవితం: గ్రామీణ మహిళలకు ఉచిత గ్యాస్ కనెక్షన్',
      cashBenefit: 'ఉచిత గ్యాస్ సిలిండర్ + గ్యాస్ స్టవ్ + ₹300 రీఫిల్ సబ్సిడీ',
      benefitType: 'సెక్యూరిటీ డిపాజిట్ లేదు, ఉచిత స్టవ్ మరియు మొదటి సిలిండర్ ఉచితం',
      shortAudioScript: 'నమస్కారం సోదరి, ఉజ్జ్వల పథకం కింద ప్రభుత్వం గ్రామీణ మహిళలకు ఉచిత గ్యాస్ సిలిండర్, రెగ్యులేటర్ మరియు గ్యాస్ స్టవ్ ఇస్తుంది. పొగ వల్ల వచ్చే సమస్యలు లేకుండా త్వరగా వంట చేసుకోవచ్చు.',
      eligibilityQuestions: [
        { question: 'మీ వయస్సు 18 సంవత్సరాల కంటే ఎక్కువ ఉందా?', helperText: 'కుటుంబంలోని మహిళ పేరు మీదనే కనెక్షన్ లభిస్తుంది', expectedAnswer: true },
        { question: 'మీ ఇంట్లో ఇంతకు ముందు ఎవరికీ గ్యాస్ కనెక్షన్ లేదా?', helperText: 'కుటుంబంలో ఎవరి పేరు మీదా కనెక్షన్ ఉండకూడదు', expectedAnswer: true },
        { question: 'రేషన్ కార్డు ఉందా?', helperText: 'పేద కుటుంబాలకు ప్రాధాన్యత', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'మహిళ ఆధార్ కార్డు (Aadhaar Card)', nativeName: 'మీ ఆధార్ కార్డు', description: 'గుర్తింపు మరియు చిరునామా రుజువు.', howToGet: 'ఆధార్ కార్డు జిరాక్స్.', photoSampleHint: 'స్పష్టమైన జిరాక్స్' },
        { id: 'ration_card', name: 'రేషన్ కార్డు (Ration Card)', nativeName: 'రేషన్ కార్డు', description: 'కుటుంబ సభ్యుల పేర్లు ఉన్న రేషన్ కార్డు.', howToGet: 'ఆహార శాఖ రేషన్ కార్డు.', photoSampleHint: 'సభ్యుల జాబితా పేజీ' },
      ],
      steps: [
        { stepNumber: 1, title: 'గ్యాస్ ఏజెన్సీకి వెళ్లండి', description: 'ఇండేన్, భారత్ లేదా హెచ్‌పీ గ్యాస్ ఏజెన్సీకి వెళ్లండి.', actionPlace: 'గ్యాస్ ఏజెన్సీ', personToMeet: 'వితరణదారుడు' },
        { stepNumber: 2, title: 'ఉజ్జ్వల 2.0 ఉచిత ఫారం నింపండి', description: 'ఉచిత గ్యాస్ కనెక్షన్ కావాలని బయోమెట్రిక్ ఇ-కేవైసీ చేయించుకోండి.', actionPlace: 'కౌంటర్', personToMeet: 'మేనేజర్' },
        { stepNumber: 3, title: 'గ్యాస్ స్టవ్ మరియు సిలిండర్ పొందండి', description: 'ఫారం ఆమోదం పొందిన తర్వాత ఉచిత స్టవ్ మరియు సిలిండర్ ఇవ్వబడుతుంది.', actionPlace: 'ఏజెన్సీ', personToMeet: 'వితరణదారుడు' },
      ],
      counterAudioScript: 'నమస్తే అన్నా, నాకు ప్రధాన మంత్రి ఉజ్జ్వల యోజన 2.0 కింద ఉచిత గ్యాస్ కనెక్షన్ కోసం దరఖాస్తు చేయాలి. నా ఇంట్లో ఎటువంటి కనెక్షన్ లేదు. నా పత్రాలు ఇవి, దయచేసి దరఖాస్తు తీసుకోండి.',
    },
    English: {
      title: 'Pradhan Mantri Ujjwala Yojana 2.0',
      nativeTitle: 'Pradhan Mantri Ujjwala Yojana (Free LPG Gas Stove)',
      tagline: 'Freedom from smoke and healthy living: Free LPG gas connection and stove for rural women',
      cashBenefit: 'Free LPG Cylinder + Gas Stove + ₹300 subsidy per refill',
      benefitType: 'Zero security deposit, free gas stove, regulator, and first filled cylinder',
      shortAudioScript: 'Hello sister, under the Ujjwala scheme, the government provides rural women with a free gas cylinder, safety regulator, and gas stove. You also get ₹300 subsidy into your bank account on every cylinder refill.',
      eligibilityQuestions: [
        { question: 'Are you 18 years of age or older?', helperText: 'Connection issued in adult woman name', expectedAnswer: true },
        { question: 'Is there no existing LPG gas connection in your household?', helperText: 'No other family member must possess an LPG connection', expectedAnswer: true },
        { question: 'Do you hold a BPL Ration Card or e-Shram card?', helperText: 'Priority given to low-income rural households', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: "Woman's Aadhaar Card", nativeName: 'Your Aadhaar Card', description: 'Proof of identity and residential address.', howToGet: 'Photocopy of original Aadhaar.', photoSampleHint: 'Clear photocopy' },
        { id: 'ration_card', name: 'Ration Card', nativeName: 'Family Ration Card', description: 'Showing list of all family members.', howToGet: 'State civil supplies ration card.', photoSampleHint: 'Member list page' },
      ],
      steps: [
        { stepNumber: 1, title: 'Visit your nearest LPG Gas Agency', description: 'Go to nearest Indane, Bharatgas, or HP Gas distributor with documents.', actionPlace: 'LPG Gas Distributor', personToMeet: 'Distributor' },
        { stepNumber: 2, title: 'Submit Ujjwala 2.0 application', description: 'Request free Ujjwala connection and complete biometric e-KYC.', actionPlace: 'Agency Counter', personToMeet: 'Agency Manager' },
        { stepNumber: 3, title: 'Receive cylinder and stove at home', description: 'Upon approval, receive free gas stove, safety pipe, regulator, and filled cylinder.', actionPlace: 'Gas Agency', personToMeet: 'Distributor' },
      ],
      counterAudioScript: 'Hello brother, I would like to apply for a free LPG connection under Pradhan Mantri Ujjwala Yojana 2.0. We do not have any existing gas connection at home. Here are my documents, please submit my form.',
    },
  },
  ladli_bahna: {
    Tamil: {
      title: 'Mukhyamantri Mahila Samman / Ladli Bahna Yojana',
      nativeTitle: 'முதல்வர் மகளிர் உரிமைத் தொகை திட்டம் (மாதம் ₹1,500 உதவி)',
      tagline: 'கிராமப்புற பெண்களின் சுயமரியாதை மற்றும் செலவுகளுக்காக வங்கி கணக்கில் மாதம் ₹1,250 முதல் ₹1,500',
      cashBenefit: 'மாதம் ₹1,250 முதல் ₹1,500 நேரடியாக வங்கி கணக்கில்',
      benefitType: 'மாதாந்திர உரிமைத் தொகை, ஒவ்வொரு மாதமும் 10-ஆம் தேதி வரவு',
      shortAudioScript: 'வணக்கம் சகோதரி, இந்த திட்டம் பெண்களின் சுயமரியாதைக்காக அரசு நேரடியாக உங்கள் வங்கி கணக்கில் மாதம் ₹1,250 முதல் ₹1,500 செலுத்தும் திட்டமாகும். குடும்ப செலவு மற்றும் மருத்துவத்திற்கு இது உதவும்.',
      eligibilityQuestions: [
        { question: 'உங்கள் வயது 21 முதல் 60 வரை உள்ளதா?', helperText: '21 முதல் 60 வயது வரை உள்ள பெண்களுக்கு பொருந்தும்', expectedAnswer: true },
        { question: 'வங்கி கணக்கில் ஆதார் மற்றும் DBT இணைக்கப்பட்டுள்ளதா?', helperText: 'நேரடி வங்கி பரிமாற்றம் செயல்பட வேண்டும்', expectedAnswer: true },
        { question: 'குடும்பத்தின் ஆண்டு வருமானம் 2.5 லட்சத்திற்கு கீழ் உள்ளதா?', helperText: 'வருமான வரி செலுத்தாத குடும்பங்கள் தகுதியானவர்கள்', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'ஆதார் அட்டை (Aadhaar Card)', nativeName: 'உங்கள் ஆதார் அட்டை', description: 'பெயர் மற்றும் பிறந்த தேதி சரியான அட்டை.', howToGet: 'அசல் ஆதார் அட்டை நகல்.', photoSampleHint: 'தெளிவான நகல்' },
        { id: 'dbt_bank', name: 'DBT வங்கி பாஸ்புக்', nativeName: 'வங்கி கணக்கு புத்தகம்', description: 'ஆதார் இணைக்கப்பட்ட நேரடி வரவு வங்கி கணக்கு.', howToGet: 'வங்கியில் DBT இணைக்கவும்.', photoSampleHint: 'கணக்கு எண் பக்கம்' },
      ],
      steps: [
        { stepNumber: 1, title: 'பஞ்சாயத்து முகாமிற்கு செல்லவும்', description: 'கிராம பஞ்சாயத்து அலுவலகத்தில் நடைபெறும் முகாமிற்கு செல்லவும்.', actionPlace: 'பஞ்சாயத்து அலுவலகம்', personToMeet: 'முகாம் அலுவலர்' },
        { stepNumber: 2, title: 'இலவச இ-கேஒய்சி செய்து கொள்ளவும்', description: 'நேரடி புகைப்படம் எடுத்து ஓடிபி மூலம் விண்ணப்பம் பூர்த்தி செய்யப்படும்.', actionPlace: 'பஞ்சாயத்து முகாம்', personToMeet: 'அலுவலர்' },
        { stepNumber: 3, title: 'ரசீது பெற்று மாதம் பணம் பெறவும்', description: 'ஒப்புதலுக்கு பின் ஒவ்வொரு மாதமும் 10-ஆம் தேதி பணம் கணக்கில் வரும்.', actionPlace: 'வங்கி கணக்கு', personToMeet: 'நீங்களே' },
      ],
      counterAudioScript: 'வணக்கம் ஐயா, எனக்கு மகளிர் உரிமைத் தொகை திட்டத்தில் விண்ணப்பிக்க வேண்டும். ஆதார் அட்டை மற்றும் வங்கி பாஸ்புக் கொண்டு வந்துள்ளேன். தயவுசெய்து எனது இ-கேஒய்சி செய்து விண்ணப்பம் பதிவு செய்யவும்.',
    },
    Telugu: {
      title: 'Mukhyamantri Mahila Samman / Ladli Bahna Yojana',
      nativeTitle: 'ముఖ్యమంత్రి మహిళా గౌరవ పథకం (నెలకు ₹1,500 సహాయం)',
      tagline: 'గ్రామీణ మహిళల ఆత్మగౌరవం కోసం ప్రతి నెలా బ్యాంక్ ఖాతాలో ₹1,250 నుండి ₹1,500 జమ',
      cashBenefit: 'నెలకు ₹1,250 నుండి ₹1,500 నేరుగా బ్యాంక్ ఖాతాలో',
      benefitType: 'నెలవారీ ఆర్థిక సహాయం, ప్రతి నెలా 10వ తేదీన ఖాతాలో జమ',
      shortAudioScript: 'నమస్కారం సోదరి, ఈ పథకం మహిళల చేతి ఖర్చుల కోసం ప్రభుత్వం ప్రతి నెలా మీ బ్యాంక్ ఖాతాలో ₹1,250 నుండి ₹1,500 జమ చేస్తుంది. మీ చిన్న చిన్న అవసరాల కోసం ఎవరి ముందూ చేయి చాచాల్సిన పని ఉండదు.',
      eligibilityQuestions: [
        { question: 'మీ వయస్సు 21 నుండి 60 సంవత్సరాల మధ్య ఉందా?', helperText: '21 నుండి 60 సంవత్సరాల మహిళలు అర్హులు', expectedAnswer: true },
        { question: 'మీ బ్యాంక్ ఖాతాలో ఆధార్ మరియు DBT యాక్టివ్‌గా ఉందా?', helperText: 'ప్రభుత్వ డబ్బు నేరుగా రావడానికి DBT తప్పనిసరి', expectedAnswer: true },
        { question: 'కుటుంబ వార్షిక ఆదాయం 2.5 లక్షల లోపు ఉందా?', helperText: 'ఆదాయపు పన్ను చెల్లించని సాధారణ కుటుంబాలు అర్హులు', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'ఆధార్ కార్డు (Aadhaar Card)', nativeName: 'మీ ఆధార్ కార్డు', description: 'పేరు, పుట్టిన తేదీ సరిగా ఉన్న ఆధార్.', howToGet: 'ఆధార్ కార్డు జిరాక్స్.', photoSampleHint: 'స్పష్టమైన జిరాక్స్' },
        { id: 'dbt_bank', name: 'DBT బ్యాంక్ పాస్‌బుక్', nativeName: 'బ్యాంక్ పాస్‌బుక్', description: 'ఆధార్ లింక్ మరియు DBT ఆన్ అయిన ఖాతా.', howToGet: 'బ్యాంకులో DBT యాక్టివేట్ చేయండి.', photoSampleHint: 'ఖాతా వివరాల పేజీ' },
      ],
      steps: [
        { stepNumber: 1, title: 'గ్రామ పంచాయతీ శిబిరానికి వెళ్లండి', description: 'పంచాయతీ భవనం లేదా అంగన్‌వాడీలో జరిగే శిబిరానికి ఆధార్‌తో వెళ్లండి.', actionPlace: 'గ్రామ పంచాయతీ భవనం', personToMeet: 'పంచాయతీ కార్యదర్శి' },
        { stepNumber: 2, title: 'ఉచిత ఇ-కేవైసీ చేయించుకోండి', description: 'శిబిరంలో మీ లైవ్ ఫోటో తీసుకుని మొబైల్ ఓటీపీతో ఫారం నింపుతారు.', actionPlace: 'పంచాయతీ శిబిరం', personToMeet: 'శిబిర అధికారి' },
        { stepNumber: 3, title: 'రసీదు తీసుకుని ప్రతి నెలా డబ్బు పొందండి', description: 'దరఖాస్తు ఆమోదం తర్వాత ప్రతి నెలా 10వ తేదీన మీ ఖాతాలో డబ్బు జమ అవుతుంది.', actionPlace: 'బ్యాంక్', personToMeet: 'మీరే' },
      ],
      counterAudioScript: 'నమస్తే కార్యదర్శి గారు, నాకు ముఖ్యమంత్రి మహిళా సమ్మాన్ పథకం ఫారం నింపాలి. నా ఆధార్ కార్డు మరియు DBT లింక్ బ్యాంక్ పాస్‌బుక్ తెచ్చాను. దయచేసి నా ఇ-కేవైసీ చేసి ఫారం నమోదు చేయండి.',
    },
    English: {
      title: 'Mukhyamantri Mahila Samman / Ladli Bahna Yojana',
      nativeTitle: 'Mukhyamantri Mahila Samman Yojana (Monthly ₹1,500 Support)',
      tagline: 'Monthly direct cash transfer of ₹1,250 to ₹1,500 deposited into rural women accounts for dignity',
      cashBenefit: '₹1,250 to ₹1,500 every month directly in your bank account',
      benefitType: 'Monthly dignity allowance credited on the 10th of every month',
      shortAudioScript: 'Hello sister, this scheme provides direct cash support into the hands of women. Every month ₹1,250 to ₹1,500 is deposited into your bank account for your personal healthcare and household expenses.',
      eligibilityQuestions: [
        { question: 'Are you between 21 and 60 years of age?', helperText: 'Eligible for married/widowed/separated women aged 21-60', expectedAnswer: true },
        { question: 'Is your bank account Aadhaar and DBT active?', helperText: 'Direct Benefit Transfer (DBT) must be enabled', expectedAnswer: true },
        { question: 'Is your annual family income below 2.5 Lakh?', helperText: 'Non-income tax paying households are eligible', expectedAnswer: true },
      ],
      documents: [
        { id: 'aadhaar_card', name: 'Aadhaar Card', nativeName: 'Your Aadhaar Card', description: 'Name, birthdate, and mobile properly updated.', howToGet: 'Photocopy of original Aadhaar.', photoSampleHint: 'Clear photocopy' },
        { id: 'dbt_bank', name: 'DBT Active Bank Passbook', nativeName: 'Bank Passbook (DBT Active)', description: 'Single savings account with active DBT seeding.', howToGet: 'Visit branch and request DBT enablement.', photoSampleHint: 'Account details page' },
      ],
      steps: [
        { stepNumber: 1, title: 'Visit village Panchayat camp', description: 'Bring your Aadhaar card and mobile phone to the special enrollment camp.', actionPlace: 'Gram Panchayat Bhawan', personToMeet: 'Panchayat Secretary' },
        { stepNumber: 2, title: 'Free e-KYC and live photo capture', description: 'Your application will be submitted online with live biometric photo capture.', actionPlace: 'Camp Desk', personToMeet: 'Camp Officer' },
        { stepNumber: 3, title: 'Collect receipt and receive monthly cash', description: 'On approval, receive direct monthly deposits on the 10th of every month.', actionPlace: 'Bank Account', personToMeet: 'Self' },
      ],
      counterAudioScript: 'Hello sir, I would like to submit my application for the Mahila Samman Yojana. I have brought my Aadhaar card and DBT-linked bank passbook. Please complete my e-KYC and register my application.',
    },
  },
};

/**
 * Returns a fully localized Scheme object for the given language.
 */
export function getSchemeInLanguage(baseScheme: Scheme, language: SupportedLanguage): Scheme {
  if (language === 'Hindi') {
    return baseScheme;
  }

  let translations = SCHEME_TRANSLATIONS[baseScheme.id]?.[language];
  if (!translations && language === 'Kannada') {
    translations = KANNADA_SCHEMES[baseScheme.id];
  }

  if (!translations) {
    // If specific language translation is not yet defined, check English as neutral regional bridge
    const englishFallback = SCHEME_TRANSLATIONS[baseScheme.id]?.['English'];
    if (englishFallback) {
      return {
        ...baseScheme,
        title: englishFallback.title || baseScheme.title,
        nativeTitle: englishFallback.nativeTitle || baseScheme.nativeTitle,
        tagline: englishFallback.tagline || baseScheme.tagline,
        cashBenefit: englishFallback.cashBenefit || baseScheme.cashBenefit,
        benefitType: englishFallback.benefitType || baseScheme.benefitType,
        shortAudioScript: englishFallback.shortAudioScript || baseScheme.shortAudioScript,
        counterAudioScript: englishFallback.counterAudioScript || baseScheme.counterAudioScript,
        eligibilityQuestions: englishFallback.eligibilityQuestions || baseScheme.eligibilityQuestions,
        documents: baseScheme.documents.map((doc) => {
          const match = englishFallback.documents?.find((d) => d.id === doc.id);
          return match ? { ...doc, name: match.name, nativeName: match.nativeName, description: match.description, howToGet: match.howToGet, photoSampleHint: match.photoSampleHint } : doc;
        }),
        steps: baseScheme.steps.map((st) => {
          const match = englishFallback.steps?.find((s) => s.stepNumber === st.stepNumber);
          return match ? { ...st, title: match.title, description: match.description, actionPlace: match.actionPlace, personToMeet: match.personToMeet } : st;
        }),
      };
    }
    return baseScheme;
  }

  return {
    ...baseScheme,
    title: translations.title || baseScheme.title,
    nativeTitle: translations.nativeTitle || baseScheme.nativeTitle,
    tagline: translations.tagline || baseScheme.tagline,
    cashBenefit: translations.cashBenefit || baseScheme.cashBenefit,
    benefitType: translations.benefitType || baseScheme.benefitType,
    shortAudioScript: translations.shortAudioScript || baseScheme.shortAudioScript,
    counterAudioScript: translations.counterAudioScript || baseScheme.counterAudioScript,
    eligibilityQuestions: translations.eligibilityQuestions || baseScheme.eligibilityQuestions,
    documents: baseScheme.documents.map((doc) => {
      const match = translations.documents?.find((d) => d.id === doc.id);
      if (match) {
        return {
          ...doc,
          name: match.name,
          nativeName: match.nativeName,
          description: match.description,
          howToGet: match.howToGet,
          photoSampleHint: match.photoSampleHint,
        };
      }
      return doc;
    }),
    steps: baseScheme.steps.map((st) => {
      const match = translations.steps?.find((s) => s.stepNumber === st.stepNumber);
      if (match) {
        return {
          ...st,
          title: match.title,
          description: match.description,
          actionPlace: match.actionPlace,
          personToMeet: match.personToMeet,
        };
      }
      return st;
    }),
  };
}

/**
 * Returns all schemes localized for the specified language.
 */
export function getAllSchemesInLanguage(language: SupportedLanguage): Scheme[] {
  return SCHEMES.map((s) => getSchemeInLanguage(s, language));
}
