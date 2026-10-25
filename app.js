// ============================================================================
// Ruby Text Player - アプリケーション本体ロジック (app.js)
// ----------------------------------------------------------------------------
// ※ 定数・サンプル・言語カタログ・プロンプト・UI文言は content-data.js に集約
// ============================================================================

// ============================================================================
// 1. ストレージキー＆言語ヘルパー
// ============================================================================
const STORAGE_KEY_LIBRARY = 'ruby_text_player_library_v1';
const STORAGE_KEY_ACTIVE_ID = 'ruby_text_player_active_id_v1';
const STORAGE_KEY_SETTINGS = 'ruby_text_player_settings_v1';
const STORAGE_KEY_DELETED_IDS = 'ruby_text_player_deleted_ids_v1';

function getLangConfig(langId) {
  const base = (langId && LANG_CATALOG[langId]) ? LANG_CATALOG[langId] : LANG_CATALOG['zh-TW'];
  if (typeof state !== 'undefined' && state.uiLang === 'en' && base.en) {
    return {
      ...base,
      ...base.en,
      sample: base.sample ? {
        ...base.sample,
        note: base.sample.noteEn || base.sample.note
      } : base.sample
    };
  }
  return base;
}

function getEffectiveTapMode() {
  const cfg = getLangConfig(state.currentSongLang);
  if (Array.isArray(cfg.tapModes) && !cfg.tapModes.includes(state.tapMode)) {
    return cfg.tapModes[0] || 'word';
  }
  return state.tapMode;
}

function resolveLang(rawTag) {
  if (!rawTag) return '';
  const norm = String(rawTag).trim().replace(/_/g, '-').toLowerCase();
  if (!norm) return '';
  for (const [id, cfg] of Object.entries(LANG_CATALOG)) {
    if (id.toLowerCase() === norm || (cfg.bcp47 && cfg.bcp47.toLowerCase() === norm)) {
      return id;
    }
    if (Array.isArray(cfg.aliases) && cfg.aliases.some(a => String(a).toLowerCase() === norm)) {
      return id;
    }
  }
  return '';
}

const graphemeSegmenter = (typeof Intl !== 'undefined' && Intl.Segmenter)
  ? new Intl.Segmenter('ja', { granularity: 'grapheme' })
  : null;

function splitGraphemes(str) {
  if (!str) return [];
  if (graphemeSegmenter) {
    return Array.from(graphemeSegmenter.segment(str), s => s.segment);
  }
  return Array.from(str);
}

// ============================================================================
// 2. 状態管理
// ============================================================================
const state = {
  songs: [],
  deletedIds: new Set(),
  currentSongId: '',
  editingSongId: null,
  pendingDeleteSongId: null,
  pendingConflict: null,

  // 永続化される設定
  uiLang: (typeof navigator !== 'undefined' && /^ja\b/i.test(navigator.language || '')) ? 'ja' : 'en', // 'ja' | 'en'
  theme: 'auto',         // 'auto' | 'light' | 'dark'
  fontSize: 'm',         // 's' | 'm' | 'l'
  showZhuyin: true,
  showPinyin: false,
  showTrans: true,
  tapMode: 'word',       // 'word' | 'char'
  speechRate: 1.0,
  selectedVoiceURI: '',
  selectedVoiceByLang: { 'zh-TW': '', 'zh-CN': '', 'ko-KR': '' },
  hintDismissed: false,

  // 一時状態
  isSelectMode: false,
  selectedSongIds: new Set(),
  promptLangMode: 'zh-TW',
  currentSongLang: 'ko-KR',
  allNotesExpanded: false,
  isPlayingAll: false,
  activeLineIdx: 0,
  speakingLineIdx: -1,
  lyricsData: []
};

// ============================================================================
// 3. 設定の読み書き・UI言語・テーマ反映
// ============================================================================
function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) {
      const s = JSON.parse(raw);
      if (s.uiLang === 'ja' || s.uiLang === 'en') state.uiLang = s.uiLang;
      if (s.theme) state.theme = s.theme;
      if (s.fontSize) state.fontSize = s.fontSize;
      if (typeof s.showZhuyin === 'boolean') state.showZhuyin = s.showZhuyin;
      if (typeof s.showPinyin === 'boolean') state.showPinyin = s.showPinyin;
      if (typeof s.showTrans === 'boolean') state.showTrans = s.showTrans;
      if (s.tapMode === 'word' || s.tapMode === 'char') state.tapMode = s.tapMode;
      if (typeof s.speechRate === 'number') state.speechRate = s.speechRate;
      if (typeof s.selectedVoiceURI === 'string') state.selectedVoiceURI = s.selectedVoiceURI;
      if (s.selectedVoiceByLang && typeof s.selectedVoiceByLang === 'object') {
        const nextVoiceMap = { 'zh-TW': '', 'zh-CN': '', 'ko-KR': '' };
        for (const [k, v] of Object.entries(s.selectedVoiceByLang)) {
          if (typeof v === 'string') nextVoiceMap[k] = v;
        }
        state.selectedVoiceByLang = nextVoiceMap;
      }
      if (state.selectedVoiceURI && !state.selectedVoiceByLang['zh-TW']) {
        state.selectedVoiceByLang['zh-TW'] = state.selectedVoiceURI;
      }
      if (typeof s.hintDismissed === 'boolean') state.hintDismissed = s.hintDismissed;
    }
  } catch (e) {}

  try {
    const del = JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_IDS) || '[]');
    if (Array.isArray(del)) state.deletedIds = new Set(del);
  } catch (e) {}

  applyUiLanguage(false);
  applyTheme();
  applyFontSize();
  syncControlsUI();
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify({
      uiLang: state.uiLang,
      theme: state.theme,
      fontSize: state.fontSize,
      showZhuyin: state.showZhuyin,
      showPinyin: state.showPinyin,
      showTrans: state.showTrans,
      tapMode: state.tapMode,
      speechRate: state.speechRate,
      selectedVoiceURI: state.selectedVoiceURI,
      selectedVoiceByLang: state.selectedVoiceByLang,
      hintDismissed: state.hintDismissed
    }));
  } catch (e) {}
}

function applyUiLanguage(refreshViews = true) {
  const lang = state.uiLang === 'en' ? 'en' : 'ja';
  if (typeof UI_TEXT_I18N !== 'undefined' && UI_TEXT_I18N[lang]) {
    UI_TEXT = UI_TEXT_I18N[lang];
  }
  if (typeof document === 'undefined') return;

  document.documentElement.lang = lang;

  const htmlDict = (typeof HTML_I18N !== 'undefined' && HTML_I18N[lang]) ? HTML_I18N[lang] : null;
  if (htmlDict) {
    if (htmlDict.pageTitle) document.title = htmlDict.pageTitle;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if (k && htmlDict[k] !== undefined) el.textContent = htmlDict[k];
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const k = el.dataset.i18nTitle;
      if (k && htmlDict[k] !== undefined) el.setAttribute('title', htmlDict[k]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const k = el.dataset.i18nAria;
      if (k && htmlDict[k] !== undefined) el.setAttribute('aria-label', htmlDict[k]);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const k = el.dataset.i18nPlaceholder;
      if (k && htmlDict[k] !== undefined) el.setAttribute('placeholder', htmlDict[k]);
    });
  }

  // 初期サンプル（未編集のまま残っている場合）もUI言語に合わせて日本語版・英語版を自動切替
  if (Array.isArray(state.songs) && state.songs.length > 0 && typeof getDefaultSampleByUiLang === 'function') {
    const defIdx = state.songs.findIndex(s => s && s.id === 'text_default_sample');
    if (defIdx !== -1) {
      const norm = (str) => String(str || '').replace(/\r\n/g, '\n').trim();
      const curRaw = norm(state.songs[defIdx].rawText);
      if (curRaw === norm(DEFAULT_RAW_TEXT) || curRaw === norm(DEFAULT_RAW_TEXT_EN)) {
        const nextDef = getDefaultSampleByUiLang(lang);
        state.songs[defIdx] = {
          ...state.songs[defIdx],
          title: nextDef.title,
          artist: nextDef.artist,
          rawText: nextDef.rawText
        };
        songSummaryCache.delete('text_default_sample');
        saveLibraryToStorage();
      }
    }
  }

  syncControlsUI();

  if (refreshViews) {
    if (state.songs.length > 0) loadCurrentSong();
    if (activeSheetId === 'songsSheet') renderLibraryList();
    if (activeSheetId === 'promptSheet') updateGeneratedPrompt();
    if (activeSheetId === 'editorSheet') updateEditorLiveStatus(false);
    updatePlayAllButton();
  }
}

function applyTheme() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = state.theme === 'dark' || (state.theme === 'auto' && prefersDark);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

function applyFontSize() {
  if (state.fontSize === 's' || state.fontSize === 'l') {
    document.documentElement.setAttribute('data-font', state.fontSize);
  } else {
    document.documentElement.removeAttribute('data-font');
  }
}

function syncControlsUI() {
  document.querySelectorAll('[data-action="set-ui-lang"]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.value === state.uiLang));
  });
  const quickLangBtn = document.getElementById('btnQuickUiLang');
  if (quickLangBtn) {
    quickLangBtn.textContent = state.uiLang === 'en' ? 'EN' : 'JA';
  }
  document.querySelectorAll('[data-action="set-theme"]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.value === state.theme));
  });
  document.querySelectorAll('[data-action="set-font"]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.value === state.fontSize));
  });
  const effectiveTap = getEffectiveTapMode();
  const langCfg = getLangConfig(state.currentSongLang);
  const allowCharTap = !Array.isArray(langCfg.tapModes) || langCfg.tapModes.includes('char');
  document.querySelectorAll('[data-action="set-tap"]').forEach(btn => {
    if (btn.dataset.value === 'char') {
      btn.disabled = !allowCharTap;
      btn.title = allowCharTap ? '' : UI_TEXT.charTapDisabledHint;
    }
    btn.setAttribute('aria-pressed', String(btn.dataset.value === effectiveTap));
  });

  document.getElementById('swZhuyin').setAttribute('aria-checked', String(state.showZhuyin));
  document.getElementById('swPinyin').setAttribute('aria-checked', String(state.showPinyin));
  document.getElementById('swTrans').setAttribute('aria-checked', String(state.showTrans));
  document.getElementById('btnSpeed').textContent = `${state.speechRate.toFixed(1)}x`;
  document.getElementById('firstHint').hidden = state.hintDismissed;
}

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.theme === 'auto') applyTheme();
  });
}

// ============================================================================
// 4. ライブラリ初期化＆マージ（タイトル＋出典の正規化キーによる重複排除対応）
// ============================================================================
function normalizeMetaStr(str) {
  return String(str || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s\u3000\-_〜~・,，.。!！?？'’"“”()（）【】\[\]「」『』/／]+/g, '')
    .trim();
}

function detectLangQuick(rawText = '') {
  const lm = String(rawText || '').match(/^【(?:言語|Language|Lang)】\s*(.+)$/im);
  if (lm) {
    const resolved = resolveLang(lm[1]);
    if (resolved) return resolved;
  }
  if (/[^\s(（]+\s*[(（][^)\）]*[\u3105-\u3129]+[^)\）]*[)）]/.test(rawText)) return 'zh-TW';
  if (/[\uAC00-\uD7A3]+\s*[(（][^)）]*[\uAC00-\uD7A3\u3131-\u318E]+[^)）]*[)）]/.test(rawText)) return 'ko-KR';
  if (/[\p{Script=Han}\u3040-\u30ff]+\s*[(（][\u3040-\u309F\u30A0-\u30FFー\s・]+[)）]/u.test(rawText)) return 'ja-JP';
  return 'zh-CN';
}

function getSongIdentityKey(title, artist, rawText = '', lang = '') {
  let t = String(title || '').trim();
  let a = String(artist || '').trim();
  if (!t && rawText) {
    const tm = String(rawText).match(/^【(?:タイトル|曲名|Title)】\s*(.+)$/im);
    if (tm) t = tm[1].trim();
  }
  if (!a && rawText) {
    const am = String(rawText).match(/^【(?:出典|著者|作者|歌手|アーティスト|Artist|Author|Source)】\s*(.+)$/im);
    if (am) a = am[1].trim();
  }
  const effLang = lang || (rawText ? detectLangQuick(rawText) : '');
  const normTitle = normalizeMetaStr(t);
  const normArtist = normalizeMetaStr(a);
  if (normTitle) {
    return `meta:${effLang}__${normTitle}__${normArtist}`;
  }
  const normRaw = normalizeMetaStr(String(rawText || '').slice(0, 120));
  return `raw:${effLang}__${normRaw}`;
}

function generateDeterministicSongId(title, artist, rawText = '') {
  const key = getSongIdentityKey(title, artist, rawText);
  let h1 = 0xdeadbeef ^ key.length;
  let h2 = 0x41c6ce57 ^ key.length;
  for (let i = 0; i < key.length; i++) {
    const ch = key.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex = (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  return `song_${hex}`;
}

function initLibrary() {
  let localSongs = [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LIBRARY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) localSongs = parsed;
    }
  } catch (e) {}

  const legacyDefaultIds = new Set(['song_default_1', 'song_default_easyweeds_spring', 'song_default_molihua', 'song_default_arirang']);
  const isLegacyDefaultSong = (s) => {
    if (!s || !s.id) return true;
    if (legacyDefaultIds.has(s.id)) return true;
    const t = String(s.title || '').trim();
    const a = String(s.artist || '').trim();
    if (t === '아리랑 (Arirang)' && a.includes('韓国伝統民謡')) return true;
    return false;
  };
  localSongs = localSongs.filter(s => !isLegacyDefaultSong(s));

  const dedupedList = [];
  const findExistingIdx = (song) => {
    const key = getSongIdentityKey(song.title, song.artist, song.rawText);
    return dedupedList.findIndex(item =>
      item.id === song.id ||
      getSongIdentityKey(item.title, item.artist, item.rawText) === key
    );
  };

  localSongs.forEach(s => {
    const idx = findExistingIdx(s);
    if (idx === -1) {
      dedupedList.push(s);
    } else if ((s.updatedAt || 0) >= (dedupedList[idx].updatedAt || 0)) {
      dedupedList[idx] = { ...s, id: dedupedList[idx].id };
    }
  });

  const embeddedList = (typeof getDefaultSampleByUiLang === 'function')
    ? [getDefaultSampleByUiLang(state.uiLang)]
    : (Array.isArray(EMBEDDED_SONGS) ? EMBEDDED_SONGS : []);

  let newlyAddedId = null;
  if (Array.isArray(embeddedList)) {
    embeddedList.forEach(emb => {
      if (!emb || !emb.id) return;
      const embKey = getSongIdentityKey(emb.title, emb.artist, emb.rawText);
      if (state.deletedIds.has(emb.id) || state.deletedIds.has(embKey)) return;
      const idx = findExistingIdx(emb);
      if (idx === -1) {
        dedupedList.push(emb);
        if (!newlyAddedId) newlyAddedId = emb.id;
      } else if ((emb.updatedAt || 0) > (dedupedList[idx].updatedAt || 0)) {
        dedupedList[idx] = { ...emb, id: dedupedList[idx].id };
      }
    });
  }

  state.songs = dedupedList.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  if (state.songs.length === 0 && embeddedList.length > 0) {
    state.songs = [{ ...embeddedList[0] }];
  }

  // 初期サンプルが未編集で残っている場合は現在のUI言語に合わせて同期
  if (typeof getDefaultSampleByUiLang === 'function') {
    const defIdx = state.songs.findIndex(s => s && s.id === 'text_default_sample');
    if (defIdx !== -1) {
      const norm = (str) => String(str || '').replace(/\r\n/g, '\n').trim();
      const curRaw = norm(state.songs[defIdx].rawText);
      if (curRaw === norm(DEFAULT_RAW_TEXT) || curRaw === norm(DEFAULT_RAW_TEXT_EN)) {
        const nextDef = getDefaultSampleByUiLang(state.uiLang);
        state.songs[defIdx] = {
          ...state.songs[defIdx],
          title: nextDef.title,
          artist: nextDef.artist,
          rawText: nextDef.rawText
        };
      }
    }
  }

  let savedActiveId = null;
  try {
    savedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
  } catch (e) {}
  if (newlyAddedId && localSongs.length > 0) {
    state.currentSongId = newlyAddedId;
  } else {
    const found = state.songs.find(s => s.id === savedActiveId);
    state.currentSongId = found ? found.id : state.songs[0].id;
  }

  saveLibraryToStorage();
  loadCurrentSong();
}

function saveLibraryToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY_LIBRARY, JSON.stringify(state.songs));
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, state.currentSongId);
    localStorage.setItem(STORAGE_KEY_DELETED_IDS, JSON.stringify(Array.from(state.deletedIds)));
    return true;
  } catch (e) {
    if (e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22)) {
      showToast(UI_TEXT.quotaExceededTitle, UI_TEXT.quotaExceededSub);
    }
    return false;
  }
}

function selectSong(songId) {
  if (state.isPlayingAll) stopPlayAll();
  const target = state.songs.find(s => s.id === songId);
  if (!target) return;

  state.currentSongId = target.id;
  state.allNotesExpanded = false;
  state.activeLineIdx = 0;
  state.speakingLineIdx = -1;
  saveLibraryToStorage();
  loadCurrentSong();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadCurrentSong() {
  const currentSong = state.songs.find(s => s.id === state.currentSongId) || state.songs[0];
  if (!currentSong) return;

  state.currentSongId = currentSong.id;
  const parsed = parseLyricsMaterial(currentSong.rawText);
  state.lyricsData = parsed.lines;
  state.currentSongLang = parsed.detectedLang || (parsed.hasZhuyin ? 'zh-TW' : 'zh-CN');

  const effectiveUrl = currentSong.url || parsed.detectedUrl || '';

  document.getElementById('headerSongTitle').textContent = currentSong.title || UI_TEXT.untitledText;
  document.getElementById('headerSongArtist').textContent = currentSong.artist || UI_TEXT.unknownArtist;
  document.getElementById('menuSongCountSub').textContent = UI_TEXT.menuSongCountSub(state.songs.length);

  const regionBadge = document.getElementById('headerRegionBadge');
  const rubyLabel = document.getElementById('labelRubySwitch');
  const rubyDesc = document.getElementById('descRubySwitch');
  const pinyinLabel = document.getElementById('labelPinyinSwitch');
  const pinyinDesc = document.getElementById('descPinyinSwitch');
  const voiceHint = document.getElementById('voiceHintText');

  const langCfg = getLangConfig(state.currentSongLang);
  regionBadge.textContent = langCfg.badge;
  rubyLabel.textContent = langCfg.rubyLabel;
  if (rubyDesc) rubyDesc.textContent = langCfg.rubyDesc;
  if (pinyinLabel) pinyinLabel.textContent = langCfg.subLineLabel;
  if (pinyinDesc) pinyinDesc.textContent = langCfg.subLineDesc;
  if (voiceHint) voiceHint.textContent = langCfg.voiceHint;

  const urlBtn = document.getElementById('songRefUrlBtn');
  if (effectiveUrl && /^https?:\/\//i.test(effectiveUrl)) {
    urlBtn.href = effectiveUrl;
    urlBtn.hidden = false;
  } else {
    urlBtn.hidden = true;
  }

  loadVoices();
  syncControlsUI();
  renderLyrics();
  updatePlayerStatus();
}

// ============================================================================
// 5. テキストパーサー（注音・ピンイン・粤拼・台羅・ハングル・IPA・記号混在対応）
// ============================================================================
function isLyricRubyLine(str, explicitLang = '') {
  if (!str) return false;
  if (/^[*・\-【]/.test(str)) return false;
  if (/^(?:\d+[.)]\s*)?[^()（）:：]+?\s*[(（][^)）]+[)）]\s*[：:]/.test(str)) return false;
  if (/[^\s(（]+\s*[(（][^)\）]*[\u3105-\u3129ˊˇˋ˙]+[^)\）]*[)）]/.test(str)) {
    return true;
  }
  const matches = str.match(/\p{Script=Han}+\s*[(（][a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F\u207F\s1-9'\-]+[)）]/gu);
  if (matches && matches.length >= 1) {
    return true;
  }
  if (/[\uAC00-\uD7A3]+\s*[(（][^)）]*[\uAC00-\uD7A3\u3131-\u318E\u30A0-\u30FF]+[^)）]*[)）]/.test(str)) {
    return true;
  }
  const pairRegex = /([^\s(（，。！？、,.!?…～~—・;；:：「」『』【】《》〈〉"“”«»¿¡،؟؛]+)[ \t]*[(（]([^)）]+)[)）]/g;
  const pairs = [];
  let pm;
  while ((pm = pairRegex.exec(str)) !== null) {
    pairs.push({ surface: pm[1], ruby: pm[2] });
  }
  if (pairs.length >= 1) {
    const validJaPairs = pairs.filter(p =>
      /[\p{Script=Han}\u3040-\u30ff]/u.test(p.surface) &&
      /^[\u3040-\u309F\u30A0-\u30FFー\s・]+$/.test(p.ruby)
    );
    if (explicitLang === 'ja-JP') {
      return validJaPairs.length >= 2 || (validJaPairs.length === 1 && /[(（][^)）]+[)）]/.test(str));
    }
    if (!explicitLang && validJaPairs.length >= 2 && validJaPairs.some(p => /\p{Script=Han}/u.test(p.surface))) {
      return true;
    }
    if (explicitLang && explicitLang !== 'ja-JP') {
      if (pairs.some(p => !/[\p{Script=Han}\u3040-\u30ff]/u.test(p.surface) && !/[\p{Script=Han}\u3040-\u30ff]/u.test(p.ruby))) {
        return true;
      }
    }
  }
  return false;
}

function looksLikePinyinLine(str) {
  if (!str) return false;
  if (/[\u3040-\u30ff\uAC00-\uD7A3\u3131-\u318E]/.test(str)) return false;
  if (/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F]/.test(str) && !/\p{Script=Han}/u.test(str)) return true;
  const cjkCount = (str.match(/\p{Script=Han}/gu) || []).length;
  const latinCount = (str.match(/[a-zA-Z]/g) || []).length;
  return latinCount > 0 && cjkCount === 0;
}

function parseLyricsMaterial(rawText) {
  const lines = String(rawText || '').replace(/\r\n/g, '\n').split('\n');
  let detectedTitle = '';
  let detectedArtist = '';
  let detectedUrl = '';
  let explicitLang = '';
  const blocks = [];
  let i = 0;

  const globalWordDict = new Map();

  while (i < lines.length) {
    while (i < lines.length && (!lines[i].trim() || /^```/.test(lines[i].trim()))) i++;
    if (i >= lines.length) break;

    const trimmed = lines[i].trim();

    const langMatch = trimmed.match(/^【(?:言語|Language|Lang)】\s*(.+)$/i);
    if (langMatch) {
      const resolved = resolveLang(langMatch[1]);
      if (resolved) explicitLang = resolved;
      i++;
      continue;
    }

    const titleMatch = trimmed.match(/^【(?:タイトル|曲名|Title)】\s*(.+)$/i);
    if (titleMatch) { detectedTitle = titleMatch[1].trim(); i++; continue; }

    const artistMatch = trimmed.match(/^【(?:出典|著者|作者|歌手|アーティスト|Artist|Author|Source)】\s*(.+)$/i);
    if (artistMatch) { detectedArtist = artistMatch[1].trim(); i++; continue; }

    const urlMatch = trimmed.match(/^【(?:URL|リンク|Link|参考URL)】\s*(.+)$/i);
    if (urlMatch) { detectedUrl = urlMatch[1].trim(); i++; continue; }

    if (isLyricRubyLine(trimmed, explicitLang)) {
      const zhuyinLine = trimmed;
      i++;

      let pinyinLine = '';
      let jpLine = '';
      const subCands = [];
      for (let sub = 0; sub < 2; sub++) {
        while (i < lines.length && !lines[i].trim()) i++;
        if (i >= lines.length) break;
        const cand = lines[i].trim();
        if (cand.startsWith('【') || /^[*・\-]/.test(cand) || isLyricRubyLine(cand, explicitLang)) break;
        subCands.push(cand);
        i++;
      }
      if (subCands.length === 2) {
        pinyinLine = subCands[0];
        jpLine = subCands[1];
      } else if (subCands.length === 1) {
        if (looksLikePinyinLine(subCands[0])) {
          pinyinLine = subCands[0];
        } else {
          jpLine = subCands[0];
        }
      }

      const vocabList = [];
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (!cur || /^```/.test(cur)) { i++; continue; }
        if (isLyricRubyLine(cur, explicitLang) || /^【(?:言語|Language|Lang|タイトル|曲名|Title|出典|著者|作者|歌手|アーティスト|Artist|Author|Source|URL|リンク|Link|参考URL)/i.test(cur)) {
          break;
        }
        if (/^[*・\-]/.test(cur)) {
          const itemText = cur.replace(/^[*・\-]\s*/, '').trim();
          const match = itemText.match(/^([^()（）:：]+?)\s*[(（]([^)）]+)[)）]\s*[：:]\s*(.+)$/);
          if (match) {
            const rawWord = match[1].trim();
            const pinyin = match[2].trim();
            const meaning = match[3].trim();
            const subWords = rawWord.split(/[\/／、,]/).map(s => s.trim()).filter(Boolean);
            const mainWord = subWords[0] || rawWord;

            const vocabObj = { word: mainWord, pinyin, meaning, isNoteOnly: false };
            vocabList.push(vocabObj);

            subWords.forEach(sw => {
              const normKey = sw.replace(/\s+/g, '');
              if (normKey.length >= 1 && normKey.length <= 10 && !globalWordDict.has(normKey)) {
                globalWordDict.set(normKey, vocabObj);
              }
            });
          } else {
            vocabList.push({ word: '', pinyin: '', meaning: itemText, isNoteOnly: true });
          }
        }
        i++;
      }

      blocks.push({ zhuyinLine, pinyinLine, jpLine, vocabList });
    } else {
      i++;
    }
  }

  let hasZhuyin = false;
  let hasHangul = false;
  let hasKanaRuby = false;
  const explicitCfg = explicitLang ? getLangConfig(explicitLang) : null;
  const useWordTokenizer = Boolean(explicitCfg && explicitCfg.segmentation === 'word');

  const tokenizedBlocks = blocks.map(block => {
    const charTokens = useWordTokenizer
      ? parseWordModeTokens(block.zhuyinLine)
      : parseZhuyinTokens(block.zhuyinLine);
    if (charTokens.some(t => /[\u3105-\u3129]/.test(t.zhuyin))) {
      hasZhuyin = true;
    }
    if (charTokens.some(t => /[\uAC00-\uD7A3\u3131-\u318E]/.test(t.char) || /[\uAC00-\uD7A3\u3131-\u318E]/.test(t.zhuyin))) {
      hasHangul = true;
    }
    if (charTokens.some(t => t.zhuyin && /^[\u3040-\u309F\u30A0-\u30FFー\s・]+$/.test(t.zhuyin))) {
      hasKanaRuby = true;
    }
    return { ...block, charTokens };
  });

  const detectedLang = explicitLang || (hasHangul ? 'ko-KR' : (hasZhuyin ? 'zh-TW' : (hasKanaRuby ? 'ja-JP' : 'zh-CN')));
  const langCfg = getLangConfig(detectedLang);
  const isKo = detectedLang === 'ko-KR';
  const isWordMode = langCfg.segmentation === 'word';
  const isSpaceDelimitedLang = isKo || isWordMode;
  const maxWordLen = isKo ? 10 : 4;

  const normMatchKey = (s) => String(s || '')
    .normalize('NFC')
    .replace(/[\u0610-\u061A\u0640\u064B-\u065F\u0670\u06D6-\u06ED\u200C\u200D\s]+/g, '')
    .replace(/[\u0649\u064A]/g, '\u06CC')
    .replace(/\u0643/g, '\u06A9')
    .replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627')
    .replace(/[’‘]/g, "'")
    .toLowerCase();

  const normGlobalDict = new Map();
  for (const [k, v] of globalWordDict.entries()) {
    normGlobalDict.set(normMatchKey(k), v);
  }

  const songHasMultiCharEojeol = tokenizedBlocks.some(b => b.charTokens.some(t => t.isMultiCharPair));

  const parsedLines = tokenizedBlocks.map((block, idx) => {
    const charTokens = block.charTokens;
    const hasMultiCharEojeol = songHasMultiCharEojeol || isKo || isWordMode || charTokens.some(t => t.isMultiCharPair);

    const lineVocabMap = new Map();
    const normLineVocabMap = new Map();
    const longPhrases = [];
    block.vocabList.forEach(v => {
      if (!v.word) return;
      const subWords = v.word.split(/[\/／、,]/).map(s => s.trim()).filter(Boolean);
      subWords.forEach(sw => {
        const normKey = sw.replace(/\s+/g, '');
        if (normKey) {
          if (!lineVocabMap.has(normKey)) lineVocabMap.set(normKey, v);
          const nk = normMatchKey(sw);
          if (nk && !normLineVocabMap.has(nk)) normLineVocabMap.set(nk, v);
        }
        if (normKey.length > maxWordLen) {
          longPhrases.push({ normKey, vocab: v });
        }
      });
    });

    const wordGroups = [];

    if (hasMultiCharEojeol) {
      let p = 0;
      while (p < charTokens.length) {
        const token = charTokens[p];
        if (token.isPunct) {
          wordGroups.push({ isPunct: true, text: token.char, tokens: [token], hasSpaceAfter: Boolean(token.spaceAfter) });
          p++;
          continue;
        }

        let eojeolLen = 1;
        if (token.eojeolId) {
          while (
            p + eojeolLen < charTokens.length &&
            !charTokens[p + eojeolLen].isPunct &&
            charTokens[p + eojeolLen].eojeolId === token.eojeolId
          ) {
            eojeolLen++;
          }
        }

        const groupTokens = charTokens.slice(p, p + eojeolLen);
        const groupText = groupTokens.map(t => t.char).join('');
        const groupZhuyin = groupTokens.map(t => t.zhuyin).filter(Boolean).join(' ');
        const lastToken = groupTokens[groupTokens.length - 1];
        const hasSpaceAfter = isSpaceDelimitedLang ? Boolean(lastToken && lastToken.spaceAfter) : false;

        wordGroups.push({
          isPunct: false,
          text: groupText,
          zhuyin: groupZhuyin,
          tokens: groupTokens,
          vocabInfo: null,
          hasSpaceAfter
        });

        p += eojeolLen;
      }

      let spanCounter = 0;
      let wIdx = 0;
      while (wIdx < wordGroups.length) {
        const wg = wordGroups[wIdx];
        if (wg.isPunct) {
          wIdx++;
          continue;
        }

        let matchedSpanLen = 0;
        let matchedVocab = null;
        const maxSpan = Math.min(5, wordGroups.length - wIdx);

        for (let len = maxSpan; len >= 2; len--) {
          const slice = wordGroups.slice(wIdx, wIdx + len);
          if (slice.some(item => item.isPunct)) continue;
          const combinedKey = normMatchKey(slice.map(item => item.text).join(''));
          const v = normLineVocabMap.get(combinedKey) || normGlobalDict.get(combinedKey);
          if (v) {
            matchedSpanLen = len;
            matchedVocab = v;
            break;
          }
        }

        if (matchedSpanLen >= 2 && matchedVocab) {
          const spanId = ++spanCounter;
          const slice = wordGroups.slice(wIdx, wIdx + matchedSpanLen);
          const joiner = isKo || langCfg.segmentation === 'word' ? ' ' : '';
          const spanText = slice.map(item => item.text).join(joiner);
          const spanZhuyin = slice.map(item => item.zhuyin).filter(Boolean).join(' ');
          slice.forEach(item => {
            item.vocabInfo = matchedVocab;
            item.spanId = spanId;
            item.spanText = spanText;
            item.spanZhuyin = spanZhuyin;
          });
          wIdx += matchedSpanLen;
          continue;
        }

        const singleKey = normMatchKey(wg.text);
        let singleVocab = normLineVocabMap.get(singleKey) || normGlobalDict.get(singleKey) || null;
        if (!singleVocab && longPhrases.length > 0) {
          const foundLp = longPhrases.find(lp => normMatchKey(lp.normKey).includes(singleKey));
          if (foundLp) singleVocab = foundLp.vocab;
        }
        if (!singleVocab && langCfg.prefixMatch) {
          for (const [k, v] of normLineVocabMap.entries()) {
            if (k.length >= 1 && singleKey.startsWith(k)) {
              singleVocab = v;
              break;
            }
          }
        }
        wg.vocabInfo = singleVocab;
        wIdx++;
      }
    } else {
      const lineWords = Array.from(lineVocabMap.keys())
        .filter(w => w.length >= 2 && w.length <= maxWordLen)
        .sort((a, b) => b.length - a.length);
      const globalWords = Array.from(globalWordDict.keys())
        .filter(w => w.length >= 2 && w.length <= maxWordLen && !lineVocabMap.has(w))
        .sort((a, b) => b.length - a.length);

      const matchWordAt = (pos, wordList) => {
        for (const w of wordList) {
          if (pos + w.length <= charTokens.length) {
            const sliceTokens = charTokens.slice(pos, pos + w.length);
            if (sliceTokens.some(t => t.isPunct)) continue;
            if (sliceTokens.map(t => t.char).join('') === w) {
              return w.length;
            }
          }
        }
        return 0;
      };

      let p = 0;
      while (p < charTokens.length) {
        const token = charTokens[p];
        if (token.isPunct) {
          wordGroups.push({ isPunct: true, text: token.char, tokens: [token], hasSpaceAfter: Boolean(token.spaceAfter) });
          p++;
          continue;
        }

        let matchedLen = matchWordAt(p, lineWords);
        if (!matchedLen) {
          const globalLen = matchWordAt(p, globalWords);
          if (globalLen > 1 && matchWordAt(p + 1, lineWords) >= 2) {
            matchedLen = 1;
          } else {
            matchedLen = globalLen || 1;
          }
        }

        const groupTokens = charTokens.slice(p, p + matchedLen);
        const normGroupText = groupTokens.map(t => t.char).join('');
        let vocabMatch = lineVocabMap.get(normGroupText) || globalWordDict.get(normGroupText) || null;
        if (!vocabMatch && longPhrases.length > 0) {
          const foundLp = longPhrases.find(lp => lp.normKey.includes(normGroupText));
          if (foundLp) vocabMatch = foundLp.vocab;
        }
        if (!vocabMatch && langCfg.prefixMatch) {
          for (const [k, v] of lineVocabMap.entries()) {
            if (k.length >= 1 && normGroupText.startsWith(k)) {
              vocabMatch = v;
              break;
            }
          }
        }

        let groupText = normGroupText;
        if (isKo) {
          if (vocabMatch && vocabMatch.word.includes(' ')) {
            let cursor = 0;
            const parts = vocabMatch.word.trim().split(/\s+/);
            for (let pi = 0; pi < parts.length - 1; pi++) {
              cursor += Array.from(parts[pi]).length;
              if (cursor > 0 && cursor <= groupTokens.length) {
                groupTokens[cursor - 1].internalGap = true;
              }
            }
          }
          groupText = groupTokens.map(gt => gt.char + (gt.internalGap ? ' ' : '')).join('');
        }

        const groupZhuyin = groupTokens.map(t => t.zhuyin).filter(Boolean).join(' ');
        const lastToken = groupTokens[groupTokens.length - 1];
        const hasSpaceAfter = isKo ? Boolean(lastToken && lastToken.spaceAfter) : false;

        wordGroups.push({
          isPunct: false,
          text: groupText,
          zhuyin: groupZhuyin,
          tokens: groupTokens,
          vocabInfo: vocabMatch,
          hasSpaceAfter
        });

        p += matchedLen;
      }
    }

    let plainSentence = '';
    if (isSpaceDelimitedLang) {
      if (hasMultiCharEojeol) {
        charTokens.forEach((t, tIdx) => {
          const prev = charTokens[tIdx - 1];
          if (prev && (prev.spaceAfter || (prev.isLatin && t.isLatin))) {
            plainSentence += ' ';
          }
          plainSentence += t.char;
        });
      } else {
        wordGroups.forEach((wg, wIdx) => {
          const prevWg = wordGroups[wIdx - 1];
          if (prevWg && !wg.isPunct && (prevWg.hasSpaceAfter || prevWg.isPunct)) {
            plainSentence += ' ';
          }
          plainSentence += wg.text;
        });
      }
    } else {
      charTokens.forEach((t, tIdx) => {
        const prev = charTokens[tIdx - 1];
        if (prev && prev.isLatin && t.isLatin) plainSentence += ' ';
        plainSentence += t.char;
      });
    }

    return {
      id: idx,
      plainSentence,
      pinyinLine: block.pinyinLine,
      jpLine: block.jpLine,
      vocabList: block.vocabList,
      wordGroups,
      isOpen: idx === 0
    };
  });

  return {
    detectedTitle,
    detectedArtist,
    detectedUrl,
    hasZhuyin,
    detectedLang,
    lines: parsedLines
  };
}

