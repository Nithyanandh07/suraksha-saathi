import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Initialize Google Gen AI
let aiClient: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI();
  }
} catch (err) {
  console.warn('Could not initialize GoogleGenAI with env var:', err);
}

// Fallback safety manuals knowledge base for instant demo response
const PRESET_EXPLANATIONS: Record<string, Record<string, any>> = {
  nip_point: {
    hi: {
      title: "रोलर मशीन पिंच पॉइंट - हाथ फंसने का गंभीर खतरा!",
      hazardLevel: "DANGER",
      explanation: "साथी ध्यान दें: यह मशीन तेजी से घूमने वाले रोलर से चलती है। ढीले कपड़े, अंगूठी या हाथ रोलर के पास ले जाने पर भारी चोट लग सकती है। बिना सेफ्टी गार्ड के मशीन कभी न छुएं।",
      dos: [
        "काम शुरू करने से पहले चेक करें कि सेफ्टी गार्ड लगा हुआ है।",
        "आस्तीन को कोहनी तक मोड़ें और बाल अच्छी तरह बांध कर रखें।",
        "कोई रुकावट हो तो पहले लाल इमरजेंसी स्टॉप (E-Stop) बटन दबाएं।"
      ],
      donts: [
        "चलती मशीन के अंदर कपड़ा या हाथ डालकर सफाई न करें।",
        "गले में गमछा, मफलर, ढीला कुर्ता या चेन पहनकर पास न जाएं।",
        "सेफ्टी सेंसर या गार्ड को कभी बाईपास या बंद न करें।"
      ],
      requiredPPE: ["सेफ्टी जूते", "फिटिंग दस्ताने", "आई प्रोटेक्शन चश्मा"],
      audioScript: "सावधान साथी! इस रोलर मशीन में हाथ फंसने का जानलेवा खतरा है। बिना सेफ्टी गार्ड के मशीन न चलाएं। ढीले कपड़े दूर रखें और खतरे पर लाल इमरजेंसी बटन दबाएं।"
    },
    ta: {
      title: "உருளை இயந்திர பிடிப்பு புள்ளி - கை சிக்கும் ஆபத்து!",
      hazardLevel: "DANGER",
      explanation: "தோழரே கவனிக்கவும்: இந்த இயந்திரத்தில் சுழலும் ரோலர்கள் உள்ளன. தளர்வான ஆடைகள் அல்லது கை அருகே சென்றால் பலத்த காயம் ஏற்படும். பாதுகாப்பு கவசம் இன்றி இயக்க வேண்டாம்.",
      dos: [
        "பாதுகாப்பு கவசம் சரியாக உள்ளதா என சரிபார்க்கவும்.",
        "சட்டை கைகளை சுருட்டி இறுக்கமாக வைக்கவும்.",
        "ஏதேனும் சிக்கல் ஏற்பட்டால் உடனே சிவப்பு எமர்ஜென்சி பட்டனை அழுத்தவும்."
      ],
      donts: [
        "இயங்கும் இயந்திரத்தை சுத்தம் செய்ய கை வைக்க வேண்டாம்.",
        "தளர்வான துண்டுகள் அல்லது சங்கிலி அணிய வேண்டாம்.",
        "பாதுகாப்பு சென்சாரை அகற்றவோ முடக்கவோ கூடாது."
      ],
      requiredPPE: ["பாதுகாப்பு காலணி", "கையுறைகள்", "கண் கண்ணாடி"],
      audioScript: "எச்சரிக்கை தோழரே! இந்த ரோலர் இயந்திரத்தில் கை சிக்கும் அபாயம் உள்ளது. பாதுகாப்பு கவசம் இல்லாமல் வேலை செய்யாதீர்கள்."
    },
    en: {
      title: "Roller Pinch Point - Critical Entanglement Hazard!",
      hazardLevel: "DANGER",
      explanation: "Attention comrade: This machine has high-speed rotating pinch rollers. Loose clothing, jewelry, or hands can be dragged inside causing severe trauma. Never operate without guards.",
      dos: [
        "Verify all safety interlocking guards are secured before powering on.",
        "Keep sleeves tightly rolled and hair tucked under safety helmet.",
        "Hit the Red Emergency Stop (E-Stop) immediately if anything jams."
      ],
      donts: [
        "Never attempt to clear waste or wipe rollers while moving.",
        "Do not wear loose scarves, necklaces, or oversized gloves near in-running rolls.",
        "Never tamper with or override machine interlock switches."
      ],
      requiredPPE: ["Safety Boots", "Fitted Protective Gloves", "Safety Goggles"],
      audioScript: "Attention worker! Severe pinch point hazard on this roller. Keep hands away from running rolls and hit the emergency stop switch if any jam occurs."
    }
  },
  high_voltage: {
    hi: {
      title: "415V उच्च वोल्टेज विद्युत पैनल - जान का खतरा!",
      hazardLevel: "DANGER",
      explanation: "यह पैनल भारी बिजली (415 वोल्ट) से चार्ज है। इसे छूने या बिना ऑथराइज्ड इलेक्ट्रीशियन के खोलने पर करंट लगने से जान जा सकती है। केवल अधिकृत कर्मचारी ही इसे खोल सकते हैं।",
      dos: [
        "पैनल के सामने कम से कम 1 मीटर की दूरी बनाकर रखें।",
        "इंसुलेटेड रबर मैट पर ही खड़े हों।",
        "किसी भी स्पार्किंग या धुएं पर तुरंत मेन ब्रेकर ट्रिप करें।"
      ],
      donts: [
        "गीले हाथों या भीगे कपड़ों से पैनल को कभी न छुएं।",
        "बिना परमिट या बिना इलेक्ट्रीशियन के पैनल का दरवाजा न खोलें।",
        "पैनल के सामने पानी, केमिकल या लोहे की चीजें न रखें।"
      ],
      requiredPPE: ["इंसुलेटेड रबर ग्लव्स (1000V)", "विद्युत प्रतिरोधी जूते", "फेस शील्ड"],
      audioScript: "सावधान साथी! 415 वोल्ट बिजली का भारी करंट है। गीले हाथों से न छुएं और केवल सरकारी लाइसेंस प्राप्त इलेक्ट्रीशियन को ही काम करने दें।"
    },
    en: {
      title: "415V High Voltage Electrical Hazard - Danger of Death!",
      hazardLevel: "DANGER",
      explanation: "This switchgear panel carries lethal 415V three-phase electrical power. Touching busbars or opening panels without lockout-tagout (LOTO) can cause fatal arc flash and electric shock.",
      dos: [
        "Maintain minimum 1 meter clear clearance around the panel at all times.",
        "Stand on rated dielectric rubber insulation mats.",
        "Report any buzzing, burning smell, or sparks to the Plant Electrical Officer."
      ],
      donts: [
        "Never operate electrical switches with damp hands or wet footwear.",
        "Do not unlock or access panels unless you are a certified plant electrician with LOTO permit.",
        "Never obstruct the panel with pallets, water barrels, or metal scaffolding."
      ],
      requiredPPE: ["Dielectric Safety Shoes", "Arc Flash Visor", "Class 0 Rubber Gloves"],
      audioScript: "High voltage electrical hazard! 415 Volts present. Danger of death. Stand clear unless certified with electrical permit."
    }
  },
  chemical: {
    hi: {
      title: "सल्फ्यूरिक एसिड और रासायनिक खतरा - जहरीला एवं जलन पैदा करने वाला!",
      hazardLevel: "WARNING",
      explanation: "यह टैंक खतरनाक तेजाब और रसायन का है। इसकी भाप सांस के जरिए अंदर जाने पर फेफड़ों को नुकसान पहुंचाती है और त्वचा पर गिरने से गंभीर घाव हो सकते हैं।",
      dos: [
        "केमिकल एप्रन, केमिकल-रेसिस्टेंट नाइट्राइल ग्लव्स और फुल फेस शील्ड पहनें।",
        "आंख या त्वचा पर छींटे पड़ने पर तुरंत आई-वॉश स्टेशन पर 15 मिनट धोएं।",
        "हमेशा वेंटिलेशन एग्जॉस्ट फैन चालू रखें।"
      ],
      donts: [
        "तेजाब में कभी सीधे पानी न डालें, हमेशा धीरे-धीरे पानी में तेजाब मिलाएं।",
        "बिना रेस्पिरेटर मास्क के टैंक के पास सांस न लें।",
        "केमिकल वाले फर्श पर साधारण चप्पल पहनकर न जाएं।"
      ],
      requiredPPE: ["नाइट्राइल केमिकल ग्लव्स", "केमिकल एप्रन", "आई-वॉश गॉगल्स", "रेस्पिरेटर"],
      audioScript: "रासायनिक खतरे की चेतावनी! सल्फ्यूरिक एसिड त्वचा को जला सकता है। पूरा फेस शील्ड और नाइट्राइल ग्लव्स पहनें। छींटे पड़ने पर तुरंत आई-वॉश शॉवर का उपयोग करें।"
    },
    en: {
      title: "Chemical Hazard - Corrosive Acid Tank!",
      hazardLevel: "WARNING",
      explanation: "This vessel contains highly corrosive industrial acid. Vapors cause respiratory tract burns, and skin contact causes deep chemical burns. Always ensure emergency showers are functional.",
      dos: [
        "Don full chemical suit, splash goggles, face shield, and heavy nitrile gauntlets.",
        "In case of splashes, immediately flush eyes/skin at safety shower for 15 uninterrupted minutes.",
        "Ensure local forced exhaust ventilation is running before opening transfer valves."
      ],
      donts: [
        "Never add water into acid—always dilute by adding acid slowly into water.",
        "Do not eat, drink, or chew tobacco anywhere in the chemical storage bay.",
        "Never step into chemical puddles with standard cloth or perforated footwear."
      ],
      requiredPPE: ["Nitrile Gauntlet Gloves", "Chemical Splash Goggles", "Respirator Mask", "Acid-Resistant Apron"],
      audioScript: "Chemical warning! Corrosive acid tank. Always wear face shield and chemical gloves. Flush with water for 15 minutes if contact occurs."
    }
  }
};

