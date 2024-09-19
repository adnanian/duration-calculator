import React, { ChangeEventHandler } from "react";
import { Language, LanguageMap } from "../lang";
import { useTranslation } from "react-i18next";
import "../styles/Header.css";

/**
 * TODO
 */
interface TopPageManagement {
    targetLanguage: Language,
    onLanguageSelection: ChangeEventHandler<HTMLSelectElement>
}

/**
 * TODO
 * 
 * @param param0 
 * @returns 
 */
const Header: React.FC<TopPageManagement> = ({ targetLanguage, onLanguageSelection }) => {
    const { t } = useTranslation();
    // List of all available languages for this application. See /src/public/i18n
    const languageOptions = Object.values(LanguageMap).map((language) => {
        return (
            <option key={language.code} value={language.code}>
                {language.nativeName}
            </option>
        );
    });

    return (
        <header dir={targetLanguage?.dir || "ltr"}>
            <p><b>{t("label")}</b></p>
            <select defaultValue={"en"} onChange={onLanguageSelection}>
                {languageOptions}
            </select>
            <h1>{t("title")}</h1>
            <h2>{t("subtitle")}</h2>
        </header>
    );
}

export default Header;