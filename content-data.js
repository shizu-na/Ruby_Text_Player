// ============================================================================
// Ruby Text Player - コンテンツ＆定数データ集約ファイル (content-data.js)
// ----------------------------------------------------------------------------
// ・初期サンプル教材データ (DEFAULT_RAW_TEXT / DEFAULT_RAW_TEXT_EN / EMBEDDED_SONGS)
// ・14言語マスターカタログ (LANG_CATALOG / LANG_CATALOG_EN)
// ・AI変換プロンプトテンプレート (PROMPT_TEMPLATES / PROMPT_TEMPLATES_EN / buildPromptText)
// ・画面メッセージ・トースト・ダイアログ・HTML文言 (UI_TEXT_I18N / HTML_I18N)
// ============================================================================

// ============================================================================
// 1. 初期サンプルデータ（日本語版 / 英語版）
// ============================================================================
const DEFAULT_RAW_TEXT = `【言語】ko-KR
【タイトル】첫인사와 자기소개 (初めての挨拶と自己紹介)
【出典】韓国語日常会話

안녕하세요(안녕하세요) 만나서(만나서) 반갑습니다(반갑씀니다).
annyeonghaseyo mannaseo bangapseumnida.
こんにちは、お会いできて嬉しいです。

【単語・文法解説】
- 안녕하세요 (안녕하세요 / annyeonghaseyo)：おはようございます、こんにちは、こんばんは（挨拶表現）。
- 만나서 (만나서 / mannaseo)：【原形：만나다】会って、会うので（動詞＋理由・順次の接続語尾 -아서/어서）。
- 반갑습니다 (반갑씀니다 / bangapseumnida)：【原形：반갑다】嬉しいです（形容詞）。パッチム「ㅂ」の後に「ㅅ」が続くことで濃音化が起こり「반갑씀니다」と発音される。

제(제) 이름은(이르믄) 켄입니다(케님니다).
je ireumeun kenimnida.
私の名前はケンです。

【単語・文法解説】
- 제 (제 / je)：私の（代名詞「저」＋ 助詞「의」の縮約形）。謙譲表現。
- 이름은 (이르믄 / ireumeun)：【原形：이름】名前は（名詞＋補助詞）。パッチム「ㅁ」が後ろの母音と連音化して「이르믄」と発音される。
- 켄입니다 (케님니다 / kenimnida)：【原形：켄 + 이다】ケンです（名詞＋指定詞）。パッチム「ㄴ」が連音化し、さらに「ㅂ」が「ㄴ」の前で鼻音化するため「케님니다」と発音される。

한국(한국) 여행은(여행은) 처음이라서(처으미라서) 기대가(기대가) 됩니다(됨니다).
hanguk yeohengeun cheoeumiraseo gidaega doemnida.
韓国旅行は初めてなので、楽しみです。

【単語・文法解説】
- 한국 (한국 / hanguk)：韓国（名詞）。
- 여행은 (여행은 / yeohengeun)：【原形：여행（旅行）＋ 은（〜は）】旅行は（名詞＋補助詞）。語中の「ㅎ」は弱化して柔らかく発音される。
- 처음이라서 (처으미라서 / cheoeumiraseo)：【原形：처음】初めてなので（名詞＋指定詞＋理由の接続語尾 -이라서）。連音化により「처으미라서」と発音される。
- 기대가 (기대가 / gidaega)：【原形：기대】期待が（名詞＋主格助詞）。
- 됩니다 (됨니다 / doemnida)：【原形：되다】なります（動詞）。「기대가 되다」で「楽しみになる、期待される」という意味。パッチム「ㅂ」が鼻音化し「됨니다」と発音される。`;

const DEFAULT_RAW_TEXT_EN = `【Language】ko-KR
【Title】첫인사와 자기소개 (Greetings & Self-Introduction)
【Source】Everyday Korean Conversation

안녕하세요(안녕하세요) 만나서(만나서) 반갑습니다(반갑씀니다).
annyeonghaseyo mannaseo bangapseumnida.
Hello, nice to meet you.

【Vocabulary & Grammar】
- 안녕하세요 (안녕하세요 / annyeonghaseyo): Hello / Good morning / Good evening (polite standard greeting).
- 만나서 (만나서 / mannaseo): [Base: 만나다 (to meet)] meeting / because I met you (verb stem + connective ending -아서/어서).
- 반갑습니다 (반갑씀니다 / bangapseumnida): [Base: 반갑다 (to be glad)] I am glad / pleased (adjective). Tensification occurs as batchim "ㅂ" is followed by "ㅅ", pronounced [반갑씀니다].

제(제) 이름은(이르믄) 켄입니다(케님니다).
je ireumeun kenimnida.
My name is Ken.

【Vocabulary & Grammar】
- 제 (제 / je): my (humble pronoun "저" + possessive particle "의" contraction).
- 이름은 (이르믄 / ireumeun): [Base: 이름 (name) + 은 (topic marker)] as for my name. Batchim "ㅁ" links (liaison) to the following vowel, pronounced [이르믄].
- 켄입니다 (케님니다 / kenimnida): [Base: 켄 (Ken) + 이다 (to be)] is Ken (noun + copula). Batchim "ㄴ" links to "이", and "ㅂ" nasalizes before "ㄴ" into "ㅁ", pronounced [케님니다].

한국(한국) 여행은(여행은) 처음이라서(처으미라서) 기대가(기대가) 됩니다(됨니다).
hanguk yeohengeun cheoeumiraseo gidaega doemnida.
Since this is my first trip to Korea, I am looking forward to it.

【Vocabulary & Grammar】
- 한국 (한국 / hanguk): Korea (noun).
- 여행은 (여행은 / yeohengeun): [Base: 여행 (trip/travel) + 은 (topic marker)] as for the trip. Intervocalic "ㅎ" weakens slightly in natural speech.
- 처음이라서 (처으미라서 / cheoeumiraseo): [Base: 처음 (first time) + -이라서 (because it is)] since it is the first time. Liaison shifts batchim "ㅁ" to the next syllable, pronounced [처으미라서].
- 기대가 (기대가 / gidaega): [Base: 기대 (expectation) + 가 (subject marker)] expectation / anticipation.
- 됩니다 (됨니다 / doemnida): [Base: 되다 (to become)] becomes. The idiom "기대가 되다" means "to look forward to". Batchim "ㅂ" nasalizes before "ㄴ" into [됨니다].`;

const EMBEDDED_SONGS = [
  {
    id: 'text_default_sample',
    title: '첫인사와 자기소개 (初めての挨拶と自己紹介)',
    artist: '韓国語日常会話',
    url: '',
    rawText: DEFAULT_RAW_TEXT,
    updatedAt: 1710000000000
  }
];

function getDefaultSampleByUiLang(uiLang = 'ja') {
  if (uiLang === 'en') {
    return {
      id: 'text_default_sample',
      title: '첫인사와 자기소개 (Greetings & Self-Introduction)',
      artist: 'Everyday Korean Conversation',
      url: '',
      rawText: DEFAULT_RAW_TEXT_EN
    };
  }
  return {
    id: 'text_default_sample',
    title: '첫인사와 자기소개 (初めての挨拶と自己紹介)',
    artist: '韓国語日常会話',
    url: '',
    rawText: DEFAULT_RAW_TEXT
  };
}

