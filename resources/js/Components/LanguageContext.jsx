import React, { createContext, useState, useEffect } from 'react';
import i18n from '../i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language.value);
        setSelectedLanguage(language);
    };

    useEffect(() => {
        setSelectedLanguage({ value: i18n.language, label: i18n.language.toUpperCase() });
    }, []);

    return (
        <LanguageContext.Provider value={{ selectedLanguage, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