function parseZhuyinTokens(lineStr) {
  const tokens = [];
  const regex = /([^\s(（，。！？、,.!?…～~—\-・;；:：「」『』【】《》〈〉"“”«»¿¡،؟؛]+)[ \t]*[(（]([^)）]+)[)）]|([a-zA-Z0-9]+(?:['’‘][a-zA-Z0-9]+)*)|([，。！？、,.!?\s…～~—\-・;；:：「」『』【】《》〈〉"“”（）()«»¿¡،؟؛]+)|([^\s(（，。！？、,.!?]+)/g;
  let m;
  let currentEojeolId = 0;
  while ((m = regex.exec(lineStr)) !== null) {
    if (m[1] && m[2]) {
      const eojeolId = ++currentEojeolId;
      const charPart = m[1].trim();
      const zhuyinPart = m[2].trim();
      const chars = splitGraphemes(charPart);
      const isHangulPair = /[\uAC00-\uD7A3\u3131-\u318E]/.test(charPart) || /[\uAC00-\uD7A3\u3131-\u318E]/.test(zhuyinPart);
      const isMultiCharPair = chars.length > 1;

      if (isHangulPair) {
        const primaryRuby = zhuyinPart.split(/[\/／]/)[0].trim();
        if (chars.length === 1) {
          tokens.push({ char: charPart, zhuyin: primaryRuby, isPunct: false, isLatin: false, eojeolId, isMultiCharPair: false, spaceAfter: false });
        } else {
          const spaceSplit = primaryRuby.split(/\s+/).filter(Boolean);
          const cleanRuby = splitGraphemes(primaryRuby.replace(/[\sー~～\-]/g, ''));
          if (spaceSplit.length === chars.length) {
            chars.forEach((c, idx) => {
              tokens.push({ char: c, zhuyin: spaceSplit[idx], isPunct: false, isLatin: false, eojeolId, isMultiCharPair: true, spaceAfter: false });
            });
          } else if (cleanRuby.length === chars.length) {
            chars.forEach((c, idx) => {
              tokens.push({ char: c, zhuyin: cleanRuby[idx], isPunct: false, isLatin: false, eojeolId, isMultiCharPair: true, spaceAfter: false });
            });
          } else {
            tokens.push({ char: charPart, zhuyin: primaryRuby, isPunct: false, isLatin: false, isGroupRuby: true, eojeolId, isMultiCharPair: true, spaceAfter: false });
          }
        }
      } else {
        let zhuyins = zhuyinPart.split(/\s+/).filter(Boolean);
        if (chars.length > 1 && zhuyins.length !== chars.length) {
          const autoSplit = zhuyinPart.match(/˙?(?:[\u3105-\u3119][\u3127-\u3129]?[\u311a-\u3126]?|[\u3127-\u3129][\u311a-\u3126]?|[\u311a-\u3126])[ˊˇˋ˙]?/g);
          if (autoSplit && autoSplit.length === chars.length) {
            zhuyins = autoSplit;
          } else if (zhuyinPart.includes('-')) {
            const hyphenSplit = zhuyinPart.split(/--+|-|\s+/).filter(Boolean);
            if (hyphenSplit.length === chars.length) {
              zhuyins = hyphenSplit;
            }
          }
        }
        if (chars.length > 1 && zhuyins.length === chars.length) {
          chars.forEach((c, idx) => {
            tokens.push({ char: c, zhuyin: zhuyins[idx], isPunct: false, isLatin: false, eojeolId, isMultiCharPair, spaceAfter: false });
          });
        } else if (chars.length > 1) {
          tokens.push({ char: charPart, zhuyin: zhuyinPart, isPunct: false, isLatin: false, isGroupRuby: true, eojeolId, isMultiCharPair: true, spaceAfter: false });
        } else {
          tokens.push({ char: charPart, zhuyin: zhuyinPart, isPunct: false, isLatin: false, eojeolId, isMultiCharPair: false, spaceAfter: false });
        }
      }
    } else if (m[3]) {
      const eojeolId = ++currentEojeolId;
      tokens.push({ char: m[3], zhuyin: '', isPunct: false, isLatin: true, eojeolId, isMultiCharPair: false, spaceAfter: false });
    } else if (m[4]) {
      const rawPunct = m[4];
      const hasSpace = /\s/.test(rawPunct);
      const punct = rawPunct.replace(/\s+/g, '');
      if (!punct) {
        if (hasSpace && tokens.length > 0) {
          tokens[tokens.length - 1].spaceAfter = true;
        }
      } else {
        if (/^\s/.test(rawPunct) && tokens.length > 0) {
          tokens[tokens.length - 1].spaceAfter = true;
        }
        tokens.push({ char: punct, zhuyin: '', isPunct: true, isLatin: false, eojeolId: 0, isMultiCharPair: false, spaceAfter: /\s$/.test(rawPunct) });
      }
    } else if (m[5]) {
      const eojeolId = ++currentEojeolId;
      const raw = m[5].trim();
      const rawChars = Array.from(raw);
      rawChars.forEach(ch => {
        tokens.push({ char: ch, zhuyin: '', isPunct: false, isLatin: /^[a-zA-Z0-9]$/.test(ch), eojeolId, isMultiCharPair: rawChars.length > 1, spaceAfter: false });
      });
    }
  }
  return tokens;
}

function parseWordModeTokens(lineStr) {
  const tokens = [];
  const regex = /([^\s(（，。！？、,.!?…～~—・;；:：「」『』【】《》〈〉"“”«»¿¡،؟؛]+)[ \t]*[(（]([^)）]+)[)）]|([，。！？、,.!?\s…～~—・;；:：「」『』【】《》〈〉"“”（）()«»¿¡،؟؛]+)|([^\s(（，。！？、,.!?…～~—・;；:：「」『』【】《》〈〉"“”«»¿¡،؟؛]+)/g;
  let m;
  let currentEojeolId = 0;
  while ((m = regex.exec(lineStr)) !== null) {
    if (m[1] && m[2]) {
      const wordPart = m[1].trim();
      const rubyPart = m[2].trim();
      const eojeolId = ++currentEojeolId;
      tokens.push({
        char: wordPart,
        zhuyin: rubyPart,
        isPunct: false,
        isLatin: false,
        isGroupRuby: true,
        isWordToken: true,
        eojeolId,
        isMultiCharPair: true,
        spaceAfter: false
      });
    } else if (m[3]) {
      const rawPunct = m[3];
      const hasSpace = /\s/.test(rawPunct);
      const punct = rawPunct.replace(/\s+/g, '');
      if (!punct) {
        if (hasSpace && tokens.length > 0) {
          tokens[tokens.length - 1].spaceAfter = true;
        }
      } else {
        if (/^\s/.test(rawPunct) && tokens.length > 0) {
          tokens[tokens.length - 1].spaceAfter = true;
        }
        tokens.push({
          char: punct,
          zhuyin: '',
          isPunct: true,
          isLatin: false,
          eojeolId: 0,
          isMultiCharPair: false,
          spaceAfter: /\s$/.test(rawPunct)
        });
      }
    } else if (m[4]) {
      const raw = m[4].trim();
      if (/^[-—–]+$/.test(raw)) {
        tokens.push({ char: raw, zhuyin: '', isPunct: true, isLatin: false, eojeolId: 0, isMultiCharPair: false, spaceAfter: false });
      } else if (raw) {
        const eojeolId = ++currentEojeolId;
        tokens.push({
          char: raw,
          zhuyin: '',
          isPunct: false,
          isLatin: false,
          isGroupRuby: true,
          isWordToken: true,
          eojeolId,
          isMultiCharPair: true,
          spaceAfter: false
        });
      }
    }
  }
  return tokens;
}

// ============================================================================
// 6. UIレンダリング（イベント委譲・XSS防止）
// ============================================================================
function formatRubyHtml(zy) {
  if (!zy) return '';
  return escapeHtml(zy).replace(/([ˊˇˋ˙]+)/g, '<span class="zy-tone">$1</span>');
}

function isLongRuby(zy) {
  if (!zy) return false;
  const len = Array.from(zy).length;
  if (/[\uAC00-\uD7A3\u3131-\u318E]/.test(zy)) return len >= 2;
  return /[\u3105-\u3129]/.test(zy) ? len >= 4 : len >= 5;
}

function renderLyrics() {
  const container = document.getElementById('lyricsContainer');
  const isKo = state.currentSongLang === 'ko-KR';
  const langCfg = getLangConfig(state.currentSongLang);
  const isWordMode = langCfg.segmentation === 'word';
  const effectiveTap = getEffectiveTapMode();
  container.className = `lyrics ${isKo ? 'lang-ko' : ''} ${isWordMode ? 'mode-word' : ''} ${state.showZhuyin ? '' : 'hide-zhuyin'} ${effectiveTap === 'char' ? 'tap-char' : 'tap-word'}`;

  if (state.lyricsData.length === 0) {
    container.innerHTML = `<div class="empty-hint">${escapeHtml(UI_TEXT.emptyLyricsHint)}</div>`;
    return;
  }

  const lineDir = langCfg.dir === 'rtl' ? 'rtl' : 'ltr';
  const lineLang = langCfg.bcp47 || state.currentSongLang || 'zh-TW';

  container.innerHTML = state.lyricsData.map((line, lineIdx) => {
    const renderWgItem = (wg, wgIdx) => {
      if (wg.isPunct) {
        return `<span class="punct">${escapeHtml(wg.text)}</span>`;
      }

      const charsHtml = wg.tokens.map((t, tIdx) => `
        <span class="ch ${t.isLatin ? 'latin' : ''} ${t.isGroupRuby ? 'group-ruby' : ''} ${isKo && t.internalGap ? 'ko-gap gap-after' : ''}" data-line="${lineIdx}" data-wg="${wgIdx}" data-ch="${tIdx}">
          <span class="zy ${isLongRuby(t.zhuyin) ? 'zy-long' : ''}">${formatRubyHtml(t.zhuyin)}</span>
          <span class="hz">${escapeHtml(t.char)}</span>
        </span>
      `).join('');

      const hasVocab = Boolean(wg.vocabInfo && wg.vocabInfo.meaning);
      const spanAttr = wg.spanId ? ` data-span="${wg.spanId}"` : '';
      return `
        <span class="word ${hasVocab ? 'has-vocab' : ''} ${wg.hasSpaceAfter ? 'ko-gap gap-after' : ''}" data-line="${lineIdx}" data-wg="${wgIdx}"${spanAttr}>
          ${charsHtml}
        </span>
      `;
    };

    let wordsHtml = '';
    if (lineDir === 'rtl') {
      const isLtrWg = (wg) => !wg.isPunct && /^[\x00-\x7F\u2018\u2019\u2010-\u2015]+$/.test(wg.text) && /[A-Za-z0-9]/.test(wg.text);
      let wIdx = 0;
      const chunks = [];
      while (wIdx < line.wordGroups.length) {
        if (isLtrWg(line.wordGroups[wIdx])) {
          let endIdx = wIdx + 1;
          let ltrWordCount = 1;
          while (endIdx < line.wordGroups.length) {
            const cand = line.wordGroups[endIdx];
            if (isLtrWg(cand)) {
              ltrWordCount++;
              endIdx++;
            } else if (cand.isPunct && /^[\x00-\x7F\u2018\u2019\u201C\u201D]+$/.test(cand.text) && endIdx + 1 < line.wordGroups.length && isLtrWg(line.wordGroups[endIdx + 1])) {
              endIdx++;
            } else {
              break;
            }
          }
          if (ltrWordCount >= 2) {
            const inner = line.wordGroups.slice(wIdx, endIdx).map((wg, offset) => renderWgItem(wg, wIdx + offset)).join('');
            chunks.push(`<span class="ltr-run" dir="ltr">${inner}</span>`);
            wIdx = endIdx;
            continue;
          }
        }
        chunks.push(renderWgItem(line.wordGroups[wIdx], wIdx));
        wIdx++;
      }
      wordsHtml = chunks.join('');
    } else {
      wordsHtml = line.wordGroups.map((wg, wgIdx) => renderWgItem(wg, wgIdx)).join('');
    }

    const vocabHtml = line.vocabList.map((v, vIdx) => {
      if (v.isNoteOnly) {
        return `<li class="note-only">${escapeHtml(v.meaning)}</li>`;
      }
      return `
        <li>
          <button type="button" class="vocab" data-action="speak-vocab" data-line="${lineIdx}" data-vocab="${vIdx}">
            <span class="play-dot" aria-hidden="true">
              <svg class="icon sm fill"><use href="#i-play"/></svg>
            </span>
            <span>
              <span class="term" dir="auto">${escapeHtml(v.word)}</span>
              <span class="reading" dir="ltr">${escapeHtml(v.pinyin)}</span>
              <div class="meaning">${escapeHtml(v.meaning)}</div>
            </span>
          </button>
        </li>
      `;
    }).join('');

    const isActive = state.activeLineIdx === lineIdx;
    const isSpeaking = state.speakingLineIdx === lineIdx;

    return `
      <article id="line-card-${lineIdx}" class="line ${isActive ? 'is-active' : ''} ${isSpeaking ? 'is-speaking' : ''}" data-line-card="${lineIdx}">
        <div class="line-head">
          <span class="line-no">${String(lineIdx + 1).padStart(2, '0')}</span>
          <button type="button" class="icon-btn sm line-play" data-action="play-line" data-line="${lineIdx}" title="${escapeHtml(UI_TEXT.playLineTitle)}" aria-label="${escapeHtml(UI_TEXT.playLineAria(lineIdx + 1))}">
            <svg class="icon sm fill"><use href="#i-play"/></svg>
          </button>
        </div>

        <div class="ruby-line" dir="${lineDir}" lang="${escapeHtml(lineLang)}">${wordsHtml}</div>

        ${line.pinyinLine ? `<p class="pinyin-row" dir="auto" ${state.showPinyin ? '' : 'hidden'}>${escapeHtml(line.pinyinLine)}</p>` : ''}
        ${line.jpLine ? `<p class="trans-row" ${state.showTrans ? '' : 'hidden'}>${escapeHtml(line.jpLine)}</p>` : ''}

        ${line.vocabList.length > 0 ? `
          <button type="button" class="notes-toggle" data-action="toggle-note" data-line="${lineIdx}" aria-expanded="${line.isOpen ? 'true' : 'false'}">
            <span>${escapeHtml(UI_TEXT.vocabSectionToggle)}</span>
            <span class="count">(${line.vocabList.length})</span>
            <svg class="icon sm chev"><use href="#i-chev-down"/></svg>
          </button>
          <div id="note-panel-${lineIdx}" class="notes" ${line.isOpen ? '' : 'hidden'}>
            <ul>${vocabHtml}</ul>
          </div>
        ` : ''}
      </article>
    `;
  }).join('');
}

function updateActiveLineDOM() {
  document.querySelectorAll('.line[data-line-card]').forEach(el => {
    const idx = Number(el.dataset.lineCard);
    el.classList.toggle('is-active', idx === state.activeLineIdx);
    el.classList.toggle('is-speaking', idx === state.speakingLineIdx);
  });
  updatePlayerStatus();
}

function updatePlayerStatus() {
  const total = state.lyricsData.length;
  const line = state.lyricsData[state.activeLineIdx];
  const nowEl = document.getElementById('playerNowText');
  const subEl = document.getElementById('playerSubText');

  if (line) {
    nowEl.textContent = line.plainSentence;
    subEl.textContent = UI_TEXT.playerLineProgress(state.activeLineIdx + 1, total);
  } else {
    nowEl.textContent = UI_TEXT.playerNoText;
    subEl.textContent = UI_TEXT.playerZeroLines;
  }
}

// ============================================================================
// 7. Web Speech API 音声合成（ボイス照合＋サイレント学習モード対応）
// ============================================================================
let availableVoices = [];
let voicesProbeTimedOut = false;
let toastTimer = null;
let silentSpeechTimer = null;
let currentSpeechId = 0;

function clearSilentSpeechTimer() {
  if (silentSpeechTimer) {
    clearTimeout(silentSpeechTimer);
    silentSpeechTimer = null;
  }
}

function scoreVoiceForLang(v, langId) {
  if (!v) return 0;
  const vLang = String(v.lang || '').replace(/_/g, '-').toLowerCase();
  const vName = String(v.name || '').toLowerCase();
  const combined = `${vLang} ${vName}`;

  const cfg = LANG_CATALOG[langId];
  const ttsCfg = cfg ? cfg.tts : {
    lang: langId,
    prefer: [String(langId).toLowerCase(), String(langId).split('-')[0].toLowerCase()],
    accept: [],
    reject: []
  };

  if (!ttsCfg || !ttsCfg.lang) return 0;

  const matchesRule = (rule) => {
    const r = String(rule).toLowerCase();
    if (/^[a-z]{2,3}(-[a-z0-9]+)*$/.test(r)) {
      if (vLang === r || vLang.startsWith(r + '-')) return true;
      const parts = vLang.split('-');
      if (!r.includes('-') && parts[0] === r) return true;
      return false;
    }
    return combined.includes(r);
  };

  if (Array.isArray(ttsCfg.reject) && ttsCfg.reject.some(matchesRule)) {
    return 0;
  }

  let score = 0;
  if (Array.isArray(ttsCfg.prefer)) {
    const prefIdx = ttsCfg.prefer.findIndex(matchesRule);
    if (prefIdx !== -1) {
      score = 100 - prefIdx * 5;
    }
  }
  if (score === 0 && Array.isArray(ttsCfg.accept)) {
    const accIdx = ttsCfg.accept.findIndex(matchesRule);
    if (accIdx !== -1) {
      score = 50 - accIdx * 5;
    }
  }

  if (score > 0 && v.localService) {
    score += 3;
  }
  return score;
}

function isVoiceForLang(v, langId) {
  return scoreVoiceForLang(v, langId) > 0;
}

function getMatchedVoicesForLang(langId) {
  return availableVoices
    .map(v => ({ voice: v, score: scoreVoiceForLang(v, langId) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.voice);
}

function formatVoicePrefix(v) {
  const vLang = String(v.lang || '').replace(/_/g, '-').toLowerCase();
  const vName = String(v.name || '');
  const p = UI_TEXT.voiceRegionPrefixes;
  if (/^ko(-|$)/.test(vLang) || /\b(korean)\b|한국|朝鮮|韓国/i.test(vName)) return p.ko;
  if (/^(zh-hk|zh-mo|yue)(-|$)/.test(vLang) || /\b(hong\s*kong|hongkong|cantonese)\b|広東|廣東|粤|粵/i.test(vName)) return p.hk;
  if (/^(zh-tw|zh-hant-tw|cmn-hant-tw|cmn-tw)(-|$)/.test(vLang) || /\b(taiwan)\b|國語|台湾|臺灣/i.test(vName)) return p.tw;
  if (/^(zh-cn|zh-hans|cmn-hans|cmn-cn|zh-sg)(-|$)/.test(vLang) || /\b(mainland|putonghua)\b|普通话|普通話|中国/i.test(vName)) return p.cn;
  return '';
}

function loadVoices() {
  const select = document.getElementById('voiceSelect');
  const voiceHint = document.getElementById('voiceHintText');
  if (!select) return;

  const lang = state.currentSongLang || 'zh-TW';
  const langCfg = getLangConfig(lang);

  if (!('speechSynthesis' in window)) {
    select.innerHTML = `<option value="">${escapeHtml(UI_TEXT.voiceUnsupportedOption)}</option>`;
    select.disabled = true;
    if (voiceHint) voiceHint.textContent = UI_TEXT.voiceUnsupportedHint;
    return;
  }

  availableVoices = window.speechSynthesis.getVoices();
  if (availableVoices.length === 0 && !voicesProbeTimedOut) {
    select.innerHTML = `<option value="">${escapeHtml(UI_TEXT.voiceCheckingOption)}</option>`;
    select.disabled = true;
    return;
  }

  const matchedVoices = getMatchedVoicesForLang(lang);
  select.innerHTML = '';

  if (matchedVoices.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = UI_TEXT.voiceMissingOption;
    select.appendChild(opt);
    select.disabled = true;
    if (voiceHint) {
      voiceHint.textContent = UI_TEXT.voiceMissingHint(langCfg.name);
    }
    return;
  }

  select.disabled = false;
  if (voiceHint) voiceHint.textContent = langCfg.voiceHint;

  matchedVoices.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.voiceURI;
    opt.textContent = `${formatVoicePrefix(v)}${v.name} (${v.lang})`;
    select.appendChild(opt);
  });

  const savedURI = state.selectedVoiceByLang[lang] || (lang === 'zh-TW' ? state.selectedVoiceURI : '');
  if (savedURI && matchedVoices.some(v => v.voiceURI === savedURI)) {
    select.value = savedURI;
    state.selectedVoiceByLang[lang] = savedURI;
    if (lang === 'zh-TW') state.selectedVoiceURI = savedURI;
  } else {
    select.value = matchedVoices[0].voiceURI;
    if (!savedURI) {
      state.selectedVoiceByLang[lang] = matchedVoices[0].voiceURI;
      if (lang === 'zh-TW') state.selectedVoiceURI = matchedVoices[0].voiceURI;
    }
  }
}

if ('speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
  setTimeout(() => {
    if (availableVoices.length === 0) {
      voicesProbeTimedOut = true;
      loadVoices();
    }
  }, 1500);
}

function speakText(text, subText = '', noteText = '', onEndCallback = null) {
  if (!onEndCallback && state.isPlayingAll) {
    stopPlayAll();
  }

  const mySpeechId = ++currentSpeechId;
  clearSilentSpeechTimer();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  showToast(text, subText, noteText);

  const scheduleSilentFinish = () => {
    if (!onEndCallback) return;
    const charLen = Array.from(String(text || '')).length;
    const durationMs = Math.max(1100, Math.min(4200, Math.round((charLen * 180) / (state.speechRate || 1))));
    silentSpeechTimer = setTimeout(() => {
      silentSpeechTimer = null;
      if (mySpeechId !== currentSpeechId) return;
      onEndCallback();
    }, durationMs);
  };

  if (!('speechSynthesis' in window)) {
    scheduleSilentFinish();
    return;
  }

  const songLang = state.currentSongLang || 'zh-TW';
  const langCfg = getLangConfig(songLang);
  const foreignLatinLang = langCfg.tts && langCfg.tts.foreignLatin;
  const isForeignAscii = Boolean(
    foreignLatinLang &&
    /^[\x00-\x7F\u2018\u2019\u2010-\u2015]+$/.test(text) &&
    /[A-Za-z]/.test(text)
  );

  const targetLang = isForeignAscii ? foreignLatinLang : songLang;
  const matchedVoices = getMatchedVoicesForLang(targetLang);

  if (matchedVoices.length === 0) {
    scheduleSilentFinish();
    return;
  }

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = state.speechRate;

  let chosenVoice = matchedVoices[0];
  if (!isForeignAscii) {
    const preferredURI = state.selectedVoiceByLang[targetLang] || (targetLang === 'zh-TW' ? state.selectedVoiceURI : '');
    if (preferredURI) {
      const found = matchedVoices.find(v => v.voiceURI === preferredURI);
      if (found) chosenVoice = found;
    }
  }

  utter.voice = chosenVoice;
  utter.lang = chosenVoice.lang || (langCfg.tts && langCfg.tts.lang) || targetLang;

  const finish = () => {
    if (mySpeechId !== currentSpeechId) return;
    if (onEndCallback) onEndCallback();
  };
  utter.onend = finish;
  utter.onerror = finish;

  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  window.speechSynthesis.speak(utter);
}

function playFullLine(lineIdx) {
  stopPlayAll();
  const line = state.lyricsData[lineIdx];
  if (!line) return;

  state.activeLineIdx = lineIdx;
  state.speakingLineIdx = lineIdx;
  updateActiveLineDOM();

  const allZhuyin = line.wordGroups
    .filter(wg => !wg.isPunct)
    .map(wg => wg.zhuyin)
    .filter(Boolean)
    .join(' ');

  speakText(line.plainSentence, allZhuyin, line.jpLine || '', () => {
    state.speakingLineIdx = -1;
    updateActiveLineDOM();
  });
}

function stepLine(delta) {
  if (state.lyricsData.length === 0) return;
  const nextIdx = Math.max(0, Math.min(state.lyricsData.length - 1, state.activeLineIdx + delta));
  state.activeLineIdx = nextIdx;
  updateActiveLineDOM();
  const cardEl = document.getElementById(`line-card-${nextIdx}`);
  if (cardEl) cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  playFullLine(nextIdx);
}

function togglePlayAll() {
  if (state.isPlayingAll) {
    stopPlayAll();
  } else {
    if (state.lyricsData.length === 0) return;
    state.isPlayingAll = true;
    updatePlayAllButton();
    const startIdx = (state.activeLineIdx >= 0 && state.activeLineIdx < state.lyricsData.length) ? state.activeLineIdx : 0;
    playSequenceStep(startIdx);
  }
}

function playSequenceStep(idx) {
  if (!state.isPlayingAll || idx >= state.lyricsData.length) {
    stopPlayAll();
    return;
  }
  state.activeLineIdx = idx;
  state.speakingLineIdx = idx;
  updateActiveLineDOM();

  const cardEl = document.getElementById(`line-card-${idx}`);
  if (cardEl) cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const line = state.lyricsData[idx];
  const allZhuyin = line.wordGroups
    .filter(wg => !wg.isPunct)
    .map(wg => wg.zhuyin)
    .filter(Boolean)
    .join(' ');

  speakText(line.plainSentence, allZhuyin, line.jpLine || '', () => {
    if (!state.isPlayingAll) return;
    const stepSpeechId = currentSpeechId;
    clearSilentSpeechTimer();
    silentSpeechTimer = setTimeout(() => {
      silentSpeechTimer = null;
      if (!state.isPlayingAll || stepSpeechId !== currentSpeechId) return;
      playSequenceStep(idx + 1);
    }, 450);
  });
}

function stopPlayAll() {
  currentSpeechId++;
  clearSilentSpeechTimer();
  state.isPlayingAll = false;
  state.speakingLineIdx = -1;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  updatePlayAllButton();
  updateActiveLineDOM();
}

function updatePlayAllButton() {
  const btn = document.getElementById('btnPlayAll');
  const useEl = document.getElementById('iconPlayAll');
  if (state.isPlayingAll) {
    useEl.setAttribute('href', '#i-stop');
    btn.setAttribute('aria-label', UI_TEXT.playStopLabel);
  } else {
    useEl.setAttribute('href', '#i-play');
    btn.setAttribute('aria-label', UI_TEXT.playAllLabel);
  }
}

function showToast(word, zhuyin = '', note = '') {
  const toast = document.getElementById('speechToast');
  const wordEl = document.getElementById('toastWord');
  const zyEl = document.getElementById('toastZhuyin');
  const noteEl = document.getElementById('toastNote');

  wordEl.textContent = word;
  zyEl.textContent = zhuyin || '';
  zyEl.hidden = !zhuyin;
  noteEl.textContent = note || '';
  noteEl.hidden = !note;

  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, note ? 2800 : 2000);
}

function flashElement(target) {
  document.querySelectorAll('.flash').forEach(n => n.classList.remove('flash'));
  const list = (target instanceof Element) ? [target] : Array.from(target || []);
  list.forEach(el => el.classList.add('flash'));
  setTimeout(() => {
    list.forEach(el => el.classList.remove('flash'));
  }, 550);
}

// ============================================================================
// 8. シート（モーダル）制御
// ============================================================================
let activeSheetId = null;

function openSheet(id) {
  if (activeSheetId && activeSheetId !== id) {
    closeSheet(activeSheetId, true);
  }
  const el = document.getElementById(id);
  if (!el) return;

  if (id === 'songsSheet') renderLibraryList();
  if (id === 'promptSheet') updateGeneratedPrompt();

  el.hidden = false;
  el.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  activeSheetId = id;

  requestAnimationFrame(() => {
    el.classList.add('open');
  });
}

function closeSheet(id = activeSheetId, immediate = false) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;

  if (id === 'songsSheet' && state.isSelectMode) {
    state.isSelectMode = false;
    state.selectedSongIds.clear();
  }

  el.classList.remove('open');
  el.setAttribute('aria-hidden', 'true');
  if (activeSheetId === id) {
    activeSheetId = null;
    document.body.classList.remove('no-scroll');
  }

  if (immediate) {
    el.hidden = true;
  } else {
    setTimeout(() => {
      if (!el.classList.contains('open')) el.hidden = true;
    }, 240);
  }
}

// ============================================================================
// 9. テキストライブラリ管理・複数選択JSON書き出し・スマート重複排除＆衝突解決
// ============================================================================
const songSummaryCache = new Map();

function getSongSummary(song) {
  if (song.id) {
    const cached = songSummaryCache.get(song.id);
    if (cached && cached.rawText === song.rawText) {
      return cached;
    }
  }
  const parsed = parseLyricsMaterial(song.rawText);
  const summary = {
    rawText: song.rawText,
    detectedLang: parsed.detectedLang,
    lineCount: parsed.lines.length
  };
  if (song.id) {
    songSummaryCache.set(song.id, summary);
  }
  return summary;
}

function renderLibraryList() {
  const container = document.getElementById('libraryListContainer');
  const toolbarLabel = document.getElementById('libToolbarLabel');
  const btnSelectAll = document.getElementById('btnSelectAllSongs');
  const btnToggleSelect = document.getElementById('btnToggleSelectMode');
  const footNormal = document.getElementById('songsFootNormal');
  const footSelect = document.getElementById('songsFootSelect');
  const exportSelectedLabel = document.getElementById('exportSelectedLabel');
  const btnExportSelectedJson = document.getElementById('btnExportSelectedJson');
  const shareSelectedLabel = document.getElementById('shareSelectedLabel');
  const btnShareSelectedJson = document.getElementById('btnShareSelectedJson');
  const fileShareAvailable = canShareFiles();
  const textShareAvailable = canShareText();

  const validIds = new Set(state.songs.map(s => s.id));
  for (const id of state.selectedSongIds) {
    if (!validIds.has(id)) state.selectedSongIds.delete(id);
  }

  const selCount = state.selectedSongIds.size;
  if (state.isSelectMode) {
    if (toolbarLabel) toolbarLabel.textContent = selCount > 0 ? UI_TEXT.selectModeCount(selCount) : UI_TEXT.selectModePrompt;
    if (btnSelectAll) {
      btnSelectAll.hidden = false;
      btnSelectAll.textContent = (selCount === state.songs.length && state.songs.length > 0) ? UI_TEXT.deselectAll : UI_TEXT.selectAll;
    }
    if (btnToggleSelect) btnToggleSelect.textContent = UI_TEXT.selectModeDone;
    if (footNormal) footNormal.hidden = true;
    if (footSelect) footSelect.hidden = false;
    if (exportSelectedLabel) {
      exportSelectedLabel.textContent = fileShareAvailable
        ? UI_TEXT.exportSelectedShort(selCount)
        : UI_TEXT.exportSelectedLong(selCount);
    }
    if (btnExportSelectedJson) btnExportSelectedJson.disabled = selCount === 0;
    if (shareSelectedLabel) {
      shareSelectedLabel.textContent = UI_TEXT.shareSelectedCount(selCount);
    }
    if (btnShareSelectedJson) {
      btnShareSelectedJson.hidden = !fileShareAvailable;
      btnShareSelectedJson.disabled = selCount === 0;
    }
  } else {
    if (toolbarLabel) toolbarLabel.textContent = UI_TEXT.libraryListHeading(state.songs.length);
    if (btnSelectAll) btnSelectAll.hidden = true;
    if (btnToggleSelect) btnToggleSelect.textContent = UI_TEXT.selectToExportBtn;
    if (footNormal) footNormal.hidden = false;
    if (footSelect) footSelect.hidden = true;
  }

  if (state.songs.length === 0) {
    container.innerHTML = `<div class="empty-hint">${escapeHtml(UI_TEXT.emptyLibraryHint)}</div>`;
    return;
  }

  container.innerHTML = state.songs.map(song => {
    const isCurrent = song.id === state.currentSongId;
    const isSelected = state.selectedSongIds.has(song.id);
    const summary = getSongSummary(song);
    const badge = getLangConfig(summary.detectedLang).badge;
    const displayTitle = song.title || UI_TEXT.untitledText;
    const displayMeta = UI_TEXT.songMetaSummary(song.artist || UI_TEXT.unknownArtist, summary.lineCount);

    if (state.isSelectMode) {
      return `
        <div class="song-row ${isSelected ? 'is-selected' : ''}">
          <button type="button" class="pick" data-action="toggle-select-song" data-id="${escapeHtml(song.id)}" aria-pressed="${isSelected ? 'true' : 'false'}">
            <span class="song-check" aria-hidden="true">
              <svg class="icon sm"><use href="#i-check"/></svg>
            </span>
            <span class="lang-badge">${badge}</span>
            <span class="info">
              <div class="t">${escapeHtml(displayTitle)}</div>
              <div class="m">${escapeHtml(displayMeta)}</div>
            </span>
          </button>
        </div>
      `;
    }

    return `
      <div class="song-row ${isCurrent ? 'current' : ''}">
        <button type="button" class="pick" data-action="select-song" data-id="${escapeHtml(song.id)}">
          <span class="lang-badge">${badge}</span>
          <span class="info">
            <div class="t">${escapeHtml(displayTitle)}</div>
            <div class="m">${escapeHtml(displayMeta)}</div>
          </span>
        </button>
        ${textShareAvailable ? `
        <button type="button" class="icon-btn sm" data-action="share-song" data-id="${escapeHtml(song.id)}" title="${escapeHtml(UI_TEXT.rowShareTitle)}" aria-label="${escapeHtml(UI_TEXT.rowShareAria)}">
          <svg class="icon sm"><use href="#i-share"/></svg>
        </button>
        ` : ''}
        <button type="button" class="icon-btn sm" data-action="copy-song" data-id="${escapeHtml(song.id)}" title="${escapeHtml(UI_TEXT.rowCopyTitle)}" aria-label="${escapeHtml(UI_TEXT.rowCopyAria)}">
          <svg class="icon sm"><use href="#i-copy"/></svg>
        </button>
        <button type="button" class="icon-btn sm" data-action="edit-song" data-id="${escapeHtml(song.id)}" title="${escapeHtml(UI_TEXT.rowEditTitle)}" aria-label="${escapeHtml(UI_TEXT.rowEditAria)}">
          <svg class="icon sm"><use href="#i-edit"/></svg>
        </button>
        <button type="button" class="icon-btn sm danger" data-action="ask-delete-song" data-id="${escapeHtml(song.id)}" title="${escapeHtml(UI_TEXT.rowDeleteTitle)}" aria-label="${escapeHtml(UI_TEXT.rowDeleteAria)}">
          <svg class="icon sm"><use href="#i-trash"/></svg>
        </button>
      </div>
    `;
  }).join('');
}

function buildFormattedSongText(song) {
  let body = String(song.rawText || '').trim();
  const isEn = state.uiLang === 'en';
  const headers = [];
  if (!/^【(?:言語|Language|Lang)】/im.test(body)) {
    const summary = getSongSummary(song);
    if (summary && summary.detectedLang) {
      headers.push(isEn ? `【Language】${summary.detectedLang}` : `【言語】${summary.detectedLang}`);
    }
  }
  if (song.title && !/^【(?:タイトル|曲名|Title)】/im.test(body)) headers.push(isEn ? `【Title】${song.title}` : `【タイトル】${song.title}`);
  if (song.artist && !/^【(?:出典|著者|作者|歌手|アーティスト|Artist|Author|Source)】/im.test(body)) headers.push(isEn ? `【Source】${song.artist}` : `【出典】${song.artist}`);
  if (song.url && !/^【(?:URL|リンク|Link|参考URL)】/im.test(body)) headers.push(`【URL】${song.url}`);
  return headers.length > 0 ? `${headers.join('\n')}\n\n${body}` : body;
}

function splitMultiSongTextChunks(rawText) {
  const lines = String(rawText || '').replace(/\r\n/g, '\n').split('\n');
  const chunks = [];
  let currentLines = [];
  let hasSeenLyric = false;
  let currentExplicitLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^={6,}$/.test(trimmed)) {
      if (currentLines.length > 0 && hasSeenLyric) {
        chunks.push(currentLines.join('\n').trim());
        currentLines = [];
        hasSeenLyric = false;
        currentExplicitLang = '';
      }
      continue;
    }

    if (hasSeenLyric && /^【(?:言語|Language|Lang|タイトル|曲名|Title)】/i.test(trimmed)) {
      chunks.push(currentLines.join('\n').trim());
      currentLines = [line];
      hasSeenLyric = false;
      currentExplicitLang = '';
      const lm = trimmed.match(/^【(?:言語|Language|Lang)】\s*(.+)$/i);
      if (lm) currentExplicitLang = resolveLang(lm[1]) || '';
      continue;
    }

    const lm = trimmed.match(/^【(?:言語|Language|Lang)】\s*(.+)$/i);
    if (lm) {
      const resolved = resolveLang(lm[1]);
      if (resolved) currentExplicitLang = resolved;
    } else if (isLyricRubyLine(trimmed, currentExplicitLang)) {
      hasSeenLyric = true;
    }

    currentLines.push(line);
  }

  if (currentLines.length > 0) {
    const tail = currentLines.join('\n').trim();
    if (tail) chunks.push(tail);
  }
  return chunks;
}

function parseMultiOrSingleInput(rawInput) {
  const trimmed = String(rawInput || '').trim();
  if (!trimmed) return { mode: 'empty', songs: [] };

  if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
    try {
      const parsedJson = JSON.parse(trimmed);
      const list = Array.isArray(parsedJson)
        ? parsedJson
        : (Array.isArray(parsedJson.songs) ? parsedJson.songs : [parsedJson]);
      const valid = list.filter(item => item && typeof item.rawText === 'string' && item.rawText.trim());
      if (valid.length > 0) {
        return { mode: 'json', songs: valid };
      }
    } catch (e) {}
  }

  const chunks = splitMultiSongTextChunks(trimmed);
  if (chunks.length >= 2) {
    const multiSongs = [];
    chunks.forEach(chunk => {
      const p = parseLyricsMaterial(chunk);
      if (p.lines.length > 0) {
        multiSongs.push({
          title: p.detectedTitle || p.lines[0].plainSentence.slice(0, 18),
          artist: p.detectedArtist || '',
          url: p.detectedUrl || '',
          rawText: chunk,
          lineCount: p.lines.length
        });
      }
    });
    if (multiSongs.length >= 2) {
      return { mode: 'multi-text', songs: multiSongs };
    }
  }

  const singleParsed = parseLyricsMaterial(trimmed);
  if (singleParsed.lines.length > 0) {
    return {
      mode: 'single',
      parsed: singleParsed,
      songs: [{
        title: singleParsed.detectedTitle,
        artist: singleParsed.detectedArtist,
        url: singleParsed.detectedUrl,
        rawText: trimmed
      }]
    };
  }

  return { mode: 'invalid', songs: [] };
}

function isSameSongContent(songA, songB) {
  const norm = (s) => String(s || '').replace(/\r\n/g, '\n').trim();
  if (norm(songA.rawText) === norm(songB.rawText)) return true;
  return norm(buildFormattedSongText(songA)) === norm(buildFormattedSongText(songB));
}

function replaceOrPrependTitleInRawText(rawText, newTitle) {
  const normalized = String(rawText || '').replace(/\r\n/g, '\n').trim();
  const titleTagRegex = /^【(タイトル|曲名|Title)】\s*.+$/im;
  if (titleTagRegex.test(normalized)) {
    return normalized.replace(titleTagRegex, (_, tag) => `【${tag}】${newTitle}`);
  }
  const titleTag = state.uiLang === 'en' ? 'Title' : 'タイトル';
  const langLineMatch = normalized.match(/^(【(?:言語|Language|Lang)】\s*.+)\n?/i);
  if (langLineMatch) {
    const rest = normalized.slice(langLineMatch[0].length).replace(/^\n+/, '');
    return `${langLineMatch[1]}\n【${titleTag}】${newTitle}\n${rest}`;
  }
  return `【${titleTag}】${newTitle}\n\n${normalized}`;
}

function generateDisambiguatedTitleAndRaw(baseTitle, artist, rawText, lang, currentSongs) {
  const cleanBase = String(baseTitle || UI_TEXT.untitledText).replace(/[\s\u3000]*[(（]\d+[)）]$/, '').trim() || UI_TEXT.untitledText;
  let n = 2;
  while (n < 1000) {
    const candTitle = `${cleanBase} (${n})`;
    const candRaw = replaceOrPrependTitleInRawText(rawText, candTitle);
    const candKey = getSongIdentityKey(candTitle, artist, candRaw, lang);
    const exists = currentSongs.some(s => getSongIdentityKey(s.title, s.artist, s.rawText) === candKey);
    if (!exists) {
      return { title: candTitle, rawText: candRaw, identityKey: candKey };
    }
    n++;
  }
  const fallbackTitle = `${cleanBase} (${Date.now().toString().slice(-4)})`;
  const fallbackRaw = replaceOrPrependTitleInRawText(rawText, fallbackTitle);
  return {
    title: fallbackTitle,
    rawText: fallbackRaw,
    identityKey: getSongIdentityKey(fallbackTitle, artist, fallbackRaw, lang)
  };
}

function getPreviewDisambiguatedTitle(baseTitle, artist, rawText, lang) {
  return generateDisambiguatedTitleAndRaw(baseTitle, artist, rawText, lang, state.songs).title;
}

function inspectIncomingSongs(incomingSongs, { excludeSongId = null } = {}) {
  const normalizeBody = (s) => String(s || '').replace(/\r\n/g, '\n').trim();
  const virtualSongs = state.songs
    .filter(s => !excludeSongId || s.id !== excludeSongId)
    .map(s => ({ ...s }));

  const validItems = [];
  const newItems = [];
  const identicalItems = [];
  const conflicts = [];

  incomingSongs.forEach((inc) => {
    if (!inc || typeof inc.rawText !== 'string' || !inc.rawText.trim()) return;
    const parsed = parseLyricsMaterial(inc.rawText);
    if (parsed.lines.length === 0) return;

    const title = String(inc.title || parsed.detectedTitle || parsed.lines[0].plainSentence.slice(0, 18) || UI_TEXT.untitledText).trim();
    const artist = String(inc.artist || parsed.detectedArtist || '').trim();
    const url = String(inc.url || parsed.detectedUrl || '').trim();
    const rawText = normalizeBody(inc.rawText);
    const lang = parsed.detectedLang;
    const identityKey = getSongIdentityKey(title, artist, rawText, lang);

    const normalizedItem = {
      id: inc.id ? String(inc.id) : '',
      title,
      artist,
      url,
      rawText,
      lang,
      identityKey,
      updatedAt: Number(inc.updatedAt) || Date.now()
    };
    validItems.push(normalizedItem);

    const existing = virtualSongs.find(s =>
      getSongIdentityKey(s.title, s.artist, s.rawText) === identityKey
    );

    if (existing) {
      if (isSameSongContent(existing, normalizedItem)) {
        identicalItems.push(normalizedItem);
      } else {
        conflicts.push({
          ...normalizedItem,
          existingId: existing.id,
          existingTitle: existing.title,
          existingArtist: existing.artist
        });
      }
    } else {
      newItems.push(normalizedItem);
      virtualSongs.push(normalizedItem);
    }
  });

  return { validItems, newItems, identicalItems, conflicts };
}

function mergeSongsIntoLibrary(incomingSongs, { conflictPolicy = 'overwrite' } = {}) {
  let added = 0;
  let updated = 0;
  let skipped = 0;
  let renamed = 0;
  let firstTargetId = '';
  const normalizeBody = (s) => String(s || '').replace(/\r\n/g, '\n').trim();

  incomingSongs.forEach((inc) => {
    if (!inc || typeof inc.rawText !== 'string' || !inc.rawText.trim()) return;
    const parsed = parseLyricsMaterial(inc.rawText);
    if (parsed.lines.length === 0) return;

    let title = String(inc.title || parsed.detectedTitle || parsed.lines[0].plainSentence.slice(0, 18) || UI_TEXT.untitledText).trim();
    const artist = String(inc.artist || parsed.detectedArtist || '').trim();
    const url = String(inc.url || parsed.detectedUrl || '').trim();
    let rawText = normalizeBody(inc.rawText);
    const lang = parsed.detectedLang;
    let identityKey = getSongIdentityKey(title, artist, rawText, lang);
    let isRenamedItem = false;

    const existingIdx = state.songs.findIndex(s =>
      getSongIdentityKey(s.title, s.artist, s.rawText) === identityKey
    );

    if (existingIdx !== -1) {
      const existing = state.songs[existingIdx];

      if (isSameSongContent(existing, { title, artist, url, rawText })) {
        state.deletedIds.delete(identityKey);
        state.deletedIds.delete(existing.id);
        if (!firstTargetId) firstTargetId = existing.id;
        if (!existing.url && url) existing.url = url;
        if (!existing.artist && artist) existing.artist = artist;
        skipped++;
        return;
      }

      if (conflictPolicy === 'skip') {
        skipped++;
        return;
      }

      if (conflictPolicy === 'overwrite') {
        state.deletedIds.delete(identityKey);
        state.deletedIds.delete(existing.id);
        if (!firstTargetId) firstTargetId = existing.id;
        state.songs[existingIdx] = {
          ...existing,
          title,
          artist: artist || existing.artist,
          url: url || existing.url,
          rawText,
          updatedAt: Date.now()
        };
        updated++;
        return;
      }

      const disambiguated = generateDisambiguatedTitleAndRaw(title, artist, rawText, lang, state.songs);
      title = disambiguated.title;
      rawText = disambiguated.rawText;
      identityKey = disambiguated.identityKey;
      isRenamedItem = true;
      renamed++;
    }

    state.deletedIds.delete(identityKey);
    let newId = (inc.id && !isRenamedItem && !state.songs.some(s => s.id === String(inc.id)))
      ? String(inc.id)
      : generateDeterministicSongId(title, artist, rawText);
    if (state.songs.some(s => s.id === newId)) {
      newId = `${newId}_${Math.random().toString(36).slice(2, 5)}`;
    }
    state.deletedIds.delete(newId);
    if (!firstTargetId) firstTargetId = newId;

    state.songs.push({
      id: newId,
      title,
      artist,
      url,
      rawText,
      updatedAt: Number(inc.updatedAt) || Date.now()
    });
    added++;
  });

  state.songs.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  return { added, updated, skipped, renamed, firstTargetId };
}

function formatMergeSummary({ added, updated, skipped, renamed = 0 }) {
  const parts = [];
  if (added > 0) {
    if (renamed > 0 && renamed === added) {
      parts.push(UI_TEXT.mergeSummaryRenamedAll(added));
    } else if (renamed > 0) {
      parts.push(UI_TEXT.mergeSummaryRenamedPart(added, renamed));
    } else {
      parts.push(UI_TEXT.mergeSummaryAdded(added));
    }
  }
  if (updated > 0) parts.push(UI_TEXT.mergeSummaryUpdated(updated));
  if (skipped > 0) parts.push(UI_TEXT.mergeSummarySkipped(skipped));
  const sep = state.uiLang === 'en' ? ' / ' : '・';
  return parts.join(sep) || UI_TEXT.mergeSummaryNoChange;
}

function openConflictDialog({ items, conflicts, newCount = 0, returnSheetId = null, sourceType = 'import', editingSongId = null }) {
  state.pendingConflict = { items, conflicts, newCount, returnSheetId, sourceType, editingSongId };

  const msgEl = document.getElementById('conflictMessage');
  const listEl = document.getElementById('conflictList');
  const btnKeepBoth = document.getElementById('btnConflictKeepBoth');
  const btnOverwrite = document.getElementById('btnConflictOverwrite');
  const btnSkip = document.getElementById('btnConflictSkip');

  if (items.length === 1 && conflicts.length === 1) {
    const c = conflicts[0];
    msgEl.textContent = UI_TEXT.singleConflictMsg(c.title);
    if (btnKeepBoth) btnKeepBoth.textContent = UI_TEXT.singleKeepBothBtn(getPreviewDisambiguatedTitle(c.title, c.artist, c.rawText, c.lang));
    if (btnOverwrite) btnOverwrite.textContent = UI_TEXT.singleOverwriteBtn;
    if (btnSkip) btnSkip.hidden = true;
  } else {
    msgEl.textContent = UI_TEXT.multiConflictMsg(items.length, conflicts.length);
    if (btnKeepBoth) btnKeepBoth.textContent = UI_TEXT.multiKeepBothBtn(conflicts.length);
    if (btnOverwrite) btnOverwrite.textContent = UI_TEXT.multiOverwriteBtn(conflicts.length);
    if (btnSkip) {
      btnSkip.hidden = false;
      btnSkip.textContent = newCount > 0
        ? UI_TEXT.multiSkipWithNewBtn(conflicts.length, newCount)
        : UI_TEXT.multiSkipAllBtn(conflicts.length);
    }
  }

  if (listEl) {
    const previewList = conflicts.slice(0, 6);
    const restCount = conflicts.length - previewList.length;
    listEl.innerHTML = previewList.map(c => {
      const badge = getLangConfig(c.lang).badge;
      return `
        <div class="conflict-item">
          <span class="lang-badge">${badge}</span>
          <div class="conflict-item-info">
            <span class="conflict-name">${escapeHtml(c.title)}</span>
            ${c.artist ? `<span class="conflict-sub">（${escapeHtml(c.artist)}）</span>` : ''}
          </div>
        </div>
      `;
    }).join('') + (restCount > 0 ? `<div class="conflict-sub" style="padding-left:32px;">${escapeHtml(UI_TEXT.moreConflictsSuffix(restCount))}</div>` : '');
  }

  openSheet('conflictSheet');
}

function resolveConflictWithPolicy(policy) {
  const pending = state.pendingConflict;
  state.pendingConflict = null;
  if (!pending) {
    closeSheet('conflictSheet');
    return;
  }

  if (pending.editingSongId && pending.items.length === 1) {
    const item = pending.items[0];
    const editIdx = state.songs.findIndex(s => s.id === pending.editingSongId);
    if (editIdx !== -1) {
      if (policy === 'keep-both') {
        const others = state.songs.filter(s => s.id !== pending.editingSongId);
        const disambiguated = generateDisambiguatedTitleAndRaw(item.title, item.artist, item.rawText, item.lang, others);
        state.songs[editIdx] = {
          ...state.songs[editIdx],
          title: disambiguated.title,
          artist: item.artist,
          url: item.url,
          rawText: disambiguated.rawText,
          updatedAt: Date.now()
        };
        state.currentSongId = state.songs[editIdx].id;
        const saved = saveLibraryToStorage();
        loadCurrentSong();
        closeSheet('conflictSheet');
        if (saved) showToast(UI_TEXT.savedRenamedToast, disambiguated.title);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (policy === 'overwrite') {
        const conflictTargetId = pending.conflicts[0]?.existingId;
        const targetIdx = state.songs.findIndex(s => s.id === conflictTargetId);
        if (targetIdx !== -1 && targetIdx !== editIdx) {
          const updatedText = replaceOrPrependTitleInRawText(item.rawText, item.title);
          state.songs[targetIdx] = {
            ...state.songs[targetIdx],
            title: item.title,
            artist: item.artist || state.songs[targetIdx].artist,
            url: item.url || state.songs[targetIdx].url,
            rawText: updatedText,
            updatedAt: Date.now()
          };
          const targetId = state.songs[targetIdx].id;
          state.songs.splice(editIdx, 1);
          state.currentSongId = targetId;
          const saved = saveLibraryToStorage();
          loadCurrentSong();
          closeSheet('conflictSheet');
          if (saved) showToast(UI_TEXT.overwrittenExistingToast, item.title);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
    }
  }

  const result = mergeSongsIntoLibrary(pending.items, { conflictPolicy: policy });
  if (result.firstTargetId) state.currentSongId = result.firstTargetId;
  const saved = saveLibraryToStorage();
  loadCurrentSong();
  renderLibraryList();

  if (pending.sourceType === 'json-file' && pending.returnSheetId === 'songsSheet') {
    openSheet('songsSheet');
  } else {
    closeSheet('conflictSheet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (saved) {
    if (pending.items.length === 1) {
      const activeSong = state.songs.find(s => s.id === state.currentSongId);
      const displayTitle = activeSong ? activeSong.title : pending.items[0].title;
      if (result.renamed > 0) {
        showToast(UI_TEXT.addedRenamedToast, displayTitle);
      } else if (result.updated > 0) {
        showToast(UI_TEXT.overwrittenExistingToast, displayTitle);
      } else {
        showToast(UI_TEXT.addedNewToast, displayTitle);
      }
    } else {
      showToast(UI_TEXT.importedCountTitle(pending.items.length), formatMergeSummary(result));
    }
  }
}

function cancelConflictResolution() {
  const pending = state.pendingConflict;
  state.pendingConflict = null;
  if (pending && pending.returnSheetId) {
    openSheet(pending.returnSheetId);
  } else {
    closeSheet('conflictSheet');
  }
}

async function copyTextSafe(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {}
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  let copied = false;
  try { copied = Boolean(document.execCommand('copy')); } catch (e) {}
  document.body.removeChild(ta);
  return copied;
}

// ============================================================================
// Web Share API（OS標準の共有シート連携）ヘルパー
// ============================================================================
let cachedCanShareFiles = null;
let isSharingInProgress = false;

function canShareText() {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

function canShareFiles() {
  if (cachedCanShareFiles !== null) return cachedCanShareFiles;
  if (!canShareText() || typeof navigator.canShare !== 'function' || typeof File !== 'function') {
    cachedCanShareFiles = false;
    return false;
  }
  try {
    const jsonTest = new File(['{}'], 'test.json', { type: 'application/json' });
    if (navigator.canShare({ files: [jsonTest] })) {
      cachedCanShareFiles = true;
      return true;
    }
    const txtTest = new File(['test'], 'test.txt', { type: 'text/plain' });
    cachedCanShareFiles = Boolean(navigator.canShare({ files: [txtTest] }));
    return cachedCanShareFiles;
  } catch (e) {
    cachedCanShareFiles = false;
    return false;
  }
}

function initWebShareUI() {
  const textSupported = canShareText();
  const fileSupported = canShareFiles();
  document.querySelectorAll('[data-share-support="text"]').forEach(el => {
    el.hidden = !textSupported;
  });
  document.querySelectorAll('[data-share-support="file"]').forEach(el => {
    el.hidden = !fileSupported;
  });
}

async function shareTextSafe({ title = '', text = '' } = {}) {
  if (!canShareText() || !text) return 'failed';
  if (isSharingInProgress) return 'aborted';
  isSharingInProgress = true;
  try {
    const shareData = title ? { title, text } : { text };
    await navigator.share(shareData);
    return 'shared';
  } catch (err) {
    if (err && (err.name === 'AbortError' || err.name === 'InvalidStateError')) {
      return 'aborted';
    }
    return 'failed';
  } finally {
    isSharingInProgress = false;
  }
}

async function shareFileSafe({ content, filename, mimeType = 'text/plain', title = '' } = {}) {
  if (!canShareFiles() || !content || !filename) return 'failed';
  if (isSharingInProgress) return 'aborted';

  let targetFile = null;
  try {
    const primaryFile = new File([content], filename, { type: mimeType });
    if (navigator.canShare({ files: [primaryFile] })) {
      targetFile = primaryFile;
    } else if (mimeType !== 'text/plain') {
      const plainFile = new File([content], filename, { type: 'text/plain' });
      if (navigator.canShare({ files: [plainFile] })) {
        targetFile = plainFile;
      }
    }
  } catch (e) {
    return 'failed';
  }

  if (!targetFile) return 'failed';

  isSharingInProgress = true;
  try {
    const shareData = title ? { files: [targetFile], title } : { files: [targetFile] };
    await navigator.share(shareData);
    return 'shared';
  } catch (err) {
    if (err && (err.name === 'AbortError' || err.name === 'InvalidStateError')) {
      return 'aborted';
    }
    return 'failed';
  } finally {
    isSharingInProgress = false;
  }
}

function askDeleteSong(songId) {
  if (state.songs.length <= 1) {
    showToast(UI_TEXT.minOneSongToast);
    return;
  }
  const target = state.songs.find(s => s.id === songId);
  if (!target) return;
  state.pendingDeleteSongId = songId;
  document.getElementById('confirmMessage').textContent = UI_TEXT.confirmDeleteMessage(target.title);
  openSheet('confirmSheet');
}

function confirmDeleteSong() {
  const songId = state.pendingDeleteSongId;
  state.pendingDeleteSongId = null;
  if (!songId || state.songs.length <= 1) {
    closeSheet('confirmSheet');
    return;
  }
  const target = state.songs.find(s => s.id === songId);
  state.deletedIds.add(songId);
  if (target) {
    state.deletedIds.add(getSongIdentityKey(target.title, target.artist, target.rawText));
  }
  state.selectedSongIds.delete(songId);
  state.songs = state.songs.filter(s => s.id !== songId);
  if (state.currentSongId === songId) {
    state.currentSongId = state.songs[0].id;
  }
  saveLibraryToStorage();
  loadCurrentSong();
  closeSheet('confirmSheet');
  showToast(UI_TEXT.deletedSongToast);
}

function openSongEditor(songId = null) {
  state.editingSongId = songId;
  const titleEl = document.getElementById('editorModalTitle');
  const titleInput = document.getElementById('songTitleInput');
  const artistInput = document.getElementById('songArtistInput');
  const urlInput = document.getElementById('songUrlInput');
  const rawInput = document.getElementById('rawLyricsInput');
  const metaFields = document.getElementById('editorSingleMetaFields');

  delete titleInput.dataset.manual;
  delete artistInput.dataset.manual;
  delete urlInput.dataset.manual;
  if (metaFields) metaFields.hidden = false;

  if (songId) {
    const song = state.songs.find(s => s.id === songId);
    if (song) {
      const parsed = parseLyricsMaterial(song.rawText);
      titleEl.textContent = UI_TEXT.editorTitleEdit;
      titleInput.value = song.title || '';
      artistInput.value = song.artist || '';
      urlInput.value = song.url || parsed.detectedUrl || '';
      rawInput.value = song.rawText || '';
      titleInput.dataset.manual = '1';
      artistInput.dataset.manual = '1';
      urlInput.dataset.manual = '1';
    }
  } else {
    titleEl.textContent = UI_TEXT.editorTitleNew;
    titleInput.value = '';
    artistInput.value = '';
    urlInput.value = '';
    rawInput.value = '';
  }

  updateEditorLiveStatus(false);
  openSheet('editorSheet');
}

function updateEditorLiveStatus(autoFillMeta = true) {
  const raw = document.getElementById('rawLyricsInput').value;
  const titleInput = document.getElementById('songTitleInput');
  const artistInput = document.getElementById('songArtistInput');
  const urlInput = document.getElementById('songUrlInput');
  const statusEl = document.getElementById('editorParseStatus');
  const metaFields = document.getElementById('editorSingleMetaFields');
  const btnSave = document.getElementById('btnSaveSong');

  if (!raw.trim()) {
    if (metaFields) metaFields.hidden = false;
    if (btnSave) btnSave.textContent = UI_TEXT.btnSaveDefault;
    statusEl.textContent = '';
    statusEl.className = 'parse-status';
    return;
  }

  const detection = parseMultiOrSingleInput(raw);

  if (!state.editingSongId && (detection.mode === 'json' || detection.mode === 'multi-text') && detection.songs.length >= 1) {
    if (metaFields) metaFields.hidden = detection.songs.length >= 2;
    if (btnSave) btnSave.textContent = detection.songs.length >= 2 ? UI_TEXT.btnSaveMulti(detection.songs.length) : UI_TEXT.btnSaveDefault;
    const previewTitles = detection.songs.slice(0, 3).map(s => `「${s.title || UI_TEXT.untitledShort}」`).join('');
    const hasMore = detection.songs.length > 3;
    const inspection = inspectIncomingSongs(detection.songs);
    if (inspection.conflicts.length > 0) {
      statusEl.textContent = UI_TEXT.multiConflictWarn(detection.songs.length, inspection.conflicts.length);
      statusEl.className = 'parse-status warn';
    } else {
      statusEl.textContent = UI_TEXT.multiDetectedOk(detection.songs.length, previewTitles, hasMore);
      statusEl.className = 'parse-status ok';
    }
    return;
  }

  if (metaFields) metaFields.hidden = false;
  if (btnSave) btnSave.textContent = UI_TEXT.btnSaveDefault;

  if (autoFillMeta) {
    const titleMatch = raw.match(/^【(?:タイトル|曲名|Title)】\s*(.+)$/im);
    if (titleMatch && !titleInput.dataset.manual) titleInput.value = titleMatch[1].trim();

    const artistMatch = raw.match(/^【(?:出典|著者|作者|歌手|アーティスト|Artist|Author|Source)】\s*(.+)$/im);
    if (artistMatch && !artistInput.dataset.manual) artistInput.value = artistMatch[1].trim();

    const urlMatch = raw.match(/^【(?:URL|リンク|Link|参考URL)】\s*(.+)$/im);
    if (urlMatch && !urlInput.dataset.manual) urlInput.value = urlMatch[1].trim();
  }

  const parsed = detection.parsed || parseLyricsMaterial(raw);
  if (parsed.lines.length > 0) {
    const vocabCount = parsed.lines.reduce((acc, l) => acc + l.vocabList.length, 0);
    const modeLabel = getLangConfig(parsed.detectedLang).editorLabel;
    const effTitle = titleInput.value.trim() || parsed.detectedTitle || parsed.lines[0].plainSentence.slice(0, 18);
    const effArtist = artistInput.value.trim() || parsed.detectedArtist || '';
    const key = getSongIdentityKey(effTitle, effArtist, raw, parsed.detectedLang);
    const dupSong = state.songs.find(s =>
      (!state.editingSongId || s.id !== state.editingSongId) &&
      getSongIdentityKey(s.title, s.artist, s.rawText) === key
    );

    if (dupSong) {
      const isSameBody = isSameSongContent(dupSong, { title: effTitle, artist: effArtist, url: urlInput.value.trim(), rawText: raw });
      if (isSameBody) {
        statusEl.textContent = UI_TEXT.singleDuplicateSameOk(parsed.lines.length, vocabCount, modeLabel, dupSong.title);
        statusEl.className = 'parse-status ok';
      } else {
        statusEl.textContent = UI_TEXT.singleDuplicateConflictWarn(dupSong.title);
        statusEl.className = 'parse-status warn';
      }
    } else {
      statusEl.textContent = UI_TEXT.singleDetectedOk(parsed.lines.length, vocabCount, modeLabel);
      statusEl.className = 'parse-status ok';
    }
  } else {
    statusEl.textContent = UI_TEXT.singleNoRubyErr;
    statusEl.className = 'parse-status err';
  }
}

function saveSongFromEditor() {
  const raw = document.getElementById('rawLyricsInput').value.trim();
  const statusEl = document.getElementById('editorParseStatus');

  if (!raw) {
    statusEl.textContent = UI_TEXT.emptyRawErr;
    statusEl.className = 'parse-status err';
    return;
  }

  const detection = parseMultiOrSingleInput(raw);
  if (detection.songs.length === 0) {
    statusEl.textContent = UI_TEXT.noValidLinesErr;
    statusEl.className = 'parse-status err';
    return;
  }

  if (!state.editingSongId && (detection.mode === 'json' || detection.mode === 'multi-text') && detection.songs.length >= 2) {
    const inspection = inspectIncomingSongs(detection.songs);
    if (inspection.conflicts.length > 0) {
      openConflictDialog({
        items: detection.songs,
        conflicts: inspection.conflicts,
        newCount: inspection.newItems.length,
        returnSheetId: 'editorSheet',
        sourceType: 'multi-editor'
      });
      return;
    }
    const result = mergeSongsIntoLibrary(detection.songs, { conflictPolicy: 'overwrite' });
    if (result.firstTargetId) state.currentSongId = result.firstTargetId;
    const saved = saveLibraryToStorage();
    loadCurrentSong();
    closeSheet('editorSheet');
    if (saved) showToast(UI_TEXT.batchImportDoneTitle(detection.songs.length), formatMergeSummary(result));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const singleItem = detection.songs[0];
  const parsed = detection.parsed || parseLyricsMaterial(singleItem.rawText);
  let title = document.getElementById('songTitleInput').value.trim() || singleItem.title || parsed.detectedTitle;
  let artist = document.getElementById('songArtistInput').value.trim() || singleItem.artist || parsed.detectedArtist;
  let url = document.getElementById('songUrlInput').value.trim() || singleItem.url || parsed.detectedUrl;
  if (!title) title = parsed.lines[0].plainSentence.slice(0, 18);

  const candidateItems = [{ title, artist, url, rawText: singleItem.rawText }];
  const inspection = inspectIncomingSongs(candidateItems, { excludeSongId: state.editingSongId });

  if (inspection.conflicts.length > 0) {
    openConflictDialog({
      items: candidateItems,
      conflicts: inspection.conflicts,
      newCount: inspection.newItems.length,
      returnSheetId: 'editorSheet',
      sourceType: 'single-editor',
      editingSongId: state.editingSongId
    });
    return;
  }

  if (state.editingSongId) {
    const idx = state.songs.findIndex(s => s.id === state.editingSongId);
    if (idx !== -1) {
      state.songs[idx] = {
        ...state.songs[idx],
        title, artist, url, rawText: singleItem.rawText, updatedAt: Date.now()
      };
      state.currentSongId = state.songs[idx].id;
    }
    const saved = saveLibraryToStorage();
    loadCurrentSong();
    closeSheet('editorSheet');
    if (saved) showToast(UI_TEXT.savedChangesToast, title);
  } else {
    const result = mergeSongsIntoLibrary(candidateItems, { conflictPolicy: 'overwrite' });
    if (result.firstTargetId) state.currentSongId = result.firstTargetId;
    const saved = saveLibraryToStorage();
    loadCurrentSong();
    closeSheet('editorSheet');
    if (saved) {
      if (result.skipped > 0) {
        showToast(UI_TEXT.alreadyRegisteredToast, title);
      } else {
        showToast(UI_TEXT.addedNewToast, title);
      }
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildSongsJsonPayload(songsToExport, filePrefix = 'ruby_text_library') {
  const dataStr = JSON.stringify(songsToExport, null, 2);
  const dateStr = new Date().toISOString().slice(0, 10);
  return {
    dataStr,
    filename: `${filePrefix}_${dateStr}.json`
  };
}

function exportSongsJsonFile(songsToExport, filePrefix = 'ruby_text_library') {
  const payload = buildSongsJsonPayload(songsToExport, filePrefix);
  const blob = new Blob([payload.dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = payload.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(UI_TEXT.exportedJsonToastTitle, UI_TEXT.itemCountSub(songsToExport.length));
}

async function shareSongsJsonFile(songsToExport, filePrefix = 'ruby_text_library') {
  const payload = buildSongsJsonPayload(songsToExport, filePrefix);
  const status = await shareFileSafe({
    content: payload.dataStr,
    filename: payload.filename,
    mimeType: 'application/json',
    title: UI_TEXT.shareJsonFileTitle(songsToExport.length)
  });
  if (status === 'shared') {
    showToast(UI_TEXT.sharedJsonToastTitle, UI_TEXT.itemCountSub(songsToExport.length));
  } else if (status === 'failed') {
    showToast(UI_TEXT.shareJsonUnsupportedTitle, UI_TEXT.shareJsonUnsupportedSub);
  }
  return status;
}

function exportLibraryJson() {
  exportSongsJsonFile(state.songs, 'ruby_text_library');
}

async function shareLibraryJson() {
  await shareSongsJsonFile(state.songs, 'ruby_text_library');
}

function importLibraryJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const textContent = String(e.target.result || '');
      const detection = parseMultiOrSingleInput(textContent);
      if (detection.songs.length === 0) {
        showToast(UI_TEXT.noValidDataInFileToast);
        return;
      }

      const inspection = inspectIncomingSongs(detection.songs);
      if (inspection.conflicts.length > 0) {
        openConflictDialog({
          items: detection.songs,
          conflicts: inspection.conflicts,
          newCount: inspection.newItems.length,
          returnSheetId: activeSheetId || 'songsSheet',
          sourceType: 'json-file'
        });
        return;
      }

      const result = mergeSongsIntoLibrary(detection.songs, { conflictPolicy: 'overwrite' });
      if (result.firstTargetId) state.currentSongId = result.firstTargetId;
      const saved = saveLibraryToStorage();
      loadCurrentSong();
      renderLibraryList();
      if (saved) showToast(UI_TEXT.mergedJsonToastTitle(detection.songs.length), formatMergeSummary(result));
    } catch (err) {
      showToast(UI_TEXT.fileReadErrorToast);
    }
  };
  reader.onerror = () => {
    showToast(UI_TEXT.fileReadErrorToast);
  };
  reader.readAsText(file);
}

// ============================================================================
// 10. AIプロンプトプレビュー更新（テンプレート定義は content-data.js）
// ============================================================================
function updateGeneratedPrompt() {
  const userLyrics = document.getElementById('promptSourceLyrics').value;
  document.getElementById('promptPreviewBox').value = buildPromptText(state.promptLangMode, userLyrics, state.uiLang);
}

// ============================================================================
// 11. イベント委譲＆キーボードショートカット＆オンライン状態監視
// ============================================================================
function setupEvents() {
  document.addEventListener('click', async (e) => {
    // 1) 歌詞の単語/文字タップ
    if (getEffectiveTapMode() === 'char') {
      const chEl = e.target.closest('.ch[data-line]');
      if (chEl) {
        const lIdx = Number(chEl.dataset.line);
        const wgIdx = Number(chEl.dataset.wg);
        const cIdx = Number(chEl.dataset.ch);
        const wg = state.lyricsData[lIdx]?.wordGroups[wgIdx];
        const tok = wg?.tokens[cIdx];
        if (tok) {
          state.activeLineIdx = lIdx;
          updateActiveLineDOM();
          flashElement(chEl);
          const note = wg.vocabInfo ? `${wg.vocabInfo.word}：${wg.vocabInfo.meaning}` : '';
          speakText(tok.char, tok.zhuyin, note);
        }
        return;
      }
    } else {
      const wordEl = e.target.closest('.word[data-line]');
      if (wordEl) {
        const lIdx = Number(wordEl.dataset.line);
        const wgIdx = Number(wordEl.dataset.wg);
        const wg = state.lyricsData[lIdx]?.wordGroups[wgIdx];
        if (wg && !wg.isPunct) {
          state.activeLineIdx = lIdx;
          updateActiveLineDOM();
          if (wg.spanId) {
            const spanEls = document.querySelectorAll(`.word[data-line="${lIdx}"][data-span="${wg.spanId}"]`);
            flashElement(spanEls.length > 0 ? spanEls : wordEl);
            const note = wg.vocabInfo ? wg.vocabInfo.meaning : '';
            speakText(wg.spanText || wg.text, wg.spanZhuyin || wg.zhuyin, note);
          } else {
            flashElement(wordEl);
            const note = wg.vocabInfo ? wg.vocabInfo.meaning : '';
            speakText(wg.text, wg.zhuyin, note);
          }
        }
        return;
      }
    }

    // 2) data-action ボタン
    const actEl = e.target.closest('[data-action]');
    if (!actEl) return;
    const action = actEl.dataset.action;

    switch (action) {
      case 'open-sheet':
        openSheet(actEl.dataset.sheet);
        break;
      case 'close-sheet':
        closeSheet();
        break;
      case 'new-song':
        openSongEditor(null);
        break;
      case 'edit-current-song':
        openSongEditor(state.currentSongId);
        break;
      case 'copy-current-song': {
        const song = state.songs.find(s => s.id === state.currentSongId);
        if (song) {
          const ok = await copyTextSafe(buildFormattedSongText(song));
          closeSheet();
          if (ok) {
            showToast(UI_TEXT.copiedCurrentSongTitle, UI_TEXT.shareHintSub);
          } else {
            showToast(UI_TEXT.copyFailedToast);
          }
        }
        break;
      }
      case 'share-current-song': {
        const song = state.songs.find(s => s.id === state.currentSongId);
        if (song) {
          const status = await shareTextSafe({
            title: song.title || 'Ruby Text Player',
            text: buildFormattedSongText(song)
          });
          if (status === 'shared') {
            closeSheet();
            showToast(UI_TEXT.sharedCurrentSongTitle, song.title);
          } else if (status === 'failed') {
            showToast(UI_TEXT.shareFailedTitle, UI_TEXT.shareCurrentSongFailedSub);
          }
        }
        break;
      }
      case 'select-song':
        selectSong(actEl.dataset.id);
        closeSheet();
        break;
      case 'toggle-select-mode':
        state.isSelectMode = !state.isSelectMode;
        if (!state.isSelectMode) state.selectedSongIds.clear();
        renderLibraryList();
        break;
      case 'toggle-select-song': {
        const id = actEl.dataset.id;
        if (id) {
          if (state.selectedSongIds.has(id)) {
            state.selectedSongIds.delete(id);
          } else {
            state.selectedSongIds.add(id);
          }
          renderLibraryList();
        }
        break;
      }
      case 'select-all-songs':
        if (state.selectedSongIds.size === state.songs.length && state.songs.length > 0) {
          state.selectedSongIds.clear();
        } else {
          state.songs.forEach(s => state.selectedSongIds.add(s.id));
        }
        renderLibraryList();
        break;
      case 'export-selected-json': {
        const selected = state.songs.filter(s => state.selectedSongIds.has(s.id));
        if (selected.length === 0) {
          showToast(UI_TEXT.selectSongsToSaveToast);
          break;
        }
        exportSongsJsonFile(selected, `ruby_text_selected_${selected.length}items`);
        state.isSelectMode = false;
        state.selectedSongIds.clear();
        renderLibraryList();
        break;
      }
      case 'share-selected-json': {
        const selected = state.songs.filter(s => state.selectedSongIds.has(s.id));
        if (selected.length === 0) {
          showToast(UI_TEXT.selectSongsToShareToast);
          break;
        }
        const status = await shareSongsJsonFile(selected, `ruby_text_selected_${selected.length}items`);
        if (status === 'shared') {
          state.isSelectMode = false;
          state.selectedSongIds.clear();
          renderLibraryList();
        }
        break;
      }
      case 'paste-clipboard': {
        const rawInput = document.getElementById('rawLyricsInput');
        if (navigator.clipboard && navigator.clipboard.readText) {
          try {
            const clipText = await navigator.clipboard.readText();
            if (clipText && clipText.trim()) {
              rawInput.value = clipText;
              updateEditorLiveStatus(true);
              showToast(UI_TEXT.pastedClipboardToast);
            } else {
              showToast(UI_TEXT.emptyClipboardToast);
            }
          } catch (err) {
            rawInput.focus();
            showToast(UI_TEXT.manualPasteHintToast);
          }
        } else {
          rawInput.focus();
          showToast(UI_TEXT.manualPasteHintToast);
        }
        break;
      }
      case 'copy-song': {
        const song = state.songs.find(s => s.id === actEl.dataset.id);
        if (song) {
          const ok = await copyTextSafe(buildFormattedSongText(song));
          if (ok) {
            showToast(UI_TEXT.copiedSongTitle(song.title), UI_TEXT.shareHintSub);
          } else {
            showToast(UI_TEXT.copyFailedToast);
          }
        }
        break;
      }
      case 'share-song': {
        const song = state.songs.find(s => s.id === actEl.dataset.id);
        if (song) {
          const status = await shareTextSafe({
            title: song.title || 'Ruby Text Player',
            text: buildFormattedSongText(song)
          });
          if (status === 'shared') {
            showToast(UI_TEXT.sharedSongTitle(song.title));
          } else if (status === 'failed') {
            showToast(UI_TEXT.shareFailedTitle, UI_TEXT.shareSongFailedSub);
          }
        }
        break;
      }
      case 'edit-song':
        openSongEditor(actEl.dataset.id);
        break;
      case 'ask-delete-song':
        askDeleteSong(actEl.dataset.id);
        break;
      case 'confirm-delete':
        confirmDeleteSong();
        break;
      case 'resolve-conflict':
        resolveConflictWithPolicy(actEl.dataset.policy || 'keep-both');
        break;
      case 'cancel-conflict':
        cancelConflictResolution();
        break;
      case 'export-json':
        exportLibraryJson();
        break;
      case 'share-json':
        await shareLibraryJson();
        break;
      case 'fill-sample': {
        const tIn = document.getElementById('songTitleInput');
        const aIn = document.getElementById('songArtistInput');
        const uIn = document.getElementById('songUrlInput');
        delete tIn.dataset.manual;
        delete aIn.dataset.manual;
        delete uIn.dataset.manual;
        tIn.value = '';
        aIn.value = '';
        uIn.value = '';
        document.getElementById('rawLyricsInput').value = (state.uiLang === 'en' && typeof DEFAULT_RAW_TEXT_EN === 'string')
          ? DEFAULT_RAW_TEXT_EN
          : DEFAULT_RAW_TEXT;
        updateEditorLiveStatus(true);
        break;
      }
      case 'save-song':
        saveSongFromEditor();
        break;
      case 'set-ui-lang': {
        const nextLang = actEl.dataset.value === 'en' ? 'en' : 'ja';
        if (state.uiLang !== nextLang) {
          state.uiLang = nextLang;
          saveSettings();
          applyUiLanguage(true);
        }
        break;
      }
      case 'cycle-ui-lang': {
        state.uiLang = state.uiLang === 'en' ? 'ja' : 'en';
        saveSettings();
        applyUiLanguage(true);
        showToast(state.uiLang === 'en' ? 'Language: English' : '表示言語：日本語');
        break;
      }
      case 'set-prompt-lang':
        state.promptLangMode = actEl.dataset.value;
        document.querySelectorAll('[data-action="set-prompt-lang"]').forEach(b => {
          b.setAttribute('aria-pressed', String(b.dataset.value === state.promptLangMode));
        });
        updateGeneratedPrompt();
        break;
      case 'copy-prompt': {
        const ok = await copyTextSafe(document.getElementById('promptPreviewBox').value);
        if (ok) {
          showToast(UI_TEXT.copiedPromptTitle, UI_TEXT.copiedPromptSub);
        } else {
          showToast(UI_TEXT.copyFailedToast);
        }
        break;
      }
      case 'share-prompt': {
        const promptText = document.getElementById('promptPreviewBox').value;
        const status = await shareTextSafe({
          title: UI_TEXT.sharePromptDocTitle,
          text: promptText
        });
        if (status === 'shared') {
          showToast(UI_TEXT.sharedPromptToast);
        } else if (status === 'failed') {
          showToast(UI_TEXT.shareFailedTitle, UI_TEXT.sharePromptFailedSub);
        }
        break;
      }
      case 'copy-prompt-and-add': {
        const ok = await copyTextSafe(document.getElementById('promptPreviewBox').value);
        if (!document.getElementById('rawLyricsInput').value.trim()) {
          openSongEditor(state.editingSongId);
        } else {
          openSheet('editorSheet');
        }
        if (ok) {
          showToast(UI_TEXT.copiedPromptTitle, UI_TEXT.copiedPromptForAddSub);
        } else {
          showToast(UI_TEXT.copyFailedToast);
        }
        break;
      }
      case 'set-theme':
        state.theme = actEl.dataset.value;
        applyTheme();
        syncControlsUI();
        saveSettings();
        break;
      case 'set-font':
        state.fontSize = actEl.dataset.value;
        applyFontSize();
        syncControlsUI();
        saveSettings();
        break;
      case 'set-tap':
        state.tapMode = actEl.dataset.value;
        syncControlsUI();
        saveSettings();
        renderLyrics();
        break;
      case 'toggle-display': {
        const target = actEl.dataset.target;
        if (target === 'zhuyin') state.showZhuyin = !state.showZhuyin;
        if (target === 'pinyin') state.showPinyin = !state.showPinyin;
        if (target === 'trans') state.showTrans = !state.showTrans;
        syncControlsUI();
        saveSettings();
        renderLyrics();
        break;
      }
      case 'test-voice': {
        const sample = getLangConfig(state.currentSongLang).sample;
        if (sample) {
          speakText(sample.text, sample.ruby, sample.note);
        }
        break;
      }
      case 'cycle-speed': {
        const speeds = [1.0, 0.8, 0.6];
        state.speechRate = speeds[(speeds.indexOf(state.speechRate) + 1) % speeds.length];
        syncControlsUI();
        saveSettings();
        showToast(UI_TEXT.speedChangedToast(state.speechRate.toFixed(1)));
        break;
      }
      case 'toggle-all-notes':
        state.allNotesExpanded = !state.allNotesExpanded;
        state.lyricsData.forEach(l => { l.isOpen = state.allNotesExpanded; });
        renderLyrics();
        showToast(state.allNotesExpanded ? UI_TEXT.allNotesOpenedToast : UI_TEXT.allNotesClosedToast);
        break;
      case 'toggle-note': {
        const lIdx = Number(actEl.dataset.line);
        const line = state.lyricsData[lIdx];
        if (line) {
          line.isOpen = !line.isOpen;
          actEl.setAttribute('aria-expanded', String(line.isOpen));
          const panel = document.getElementById(`note-panel-${lIdx}`);
          if (panel) panel.hidden = !line.isOpen;
        }
        break;
      }
      case 'play-line':
        playFullLine(Number(actEl.dataset.line));
        break;
      case 'speak-vocab': {
        const lIdx = Number(actEl.dataset.line);
        const vIdx = Number(actEl.dataset.vocab);
        const v = state.lyricsData[lIdx]?.vocabList[vIdx];
        if (v) {
          state.activeLineIdx = lIdx;
          updateActiveLineDOM();
          const cleanSpeakWord = v.word.replace(/^[~～\-]+/, '').trim() || v.word;
          speakText(cleanSpeakWord, v.pinyin, v.meaning);
        }
        break;
      }
      case 'prev-line':
        stepLine(-1);
        break;
      case 'next-line':
        stepLine(1);
        break;
      case 'toggle-play-all':
        togglePlayAll();
        break;
      case 'dismiss-hint':
        state.hintDismissed = true;
        syncControlsUI();
        saveSettings();
        break;
    }
  });

  // 入力イベント
  document.getElementById('rawLyricsInput').addEventListener('input', () => updateEditorLiveStatus(true));
  ['songTitleInput', 'songArtistInput', 'songUrlInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        if (el.value.trim()) {
          el.dataset.manual = '1';
        } else {
          delete el.dataset.manual;
        }
        updateEditorLiveStatus(false);
      });
    }
  });
  document.getElementById('promptSourceLyrics').addEventListener('input', updateGeneratedPrompt);
  document.getElementById('voiceSelect').addEventListener('change', (e) => {
    const lang = state.currentSongLang || 'zh-TW';
    state.selectedVoiceByLang[lang] = e.target.value;
    if (lang === 'zh-TW') state.selectedVoiceURI = e.target.value;
    saveSettings();
  });
  document.getElementById('jsonFileInput').addEventListener('change', (e) => {
    importLibraryJson(e.target.files[0]);
    e.target.value = '';
  });

  // キーボード操作（Escでシートを閉じる、Spaceで再生/停止、上下矢印で行移動）
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeSheetId) {
      e.preventDefault();
      if (activeSheetId === 'conflictSheet') {
        cancelConflictResolution();
      } else {
        closeSheet();
      }
      return;
    }
    if (activeSheetId) return;
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlayAll();
    } else if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault();
      stepLine(1);
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault();
      stepLine(-1);
    }
  });

  // オンライン / オフライン表示の自動切り替え
  const updateNetStatus = () => {
    const pill = document.getElementById('offlinePill');
    if (pill) pill.hidden = navigator.onLine !== false;
  };
  window.addEventListener('online', updateNetStatus);
  window.addEventListener('offline', updateNetStatus);
  updateNetStatus();
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

window.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  initWebShareUI();
  setupEvents();
  initLibrary();
});
