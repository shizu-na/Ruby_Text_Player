// ============================================================================
// Ruby Text Player - コンテンツ＆定数データ集約ファイル (content-data.js)
// ----------------------------------------------------------------------------
// ・初期サンプル教材データ (DEFAULT_RAW_TEXT / EMBEDDED_SONGS)
// ・14言語マスターカタログ (LANG_CATALOG)
// ・AI変換プロンプトテンプレート (PROMPT_TEMPLATES / buildPromptText)
// ・画面メッセージ・トースト・ダイアログ文言 (UI_TEXT)
// ============================================================================

// ============================================================================
// 1. 初期サンプルデータ
// ============================================================================
const DEFAULT_RAW_TEXT = `【言語】ko-KR
【タイトル】아리랑 (Arirang)
【出典】韓国伝統民謡 (Korean Traditional Folksong)

아리랑(아리랑) 아리랑(아리랑) 아라리요(아라리요)
arirang arirang arariyo
アリラン、アリラン、アラリヨ。

【単語・文法解説】
- 아리랑 (아리랑 / arirang)：アリラン（固有の民謡名・リフレイン）。韓国の代表的な民謡の題名であり、歌詞の中で繰り返される。
- 아라리요 (아라리요 / arariyo)：アラリヨ（民謡のリフレイン）。特定の意味をそのまま訳すというより、民謡特有の響きやリズムを担う表現。

아리랑(아리랑) 고개로(고개로) 넘어(너머) 간다(간다)
arirang gogaero neomeo ganda
アリラン峠を越えていく。

【単語・文法解説】
- 아리랑 (아리랑 / arirang)：アリラン（民謡名・リフレイン）。
- 고개로 (고개로 / gogaero)：【原形：고개】峠を、峠へ（名詞＋助詞）。「고개（峠）」に方向・経路を表す「로」が付いている。
- 넘어 간다 (너머 간다 / neomeo ganda)：【原形：넘어가다（越えていく）】越えていく（複合動詞・現在形）。「넘다（越える）」の連用形「넘어」に「가다（行く）」の現在形「간다」が続いた表現。
- 넘어 (너머 / neomeo)：【原形：넘다】越えて（動詞）。パッチム「ㅁ」が後ろの母音「어」と連音化して「너머」と発音される。
- 간다 (간다 / ganda)：【原形：가다】行く（動詞・現在形）。

나를(나를) 버리고(버리고) 가시는(가시는) 임은(이믄)
nareul beorigo gasineun imeun
私を捨てて行かれるあの人は。

【単語・文法解説】
- 나를 (나를 / nareul)：【原形：나】私を（代名詞＋目的格助詞）。「나（私）」に目的格助詞「를」が付いた形。
- 버리고 (버리고 / beorigo)：【原形：버리다】捨てて（動詞）。「버리다」の語幹「버리-」に接続語尾「-고」が付いた形。「〜して」と動作をつなぐ。
- 가시는 (가시는 / gasineun)：【原形：가다】行かれる（動詞＋連体形）。「가다」の語幹「가-」に尊敬の「-(으)시-」と連体形語尾「-는」が付いた形。後ろの「임」を修飾する。
- 임은 (이믄 / imeun)：【原形：임】愛する人は、慕わしい人は（名詞＋主題助詞）。「임」は愛する人・恋しい人を表す語。連音化により「이믄」と発音される。

십(심) 리도(니도) 못(몯) 가서(까서) 발병난다(발뼝난다)
sim nido mot kkaseo balbyeongnanda
十里も行かないうちに、足に病を患う。

【単語・文法解説】
- 십 리도 (심 니도 / sim nido)：【原形：십 리（十里）＋ 도（〜も）】十里も（数詞＋単位名詞＋助詞）。パッチム「ㅂ」と後続の「ㄹ」が出会うことで鼻音化が起き、「심니도」と発音される。1里は約400メートル（十里は約4キロメートル）。
- 못 가서 (몯 까서 / mot kkaseo)：【原形：못（〜できない）＋ 가다（行く）】行けずに、行かないうちに（副詞＋動詞）。「못」の語末「ㅅ」は代表音「ㄷ」に中和され、直後の「가」が濃音化して「몯 까서」と発音される。
- 발병난다 (발뼝난다 / balbyeongnanda)：【原形：발병나다】足の病気になる、足を痛める（動詞）。パッチム「ㄹ」の後ろで「병（病）」が濃音化し「발뼝난다」と発音される。`;

