import React, {useEffect} from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import i18n from "../i18n";

/**
 * Renders the layout of the single page for all languages.
 * 
 * @returns the page layout.
 */
const PageLayout: React.FC = () => {
    const { langCode } = useParams<{ langCode: string }>();
    

    useEffect(() => {
        const setLangOnDOM = () => {
            if (i18n.resolvedLanguage) {
                document.documentElement.lang = i18n.resolvedLanguage;
                document.documentElement.dir = i18n.dir(i18n.resolvedLanguage);
            } else {
                i18n.changeLanguage(langCode);
            }
        }

        if (langCode && langCode !== i18n.language) {
            i18n.changeLanguage(langCode);
            localStorage.setItem('savedLanguage', langCode);
        }

        i18n.on("languageChanged", setLangOnDOM);

        setLangOnDOM();

        console.log("Effect");

        return () => i18n.off("languageChanged", setLangOnDOM);
    }, [langCode]);

    return (
        <React.Fragment>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default PageLayout;