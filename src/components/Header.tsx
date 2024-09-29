import React, { ChangeEvent } from "react";
import { LanguageMap } from "../lang";
import { useTranslation } from "react-i18next";
import "../styles/Header.css";
import { useNavigate } from "react-router-dom";


/**
 * Header component that renders the application title and manages language selection.
 * 
 * @param props - the props for the Header component. 
 * @returns the rendered Header component.
 */
const Header: React.FC = () => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();

    // List of all available languages for this application.
    const languageOptions = Object.values(LanguageMap).map((language) => {
        return (
            <option key={language.code} value={language.code}>
                {language.nativeName}
            </option>
        );
    });

    function handleLanguageSelection(e: ChangeEvent<HTMLSelectElement>): void {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem('savedLanguage', e.target.value);
        navigate(`/${e.target.value}`);
    }

    // console.log(i18n.language, dir);

    return (
        <header>
            <p><b>{t("label")}</b></p>
            <select defaultValue={i18n.language || "en"} onChange={handleLanguageSelection}>
                {languageOptions}
            </select>
            <h1>{t("title")}</h1>
            <h2>{t("subtitle")}</h2>
        </header>
    );
}

export default Header;
