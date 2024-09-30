/**
 * Holds all the needed information about a language, such as its name,
 * direction it's written, its code, etc.
 */
export interface Language {
    /** The name of the language in English. */
    englishName: string,
    /** 
     * The name of the language in its own language.
     * Example: Spanish's name would be "Español".
    */
    nativeName: string,
    /** 
     * The language's two-letter code.
     * Example: Spanish's code is "es".
     * English's code is "en".
    */
    code: string,
    /**
     * The direction that the language is written from.
     * This is for the HTML dir attribute, where a language is either written
     * from left-to-right (LTR) or from right-to-left (RTL). Since most languages
     * are written from LTR, this property is optional. Any JSX element
     * that references the dir attribute will have its value set to
     * "ltr" by default. Nevertheless, it's useful for languages
     * written in the other direction, such as Arabic.
     */
    dir?: string
}

/** Representation of English. */
const ENGLISH: Language = {
    englishName: "English",
    nativeName: "English",
    code: "en"
};

/** Representation of Arabic. */
const ARABIC: Language = {
    englishName: "Arabic",
    nativeName: "العربية",
    code: "ar",
    dir: "rtl"
};

/** Representation of Amharic. */
const AMHARIC: Language = {
    englishName: "Amharic",
    nativeName: "አማርኛ",
    code: "am"
};

/** Representation of French. */
const FRENCH: Language = {
    englishName: "French",
    nativeName: "Français",
    code: "fr"
};

/** Representation of German. */
const GERMAN: Language = {
    englishName: "German",
    nativeName: "Deutsch",
    code: "de"
};

/** Representation of Hindi. */
const HINDI: Language = {
    englishName: "Hindi",
    nativeName: "हिन्दी",
    code: "hi"
};

/** Representation of Indonesian. */
const INDONESIAN: Language = {
    englishName: "Indonesian",
    nativeName: "Bahasa Indonesia",
    code: "id"
};

/** Representation of Japanese. */
const JAPANESE: Language = {
    englishName: "Japanese",
    nativeName: "日本語",
    code: "ja"
};

/** Representation of Mandarin Chinese. */
const MANDARIN: Language = {
    englishName: "Mandarin Chinese",
    nativeName: "中文",
    code: "zh"
};

/** Representation of Malay. */
const MALAY: Language = {
    englishName: "Malay",
    nativeName: "Bahasa Melayu",
    code: "ms"
};

/** Representation of Oromo. */
const OROMO: Language = {
    englishName: "Oromo",
    nativeName: "Afaan Oromoo",
    code: "om"
};

/** Representation of Portuguese. */
const PORTUGUESE: Language = {
    englishName: "Portuguese",
    nativeName: "Português",
    code: "pt"
};

/** Representation of Russian. */
const RUSSIAN: Language = {
    englishName: "Russian",
    nativeName: "Русский",
    code: "ru"
};

/** Representation of Somali. */
const SOMALI: Language = {
    englishName: "Somali",
    nativeName: "Soomaaliga",
    code: "so"
};

/** Representation of Turkish. */
const TURKISH: Language = {
    englishName: "Turkish",
    nativeName: "Türkçe",
    code: "tr"
};

/** Representation of Urdu. */
const URDU: Language = {
    englishName: "Urdu",
    nativeName: "اردو",
    code: "ur",
    dir: "rtl"
};

/** Representation of Spanish. */
const SPANISH: Language = {
    englishName: "Spanish",
    nativeName: "Español",
    code: "es"
};

/** Representation of Bengali. */
const BENGALI: Language = {
    englishName: "Bengali",
    nativeName: "বাংলা",
    code: "bn"
};

/** Representation of Dutch. */
const DUTCH: Language = {
    englishName: "Dutch",
    nativeName: "Nederlands",
    code: "nl"
};

/** Representation of Italian. */
const ITALIAN: Language = {
    englishName: "Italian",
    nativeName: "Italiano",
    code: "it"
};

/** Representation of Korean. */
const KOREAN: Language = {
    englishName: "Korean",
    nativeName: "한국어",
    code: "ko"
};

/** Representation of Vietnamese. */
const VIETNAMESE: Language = {
    englishName: "Vietnamese",
    nativeName: "Tiếng Việt",
    code: "vi"
};

/** Representation of Ukrainian. */
const UKRAINIAN: Language = {
    englishName: "Ukrainian",
    nativeName: "українська",
    code: "uk"
};

/**
 * List of languages available.
 */
export const LanguageMap: Record<string, Language> = {
    "en": ENGLISH,
    "ar": ARABIC,
    "am": AMHARIC,
    "bn": BENGALI,
    "de": GERMAN,
    "es": SPANISH,
    "fr": FRENCH,
    "hi": HINDI,
    "id": INDONESIAN,
    "it": ITALIAN,
    "ja": JAPANESE,
    "ko": KOREAN,
    "ms": MALAY,
    "nl": DUTCH,
    "om": OROMO,
    "pt": PORTUGUESE,
    "ru": RUSSIAN,
    "so": SOMALI,
    "tr": TURKISH,
    "uk": UKRAINIAN,
    "ur": URDU,
    "vi": VIETNAMESE,
    "zh": MANDARIN,
};
