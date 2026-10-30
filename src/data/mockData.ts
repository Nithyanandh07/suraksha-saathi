import { ShiftRecord, GrievanceRecord, ResourceItem, SafetySignAnalysis, Language } from '../types';

export const INITIAL_SHIFTS: ShiftRecord[] = [
  {
    id: 'shift-1',
    date: '2026-10-25',
    shiftType: 'DAY',
    hoursWorked: 8,
    otHours: 2,
    baseWagePerDay: 550,
    otRateMultiplier: 2,
    contractorName: 'Apex Industrial Staffing',
    advanceDeduction: 0,
    notes: 'Stamping press line 4'
  },
  {
    id: 'shift-2',
    date: '2026-10-26',
    shiftType: 'DAY',
    hoursWorked: 8,
    otHours: 3,
    baseWagePerDay: 550,
    otRateMultiplier: 2,
    contractorName: 'Apex Industrial Staffing',
    advanceDeduction: 200,
    notes: 'Advance for room rent'
  },
  {
    id: 'shift-3',
    date: '2026-10-27',
    shiftType: 'NIGHT',
    hoursWorked: 8,
    otHours: 2,
    baseWagePerDay: 550,
    otRateMultiplier: 2,
    contractorName: 'Apex Industrial Staffing',
    advanceDeduction: 0,
    notes: 'Night shift furnace maintenance'
  },
  {
    id: 'shift-4',
    date: '2026-10-28',
    shiftType: 'DAY',
    hoursWorked: 8,
    otHours: 0,
    baseWagePerDay: 550,
    otRateMultiplier: 2,
    contractorName: 'Apex Industrial Staffing',
    advanceDeduction: 0,
    notes: 'Standard 8h day'
  },
  {
    id: 'shift-5',
    date: '2026-10-29',
    shiftType: 'DAY',
    hoursWorked: 8,
    otHours: 2.5,
    baseWagePerDay: 550,
    otRateMultiplier: 2,
    contractorName: 'Apex Industrial Staffing',
    advanceDeduction: 0,
    notes: 'Heavy production run'
  }
];

export const INITIAL_GRIEVANCES: GrievanceRecord[] = [
  {
    id: 'grv-1',
    trackingCode: 'SS-2026-7842',
    category: 'MACHINERY_GUARD',
    severity: 'HIGH',
    description: 'Line 2 conveyor belt nip roller guard is cracked and vibrating loose. High risk of hand getting caught during fabric feeding.',
    plantLocation: 'Textile Weaving Bay - Section C',
    timestamp: '2026-10-28 14:30',
    status: 'INSPECTION_SCHEDULED',
    statusNote: 'Safety Engineer scheduled maintenance replacement order #MNT-4410.',
    immediateSafetyAdvice: 'Maintain 2 meters distance from moving roller. Do not attempt clearing cloth jams with hands.'
  },
  {
    id: 'grv-2',
    trackingCode: 'SS-2026-3190',
    category: 'WATER_SANITATION',
    severity: 'MEDIUM',
    description: 'Drinking water dispenser near furnace #3 has yellow colored water with iron smell. Workers suffering from stomach aches.',
    plantLocation: 'Furnace Bay Water Station 2',
    timestamp: '2026-10-26 09:15',
    status: 'RESOLVED',
    statusNote: 'RO filtration unit filters replaced and water tested safe by plant health inspector.',
    immediateSafetyAdvice: 'Use central canteen RO water dispenser until water line filters are sanitized.'
  }
];

