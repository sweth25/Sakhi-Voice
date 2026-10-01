import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Server-side Gemini initialization with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Comprehensive Indian welfare schemes for rural women with clear, vernacular-friendly facts
const SCHEME_KNOWLEDGE = `
You are 'Sakhi' (साखी), an elder sister figure and kind, respectful community guide helping a rural Indian woman who has never used the internet or a smartphone before.
Speak simply, with immense warmth, respect, patience, and zero technical jargon. Use common terms (e.g. 'बैंक पासबुक', 'आधार कार्ड', 'आंगनवाड़ी दीदी', 'आशा दीदी', 'जन सेवा केंद्र / CSC', 'पंचायत भवन').

Key Essential Government Schemes for Women:
1. Pradhan Mantri Matru Vandana Yojana (PMMVY / मातृ वंदना योजना):
   - Benefit: ₹5,000 for first child in 2 installments (and ₹6,000 if second child is a girl). Direct to mother's Aadhaar-seeded bank account.
   - Who gets it: Pregnant & lactating mothers aged 19+.
   - Documents: Mother & husband Aadhaar card, Mother's bank passbook (Aadhaar linked), MCP card (Mother and Child Protection card / टीका कार्ड from Anganwadi).
   - Where to go: Village Anganwadi Worker (आंगनवाड़ी कार्यकर्ता) or ASHA didi, or CSC center. Online portal: pmmvy.wcd.gov.in (can be done by Anganwadi didi).

2. Sukanya Samriddhi Yojana (SSY / सुकन्या समृद्धि योजना):
   - Benefit: Highest interest (approx 8.2%) government savings account for girl child. Save small amounts (even ₹250 a year). Tax-free, matures when girl turns 21 or for education at 18.
   - Who gets it: Any girl child under 10 years of age (opened by mother/father).
   - Documents: Girl's birth certificate (जन्म प्रमाण पत्र), Mother/Father Aadhaar card, 2 photos, address proof.
   - Where to go: Nearest Post Office (डाकघर) or any public sector bank (SBI, PNB, etc.).

3. Lakhpati Didi & NRLM Self Help Groups (लखपति दीदी / स्वयं सहायता समूह):
   - Benefit: Skill training, interest-subsidized micro-loans up to ₹1–5 lakh through SHG to start tailoring, dairy farming, poultry, spices, or handicrafts. Aim to earn ₹1,00,000+ yearly.
   - Who gets it: Any rural woman aged 18-60 interested in group savings and starting home-based business.
   - Documents: Aadhaar, Ration card, Bank passbook, Passport photos.
   - Where to go: Village Gram Panchayat / NRLM Village Organization (VO) / SHG meeting.

4. PM Vishwakarma / Free Sewing Machine & Artisan Scheme (सिलाई व दस्तकार योजना):
   - Benefit: Free 5-7 days skill training with ₹500/day stipend, certificate, free modern toolkit / sewing machine voucher worth ₹15,000, and collateral-free loan up to ₹1-2 lakh at 5% interest.
   - Who gets it: Tailors (दर्जी), weavers, craftswomen, traditional artisans.
   - Documents: Aadhaar card, Mobile linked to Aadhaar, Bank passbook, Ration card.
   - Where to go: Local CSC (जन सेवा केंद्र) or Common Service Center in the village block.

5. Pradhan Mantri Ujjwala Yojana (मुफ्त गैस कनेक्शन):
   - Benefit: Free LPG gas connection, stove, and first cylinder refill without security deposit. ₹300 subsidy per refill in bank account.
   - Who gets it: Adult woman of poor rural household without existing LPG connection (BPL/SECC/Ration card).
   - Documents: Woman's Aadhaar, Bank account passbook, Ration card with family members list.
   - Where to go: Nearest LPG Gas Distributor agency (Indane, Bharatgas, HP) or CSC.

6. Mukhyamantri Mahila Samman / State Support (Ladli Bahna / Majhi Ladki Bahin / Gruha Lakshmi):
   - Benefit: Monthly direct cash transfer (₹1,000 to ₹1,500/month) directly deposited into mother's account for dignity and nutritional freedom.
   - Who gets it: Resident women aged 21-65 from low/middle income households.
   - Documents: Aadhaar card with mobile link, DBT enabled active Bank account.
   - Where to go: Gram Panchayat camp, Anganwadi, or ward office.
`;