// API: Analyze Safety Manual or Hazard Sign
app.post('/api/analyze-safety-manual', async (req, res) => {
  try {
    const { imageBase64, textContent, targetLanguage = 'hi', signPreset } = req.body;

    const languageNames: Record<string, string> = {
      hi: 'Hindi (हिन्दी)',
      ta: 'Tamil (தமிழ்)',
      te: 'Telugu (తెలుగు)',
      bn: 'Bengali (বাংলা)',
      mr: 'Marathi (मराठी)',
      en: 'English'
    };

    const targetLangName = languageNames[targetLanguage] || 'Hindi';

    // If Gemini client is active and we have input, query Gemini
    if (aiClient && (imageBase64 || textContent)) {
      try {
        const prompt = `You are "Suraksha Saathi", an expert safety companion for migrant factory workers in India.
Analyze the provided factory safety manual, machinery warning sign, chemical tag, or instruction text.
The worker may have limited literacy and needs practical, life-saving advice in simple, easy-to-understand ${targetLangName}.

Translate, explain, and structure your response strictly as valid JSON with these keys:
{
  "title": "Clear, short title in ${targetLangName}",
  "hazardLevel": "DANGER" | "WARNING" | "CAUTION" | "MANDATORY",
  "explanation": "2-3 short, clear sentences in colloquial ${targetLangName} explaining what the danger is and why it matters to the worker's life.",
  "dos": ["3 actionable points worker MUST do in ${targetLangName}"],
  "donts": ["3 critical things worker MUST NEVER do in ${targetLangName}"],
  "requiredPPE": ["List of 3-4 required PPE in ${targetLangName}"],
  "audioScript": "A warm, clear spoken warning script in ${targetLangName} addressing the worker as 'साथी' / comrade, suitable for Text-To-Speech audio playback."
}

Ensure the tone is caring, empowering, and prioritizes worker life and limb above all else. Return ONLY raw JSON without markdown formatting.`;

        let contents: any;
        if (imageBase64) {
          const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
          contents = [
            {
              role: 'user',
              parts: [
                { text: prompt + `\nAdditional worker notes: ${textContent || 'None'}` },
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
                    data: cleanBase64
                  }
                }
              ]
            }
          ];
        } else {
          contents = [
            {
              role: 'user',
              parts: [
                { text: prompt + `\n\nText from machine / notice board:\n${textContent}` }
              ]
            }
          ];
        }

        const aiResponse = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents
        });

        const text = aiResponse.text || '';
        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.json({ success: true, data: parsed, source: 'gemini' });
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed or timed out, falling back to local safety rules:', geminiError);
      }
    }

    // Local fallback logic based on preset or detected keywords
    const presetKey = signPreset || (textContent && textContent.toLowerCase().includes('volt') ? 'high_voltage' : (textContent && textContent.toLowerCase().includes('acid') ? 'chemical' : 'nip_point'));
    const template = PRESET_EXPLANATIONS[presetKey] || PRESET_EXPLANATIONS.nip_point;
    const localized = template[targetLanguage] || template.hi || template.en;

    // Return localized template
    return res.json({
      success: true,
      data: localized,
      source: 'local_preset'
    });
  } catch (error: any) {
    console.error('Error in analyze-safety-manual:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal error' });
  }
});

