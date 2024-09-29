import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

/**
 * 
 * @returns 
 */
const PageLayout: React.FC = () => {
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