// API: Process voice/text query in vernacular and return structured compassionate guide
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, language = 'Hindi', currentScheme = null, audioRequested = false } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `
${SCHEME_KNOWLEDGE}

You must answer in the user's requested language (${language}). If the user wrote or spoke in Romanized Hindi/dialect, reply in the clean native script of ${language} (e.g. Devanagari for Hindi, Tamil script for Tamil, etc.).
Keep sentences short, comforting, and clear enough to be read aloud or understood easily.
Always structure the JSON response exactly as follows:
{
  "greeting": "A warm, 1-sentence respectful greeting addressing her as sister/Didi",
  "matchedSchemeId": "One exact scheme ID matching the recommendation from: 'pmmvy' | 'pm_vishwakarma' | 'sukanya_samriddhi' | 'lakhpati_didi' | 'pm_ujjwala' | 'ladli_bahna'",
  "identifiedScheme": "Name of the scheme in simple everyday terms (e.g., 'मातृ वंदना योजना (₹5,000 मातृत्व सहायता)')",
  "schemeSummary": "2-3 short, clear sentences explaining what benefit she will get and how it helps her.",
  "cashBenefit": "Clear amount or direct benefit, e.g. '₹5,000 सीधे आपके बैंक खाते में' or 'मुफ्त गैस चूल्हा व सिलेंडर'",
  "eligibilityCheck": [
    "Short simple question 1 (e.g. क्या आपकी उम्र 19 साल से अधिक है?)",
    "Short simple question 2 (e.g. क्या यह आपका पहला या दूसरा बच्चा है?)"
  ],
  "requiredDocuments": [
    {
      "name": "आधार कार्ड (Aadhaar Card)",
      "simpleDesc": "आपका और आपके पति का आधार कार्ड",
      "iconType": "id_card"
    },
    {
      "name": "बैंक पासबुक (Bank Passbook)",
      "simpleDesc": "आपके नाम का खाता जिसमें पैसे आएंगे",
      "iconType": "bank_book"
    },
    {
      "name": "आंगनवाड़ी कार्ड / पर्ची (MCP Card)",
      "simpleDesc": "टीकाकरण और जांच का कार्ड जो आशा दीदी देती हैं",
      "iconType": "health_card"
    }
  ],
  "whereToGo": {
    "primaryPlace": "गाँव की आंगनवाड़ी या आशा दीदी के पास",
    "secondaryPlace": "नजदीकी जन सेवा केंद्र (CSC) या डाकघर",
    "whatToSay": "नमस्ते दीदी, मुझे मातृ वंदना योजना के तहत आवेदन करना है। यह मेरे कागज़ हैं, कृपया मेरा फॉर्म भर दीजिए।"
  },
  "voiceScript": "A warm, natural 3-4 sentence spoken script that will be read aloud to her. Friendly, slow-paced, and reassuring. Do NOT use bullet symbols or formatting characters here, only natural spoken words.",
  "encouragement": "एक छोटा सा भरोसा देने वाला वाक्य, जैसे: 'घबराएं नहीं, यह आपका अधिकार है। आंगनवाड़ी दीदी आपकी पूरी मदद करेंगी।'"
}
`;

    const promptText = `User Query: "${message}"\nActive Scheme Selected: ${currentScheme ? JSON.stringify(currentScheme) : 'None yet'}\nLanguage to respond in: ${language}\nPlease output strictly valid JSON matching the schema.`;

    let responseText = '';

    // Step 1: Try primary model gemini-3.8-flash
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });
      responseText = response.text || '';
    } catch (primaryErr: any) {
      console.warn('gemini-3.8-flash returned error or 503, attempting gemini-3.1-flash-lite fallback:', primaryErr?.message);
      // Step 2: Try fallback model gemini-3.1-flash-lite
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: promptText,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });
        responseText = fallbackResponse.text || '';
      } catch (fallbackErr: any) {
        console.warn('Fallback model also unavailable, activating curated scheme guidance fallback:', fallbackErr?.message);
        // Step 3: Reliable local knowledge fallback
        const curated = getCuratedSchemeResponse(message, language);
        return res.json({
          success: true,
          data: curated,
        });
      }
    }

    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    // Synthesize response audio using Gemini voice so response voice matches welcoming voice
    const voiceScriptToSpeak = parsedData.voiceScript || parsedData.schemeSummary || '';
    const speechResult = await generateGeminiSpeech(voiceScriptToSpeak, language);

    res.json({
      success: true,
      data: parsedData,
      audioBase64: speechResult.audioBase64,
      mimeType: speechResult.mimeType,
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat, using curated guidance fallback:', error);
    const lang = req.body.language || 'Hindi';
    const curated = getCuratedSchemeResponse(req.body.message || '', lang);
    const speechResult = await generateGeminiSpeech(curated.voiceScript || '', lang);
    res.json({
      success: true,
      data: curated,
      audioBase64: speechResult.audioBase64,
      mimeType: speechResult.mimeType,
    });
  }
});