// ============================================================================
// 2. 言語マスターカタログ（LANG_CATALOG ＆ 英語UI用オーバーライド）
// ============================================================================
const LANG_CATALOG = {
  'zh-TW': {
    id: 'zh-TW',
    bcp47: 'zh-Hant-TW',
    aliases: ['zh-tw', 'zh-hant', 'zh-hant-tw', 'cmn-hant-tw', 'tw', '華語', '台湾華語', '國語', '繁体字', '注音'],
    name: '華語（繁体字・注音）',
    editorLabel: '華語・注音',
    badge: '華',
    dir: 'ltr',
    segmentation: 'char',
    rubySplit: 'zhuyin',
    prefixMatch: false,
    tapModes: ['word', 'char'],
    rubyLabel: '注音（主ルビ）',
    rubyDesc: '漢字の上下に出す注音符号（ㄅㄆㄇㄈ）',
    subLineLabel: 'ピンイン（サブルビ）',
    subLineDesc: '1文字ずつ揃えて表示するアルファベット発音',
    voiceHint: '※華語（zh-TW）の音声が最優先で選ばれます',
    tts: {
      lang: 'zh-TW',
      prefer: ['zh-tw', 'zh-hant-tw', 'cmn-hant-tw', 'cmn-tw', 'taiwan', '國語'],
      accept: ['zh-cn', 'zh-hans', 'cmn-hans', 'cmn-cn', 'zh-sg', 'putonghua', '普通話', '普通话'],
      reject: ['zh-hk', 'zh-mo', 'yue', 'cantonese', '広東', '廣東', '粤', 'nan', 'hak', 'hokkien', 'taiwanese'],
      foreignLatin: 'en-US'
    },
    sample: {
      text: '請問捷運站怎麼走？',
      ruby: 'ㄑㄧㄥˇ ㄨㄣˋ ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ ㄗㄣˇ ㄇㄜ˙ ㄗㄡˇ',
      note: 'すみません、MRT（地下鉄）の駅にはどう行けばいいですか？',
      noteEn: 'Excuse me, how do I get to the MRT station?'
    },
    en: {
      name: 'Mandarin (Traditional / Zhuyin)',
      editorLabel: 'Mandarin / Zhuyin',
      rubyLabel: 'Zhuyin (Main Ruby)',
      rubyDesc: 'Bopomofo phonetic symbols per character',
      subLineLabel: 'Pinyin (Sub-Ruby)',
      subLineDesc: 'Romanized Pinyin aligned per character',
      voiceHint: '* Taiwanese Mandarin (zh-TW) voices are prioritized'
    }
  },
  'zh-CN': {
    id: 'zh-CN',
    bcp47: 'zh-Hans-CN',
    aliases: ['zh-cn', 'zh-hans', 'zh-hans-cn', 'cmn-hans-cn', 'cn', 'zh', '中国語', '簡体字', '普通話', 'ピンイン'],
    name: '中国語（簡体字・ピンイン）',
    editorLabel: '中国語・ピンイン',
    badge: '中',
    dir: 'ltr',
    segmentation: 'char',
    rubySplit: 'space',
    prefixMatch: false,
    tapModes: ['word', 'char'],
    rubyLabel: 'ピンインルビ',
    rubyDesc: '漢字の上の発音記号',
    subLineLabel: 'ピンイン行',
    subLineDesc: '行ごとのアルファベット表記',
    voiceHint: '※中国語（zh-CN）の音声が最優先で選ばれます',
    tts: {
      lang: 'zh-CN',
      prefer: ['zh-cn', 'zh-hans-cn', 'cmn-hans-cn', 'cmn-cn', 'mainland', 'putonghua', '普通話', '普通话'],
      accept: ['zh-tw', 'zh-hant-tw', 'cmn-hant-tw', 'zh-sg', 'taiwan', '國語'],
      reject: ['zh-hk', 'zh-mo', 'yue', 'cantonese', '広東', '廣東', '粤', 'nan', 'hak', 'hokkien', 'taiwanese'],
      foreignLatin: 'en-US'
    },
    sample: {
      text: '今天天气真好。',
      ruby: 'jīn tiān tiān qì zhēn hǎo',
      note: '今日は本当に良い天気ですね。',
      noteEn: 'The weather is really nice today.'
    },
    en: {
      name: 'Chinese (Simplified / Pinyin)',
      editorLabel: 'Chinese / Pinyin',
      rubyLabel: 'Pinyin Ruby',
      rubyDesc: 'Pinyin pronunciation above characters',
      subLineLabel: 'Pinyin Line',
      subLineDesc: 'Full Pinyin transcription per line',
      voiceHint: '* Mainland Chinese (zh-CN) voices are prioritized'
    }
  },
  'yue-HK': {
    id: 'yue-HK',
    bcp47: 'yue-Hant-HK',
    aliases: ['yue-hk', 'zh-hk', 'yue', 'hk', 'cantonese', 'jyutping', '広東語', '粵語', '粤語', '粤拼', '粵拼'],
    name: '広東語（繁体字・粤拼）',
    editorLabel: '広東語・粤拼',
    badge: '粤',
    dir: 'ltr',
    segmentation: 'char',
    rubySplit: 'space',
    prefixMatch: false,
    tapModes: ['word', 'char'],
    rubyLabel: '粤拼（Jyutping）',
    rubyDesc: '漢字の上の広東語発音表記',
    subLineLabel: '粤拼 / 発音行',
    subLineDesc: '行ごとの粤拼アルファベット表記',
    voiceHint: '※広東語（zh-HK / yue）の音声が最優先で選ばれます',
    tts: {
      lang: 'zh-HK',
      prefer: ['zh-hk', 'yue-hk', 'yue', 'zh-mo', 'cantonese', 'hong kong', 'hongkong', '広東', '廣東', '粤', '粵'],
      accept: [],
      reject: ['zh-tw', 'zh-cn', 'zh-sg', 'cmn', 'putonghua', '普通話', '普通话', '國語', 'nan', 'hak'],
      foreignLatin: 'en-US'
    },
    sample: {
      text: '唔該，我想買單。',
      ruby: 'm4 goi1 ngo5 soeng2 maai5 daan1',
      note: 'すみません、お会計をお願いします。',
      noteEn: 'Excuse me, I would like the bill please.'
    },
    en: {
      name: 'Cantonese (Traditional / Jyutping)',
      editorLabel: 'Cantonese / Jyutping',
      rubyLabel: 'Jyutping Ruby',
      rubyDesc: 'Cantonese pronunciation above characters',
      subLineLabel: 'Jyutping Line',
      subLineDesc: 'Full Jyutping romanization per line',
      voiceHint: '* Cantonese (zh-HK / yue) voices are prioritized'
    }
  },
  'nan-TW': {
    id: 'nan-TW',
    bcp47: 'nan-Hant-TW',
    aliases: ['nan-tw', 'nan', 'taiwanese', 'hokkien', 'minnan', 'tailo', 'tâi-lô', 'poj', '台湾語', '台語', '臺灣話', '閩南語', '台羅'],
    name: '台湾語（台語・台羅）',
    editorLabel: '台湾語・台羅',
    badge: '台',
    dir: 'ltr',
    segmentation: 'char',
    rubySplit: 'hyphen',
    prefixMatch: false,
    tapModes: ['word', 'char'],
    rubyLabel: '台羅（Tâi-lô）',
    rubyDesc: '台語漢字の上のローマ字発音表記',
    subLineLabel: '台羅 / 発音行',
    subLineDesc: '行ごとの台羅ローマ字表記',
    voiceHint: '※台湾語（nan-TW）の専用音声がある場合のみ読み上げます（華語音声では代用しません）',
    tts: {
      lang: 'nan-TW',
      prefer: ['nan-tw', 'nan', 'hokkien', 'taiwanese', 'minnan', '閩南', '台語', '臺灣話'],
      accept: [],
      reject: ['zh-tw', 'zh-cn', 'zh-hk', 'zh-sg', 'cmn', 'yue', '國語', '普通話', '普通话', 'cantonese'],
      foreignLatin: 'en-US'
    },
    sample: {
      text: '食飽未？',
      ruby: 'tsia̍h-pá-buē',
      note: 'ご飯は食べましたか？（一般的な挨拶）',
      noteEn: 'Have you eaten yet? (Common Taiwanese greeting)'
    },
    en: {
      name: 'Taiwanese Hokkien (Tâi-lô)',
      editorLabel: 'Taiwanese / Tâi-lô',
      rubyLabel: 'Tâi-lô Ruby',
      rubyDesc: 'Tâi-lô romanization above characters',
      subLineLabel: 'Tâi-lô Line',
      subLineDesc: 'Full Tâi-lô romanization per line',
      voiceHint: '* Speaks only if a dedicated Taiwanese (nan-TW) voice is installed'
    }
  },
  'ko-KR': {
    id: 'ko-KR',
    bcp47: 'ko-KR',
    aliases: ['ko-kr', 'ko', 'kr', 'korean', '韓国語', 'ハングル'],
    name: '韓国語（ハングル）',
    editorLabel: '韓国語・ハングル',
    badge: '韓',
    dir: 'ltr',
    segmentation: 'char',
    rubySplit: 'hangul',
    prefixMatch: true,
    tapModes: ['word', 'char'],
    rubyLabel: '発音ハングル（主ルビ）',
    rubyDesc: '1文字ずつ対応する実際の発音ハングル',
    subLineLabel: 'ローマ字（サブルビ）',
    subLineDesc: '単語ごとに揃えて表示する改訂ローマ字表記',
    voiceHint: '※韓国語（ko-KR）の音声が最優先で選ばれます',
    tts: {
      lang: 'ko-KR',
      prefer: ['ko-kr', 'ko', 'korean', '한국', '韓国', '朝鮮'],
      accept: [],
      reject: [],
      foreignLatin: 'en-US'
    },
    sample: {
      text: '안녕하세요 만나서 반갑습니다.',
      ruby: '안녕하세요 만나서 반갑씀니다',
      note: 'こんにちは、お会いできて嬉しいです。',
      noteEn: 'Hello, nice to meet you.'
    },
    en: {
      name: 'Korean (Hangul)',
      editorLabel: 'Korean / Hangul',
      rubyLabel: 'Phonetic Hangul (Main Ruby)',
      rubyDesc: 'Assimilated pronunciation per character',
      subLineLabel: 'Romanization (Sub-Ruby)',
      subLineDesc: 'Revised Romanization aligned per word',
      voiceHint: '* Korean (ko-KR) voices are prioritized'
    }
  },
  'ja-JP': {
    id: 'ja-JP',
    bcp47: 'ja-JP',
    aliases: ['ja-jp', 'ja', 'jp', 'japanese', '日本語', 'かな', 'ふりがな'],
    name: '日本語（ふりがな）',
    editorLabel: '日本語・ふりがな',
    badge: '日',
    dir: 'ltr',
    segmentation: 'char',
    rubySplit: 'space',
    prefixMatch: true,
    tapModes: ['word', 'char'],
    rubyLabel: 'ふりがな（主ルビ）',
    rubyDesc: '漢字の上下に出す読み仮名',
    subLineLabel: 'ローマ字（サブルビ）',
    subLineDesc: '単語ごとに揃えて表示するローマ字表記',
    voiceHint: '※日本語（ja-JP）の音声が最優先で選ばれます',
    tts: {
      lang: 'ja-JP',
      prefer: ['ja-jp', 'ja', 'japanese', '日本'],
      accept: [],
      reject: [],
      foreignLatin: 'en-US'
    },
    sample: {
      text: '今日はとても良い天気ですね。',
      ruby: 'きょう は とても よい てんき です ね',
      note: '今日はとても良い天気ですね。',
      noteEn: 'It is very nice weather today, isn\'t it?'
    },
    en: {
      name: 'Japanese (Furigana)',
      editorLabel: 'Japanese / Furigana',
      rubyLabel: 'Furigana (Main Ruby)',
      rubyDesc: 'Hiragana reading per word',
      subLineLabel: 'Romaji (Sub-Ruby)',
      subLineDesc: 'Hepburn romanization aligned per word',
      voiceHint: '* Japanese (ja-JP) voices are prioritized'
    }
  },
  'en-US': {
    id: 'en-US',
    bcp47: 'en-US',
    aliases: ['en-us', 'en-gb', 'en', 'eng', 'english', '英語'],
    name: '英語（IPA）',
    editorLabel: '英語・IPA',
    badge: 'EN',
    dir: 'ltr',
    segmentation: 'word',
    rubySplit: 'none',
    prefixMatch: false,
    tapModes: ['word'],
    rubyLabel: '発音記号（IPA）',
    rubyDesc: '英単語の上のIPA発音表記',
    subLineLabel: '発音補助行',
    subLineDesc: '行ごとの発音ガイド・リエゾン表記',
    voiceHint: '※英語（en-US / en-GB）の音声が最優先で選ばれます',
    tts: {
      lang: 'en-US',
      prefer: ['en-us', 'en-gb', 'en-au', 'en-ca', 'en', 'english'],
      accept: [],
      reject: [],
      foreignLatin: null
    },
    sample: {
      text: 'Excuse me, could you help me?',
      ruby: 'ɪkˈskjuːs miː kʊd juː hɛlp miː',
      note: 'すみません、手伝っていただけますか？',
      noteEn: 'Excuse me, could you help me?'
    },
    en: {
      name: 'English (IPA)',
      editorLabel: 'English / IPA',
      rubyLabel: 'IPA Pronunciation',
      rubyDesc: 'IPA phonetic symbols above words',
      subLineLabel: 'Pronunciation Guide',
      subLineDesc: 'Line-level pronunciation / linking guide',
      voiceHint: '* English (en-US / en-GB) voices are prioritized'
    }
  },
  'de-DE': {
    id: 'de-DE',
    bcp47: 'de-DE',
    aliases: ['de-de', 'de-at', 'de-ch', 'de', 'ger', 'deu', 'german', 'deutsch', 'ドイツ語', '独語'],
    name: 'ドイツ語（IPA）',
    editorLabel: 'ドイツ語・IPA',
    badge: 'DE',
    dir: 'ltr',
    segmentation: 'word',
    rubySplit: 'none',
    prefixMatch: false,
    tapModes: ['word'],
    rubyLabel: '発音記号（IPA）',
    rubyDesc: '単語の上のIPA発音表記',
    subLineLabel: '発音補助行',
    subLineDesc: '行ごとの発音ガイド・カタカナ補助表記',
    voiceHint: '※ドイツ語（de-DE）の音声が最優先で選ばれます',
    tts: {
      lang: 'de-DE',
      prefer: ['de-de', 'de-at', 'de-ch', 'de', 'german', 'deutsch', 'ドイツ'],
      accept: [],
      reject: [],
      foreignLatin: null
    },
    sample: {
      text: 'Ich hätte gerne einen Kaffee.',
      ruby: 'ɪç ˈhɛtə ˈɡɛʁnə ˈaɪnən ˈkafe',
      note: 'コーヒーを一つお願いします。',
      noteEn: 'I would like a coffee, please.'
    },
    en: {
      name: 'German (IPA)',
      editorLabel: 'German / IPA',
      rubyLabel: 'IPA Pronunciation',
      rubyDesc: 'IPA phonetic symbols above words',
      subLineLabel: 'Pronunciation Guide',
      subLineDesc: 'Line-level IPA / pronunciation guide',
      voiceHint: '* German (de-DE) voices are prioritized'
    }
  },
  'fr-FR': {
    id: 'fr-FR',
    bcp47: 'fr-FR',
    aliases: ['fr-fr', 'fr-ca', 'fr', 'fra', 'fre', 'french', 'français', 'フランス語', '仏語'],
    name: 'フランス語（IPA）',
    editorLabel: 'フランス語・IPA',
    badge: 'FR',
    dir: 'ltr',
    segmentation: 'word',
    rubySplit: 'none',
    prefixMatch: false,
    tapModes: ['word'],
    rubyLabel: '発音記号（IPA）',
    rubyDesc: '単語の上のIPA発音表記',
    subLineLabel: '発音補助行',
    subLineDesc: '行ごとのアンシェヌマン・リエゾン発音表記',
    voiceHint: '※フランス語（fr-FR）の音声が最優先で選ばれます',
    tts: {
      lang: 'fr-FR',
      prefer: ['fr-fr', 'fr-ca', 'fr-be', 'fr-ch', 'fr', 'french', 'français', 'フランス'],
      accept: [],
      reject: [],
      foreignLatin: null
    },
    sample: {
      text: 'Bonjour, un café s\'il vous plaît.',
      ruby: 'bɔ̃.ʒuʁ œ̃ ka.fe sil vu plɛ',
      note: 'こんにちは、コーヒーを一つお願いします。',
      noteEn: 'Hello, a coffee please.'
    },
    en: {
      name: 'French (IPA)',
      editorLabel: 'French / IPA',
      rubyLabel: 'IPA Pronunciation',
      rubyDesc: 'IPA phonetic symbols above words',
      subLineLabel: 'Pronunciation Guide',
      subLineDesc: 'Line-level liaison & enchaînement guide',
      voiceHint: '* French (fr-FR) voices are prioritized'
    }
  },
  'es-ES': {
    id: 'es-ES',
    bcp47: 'es-ES',
    aliases: ['es-es', 'es-mx', 'es-ar', 'es', 'spa', 'spanish', 'español', 'スペイン語', '西語'],
    name: 'スペイン語（IPA）',
    editorLabel: 'スペイン語・IPA',
    badge: 'ES',
    dir: 'ltr',
    segmentation: 'word',
    rubySplit: 'none',
    prefixMatch: false,
    tapModes: ['word'],
    rubyLabel: '発音記号（IPA）',
    rubyDesc: '単語の上のIPA発音表記',
    subLineLabel: '発音補助行',
    subLineDesc: '行ごとの発音ガイド表記',
    voiceHint: '※スペイン語（es-ES / es-MX）の音声が最優先で選ばれます',
    tts: {
      lang: 'es-ES',
      prefer: ['es-es', 'es-mx', 'es-us', 'es-ar', 'es', 'spanish', 'español', 'スペイン'],
      accept: [],
      reject: [],
      foreignLatin: null
    },
    sample: {
      text: 'Disculpe, ¿dónde está el baño?',
      ruby: 'disˈkulpe ˈdonde esˈta el ˈbaɲo',
      note: 'すみません、お手洗いはどこですか？',
      noteEn: 'Excuse me, where is the restroom?'
    },
    en: {
      name: 'Spanish (IPA)',
      editorLabel: 'Spanish / IPA',
      rubyLabel: 'IPA Pronunciation',
      rubyDesc: 'IPA phonetic symbols above words',
      subLineLabel: 'Pronunciation Guide',
      subLineDesc: 'Line-level pronunciation guide',
      voiceHint: '* Spanish (es-ES / es-MX) voices are prioritized'
    }
  },
  'ru-RU': {
    id: 'ru-RU',
    bcp47: 'ru-RU',
    aliases: ['ru-ru', 'ru', 'rus', 'russian', 'русский', 'ロシア語', '露語'],
    name: 'ロシア語（IPA/発音）',
    editorLabel: 'ロシア語・IPA',
    badge: 'RU',
    dir: 'ltr',
    segmentation: 'word',
    rubySplit: 'none',
    prefixMatch: false,
    tapModes: ['word'],
    rubyLabel: '発音記号（IPA・主ルビ）',
    rubyDesc: '単語の上下に出すIPA発音（アカニエ等を反映）',
    subLineLabel: 'ラテン文字転写（サブルビ）',
    subLineDesc: '単語ごとに揃えて表示するラテン文字転写表記',
    voiceHint: '※ロシア語（ru-RU）の音声が最優先で選ばれます',
    tts: {
      lang: 'ru-RU',
      prefer: ['ru-ru', 'ru', 'russian', 'русский', 'ロシア'],
      accept: [],
      reject: [],
      foreignLatin: null
    },
    sample: {
      text: 'Доброе утро, как ваши дела?',
      ruby: 'ˈdobrəjə ˈutrə kak ˈvaʂɨ dʲɪˈla',
      note: 'おはようございます、ご機嫌いかがですか？',
      noteEn: 'Good morning, how are you doing?'
    },
    en: {
      name: 'Russian (IPA)',
      editorLabel: 'Russian / IPA',
      rubyLabel: 'IPA (Main Ruby)',
      rubyDesc: 'IPA pronunciation per word (reflecting vowel reduction)',
      subLineLabel: 'Latin Transliteration (Sub-Ruby)',
      subLineDesc: 'Romanized pronunciation aligned per word',
      voiceHint: '* Russian (ru-RU) voices are prioritized'
    }
  },
  'ar-SA': {
    id: 'ar-SA',
    bcp47: 'ar',
    aliases: ['ar-sa', 'ar-eg', 'ar-ae', 'ar', 'ara', 'arabic', 'العربية', 'アラビア語'],
    name: 'アラビア語（IPA/発音）',
    editorLabel: 'アラビア語・RTL',
    badge: 'AR',
    dir: 'rtl',
    segmentation: 'word',
    rubySplit: 'none',
    prefixMatch: false,
    tapModes: ['word'],
    rubyLabel: '発音記号（IPA・主ルビ）',
    rubyDesc: 'アラビア文字の上下に出す発音表記',
    subLineLabel: 'ラテン文字転写（サブルビ）',
    subLineDesc: '単語ごとに揃えて表示するラテン文字転写表記',
    voiceHint: '※アラビア語（ar）の音声が最優先で選ばれます',
    tts: {
      lang: 'ar-SA',
      prefer: ['ar-sa', 'ar-eg', 'ar-ae', 'ar', 'arabic', 'العربية', 'アラビア'],
      accept: [],
      reject: [],
      foreignLatin: 'en-US'
    },
    sample: {
      text: 'السلام عليكم، كيف حالك؟',
      ruby: 'as-saˈlaːmu ʕaˈlajkum ˈkajfa ˈħaːluka',
      note: 'こんにちは（平安があなた方にありますように）、お元気ですか？',
      noteEn: 'Peace be upon you (Hello), how are you?'
    },
    en: {
      name: 'Arabic (IPA / Transliteration)',
      editorLabel: 'Arabic / RTL',
      rubyLabel: 'IPA (Main Ruby)',
      rubyDesc: 'IPA pronunciation per word',
      subLineLabel: 'Latin Transliteration (Sub-Ruby)',
      subLineDesc: 'Romanized transcription aligned per word',
      voiceHint: '* Arabic (ar) voices are prioritized'
    }
  },
  'fa-IR': {
    id: 'fa-IR',
    bcp47: 'fa-IR',
    aliases: ['fa-ir', 'fa', 'per', 'fas', 'persian', 'farsi', 'فارسی', 'ペルシア語', 'ペルシャ語'],
    name: 'ペルシア語（IPA/発音）',
    editorLabel: 'ペルシア語・RTL',
    badge: 'FA',
    dir: 'rtl',
    segmentation: 'word',
    rubySplit: 'none',
    prefixMatch: false,
    tapModes: ['word'],
    rubyLabel: '発音記号（IPA・主ルビ）',
    rubyDesc: 'ペルシア文字の上下に出す発音表記',
    subLineLabel: 'ラテン文字転写（サブルビ）',
    subLineDesc: '単語ごとに揃えて表示するラテン文字転写表記',
    voiceHint: '※ペルシア語（fa-IR）の音声が最優先で選ばれます',
    tts: {
      lang: 'fa-IR',
      prefer: ['fa-ir', 'fa', 'persian', 'farsi', 'فارسی', 'ペルシア', 'ペルシャ'],
      accept: [],
      reject: [],
      foreignLatin: 'en-US'
    },
    sample: {
      text: 'سلام، حال شما چطور است؟',
      ruby: 'sæˈlɒːm ˈhɒːl-e ʃoˈmɒː tʃeˈtowɾ æst',
      note: 'こんにちは、ご機嫌いかがですか？',
      noteEn: 'Hello, how are you?'
    },
    en: {
      name: 'Persian (IPA / Transliteration)',
      editorLabel: 'Persian / RTL',
      rubyLabel: 'IPA (Main Ruby)',
      rubyDesc: 'IPA pronunciation per word',
      subLineLabel: 'Latin Transliteration (Sub-Ruby)',
      subLineDesc: 'Romanized transcription aligned per word',
      voiceHint: '* Persian (fa-IR) voices are prioritized'
    }
  },
  'th-TH': {
    id: 'th-TH',
    bcp47: 'th-TH',
    aliases: ['th-th', 'th', 'tha', 'thai', 'ไทย', 'タイ語'],
    name: 'タイ語（IPA/発音）',
    editorLabel: 'タイ語・発音',
    badge: 'TH',
    dir: 'ltr',
    segmentation: 'word',
    rubySplit: 'none',
    prefixMatch: false,
    tapModes: ['word'],
    rubyLabel: '発音記号（IPA / 声調）',
    rubyDesc: 'タイ文字の上の発音・声調表記',
    subLineLabel: '発音行（ローマ字）',
    subLineDesc: '行ごとの声調付きローマ字表記',
    voiceHint: '※タイ語（th-TH）の音声が最優先で選ばれます',
    tts: {
      lang: 'th-TH',
      prefer: ['th-th', 'th', 'thai', 'ไทย', 'タイ'],
      accept: [],
      reject: [],
      foreignLatin: 'en-US'
    },
    sample: {
      text: 'ขอโทษครับ ห้องน้ำอยู่ที่ไหน',
      ruby: 'khɔ̌ɔ-thôot khráp hɔ̂ng-náam yùu thîi-nǎi',
      note: 'すみません、お手洗いはどこにありますか？',
      noteEn: 'Excuse me, where is the restroom?'
    },
    en: {
      name: 'Thai (Phonetic / Tone)',
      editorLabel: 'Thai / Phonetic',
      rubyLabel: 'Phonetic / Tone Ruby',
      rubyDesc: 'Romanized pronunciation with tones above Thai words',
      subLineLabel: 'Romanized Pronunciation Line',
      subLineDesc: 'Tone-marked romanization per line',
      voiceHint: '* Thai (th-TH) voices are prioritized'
    }
  }
};