export const PRESET_SIGNS: Array<{
  id: string;
  name: string;
  category: string;
  previewIcon: string;
  analysis: Record<Language, SafetySignAnalysis>;
}> = [
  {
    id: 'nip_point',
    name: 'Rotating Rollers Pinch Point',
    category: 'Mechanical Hazard',
    previewIcon: '⚙️',
    analysis: {
      hi: {
        title: 'रोलर मशीन पिंच पॉइंट - हाथ खिंचने का जानलेवा खतरा!',
        hazardLevel: 'DANGER',
        explanation: 'इस मशीन में तेजी से घूमने वाले रोलर हैं। अगर कपड़ा, उंगली या हाथ संपर्क में आया तो रोलर उसे अंदर खींच लेगा। बिना सेफ्टी गार्ड के काम करना सख्त मना है।',
        dos: [
          'काम शुरू करने से पहले पक्का करें कि सेफ्टी गार्ड अपनी जगह पर लगा है।',
          'फुल आस्तीन को कोहनी तक मोड़ें और बाल टोपी में बांधकर रखें।',
          'किसी भी गड़बड़ी पर तुरंत लाल इमरजेंसी ई-स्टॉप बटन दबाएं।'
        ],
        donts: [
          'चलती मशीन के अंदर कपड़ा या हाथ डालकर सफाई कभी न करें।',
          'गमछा, मफलर या अंगूठी पहनकर रोलर के पास कभी न जाएं।',
          'सेफ्टी सेंसर या तार को कभी बाईपास या बंद न करें।'
        ],
        requiredPPE: ['फिटिंग सेफ्टी ग्लव्स', 'सेफ्टी जूते', 'बालों की सुरक्षा टोपी'],
        audioScript: 'सावधान साथी! इस रोलर मशीन में हाथ खिंचने का भारी खतरा है। बिना सेफ्टी गार्ड के मशीन न चलाएं। ढीले कपड़े और गमछा दूर रखें और किसी भी खतरे पर लाल इमरजेंसी स्टॉप दबाएं।'
      },
      ta: {
        title: 'சுழலும் ரோலர் - கை சிக்கும் ஆபத்து!',
        hazardLevel: 'DANGER',
        explanation: 'இந்த இயந்திரத்தில் சுழலும் ரோலர்கள் உள்ளன. கை அல்லது ஆடை மாட்டினால் உள்ளே இழுத்துவிடும். பாதுகாப்பு கவசம் இல்லாமல் இயக்கக்கூடாது.',
        dos: [
          'பாதுகாப்பு கவசம் பூட்டப்பட்டுள்ளதா என சோதிக்கவும்.',
          'சட்டை கைகளை சுருட்டி வைக்கவும்.',
          'ஏதேனும் தடை ஏற்பட்டால் உடனடியாக சிவப்பு எமர்ஜென்சி பட்டனை அழுத்தவும்.'
        ],
        donts: [
          'இயங்கும் ரோலரை துணியால் துடைக்க வேண்டாம்.',
          'தளர்வான ஆடைகள் அல்லது சங்கிலி அணிய வேண்டாம்.',
          'சென்சாரை அகற்றவோ முடக்கவோ கூடாது.'
        ],
        requiredPPE: ['பாதுகாப்பு காலணி', 'கையுறைகள்', 'தலைக்கவசம்'],
        audioScript: 'எச்சரிக்கை தோழரே! இந்த ரோலர் இயந்திரத்தில் கை சிக்கும் அபாயம் உள்ளது. பாதுகாப்பு கவசம் இல்லாமல் வேலை செய்யாதீர்கள்.'
      },
      te: {
        title: 'రొటేటింగ్ రోలర్స్ పింఛ్ పాయింట్ - తీవ్ర ప్రమాదం!',
        hazardLevel: 'DANGER',
        explanation: 'ఈ యంత్రంలో వేగంగా తిరిగే రోలర్లు ఉన్నాయి. చేతులు లేదా బట్టలు తగిలితే లోపలికి లాగేసుకుంటాయి. సేఫ్టీ గార్డ్ లేకుండా పని చేయరాదు.',
        dos: [
          'సేఫ్టీ గార్డ్ సరిగ్గా బిగించి ఉందో లేదో తనిఖీ చేయండి.',
          'చేతుల స్లీవ్‌లను పైకి మడతపెట్టండి.',
          'ఏదైనా సమస్య ఉంటే వెంటనే ఎర్రటి ఎమర్జెన్సీ స్టాప్ బటన్‌ను నొక్కండి.'
        ],
        donts: [
          'యంత్రం నడుస్తుండగా శుభ్రం చేయడానికి చేతులు పెట్టవద్దు.',
          'కండువా లేదా వదులైన బట్టలు వేసుకుని యంత్రం వద్దకు వెళ్లవద్దు.',
          'సేఫ్టీ సెన్సార్లను ఆఫ్ చేయవద్దు.'
        ],
        requiredPPE: ['సేఫ్టీ బూట్లు', 'చేతి తొడుగులు', 'హెల్మెట్'],
        audioScript: 'జాగ్రత్త మిత్రమా! రోలర్ మెషీన్ వద్ద చేయి చిక్కుకునే ప్రమాదం ఉంది. సేఫ్టీ గార్డ్ లేకుండా పని చేయవద్దు.'
      },
      bn: {
        title: 'ঘূর্ণায়মান রোলার পিঞ্চ পয়েন্ট - হাত আটকে যাওয়ার মারাত্মক ঝুঁকি!',
        hazardLevel: 'DANGER',
        explanation: 'এই মেশিনে দ্রুত ঘোরার রোলার আছে। অসাবধানে জামা বা হাত গেলে সাথে সাথে ভেতরে টেনে নেবে। সেফটি গার্ড ছাড়া কাজ করবেন না।',
        dos: [
          'কাজ শুরুর আগে সেফটি গার্ড পরীক্ষা করুন।',
          'হাতের হাতা ভালো করে গুটিয়ে রাখুন।',
          'বিপদে পড়লে সাথে সাথে লাল ইমার্জেন্সি স্টপ বোতাম টিপুন।'
        ],
        donts: [
          'চলন্ত রোলারের ভেতর হাত দিয়ে পরিষ্কার করার চেষ্টা করবেন না।',
          'গামছা বা ঝুলন্ত মালা পরে কাজ করবেন না।',
          'সেফটি সেন্সর কখনো বন্ধ করবেন না।'
        ],
        requiredPPE: ['সেফটি জুতো', 'টাইট গ্লাভস', 'মাথার ক্যাপ'],
        audioScript: 'সাবধান ভাই! রোলার মেশিনে হাত আটকে যাওয়ার ঝুঁকি আছে। সেফটি গার্ড ছাড়া কাজ করবেন না।'
      },
      mr: {
        title: 'रोलर मशीन पिंच पॉइंट - हात अडकण्याचा गंभीर धोका!',
        hazardLevel: 'DANGER',
        explanation: 'या यंत्रात वेगाने फिरणारे रोलर्स आहेत. कपडा किंवा हात लागल्यास आत ओढले जाण्याचा मोठा धोका आहे. सेफ्टी गार्डशिवाय यंत्र चालू करू नका.',
        dos: [
          'काम सुरू करण्यापूर्वी सेफ्टी गार्ड व्यवस्थित आहे का ते तपासा.',
          'शर्टच्या बाह्या वर दुमडा आणि केस व्यवस्थित बांधा.',
          'काही अडचण आल्यास लगेच लाल इमर्जन्सी स्टॉप बटण दाबा.'
        ],
        donts: [
          'चालू मशीनमध्ये हात घालून साफसफाई करू नका.',
          'गळ्यात रुमाल किंवा सैल कपडे घालून जवळ जाऊ नका.',
          'सेफ्टी सेन्सर किंवा गार्ड कधीही बंद करू नका.'
        ],
        requiredPPE: ['सेफ्टी बूट', 'योग्य आकाराचे हातमोजे', 'हेल्मेट'],
        audioScript: 'सावध राहा मित्रा! या रोलर मशीनमध्ये हात अडकण्याचा धोका आहे. सेफ्टी गार्डशिवाय मशीन चालवू नका.'
      },
      en: {
        title: 'Rotating Roller Pinch Point - Severe In-Running Nip Hazard!',
        hazardLevel: 'DANGER',
        explanation: 'This equipment features counter-rotating drive rollers. Clothing, jewelry, or fingers can be forcibly dragged inside in milliseconds, causing devastating crush injuries.',
        dos: [
          'Ensure the interlocked physical safety barrier guard is in place.',
          'Keep shirt sleeves firmly rolled above elbows and hair restrained.',
          'Strike the Red Emergency E-Stop button instantly upon any jam.'
        ],
        donts: [
          'Never use handheld rags to wipe debris off moving rollers.',
          'Do not wear loose scarves, identity lanyards, or rings near rolls.',
          'Never tamper with or bypass optical safety light curtains.'
        ],
        requiredPPE: ['Anti-Slip Steel-Toe Boots', 'Close-Fitting Gloves', 'Safety Glasses'],
        audioScript: 'Attention worker! Severe in-running pinch point hazard on this roller machine. Never operate without guards and strike the emergency stop if anything jams.'
      }
    }
  },
  {
    id: 'high_voltage',
    name: '415V High Voltage Electrical Hazard',
    category: 'Electrical Hazard',
    previewIcon: '⚡',
    analysis: {
      hi: {
        title: '415 वोल्ट उच्च बिजली खतरा - जानलेवा करंट!',
        hazardLevel: 'DANGER',
        explanation: 'यह बड़ा बिजली पैनल 415 वोल्ट की घातक बिजली सप्लाई करता है। बिना ट्रेनिंग या भीगे हाथों से इसे छूने पर तुरंत मौत हो सकती है। केवल अधिकृत इलेक्ट्रीशियन ही इसे खोलें।',
        dos: [
          'पैनल से हमेशा कम से कम 1 मीटर की सुरक्षित दूरी बनाकर रखें।',
          'फर्श पर बिछी काली रबर इंसुलेशन मैट पर ही खड़े हों।',
          'स्पार्क या धुएं की गंध आने पर तुरंत शिफ्ट इंचार्ज को बताएं।'
        ],
        donts: [
          'गीले हाथों, भीगे जूतों या पसीने में पैनल के स्विच को न छुएं।',
          'बिना परमिट या बिना चाबी पैनल का दरवाजा जबरदस्ती न खोलें।',
          'पैनल के आगे पानी की बाल्टी, लोहे के पाइप या सामान न रखें।'
        ],
        requiredPPE: ['इंसुलेटेड रबर सेफ्टी जूते', '1000V रेटेड रबर ग्लव्स', 'फेस शील्ड'],
        audioScript: 'खतरा! 415 वोल्ट बिजली का करंट है। इसे छूने से जान जा सकती है। गीले हाथों से दूर रहें और सिर्फ ट्रेंड इलेक्ट्रीशियन को काम करने दें।'
      },
      ta: {
        title: '415V உயர் மின்னழுத்தம் - உயிருக்கு ஆபத்து!',
        hazardLevel: 'DANGER',
        explanation: 'இந்த மின்சார பெட்டியில் 415 வோல்ட் மின்சாரம் பாய்கிறது. ஈரமான கைகளால் தொட்டால் உயிரிழப்பு ஏற்படும் அபாயம் உள்ளது.',
        dos: [
          'குறைந்தது 1 மீட்டர் தூரம் இடைவெளி விடவும்.',
          'ரப்பர் பாயின் மீது மட்டுமே நிற்கவும்.',
          'தீப்பொறி கண்டால் மின்சார அதிகாரியிடம் தெரிவிக்கவும்.'
        ],
        donts: [
          'ஈரமான கைகளால் தொடக்கூடாது.',
          'அனுமதியின்றி மின்சார பெட்டியை திறக்கக்கூடாது.',
          'மின் பலகை அருகே தண்ணீர் அல்லது இரும்பு பொருட்களை வைக்காதீர்கள்.'
        ],
        requiredPPE: ['மின்கடத்தா காலணிகள்', 'ரப்பர் கையுறைகள்', 'முகக் கவசம்'],
        audioScript: 'உயர் மின்னழுத்த ஆபத்து! 415 வோல்ட் மின்சாரம் உள்ளது. பயிற்சி பெற்ற எலக்ட்ரீஷியன் மட்டுமே அணுக வேண்டும்.'
      },
      te: {
        title: '415V హై వోల్టేజ్ విద్యుత్ ప్రమాదం - ప్రాణాపాయం!',
        hazardLevel: 'DANGER',
        explanation: 'ఈ ఎలక్ట్రికల్ ప్యానెల్‌లో 415 వోల్టుల ప్రాణాంతక విద్యుత్ ఉంది. తడి చేతులతో తాకితే ప్రాణాలు పోయే ప్రమాదం ఉంది.',
        dos: [
          'ప్యానెల్ నుండి కనీసం 1 మీటరు దూరం పాటించండి.',
          'రబ్బరు ఇన్సులేషన్ మ్యాట్ పైనే నిలబడండి.',
          'స్పార్క్ లేదా పొగ వస్తే వెంటనే సూపర్ వైజర్‌కు చెప్పండి.'
        ],
        donts: [
          'తడి చేతులతో స్విచ్‌లను తాకవద్దు.',
          'లైసెన్స్ కలిగిన ఎలక్ట్రీషియన్ కాకుండా ఇతరులు తెరవకూడదు.',
          'ప్యానెల్ ముందు నీరు లేదా వస్తువులు పెట్టవద్దు.'
        ],
        requiredPPE: ['ఎలక్ట్రికల్ సేఫ్టీ బూట్లు', 'రబ్బరు గ్లవ్స్', 'ఫేస్ షీల్డ్'],
        audioScript: 'హై వోల్టేజ్ కరెంట్ ఉంది! తడి చేతులతో తాకవద్దు. అధికారం లేకుండా ప్యానెల్ తెరవకూడదు.'
      },
      bn: {
        title: '৪১৫ ভোল্ট উচ্চ বিদ্যুৎ প্রবাহ - জীবনের ঝুঁকি!',
        hazardLevel: 'DANGER',
        explanation: 'এই প্যানেলে মারাত্মক ৪১৫ ভোল্ট কারেন্ট আছে। হাত দিলে মারাত্মক বিদ্যুৎস্পৃষ্ট হতে পারেন। শুধু লাইসেন্সপ্রাপ্ত ইলেকট্রিশিয়ানই এটি খুলবেন।',
        dos: [
          'প্যানেল থেকে কমপক্ষে ১ মিটার দূরে থাকুন।',
          'মেঝেতে পাতা রাবারের ম্যাটের উপর দাঁড়ান।',
          'স্পার্ক দেখলে সাথে সাথে মেইন সুইচ বন্ধের নির্দেশ দিন।'
        ],
        donts: [
          'ভেজা হাত বা ঘামে ভেজা কাপড়ে সুইচ স্পর্শ করবেন না।',
          'অনুমতি ছাড়া প্যানেলের দরজা খুলবেন না।',
          'প্যানেলের সামনে লোহার রড বা জলের পাত্র রাখবেন না।'
        ],
        requiredPPE: ['বিদ্যুৎরোধী সেফটি জুতো', 'রাবার গ্লাভস', 'মুখের শিল্ড'],
        audioScript: 'বিপদ! ৪১৫ ভোল্ট কারেন্ট আছে। ভেজা হাতে প্যানেল স্পর্শ করবেন না। ইলেকট্রিশিয়ানকে খবর দিন।'
      },
      mr: {
        title: '४१५ व्होल्ट उच्च वीज प्रवाह - जीवितास धोका!',
        hazardLevel: 'DANGER',
        explanation: 'या पॅनेलमध्ये ४१५ व्होल्टचा घातक वीज प्रवाह आहे. ओल्या हातांनी स्पर्श केल्यास विजेचा तीव्र धक्का बसू शकतो.',
        dos: [
          'पॅनेलपासून किमान १ मीटर सुरक्षित अंतर ठेवा.',
          'फक्त इन्सुलेटेड रबर मॅटवरच उभे राहा.',
          'ठिणगी किंवा जळण्याचा वास आल्यास लगेच कळवा.'
        ],
        donts: [
          'ओल्या हातांनी किंवा घामाने भिजलेल्या स्थितीत स्विचला हात लावू नका.',
          'परवानगीशिवाय दरवाजा उघडू नका.',
          'पॅनेलसमोर पाणी किंवा लोखंडी वस्तू ठेवू नका.'
        ],
        requiredPPE: ['इलेक्ट्रिकल सेफटी शूज', 'रबरचे हातमोजे', 'फेस शिल्ड'],
        audioScript: 'धोका! ४१५ व्होल्ट वीज प्रवाह आहे. ओल्या हातांनी स्पर्श करू नका आणि फक्त इलेक्ट्रिशियनलाच काम करू द्या.'
      },
      en: {
        title: '415V High Voltage Switchgear - Lethal Arc Flash & Shock Hazard!',
        hazardLevel: 'DANGER',
        explanation: 'This electrical distribution panel carries 415-volt three-phase alternating current. Contact with energized busbars causes instantaneous electrocution and explosive arc flash.',
        dos: [
          'Keep a strict 1-meter working clearance around the entire cabinet.',
          'Stand exclusively on dielectric certified rubber insulating mats.',
          'Report any buzzing sound or ozone burning odor immediately.'
        ],
        donts: [
          'Never touch electrical controls with sweaty or damp palms.',
          'Do not open cabinet doors without verified Lockout-Tagout (LOTO) clearance.',
          'Never store metal ladders, tools, or water buckets in front of panels.'
        ],
        requiredPPE: ['Dielectric Work Boots', '1000V Rated Insulating Gloves', 'Arc-Flash Visor'],
        audioScript: 'High voltage hazard! 415 Volts present. Lethal electrical current. Maintain safe distance and do not operate with wet hands.'
      }
    }
  },
  {
    id: 'chemical',
    name: 'Corrosive Acid & Toxic Fume Tank',
    category: 'Chemical Hazard',
    previewIcon: '☣️',
    analysis: {
      hi: {
        title: 'सल्फ्यूरिक एसिड और जहरीला रसायन - त्वचा जलाने व सांस का खतरा!',
        hazardLevel: 'WARNING',
        explanation: 'यह टैंक सल्फ्यूरिक एसिड का है। यह त्वचा को गंभीर रूप से जला सकता है और इसके धुएं से फेफड़े खराब हो सकते हैं। बिना पूरी सुरक्षा के पास न जाएं।',
        dos: [
          'केमिकल एप्रन, नाइट्राइल ग्लव्स और फुल फेस शील्ड पहनें।',
          'छींटे पड़ने पर तुरंत पास के इमरजेंसी आई-वॉश नल पर 15 मिनट आंखें धोएं।',
          'हमेशा वेंटिलेशन एग्जॉस्ट फैन चालू रखें।'
        ],
        donts: [
          'तेजाब में कभी सीधे पानी न डालें (छींटे मुंह पर आ सकते हैं)।',
          'बिना रेस्पिरेटर मास्क के टैंक के पास सांस न लें।',
          'केमिकल एरिया में पान, तंबाकू या खाना न खाएं।'
        ],
        requiredPPE: ['केमिकल नाइट्राइल ग्लव्स', 'केमिकल शील्ड', 'गैस रेस्पिरेटर मास्क', 'रबर एप्रन'],
        audioScript: 'रासायनिक खतरा! एसिड टैंक के पास सावधानी बरतें। फेस शील्ड और केमिकल ग्लव्स जरूर पहनें। छींटे पड़ने पर तुरंत आई-वॉश से आंखें धोएं।'
      },
      ta: {
        title: 'அமில தொட்டி - கடுமையான ரசாயன ஆபத்து!',
        hazardLevel: 'WARNING',
        explanation: 'இந்த தொட்டியில் உள்ள அமிலம் தோலை எரிக்கக்கூடியது. இதன் வாயுவை சுவாசிப்பது ஆபத்தானது.',
        dos: [
          'முழு முகக் கவசம் மற்றும் கையுறைகளை அணியுங்கள்.',
          'ரசாயனம் பட்டால் 15 நிமிடங்கள் சுத்தமான தண்ணீரில் கழுவவும்.',
          'காற்றோட்ட மின்விசிறியை இயக்கவும்.'
        ],
        donts: [
          'அமிலத்தில் நேரடியாக தண்ணீரை ஊற்ற வேண்டாம்.',
          'முகமூடி இல்லாமல் தொட்டியின் அருகே செல்ல வேண்டாம்.',
          'இங்கு உணவு உண்ணவோ புகையிலை பயன்படுத்தவோ கூடாது.'
        ],
        requiredPPE: ['கையுறைகள்', 'முகக்கவசம்', 'அமில பாதுகாப்பு ஆடை'],
        audioScript: 'ரசாயன எச்சரிக்கை! முகக்கவசம் மற்றும் கையுறைகளை அணியுங்கள். அவசர காலத்தில் உடனே தண்ணீரில் கழுவுங்கள்.'
      },
      te: {
        title: 'యాసిడ్ ట్యాంక్ - విషపూరిత రసాయన ప్రమాదం!',
        hazardLevel: 'WARNING',
        explanation: 'ఈ ట్యాంకులోని యాసిడ్ చర్మాన్ని కాల్చివేస్తుంది మరియు దీని పొగ ఊపిరితిత్తులకు హానికరం.',
        dos: [
          'ఫేస్ షీల్డ్ మరియు నైట్రైల్ గ్లవ్స్ ధరించండి.',
          'యాసిడ్ పడితే వెంటనే 15 నిమిషాలు నీటితో కడగాలి.',
          'ఎగ్జాస్ట్ ఫ్యాన్లు ఆన్ చేసి ఉంచండి.'
        ],
        donts: [
          'యాసిడ్‌లో నేరుగా నీటిని కలపవద్దు.',
          'మాస్క్ లేకుండా ట్యాంక్ దగ్గరకు వెళ్లవద్దు.',
          'ఈ ప్రాంతంలో ఆహారం తినవద్దు.'
        ],
        requiredPPE: ['రసాయన గ్లవ్స్', 'ఫేస్ షీల్డ్', 'రెస్పిరేటర్ మాస్క్'],
        audioScript: 'రసాయన హెచ్చరిక! యాసిడ్ ట్యాంక్ వద్ద జాగ్రత్తగా ఉండండి. ఫేస్ షీల్డ్ తప్పనిసరి.'
      },
      bn: {
        title: 'সালফিউরিক অ্যাসিড ও বিষাক্ত রাসায়নিক ট্যাংক!',
        hazardLevel: 'WARNING',
        explanation: 'এই ট্যাংকের রাসায়নিক চামড়া পুড়িয়ে ফেলতে পারে এবং ধোঁয়া ফুসফুসের মারাত্মক ক্ষতি করে।',
        dos: [
          'কেমিক্যাল গ্লাভস এবং ফুল ফেস শিল্ড পরুন।',
          'গায়ে ছিটে লাগলে সাথে সাথে ১৫ মিনিট প্রচুর জল দিয়ে ধুয়ে ফেলুন।',
          'সবসময় এগজস্ট ফ্যান চালু রাখুন।'
        ],
        donts: [
          'অ্যাসিডে সরাসরি জল ঢালবেন না।',
          'মাস্ক ছাড়া ট্যাংকের পাশে যাবেন না।',
          'এখানে খাবার বা তামাক গ্রহণ করবেন না।'
        ],
        requiredPPE: ['নাইট্রাইল গ্লাভস', 'মুখের শিল্ড', 'গ্যাস মাস্ক'],
        audioScript: 'রাসায়নিক বিপদ! অ্যাসিড ট্যাঙ্কের কাছে ফেস শিল্ড এবং কেমিক্যাল গ্লাভস ব্যবহার করুন।'
      },
      mr: {
        title: 'सल्फ्यूरिक ॲसिड व घातक रासायनिक टाकी!',
        hazardLevel: 'WARNING',
        explanation: 'या टाकीतील ॲसिड त्वचेला जाळू शकते आणि धुरामुळे श्वास घेण्यास त्रास होऊ शकतो.',
        dos: [
          'फुल फेस शिल्ड आणि रबरचे हातमोजे वापरा.',
          'ॲसिड अंगावर उडाल्यास १५ मिनिटे स्वच्छ पाण्याने धुवा.',
          'व्हेंटिलेशन पंखा नेहमी चालू ठेवा.'
        ],
        donts: [
          'ॲसिडमध्ये कधीही थेट पाणी टाकू नका.',
          'मास्कशिवाय टाकीजवळ जाऊ नका.',
          'या भागात तंबाखू खाऊ नका किंवा पाणी पिऊ नका.'
        ],
        requiredPPE: ['केमिकल हातमोजे', 'फेस शिल्ड', 'गॅस मास्क'],
        audioScript: 'रासायनिक धोका! ॲसिड टाकीजवळ फेस शिल्ड आणि हातमोजे वापरा. काही झाल्यास लगेच पाण्याने धुवा.'
      },
      en: {
        title: 'Sulfuric Acid Storage - Severe Corrosive & Toxic Vapor Hazard!',
        hazardLevel: 'WARNING',
        explanation: 'This bulk storage vessel contains concentrated acid. Skin exposure causes deep thermal-chemical ulcerations, while vapors trigger chemical pulmonary edema.',
        dos: [
          'Wear full impervious chemical splash suit, face shield, and nitrile gauntlets.',
          'In case of skin/eye contact, drench under emergency eye-wash station for 15 minutes.',
          'Verify local forced-air scrubber exhaust is active before valve handling.'
        ],
        donts: [
          'Never pour water into acid; always introduce acid slowly into water.',
          'Do not inhale tank headspace without an organic vapor/acid gas respirator.',
          'Never consume snacks or chew tobacco in the chemical offloading dock.'
        ],
        requiredPPE: ['Heavy Nitrile Gauntlets', 'Chemical Splash Visor', 'Acid-Gas Respirator', 'PVC Apron'],
        audioScript: 'Chemical warning! Corrosive acid tank. Wear face shield and chemical gauntlets. Drench with water for 15 minutes if splashes occur.'
      }
    }
  }
];

