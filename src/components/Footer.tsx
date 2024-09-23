import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/Footer.css";

/**
 * TODO
 * 
 * @returns 
 */
const Footer: React.FC = () => {
    const {t} = useTranslation();

    return (
        <footer>
            <a
                href="https://adnanianorder.com/"
                target="_blank"
                rel="noreferrer"
                title={t("tooltips.contact")}
            >
                {t("contact")}
            </a>
        </footer>
    )
}

export default Footer;