// Helper for offline / high-demand fallback across the 5 supported languages
function getCuratedSchemeResponse(query: string, language: string) {
  const q = (query || '').toLowerCase();
  const lang = language as 'Tamil' | 'Hindi' | 'English' | 'Telugu' | 'Kannada';

  // 1. Sewing Machine / Tailoring / PM Vishwakarma
  if (
    q.includes('सिलाई') || q.includes('मशीन') || q.includes('दर्जी') ||
    q.includes('தையல்') || q.includes('மெஷின்') ||
    q.includes('కుట్టు') || q.includes('మిషన్') ||
    q.includes('ಹೊಲಿಗೆ') || q.includes('ಯಂತ್ರ') ||
    q.includes('tailor') || q.includes('sewing') || q.includes('skill')
  ) {
    if (lang === 'Tamil') {
      return {
        greeting: "வணக்கம் சகோதரி! இலவச தையல் இயந்திர திட்டத்தில் நான் வழிகாட்டுகிறேன்.",
        matchedSchemeId: "pm_vishwakarma",
        identifiedScheme: "பிரதம மந்திரி விஸ்வகர்மா - இலவச தையல் இயந்திரம் & பயிற்சி திட்டம்",
        schemeSummary: "தையல் தொழில் செய்யும் பெண்களுக்கு அரசு 5 நாட்கள் இலவச பயிற்சி, நாள் ஒன்றுக்கு ₹500 உதவித்தொகை மற்றும் ₹15,000 தையல் இயந்திர வவுச்சர் வழங்குகிறது.",
        cashBenefit: "₹15,000 இலவச தையல் இயந்திர வவுச்சர் + ₹2,500 பயிற்சி உதவித்தொகை",
        eligibilityCheck: [
          "உங்கள் வயது 18 அல்லது அதற்கு மேற்பட்டதா?",
          "தையல் வேலை செய்கிறீர்களா அல்லது புதிதாக கற்க விரும்புகிறீர்களா?",
          "ஆதார் எண்ணுடன் தொலைபேசி எண் இணைக்கப்பட்டுள்ளதா?"
        ],
        requiredDocuments: [
          { name: "ஆதார் அட்டை (Aadhaar Card)", simpleDesc: "மொபைல் எண் இணைக்கப்பட்டது", iconType: "id_card" },
          { name: "வங்கி பாஸ்புக் (Bank Passbook)", simpleDesc: "பயிற்சி உதவித்தொகை வர", iconType: "bank_book" },
          { name: "ரேஷன் அட்டை (Ration Card)", simpleDesc: "குடும்ப அடையாளம்", iconType: "ration_card" }
        ],
        whereToGo: {
          primaryPlace: "கிராம சேவை மையம் (CSC / e-Sevai) செல்லவும்",
          secondaryPlace: "பஞ்சாயத்து அலுவலகம்",
          whatToSay: "வணக்கம், பிஎம் விஸ்வகர்மா தையல் திட்டத்தில் விண்ணப்பிக்க வந்துள்ளேன். என் ஆவணங்களை சரிபார்க்கவும்."
        },
        voiceScript: "வணக்கம் சகோதரி! தையல் இயந்திரம் பெற பிஎம் விஸ்வகர்மா திட்டத்தில் விண்ணப்பிக்கலாம். இதில் 5 நாள் இலவச பயிற்சி, நாள் ஒன்றுக்கு ₹500 மற்றும் புதிய தையல் இயந்திரம் வாங்க ₹15,000 வவுச்சர் கிடைக்கும். அருகில் உள்ள இ-சேவை மையத்தை அணுகவும்.",
        encouragement: "தயங்க வேண்டாம் சகோதரி, இது முற்றிலும் இலவசம்."
      };
    }
    if (lang === 'Telugu') {
      return {
        greeting: "నమస్కారం సోదరి! కుట్టు మిషన్ పథకం వివరాలలో నేను మీకు సాయం చేస్తాను.",
        matchedSchemeId: "pm_vishwakarma",
        identifiedScheme: "పీఎం విశ్వకర్మ - ఉచిత కుట్టు మిషన్ & ₹15,000 టూల్‌కిట్ పథకం",
        schemeSummary: "కుట్టుపని చేసే లేదా నేర్చుకోవాలనుకునే మహిళలకు ప్రభుత్వం 5 రోజుల ఉచిత శిక్షణ, రోజుకు ₹500 స్టైఫండ్ మరియు కొత్త కుట్టుమిషన్ కోసం ₹15,000 వోచర్ ఇస్తుంది.",
        cashBenefit: "₹15,000 ఉచిత కుట్టుమిషన్ వోచర్ + ₹2,500 శిక్షణ స్టైఫండ్",
        eligibilityCheck: [
          "మీ వయస్సు 18 సంవత్సరాలు దాటిందా?",
          "మీరు కుట్టుపని చేస్తారా లేదా నేర్చుకోవాలనుకుంటున్నారా?",
          "ఆధార్ కార్డుతో మొబైల్ నంబర్ లింక్ అయి ఉందా?"
        ],
        requiredDocuments: [
          { name: "ఆధార్ కార్డు (Aadhaar Card)", simpleDesc: "మొబైల్ లింక్ అయిన ఆధార్", iconType: "id_card" },
          { name: "బ్యాంక్ పాస్‌బుక్ (Bank Passbook)", simpleDesc: "స్టైఫండ్ జమ అయ్యేందుకు", iconType: "bank_book" },
          { name: "రేషన్ కార్డు (Ration Card)", simpleDesc: "కుటుంబ గుర్తింపు కార్డు", iconType: "ration_card" }
        ],
        whereToGo: {
          primaryPlace: "గ్రామ సచివాలయం లేదా సీఎస్‌సీ (CSC) కేంద్రం",
          secondaryPlace: "నైపుణ్య అభివృద్ధి కేంద్రం",
          whatToSay: "నమస్తే అన్నయ్య, పీఎం విశ్వకర్మ కుట్టుమిషన్ స్కీమ్ కింద దరఖాస్తు చేసుకోవాలి. ఇవి నా కాగితాలు."
        },
        voiceScript: "నమస్కారం సోదరి! ఉచిత కుట్టు మిషన్ కోసం పీఎం విశ్వకర్మ పథకంలో దరఖాస్తు చేయండి. మీకు ఐదు రోజుల ఉచిత శిక్షణ, రోజూ ఐదు వందల రూపాయల భత్యం మరియు కొత్త కుట్టుమిషన్ కోసం పదిహేను వేల రూపాయల వోచర్ లభిస్తుంది. మీ గ్రామ కేంద్రానికి వెళ్లండి.",
        encouragement: "ధైర్యంగా ముందుకు రండి సోదరి, ఇది మీ హక్కు."
      };
    }
    if (lang === 'Kannada') {
      return {
        greeting: "ನಮಸ್ಕಾರ ಸಹೋದರಿ! ಹೊಲಿಗೆ ಯಂತ್ರ ಯೋಜನೆಯಲ್ಲಿ ನಾನು ನಿಮಗೆ ಸಂಪೂರ್ಣ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
        matchedSchemeId: "pm_vishwakarma",
        identifiedScheme: "ಪಿಎಂ ವಿಶ್ವಕರ್ಮ - ಉಚಿತ ಹೊಲಿಗೆ ಯಂತ್ರ ಮತ್ತು ₹೧೫,೦೦೦ ಟೂಲ್‌ಕಿಟ್ ಯೋಜನೆ",
        schemeSummary: "ಹೊಲಿಗೆ ಕೆಲಸ ಮಾಡುವ ಅಥವಾ ಕಲಿಯುವ ಮಹಿಳೆಯರಿಗೆ ೫ ದಿನ ಉಚಿತ ತರಬೇತಿ, ದಿನಕ್ಕೆ ₹೫೦೦ ಭತ್ಯೆ ಮತ್ತು ಹೊಸ ಹೊಲಿಗೆ ಯಂತ್ರಕ್ಕಾಗಿ ₹೧೫,೦೦೦ ವೋಚರ್ ನೀಡಲಾಗುತ್ತದೆ.",
        cashBenefit: "₹೧೫,೦೦೦ ಮೌಲ್ಯದ ಹೊಲಿಗೆ ಯಂತ್ರ ವೋಚರ್ + ₹೨,೫೦೦ ತರಬೇತಿ ಭತ್ಯೆ",
        eligibilityCheck: [
          "ನಿಮ್ಮ ವಯಸ್ಸು ೧೮ ವರ್ಷ ಮೇಲ್ಪಟ್ಟಿದೆಯೇ?",
          "ನೀವು ಹೊಲಿಗೆ ಕಲಿಯಲು ಬಯಸುವಿರಾ?",
          "ಆಧಾರ್ ಜೊತೆ ಮೊಬೈಲ್ ಲಿಂಕ್ ಆಗಿದೆಯೇ?"
        ],
        requiredDocuments: [
          { name: "ಆಧಾರ್ ಕಾರ್ಡ್", simpleDesc: "ಮೊಬೈಲ್ ಲಿಂಕ್ ಆದ ಆಧಾರ್", iconType: "id_card" },
          { name: "ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್", simpleDesc: "ಭತ್ಯೆ ಬರುವ ಖಾತೆ", iconType: "bank_book" },
          { name: "ರೇಷನ್ ಕಾರ್ಡ್", simpleDesc: "ಕುಟುಂಬ ಗುರುತು", iconType: "ration_card" }
        ],
        whereToGo: {
          primaryPlace: "ಗ್ರಾಮ ಒನ್ ಅಥವಾ ಸಿಎಸ್‌ಸಿ (CSC) ಕೇಂದ್ರ",
          secondaryPlace: "ಗ್ರಾಮ ಪಂಚಾಯತ್ ಕಚೇರಿ",
          whatToSay: "ನಮಸ್ಕಾರ ಅಣ್ಣ, ಪಿಎಂ ವಿಶ್ವಕರ್ಮ ಹೊಲಿಗೆ ಯೋಜನೆಯಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಕು. ಇವು ನನ್ನ ದಾಖಲೆಗಳು."
        },
        voiceScript: "ನಮಸ್ಕಾರ ಸಹೋದರಿ! ಹೊಲಿಗೆ ಯಂತ್ರಕ್ಕಾಗಿ ಪಿಎಂ ವಿಶ್ವಕರ್ಮ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ. ಸರಕಾರ ೫ ದಿನ ಉಚಿತ ತರಬೇತಿ, ದಿನಕ್ಕೆ ಐನೂರು ರೂಪಾಯಿ ಭತ್ಯೆ ಮತ್ತು ಹೊಸ ಹೊಲಿಗೆ ಯಂತ್ರಕ್ಕಾಗಿ ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ ವೋಚರ್ ನೀಡುತ್ತದೆ. ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.",
        encouragement: "ಚಿಂತಿಸಬೇಡಿ ಸಹೋದರಿ, ಇದು ಸಂಪೂರ್ಣ ಉಚಿತವಾಗಿದೆ."
      };
    }
    if (lang === 'English') {
      return {
        greeting: "Hello sister! I am here to help you get the sewing machine scheme.",
        matchedSchemeId: "pm_vishwakarma",
        identifiedScheme: "PM Vishwakarma - Free Sewing Machine & Toolkit Scheme",
        schemeSummary: "The government provides 5 days of free training, ₹500 daily stipend, and a ₹15,000 e-voucher to purchase a brand-new sewing machine.",
        cashBenefit: "₹15,000 Sewing Machine Voucher + ₹2,500 Training Stipend",
        eligibilityCheck: [
          "Are you 18 years of age or older?",
          "Do you practice or want to learn tailoring?",
          "Is your mobile number linked to your Aadhaar card?"
        ],
        requiredDocuments: [
          { name: "Aadhaar Card", simpleDesc: "Linked with active mobile number", iconType: "id_card" },
          { name: "Bank Passbook", simpleDesc: "For receiving stipend directly", iconType: "bank_book" },
          { name: "Ration Card", simpleDesc: "Family identification proof", iconType: "ration_card" }
        ],
        whereToGo: {
          primaryPlace: "Village CSC / Common Service Center",
          secondaryPlace: "Gram Panchayat Office",
          whatToSay: "Hello, I want to apply for the PM Vishwakarma scheme in the tailoring trade. Here are my documents."
        },
        voiceScript: "Hello sister! To get a free sewing machine, apply under PM Vishwakarma. You will receive 5 days of free training, 500 rupees per day stipend, and a 15,000 rupees voucher for a new machine. Please visit your nearest CSC center.",
        encouragement: "Do not worry, this is completely free and your right."
      };
    }
    // Hindi default
    return {
      greeting: "नमस्ते बहन! मैं आपकी सिलाई मशीन योजना में पूरी मदद करूँगी।",
      matchedSchemeId: "pm_vishwakarma",
      identifiedScheme: "पीएम विश्वकर्मा - मुफ्त सिलाई मशीन व ₹15,000 टूलकिट योजना",
      schemeSummary: "सरकार सिलाई का काम करने वाली बहनों को 5 दिन की मुफ्त ट्रेनिंग, हर दिन ₹500 वजीफा और नई सिलाई मशीन खरीदने के लिए ₹15,000 का ई-वाउचर देती है।",
      cashBenefit: "₹15,000 मुफ्त सिलाई टूलकिट वाउचर + ₹2,500 ट्रेनिंग वजीफा",
      eligibilityCheck: [
        "क्या आपकी उम्र 18 वर्ष से अधिक है?",
        "क्या आप सिलाई-कढ़ाई का काम करती हैं या सीखना चाहती हैं?",
        "क्या आपके आधार कार्ड से मोबाइल नंबर जुड़ा हुआ है?"
      ],
      requiredDocuments: [
        { name: "आधार कार्ड (Aadhaar Card)", simpleDesc: "जिसमें चालू मोबाइल नंबर लिंक हो", iconType: "id_card" },
        { name: "बैंक पासबुक (Bank Passbook)", simpleDesc: "वजीफा और पैसे आने के लिए", iconType: "bank_book" },
        { name: "राशन कार्ड (Ration Card)", simpleDesc: "परिवार पहचान के लिए", iconType: "ration_card" }
      ],
      whereToGo: {
        primaryPlace: "गाँव या कस्बे के जन सेवा केंद्र (CSC Center) पर जाएं",
        secondaryPlace: "कौशल विकास केंद्र / पंचायत भवन",
        whatToSay: "नमस्ते भैया, मुझे पीएम विश्वकर्मा योजना में दर्जी (सिलाई) ट्रेड में ऑनलाइन आवेदन करना है। यह मेरे कागज़ हैं।"
      },
      voiceScript: "नमस्ते बहन! सिलाई मशीन के लिए आपको पीएम विश्वकर्मा योजना में आवेदन करना होगा। इसमें आपको पांच दिन की मुफ्त ट्रेनिंग, पच्चीस सौ रुपये वजीफा और नई सिलाई मशीन के लिए पंद्रह हजार रुपये का वाउचर मिलता है। आप अपने आधार कार्ड और बैंक पासबुक के साथ नजदीकी जन सेवा केंद्र जाएं।",
      encouragement: "घबराएं नहीं बहन, यह पूरी तरह मुफ्त है। अपने गाँव के जन सेवा केंद्र पर जाकर आज ही अंगूठा लगाकर आवेदन करें।"
    };
  }

  // 2. Maternity / Pregnancy / Baby / 5000 / PMMVY
  if (
    q.includes('गर्भवती') || q.includes('मातृ') || q.includes('बच्चे') || q.includes('5000') ||
    q.includes('கர்ப்பிணி') || q.includes('தாய்') || q.includes('மகப்பேறு') ||
    q.includes('గర్భిణీ') || q.includes('ప్రసవ') || q.includes('తల్లి') ||
    q.includes('ಗರ್ಭಿಣಿ') || q.includes('ತಾಯಿ') || q.includes('ಬಾಣಂತಿ') ||
    q.includes('maternity') || q.includes('mother') || q.includes('pregnant') || q.includes('baby')
  ) {
    if (lang === 'Tamil') {
      return {
        greeting: "வணக்கம் சகோதரி! கர்ப்பிணி தாய்மார்களுக்கான நிதி உதவி திட்டத்தில் வழிகாட்டுகிறேன்.",
        matchedSchemeId: "pmmvy",
        identifiedScheme: "பிரதம மந்திரி மாத்ரு வந்தனா திட்டம் (PMMVY - ₹5,000 உதவி)",
        schemeSummary: "முதல் குழந்தை பிறக்கும் போது சத்தான உணவுக்காக ₹5,000 இரண்டு தவணைகளில் நேரடியாக வங்கி கணக்கில் வருகிறது. இரண்டாவது பெண் குழந்தைக்கு ₹6,000 வழங்கப்படுகிறது.",
        cashBenefit: "₹5,000 நேரடியாக வங்கி கணக்கில் (2வது பெண் குழந்தைக்கு ₹6,000)",
        eligibilityCheck: [
          "உங்கள் வயது 19 அல்லது அதற்கு மேற்பட்டதா?",
          "இது உங்கள் முதல் குழந்தையா அல்லது இரண்டாவது பெண் குழந்தையா?",
          "ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு உள்ளதா?"
        ],
        requiredDocuments: [
          { name: "தாயின் ஆதார் அட்டை", simpleDesc: "உங்கள் அடையாள சான்று", iconType: "id_card" },
          { name: "வங்கி பாஸ்புக்", simpleDesc: "பணம் நேரடியாக வர", iconType: "bank_book" },
          { name: "தடுப்பூசி அட்டை (MCP Card)", simpleDesc: "அங்கன்வாடி வழங்கும் அட்டை", iconType: "health_card" }
        ],
        whereToGo: {
          primaryPlace: "கிராம அங்கன்வாடி அல்லது ஆஷா பணியாளரிடம் செல்லவும்",
          secondaryPlace: "அரசு ஆரம்ப சுகாதார நிலையம் (PHC)",
          whatToSay: "வணக்கம் அக்கா, மாத்ரு வந்தனா திட்டத்தில் பதிவு செய்ய வந்துள்ளேன். என் ஆவணங்களை பெற்றுக்கொள்ளவும்."
        },
        voiceScript: "வணக்கம் சகோதரி! மாத்ரு வந்தனா திட்டத்தின் கீழ் ₹5,000 நேரடியாக உங்கள் வங்கி கணக்கில் கிடைக்கும். ஆதார் அட்டை, வங்கி பாஸ்புக் மற்றும் தடுப்பூசி அட்டையுடன் உங்கள் அங்கன்வாடி அக்காவை சந்தியுங்கள். அவர்கள் இலவசமாக படிவம் நிரப்புவார்கள்.",
        encouragement: "இது உங்கள் அரசு உரிமை. அங்கன்வாடி சகோதரி முழு உதவி செய்வார்."
      };
    }
    return {
      greeting: "नमस्ते बहन! गर्भवती और नई माताओं के लिए सरकार पूरी मदद करती है।",
      matchedSchemeId: "pmmvy",
      identifiedScheme: "प्रधानमंत्री मातृ वंदना योजना (PMMVY - ₹5,000 सहायता)",
      schemeSummary: "पहले बच्चे के जन्म पर सरकार पौष्टिक भोजन और देखभाल के लिए ₹5,000 दो किस्तों में सीधे आपके बैंक खाते में भेजती है। यदि दूसरी संतान बेटी हो तो ₹6,000 मिलते हैं।",
      cashBenefit: "₹5,000 सीधे बैंक खाते में (दूसरी बेटी पर ₹6,000)",
      eligibilityCheck: [
        "क्या आपकी उम्र 19 वर्ष या उससे अधिक है?",
        "क्या यह आपका पहला बच्चा है या दूसरी बेटी?",
        "क्या आपका अपना आधार लिंक बैंक खाता है?"
      ],
      requiredDocuments: [
        { name: "माता का आधार कार्ड", simpleDesc: "आपकी पहचान का प्रमाण", iconType: "id_card" },
        { name: "बैंक पासबुक", simpleDesc: "जिसमें ₹5000 की किस्त आएगी", iconType: "bank_book" },
        { name: "टीका कार्ड (MCP Card)", simpleDesc: "आशा दीदी या अस्पताल से मिला कार्ड", iconType: "health_card" }
      ],
      whereToGo: {
        primaryPlace: "गाँव की आंगनवाड़ी केंद्र या आशा दीदी के पास जाएं",
        secondaryPlace: "नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC)",
        whatToSay: "नमस्ते दीदी, मुझे मातृ वंदना योजना के तहत आवेदन करना है। यह मेरे और पति के कागज़ हैं। कृपया मेरा फॉर्म भर दीजिए।"
      },
      voiceScript: "नमस्ते बहन! मातृ वंदना योजना के तहत आपको पांच हजार रुपये सीधे आपके बैंक खाते में मिलेंगे। आप अपना आधार कार्ड, बैंक पासबुक और टीका कार्ड लेकर अपने गाँव की आंगनवाड़ी या आशा दीदी से मिलें। वे आपका फॉर्म बिल्कुल मुफ्त भर देंगी।",
      encouragement: "यह आपका सरकारी अधिकार है। आंगनवाड़ी दीदी आपकी बहन की तरह पूरी मदद करेंगी।"
    };
  }

  // 3. Daughter / Girl / Sukanya / 250
  if (
    q.includes('बेटी') || q.includes('सुकन्या') ||
    q.includes('மகள்') || q.includes('பெண்') ||
    q.includes('కూతురు') || q.includes('పాప') ||
    q.includes('ಹೆಣ್ಣು') || q.includes('ಮಗಳು') ||
    q.includes('daughter') || q.includes('girl') || q.includes('sukanya') || q.includes('250')
  ) {
    return {
      greeting: "नमस्ते बहन! बेटी के भविष्य के लिए यह सबसे अच्छी सरकारी योजना है।",
      matchedSchemeId: "sukanya_samriddhi",
      identifiedScheme: "सुकन्या समृद्धि योजना (SSY - ₹250 खाता)",
      schemeSummary: "मात्र ₹250 में अपनी 10 साल से छोटी बेटी के नाम से डाकघर में खाता खोलें। सरकार इसमें सबसे ज्यादा 8.2% ब्याज देती है।",
      cashBenefit: "₹250 से खाता शुरू + सरकारी 8.2% सबसे अधिक ब्याज",
      eligibilityCheck: [
        "क्या आपकी बेटी की उम्र 10 वर्ष से कम है?",
        "क्या आपके पास बेटी का जन्म प्रमाण पत्र या अस्पताल की पर्ची है?",
        "क्या माता या पिता का आधार कार्ड मौजूद है?"
      ],
      requiredDocuments: [
        { name: "बेटी का जन्म प्रमाण पत्र", simpleDesc: "अस्पताल या पंचायत से मिला प्रमाण", iconType: "certificate" },
        { name: "माता या पिता का आधार कार्ड", simpleDesc: "अभिभावक की पहचान हेतु", iconType: "id_card" },
        { name: "पासपोर्ट साइज फोटो", simpleDesc: "बेटी और अभिभावक की 2-2 फोटो", iconType: "photo" }
      ],
      whereToGo: {
        primaryPlace: "गाँव के नजदीकी डाकघर (Post Office) में जाएं",
        secondaryPlace: "सरकारी बैंक (SBI, PNB, आदि)",
        whatToSay: "नमस्ते डाक बाबू जी, मुझे मेरी बेटी का सुकन्या समृद्धि खाता खोलना है। यह ₹250 और कागज़ हैं।"
      },
      voiceScript: "नमस्ते बहन! सुकन्या समृद्धि योजना में आप मात्र दो सौ पचास रुपये देकर डाकघर में अपनी बेटी का खाता खोल सकती हैं। इसमें सरकार सबसे ज्यादा ब्याज देती है जो बेटी के बड़े होने पर उसकी पढ़ाई और शादी के काम आएगा।",
      encouragement: "बेटी का भविष्य संवारने के लिए आज ही डाकघर जाकर खाता खोलें।"
    };
  }

  // General default guidance
  return {
    greeting: "नमस्ते बहन! मैं साखी हूँ, आपकी सरकारी योजनाओं की मददगार।",
    matchedSchemeId: "pmmvy",
    identifiedScheme: "ग्रामीण महिला कल्याण योजनाएं (साखी सहायता)",
    schemeSummary: "सरकार ग्रामीण महिलाओं के लिए मातृत्व सहायता (₹5,000), मुफ्त सिलाई मशीन (₹15,000), बेटी की बचत खाता और मुफ्त गैस कनेक्शन जैसी योजनाएं चलाती है।",
    cashBenefit: "मुफ्त सरकारी लाभ व सीधे बैंक खाते में आर्थिक सहायता",
    eligibilityCheck: [
      "क्या आप भारत की ग्रामीण निवासी हैं?",
      "क्या आपके पास आधार कार्ड और बैंक पासबुक है?",
      "क्या आपकी आयु 18 वर्ष से अधिक है?"
    ],
    requiredDocuments: [
      { name: "आधार कार्ड", simpleDesc: "पहचान व पते के लिए", iconType: "id_card" },
      { name: "बैंक पासबुक", simpleDesc: "आधार लिंक बैंक खाता", iconType: "bank_book" },
      { name: "राशन कार्ड", simpleDesc: "पारिवारिक लाभ हेतु", iconType: "ration_card" }
    ],
    whereToGo: {
      primaryPlace: "गाँव की आंगनवाड़ी या ग्राम पंचायत भवन जाएं",
      secondaryPlace: "नजदीकी जन सेवा केंद्र (CSC Center)",
      whatToSay: "नमस्ते दीदी, मुझे महिला कल्याण योजना की जानकारी और आवेदन चाहिए।"
    },
    voiceScript: "नमस्ते बहन! आप जो भी योजना चाहती हैं, जैसे सिलाई मशीन, मातृत्व सहायता या बेटी का खाता, उसके बारे में बोलकर पूछ सकती हैं। हम आपको पूरा रास्ता और कागज़ात बताएंगे।",
    encouragement: "घबराएं नहीं, हम हर कदम पर आपके साथ हैं।"
  };
}