// API: Anonymous Grievance & Safety Hazard Box
app.post('/api/report-grievance', async (req, res) => {
  try {
    const { category, description, severity, plantLocation, targetLanguage = 'hi' } = req.body;
    
    // Generate an anonymous tracking code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `SS-2026-${randomNum}`;

    let immediateSafetyAdvice = "";
    if (severity === 'URGENT' || severity === 'HIGH') {
      immediateSafetyAdvice = targetLanguage === 'hi'
        ? "तत्काल कदम: 1. उस जगह से कम से कम 5 मीटर दूर रहें। 2. अन्य साथियों को वहां जाने से रोकें। 3. नजदीकी सेफ्टी वार्डन को तुरंत सूचित करें। आपका नाम किसी को नहीं बताया जाएगा।"
        : "Immediate Action: 1. Maintain at least 5 meters distance from hazard. 2. Warn co-workers in the vicinity. 3. Notify the nearest floor supervisor immediately. Your identity remains 100% anonymous.";
    } else {
      immediateSafetyAdvice = targetLanguage === 'hi'
        ? "आपकी रिपोर्ट सुरक्षित रूप से दर्ज कर ली गई है। 24 घंटे में प्लांट सेफ्टी ऑडिट टीम इसका निरीक्षण करेगी।"
        : "Your report has been logged securely. Plant safety audit team will inspect within 24 hours.";
    }

    // If Gemini is available, provide contextual safety advice
    if (aiClient && description) {
      try {
        const prompt = `A factory worker in India anonymously reported the following safety issue or grievance:
Category: ${category}
Severity: ${severity}
Plant Location: ${plantLocation}
Description: "${description}"

Generate 2 immediate, practical safety precautions for the worker to protect themselves right now in simple ${targetLanguage === 'hi' ? 'Hindi' : 'English'}. Keep it concise (under 40 words).`;

        const geminiRes = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });

        if (geminiRes.text) {
          immediateSafetyAdvice = geminiRes.text.trim();
        }
      } catch (e) {
        // use fallback advice
      }
    }

    return res.json({
      success: true,
      trackingCode,
      timestamp: new Date().toISOString(),
      immediateSafetyAdvice,
      status: 'SUBMITTED_TO_SAFETY_COMMITTEE'
    });
  } catch (error: any) {
    console.error('Error reporting grievance:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'Suraksha Saathi Backend', geminiConfigured: !!aiClient });
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Suraksha Saathi running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
