import React, { ChangeEventHandler } from "react";
import { Language, LanguageMap } from "../lang";
import { useTranslation } from "react-i18next";
import "../styles/Header.css";

/**
 * Interface representing the props for the Header component.
 */
interface TopPageManagement {
    /** The lanuage to display the contents of the application in. */
    targetLanguage: Language;
    /** The callback function to execute when a language is selection. */
    onLanguageSelection: ChangeEventHandler<HTMLSelectElement>;
}

/**
 * Header component that renders the application title and manages language selection.
 * 
 * @param props - the props for the Header component. 
 * @returns the rendered Header component.
 */
const Header: React.FC<TopPageManagement> = ({ targetLanguage, onLanguageSelection }) => {
    const { t } = useTranslation();

    // List of all available languages for this application.
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