// In-memory cache for generated Gemini TTS audio to ensure instant repeat playback & save quota
const ttsAudioCache = new Map<string, { audioBase64: string; mimeType: string }>();

// Core Gemini Speech Generator: Uses Gemini Kore voice across all welcoming & responses
async function generateGeminiSpeech(
  text: string,
  language: string = 'Hindi'
): Promise<{ audioBase64: string; mimeType: string }> {
  if (!text || typeof text !== 'string') {
    return { audioBase64: '', mimeType: 'audio/wav' };
  }

  // Clean text of markdown, asterisks, brackets, hashes, or HTML
  const cleanText = text
    .replace(/[*#_`~]/g, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    return { audioBase64: '', mimeType: 'audio/wav' };
  }

  const cacheKey = `${language}:${cleanText}`;
  if (ttsAudioCache.has(cacheKey)) {
    return ttsAudioCache.get(cacheKey)!;
  }

  // Model chain: gemini-3.1-flash-tts-preview -> gemini-2.5-flash-preview-tts -> gemini-3.8-flash-lite-tts
  const ttsModels = [
    'gemini-3.1-flash-tts-preview',
    'gemini-2.5-flash-preview-tts',
    'gemini-3.8-flash-lite-tts',
  ];

  for (const model of ttsModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [{ text: cleanText }],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const audioBase64 =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || '';
      const mimeType =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType ||
        'audio/wav';

      if (audioBase64) {
        if (ttsAudioCache.size > 250) {
          const firstKey = ttsAudioCache.keys().next().value;
          if (firstKey) ttsAudioCache.delete(firstKey);
        }
        const result = { audioBase64, mimeType };
        ttsAudioCache.set(cacheKey, result);
        return result;
      }
    } catch (err: any) {
      console.warn(`TTS model ${model} notice:`, err?.message?.slice(0, 100));
    }
  }

  return { audioBase64: '', mimeType: 'audio/wav' };
}

