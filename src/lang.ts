export interface Language {
    englishName: string,
    nativeName: string,
    code: string,
    dir?: string
}

const ENGLISH: Language = {
    englishName: "English",
    nativeName: "English",
    code: "en"
};

const ARABIC: Language = {
    englishName: "Arabic",
    nativeName: "العربية",
    code: "ar",
    dir: "rtl"
};

export const LanguageMap: Record<string, Language> = {
    "en": ENGLISH,
    "ar": ARABIC
}