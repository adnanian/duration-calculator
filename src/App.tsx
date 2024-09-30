import React from "react";
import { BrowserRouter, Routes as RouteList, Route, Navigate } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import MainLayout from "./components/MainLayout";
import i18n from "./i18n";

/**
 * Parent component of all the other components.
 * 
 * @returns App.
 */
const App: React.FC = () => {
   

    return (
        <BrowserRouter>
            <RouteList>
                {/* Default route redirects to current language */}
                <Route path="/" element={<Navigate to={`/${i18n.language}`} replace />} />
                
                {/* Language-specific route */}
                <Route path=":langCode" element={<PageLayout />}>
                    <Route index element={<MainLayout />} />
                </Route>

                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/en" replace />} />
            </RouteList>
        </BrowserRouter>
    );
}

export default App;