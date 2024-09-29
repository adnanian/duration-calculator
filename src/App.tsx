import React, {useEffect} from "react";
import { BrowserRouter, Routes as RouteList, Route, useParams } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import MainLayout from "./components/MainLayout";
import i18n from "./i18n";

/**
 * 
 * @returns 
 */
const App: React.FC = () => {
    const { langCode } = useParams<{langCode: string}>();

    useEffect(() => {
        const setLangOnDOM = () => {
            if (i18n.resolvedLanguage) {
                document.documentElement.lang = i18n.resolvedLanguage;
                document.documentElement.dir = i18n.dir(i18n.resolvedLanguage);
            }
        }

        i18n.on("languageChanged", setLangOnDOM);

        setLangOnDOM();

        return () => i18n.off("languageChanged", setLangOnDOM);
    }, [langCode]);
    return (
        <BrowserRouter>
            <RouteList>
                <Route path="/" element={<PageLayout />}>
                    <Route path=":langCode" element={<MainLayout />} />
                </Route>
            </RouteList>
        </BrowserRouter>
    );
}

export default App;