// Rich, verified resources for migrant factory workers across India
export const MIGRANT_RESOURCES: ResourceItem[] = [
  // 1. Government Schemes
  {
    id: 'res-eshram',
    category: 'GOV_SCHEMES',
    iconName: 'ShieldCheck',
    badge: {
      hi: '₹2 लाख बीमा',
      ta: '₹2 லட்சம் காப்பீடு',
      te: '₹2 లక్షల బీమా',
      bn: '₹২ লাখ বিমা',
      mr: '₹२ लाख विमा',
      en: '₹2 Lakh Insurance'
    },
    title: {
      hi: 'ई-श्रम कार्ड (e-Shram Yojana)',
      ta: 'இ-ஷ்ரம் அட்டை (e-Shram)',
      te: 'ఈ-శ్రమ్ కార్డు (e-Shram)',
      bn: 'ই-শ্রম কার্ড (e-Shram)',
      mr: 'ई-श्रम कार्ड (e-Shram)',
      en: 'e-Shram Portal & Worker ID Card'
    },
    subtitle: {
      hi: 'असंगठित व प्रवासी मज़दूरों के लिए सरकारी पहचान पत्र',
      ta: 'புலம்பெயர் தொழிலாளர்களுக்கான அரசு அடையாள அட்டை',
      te: 'వలస కార్మికుల కోసం అధికారిక గుర్తింపు కార్డు',
      bn: 'অসংগঠিত ও পরিযায়ী শ্রমিকদের জন্য সরকারি পরিচয়পত্র',
      mr: 'असंघटित व स्थलांतरित कामगारांसाठी सरकारी ओळखपत्र',
      en: 'National Database of Unorganized & Migrant Workers'
    },
    description: {
      hi: 'ई-श्रम पोर्टल पर पंजीकरण कराने से प्रवासी मज़दूरों को 12 अंकों का यूनिवर्सल अकाउंट नंबर (UAN) मिलता है। इसमें प्रधानमंत्री सुरक्षा बीमा योजना (PMSBY) के तहत ₹2 लाख का मुफ्त दुर्घटना बीमा और आपातकाल में सीधे बैंक खाते में आर्थिक सहायता मिलती है।',
      ta: 'இ-ஷ்ரம் தளத்தில் பதிவு செய்வதன் மூலம் தொழிலாளர்களுக்கு 12 இலக்க அடையாள எண் கிடைக்கும். விபத்து காப்பீடாக ₹2 லட்சம் மற்றும் அரசு நலத்திட்ட உதவிகள் நேரடியாக வங்கிக் கணக்கில் வந்து சேரும்.',
      te: 'ఈ-శ్రమ్ ద్వారా నమోదు చేసుకున్న కార్మికులకు 12 అంకెల UAN కార్డు లభిస్తుంది. ప్రమాద బీమాగా ₹2 లక్షలు మరియు ప్రభుత్వ సహాయం నేరుగా అందుతుంది.',
      bn: 'ই-শ্রম পোর্টালে নাম নথিভুক্ত করলে ১২ সংখ্যার ইউএএন কার্ড পাওয়া যায়। এতে ₹২ লাখের দুর্ঘটনা বিমা এবং সরকারি অনুদান সরাসরি ব্যাংক অ্যাকাউন্টে মেলে।',
      mr: 'ई-श्रम नोंदणीमुळे १२ अंकी ओळखपत्र मिळते. अपघाती मृत्यू झाल्यास ₹२ लाखांचे विमा कवच आणि संकटाच्या वेळी थेट बँक खात्यात सरकारी मदत मिळते.',
      en: 'Free registration provides a 12-digit national UAN card, ₹2 Lakh accidental death/disability insurance under PMSBY, and direct social security transfers across state borders.'
    },
    keyPoints: {
      hi: [
        'पंजीकरण बिल्कुल मुफ्त है (केवल आधार कार्ड और बैंक पासबुक चाहिए)',
        'दूसरे राज्य में जाने पर भी सभी सरकारी लाभ चालू रहते हैं',
        'दुर्घटना में मृत्यु या पूर्ण विकलांगता पर ₹2 लाख, आंशिक पर ₹1 लाख सहायता'
      ],
      ta: [
        'பதிவு முற்றிலும் இலவசம் (ஆதார் மற்றும் வங்கி கணக்கு புத்தகம் போதும்)',
        'வேறு மாநிலத்திற்கு மாறினாலும் சலுகைகள் தொடரும்',
        'விபத்து ஏற்பட்டால் ₹2 லட்சம் வரை இலவச காப்பீடு'
      ],
      te: [
        'నమోదు పూర్తిగా ఉచితం (ఆధార్ మరియు బ్యాంక్ అకౌంట్ అవసరం)',
        'ఏ రాష్ట్రానికి వెళ్లినా ప్రయోజనాలు అలాగే ఉంటాయి',
        'ప్రమాదం జరిగితే ₹2 లక్షల వరకు ప్రభుత్వ సాయం'
      ],
      bn: [
        'নথিভুক্তকরণ সম্পূর্ণ বিনামূল্যে (আধার ও ব্যাংক পাসবুক প্রয়োজন)',
        'অন্য রাজ্যে পরিযান করলেও সুবিধা বজায় থাকবে',
        'দুর্ঘটনায় মৃত্যুর ক্ষেত্রে পরিবারকে ₹২ লাখ আর্থিক সহায়তা'
      ],
      mr: [
        'नोंदणी पूर्णपणे मोफत (फक्त आधार कार्ड आणि बँक पासबुक हवे)',
        'दुसऱ्या राज्यात काम करतानाही फायदे कायम राहतात',
        'अपघातात मृत्यू किंवा अपंगत्व आल्यास ₹२ लाखांची मदत'
      ],
      en: [
        '100% Free enrollment at any CSC center or eshram.gov.in using Aadhaar',
        'Portability of benefits when migrating across state boundaries',
        '₹2 Lakh death/total disability cover, ₹1 Lakh for partial disability'
      ]
    },
    actionLabel: {
      hi: 'टोल-फ्री हेल्पलाइन: 14434',
      ta: 'இலவச உதவி எண்: 14434',
      te: 'టోల్ ఫ్రీ హెల్ప్‌లైన్: 14434',
      bn: 'টোল-ফ্রি হেল্পলাইন: 14434',
      mr: 'टोल-फ्री हेल्पलाइन: 14434',
      en: 'Toll-Free Helpline: 14434'
    },
    contactOrAction: 'tel:14434'
  },
  {
    id: 'res-onorc',
    category: 'GOV_SCHEMES',
    iconName: 'ShoppingBag',
    badge: {
      hi: 'मुफ्त / सस्ता राशन',
      ta: 'மலிவு விலை ரேஷன்',
      te: 'చౌక రేషన్',
      bn: 'সুলভ রেশন',
      mr: 'स्वस्त रेशन',
      en: 'Anywhere Ration'
    },
    title: {
      hi: 'वन नेशन वन राशन कार्ड (ONORC)',
      ta: 'ஒரே நாடு ஒரே ரேஷன் கார்டு',
      te: 'వన్ నేషన్ వన్ రేషన్ కార్డ్',
      bn: 'এক দেশ এক রেশন কার্ড',
      mr: 'वन नेशन वन रेशन कार्ड',
      en: 'One Nation One Ration Card (ONORC)'
    },
    subtitle: {
      hi: 'भारत के किसी भी राज्य की राशन दुकान से गेहूं-चावल प्राप्त करें',
      ta: 'இந்தியாவின் எந்த ரேஷன் கடையிலும் அரிசி, கோதுமை பெறலாம்',
      te: 'దేశంలో ఎక్కడైనా రేషన్ సరుకులు పొందే సదుపాయం',
      bn: 'ভারতের যেকোনো রেশন দোকান থেকে চাল-গম পাওয়ার সুবিধা',
      mr: 'भारतात कुठेही स्वस्त धान्य दुकानातून रेशन मिळवा',
      en: 'National Portability of Subsidized Food Grains'
    },
    description: {
      hi: 'यदि आपका राशन कार्ड बिहार, यूपी, बंगाल या किसी भी राज्य का है, तो भी आप गुजरात, महाराष्ट्र, तमिलनाडु की किसी भी नजदीकी राशन दुकान (Fair Price Shop) से अपना बायोमेट्रिक अंगूठा लगाकर सरकारी राशन ले सकते हैं। आपका परिवार गांव में भी अपना हिस्सा ले सकता है।',
      ta: 'உங்கள் ரேஷன் கார்டு எந்த ஊரில் இருந்தாலும், நீங்கள் வேலை செய்யும் மாநிலத்தில் உள்ள நியாயவிலைக் கடையில் பயோமெட்ரிக் கைரேகை வைத்து ரேஷன் பெறலாம். உங்கள் குடும்பத்தினர் சொந்த ஊரிலும் பெற முடியும்.',
      te: 'మీ రేషన్ కార్డు ఏ రాష్ట్రంలో ఉన్నా, మీరు పనిచేసే ప్రదేశంలోని రేషన్ షాపులో బయోమెట్రిక్ వేలిముద్రతో సరుకులు తీసుకోవచ్చు.',
      bn: 'আপনার রেশন কার্ড যে রাজ্যেরই হোক না কেন, ভিনরাজ্যে কাজ করার সময়ও কাছের রেশন দোকান থেকে আঙুলের ছাপ দিয়ে সস্তা রেশন তুলতে পারবেন।',
      mr: 'तुमचे रेशन कार्ड कोणत्याही राज्याचे असले तरी, कामाच्या ठिकाणी जवळच्या रेशन दुकानात बायोमेट्रिक अंगठा लावून स्वस्त धान्य घेऊ शकता.',
      en: 'Enables migrant workers to purchase subsidized grain at any Fair Price Shop across India using their existing ration card and biometric Aadhaar authentication, while their families can lift grain in their home village simultaneously.'
    },
    keyPoints: {
      hi: [
        'नया राशन कार्ड बनवाने की कोई जरूरत नहीं है',
        '‘मेरा राशन’ (Mera Ration) ऐप से नजदीकी राशन दुकान खोजें',
        'यदि कोई राशन डीलर मना करे तो 1967 या 14445 पर तुरंत शिकायत करें'
      ],
      ta: [
        'புதிய அட்டை தேவையில்லை, பழைய அட்டையே செல்லும்',
        '‘மேரா ரேஷன்’ செயலி மூலம் அருகில் உள்ள கடையை அறியலாம்',
        'மறுத்தால் 1967 என்ற எண்ணில் புகார் செய்யுங்கள்'
      ],
      te: [
        'కొత్త రేషన్ కార్డు అవసరం లేదు',
        '‘మేరా రేషన్’ యాప్ ద్వారా సమీప రేషన్ షాపు తెలుసుకోవచ్చు',
        'నిరాకరిస్తే 1967 కు ఫిర్యాదు చేయండి'
      ],
      bn: [
        'নতুন রেশন কার্ড তৈরির প্রয়োজন নেই',
        '‘মেরা রেশন’ অ্যাপের মাধ্যমে নিকটস্থ দোকান খুঁজুন',
        'ডিলার অস্বীকার করলে 1967 নম্বরে অভিযোগ করুন'
      ],
      mr: [
        'नवीन रेशन कार्ड काढण्याची गरज नाही',
        '‘मेरा रेशन’ ॲपद्वारे जवळचे दुकान शोधा',
        'राशन देण्यास नकार दिल्यास 1967 वर तक्रार करा'
      ],
      en: [
        'No need to issue a new ration card; existing card functions nationwide',
        'Download "Mera Ration" app to locate nearest operational FPS dealers',
        'Toll-Free grievance helpline: 1967 or 14445 for dealer denial'
      ]
    },
    actionLabel: {
      hi: 'राशन हेल्पलाइन: 1967',
      ta: 'ரேஷன் உதவி: 1967',
      te: 'రేషన్ హెల్ప్‌లైన్: 1967',
      bn: 'রেশন হেল্পলাইন: 1967',
      mr: 'रेशन हेल्पलाइन: 1967',
      en: 'Ration Helpline: 1967'
    },
    contactOrAction: 'tel:1967'
  },
  {
    id: 'res-pmjay',
    category: 'GOV_SCHEMES',
    iconName: 'HeartPulse',
    badge: {
      hi: '₹5 लाख मुफ्त इलाज',
      ta: '₹5 லட்சம் இலவச சிகிச்சை',
      te: '₹5 లక్షల ఉచిత వైద్యం',
      bn: '₹৫ লাখের ফ্রি চিকিৎসা',
      mr: '₹५ लाख मोफत उपचार',
      en: '₹5 Lakh Hospital Cover'
    },
    title: {
      hi: 'आयुष्मान भारत (PM-JAY गोल्डन कार्ड)',
      ta: 'ஆயுஷ்மான் பாரத் (PM-JAY)',
      te: 'ఆయుష్మాన్ భారత్ (PM-JAY)',
      bn: 'আয়ুষ্মান ভারত (PM-JAY)',
      mr: 'आयुष्मान भारत (PM-JAY)',
      en: 'Ayushman Bharat PM-JAY Health Cover'
    },
    subtitle: {
      hi: 'गंभीर बीमारी व ऑपरेशन के लिए ₹5 लाख तक का कैशलेस इलाज',
      ta: 'அறுவை சிகிச்சை மற்றும் சிகிச்சைக்கு ₹5 லட்சம் வரை இலவசம்',
      te: 'తీవ్రమైన జబ్బులకు ₹5 లక్షల వరకు ఉచిత వైద్య సదుపాయం',
      bn: 'অস্ত্রোপচার ও বড় রোগের চিকিৎসার জন্য ক্যাশলেস কার্ড',
      mr: 'मोठ्या आजारांवर आणि शस्त्रक्रियेसाठी ₹५ लाखांपर्यंत मोफत उपचार',
      en: 'Free Secondary & Tertiary Hospitalization across India'
    },
    description: {
      hi: 'कारखाने में काम करते हुए चोट लगने, फ्रैक्चर होने या परिवार में किसी को बड़ी बीमारी होने पर सरकारी और मान्यता प्राप्त प्राइवेट अस्पतालों में ₹5 लाख सालाना तक का इलाज मुफ्त मिलता है।',
      ta: 'விபத்துக் காயம், எலும்பு முறிவு அல்லது பெரிய நோய்களுக்கு ஆண்டுதோறும் ₹5 லட்சம் வரை தனியார் மற்றும் அரசு மருத்துவமனைகளில் இலவச சிகிச்சை பெறலாம்.',
      te: 'ఫ్యాక్టరీలో గాయాలు, ఫ్రాక్చర్లు లేదా తీవ్ర అనారోగ్యానికి ఏడాదికి ₹5 లక్షల వరకు ఉచిత చికిత్స లభిస్తుంది.',
      bn: 'কারখানায় দুর্ঘটনা বা পরিবারের যে কারও কঠিন রোগের চিকিৎসার জন্য হাসপাতালে বছরে ₹৫ লাখ পর্যন্ত সম্পূর্ণ বিনামূল্যে চিকিৎসা মেলে।',
      mr: 'कारखान्यात अपघात झाल्यास किंवा गंभीर आजारपणासाठी वर्षाला ₹५ लाखांपर्यंत कोणत्याही सूचीबद्ध रुग्णालयात मोफत उपचार मिळतात.',
      en: 'Provides ₹5,00,000 annual cashless coverage per family for hospitalization, critical surgeries, and workplace trauma at any empanelled public or private hospital nationwide.'
    },
    keyPoints: {
      hi: [
        'अस्पताल में भर्ती होने से लेकर दवाइयों का सारा खर्च योजना में शामिल',
        'दूसरे राज्य के बड़े अस्पतालों में भी यह कार्ड मान्य है',
        'हेल्पलाइन 14555 पर फोन करके अपनी पात्रता और नजदीकी अस्पताल जांचें'
      ],
      ta: [
        'மருத்துவமனை கட்டணம், மருந்துகள் அனைத்தும் இலவசம்',
        'பிற மாநில மருத்துவமனைகளிலும் செல்லும்',
        '14555 என்ற எண்ணில் மருத்துவமனை விவரம் அறியலாம்'
      ],
      te: [
        'మందులు మరియు ఆసుపత్రి ఖర్చులు పూర్తిగా ఉచితం',
        'ఇతర రాష్ట్రాల్లోని ఆసుపత్రులలో కూడా పనిచేస్తుంది',
        '14555 హెల్ప్‌లైన్ ద్వారా వివరాలు తెలుసుకోండి'
      ],
      bn: [
        'হাসপাতালে ভর্তি ও ওষুধের সমস্ত খরচ সরকারি প্রকল্পে কভার করা হয়',
        'ভিনরাজ্যের বড় হাসপাতালেও এই কার্ড গ্রহণযোগ্য',
        'হেল্পলাইন 14555 নম্বরে ফোন করে তালিকাভুক্ত হাসপাতাল জানুন'
      ],
      mr: [
        'दाखल होण्यापासून औषधांचा सर्व खर्च योजनेमध्ये समाविष्ट',
        'दुसऱ्या राज्यातील मोठ्या रुग्णालयांमध्येही कार्ड चालते',
        '14555 वर कॉल करून जवळचे रुग्णालय शोधा'
      ],
      en: [
        'Covers 1,900+ medical procedures, surgery, implants, and medicines',
        'Nationally portable across 28,000+ empanelled hospitals',
        'Dial 14555 to check eligibility using Aadhaar or ration card'
      ]
    },
    actionLabel: {
      hi: 'आयुष्मान हेल्पलाइन: 14555',
      ta: 'ஆயுஷ்மான் உதவி: 14555',
      te: 'ఆయుష్మాన్ హెల్ప్‌లైన్: 14555',
      bn: 'আয়ুষ্মান হেল্পলাইন: 14555',
      mr: 'आयुष्मान हेल्पलाइन: 14555',
      en: 'Ayushman Helpline: 14555'
    },
    contactOrAction: 'tel:14555'
  },

  // 2. Legal Rights
  {
    id: 'res-overtime-law',
    category: 'LEGAL_RIGHTS',
    iconName: 'Scale',
    badge: {
      hi: 'दुगनी दर (2x)',
      ta: 'இரட்டிப்பு ஊதியம்',
      te: 'డబుల్ రేట్',
      bn: 'দ্বিগুণ রেট',
      mr: 'दुप्पट दर',
      en: '2x Wage Mandate'
    },
    title: {
      hi: 'ओवरटाइम का कानूनी हक: सामान्य दर से दुगना (2x)',
      ta: 'ஓவர் டைம் சட்ட உரிமை: இரட்டிப்பு ஊதியம் (2x)',
      te: 'ఓవర్‌టైమ్ చట్టబద్ధ హక్కు: డబుల్ వేతనం (2x)',
      bn: 'ওভারটাইমের আইনি অধিকার: সাধারণের দ্বিগুণ (2x)',
      mr: 'ओव्हरटाईमचा कायदेशीर हक्क: दुप्पट मजुरी (2x)',
      en: 'Factories Act 1948: Mandatory 2x Overtime Rate'
    },
    subtitle: {
      hi: 'कारखाना अधिनियम धारा 59 के तहत ठेकेदार सिंगल रेट नहीं दे सकता',
      ta: 'தொழிற்சாலைகள் சட்டம் பிரிவு 59ன் கீழ் இரட்டிப்பு சம்பளம் கட்டாயம்',
      te: 'ఫ్యాక్టరీస్ యాక్ట్ సెక్షన్ 59 ప్రకారం సాధారణ రేటు ఇవ్వడం నేరం',
      bn: 'ফ্যাক্টরি আইনের ৫৯ ধারা অনুযায়ী সিঙ্গল রেট দেওয়া বেআইনি',
      mr: 'कारखाना कायदा कलम ५९ नुसार ओव्हरटाईम दुप्पट दरानेच मिळायला हवा',
      en: 'Section 59: Overtime must strictly be paid at double wages'
    },
    description: {
      hi: 'यदि आप एक दिन में 9 घंटे से अधिक या एक सप्ताह में 48 घंटे से अधिक काम करते हैं, तो ठेकेदार या कंपनी को अतिरिक्त घंटों का भुगतान साधारण वेतन से कम से कम दुगुने (2x Double) दर पर करना ही होगा। कोई भी ठेकेदार ओवरटाइम को सिंगल रेट पर नहीं निपटा सकता।',
      ta: 'ஒரு நாளில் 9 மணி நேரத்திற்கு மேலாகவோ அல்லது வாரத்தில் 48 மணி நேரத்திற்கு மேலாகவோ வேலை செய்தால், கூடுதல் நேரத்திற்கு உங்கள் வழக்கமான கூலியை விட 2 மடங்கு (Double) வழங்கப்பட வேண்டும். ஒற்றை கூலி தருவது சட்டப்படி தவறு.',
      te: 'రోజుకు 9 గంటలకు మించి లేదా వారానికి 48 గంటలకు మించి పనిచేస్తే, అదనపు గంటలకు సాధారణ వేతనం కంటే 2 రెట్లు (డబుల్) చెల్లించాలి.',
      bn: 'দিনে ৯ ঘণ্টার বেশি অথবা সপ্তাহে ৪৮ ঘণ্টার বেশি কাজ করালে কারখানা কর্তৃপক্ষ অতিরিক্ত সময়ের জন্য সাধারণ মজুরির দ্বিগুণ (2x) দিতে বাধ্য।',
      mr: 'दिवसात ९ तासांपेक्षा जास्त किंवा आठवड्यात ४८ तासांपेक्षा जास्त काम केल्यास, जास्तीच्या तासांसाठी दुप्पट (2x) मजुरी देणे मालक/ठेकेदारावर बंधनकारक आहे.',
      en: 'Under Section 59 of the Factories Act 1948 and OSH Code, any work exceeding 9 hours in a day or 48 hours in a week must be compensated at twice the ordinary rate of wages (2x). Paying single-rate OT is an illegal offense.'
    },
    keyPoints: {
      hi: [
        'उदाहरण: यदि मूल मजदूरी ₹70/घंटा है, तो OT का ₹140/घंटा मिलना चाहिए',
        'रोजाना अपने काम के घंटे सुरक्षा साथी ऐप में दर्ज करें ताकि पक्का सबूत रहे',
        'ठेकेदार द्वारा सिंगल रेट देने पर लेबर कोर्ट या लेबर कमिश्नर में शिकायत दर्ज हो सकती है'
      ],
      ta: [
        'உதாரணம்: மணி கூலி ₹70 என்றால், OT க்கு ₹140 கிடைக்க வேண்டும்',
        'தினசரி நேரத்தை இந்த செயலியில் குறித்து வைத்து ஆதாரமாக வைத்திருங்கள்',
        'மறுத்தால் தொழிலாளர் நலத்துறை அதிகாரியிடம் புகார் அளிக்கலாம்'
      ],
      te: [
        'ఉదాహరణ: గంటకు ₹70 అయితే, OT కి ₹140 ఇవ్వాలి',
        'ప్రతిరోజూ మీ పని గంటలను ఈ యాప్‌లో రికార్డ్ చేసుకోండి',
        'తక్కువ ఇస్తే లేబర్ కమిషనర్ కార్యాలయంలో ఫిర్యాదు చేయవచ్చు'
      ],
      bn: [
        'উদাহরণ: মূল মজুরি যদি ঘণ্টায় ₹৭০ হয়, তবে OT-তে ঘণ্টায় ₹১৪০ প্রাপ্য',
        'দৈনিক কাজের সময় অ্যাপে লিখে রাখুন যাতে প্রমাণ থাকে',
        'কম মজুরি দিলে শ্রম আদালতে অভিযোগ করা যায়'
      ],
      mr: [
        'उदाहरण: ताशी मजुरी ₹७० असेल, तर ओव्हरटाईमसाठी ₹१४० मिळालेच पाहिजेत',
        'रोजचे कामाचे तास या ॲपमध्ये नोंदवून ठेवा',
        'कमी दर दिल्यास कामगार आयुक्तांकडे तक्रार करता येते'
      ],
      en: [
        'Formula: If normal hourly rate is ₹70/hr, OT must be ₹140/hr',
        'Maintain daily logs in Suraksha Saathi as admissible digital work evidence',
        'File online complaint at samadhan.labour.gov.in for unpaid wage differentials'
      ]
    },
    actionLabel: {
      hi: 'श्रम समाधान पोर्टल देखें',
      ta: 'தொழிலாளர் தீர்வு போர்டல்',
      te: 'లేబర్ సమాధాన్ పోర్టల్',
      bn: 'শ্রম সমাধান পোর্টাল',
      mr: 'कामगार समाधान पोर्टल',
      en: 'Labour Samadhan Portal'
    },
    contactOrAction: 'https://samadhan.labour.gov.in'
  },
  {
    id: 'res-refuse-unsafe-work',
    category: 'LEGAL_RIGHTS',
    iconName: 'AlertOctagon',
    badge: {
      hi: 'जान का अधिकार',
      ta: 'பாதுகாப்பு உரிமை',
      te: 'ప్రాణ రక్షణ హక్కు',
      bn: 'প্রাণের অধিকার',
      mr: 'सुरक्षिततेचा हक्क',
      en: 'Safety Right'
    },
    title: {
      hi: 'असुरक्षित काम से मना करने का अधिकार',
      ta: 'ஆபத்தான வேலையை மறுக்கும் உரிமை',
      te: 'ప్రమాదకరమైన పనిని తిరస్కరించే హక్కు',
      bn: 'বিপজ্জনক কাজ প্রত্যাখ্যানের অধিকার',
      mr: 'धोकादायक काम नाकारण्याचा अधिकार',
      en: 'Right to Refuse Imminently Dangerous Work'
    },
    subtitle: {
      hi: 'बिना सेफ्टी गार्ड या PPE के जान जोखिम में डालकर काम न करें',
      ta: 'பாதுகாப்பு உபகரணங்கள் இன்றி உயிருக்கு ஆபத்தான வேலையை செய்யாதீர்கள்',
      te: 'సరైన సేఫ్టీ లేకుండా ప్రాణాలను పణంగా పెట్టవద్దు',
      bn: 'সুরক্ষা সরঞ্জাম ছাড়া প্রাণের ঝুঁকি নিয়ে কাজ করতে বাধ্য নন',
      mr: 'सुरक्षा उपकरणांशिवाय जिवावर बेतणारे काम करण्यास नकार द्या',
      en: 'Statutory Protection against Unsafe Working Conditions'
    },
    description: {
      hi: 'कानून के अनुसार, यदि किसी मशीन का सेफ्टी गार्ड टूटा है, जहरीली गैस का रिसाव हो रहा है, या आवश्यक सुरक्षा किट (ग्लव्स, हेलमेट, सेफ्टी शूज) नहीं दी गई है, तो मज़दूर को काम रोकने और सुपरवाइजर को सूचित करने का पूर्ण कानूनी अधिकार है। इसके लिए आपको नौकरी से नहीं निकाला जा सकता।',
      ta: 'இயந்திரத்தின் பாதுகாப்பு கவசம் உடைந்திருந்தாலோ, ரசாயன கசிவு இருந்தாலோ, பாதுகாப்பு உடைகள் வழங்கப்படாவிட்டாலோ வேலையை நிறுத்திவிட்டு அதிகாரியிடம் தெரிவிக்கும் உரிமை உங்களுக்கு உண்டு. இதற்காக வேலையிலிருந்து நீக்க முடியாது.',
      te: 'మెషీన్ గార్డ్ విరిగిపోయినా, విషవాయువు లీకవుతున్నా, సేఫ్టీ పరికరాలు ఇవ్వకపోయినా పని ఆపేసి అధికారికి చెప్పే హక్కు మీకు ఉంది. మిమ్మల్ని ఉద్యోగం నుండి తొలగించడం చట్టవిరుద్ధం.',
      bn: 'মেশিনের গার্ড ভাঙা থাকলে, বিষাক্ত গ্যাস লিক হলে বা জুতো-হেলমেট না দিলে আপনি কাজ বন্ধ রেখে সুপারভাইজারকে জানাতে পারেন। এর জন্য ছাঁটাই করা বেআইনি।',
      mr: 'यंत्राचे सेफ्टी गार्ड तुटले असल्यास किंवा विषारी वायू गळती होत असल्यास, सुरक्षिततेची साधने मिळेपर्यंत काम थांबवण्याचा तुम्हाला पूर्ण अधिकार आहे. यासाठी मालक कामावरून काढू शकत नाही.',
      en: 'Under Occupational Safety & Health Code, workers have the statutory right to withdraw from machine operations when they reasonably believe an imminent danger of serious physical injury or death exists, without fear of wage deduction or termination.'
    },
    keyPoints: {
      hi: [
        'मालिक या ठेकेदार को सभी सुरक्षा उपकरण (PPE) मुफ्त में देना कानूनी बाध्यता है',
        'खतरे की स्थिति में तुरंत अन्य साथियों को अलर्ट करें और शिकायत पेटी में फोटो भेजें',
        'गैर-कानूनी दबाव बनाने पर लेबर इंस्पेक्टर को गोपनीय सूचना दें'
      ],
      ta: [
        'பாதுகாப்பு உபகரணங்களை நிறுவனம் இலவசமாக வழங்க வேண்டும்',
        'ஆபத்து இருந்தால் உடனடியாக புகார் பெட்டியில் தெரிவிக்கவும்',
        'அச்சுறுத்தினால் தொழிலாளர் ஆய்வாளரிடம் தெரிவிக்கலாம்'
      ],
      te: [
        'రక్షణ పరికరాలను యజమాని ఉచితంగా ఇవ్వడం తప్పనిసరి',
        'ప్రమాదం ఉంటే వెంటనే ఫిర్యాదు పెట్టెలో ఫోటో పంపండి',
        'బెదిరింపులకు పాల్పడితే లేబర్ ఇన్‌స్పెక్టర్‌కు ఫిర్యాదు చేయండి'
      ],
      bn: [
        'সুরক্ষা সরঞ্জাম বিনামূল্যে প্রদান করা কারখানা মালিকের আইনি দায়িত্ব',
        'বিপদ দেখলে গোপন বাক্সে ছবিসহ রিপোর্ট জমা দিন',
        'জোরজবরদস্তি করলে লেবার ইন্সপেক্টরকে জানান'
      ],
      mr: [
        'सर्व सुरक्षा साधने (PPE) मोफत देणे कंपनीवर बंधनकारक आहे',
        'धोका दिसल्यास लगेच सहकाऱ्यांना सावध करा व गोपनीय तक्रार नोंदवा',
        'दबाव आणल्यास कामगार निरीक्षकाकडे तक्रार करा'
      ],
      en: [
        'Mandatory provision of certified PPE (boots, goggles, gloves) free of charge',
        'Instant anonymous reporting via Suraksha Saathi Grievance Box',
        'Employers cannot withhold pay or penalize workers for raising safety red flags'
      ]
    },
    actionLabel: {
      hi: 'राष्ट्रीय श्रम हेल्पलाइन: 14434',
      ta: 'தேசிய உதவி எண்: 14434',
      te: 'జాతీయ లేబర్ హెల్ప్‌లైన్: 14434',
      bn: 'জাতীয় শ্রম হেল্পলাইন: 14434',
      mr: 'राष्ट्रीय कामगार हेल्पलाइन: 14434',
      en: 'National Labour Helpline: 14434'
    },
    contactOrAction: 'tel:14434'
  },
  {
    id: 'res-id-confiscation-illegal',
    category: 'LEGAL_RIGHTS',
    iconName: 'FileText',
    badge: {
      hi: 'दस्तावेज सुरक्षा',
      ta: 'ஆவண பாதுகாப்பு',
      te: 'పత్రాల రక్షణ',
      bn: 'নথি সুরক্ষা',
      mr: 'कागदपत्रे संरक्षण',
      en: 'Strictly Prohibited'
    },
    title: {
      hi: 'मूल दस्तावेज (आधार, बैंक पासबुक) जब्त करना गैरकानूनी है',
      ta: 'அசல் ஆவணங்களை (ஆதார், பாஸ்புக்) பறிமுதல் செய்வது குற்றம்',
      te: 'ఒరిజినల్ పత్రాలు (ఆధార్, పాస్‌బుక్) లాక్కోవడం నేరం',
      bn: 'আসল নথি (আধার, পাসবুক) আটকে রাখা সম্পূর্ণ বেআইনি',
      mr: 'मूळ कागदपत्रे (आधार, पासबुक) जप्त करणे बेकायदेशीर आहे',
      en: 'Prohibition of Original Identity Document Retention'
    },
    subtitle: {
      hi: 'कोई भी ठेकेदार या फैक्ट्री मालिक आपके मूल कागजात नहीं रख सकता',
      ta: 'எந்த ஒப்பந்ததாரரும் உங்கள் அசல் ஆவணங்களை பிடித்து வைக்க முடியாது',
      te: 'ఏ కాంట్రాక్టర్ మీ ఒరిజినల్ పత్రాలను తన వద్ద ఉంచుకోరాదు',
      bn: 'কোনো ঠিকাদার আসল কাগজপত্র নিজের কাছে জমা রাখতে পারে না',
      mr: 'कोणताही ठेकेदार तुमची मूळ कागदपत्रे स्वतःकडे ठेवू शकत नाही',
      en: 'Contractors cannot retain Aadhaar, Voter ID, or Bank Books'
    },
    description: {
      hi: 'प्रवासी कामगार अधिनियम और बंधुआ श्रम उन्मूलन कानून के तहत, काम पर रखते समय ठेकेदार केवल फोटोकॉपी (ज़ेरॉक्स) ले सकता है। यदि कोई ठेकेदार आपके गांव जाने से रोकने या पैसे दबाने के लिए मूल आधार कार्ड, वोटर आईडी या बैंक पासबुक जब्त करता है तो यह कानूनी अपराध है।',
      ta: 'வேலைக்கு சேரும் போது நகல் (ஜெராக்ஸ்) மட்டுமே கொடுக்க வேண்டும். உங்கள் அசல் ஆதார் அட்டை அல்லது வங்கி புத்தகத்தை ஒப்பந்ததாரர் தன் வசம் பிடித்து வைப்பது சட்டப்படி சிறைத்தண்டனைக்குரிய குற்றமாகும்.',
      te: 'పనికి చేర్చుకునే సమయంలో కేవలం జిరాక్స్ కాపీలు మాత్రమే ఇవ్వాలి. ఒరిజినల్ ఆధార్ కార్డు లేదా బ్యాంక్ బుక్ లాక్కుంటే అది చట్టరీత్యా తీవ్రమైన నేరం.',
      bn: 'কাজের সময় ঠিকাদারকে শুধুমাত্র জেরক্স কপি দেবেন। বাড়ি যাওয়া আটকাতে আসল আধার বা ব্যাংকের খাতা জমা রাখা আইনত দণ্ডনীয় অপরাধ।',
      mr: 'कामावर रुजू होताना फक्त झेरॉक्स प्रत द्यावी. मूळ आधार कार्ड किंवा बँक पासबुक ठेकेदाराने स्वतःकडे ठेवणे हा शिक्षेस पात्र गुन्हा आहे.',
      en: 'Under Interstate Migrant Workmen Act and Bonded Labour System Abolition Act, employers and labor agents are strictly barred from seizing original identity cards, ration cards, or ATM/bank passbooks to restrict worker mobility.'
    },
    keyPoints: {
      hi: [
        'हमेशा केवल सेल्फ-अटेस्टेड ज़ेरॉक्स कॉपी ही जमा करें',
        'मूल दस्तावेज तुरंत वापस मांगें; देने से मना करने पर 112 या 14434 पर कॉल करें',
        'अपने फोन में सभी दस्तावेजों की फोटो सुरक्षित रखें'
      ],
      ta: [
        'எப்போதும் ஜெராக்ஸ் மட்டுமே சமர்ப்பிக்கவும்',
        'அசல் ஆவணங்களை திருப்பித் தர மறுத்தால் 112 அல்லது 14434ல் தொடர்பு கொள்ளவும்',
        'போனில் ஆவணங்களின் புகைப்படத்தை சேமித்து வைக்கவும்'
      ],
      te: [
        'ఎల్లప్పుడూ కేవలం జిరాక్స్ కాపీలను మాత్రమే ఇవ్వండి',
        'ఒరిజినల్స్ తిరిగి ఇవ్వకపోతే 112 లేదా 14434 కు కాల్ చేయండి',
        'మీ ఫోన్‌లో పత్రాల ఫోటోలను భద్రపరుచుకోండి'
      ],
      bn: [
        'সবসময় শুধু জেরক্স কপি জমা দিন',
        'আসল নথি আটকে রাখলে ১১২ বা ১৪৪৩৪ নম্বরে ফোন করুন',
        'ফোনে সমস্ত নথির ছবি তুলে সুরক্ষিত রাখুন'
      ],
      mr: [
        'नेहमी फक्त झेरॉक्स प्रतच सादर करा',
        'मूळ कागदपत्रे परत न दिल्यास ११२ किंवा १४४३४ वर तक्रार करा',
        'फोनमध्ये सर्व कागदपत्रांचे फोटो काढून सुरक्षित ठेवा'
      ],
      en: [
        'Submit only attested photocopies during onboarding; never surrender originals',
        'Retention of documents constitutes forced bonded labor under Indian law',
        'Dial Police (112) or Labour Helpline (14434) for immediate retrieval'
      ]
    },
    actionLabel: {
      hi: 'पुलिस इमरजेंसी: 112',
      ta: 'காவல்துறை: 112',
      te: 'పోలీస్: 112',
      bn: 'পুলিশ: 112',
      mr: 'पोलीस: 112',
      en: 'Police Helpline: 112'
    },
    contactOrAction: 'tel:112'
  },

  // 3. Financial Literacy & PF Check
  {
    id: 'res-pf-uan-sms',
    category: 'FINANCIAL_LITERACY',
    iconName: 'CreditCard',
    badge: {
      hi: 'मुफ्त SMS जांच',
      ta: 'இலவச SMS சரிபார்ப்பு',
      te: 'ఉచిత SMS తనిఖీ',
      bn: 'ফ্রি SMS চেক',
      mr: 'मोफत SMS तपासणी',
      en: 'SMS Balance Check'
    },
    title: {
      hi: 'पीएफ (PF/EPFO) बैलेंस जांचें: मिस्ड कॉल और SMS से',
      ta: 'பிஎஃப் (PF) இருப்பை அறிய: மிஸ்டு கால் & SMS',
      te: 'PF బ్యాలెన్స్ తెలుసుకోండి: మిస్డ్ కాల్ & SMS',
      bn: 'পিএফ ব্যালেন্স জানুন: মিসড কল ও SMS-এর মাধ্যমে',
      mr: 'पीएफ (PF) शिल्लक तपासा: मिस्ड कॉल व SMS द्वारे',
      en: 'EPFO PF Balance Check via SMS & Missed Call'
    },
    subtitle: {
      hi: 'ठेकेदार आपकी मजदूरी से काटा गया पीएफ सरकार में जमा कर रहा है या नहीं?',
      ta: 'ஒப்பந்ததாரர் உங்கள் பிஎஃப் தொகையை முறையாக செலுத்துகிறாரா என சரிபார்க்கவும்',
      te: 'కాంట్రాక్టర్ మీ PF డబ్బులు సరిగ్గా జమ చేస్తున్నారా లేదా?',
      bn: 'ঠিকাদার আপনার কাটা পিএফ টাকা সরকারি অ্যাকাউন্টে জমা করছে তো?',
      mr: 'ठेकेदार तुमच्या पगारातून कापलेला पीएफ खात्यात भरत आहे का ते तपासा',
      en: 'Verify your employer is actually depositing your Provident Fund'
    },
    description: {
      hi: 'अनेक बार ठेकेदार वेतन से 12% पीएफ काट लेते हैं लेकिन सरकार के ईपीएफओ खाते में जमा नहीं करते। बिना इंटरनेट या स्मार्टफोन के भी आप केवल एक मिस्ड कॉल या साधारण SMS भेजकर चेक कर सकते हैं कि आपके खाते में कितने पैसे जमा हुए हैं।',
      ta: 'பல நேரங்களில் ஒப்பந்ததாரர்கள் சம்பளத்தில் பிஎஃப் பிடித்தம் செய்து விட்டு அரசுக்கு செலுத்துவதில்லை. இன்டர்நெட் இல்லாமலேயே ஒரு மிஸ்டு கால் அல்லது சாதாரண SMS மூலம் உங்கள் PF நிலுவையை எளிதாக அறியலாம்.',
      te: 'కొందరు కాంట్రాక్టర్లు జీతంలో PF కట్ చేసుకుని ప్రభుత్వానికి కట్టరు. ఇంటర్నెట్ లేకపోయినా ఒక మిస్డ్ కాల్ లేదా SMS ద్వారా మీ PF బ్యాలెన్స్ తెలుసుకోవచ్చు.',
      bn: 'অনেক সময় ঠিকাদার মজুরি থেকে পিএফ বাবদ টাকা কাটলেও সরকারি ফান্ডে জমা দেয় না। ইন্টারনেট ছাড়াই একটি মিসড কল বা এসএমএস করে আপনার জমার পরিমাণ যাচাই করুন।',
      mr: 'बऱ्याचदा ठेकेदार पगारातून पीएफ कापतात पण सरकारी खात्यात जमा करत नाहीत. इंटरनेट नसतानाही फक्त एका मिस्ड कॉलने किंवा SMS द्वारे खात्यातील जमा रक्कम तपासा.',
      en: 'Many unscrupulous labor contractors deduct 12% PF from monthly worker wages but fail to deposit it into EPFO. You can verify live balance, UAN deposits, and contractor contributions without an internet connection using missed call or SMS.'
    },
    keyPoints: {
      hi: [
        'मिस्ड कॉल नंबर: 9966044425 पर अपने रजिस्टर्ड नंबर से घंटी दें, 10 सेकंड में SMS आ जाएगा',
        'SMS तरीका: 7738299899 पर लिखें: EPFOHO UAN HIN (हिंदी के लिए) या ENG (अंग्रेजी के लिए)',
        'यदि ठेकेदार ने कटौती की और खाते में जमा नहीं हुआ, तो ईपीएफओ पोर्टल पर शिकायत करें'
      ],
      ta: [
        'மிஸ்டு கால்: 9966044425 எண்ணிற்கு உங்கள் பதிவு செய்யப்பட்ட எண்ணிலிருந்து அழைக்கவும்',
        'SMS முறை: 7738299899 எண்ணிற்கு EPFOHO UAN TAM என அனுப்பவும்',
        'பணம் செலுத்தப்படாவிட்டால் உடனடி புகார் பதிவு செய்யுங்கள்'
      ],
      te: [
        'మిస్డ్ కాల్: 9966044425 నంబర్‌కు కాల్ చేయండి, వెంటనే SMS వస్తుంది',
        'SMS విధానం: 7738299899 నంబర్‌కు EPFOHO UAN TEL అని మెసేజ్ చేయండి',
        'డిపాజిట్ చేయకపోతే నేరుగా EPFO పోర్టల్‌లో ఫిర్యాదు చేయవచ్చు'
      ],
      bn: [
        'মিসড কল: ৯৯৬৬০৪৪৪২৫ নম্বরে ফোন করুন, ১০ সেকেন্ডে এসএমএসে ব্যালেন্স আসবে',
        'এসএমএস পদ্ধতি: ৭৭৩৮২৯৯৮৯৯ নম্বরে পাঠান: EPFOHO UAN BEN',
        'টাকা জমা না পড়লে ইপিএফও কমিশনারের কাছে নালিশ জানান'
      ],
      mr: [
        'मिस्ड कॉल: ९९६६०४४४२५ वर नोंदणीकृत मोबाईलवरून रिंग द्या, लगेच मेसेज येईल',
        'SMS पद्धत: ७७३८२९९८९९ वर पाठवा: EPFOHO UAN MAR',
        'पैसे जमा न केल्यास त्वरित तक्रार दाखल करा'
      ],
      en: [
        'Free Missed Call: Give a missed call to 9966044425 from your registered mobile',
        'SMS Query: Send "EPFOHO UAN ENG" to 7738299899 to get month-wise credit statement',
        'File grievance directly at epfigms.gov.in if deductions are missing'
      ]
    },
    actionLabel: {
      hi: 'मिस्ड कॉल दें: 9966044425',
      ta: 'அழைக்க: 9966044425',
      te: 'కాల్ చేయండి: 9966044425',
      bn: 'কল করুন: 9966044425',
      mr: 'कॉल करा: 9966044425',
      en: 'Missed Call: 9966044425'
    },
    contactOrAction: 'tel:9966044425'
  },
  {
    id: 'res-safe-remittance-loan-trap',
    category: 'FINANCIAL_LITERACY',
    iconName: 'BadgePercent',
    badge: {
      hi: 'ब्याज व कर्ज सुरक्षा',
      ta: 'வட்டி & கடன் விழிப்புணர்வு',
      te: 'వడ్డీ మాఫియా హెచ్చరిక',
      bn: 'সুদ ও ঋণের ফাঁদ',
      mr: 'कर्ज व व्याज संरक्षण',
      en: 'Debt Trap Warning'
    },
    title: {
      hi: 'मीटर ब्याज और 10% सूदखोरों से बचें + गांव सुरक्षित पैसे भेजें',
      ta: 'கந்துவட்டி மற்றும் அதிக வட்டி கடனை தவிர்க்கவும் + ஊருக்கு பாதுகாப்பாக பணம் அனுப்பவும்',
      te: 'మీటర్ వడ్డీ మరియు అప్పుల ఊబి నుండి రక్షణ + ఊరికి సురక్షితంగా డబ్బు పంపడం',
      bn: 'মিটার সুদ ও মহাজনের ফাঁদ থেকে সাবধান + গ্রামে নিরাপদে টাকা পাঠানো',
      mr: '१०% मीटर व्याजाच्या जाळ्यात अडकू नका + गावी सुरक्षित पैसे पाठवा',
      en: 'Avoiding Meter Byaaj Loan Traps & Safe Family Remittances'
    },
    subtitle: {
      hi: 'हवाला व बिचौलियों के चक्कर से बचें, डाकघर IPPB या बैंक खाते से भेजें',
      ta: 'தரகர்கள் இன்றி தபால் அலுவலகம் (IPPB) அல்லது வங்கி மூலம் பணம் அனுப்புங்கள்',
      te: 'దళారులను నమ్మకండి, పోస్టాఫీస్ IPPB లేదా బ్యాంక్ ద్వారా మాత్రమే పంపండి',
      bn: 'দালালদের এড়িয়ে পোস্ট অফিস বা ব্যাংকের মাধ্যমে গ্রামে টাকা পাঠান',
      mr: 'दलालांना टाळा, पोस्ट ऑफिस IPPB किंवा बँकेतूनच गावी पैसे पाठवा',
      en: 'Zero-commission transfers & escaping 120% APR illegal money lenders'
    },
    description: {
      hi: 'औद्योगिक क्षेत्रों में ठेकेदार या स्थानीय सूदखोर 5% से 10% मासिक (मीटर ब्याज) पर कर्ज देते हैं, जो साल में 120% बन जाता है और मज़दूर जिंदगी भर कर्ज नहीं चुका पाता। जरूरत पड़ने पर केवल जनधन बैंक ओवरड्राफ्ट (₹10,000) या सेल्फ हेल्प ग्रुप से ही कम ब्याज पर मदद लें।',
      ta: 'தொழிற்சாலை பகுதிகளில் மாதத்திற்கு 5% முதல் 10% வரை கந்துவட்டி வாங்கி தொழிலாளர்களை கடனாளியாக்கும் கும்பல் உள்ளது. அவசரத்திற்கு ஜந்தன் வங்கி ஓவர்டிராப்ட் அல்லது அரசு உதவி பெறுங்கள்.',
      te: 'నెలవారీ 5-10% మీటర్ వడ్డీకి అప్పులు తీసుకోవద్దు, అది కార్మికుల జీవితాలను నాశనం చేస్తుంది. జన్ ధన్ ఖాతా ద్వారా తక్కువ వడ్డీ రుణాలు పొందండి.',
      bn: 'কারখানা অঞ্চলে ৫-১০% মাসিক চড়া সুদে (মিটার সুদ) ঋণ নিয়ে শ্রমিকরা ঋণের জালে জড়িয়ে পড়েন। পোস্ট অফিস বা জনধন ব্যাংক অ্যাকাউন্টের মাধ্যমে আর্থিক লেনদেন করুন।',
      mr: 'महिन्याला ५ ते १०% व्याजाने (मीटर व्याज) पैसे घेणे टाळा, अन्यथा आयुष्यभर कर्ज फिटत नाही. गरजेच्या वेळी जनधन बँक किंवा पोस्ट ऑफिसचा आधार घ्या.',
      en: 'Unregulated moneylenders in factory clusters charge 5-10% monthly interest (60-120% APR), entrapping migrant families in generational debt. Use zero-balance PMJDY bank overdrafts (up to ₹10,000) or India Post Payments Bank (IPPB).'
    },
    keyPoints: {
      hi: [
        'गांव पैसे भेजते समय किसी अनजान को अपना ATM पिन या बैंक OTP कभी न बताएं',
        'डाकघर (Post Office IPPB) में आधार अंगूठा लगाकर केवल ₹5-10 में गांव पैसे तुरंत पहुंचते हैं',
        'सूदखोरों द्वारा धमकाने पर तुरंत 112 या राष्ट्रीय श्रम हेल्पलाइन पर शिकायत करें'
      ],
      ta: [
        'ஏடிஎம் பின் எண் அல்லது வங்கி OTP யை யாருடனும் பகிர வேண்டாம்',
        'தபால் நிலைய IPPB மூலம் குறைந்த கட்டணத்தில் ஊருக்கு உடனடியாக பணம் அனுப்பலாம்',
        'கந்துவட்டி மிரட்டல் வந்தால் 112 என்ற எண்ணில் புகார் செய்யுங்கள்'
      ],
      te: [
        'ATM పిన్ లేదా బ్యాంక్ OTP ని ఎవరికీ చెప్పవద్దు',
        'పోస్టాఫీస్ IPPB ద్వారా సురక్షితంగా మరియు చౌకగా ఊరికి డబ్బు పంపండి',
        'వడ్డీ వ్యాపారులు వేధిస్తే 112 కు కాల్ చేయండి'
      ],
      bn: [
        'এটিএম পিন বা ব্যাংক ওটিপি কখনো কোনো দালাল বা সুপারভাইজারকে বলবেন না',
        'পোস্ট অফিসের আইপিপিবি মারফত কম খরচে গ্রামে টাকা পাঠান',
        'সুদখোর হুমকি দিলে ১১২ নম্বরে পুলিশে খবর দিন'
      ],
      mr: [
        'गावी पैसे पाठवताना कोणालाही आपला ATM पिन किंवा OTP सांगू नका',
        'पोस्ट ऑफिस IPPB द्वारे सुरक्षित व कमी शुल्कात गावी पैसे पाठवा',
        'सावकाराने धमकावल्यास ११२ वर तक्रार नोंदवा'
      ],
      en: [
        'Never disclose your 4-digit ATM PIN or bank SMS OTP to labor contractors',
        'India Post Payments Bank (IPPB) allows instant Aadhaar-enabled remittance home for minimal fees',
        'Illegal usury and intimidation is a punishable offense under state Money Lenders Acts'
      ]
    },
    actionLabel: {
      hi: 'डाकघर IPPB जानकारी',
      ta: 'IPPB வங்கி உதவி',
      te: 'IPPB సహాయం',
      bn: 'IPPB ডাকঘর সহায়তা',
      mr: 'पोस्ट ऑफिस माहिती',
      en: 'India Post Helpline'
    },
    contactOrAction: 'tel:155299'
  },

  // 4. Helplines & Community Support
  {
    id: 'res-national-labour-helpline',
    category: 'COMMUNITY_HELPLINES',
    iconName: 'PhoneCall',
    badge: {
      hi: '24x7 टोल-फ्री',
      ta: '24x7 இலவச எண்',
      te: '24x7 టోల్ ఫ్రీ',
      bn: '২৪x৭ টোল-ফ্রি',
      mr: '२४x७ टोल-फ्री',
      en: '24/7 Toll-Free'
    },
    title: {
      hi: 'राष्ट्रीय श्रम व प्रवासी मज़दूर हेल्पलाइन: 14434',
      ta: 'தேசிய தொழிலாளர் மற்றும் புலம்பெயர்ந்தோர் உதவி எண்: 14434',
      te: 'జాతీయ కార్మిక మరియు వలసదారుల హెల్ప్‌లైన్: 14434',
      bn: 'জাতীয় শ্রম ও পরিযায়ী শ্রমিক হেল্পলাইন: ১৪৪৩৪',
      mr: 'राष्ट्रीय कामगार व स्थलांतरित हेल्पलाइन: १४४३४',
      en: 'National Labour & Migrant Worker Helpline: 14434'
    },
    subtitle: {
      hi: 'केंद्रीय श्रम मंत्रालय द्वारा संचालित बहुभाषी शिकायत निवारण',
      ta: 'மத்திய தொழிலாளர் அமைச்சகத்தின் பலமொழி உதவி மையம்',
      te: 'కేంద్ర కార్మిక మంత్రిత్వ శాఖ బహుభాషా సహాయ కేంద్రం',
      bn: 'কেন্দ্রীয় শ্রম মন্ত্রকের বহুভাষিক অভিযোগ প্রতিকার ব্যবস্থা',
      mr: 'केंद्रीय कामगार मंत्रालयाची बहुभाषिक तक्रार निवारण सेवा',
      en: 'Ministry of Labour & Employment 24x7 Multilingual Call Center'
    },
    description: {
      hi: 'वेतन न मिलने, ठेकेदार द्वारा बंधक बनाने, जबरन काम कराने या कारखाने में सुरक्षा न मिलने पर सीधे केंद्र सरकार की इस हेल्पलाइन पर फोन करें। यहां हिंदी, तमिल, तेलुगु, बंगाली, मराठी सहित 10+ भाषाओं में सहायता उपलब्ध है।',
      ta: 'சம்பள பாக்கி, கொத்தடிமை முறை, கட்டாய வேலை அல்லது பாதுகாப்பு குறைபாடுகள் இருந்தால் இந்த இலவச எண்ணில் தொடர்பு கொள்ளலாம். தமிழ் உட்பட பல மொழிகளில் பேசலாம்.',
      te: 'జీతాలు ఇవ్వకపోవడం, నిర్బంధించి పని చేయించడం, లేదా భద్రత లేకపోవడంపై నేరుగా కేంద్ర ప్రభుత్వ హెల్ప్‌లైన్‌కు కాల్ చేయవచ్చు. తెలుగులో మాట్లాడవచ్చు.',
      bn: 'মজুরি আটকে রাখা, জোর করে অতিরিক্ত খাটানো বা বিপদের মুখে ফেললে সরাসরি কেন্দ্রীয় সরকারের এই হেল্পলাইনে ফোন করুন। বাংলাতেও কথা বলা যায়।',
      mr: 'पगार न मिळणे, वेठबिगारी किंवा कारखान्यात सुरक्षिततेचा अभाव असल्यास केंद्र सरकारच्या या हेल्पलाइनवर थेट संपर्क साधा. मराठीत संवाद उपलब्ध आहे.',
      en: 'Dedicated national grievance mechanism for interstate migrant workers handling unpaid wages, wage theft, workplace accidents, contractor exploitation, and forced overtime in 10+ Indian languages.'
    },
    keyPoints: {
      hi: [
        'कॉल करने के लिए कोई पैसा नहीं लगता (पूरी तरह निशुल्क)',
        'आपकी भाषा में अधिकारी सीधे बात करेंगे और कानूनी कार्रवाई कराएंगे',
        'आवश्यकता पड़ने पर स्थानीय ज़िला मजिस्ट्रेट (DM) व लेबर कमिश्नर को टीम भेजते हैं'
      ],
      ta: [
        'அழைப்பு கட்டணம் முற்றிலும் இலவசம்',
        'உங்கள் தாய்மொழியிலேயே அதிகாரிகள் பேசி உதவுவார்கள்',
        'உடனடி சட்ட நடவடிக்கை எடுக்கப்படும்'
      ],
      te: [
        'కాల్ చేయడం పూర్తిగా ఉచితం',
        'మీ మాతృభాషలోనే అధికారులు మాట్లాడి పరిష్కరిస్తారు',
        'జిల్లా యంత్రాంగానికి వెంటనే ఆదేశాలు ఇస్తారు'
      ],
      bn: [
        'সম্পূর্ণ বিনামূল্যে কল করা যায়',
        'নিজের মাতৃভাষায় কথা বলে অভিযোগ জানানো সম্ভব',
        'প্রয়োজনে জেলা প্রশাসনের মাধ্যমে দ্রুত হস্তক্ষেপ করা হয়'
      ],
      mr: [
        'कॉल करण्यासाठी कोणतेही पैसे लागत नाहीत',
        'तुमच्या भाषेत अधिकारी बोलून कायदेशीर मदत मिळवून देतील',
        'जिल्हाधिकाऱ्यांना थेट सूचना दिल्या जातात'
      ],
      en: [
        'Completely toll-free from any mobile network in India',
        'Staffed by trained grievance counselors fluent in regional mother tongues',
        'Direct escalation to District Collector and State Labour Commissioners'
      ]
    },
    actionLabel: {
      hi: 'सीधे कॉल करें: 14434',
      ta: 'இப்போதே அழைக்க: 14434',
      te: 'ఇప్పుడే కాల్ చేయండి: 14434',
      bn: 'এখনই কল করুন: 14434',
      mr: 'आत्ताच कॉल करा: १४४३४',
      en: 'Call Now: 14434'
    },
    contactOrAction: 'tel:14434'
  },
  {
    id: 'res-tele-manas',
    category: 'COMMUNITY_HELPLINES',
    iconName: 'Smile',
    badge: {
      hi: 'मानसिक तनाव व परामर्श',
      ta: 'மன அழுத்த உதவி',
      te: 'మానసిక ప్రశాంతత',
      bn: 'মানসিক সহায়তা',
      mr: 'मानसिक ताण निवारण',
      en: 'Mental Health'
    },
    title: {
      hi: 'टेली-मानस (Tele-MANAS) मानसिक स्वास्थ्य हेल्पलाइन: 14416',
      ta: 'டெலி-மானஸ் மனநல உதவி எண்: 14416',
      te: 'టెలి-మానస్ మానసిక ఆరోగ్య హెల్ప్‌లైన్: 14416',
      bn: 'টেলি-মানস মানসিক স্বাস্থ্য সহায়তা: ১৪৪১৬',
      mr: 'टेली-मानस मानसिक आरोग्य हेल्पलाइन: १४४१६',
      en: 'Tele-MANAS Mental Health & Stress Helpline: 14416'
    },
    subtitle: {
      hi: 'घर-परिवार से दूर रहने पर तनाव, घबराहट या अकेलापन महसूस होने पर मुफ्त बात करें',
      ta: 'குடும்பத்தை பிரிந்து இருக்கும் தொழிலாளர்களின் மன அழுத்தத்திற்கு இலவச ஆலோசனை',
      te: 'కుటుంబానికి దూరంగా ఉన్నప్పుడు మానసిక ఒత్తిడి మరియు బెంగ నివారణకు',
      bn: 'বাড়ি থেকে দূরে একাকীত্ব, অবসাদ বা অতিরিক্ত উদ্বেগের জন্য বিনামূল্যে কাউন্সেলিং',
      mr: 'घरापासून लांब राहिल्यामुळे येणारा ताण आणि भीती दूर करण्यासाठी मोफत समुपदेशन',
      en: 'Free 24x7 psychological counseling for migrant loneliness, anxiety & depression'
    },
    description: {
      hi: 'हजारों किलोमीटर दूर कारखाने में दिन-रात काम करने से कई मज़दूर भारी तनाव, नींद न आने, घबराहट या परिवार की चिंता में परेशान हो जाते हैं। 14416 पर प्रशिक्षित डॉक्टर और काउंसलर आपकी भाषा में आपकी बात सुनते हैं और मनोबल बढ़ाते हैं।',
      ta: 'சொந்த ஊரை விட்டு நெடுந்தொலைவில் வேலை செய்யும் போது ஏற்படும் தனிமை, பதற்றம் அல்லது மன உளைச்சலுக்கு தகுதியான மருத்துவர்கள் மற்றும் உளவியல் ஆலோசகர்கள் இலவசமாக வழிகாட்டுவார்கள்.',
      te: 'కుటుంబానికి దూరంగా నిద్రలేమి, ఒంటరితనం లేదా తీవ్ర ఆందోళనతో బాధపడుతుంటే, నిపుణులైన కౌన్సిలర్లతో మాట్లాడి స్వాంతన పొందవచ్చు.',
      bn: 'পরিবার ছেড়ে হাজার কিমি দূরে কাজ করার সময় অতিরিক্ত মানসিক চাপ, উদ্বেগ বা মন খারাপ হলে এই নম্বরে কথা বলুন। অভিজ্ঞ চিকিৎসকরা গোপনে কাউন্সেলিং করবেন।',
      mr: 'कुटुंबापासून दूर राहिल्यामुळे येणारा मानसिक ताण, भीती किंवा नैराश्य यावर तज्ज्ञ डॉक्टरांशी मोफत बोला. ही सेवा पूर्णपणे गोपनीय आहे.',
      en: 'Interstate migration often induces severe psychological isolation, insomnia, and home anxiety. National Tele-MANAS provides confidential, non-judgmental tele-counseling in 20+ regional languages round the clock.'
    },
    keyPoints: {
      hi: [
        'पूरी तरह गोपनीय: आपकी कोई भी बात फैक्ट्री या किसी अन्य व्यक्ति को नहीं बताई जाती',
        'चिंता, अवसाद या नशे की लत छुड़ाने के लिए विशेषज्ञों की निशुल्क सलाह',
        'टोल-फ्री नंबर 14416 या 1800-891-4416 पर किसी भी समय कॉल करें'
      ],
      ta: [
        'முற்றிலும் ரகசியமானது: உங்கள் விவரங்கள் யாருக்கும் தெரியாது',
        'மன அழுத்தம் மற்றும் போதை பழக்கத்திலிருந்து விடுபட ஆலோசனை',
        'எந்த நேரத்திலும் 14416 எண்ணில் அழைக்கலாம்'
      ],
      te: [
        'పూర్తిగా గోప్యంగా ఉంచబడుతుంది',
        'ఒత్తిడి మరియు నిరాశ నుండి బయటపడటానికి నిపుణుల సలహాలు',
        'ఏ సమయంలోనైనా 14416 కు ఉచితంగా కాల్ చేయవచ్చు'
      ],
      bn: [
        'সম্পূর্ণ গোপনীয়তা রক্ষা করা হয়',
        'অনিদ্রা, ভয় বা মাদকের আসক্তি কাটাতে বিশেষজ্ঞদের নিবিড় সাহায্য',
        'যেকোনো সময় টোল-ফ্রি 14416 নম্বরে কল করুন'
      ],
      mr: [
        'पूर्णपणे गोपनीय: तुमचे नाव किंवा माहिती गुप्त ठेवली जाते',
        'भीती, निराशा किंवा व्यसनमुक्तीसाठी डॉक्टरांचे मार्गदर्शन',
        'कोणत्याही वेळी १४४१६ किंवा १८००-८९१-४४१६ वर संपर्क करा'
      ],
      en: [
        '100% Confidential patient-doctor privilege with zero disclosure to factories',
        'Guidance on acute work stress, homesickness, anxiety, and substance cessation',
        'Available 24x7 across all mobile networks via 14416 or 1800-891-4416'
      ]
    },
    actionLabel: {
      hi: 'मनोवैज्ञानिक से बात करें: 14416',
      ta: 'ஆலோசகர் உதவி: 14416',
      te: 'కౌన్సిలర్‌తో మాట్లాడండి: 14416',
      bn: 'কাউন্সেলরের সাথে কথা বলুন: 14416',
      mr: 'समुपदेशकांशी बोला: १४४१६',
      en: 'Speak to Counselor: 14416'
    },
    contactOrAction: 'tel:14416'
  },
  {
    id: 'res-women-workers-helpline',
    category: 'COMMUNITY_HELPLINES',
    iconName: 'UserCheck',
    badge: {
      hi: 'महिला सुरक्षा',
      ta: 'பெண்கள் பாதுகாப்பு',
      te: 'మహిళా రక్షణ',
      bn: 'নারী সুরক্ষা',
      mr: 'महिला सुरक्षा',
      en: 'Women Safety'
    },
    title: {
      hi: 'महिला कामगार सुरक्षा व उत्पीड़न निवारण हेल्पलाइन: 181 / 1091',
      ta: 'பெண் தொழிலாளர்கள் பாதுகாப்பு & உதவி எண்: 181 / 1091',
      te: 'మహిళా కార్మికుల రక్షణ & సహాయ హెల్ప్‌లైన్: 181 / 1091',
      bn: 'মহিলা শ্রমিকদের কর্মক্ষেত্র সুরক্ষা ও হেল্পলাইন: ১৮১ / ১০৯১',
      mr: 'महिला कामगार संरक्षण व छळ प्रतिबंधक हेल्पलाइन: १८१ / १०९१',
      en: 'Women Factory Workers Safety & POSH Helpline: 181 / 1091'
    },
    subtitle: {
      hi: 'कारखाने, हॉस्टल या बस में छेड़छाड़, शोषण या बदतमीजी के खिलाफ त्वरित कानूनी सहायता',
      ta: 'பணியிடம், தங்குமிடம் அல்லது பயணத்தில் ஏற்படும் துன்புறுத்தல்களுக்கு உடனடி உதவி',
      te: 'పని ప్రదేశం, హాస్టల్ లేదా ప్రయాణంలో వేధింపులపై తక్షణ న్యాయ సహాయం',
      bn: 'কর্মক্ষেত্র, হস্টেল বা যাতায়াতে হেনস্থা ও হয়রানির বিরুদ্ধে জরুরি আইনি সহায়তা',
      mr: 'कारखाना, वसतिगृह किंवा प्रवासात होणाऱ्या छळाविरुद्ध तातडीची कायदेशीर मदत',
      en: 'Emergency intervention for women in garment, textile, packaging & electronics sectors'
    },
    description: {
      hi: 'गारमेंट्स, टेक्सटाइल और असेंबली फैक्ट्रियों में काम करने वाली महिला मज़दूरों के साथ सुपरवाइजर या ठेकेदार द्वारा अभद्र भाषा, अवांछित दबाव या शोषण करने पर 181 (महिला हेल्पलाइन) पर तुरंत गुप्त शिकायत दर्ज कराई जा सकती है। विशाखा गाइडलाइंस (POSH Act) के अनुसार हर फैक्ट्री में आंतरिक शिकायत समिति (ICC) होना अनिवार्य है।',
      ta: 'ஜவுளி மற்றும் ஆடை தொழிற்சாலைகளில் பணிபுரியும் பெண் தொழிலாளர்களுக்கு ஏற்படும் பாலியல் அல்லது உளவியல் துன்புறுத்தல்களுக்கு எதிராக 181ல் உடனடியாக புகார் செய்யலாம்.',
      te: 'టెక్స్‌టైల్, గార్మెంట్స్ పరిశ్రమలలో పనిచేసే మహిళా కార్మికులను వేధించినా, వేతనంలో అన్యాయం చేసినా 181 కు ఫిర్యాదు చేయవచ్చు.',
      bn: 'গার্মেন্টস ও টেক্সটাইল কারখানায় কর্মরত নারী শ্রমিকদের ওপর কোনো ধরনের হেনস্থা, কুপ্রস্তাব বা বৈষম্য হলে ১৮১ নম্বরে সরাসরি গোপনে সাহায্য পান।',
      mr: 'कापड उद्योग किंवा इतर कारखान्यांमध्ये काम करणाऱ्या महिला कामगारांवर दबाव किंवा गैरवर्तन झाल्यास १८१ वर त्वरित गोपनीय मदत मिळते.',
      en: 'Protects women factory workers against workplace harassment, hostile work environments, night-shift transit insecurity, and supervisor misconduct under POSH Act 2013, with immediate police protection and legal aid.'
    },
    keyPoints: {
      hi: [
        'रात की शिफ्ट (शाम 7 से सुबह 6) के लिए सुरक्षित आवागमन और महिला सुरक्षा अनिवार्य है',
        'समान काम के लिए पुरुषों के बराबर समान वेतन (Equal Remuneration) कानूनी अधिकार है',
        'महिला पुलिस अधिकारी शिकायत सुनेंगी और पहचान गुप्त रखी जाएगी'
      ],
      ta: [
        'இரவு நேர ஷிப்டிற்கு பாதுகாப்பான வாகன வசதி வழங்கப்பட வேண்டும்',
        'ஆண்களுக்கு இணையான சம ஊதியம் சட்ட உரிமை',
        'பெண் காவல்துறை அதிகாரிகள் உங்கள் புகாரை விசாரிப்பார்கள்'
      ],
      te: [
        'రాత్రి షిఫ్ట్‌లకు సురక్షిత ప్రయాణ సదుపాయం కల్పించాలి',
        'సమాన పనికి పురుషులతో సమాన వేతనం మీ హక్కు',
        'మహిళా పోలీసులు విచారణ జరుపుతారు'
      ],
      bn: [
        'নাইট শিফটের জন্য সুরক্ষিত গাড়ি দেওয়া কর্তৃপক্ষের দায়িত্ব',
        'পুরুষদের সমান কাজে সমান বেতন আইনসিদ্ধ অধিকার',
        'মহিলা পুলিশ অফিসার আপনার অভিযোগ গোপন রেখে ব্যবস্থা নেবেন'
      ],
      mr: [
        'रात्रीच्या शिफ्टसाठी कंपनीने सुरक्षित प्रवासाची सोय करणे बंधनकारक आहे',
        'समान कामासाठी पुरुषांइतकीच समान मजुरी मिळणे हा हक्क आहे',
        'महिला पोलीस अधिकारी तक्रार नोंदवून योग्य ती कारवाई करतील'
      ],
      en: [
        'Mandatory safe drop transit and security guard provisions for night shifts',
        'Equal pay for equal work mandated by Equal Remuneration Act',
        'Female enforcement officers dispatched with 100% whistleblower anonymity'
      ]
    },
    actionLabel: {
      hi: 'महिला हेल्पलाइन: 181',
      ta: 'பெண்கள் உதவி: 181',
      te: 'మహిళా హెల్ప్‌లైన్: 181',
      bn: 'নারী হেল্পলাইন: 181',
      mr: 'महिला हेल्पलाइन: 181',
      en: 'Women Helpline: 181'
    },
    contactOrAction: 'tel:181'
  }
];