// ============================================================================
// 3. AI変換プロンプトテンプレート（日本語版 PROMPT_TEMPLATES / 英語版 PROMPT_TEMPLATES_EN）
// ============================================================================
const PROMPT_TEMPLATES = {
  'zh-TW': {
    targetDesc: '台湾華語（繁体字・注音符号）',
    rules: [
      'すべて台湾で使われる「繁体字」と、台湾教育部『國語辭典』準拠の標準発音（注音符号・ボポモフォ）で表記してください（「一」「不」や第3声の連続による声調変化は変化後の発音で表記）。',
      '先頭に必ず `【言語】zh-TW` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：意味のまとまり（単語）ごとに半角スペースで区切り、「単語(注音)」の形式で並べる。2文字以上の単語はカッコ内の注音も1文字分ずつ半角スペースで区切り、必ず「漢字の文字数＝注音の音節数」を一致させること（例：`請問(ㄑㄧㄥˇ ㄨㄣˋ) 捷運站(ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ)`）。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないこと。\n   ・2行目：声調記号付きのピンイン\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 単語 (注音 / pinyin)：意味（品詞）と解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】zh-TW
【タイトル】問路 (道を尋ねる)
【出典】旅行日常會話

請問(ㄑㄧㄥˇ ㄨㄣˋ) 捷運站(ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ) 怎麼(ㄗㄣˇ ㄇㄜ˙) 走(ㄗㄡˇ)？
qǐng wèn jié yùn zhàn zěn me zǒu
すみません、MRT（地下鉄）の駅にはどう行けばいいですか？

【単語・文法解説】
- 請問 (ㄑㄧㄥˇ ㄨㄣˋ / qǐng wèn)：すみません、お尋ねします（動詞句）。
- 捷運站 (ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ / jié yùn zhàn)：MRT（地下鉄）の駅（名詞）。
- 怎麼 (ㄗㄣˇ ㄇㄜ˙ / zěn me)：どのように（疑問代名詞）。
- 走 (ㄗㄡˇ / zǒu)：歩く、行く（動詞）。`
  },
  'zh-CN': {
    targetDesc: '中国語（簡体字・ピンイン）',
    rules: [
      'すべて「簡体字」と「声調記号付きのピンイン」で表記してください（「一」「不」や第3声の連続による声調変化は、実際に発音される変化後の声調で表記してください）。',
      '先頭に必ず `【言語】zh-CN` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：意味のまとまり（単語）ごとに半角スペースで区切り、「単語(pinyin)」の形式で並べる。2文字以上の単語はカッコ内のピンインも1文字分ずつ半角スペースで区切り、必ず「漢字の文字数＝ピンインの音節数」を一致させること（例：`今天(jīn tiān) 天气(tiān qì)`）。儿化音（`花儿(huār)` など）のみ例外として1音節にまとめても構いません。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないこと。\n   ・2行目：行全体のピンイン\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 単語 (pinyin)：意味（品詞）と解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】zh-CN
【タイトル】日常问候 (日常の挨拶)
【出典】汉语会话

今天(jīn tiān) 天气(tiān qì) 真(zhēn) 好(hǎo)。
jīn tiān tiān qì zhēn hǎo
今日は本当に良い天気ですね。

【単語・文法解説】
- 今天 (jīn tiān)：今日（名詞）。
- 天气 (tiān qì)：天気（名詞）。
- 真 (zhēn)：本当に、実に（副詞）。
- 好 (hǎo)：良い（形容詞）。`
  },
  'yue-HK': {
    targetDesc: '広東語（繁体字・粤拼 Jyutping）',
    rules: [
      '香港・広東語圏で使われる「繁体字（広東語固有字を含む）」と「粤拼（Jyutping、声調番号1〜6付き）」で表記してください。',
      '先頭に必ず `【言語】yue-HK` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに半角スペースで区切り、「単語(jyutping)」の形式で並べる。2文字以上の単語はカッコ内の粤拼も1文字分ずつ半角スペースで区切り、必ず「漢字の文字数＝粤拼の音節数」を一致させること（例：`唔該(m4 goi1)`）。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないこと。\n   ・2行目：行全体の粤拼（Jyutping）\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 単語 (jyutping)：意味（品詞）と広東語特有の表現解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】yue-HK
【タイトル】喺餐廳 (レストランにて)
【出典】實用廣東話

唔該(m4 goi1)，我(ngo5) 想(soeng2) 買單(maai5 daan1)。
m4 goi1 ngo5 soeng2 maai5 daan1
すみません、お会計をお願いします。

【単語・文法解説】
- 唔該 (m4 goi1)：すみません、お願いします（人に頼み事をするときの呼びかけや感謝の表現）。
- 我 (ngo5)：私（代名詞）。
- 想 (soeng2)：〜したい（助動詞）。
- 買單 (maai5 daan1)：お会計をする（動詞句）。`
  },
  'nan-TW': {
    targetDesc: '台湾語（台語漢字・台羅 Tâi-lô）',
    rules: [
      '台湾教育部推奨の「台語漢字」と「台湾閩南語羅馬字拼音方案（台羅 Tâi-lô、声調記号付き）」で表記してください。',
      '先頭に必ず `【言語】nan-TW` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに半角スペースで区切り、「単語(台羅)」の形式で並べる。2文字以上の単語はカッコ内の台羅をハイフン `-` または半角スペースで区切り、必ず「漢字の文字数＝台羅の音節数」を一致させること（例：`火車站(hué-tshia-tsām)`）。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないこと。\n   ・2行目：行全体の台羅（Tâi-lô）\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 単語 (台羅)：意味（品詞）と解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】nan-TW
【タイトル】問路 (道を尋ねる)
【出典】生活台語

請問(tshíng-būn)，火車站(hué-tshia-tsām) 欲(beh) 按怎(án-tsuánn) 行(kiânn)？
tshíng-būn hué-tshia-tsām beh án-tsuánn kiânn
すみません、駅へはどうやって行けばいいですか？

【単語・文法解説】
- 請問 (tshíng-būn)：お尋ねします、すみません（動詞）。
- 火車站 (hué-tshia-tsām)：駅、列車の駅（名詞）。
- 欲 (beh)：〜したい、〜するつもりだ（助動詞）。
- 按怎 (án-tsuánn)：どのように、どうやって（疑問詞）。
- 行 (kiânn)：歩く、行く（動詞）。`
  },
  'ko-KR': {
    targetDesc: '韓国語（ハングル・実際の発音ハングル）',
    rules: [
      '1行目の本文は、韓国語の分かち書き（語節・スペース）ごとに「表記ハングル(実際の発音ハングル)」の形式で半角スペース区切りで並べてください。必ず「カッコ前のハングルの文字数」と「カッコ内の発音ハングルの文字数」を一致させてください（長音記号「ー」やスラッシュ `/` 等は入れないこと）。',
      'カッコ内の「発音ハングル」には、連音化・鼻音化・激音化・濃音化・流音化・口蓋音化・ㅎ弱化（脱落）・ㄴ挿入などの音韻変化をすべて反映した「実際に発音される通りのハングル」を記述してください（英単語や記号はカッコを付けずそのまま残す）。',
      '先頭に必ず `【言語】ko-KR` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：語節ごとに「表記ハングル(発音ハングル)」を半角スペース区切りで並べた行\n   ・2行目：改訂ローマ字表記（Revised Romanization）による発音補助行\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語・連語を「- 本文中の語形 (発音ハングル / ローマ字)：【原形：〇〇다】意味（品詞）と文法・発音変化の解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】ko-KR
【タイトル】날씨 이야기 (天気の会話)
【出典】한국어 일상 회화 (韓国語日常会話)

오늘은(오느른) 날씨가(날씨가) 정말(정말) 좋아서(조아서) 같이(가치) 걷고(걷꼬) 싶네요(심네요).
oneureun nalssiga jeongmal joaseo gachi geotgo simneyo
今日は天気が本当に良いので、一緒に歩きたいですね。

【単語・文法解説】
- 오늘은 (오느른 / oneureun)：【原形：오늘（今日）＋ 은（〜は）】今日は（名詞＋補助詞）。パッチム「ㄹ」が後ろの母音と連音化して「오느른」と発音される。
- 날씨가 (날씨가 / nalssiga)：【原形：날씨（天気）＋ 가（〜が）】天気が（名詞＋主格助詞）。
- 정말 (정말 / jeongmal)：本当に、実に（副詞）。
- 좋아서 (조아서 / joaseo)：【原形：좋다（良い）＋ -아서（〜なので）】良くて。語幹末の「ㅎ」が母音の前で弱化（脱落）し「조아서」と発音される。
- 같이 (가치 / gachi)：一緒に（副詞）。パッチム「ㅌ」が母音「이」と出会い口蓋音化して「가치」と発音される。
- 걷고 싶네요 (걷꼬 심네요 / geotgo simneyo)：【原形：걷다（歩く）＋ -고 싶다（〜したい）＋ -네요（〜ですね）】歩きたいですね。「걷고」は濃音化し「걷꼬」、「싶네요」は鼻音化し「심네요」と発音される。`
  },
  'ja-JP': {
    targetDesc: '日本語（漢字かな交じり・ひらがなルビ）',
    rules: [
      '1行目の本文は、文節または単語ごとに半角スペースで区切り、「単語(ひらがな読み)」の形式で並べてください（例：`今日(きょう) は(は)`）。カッコ内はすべて「ひらがな」で表記し、スラッシュ `/` や入れ子のカッコ `()` は入れないでください。',
      '先頭に必ず `【言語】ja-JP` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「表記(ひらがな)」を半角スペース区切りで並べた行\n   ・2行目：行全体のローマ字表記（ヘボン式）\n   ・3行目：現代語訳・英語訳・または文章のニュアンス解説\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する語彙・表現を「- 本文中の語形 (ひらがな / romaji)：【原形：〇〇】意味（品詞）と文法解説」の箇条書きで列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】ja-JP
【タイトル】初めての挨拶
【出典】日本語会話

初めまして(はじめまして)、よろしく(よろしく) お願い(おねがい) します(します)。
hajimemashite yoroshiku onegai shimasu
Nice to meet you, I look forward to working with you.

【単語・文法解説】
- 初めまして (はじめまして / hajimemashite)：初めてお会いします（初対面の挨拶）。
- よろしく (よろしく / yoroshiku)：【原形：よろしい】よくなるように、適切に（副詞として機能）。
- お願いします (おねがいします / onegai shimasu)：【原形：お願いする】依頼や懇願の意を表す丁寧な表現。`
  },
  'en-US': {
    targetDesc: '英語（英単語・IPA国際音声記号）',
    rules: [
      '1行目の本文は、スペース区切りの1単語ごとに「英単語(IPA発音記号)」の形式で並べてください（例：`Could(kʊd) you(juː)`）。句読点（`,` `.` `?` `!`）はカッコの外（単語の直後）に置いてください。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】en-US` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「単語(IPA)」を半角スペース区切りで並べた行\n   ・2行目：カタカナ発音ガイドまたはリンキング（リエゾン）付きの補助発音表記\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語や熟語（イディオム）を「- 本文中の語形 (IPA)：【原形：〇〇】意味（品詞）と文法・発音解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】en-US
【タイトル】Asking for Directions (道を尋ねる)
【出典】Travel Conversation

Excuse(ɪkˈskjuːs) me(miː), could(kʊd) you(juː) tell(tɛl) me(miː) the(ðə) way(weɪ) to(tuː) the(ðə) station(ˈsteɪʃən)?
ɪkskjuːs miː kʊdʒuː tɛl miː ðə weɪ tuː ðə steɪʃən
すみません、駅への行き方を教えていただけますか？

【単語・文法解説】
- Excuse me (ɪkˈskjuːs miː)：すみません（人に話しかけるときの表現）。
- could you (kʊd juː)：〜していただけますか（丁寧な依頼）。リエゾンにより「クッジュー」に近い発音になる。
- tell me the way (tɛl miː ðə weɪ)：私に道を教える（動詞＋目的語＋目的語）。
- station (ˈsteɪʃən)：駅（名詞）。`
  },
  'de-DE': {
    targetDesc: 'ドイツ語（単語・IPA国際音声記号）',
    rules: [
      '1行目の本文は、スペース区切りの1単語ごとに「ドイツ語単語(IPA発音記号)」の形式で並べてください（例：`Guten(ˈɡuːtn̩) Morgen(ˈmɔʁɡn̩)`）。句読点はカッコの外に置き、カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】de-DE` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「単語(IPA)」を半角スペース区切りで並べた行\n   ・2行目：行全体のIPA発音記号（またはカタカナ発音補助）\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語・熟語・分離動詞を「- 本文中の語形 (IPA)：【原形：〇〇】意味（品詞・名詞の性・格変化・動詞の活用）と解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】de-DE
【タイトル】Nach dem Weg fragen (道を尋ねる)
【出典】Reiseführer

Entschuldigung(ɛntˈʃʊldɪɡʊŋ), wo(voː) ist(ɪst) der(deːɐ̯) Bahnhof(ˈbaːnhoːf)?
ɛntˈʃʊldɪɡʊŋ voː ɪst deːɐ̯ ˈbaːnhoːf
すみません、駅はどこですか？

【単語・文法解説】
- Entschuldigung (ɛntˈʃʊldɪɡʊŋ)：すみません、申し訳ありません（女性名詞・挨拶語）。
- wo (voː)：どこに（疑問副詞）。
- ist (ɪst)：【原形：sein（〜である、いる、ある）】〜がある（直説法現在・3人称単数）。
- der Bahnhof (deːɐ̯ ˈbaːnhoːf)：駅（定冠詞男性1格 ＋ 男性名詞）。`
  },
  'fr-FR': {
    targetDesc: 'フランス語（単語・IPA国際音声記号）',
    rules: [
      '1行目の本文は、スペース区切りの1語ごとに「フランス語表記(IPA発音記号)」の形式で並べてください（エリズィオンで繋がる `s\'il(sil)` や `l\'eau(lo)` 等は1塊として扱って構いません）。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】fr-FR` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「単語(IPA)」を半角スペース区切りで並べた行\n   ・2行目：アンシェヌマン・リエゾンを反映した行全体の発音ガイド\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する語彙を「- 本文中の語形 (IPA)：【原形：〇〇】意味（品詞・名詞の性・動詞の活用・リエゾン解説）」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】fr-FR
【タイトル】Demander son chemin (道を尋ねる)
【出典】Français de voyage

Excusez-moi(ɛks.ky.ze.mwa), où(u) est(ɛ) la(la) gare(ɡaʁ) ?
ɛks.ky.ze.mwa u.z.ɛ la ɡaʁ
すみません、駅はどこですか？

【単語・文法解説】
- Excusez-moi (ɛks.ky.ze.mwa)：【原形：excuser（許す）】すみません（2人称複数の命令形）。
- où (u)：どこに（疑問副詞）。
- est (ɛ)：【原形：être（〜である、ある）】〜がある（直説法現在・3人称単数）。
- la gare (la ɡaʁ)：駅（定冠詞女性単数 ＋ 女性名詞）。`
  },
  'es-ES': {
    targetDesc: 'スペイン語（単語・IPA国際音声記号）',
    rules: [
      '1行目の本文は、スペース区切りの1単語ごとに「スペイン語単語(IPA発音記号)」の形式で並べてください（例：`Muchas(ˈmutʃas) gracias(ˈɡɾasjas)`）。感嘆符や疑問符（`¡` `!` `¿` `?`）はカッコの外に置き、カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】es-ES` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「単語(IPA)」を半角スペース区切りで並べた行\n   ・2行目：行全体の発音ガイド（IPAまたはローマ字補助）\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語・熟語を「- 本文中の語形 (IPA)：【原形：〇〇】意味（品詞・性数変化・動詞の法と時制）」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】es-ES
【タイトル】Preguntar por una dirección (道を尋ねる)
【出典】Español para viajeros

Disculpe(disˈkulpe), ¿dónde(ˈdonde) está(esˈta) la(la) estación(es.taˈsjon)?
disˈkulpe ˈdonde esˈta la estaˈsjon
すみません、駅はどこですか？

【単語・文法解説】
- Disculpe (disˈkulpe)：【原形：disculpar（許す）】すみません（usted に対する肯定命令形）。
- dónde (ˈdonde)：どこに（疑問副詞）。
- está (esˈta)：【原形：estar（ある、いる）】〜がある（直説法現在・3人称単数）。
- la estación (la es.taˈsjon)：駅（定冠詞女性単数 ＋ 女性名詞）。`
  },
  'ru-RU': {
    targetDesc: 'ロシア語（キリル文字・IPA国際音声記号）',
    rules: [
      '1行目の本文は、スペース区切りの1単語ごとに「キリル文字単語(IPA発音記号)」の形式で並べてください（例：`Доброе(ˈdobrəjə) утро(ˈutrə)`）。アカニエ（無アクセントの о の弱化）や語末の子音の無声化を反映した実際の発音記号（IPA）を記述し、カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】ru-RU` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「キリル文字(IPA)」を半角スペース区切りで並べた行\n   ・2行目：ラテン文字転写（ローマ字発音補助行）\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 本文中の語形 (IPA / ローマ字)：【原形：〇〇】意味（品詞・格変化・動詞の体と活用）」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】ru-RU
【タイトル】Как спросить дорогу (道を尋ねる)
【出典】Разговорник для туристов (旅行会話帳)

Скажите(skɐˈʐɨtʲɪ), пожалуйста(pɐˈʐaɫstə), где(ɡdʲe) находится(nɐˈxodʲɪtsə) станция(ˈstantsɨjə)?
skazhite, pozhaluysta, gde nakhoditsya stantsiya?
すみません、駅はどこにあるか教えてください。

【単語・文法解説】
- Скажите (skɐˈʐɨtʲɪ / skazhite)：【原形：сказать（言う・完了体）】言ってください、教えてください（命令形・複数/敬称）。
- пожалуйста (pɐˈʐaɫstə / pozhaluysta)：どうか、お願いします（副詞・間投詞）。
- где (ɡdʲe / gde)：どこに（疑問副詞）。
- находится (nɐˈxodʲɪtsə / nakhoditsya)：【原形：находиться（ある、位置する・不完了体）】位置する（現在形・3人称単数）。
- станция (ˈstantsɨjə / stantsiya)：駅（女性名詞・主格）。`
  },
  'ar-SA': {
    targetDesc: 'アラビア語（アラビア文字・IPAまたはラテン転写）',
    rules: [
      '1行目の本文は、スペース区切りの1単語ごとに「アラビア文字単語(IPAまたはラテン発音転写)」の形式で並べてください（例：`صباح(sˤaˈbaːħu) الخير(al-ˈxajr)`）。アラビア文字の結合（リガチャ）を壊さないよう、必ず1文字ずつではなく「1単語ごと」にカッコを付けてください。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】ar-SA` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「アラビア文字(発音)」を半角スペース区切りで並べた行\n   ・2行目：行全体のラテン文字発音転写（ローマ字補助行）\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 本文中の語形 (発音)：【原形・語根：〇〇】意味（品詞・語根・フスハー/アンミーヤの違い等）」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】ar-SA
【タイトル】التحيات (朝の挨拶と日常会話)
【出典】المحادثة اليومية (アラビア語基本表現)

صباح(sˤaˈbaːħu) الخير(al-ˈxajr) يا(jaː) صديقي(sˤaˈdiːqiː)، كيف(ˈkajfa) حالك(ˈħaːluka)؟
sabahu al-khayr ya sadiqi, kayfa haluka?
おはようございます、我が友よ、ご機嫌いかがですか？

【単語・文法解説】
- صباح الخير (sˤaˈbaːħu al-ˈxajr)：【原形：صباح（朝）＋ الخير（善・良きこと）】おはようございます（定型の挨拶表現）。
- يا (jaː)：〜よ（呼びかけの詞）。
- صديقي (sˤaˈdiːqiː)：【原形：صديق（友人）＋ ـي（私の）】私の友人（男性名詞＋1人称単数接尾代名詞）。
- كيف (ˈkajfa)：どのように、いかが（疑問詞）。
- حالك (ˈħaːluka)：【原形：حال（状態・調子）＋ ـك（あなたの）】あなたの調子（名詞＋2人称単数男性接尾代名詞）。`
  },
  'fa-IR': {
    targetDesc: 'ペルシア語（ペルシア文字・IPAまたはラテン転写）',
    rules: [
      '1行目の本文は、スペース区切りの1単語ごとに「ペルシア文字単語(IPAまたはラテン発音転写)」の形式で並べてください（例：`صبح(sobh) بخیر(be-ˈxejɾ)`）。エザーフェ（`-e` / `-ye`）がある場合は単語の発音に含めて記述し、必ず1文字ずつではなく「1単語ごと」にカッコを付けてください。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】fa-IR` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「ペルシア文字(発音)」を半角スペース区切りで並べた行\n   ・2行目：行全体のラテン文字発音転写（ローマ字補助行）\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 本文中の語形 (発音)：【原形：〇〇】意味（品詞・エザーフェ・動詞の語幹と活用）」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】fa-IR
【タイトル】پرسیدن آدرس (道を尋ねる)
【出典】مکالمه در سفر (旅行会話)

ببخشید(be-bæx-ʃiːd)، ایستگاه(iːst-ˈɡɒːh-e) قطار(ɢæ-ˈtɒːɾ) کجاست(ko-ˈdʒɒːst)؟
bebakhshid, istgah-e qatar kojast?
すみません、鉄道の駅はどこですか？

【単語・文法解説】
- ببخشید (be-bæx-ʃiːd)：【原形：بخشیدن（許す）】すみません（命令形・敬称/複数）。
- ایستگاه قطار (iːst-ˈɡɒːh-e ɢæ-ˈtɒːɾ)：鉄道の駅（名詞＋エザーフェ -e ＋ 名詞）。
- کجاست (ko-ˈdʒɒːst)：【原形：کجا（どこ）＋ است（〜である）】どこですか（疑問詞＋繋辞）。`
  },
  'th-TH': {
    targetDesc: 'タイ語（タイ文字・声調記号付き発音ローマ字 Paiboon/IPA）',
    rules: [
      'タイ語は通常スペースを空けずに書きますが、このアプリでは**必ず単語ごとに半角スペースで分かち書き**し、「タイ文字単語(声調付き発音ローマ字)」の形式で並べてください（例：`สวัสดี(sà-wàt-dii) ครับ(khráp)`）。上下の母音・声調記号が崩れないよう、1文字ずつではなく必ず「1単語ごと」にカッコを付けてください。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】th-TH` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに半角スペースで区切り、「タイ文字単語(発音ローマ字)」を並べた行\n   ・2行目：行全体の声調記号付き発音ローマ字\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- タイ文字単語 (発音ローマ字)：意味（品詞・声調や文法の解説）」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】th-TH
【タイトル】ถามทาง (道を尋ねる)
【出典】บทสนทนาการท่องเที่ยว (旅行会話)

ขอโทษ(khɔ̌ɔ-thôot) ครับ(khráp) สถานี(sà-thǎa-nii) รถไฟ(rót-fai) อยู่(yùu) ที่ไหน(thîi-nǎi)
khɔ̌ɔ-thôot khráp sà-thǎa-nii rót-fai yùu thîi-nǎi
すみません、鉄道の駅はどこにありますか？

【単語・文法解説】
- ขอโทษ (khɔ̌ɔ-thôot)：すみません、ごめんなさい（動詞句）。
- ครับ (khráp)：〜です、〜ます（男性が使う丁寧な文末詞）。
- สถานี (sà-thǎa-nii)：駅（名詞）。
- รถไฟ (rót-fai)：列車、汽車（名詞）。
- อยู่ (yùu)：ある、いる、位置する（動詞）。
- ที่ไหน (thîi-nǎi)：どこに（疑問詞）。`
  }
};

// 英語UI時（English Mode）のAI変換プロンプトテンプレート
const PROMPT_TEMPLATES_EN = {
  'zh-TW': {
    targetDesc: 'Taiwanese Mandarin (Traditional Chinese + Zhuyin/Bopomofo)',
    rules: [
      'Use Traditional Chinese characters (Taiwan standard) and Zhuyin (Bopomofo) pronunciation based on the Taiwan Ministry of Education dictionary (reflect tone sandhi for 一, 不, and consecutive 3rd tones).',
      'Start with `【Language】zh-TW`, followed by `【Title】` and `【Source】` (and `【URL】` if available).',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated words in the format `Word(Zhuyin)`. For multi-character words, separate each character\'s Zhuyin with a space inside the parentheses so that the number of characters strictly matches the number of Zhuyin syllables (e.g., `請問(ㄑㄧㄥˇ ㄨㄣˋ) 捷運站(ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ)`). Never put slashes `/` or nested parentheses `()` inside `()`.\n   - Line 2: Full Pinyin with tone marks for the line.\n   - Line 3: Natural English translation.\n   - Line 4+: Under the heading `【Vocabulary & Grammar】`, list each word as `- Word (Zhuyin / Pinyin): meaning (part of speech) and usage notes` in English.',
      'Wrap the entire output in a single code block (```text ... ```) for easy copying, with no extra intro or outro text.'
    ],
    sample: `【Language】zh-TW
【Title】問路 (Asking for Directions)
【Source】Travel Conversation

請問(ㄑㄧㄥˇ ㄨㄣˋ) 捷運站(ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ) 怎麼(ㄗㄣˇ ㄇㄜ˙) 走(ㄗㄡˇ)？
qǐng wèn jié yùn zhàn zěn me zǒu
Excuse me, how do I get to the MRT station?

【Vocabulary & Grammar】
- 請問 (ㄑㄧㄥˇ ㄨㄣˋ / qǐng wèn): excuse me, may I ask (polite verb phrase).
- 捷運站 (ㄐㄧㄝˊ ㄩㄣˋ ㄓㄢˋ / jié yùn zhàn): MRT / metro station (noun).
- 怎麼 (ㄗㄣˇ ㄇㄜ˙ / zěn me): how (interrogative pronoun).
- 走 (ㄗㄡˇ / zǒu): to walk, to go (verb).`
  },
  'zh-CN': {
    targetDesc: 'Mandarin Chinese (Simplified Chinese + Pinyin)',
    rules: [
      'Use Simplified Chinese characters and Pinyin with tone marks (reflect tone sandhi for 一, 不, and consecutive 3rd tones).',
      'Start with `【Language】zh-CN`, followed by `【Title】` and `【Source】` (and `【URL】` if available).',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated words in the format `Word(pinyin)`. For multi-character words, separate each character\'s Pinyin with a space inside the parentheses so that the character count matches the syllable count (e.g., `今天(jīn tiān) 天气(tiān qì)`). Never put slashes `/` or nested parentheses `()` inside `()`.\n   - Line 2: Full Pinyin for the line.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word as `- Word (pinyin): meaning (part of speech) and grammar notes` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】zh-CN
【Title】日常问候 (Daily Greeting)
【Source】Everyday Chinese

今天(jīn tiān) 天气(tiān qì) 真(zhēn) 好(hǎo)。
jīn tiān tiān qì zhēn hǎo
The weather is really nice today.

【Vocabulary & Grammar】
- 今天 (jīn tiān): today (noun).
- 天气 (tiān qì): weather (noun).
- 真 (zhēn): really, truly (adverb).
- 好 (hǎo): good, fine (adjective).`
  },
  'yue-HK': {
    targetDesc: 'Cantonese (Traditional Chinese + Jyutping)',
    rules: [
      'Use Hong Kong Traditional Chinese characters (including Cantonese-specific characters) and Jyutping romanization with tone numbers 1–6.',
      'Start with `【Language】yue-HK`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated words in `Word(jyutping)` format. Separate syllables with a space inside `()` so character count matches syllable count (e.g., `唔該(m4 goi1)`). No slashes `/` or nested `()`.\n   - Line 2: Full Jyutping for the line.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word as `- Word (jyutping): meaning (POS) and Cantonese usage notes` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】yue-HK
【Title】喺餐廳 (At a Restaurant)
【Source】Practical Cantonese

唔該(m4 goi1)，我(ngo5) 想(soeng2) 買單(maai5 daan1)。
m4 goi1 ngo5 soeng2 maai5 daan1
Excuse me, I would like the bill please.

【Vocabulary & Grammar】
- 唔該 (m4 goi1): excuse me / please / thank you for a service (polite expression).
- 我 (ngo5): I, me (pronoun).
- 想 (soeng2): would like to, want to (auxiliary verb).
- 買單 (maai5 daan1): to pay the bill / check, please (verb phrase).'
`
  },
  'nan-TW': {
    targetDesc: 'Taiwanese Hokkien (Hanzi + Tâi-lô Romanization)',
    rules: [
      'Use Taiwan Ministry of Education recommended Taiwanese Hanzi and Tâi-lô romanization with tone marks.',
      'Start with `【Language】nan-TW`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated words in `Word(Tâi-lô)` format. Separate syllables with hyphens `-` or spaces inside `()` so character count matches syllable count (e.g., `火車站(hué-tshia-tsām)`). No slashes `/` or nested `()`.\n   - Line 2: Full Tâi-lô for the line.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word as `- Word (Tâi-lô): meaning (POS) and notes` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】nan-TW
【Title】問路 (Asking for Directions)
【Source】Everyday Taiwanese

請問(tshíng-būn)，火車站(hué-tshia-tsām) 欲(beh) 按怎(án-tsuánn) 行(kiânn)？
tshíng-būn hué-tshia-tsām beh án-tsuánn kiânn
Excuse me, how do I get to the train station?

【Vocabulary & Grammar】
- 請問 (tshíng-būn): excuse me, may I ask (verb).
- 火車站 (hué-tshia-tsām): train station (noun).
- 欲 (beh): to want to, going to (auxiliary).
- 按怎 (án-tsuánn): how, in what way (question word).
- 行 (kiânn): to walk, to go (verb).`
  },
  'ko-KR': {
    targetDesc: 'Korean (Hangul + Phonetic Hangul Ruby)',
    rules: [
      'On Line 1, write each spacing unit (eojeol) as `WrittenHangul(PhoneticHangul)` separated by spaces. The number of Hangul syllable blocks inside `()` must strictly match the written word (no slashes `/` or nested parentheses).',
      'Inside `(PhoneticHangul)`, reflect all Korean phonological rules (liaison, nasalization, tensification, aspiration, palatalization, ㅎ-weakening) as actually pronounced.',
      'Start with `【Language】ko-KR`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `WrittenHangul(PhoneticHangul)` tokens.\n   - Line 2: Revised Romanization for the whole line.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word/phrase as `- Surface Form (Phonetic / Romanization): [Base: 〇〇다] meaning (POS), grammar & sound change explanation` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】ko-KR
【Title】날씨 이야기 (Talking About the Weather)
【Source】Everyday Korean Conversation

오늘은(오느른) 날씨가(날씨가) 정말(정말) 좋아서(조아서) 같이(가치) 걷고(걷꼬) 싶네요(심네요).
oneureun nalssiga jeongmal joaseo gachi geotgo simneyo
The weather is really nice today, so I feel like walking together.

【Vocabulary & Grammar】
- 오늘은 (오느른 / oneureun): [Base: 오늘 (today) + 은 (topic marker)] today. Batchim "ㄹ" links to the following vowel, pronounced [오느른].
- 날씨가 (날씨가 / nalssiga): [Base: 날씨 (weather) + 가 (subject marker)] the weather.
- 정말 (정말 / jeongmal): really, truly (adverb).
- 좋아서 (조아서 / joaseo): [Base: 좋다 (good) + -아서 (because)] because it is nice. Final "ㅎ" weakens (drops) before a vowel, pronounced [조아서].
- 같이 (가치 / gachi): together (adverb). Batchim "ㅌ" palatalizes before "이" into [가치].
- 걷고 싶네요 (걷꼬 심네요 / geotgo simneyo): [Base: 걷다 (walk) + -고 싶다 (want to) + -네요] I want to walk. Tensification occurs in [걷꼬] and nasalization in [심네요].`
  },
  'ja-JP': {
    targetDesc: 'Japanese (Kanji/Kana + Hiragana Furigana)',
    rules: [
      'On Line 1, separate words/phrases with spaces in the format `Word(hiragana)` (e.g., `今日(きょう) は(は)`). Use only hiragana inside `()`, with no slashes `/` or nested parentheses.',
      'Start with `【Language】ja-JP`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `Word(hiragana)` tokens.\n   - Line 2: Hepburn romanization (Romaji) for the whole line.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word/phrase as `- Surface Form (hiragana / romaji): [Base: 〇〇] meaning (POS) and grammar notes` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】ja-JP
【Title】初めての挨拶 (First Greeting)
【Source】Everyday Japanese Conversation

初めまして(はじめまして)、よろしく(よろしく) お願い(おねがい) します(します)。
hajimemashite yoroshiku onegai shimasu
Nice to meet you, I look forward to working with you.

【Vocabulary & Grammar】
- 初めまして (はじめまして / hajimemashite): Nice to meet you (set phrase used when meeting someone for the first time).
- よろしく (よろしく / yoroshiku): [Base: よろしい (good/fine)] favorably, well (adverbial form).
- お願いします (おねがいします / onegai shimasu): [Base: お願いする (to request)] please (polite expression of request/goodwill).`
  },
  'en-US': {
    targetDesc: 'English (Words + IPA Pronunciation)',
    rules: [
      'On Line 1, write each space-separated word as `Word(IPA)` (e.g., `Could(kʊd) you(juː)`). Keep punctuation (`,` `.` `?` `!`) outside the parentheses. Never put slashes `/` or nested `()` inside `()`.',
      'Start with `【Language】en-US`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `Word(IPA)` tokens.\n   - Line 2: Full-line IPA or connected-speech pronunciation guide.\n   - Line 3: Clear paraphrase, context summary, or translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list key words/idioms as `- Word/Phrase (IPA): [Base: 〇〇] definition (POS), usage & pronunciation notes` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】en-US
【Title】Asking for Directions
【Source】Travel Conversation

Excuse(ɪkˈskjuːs) me(miː), could(kʊd) you(juː) tell(tɛl) me(miː) the(ðə) way(weɪ) to(tuː) the(ðə) station(ˈsteɪʃən)?
ɪkskjuːs miː kʊdʒuː tɛl miː ðə weɪ tuː ðə steɪʃən
A polite way to ask a stranger for directions to the train station.

【Vocabulary & Grammar】
- Excuse me (ɪkˈskjuːs miː): polite phrase used to get someone's attention.
- could you (kʊd juː): polite request modal; often linked as [kʊdʒuː] in natural speech.
- tell me the way (tɛl miː ðə weɪ): give me directions (verb + indirect object + direct object).
- station (ˈsteɪʃən): train or transit station (noun).`
  },
  'de-DE': {
    targetDesc: 'German (Words + IPA Pronunciation)',
    rules: [
      'On Line 1, write each space-separated word as `Word(IPA)`. Keep punctuation outside `()`, and never use slashes `/` or nested `()`.',
      'Start with `【Language】de-DE`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `Word(IPA)` tokens.\n   - Line 2: Full-line IPA pronunciation.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word/phrase as `- Word (IPA): [Base: 〇〇] meaning (POS, gender, case, verb conjugation)` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】de-DE
【Title】Nach dem Weg fragen (Asking for Directions)
【Source】Travel German

Entschuldigung(ɛntˈʃʊldɪɡʊŋ), wo(voː) ist(ɪst) der(deːɐ̯) Bahnhof(ˈbaːnhoːf)?
ɛntˈʃʊldɪɡʊŋ voː ɪst deːɐ̯ ˈbaːnhoːf
Excuse me, where is the train station?

【Vocabulary & Grammar】
- Entschuldigung (ɛntˈʃʊldɪɡʊŋ): excuse me / sorry (feminine noun used as a polite attention-getter).
- wo (voː): where (interrogative adverb).
- ist (ɪst): [Base: sein (to be)] is (3rd person singular present indicative).
- der Bahnhof (deːɐ̯ ˈbaːnhoːf): the train station (masculine nominative definite article + noun).`
  },
  'fr-FR': {
    targetDesc: 'French (Words + IPA Pronunciation)',
    rules: [
      'On Line 1, write each space-separated word as `Word(IPA)` (elided forms like `s\'il(sil)` or `l\'eau(lo)` can be treated as one token). No slashes `/` or nested `()`.',
      'Start with `【Language】fr-FR`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `Word(IPA)` tokens.\n   - Line 2: Full-line IPA reflecting liaison and enchaînement.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word/phrase as `- Word (IPA): [Base: 〇〇] meaning (POS, gender, conjugation, liaison notes)` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】fr-FR
【Title】Demander son chemin (Asking for Directions)
【Source】Travel French

Excusez-moi(ɛks.ky.ze.mwa), où(u) est(ɛ) la(la) gare(ɡaʁ) ?
ɛks.ky.ze.mwa u ɛ la ɡaʁ
Excuse me, where is the train station?

【Vocabulary & Grammar】
- Excusez-moi (ɛks.ky.ze.mwa): [Base: excuser (to excuse)] excuse me (2nd person plural polite imperative).
- où (u): where (interrogative adverb).
- est (ɛ): [Base: être (to be)] is (3rd person singular present indicative).
- la gare (la ɡaʁ): the train station (feminine singular definite article + noun).`
  },
  'es-ES': {
    targetDesc: 'Spanish (Words + IPA Pronunciation)',
    rules: [
      'On Line 1, write each space-separated word as `Word(IPA)`. Keep punctuation (`¡` `!` `¿` `?` `,` `.`) outside `()`, with no slashes `/` or nested `()`.',
      'Start with `【Language】es-ES`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `Word(IPA)` tokens.\n   - Line 2: Full-line IPA pronunciation guide.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word/phrase as `- Word (IPA): [Base: 〇〇] meaning (POS, gender/number, verb tense/mood)` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】es-ES
【Title】Preguntar por una dirección (Asking for Directions)
【Source】Travel Spanish

Disculpe(disˈkulpe), ¿dónde(ˈdonde) está(esˈta) la(la) estación(es.taˈsjon)?
disˈkulpe ˈdonde esˈta la estaˈsjon
Excuse me, where is the station?

【Vocabulary & Grammar】
- Disculpe (disˈkulpe): [Base: disculpar (to excuse)] excuse me (formal usted imperative).
- dónde (ˈdonde): where (interrogative adverb).
- está (esˈta): [Base: estar (to be located)] is (3rd person singular present indicative).
- la estación (la es.taˈsjon): the station (feminine singular definite article + noun).`
  },
  'ru-RU': {
    targetDesc: 'Russian (Cyrillic Words + IPA Pronunciation)',
    rules: [
      'On Line 1, write each space-separated Cyrillic word as `Word(IPA)` reflecting vowel reduction (akanye) and final consonant devoicing. No slashes `/` or nested `()`.',
      'Start with `【Language】ru-RU`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `CyrillicWord(IPA)` tokens.\n   - Line 2: Latin transliteration for the whole line.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word as `- Word (IPA / Romanization): [Base: 〇〇] meaning (POS, case, aspect & conjugation)` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】ru-RU
【Title】Как спросить дорогу (Asking for Directions)
【Source】Russian Phrasebook

Скажите(skɐˈʐɨtʲɪ), пожалуйста(pɐˈʐaɫstə), где(ɡdʲe) находится(nɐˈxodʲɪtsə) станция(ˈstantsɨjə)?
skazhite, pozhaluysta, gde nakhoditsya stantsiya?
Tell me, please, where is the station located?

【Vocabulary & Grammar】
- Скажите (skɐˈʐɨtʲɪ / skazhite): [Base: сказать (to say, perfective)] tell me (polite/plural imperative).
- пожалуйста (pɐˈʐaɫstə / pozhaluysta): please (polite particle).
- где (ɡdʲe / gde): where (interrogative adverb).
- находится (nɐˈxodʲɪtsə / nakhoditsya): [Base: находиться (to be located, imperfective)] is located (3rd person singular present).
- станция (ˈstantsɨjə / stantsiya): station (feminine nominative singular).`
  },
  'ar-SA': {
    targetDesc: 'Arabic (Arabic Script + IPA/Transliteration)',
    rules: [
      'On Line 1, write each space-separated Arabic word as `Word(IPA_or_Transliteration)`. Always annotate whole words (never split Arabic letters) so cursive joining is preserved. No slashes `/` or nested `()`.',
      'Start with `【Language】ar-SA`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `ArabicWord(Pronunciation)` tokens.\n   - Line 2: Full-line Latin transliteration.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word as `- Word (Pronunciation): [Base/Root: 〇〇] meaning (POS, root, grammar notes)` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】ar-SA
【Title】التحيات (Greetings & Daily Conversation)
【Source】Everyday Arabic

صباح(sˤaˈbaːħu) الخير(al-ˈxajr) يا(jaː) صديقي(sˤaˈdiːqiː)، كيف(ˈkajfa) حالك(ˈħaːluka)؟
sabahu al-khayr ya sadiqi, kayfa haluka?
Good morning, my friend, how are you?

【Vocabulary & Grammar】
- صباح الخير (sˤaˈbaːħu al-ˈxajr): [Base: صباح (morning) + الخير (goodness)] good morning (standard greeting).
- يا (jaː): O / hey (vocative particle).
- صديقي (sˤaˈdiːqiː): [Base: صديق (friend) + ـي (my)] my friend (masculine noun + 1st person possessive suffix).
- كيف (ˈkajfa): how (interrogative).
- حالك (ˈħaːluka): [Base: حال (condition) + ـك (your)] your condition / how you are.`
  },
  'fa-IR': {
    targetDesc: 'Persian (Persian Script + IPA/Transliteration)',
    rules: [
      'On Line 1, write each space-separated Persian word as `Word(IPA_or_Transliteration)` (include ezafe `-e` / `-ye` where applicable). Always annotate whole words so Persian cursive joining is preserved. No slashes `/` or nested `()`.',
      'Start with `【Language】fa-IR`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `PersianWord(Pronunciation)` tokens.\n   - Line 2: Full-line Latin transliteration.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word as `- Word (Pronunciation): [Base: 〇〇] meaning (POS, ezafe, verb stem/conjugation)` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】fa-IR
【Title】پرسیدن آدرس (Asking for Directions)
【Source】Travel Persian

ببخشید(be-bæx-ʃiːd)، ایستگاه(iːst-ˈɡɒːh-e) قطار(ɢæ-ˈtɒːɾ) کجاست(ko-ˈdʒɒːst)؟
bebakhshid, istgah-e qatar kojast?
Excuse me, where is the train station?

【Vocabulary & Grammar】
- ببخشید (be-bæx-ʃiːd): [Base: بخشیدن (to forgive/excuse)] excuse me (polite imperative).
- ایستگاه قطار (iːst-ˈɡɒːh-e ɢæ-ˈtɒːɾ): train station (noun + ezafe -e + noun).
- کجاست (ko-ˈdʒɒːst): [Base: کجا (where) + است (is)] where is it (contracted question form).`
  },
  'th-TH': {
    targetDesc: 'Thai (Thai Script + Tone-Marked Romanization)',
    rules: [
      'Although Thai is normally written without spaces between words, in this app you MUST **separate every word with a half-width space** on Line 1 in the format `ThaiWord(RomanizationWithTones)` (e.g., `สวัสดี(sà-wàt-dii) ครับ(khráp)`). Annotate whole words (not individual characters) so upper/lower vowel and tone marks stay intact. No slashes `/` or nested `()`.',
      'Start with `【Language】th-TH`, followed by `【Title】` and `【Source】`.',
      'For each sentence/line, repeat the following 4-part block:\n   - Line 1: Space-separated `ThaiWord(Romanization)` tokens.\n   - Line 2: Full-line tone-marked romanization.\n   - Line 3: Natural English translation.\n   - Line 4+: Under `【Vocabulary & Grammar】`, list each word as `- ThaiWord (Romanization): meaning (POS, tone & usage notes)` in English.',
      'Wrap the entire output in a single code block (```text ... ```) with no extra commentary.'
    ],
    sample: `【Language】th-TH
【Title】ถามทาง (Asking for Directions)
【Source】Travel Thai Conversation

ขอโทษ(khɔ̌ɔ-thôot) ครับ(khráp) สถานี(sà-thǎa-nii) รถไฟ(rót-fai) อยู่(yùu) ที่ไหน(thîi-nǎi)
khɔ̌ɔ-thôot khráp sà-thǎa-nii rót-fai yùu thîi-nǎi
Excuse me, where is the train station?

【Vocabulary & Grammar】
- ขอโทษ (khɔ̌ɔ-thôot): excuse me, sorry (verb phrase).
- ครับ (khráp): polite sentence-ending particle used by male speakers.
- สถานี (sà-thǎa-nii): station (noun).
- รถไฟ (rót-fai): train (noun: รถ "vehicle" + ไฟ "fire/electric").
- อยู่ (yùu): to be located, to stay (verb).
- ที่ไหน (thîi-nǎi): where (question phrase).'
`
  }
};

// AIプロンプト全体の組み立て関数（日本語 / 英語UIモード対応）
function buildPromptText(langMode, userLyrics = '', uiLang = 'ja') {
  const trimmed = String(userLyrics || '').trim();
  if (uiLang === 'en') {
    const targetSectionEn = trimmed
      ? `\n【Source Text & Metadata to Convert】\n${trimmed}\n`
      : `\n【Source Text & Metadata to Convert】\n(Paste the text you want to convert here)\n`;
    const tplEn = PROMPT_TEMPLATES_EN[langMode] || PROMPT_TEMPLATES_EN['zh-TW'];
    const rulesListEn = tplEn.rules.map((r, i) => `${i + 1}. ${r}`).join('\n');
    return `Please convert the following ${tplEn.targetDesc} text into the study format for my language learning app.

【Strict Output Rules】
${rulesListEn}

【Output Format Example】
${tplEn.sample.trim()}
${targetSectionEn}`;
  }

  const targetSection = trimmed
    ? `\n【変換したいテキスト・出典情報】\n${trimmed}\n`
    : `\n【変換したいテキスト・出典情報】\n（ここに変換したい文章を貼り付けてください）\n`;

  const tpl = PROMPT_TEMPLATES[langMode] || PROMPT_TEMPLATES['zh-TW'];
  const rulesList = tpl.rules.map((r, i) => `${i + 1}. ${r}`).join('\n');
  return `以下の${tpl.targetDesc}のテキストを、私の学習アプリ用のフォーマットに変換してください。

【厳守してほしい出力ルール】
${rulesList}

【出力フォーマット見本】
${tpl.sample.trim()}
${targetSection}`;
}

// ============================================================================
// 4. 画面メッセージ・UI文言定数（UI_TEXT_I18N: 日本語 / 英語）
// ============================================================================
const UI_TEXT_I18N = {
  ja: {
    // 基本ラベル・フォールバック表記
    untitledText: '無題のテキスト',
    untitledShort: '無題',
    unknownArtist: '出典・著者未設定',
    menuSongCountSub: (count) => `全${count}件 • 複数選択書き出し / バックアップ`,
    charTapDisabledHint: 'この言語は単語単位でのみタップできます',
    emptyLyricsHint: 'テキストデータがありません。右上の「＋」からテキストを追加してください。',
    vocabSectionToggle: '語彙・文法',
    playLineTitle: 'この行を読み上げ',
    playLineAria: (lineNo) => `行 ${lineNo} を読み上げ`,
    playerLineProgress: (current, total) => `${current} / ${total} 行`,
    playerNoText: 'テキストなし',
    playerZeroLines: '0 行',
    playStopLabel: '停止',
    playAllLabel: '全行再生',

    // 音声合成（TTS）関連
    voiceUnsupportedOption: 'お使いのブラウザは音声読み上げ非対応です',
    voiceUnsupportedHint: '※音声なしでルビ・辞書・行送り機能をご利用いただけます',
    voiceCheckingOption: '端末の音声を確認中...',
    voiceMissingOption: 'この言語の音声がありません（表示・辞書機能は利用可能）',
    voiceMissingHint: (langName) => `※お使いの環境には「${langName}」の音声がありません。タップ時のルビ・意味表示や行送りはそのまま動作します。`,
    voiceRegionPrefixes: {
      ko: '[韓国] ',
      hk: '[香港/広東] ',
      tw: '[台湾] ',
      cn: '[中国] '
    },
    speedChangedToast: (rateStr) => `読み上げ速度: ${rateStr}x`,
    allNotesOpenedToast: '全行の解説を開きました',
    allNotesClosedToast: '全行の解説を閉じました',

    // マイライブラリ・選択モード関連
    selectModeCount: (count) => `${count}件を選択中`,
    selectModePrompt: '書き出すテキストを選択',
    deselectAll: '全解除',
    selectAll: '全選択',
    selectModeDone: '完了',
    selectToExportBtn: '選択して書き出し',
    exportSelectedShort: (count) => (count > 0 ? `${count}件をJSON保存` : 'JSON保存'),
    exportSelectedLong: (count) => (count > 0 ? `選択した${count}件をJSON保存` : '選択したテキストをJSON保存'),
    shareSelectedCount: (count) => (count > 0 ? `${count}件を共有` : '共有'),
    libraryListHeading: (count) => `登録テキスト一覧（全${count}件）`,
    emptyLibraryHint: '登録されているテキストがありません',
    songMetaSummary: (artist, lineCount) => `${artist} • ${lineCount}行`,
    rowShareTitle: 'テキストを共有',
    rowShareAria: '共有',
    rowCopyTitle: 'テキストをコピー',
    rowCopyAria: 'コピー',
    rowEditTitle: '編集',
    rowEditAria: '編集',
    rowDeleteTitle: '削除',
    rowDeleteAria: '削除',

    // エディタ・ライブステータス関連
    editorTitleEdit: 'テキストデータの編集',
    editorTitleNew: '新しいテキストを追加',
    btnSaveDefault: '保存して開く',
    btnSaveMulti: (count) => `${count}件を一括追加`,
    multiConflictWarn: (total, conflictCount) =>
      `⚠ ${total}件中 ${conflictCount}件は同じタイトルの別内容データが登録済みです（追加時に「別名で両方残す」「上書き」「スキップ」を選べます）`,
    multiDetectedOk: (total, previewTitles, hasMore) =>
      `✓ ${total}件のデータ（${previewTitles}${hasMore ? ' ほか' : ''}）を検出しました`,
    singleDuplicateSameOk: (lineCount, vocabCount, modeLabel, title) =>
      `✓ ${lineCount}行・${vocabCount}個の解説（${modeLabel}） ※「${title}」は同じ内容で登録済みです`,
    singleDuplicateConflictWarn: (title) =>
      `⚠ 同じタイトル「${title}」が既に登録されています（保存時に「別名で両方残す」か「上書き」を選べます）`,
    singleDetectedOk: (lineCount, vocabCount, modeLabel) =>
      `✓ ${lineCount}行のテキスト・${vocabCount}個の解説を検出（${modeLabel}）`,
    singleNoRubyErr: '※「文字(読み)」形式の行がまだ検出されていません',
    emptyRawErr: '※学習テキスト素材を貼り付けてください。',
    noValidLinesErr: '※「文字(読み)」形式のテキスト行が見つかりませんでした。',

    // 衝突解決ダイアログ・マージ結果サマリー
    mergeSummaryRenamedAll: (added) => `${added}件を別名で追加`,
    mergeSummaryRenamedPart: (added, renamed) => `${added}件を追加（うち${renamed}件を別名保存）`,
    mergeSummaryAdded: (added) => `${added}件を追加`,
    mergeSummaryUpdated: (updated) => `${updated}件を上書き更新`,
    mergeSummarySkipped: (skipped) => `${skipped}件はスキップ`,
    mergeSummaryNoChange: '変更はありませんでした',
    singleConflictMsg: (title) => `「${title}」は、既に同じタイトルで異なる内容が登録されています。どのように保存しますか？`,
    singleKeepBothBtn: (previewTitle) => `別名（${previewTitle}）にして両方残す`,
    singleOverwriteBtn: '既存のデータを新しい内容で上書き',
    multiConflictMsg: (total, conflictCount) =>
      `取り込む${total}件のうち、${conflictCount}件は既に同じタイトルで異なる内容が登録されています。どのように処理しますか？`,
    multiKeepBothBtn: (conflictCount) => `重複する${conflictCount}件を別名（(2)など）にして全て残す`,
    multiOverwriteBtn: (conflictCount) => `重複する${conflictCount}件を新しい内容で上書き`,
    multiSkipWithNewBtn: (conflictCount, newCount) => `重複する${conflictCount}件はスキップ（新規${newCount}件のみ追加）`,
    multiSkipAllBtn: (conflictCount) => `重複する${conflictCount}件をスキップ（追加しない）`,
    moreConflictsSuffix: (restCount) => `ほか ${restCount}件`,

    // トースト・確認メッセージ関連
    quotaExceededTitle: '保存容量の上限に達しました',
    quotaExceededSub: '不要なテキストを削除するかJSONでバックアップしてください',
    minOneSongToast: '最低1件は残す必要があります',
    confirmDeleteMessage: (title) => `「${title}」をライブラリから削除します。よろしいですか？`,
    deletedSongToast: 'テキストを削除しました',
    batchImportDoneTitle: (count) => `一括取り込み完了（計${count}件）`,
    savedChangesToast: '変更を保存しました',
    alreadyRegisteredToast: '既に同じ内容で登録されています',
    addedNewToast: '新しいテキストを追加しました',
    savedRenamedToast: '別名で変更を保存しました',
    overwrittenExistingToast: '既存のテキストを上書き更新しました',
    addedRenamedToast: '別名でテキストを追加しました',
    importedCountTitle: (count) => `データを取り込みました（計${count}件）`,
    exportedJsonToastTitle: 'JSONファイルを保存しました',
    sharedJsonToastTitle: 'JSONファイルを共有しました',
    itemCountSub: (count) => `計${count}件`,
    shareJsonFileTitle: (count) => `Ruby Text Player データ（${count}件）`,
    shareJsonUnsupportedTitle: 'この環境ではJSONファイルの直接共有に対応していません',
    shareJsonUnsupportedSub: '「JSON保存 / 書き出し」をご利用ください',
    noValidDataInFileToast: '有効なテキストデータが見つかりませんでした',
    mergedJsonToastTitle: (count) => `データを統合しました（計${count}件）`,
    fileReadErrorToast: 'ファイルの読み込みに失敗しました',
    copiedCurrentSongTitle: 'このテキストをコピーしました',
    copiedSongTitle: (title) => `「${title}」をコピーしました`,
    shareHintSub: 'LINE等で共有できます',
    copyFailedToast: 'コピーに失敗しました',
    sharedCurrentSongTitle: 'テキストを共有しました',
    sharedSongTitle: (title) => `「${title}」を共有しました`,
    shareFailedTitle: '共有できませんでした',
    shareCurrentSongFailedSub: '「このテキストをコピー」をご利用ください',
    shareSongFailedSub: 'コピーボタンをご利用ください',
    selectSongsToSaveToast: '保存するテキストを選択してください',
    selectSongsToShareToast: '共有するテキストを選択してください',
    pastedClipboardToast: 'クリップボードから貼り付けました',
    emptyClipboardToast: 'クリップボードが空です',
    manualPasteHintToast: 'テキスト欄を長押し（またはCtrl+V）して貼り付けてください',
    copiedPromptTitle: 'AIプロンプトをコピーしました',
    copiedPromptSub: 'GeminiやChatGPTに貼り付けてください',
    copiedPromptForAddSub: 'AIの出力結果をここに貼り付けてください',
    sharePromptDocTitle: 'Ruby Text Player AI変換プロンプト',
    sharedPromptToast: 'AIプロンプトを共有しました',
    sharePromptFailedSub: '「コピーのみ」をご利用ください',
    rubyOrderNormalToast: 'ルビ配置：上＝主ルビ ／ 下＝サブルビ',
    rubyOrderSwappedToast: 'ルビ配置：上＝サブルビ ／ 下＝主ルビ'
  },

  en: {
    // Basic labels & fallbacks
    untitledText: 'Untitled Text',
    untitledShort: 'Untitled',
    unknownArtist: 'No source / author',
    menuSongCountSub: (count) => `${count} item${count === 1 ? '' : 's'} • Multi-select export / Backup`,
    charTapDisabledHint: 'This language supports word-level tap only',
    emptyLyricsHint: 'No text data found. Tap "+" in the top-right corner to add study text.',
    vocabSectionToggle: 'Vocabulary & Grammar',
    playLineTitle: 'Speak this line',
    playLineAria: (lineNo) => `Speak line ${lineNo}`,
    playerLineProgress: (current, total) => `Line ${current} / ${total}`,
    playerNoText: 'No text',
    playerZeroLines: '0 lines',
    playStopLabel: 'Stop',
    playAllLabel: 'Play All',

    // TTS / Voice status
    voiceUnsupportedOption: 'Speech synthesis is not supported in this browser',
    voiceUnsupportedHint: '* You can still use ruby annotations, dictionary notes, and line navigation without audio',
    voiceCheckingOption: 'Checking available device voices...',
    voiceMissingOption: 'No voice installed for this language (display & notes work normally)',
    voiceMissingHint: (langName) => `* No voice found for "${langName}" on this device. Tap-to-view meanings and line progression still work normally.`,
    voiceRegionPrefixes: {
      ko: '[KR] ',
      hk: '[HK/Cantonese] ',
      tw: '[TW] ',
      cn: '[CN] '
    },
    speedChangedToast: (rateStr) => `Playback speed: ${rateStr}x`,
    allNotesOpenedToast: 'Expanded all vocabulary notes',
    allNotesClosedToast: 'Collapsed all vocabulary notes',

    // Library & selection mode
    selectModeCount: (count) => `${count} selected`,
    selectModePrompt: 'Select texts to export',
    deselectAll: 'Deselect All',
    selectAll: 'Select All',
    selectModeDone: 'Done',
    selectToExportBtn: 'Select & Export',
    exportSelectedShort: (count) => (count > 0 ? `Save JSON (${count})` : 'Save JSON'),
    exportSelectedLong: (count) => (count > 0 ? `Save ${count} Selected as JSON` : 'Save Selected as JSON'),
    shareSelectedCount: (count) => (count > 0 ? `Share (${count})` : 'Share'),
    libraryListHeading: (count) => `Saved Texts (${count})`,
    emptyLibraryHint: 'No saved texts in your library',
    songMetaSummary: (artist, lineCount) => `${artist} • ${lineCount} line${lineCount === 1 ? '' : 's'}`,
    rowShareTitle: 'Share text',
    rowShareAria: 'Share',
    rowCopyTitle: 'Copy text',
    rowCopyAria: 'Copy',
    rowEditTitle: 'Edit',
    rowEditAria: 'Edit',
    rowDeleteTitle: 'Delete',
    rowDeleteAria: 'Delete',

    // Editor & live parse status
    editorTitleEdit: 'Edit Study Text',
    editorTitleNew: 'Add New Study Text',
    btnSaveDefault: 'Save & Open',
    btnSaveMulti: (count) => `Import All ${count} Items`,
    multiConflictWarn: (total, conflictCount) =>
      `⚠ ${conflictCount} of ${total} items share a title with existing data (you can choose "Keep Both", "Overwrite", or "Skip" on save)`,
    multiDetectedOk: (total, previewTitles, hasMore) =>
      `✓ Detected ${total} items (${previewTitles}${hasMore ? ' etc.' : ''})`,
    singleDuplicateSameOk: (lineCount, vocabCount, modeLabel, title) =>
      `✓ ${lineCount} lines • ${vocabCount} notes (${modeLabel}) * "${title}" is already saved with identical content`,
    singleDuplicateConflictWarn: (title) =>
      `⚠ An item titled "${title}" already exists with different content (choose "Keep Both" or "Overwrite" when saving)`,
    singleDetectedOk: (lineCount, vocabCount, modeLabel) =>
      `✓ Detected ${lineCount} line${lineCount === 1 ? '' : 's'} • ${vocabCount} vocab note${vocabCount === 1 ? '' : 's'} (${modeLabel})`,
    singleNoRubyErr: '* No "word(reading)" formatted lines detected yet',
    emptyRawErr: '* Please paste study text material first.',
    noValidLinesErr: '* Could not find any lines in "word(reading)" format.',

    // Conflict dialog & merge summary
    mergeSummaryRenamedAll: (added) => `Added ${added} renamed`,
    mergeSummaryRenamedPart: (added, renamed) => `Added ${added} (${renamed} renamed)`,
    mergeSummaryAdded: (added) => `Added ${added}`,
    mergeSummaryUpdated: (updated) => `Overwrote ${updated}`,
    mergeSummarySkipped: (skipped) => `Skipped ${skipped}`,
    mergeSummaryNoChange: 'No changes made',
    singleConflictMsg: (title) => `"${title}" already exists in your library with different content. How would you like to save it?`,
    singleKeepBothBtn: (previewTitle) => `Keep both (save as "${previewTitle}")`,
    singleOverwriteBtn: 'Overwrite existing data with new content',
    multiConflictMsg: (total, conflictCount) =>
      `${conflictCount} of the ${total} incoming items have the same title as existing entries with different content. How would you like to handle them?`,
    multiKeepBothBtn: (conflictCount) => `Keep all (rename ${conflictCount} duplicate${conflictCount === 1 ? '' : 's'} with (2), etc.)`,
    multiOverwriteBtn: (conflictCount) => `Overwrite ${conflictCount} existing item${conflictCount === 1 ? '' : 's'}`,
    multiSkipWithNewBtn: (conflictCount, newCount) => `Skip ${conflictCount} duplicate${conflictCount === 1 ? '' : 's'} (add ${newCount} new only)`,
    multiSkipAllBtn: (conflictCount) => `Skip ${conflictCount} duplicate${conflictCount === 1 ? '' : 's'} (do not import)`,
    moreConflictsSuffix: (restCount) => `+ ${restCount} more`,

    // Toasts & confirmations
    quotaExceededTitle: 'Storage limit reached',
    quotaExceededSub: 'Please delete unused texts or back up your library as JSON',
    minOneSongToast: 'At least 1 text item must remain in the library',
    confirmDeleteMessage: (title) => `Delete "${title}" from your library?`,
    deletedSongToast: 'Text deleted',
    batchImportDoneTitle: (count) => `Batch import complete (${count} items)`,
    savedChangesToast: 'Changes saved',
    alreadyRegisteredToast: 'Already saved with identical content',
    addedNewToast: 'New study text added',
    savedRenamedToast: 'Saved under a new name',
    overwrittenExistingToast: 'Updated existing text',
    addedRenamedToast: 'Added as a separate copy',
    importedCountTitle: (count) => `Imported ${count} item${count === 1 ? '' : 's'}`,
    exportedJsonToastTitle: 'JSON file saved',
    sharedJsonToastTitle: 'JSON file shared',
    itemCountSub: (count) => `${count} item${count === 1 ? '' : 's'}`,
    shareJsonFileTitle: (count) => `Ruby Text Player Data (${count} items)`,
    shareJsonUnsupportedTitle: 'Direct JSON file sharing is not supported here',
    shareJsonUnsupportedSub: 'Please use "Export / Save JSON" instead',
    noValidDataInFileToast: 'No valid study text data found in file',
    mergedJsonToastTitle: (count) => `Merged library data (${count} items)`,
    fileReadErrorToast: 'Failed to read file',
    copiedCurrentSongTitle: 'Copied text to clipboard',
    copiedSongTitle: (title) => `Copied "${title}"`,
    shareHintSub: 'Ready to paste and share',
    copyFailedToast: 'Failed to copy to clipboard',
    sharedCurrentSongTitle: 'Shared study text',
    sharedSongTitle: (title) => `Shared "${title}"`,
    shareFailedTitle: 'Could not open share sheet',
    shareCurrentSongFailedSub: 'Please use "Copy This Text" instead',
    shareSongFailedSub: 'Please use the copy button instead',
    selectSongsToSaveToast: 'Please select at least one text to save',
    selectSongsToShareToast: 'Please select at least one text to share',
    pastedClipboardToast: 'Pasted from clipboard',
    emptyClipboardToast: 'Clipboard is empty',
    manualPasteHintToast: 'Long-press the text box (or press Ctrl+V) to paste',
    copiedPromptTitle: 'Copied AI prompt',
    copiedPromptSub: 'Paste it into Gemini or ChatGPT',
    copiedPromptForAddSub: 'Paste the AI output into the box below',
    sharePromptDocTitle: 'Ruby Text Player AI Prompt',
    sharedPromptToast: 'Shared AI prompt',
    sharePromptFailedSub: 'Please use "Copy Only" instead',
    rubyOrderNormalToast: 'Ruby Layout: Main on Top / Sub Below',
    rubyOrderSwappedToast: 'Ruby Layout: Sub on Top / Main Below'
  }
};

// 後方互換用デフォルト参照（app.js で動的に切り替わる）
let UI_TEXT = UI_TEXT_I18N.ja;

// ============================================================================
// 5. HTML固定要素の多言語辞書（HTML_I18N: data-i18n 属性で自動反映）
// ============================================================================
const HTML_I18N = {
  ja: {
    pageTitle: 'Ruby Text Player | 多言語テキスト学習プレイヤー',
    switchSongTitle: 'テキストを切り替える',
    offlineTitle: 'オフラインで動作中（学習・再生・保存すべて利用可能）',
    offlineLabel: 'オフライン',
    refUrlTitle: '参考リンクを開く',
    newSongTitle: '新しいテキストを追加',
    menuTitle: 'メニュー',
    firstHintText: 'テキストの単語をタップすると発音と意味が表示されます。下のバーから全行再生や表示設定ができます。',
    dismissHintAria: 'ヒントを閉じる',
    playerNavAria: '再生・表示コントロール',
    prevLineTitle: '前の行 (↑ / K)',
    playAllTitle: '全行再生 / 停止 (Space)',
    nextLineTitle: '次の行 (↓ / J)',
    speedTitle: '読み上げ速度',
    toggleAllNotesTitle: '全行の解説を開閉',
    displaySheetBtnTitle: '表示・音声設定',
    displaySheetTitle: '表示・音声設定',
    closeAria: '閉じる',
    uiLangSection: '表示言語 / UI Language',
    themeSection: '外観テーマ',
    themeAuto: '自動',
    themeLight: 'ライト',
    themeDark: 'ダーク',
    fontSizeSection: '文字サイズ',
    fontSmall: '小',
    fontMedium: '標準',
    fontLarge: '大',
    tapUnitSection: 'テキストタップ時の単位',
    tapWord: '単語ごと',
    tapChar: '1文字ごと',
    rubyOrderSection: 'ルビの上下配置',
    rubyOrderNormal: '上：主ルビ ／ 下：サブルビ',
    rubyOrderSwapped: '上：サブルビ ／ 下：主ルビ',
    displayItemsSection: '表示項目',
    transLabel: '翻訳・意味行',
    transDesc: 'テキストの日本語訳・英語訳',
    ttsSection: '読み上げ音声（Web Speech API）',
    testVoiceBtn: '試聴',
    menuSheetTitle: 'メニュー',
    menuEditCurrent: 'このテキストを編集',
    menuCopyCurrent: 'このテキストをコピー',
    menuCopyCurrentSub: '1件だけLINE等で共有するときに便利',
    menuShareCurrent: 'このテキストを共有',
    menuShareCurrentSub: 'OSの共有シートでLINE・メモ帳等へ直接送る',
    menuLibrary: 'マイライブラリ・共有',
    menuPrompt: 'AI変換用プロンプトを作成',
    menuPromptSub: 'Gemini / ChatGPTで外国語テキストから教材を作成',
    songsSheetTitle: 'マイライブラリ',
    songsSheetSub: 'テキストの切り替えや、複数件を選んでファイル共有・バックアップができます。',
    backupSection: 'バックアップ・ファイル入出力',
    jsonBackupTitle: 'JSONバックアップ',
    jsonBackupDesc: '全テキストデータの書き出し・読み込み（別端末への移行やバックアップに）',
    shareBtn: '共有',
    exportJsonBtn: '書き出し',
    importJsonBtn: '読み込み',
    newSongBtn: '新しいテキストを追加',
    cancelBtn: 'キャンセル',
    songTitleLabel: 'タイトル',
    songTitleHint: '（【タイトル】から自動入力）',
    songTitlePlaceholder: '例：첫인사와 자기소개 (初めての挨拶と自己紹介)',
    songArtistLabel: '出典・著者名',
    songArtistHint: '（任意）',
    songArtistPlaceholder: '例：韓国語日常会話',
    songUrlLabel: '参考URL',
    songUrlHint: '（任意・記事や動画のリンク等）',
    rawLyricsLabel: '学習テキスト素材',
    rawLyricsHint: '（【言語】タグ・多言語ルビ対応）',
    pasteBtn: '貼り付け',
    pasteBtnTitle: 'クリップボードから貼り付け',
    aiPromptShortBtn: 'AI用プロンプト',
    rawLyricsPlaceholder: '【言語】ko-KR\n【タイトル】첫인사와 자기소개 (初めての挨拶と自己紹介)\n【出典】韓国語日常会話\n\n안녕하세요(안녕하세요) 만나서(만나서) 반갑습니다(반갑씀니다).\nannyeonghaseyo mannaseo bangapseumnida.\nこんにちは、お会いできて嬉しいです。\n\n【単語・文法解説】\n- 안녕하세요 (안녕하세요 / annyeonghaseyo)：こんにちは（挨拶表現）。',
    fillSampleBtn: '見本を入れる',
    promptSheetTitle: 'AI変換用プロンプト',
    promptSheetSub: 'GeminiやChatGPTに貼り付けると、このアプリ専用の学習データが作れます。',
    promptStep1: '1. テキストの言語を選択',
    promptStep2: '2. 変換したい文章・タイトル',
    promptStep2Hint: '（空欄のままでもコピーできます）',
    promptSourcePlaceholder: 'ここに学習したい外国語の文章（ニュース・物語・日常会話・スピーチなど）を貼り付けると、下のプロンプトに自動で組み込まれます。',
    promptStep3: '3. 生成されたプロンプト',
    closeBtn: '閉じる',
    copyOnlyBtn: 'コピーのみ',
    copyAndAddBtn: 'コピーしてテキスト追加へ',
    confirmDeleteTitle: 'テキストを削除しますか？',
    confirmDeleteBtn: '削除する',
    conflictSheetTitle: '同じタイトルのデータがあります',
    chipZhTW: '華語（注音）',
    chipZhCN: '中国語（簡体）',
    chipYueHK: '広東語（粤拼）',
    chipNanTW: '台湾語（台羅）',
    chipKoKR: '韓国語',
    chipJaJP: '日本語',
    chipEnUS: '英語（IPA）',
    chipDeDE: 'ドイツ語',
    chipFrFR: 'フランス語',
    chipEsES: 'スペイン語',
    chipRuRU: 'ロシア語',
    chipArSA: 'アラビア語',
    chipFaIR: 'ペルシア語',
    chipThTH: 'タイ語'
  },

  en: {
    pageTitle: 'Ruby Text Player | Multilingual Interactive Reading Player',
    switchSongTitle: 'Switch study text',
    offlineTitle: 'Working offline (all reading, playback & saving features available)',
    offlineLabel: 'Offline',
    refUrlTitle: 'Open reference link',
    newSongTitle: 'Add new study text',
    menuTitle: 'Menu',
    firstHintText: 'Tap any word in the text to hear its pronunciation and see its meaning. Use the bottom bar to play all lines or customize display settings.',
    dismissHintAria: 'Dismiss hint',
    playerNavAria: 'Playback & display controls',
    prevLineTitle: 'Previous line (↑ / K)',
    playAllTitle: 'Play all / Stop (Space)',
    nextLineTitle: 'Next line (↓ / J)',
    speedTitle: 'Playback speed',
    toggleAllNotesTitle: 'Expand / collapse all notes',
    displaySheetBtnTitle: 'Display & Voice Settings',
    displaySheetTitle: 'Display & Voice Settings',
    closeAria: 'Close',
    uiLangSection: 'UI Language / 表示言語',
    themeSection: 'Appearance',
    themeAuto: 'Auto',
    themeLight: 'Light',
    themeDark: 'Dark',
    fontSizeSection: 'Text Size',
    fontSmall: 'Small',
    fontMedium: 'Default',
    fontLarge: 'Large',
    tapUnitSection: 'Tap Unit',
    tapWord: 'By Word',
    tapChar: 'By Character',
    rubyOrderSection: 'Ruby Position (Top / Bottom)',
    rubyOrderNormal: 'Main on Top / Sub Below',
    rubyOrderSwapped: 'Sub on Top / Main Below',
    displayItemsSection: 'Visible Rows',
    transLabel: 'Translation Line',
    transDesc: 'Sentence translation below each line',
    ttsSection: 'Speech Voice (Web Speech API)',
    testVoiceBtn: 'Test',
    menuSheetTitle: 'Menu',
    menuEditCurrent: 'Edit This Text',
    menuCopyCurrent: 'Copy This Text',
    menuCopyCurrentSub: 'Handy for sharing a single text via chat or notes',
    menuShareCurrent: 'Share This Text',
    menuShareCurrentSub: 'Send directly to other apps via OS share sheet',
    menuLibrary: 'My Library & Backup',
    menuPrompt: 'Generate AI Prompt',
    menuPromptSub: 'Create study material from any foreign text with Gemini / ChatGPT',
    songsSheetTitle: 'My Library',
    songsSheetSub: 'Switch between texts, or select multiple items to share and back up.',
    backupSection: 'Backup & File I/O',
    jsonBackupTitle: 'JSON Backup',
    jsonBackupDesc: 'Export or import all texts (for device migration or backup)',
    shareBtn: 'Share',
    exportJsonBtn: 'Export',
    importJsonBtn: 'Import',
    newSongBtn: 'Add New Study Text',
    cancelBtn: 'Cancel',
    songTitleLabel: 'Title',
    songTitleHint: '(Auto-filled from 【Title】)',
    songTitlePlaceholder: 'e.g., 첫인사와 자기소개 (Greetings & Self-Introduction)',
    songArtistLabel: 'Source / Author',
    songArtistHint: '(Optional)',
    songArtistPlaceholder: 'e.g., Everyday Korean Conversation',
    songUrlLabel: 'Reference URL',
    songUrlHint: '(Optional link to article/video)',
    rawLyricsLabel: 'Study Text Material',
    rawLyricsHint: '(Supports 【Language】 tag & 14-language ruby)',
    pasteBtn: 'Paste',
    pasteBtnTitle: 'Paste from clipboard',
    aiPromptShortBtn: 'AI Prompt',
    rawLyricsPlaceholder: '【Language】ko-KR\n【Title】첫인사와 자기소개 (Greetings & Self-Introduction)\n【Source】Everyday Korean Conversation\n\n안녕하세요(안녕하세요) 만나서(만나서) 반갑습니다(반갑씀니다).\nannyeonghaseyo mannaseo bangapseumnida.\nHello, nice to meet you.\n\n【Vocabulary & Grammar】\n- 안녕하세요 (안녕하세요 / annyeonghaseyo): Hello (polite greeting).',
    fillSampleBtn: 'Insert Sample',
    promptSheetTitle: 'AI Prompt Generator',
    promptSheetSub: 'Paste into Gemini or ChatGPT to turn any foreign text into interactive study material.',
    promptStep1: '1. Select Target Language',
    promptStep2: '2. Source Text or Topic',
    promptStep2Hint: '(Optional — you can copy the prompt as-is)',
    promptSourcePlaceholder: 'Paste the foreign text you want to study (news, dialogue, story, speech, etc.) and it will be embedded into the prompt below.',
    promptStep3: '3. Generated Prompt',
    closeBtn: 'Close',
    copyOnlyBtn: 'Copy Only',
    copyAndAddBtn: 'Copy & Go to Add Text',
    confirmDeleteTitle: 'Delete Study Text?',
    confirmDeleteBtn: 'Delete',
    conflictSheetTitle: 'Duplicate Title Detected',
    chipZhTW: 'Mandarin (Zhuyin)',
    chipZhCN: 'Chinese (Pinyin)',
    chipYueHK: 'Cantonese',
    chipNanTW: 'Taiwanese',
    chipKoKR: 'Korean',
    chipJaJP: 'Japanese',
    chipEnUS: 'English (IPA)',
    chipDeDE: 'German',
    chipFrFR: 'French',
    chipEsES: 'Spanish',
    chipRuRU: 'Russian',
    chipArSA: 'Arabic',
    chipFaIR: 'Persian',
    chipThTH: 'Thai'
  }
};