// API: Generate crystal-clear, natural human audio in regional language using Gemini Kore voice
app.post('/api/gemini/tts', async (req, res) => {
  try {
    const { text, language = 'Hindi' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const result = await generateGeminiSpeech(text, language);

    if (result.audioBase64) {
      return res.json({
        success: true,
        audioBase64: result.audioBase64,
        mimeType: result.mimeType,
      });
    }

    // Only if models are completely unreachable
    res.status(200).json({
      success: false,
      useWebSpeechFallback: true,
    });
  } catch (error: any) {
    console.warn('TTS handler error:', error?.message);
    res.status(200).json({
      success: false,
      useWebSpeechFallback: true,
    });
  }
});

// API: Transcribe audio from microphone using gemini-3.5-transcribe
app.post('/api/gemini/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm', language = 'Hindi' } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    const audioPart = {
      inlineData: {
        mimeType: mimeType,
        data: audioBase64,
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          {
            text: `Transcribe this rural woman's spoken voice accurately into ${language}. Provide only the transcribed spoken text without commentary. If she spoke in an Indian dialect (e.g. Bhojpuri, Rajasthani, Bundelkhandi, Haryanvi, rural Marathi, Tamil), transcribe the meaning faithfully in clean standard ${language}.`,
          },
        ],
      },
    });

    const transcript = response.text?.trim() || '';

    res.json({
      success: true,
      transcript,
    });
  } catch (error: any) {
    console.error('Audio transcription error:', error);
    res.status(500).json({
      error: 'Failed to transcribe audio',
      details: error.message || 'Unknown error',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Sakhi Voice Navigator server running on http://localhost:${PORT}`);

    // Pre-warm Gemini Kore voice cache for welcoming greetings and schemes across the app
    const PREWARM_ITEMS = [
      // Welcoming greetings
      { lang: 'Hindi', text: 'नमस्ते बहन! मैं साखी हूँ। आपकी क्या मदद करूँ?' },
      { lang: 'Tamil', text: 'வணக்கம் சகோதரி! நான் சகி. உங்களுக்கு என்ன உதவி வேண்டும்?' },
      { lang: 'Telugu', text: 'నమస్కారం సోదరి! నేను సఖిని. మీకు ఏ సహాయం కావాలి?' },
      { lang: 'Kannada', text: 'ನಮಸ್ಕಾರ ಸಹೋದರಿ! ನಾನು ಸಖಿ. ನಿಮಗೆ ಏನು ಸಹಾಯ ಬೇಕು?' },
      { lang: 'English', text: 'Hello sister! I am Sakhi. How can I help you today?' },
      // Core scheme voice scripts
      {
        lang: 'Hindi',
        text: 'नमस्ते बहन, यह योजना गर्भवती महिलाओं के लिए है। पहले बच्चे पर सरकार ₹5,000 और दूसरी बेटी होने पर ₹6,000 देती है। यह पैसा आपके बैंक खाते में सीधे आता है ताकि आप अच्छा खाना खा सकें और बच्चे की देखभाल कर सकें।',
      },
      {
        lang: 'Hindi',
        text: 'नमस्ते बहन, यदि आप सिलाई का काम करती हैं या सीखना चाहती हैं, तो सरकार आपको 5 दिन की मुफ्त ट्रेनिंग, हर दिन ₹500 वजीफा और नई सिलाई मशीन खरीदने के लिए ₹15,000 का ई-वाउचर देती है।',
      },
      {
        lang: 'Hindi',
        text: 'नमस्ते बहन, 10 साल से छोटी बेटी के नाम से डाकघर में मात्र ₹250 में खाता खोलें। इसमें सरकार सबसे ज्यादा ब्याज देती है जो बेटी के 21 साल की होने पर उसकी पढ़ाई और शादी के काम आएगा।',
      },
      {
        lang: 'Hindi',
        text: 'नमस्ते बहन, गाँव के स्वयं सहायता समूह से जुड़कर आप सिलाई, डेयरी, आचार, पापड़ या खेती का छोटा व्यवसाय शुरू कर सकती हैं। सरकार आपको ट्रेनिंग और बिना गारंटी का आसान लोन देती है।',
      },
      {
        lang: 'Hindi',
        text: 'नमस्ते बहन, यदि आपके घर में गैस सिलेंडर नहीं है, तो उज्ज्वला योजना में मुफ्त गैस कनेक्शन, चूल्हा और पहला भरा हुआ सिलेंडर मिलता है। साथ ही हर रिफिल पर सब्सिडी मिलती है।',
      },
    ];

    setTimeout(async () => {
      for (const item of PREWARM_ITEMS) {
        try {
          await generateGeminiSpeech(item.text, item.lang);
        } catch {}
      }
    }, 1000);
  });
}

startServer();