const EMBEDDED_SONGS = [
  {
    id: 'song_default_arirang',
    title: '아리랑 (Arirang)',
    artist: '韓国伝統民謡 (Korean Traditional Folksong)',
    url: '',
    rawText: DEFAULT_RAW_TEXT,
    updatedAt: 1710000000000
  }
];

// ============================================================================
// 2. 言語マスターカタログ（LANG_CATALOG）
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
    rubyLabel: '注音（ボポモフォ）',
    rubyDesc: '漢字の上の発音記号',
    subLineLabel: 'ピンイン行',
    subLineDesc: '行ごとのアルファベット表記',
    voiceHint: '※華語（zh-TW）の音声が最優先で選ばれます',
    tts: {
      lang: 'zh-TW',
      prefer: ['zh-tw', 'zh-hant-tw', 'cmn-hant-tw', 'cmn-tw', 'taiwan', '國語'],
      accept: ['zh-cn', 'zh-hans', 'cmn-hans', 'cmn-cn', 'zh-sg', 'putonghua', '普通話', '普通话'],
      reject: ['zh-hk', 'zh-mo', 'yue', 'cantonese', '広東', '廣東', '粤', 'nan', 'hak', 'hokkien', 'taiwanese'],
      foreignLatin: 'en-US'
    },
    sample: {
      text: '好一朵美麗的茉莉花',
      ruby: 'ㄏㄠˇ ㄧˋ ㄉㄨㄛˇ ㄇㄟˇ ㄌㄧˋ ㄉㄜ˙ ㄇㄛˋ ㄌㄧˋ ㄏㄨㄚ',
      note: 'なんと美しいジャスミンの花'
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
      text: '好一朵美丽的茉莉花',
      ruby: 'hǎo yì duǒ měi lì de mò lì huā',
      note: 'なんと美しいジャスミンの花'
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
      text: '床前明月光，疑是地上霜',
      ruby: 'cong4 cin4 ming4 jyut6 gwong1, ji4 si6 dei6 soeng6 soeng1',
      note: '寝台の前の明るい月の光、地上の霜かと疑うほどだ（李白『靜夜思』）'
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
      text: '望春風',
      ruby: 'bāng tshun-hong',
      note: '春風を待ちわびる'
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
    rubyLabel: '発音ハングル（ルビ）',
    rubyDesc: '文字の上の実際の発音表記',
    subLineLabel: 'ローマ字 / 発音行',
    subLineDesc: '行ごとの改訂ローマ字・発音補助表記',
    voiceHint: '※韓国語（ko-KR）の音声が最優先で選ばれます',
    tts: {
      lang: 'ko-KR',
      prefer: ['ko-kr', 'ko', 'korean', '한국', '韓国', '朝鮮'],
      accept: [],
      reject: [],
      foreignLatin: 'en-US'
    },
    sample: {
      text: '안녕하세요 만나서 반갑습니다',
      ruby: '안녕하세요 만나서 반갑씀니다',
      note: 'こんにちは、お会いできて嬉しいです'
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
    rubyLabel: 'ふりがな（ルビ）',
    rubyDesc: '漢字の上の読み仮名',
    subLineLabel: 'ローマ字 / 発音行',
    subLineDesc: '行ごとのローマ字・発音補助表記',
    voiceHint: '※日本語（ja-JP）の音声が最優先で選ばれます',
    tts: {
      lang: 'ja-JP',
      prefer: ['ja-jp', 'ja', 'japanese', '日本'],
      accept: [],
      reject: [],
      foreignLatin: 'en-US'
    },
    sample: {
      text: 'さくら さくら 野山も里も',
      ruby: 'さくら さくら のやま も さと も',
      note: '桜、桜、野山も里も'
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
      text: 'Amazing grace how sweet the sound',
      ruby: 'əˈmeɪzɪŋ ɡreɪs haʊ swiːt ðə saʊnd',
      note: 'アメイジング・グレイス、なんと美しい響きか'
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
      text: 'Stille Nacht, heilige Nacht',
      ruby: 'ˈʃtɪlə naxt ˈhaɪlɪɡə naxt',
      note: 'きよしこの夜'
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
      text: 'Frère Jacques, dormez-vous',
      ruby: 'fʁɛʁ ʒak dɔʁme vu',
      note: 'フレール・ジャック、眠っているのですか'
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
      text: 'Hola, buenos días, mucho gusto',
      ruby: 'ˈola ˈbwenos ˈðias ˈmutʃo ˈɣusto',
      note: 'こんにちは、おはようございます、はじめまして'
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
    rubyLabel: '発音記号（IPA）',
    rubyDesc: '単語の上のIPA発音（アカニエ等を反映）',
    subLineLabel: 'ラテン文字転写 / 発音行',
    subLineDesc: '行ごとのラテン文字転写表記',
    voiceHint: '※ロシア語（ru-RU）の音声が最優先で選ばれます',
    tts: {
      lang: 'ru-RU',
      prefer: ['ru-ru', 'ru', 'russian', 'русский', 'ロシア'],
      accept: [],
      reject: [],
      foreignLatin: null
    },
    sample: {
      text: 'Очи чёрные, очи страстные',
      ruby: 'ˈotɕɪ ˈtɕɵrnɨjə ˈotɕɪ ˈstrasnɨjə',
      note: '黒い瞳、情熱的な瞳'
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
    rubyLabel: '発音記号（IPA / 転写）',
    rubyDesc: 'アラビア文字の上の発音表記',
    subLineLabel: 'ラテン文字転写 / 発音行',
    subLineDesc: '行ごとのラテン文字転写表記',
    voiceHint: '※アラビア語（ar）の音声が最優先で選ばれます',
    tts: {
      lang: 'ar-SA',
      prefer: ['ar-sa', 'ar-eg', 'ar-ae', 'ar', 'arabic', 'العربية', 'アラビア'],
      accept: [],
      reject: [],
      foreignLatin: 'en-US'
    },
    sample: {
      text: 'ألف ليلة وليلة',
      ruby: 'ʔalf ˈlajla wa ˈlajla',
      note: '千夜一夜（アルフ・ライラ・ワ・ライラ）'
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
    rubyLabel: '発音記号（IPA / 転写）',
    rubyDesc: 'ペルシア文字の上の発音表記',
    subLineLabel: 'ラテン文字転写 / 発音行',
    subLineDesc: '行ごとのラテン文字転写表記',
    voiceHint: '※ペルシア語（fa-IR）の音声が最優先で選ばれます',
    tts: {
      lang: 'fa-IR',
      prefer: ['fa-ir', 'fa', 'persian', 'farsi', 'فارسی', 'ペルシア', 'ペルシャ'],
      accept: [],
      reject: [],
      foreignLatin: 'en-US'
    },
    sample: {
      text: 'بنی آدم اعضای یکدیگرند',
      ruby: 'bæˈniː ɒːˈdæm æʔˈzɒːje jekdiːˈɡæɾænd',
      note: 'アダムの子ら（人間）は互いに一つの体の器官である（サアディー『果樹園』）'
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
      text: 'ช้าง ช้าง ช้าง',
      ruby: 'cháːŋ cháːŋ cháːŋ',
      note: '象さん、象さん、象さん'
    }
  }
};

// ============================================================================
// 3. AI変換プロンプトテンプレート（全14言語カタログ対応）
// ============================================================================
const PROMPT_TEMPLATES = {
  'zh-TW': {
    targetDesc: '台湾華語（繁体字・注音符号）',
    rules: [
      'すべて台湾で使われる「繁体字」と、台湾教育部『國語辭典』準拠の標準発音（注音符号・ボポモフォ）で表記してください（「一」「不」や第3声の連続による声調変化は変化後の発音で表記）。',
      '先頭に必ず `【言語】zh-TW` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：意味のまとまり（単語）ごとに半角スペースで区切り、「単語(注音)」の形式で並べる。2文字以上の単語はカッコ内の注音も1文字分ずつ半角スペースで区切り、必ず「漢字の文字数＝注音の音節数」を一致させること（例：`好(ㄏㄠˇ) 一朵(ㄧˋ ㄉㄨㄛˇ) 美麗(ㄇㄟˇ ㄌㄧˋ) 的(ㄉㄜ˙) 茉莉花(ㄇㄛˋ ㄌㄧˋ ㄏㄨㄚ)`）。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないこと。\n   ・2行目：声調記号付きのピンイン\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 単語 (注音 / pinyin)：意味（品詞）と解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】zh-TW
【タイトル】茉莉花
【出典】傳統民歌

好(ㄏㄠˇ) 一朵(ㄧˋ ㄉㄨㄛˇ) 美麗(ㄇㄟˇ ㄌㄧˋ) 的(ㄉㄜ˙) 茉莉花(ㄇㄛˋ ㄌㄧˋ ㄏㄨㄚ)
hǎo yì duǒ měi lì de mò lì huā
なんと美しいジャスミンの花。

【単語・文法解説】
- 好 (ㄏㄠˇ / hǎo)：なんと～、実に～（感嘆を表す副詞）。
- 一朵 (ㄧˋ ㄉㄨㄛˇ / yì duǒ)：一輪（数量詞）。
- 美麗 (ㄇㄟˇ ㄌㄧˋ / měi lì)：美しい（形容詞）。
- 的 (ㄉㄜ˙ / de)：～な（構造助詞）。
- 茉莉花 (ㄇㄛˋ ㄌㄧˋ ㄏㄨㄚ / mò lì huā)：ジャスミンの花（名詞）。`
  },
  'zh-CN': {
    targetDesc: '中国語（簡体字・ピンイン）',
    rules: [
      'すべて「簡体字」と「声調記号付きのピンイン」で表記してください（「一」「不」の声調変化は変化後の発音で表記）。',
      '先頭に必ず `【言語】zh-CN` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：意味のまとまり（単語）ごとに半角スペースで区切り、「単語(pinyin)」の形式で並べる。2文字以上の単語はカッコ内のピンインも1文字分ずつ半角スペースで区切り、必ず「漢字の文字数＝ピンインの音節数」を一致させること（例：`好(hǎo) 一朵(yì duǒ) 美丽(měi lì) 的(de) 茉莉花(mò lì huā)`）。儿化音（`花儿(huār)` など）のみ例外として1音節にまとめても構いません。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないこと。\n   ・2行目：行全体のピンイン\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 単語 (pinyin)：意味（品詞）と解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】zh-CN
【タイトル】茉莉花
【出典】传统民歌

好(hǎo) 一朵(yì duǒ) 美丽(měi lì) 的(de) 茉莉花(mò lì huā)
hǎo yì duǒ měi lì de mò lì huā
なんと美しいジャスミンの花。

【単語・文法解説】
- 好 (hǎo)：なんと～、実に～（感嘆を表す副詞）。
- 一朵 (yì duǒ)：一輪（数量詞）。
- 美丽 (měi lì)：美しい（形容詞）。
- 的 (de)：～な（構造助詞）。
- 茉莉花 (mò lì huā)：ジャスミンの花（名詞）。`
  },
  'yue-HK': {
    targetDesc: '広東語（繁体字・粤拼 Jyutping）',
    rules: [
      '香港・広東語圏で使われる「繁体字（広東語固有字を含む）」と「粤拼（Jyutping、声調番号1〜6付き）」で表記してください。',
      '先頭に必ず `【言語】yue-HK` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに半角スペースで区切り、「単語(jyutping)」の形式で並べる。2文字以上の単語はカッコ内の粤拼も1文字分ずつ半角スペースで区切り、必ず「漢字の文字数＝粤拼の音節数」を一致させること（例：`多謝(do1 ze6) 你(nei5)`）。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないこと。\n   ・2行目：行全体の粤拼（Jyutping）\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 単語 (jyutping)：意味（品詞）と広東語特有の表現解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】yue-HK
【タイトル】靜夜思
【出典】李白（唐詩）

床前(cong4 cin4) 明月光(ming4 jyut6 gwong1)，疑是(ji4 si6) 地上(dei6 soeng6) 霜(soeng1)
cong4 cin4 ming4 jyut6 gwong1, ji4 si6 dei6 soeng6 soeng1
寝台の前に差す明るい月の光、地上に降りた霜かと疑うほどだ。

【単語・文法解説】
- 床前 (cong4 cin4)：寝台の前、ベッドのそば（名詞句）。
- 明月光 (ming4 jyut6 gwong1)：明るい月の光（名詞句）。
- 疑是 (ji4 si6)：〜ではないかと疑う、まるで〜のようだ（動詞句）。
- 地上 (dei6 soeng6)：地上、地面の上（名詞）。
- 霜 (soeng1)：霜（名詞）。`
  },
  'nan-TW': {
    targetDesc: '台湾語（台語漢字・台羅 Tâi-lô）',
    rules: [
      '台湾教育部推奨の「台語漢字」と「台湾閩南語羅馬字拼音方案（台羅 Tâi-lô、声調記号付き）」で表記してください。',
      '先頭に必ず `【言語】nan-TW` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに半角スペースで区切り、「単語(台羅)」の形式で並べる。2文字以上の単語はカッコ内の台羅をハイフン `-` または半角スペースで区切り、必ず「漢字の文字数＝台羅の音節数」を一致させること（例：`孤夜(koo-iā) 無伴(bô-phuānn) 守燈下(siú-ting-hē)`）。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないこと。\n   ・2行目：行全体の台羅（Tâi-lô）\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- 単語 (台羅)：意味（品詞）と解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】nan-TW
【タイトル】望春風
【出典】台灣傳統歌謠

獨夜(to̍k-iā) 無伴(bô-phuānn) 守燈下(siú-ting-hē) 春風(tshun-hong) 對面吹(tuì-bīn-tshue)
to̍k-iā bô-phuānn siú-ting-hē tshun-hong tuì-bīn-tshue
ひとり夜の伴もなく灯りの下に座っていると、春風が向かいから吹いてくる。

【単語・文法解説】
- 獨夜 (to̍k-iā)：ひとりの夜（名詞）。
- 無伴 (bô-phuānn)：連れ合いがいない、伴がない（動詞句）。
- 守燈下 (siú-ting-hē)：灯りのそばを守る、灯りの下で過ごす（動詞句）。
- 春風 (tshun-hong)：春風（名詞）。
- 對面吹 (tuì-bīn-tshue)：正面から吹く（動詞句）。`
  },
  'ko-KR': {
    targetDesc: '韓国語（ハングル・実際の発音ハングル）',
    rules: [
      '1行目の本文は、韓国語の分かち書き（語節・スペース）ごとに「表記ハングル(実際の発音ハングル)」の形式で半角スペース区切りで並べてください（例：`꽃이(꼬치) 피는(피는)`）。必ず「カッコ前のハングルの文字数」と「カッコ内の発音ハングルの文字数」を一致させてください（長音記号「ー」やスラッシュ `/` 等は入れないこと）。',
      'カッコ内の「発音ハングル」には、連音化・鼻音化・激音化・濃音化・流音化・口蓋音化・ㅎ弱化（脱落）・ㄴ挿入などの音韻変化をすべて反映した「実際に発音される通りのハングル」を記述してください（英単語や記号はカッコを付けずそのまま残す）。',
      '先頭に必ず `【言語】ko-KR` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：語節ごとに「表記ハングル(発音ハングル)」を半角スペース区切りで並べた行\n   ・2行目：改訂ローマ字表記（Revised Romanization）による発音補助行\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語・連語を「- 本文中の語形 (発音ハングル / ローマ字)：【原形：〇〇다】意味（品詞）と文法・発音変化の解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】ko-KR
【タイトル】天気の良い日の会話
【出典】韓国語日常会話

오늘은(오느른) 날씨가(날씨가) 정말(정말) 좋아서(조아서) 같이(가치) 걷고(걷꼬) 싶네요(심네요)
oneureun nalssiga jeongmal joaseo gachi geotgo simneyo
今日は天気が本当に良いので、一緒に歩きたいですね。

【単語・文法解説】
- 오늘은 (오느른 / oneureun)：【原形：오늘（今日）＋ 은（〜は）】今日は（名詞＋補助詞）。パッチム「ㄹ」が後ろの母音「은」と連音化して「오느른」と発音される。
- 날씨가 (날씨가 / nalssiga)：【原形：날씨（天気）＋ 가（〜が）】天気が（名詞＋主格助詞）。
- 정말 (정말 / jeongmal)：本当に、実に（副詞）。
- 좋아서 (조아서 / joaseo)：【原形：좋다（良い）＋ -아서（〜なので）】良くて、良いので。語幹末のパッチム「ㅎ」が母音の前で弱化（脱落）し「조아서」と発音される。
- 같이 (가치 / gachi)：一緒に、共に（副詞）。パッチム「ㅌ」が母音「이」と出会い口蓋音化して「가치」と発音される。
- 걷고 싶네요 (걷꼬 심네요 / geotgo simneyo)：【原形：걷다（歩く）＋ -고 싶다（〜したい）＋ -네요（〜ですね）】歩きたいですね（連語）。「걷고」はパッチム「ㄷ」の後ろで濃音化し「걷꼬」、「싶네요」はパッチム「ㅍ[ㅂ]」が「ㄴ」の前で鼻音化し「심네요」と発音される。`
  },
  'ja-JP': {
    targetDesc: '日本語（漢字かな交じり・ひらがなルビ）',
    rules: [
      '1行目の本文は、文節または単語ごとに半角スペースで区切り、「単語(ひらがな読み)」の形式で並べてください（例：`春(はる) の(の) 朝(あさ)`）。カッコ内はすべて「ひらがな」で表記し、スラッシュ `/` や入れ子のカッコ `()` は入れないでください。',
      '先頭に必ず `【言語】ja-JP` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「表記(ひらがな)」を半角スペース区切りで並べた行\n   ・2行目：行全体のローマ字表記（ヘボン式）\n   ・3行目：現代語訳・英語訳・または文章のニュアンス解説\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する語彙・表現を「- 本文中の語形 (ひらがな / romaji)：【原形：〇〇】意味（品詞）と文法解説」の箇条書きで列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】ja-JP
【タイトル】さくらさくら
【出典】日本古謡

さくら(さくら) さくら(さくら) 弥生(やよい) の(の) 空(そら) は(は) 見渡す(みわたす) 限り(かぎり)
sakura sakura yayoi no sora wa miwatasu kagiri
桜よ、桜よ、三月（弥生）の空は見渡すかぎり一面に咲いている。

【単語・文法解説】
- さくら (さくら / sakura)：桜の花（名詞）。
- 弥生 (やよい / yayoi)：陰暦3月の異称、春（名詞）。
- 空 (そら / sora)：空（名詞）。
- 見渡す限り (みわたすかぎり / miwatasu kagiri)：【原形：見渡す（他動詞）】見渡せる範囲のすべて（慣用表現）。`
  },
  'en-US': {
    targetDesc: '英語（英単語・IPA国際音声記号）',
    rules: [
      '1行目の本文は、スペース区切りの1単語ごとに「英単語(IPA発音記号)」の形式で並べてください（例：`Time(taɪm) flies(flaɪz) like(laɪk) an(ən) arrow(ˈæroʊ)`）。句読点（`,` `.` `?` `!`）はカッコの外（単語の直後）に置いてください。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】en-US` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「単語(IPA)」を半角スペース区切りで並べた行\n   ・2行目：カタカナ発音ガイドまたはリンキング（リエゾン）付きの補助発音表記\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語や熟語（イディオム）を「- 本文中の語形 (IPA)：【原形：〇〇】意味（品詞）と文法・発音解説」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】en-US
【タイトル】Twinkle, Twinkle, Little Star
【出典】Traditional (英語伝統童謡)

Twinkle(ˈtwɪŋkəl), twinkle(ˈtwɪŋkəl), little(ˈlɪtəl) star(stɑːr), how(haʊ) I(aɪ) wonder(ˈwʌndər) what(wʌt) you(juː) are(ɑːr)
twɪŋkəl twɪŋkəl lɪtəl stɑːr haʊ aɪ wʌndər wʌt juː ɑːr
きらきら光る小さな星よ、あなたは一体何なのだろう。

【単語・文法解説】
- twinkle (ˈtwɪŋkəl)：きらきら光る、瞬く（自動詞）。
- little (ˈlɪtəl)：小さな、かわいらしい（形容詞）。アメリカ英語では t がフラップ化して「リル」に近い音になる。
- star (stɑːr)：星（名詞）。
- how I wonder (haʊ aɪ ˈwʌndər)：【原形：wonder（不思議に思う）】なんと不思議に思うことか（感嘆節）。`
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
【タイトル】Heidenröslein
【出典】Johann Wolfgang von Goethe

Sah(zaː) ein(aɪn) Knab(knaːp) ein(aɪn) Röslein(ˈrøːslaɪn) stehn(ʃteːn), Röslein(ˈrøːslaɪn) auf(aʊf) der(deːɐ̯) Heiden(ˈhaɪdən)
zaː aɪn knaːp aɪn ˈrøːslaɪn ʃteːn ˈrøːslaɪn aʊf deːɐ̯ ˈhaɪdən
ひとりの少年が小さなバラが咲いているのを見た、野原に咲く小さなバラを。

【単語・文法解説】
- Sah (zaː)：【原形：sehen（見る）】見た（3人称単数過去形）。
- Knab (knaːp)：【原形：der Knabe（少年）】少年（男性名詞・1格単数、語末の -e が省略された詩的語形）。
- Röslein (ˈrøːslaɪn)：【原形：das Röslein（小さなバラ）】小さなバラ（中性名詞・4格、Rose に縮小辞 -lein が付いた形）。
- stehn (ʃteːn)：【原形：stehen（立っている・咲いている）】立っていること（不定詞、知覚動詞 sehen と共に用いられる）。
- auf der Heiden (aʊf deːɐ̯ ˈhaɪdən)：【原形：die Heide（荒野・野原）】野原の上に（前置詞 auf ＋ 女性3格単数、古い弱変化語尾 -n を伴う詩的表現）。`
  },
  'fr-FR': {
    targetDesc: 'フランス語（単語・IPA国際音声記号）',
    rules: [
      '1行目の本文は、スペース区切りの1語ごとに「フランス語表記(IPA発音記号)」の形式で並べてください（エリズィオンで繋がる `c\'est(sɛ)` や `l\'eau(lo)` 等は1塊として扱って構いません）。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】fr-FR` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに「単語(IPA)」を半角スペース区切りで並べた行\n   ・2行目：アンシェヌマン・リエゾンを反映した行全体の発音ガイド\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する語彙を「- 本文中の語形 (IPA)：【原形：〇〇】意味（品詞・名詞の性・動詞の活用・リエゾン解説）」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】fr-FR
【タイトル】Frère Jacques (フレール・ジャック)
【出典】Chanson traditionnelle française (フランス伝統童謡)

Frère(fʁɛʁ) Jacques(ʒak), dormez-vous(dɔʁ.me.vu) ? Sonnez(sɔ.ne) les(le) matines(ma.tin) !
fʁɛʁ ʒak dɔʁ.me.vu sɔ.ne le ma.tin
ジャック修道士さん、眠っているのですか？ 朝の鐘を鳴らしてください！

【単語・文法解説】
- Frère (fʁɛʁ)：修道士、兄弟（男性名詞）。
- dormez-vous (dɔʁ.me.vu)：【原形：dormir（眠る）】眠っていますか（直接法現在・2人称複数の倒置疑問形）。
- Sonnez (sɔ.ne)：【原形：sonner（鳴らす）】鳴らしなさい（2人称複数の命令形）。
- les matines (le ma.tin)：朝の祈りの鐘（定冠詞複数 les ＋ 女性複数名詞 matines）。`
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
【タイトル】Cielito Lindo
【出典】Tradicional Mexicana (メキシコ伝統民謡)

Ay(aj), ay(aj), ay(aj), ay(aj), canta(ˈkanta) y(i) no(no) llores(ˈʎoɾes)
aj aj aj aj ˈkanta i no ˈʎoɾes
アイ、アイ、アイ、アイ、歌って、泣かないで。

【単語・文法解説】
- Ay (aj)：ああ、アイ（感嘆詞）。
- canta (ˈkanta)：【原形：cantar（歌う）】歌いなさい（tú に対する肯定命令形）。
- y (i)：そして、〜し（接続詞）。
- no llores (no ˈʎoɾes)：【原形：llorar（泣く）】泣かないで（no ＋ 接続法現在2人称単数による否定命令形）。`
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
【タイトル】Во поле берёза стояла (野に白樺が立っていた)
【出典】Русская народная песня (ロシア伝統民謡)

Во(vɐ) поле(ˈpolʲɪ) берёза(bʲɪˈrʲɵzə) стояла(stɐˈjalə)
va poli beryoza stoyala
野原に白樺の木が立っていた。

【単語・文法解説】
- Во поле (vɐ ˈpolʲɪ / va poli)：【原形：в（〜の中に）＋ поле（野原・中性名詞）】野原に（前置詞 в の詩的・母音付き形 во ＋ 単数前置格）。
- берёза (bʲɪˈrʲɵzə / beryoza)：白樺（女性名詞・単数主格）。
- стояла (stɐˈjalə / stoyala)：【原形：стоять（立っている・不完了体）】立っていた（過去形・女性単数、無アクセントの о はアカニエにより [ɐ] と発音される）。`
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
【タイトル】朝の挨拶と日常会話
【出典】アラビア語基本表現

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
【タイトル】بنی آدم (アダムの子ら)
【出典】سعدی شیرازی (サアディー『ゴレスターン／薔薇園』)

بنی(bæˈniː) آدم(ɒːˈdæm) اعضای(æʔˈzɒː-je) یکدیگرند(jekdiːˈɡæɾ-ænd)
bani adam a'za-ye yekdigar-and
アダムの子ら（人間）は、互いに一つの体の器官である。

【単語・文法解説】
- بنی آدم (bæˈniː ɒːˈdæm)：アダムの子孫、人類、人間（古典詩文における連語表現）。
- اعضای (æʔˈzɒː-je)：【原形：اعضا（عضو「器官・四肢」の複数形）】〜の器官（名詞＋エザーフェ -ye）。
- یکدیگرند (jekdiːˈɡæɾ-ænd)：【原形：یکدیگر（お互い）＋ ـند（〜である・3人称複数繋辞）】お互いのものである（代名詞＋動詞語尾）。`
  },
  'th-TH': {
    targetDesc: 'タイ語（タイ文字・声調記号付き発音ローマ字 Paiboon/IPA）',
    rules: [
      'タイ語は通常スペースを空けずに書きますが、このアプリでは**必ず単語ごとに半角スペースで分かち書き**し、「タイ文字単語(声調付き発音ローマ字)」の形式で並べてください（例：`สวัสดี(sà-wàt-dii) ครับ(khráp) ยินดี(yin-dii) ที่(thîi) ได้(dâai) รู้จัก(rúu-jàk)`）。上下の母音・声調記号が崩れないよう、1文字ずつではなく必ず「1単語ごと」にカッコを付けてください。カッコ内にスラッシュ `/` や入れ子のカッコ `()` は絶対に入れないでください。',
      '先頭に必ず `【言語】th-TH` と記載し、続けて `【タイトル】` `【出典】`（分かれば `【URL】` も）を記載してください。',
      'テキストの1行（または1文）ごとに、以下の4要素のブロックを繰り返してください：\n   ・1行目：単語ごとに半角スペースで区切り、「タイ文字単語(発音ローマ字)」を並べた行\n   ・2行目：行全体の声調記号付き発音ローマ字\n   ・3行目：自然な日本語訳\n   ・4行目以降：`【単語・文法解説】` の見出しの下に、その行に登場する単語を「- タイ文字単語 (発音ローマ字)：意味（品詞・声調や文法の解説）」の箇条書きで漏れなく列挙する。',
      'ワンタップでコピーしやすいように、出力全体を一つのコードブロック（```text ～ ```）の中に書いてください。前後の挨拶や説明文は不要です。'
    ],
    sample: `【言語】th-TH
【タイトル】ลอยกระทง (Loy Krathong)
【出典】เพลงประเพณีไทย (タイ伝統歌謡)

วันเพ็ญ(wan-phen) เดือน(dʉan) สิบสอง(sìp-sɔ̌ɔng) น้ำ(náam) ก็นอง(kɔ̂ɔ-nɔɔng) เต็ม(tem) ตลิ่ง(tà-lìng)
wan-phen dʉan sìp-sɔ̌ɔng náam kɔ̂ɔ-nɔɔng tem tà-lìng
陰暦12月の満月の日、水は岸辺いっぱいに満ちあふれている。

【単語・文法解説】
- วันเพ็ญ (wan-phen)：満月の日（名詞：วัน「日」＋ เพ็ญ「満ちる」）。
- เดือนสิบสอง (dʉan sìp-sɔ̌ɔng)：12月（名詞：タイ太陰暦の12月、現在の11月頃）。
- น้ำ (náam)：水、川の水（名詞）。
- ก็นอง (kɔ̂ɔ-nɔɔng)：【原形：ก็（〜もまた）＋ นอง（あふれる）】あふれ返っている（助詞＋動詞）。
- เต็ม (tem)：いっぱいに満ちる（形容詞・動詞）。
- ตลิ่ง (tà-lìng)：川岸、岸辺（名詞）。`
  }
};

// AIプロンプト全体の組み立て関数
function buildPromptText(langMode, userLyrics = '') {
  const trimmed = String(userLyrics || '').trim();
  const targetSection = trimmed
    ? `\n【変換したいテキスト・出典情報】\n${trimmed}\n`
    : `\n【変換したいテキスト・出典情報】\n（ここに変換したい文章を貼り付けてください）\n`;

  const tpl = PROMPT_TEMPLATES[langMode] || PROMPT_TEMPLATES['zh-TW'];
  const rulesList = tpl.rules.map((r, i) => `${i + 1}. ${r}`).join('\n');
  return `以下の${tpl.targetDesc}のテキストを、私の学習アプリ用のフォーマットに変換してください。

【厳守してほしい出力ルール】
${rulesList}

【出力フォーマット見本】
${tpl.sample}
${targetSection}`;
}

// ============================================================================
// 4. 画面メッセージ・UI文言定数（UI_TEXT）
// ============================================================================
const UI_TEXT = {
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
  sharePromptFailedSub: '「コピーのみ」をご利用ください'
};
