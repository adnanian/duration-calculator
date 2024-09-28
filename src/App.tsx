import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from './MainPage';

const App: React.FC = () => {
    const helmetContext = {}

    return (
        <HelmetProvider context={helmetContext}>
            <MainPage/>
        </HelmetProvider>
    );
}

export default App;